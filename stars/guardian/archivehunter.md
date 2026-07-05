---
repo: guardian/archivehunter
url: 'https://github.com/guardian/archivehunter'
homepage: ''
starredAt: '2024-12-18T04:26:36Z'
createdAt: '2018-10-29T14:29:37Z'
updatedAt: '2025-01-21T11:40:05Z'
language: Scala
license: NA
branch: main
stars: 4
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:17.391Z'
description: Index and search for media stored in s3 buckets
tags:
  - multimedia-tech
---

# README (work in progress)

# Setting up the development environment

It's expected that you'll be developing on this on your local machine; but since the app relies on many
AWS resources in order to function (DynamoDB, SQS, etc.) you'll need some of these that you can mess around with and not
break anything else.

### 0. Before you begin
You'll need the following prerequisites installed on your dev environment:

- ruby 2.x for helper scripts, with `aws-sdk optimist awesome_print` gems
- AWS commandline utilities (`pip install awscli` helps)
- AWS commandline access.  We use temporary credentials based on AWS commandline profiles; set the `externalData.awsProfile` option
in your settings file (see step 2) to the profile name you are using on the commandline if you need this
- SBT or similar Scala build environment
- nodejs v12 or above with npm installed. I use `nvm` to manage my nodejs versions, and v15.5 for development.

### 1. Generate dev stack Cloudformation

There is a helper script provided that takes the main app cloudformation and strips out everything you don't need for a
 dev stack:
 
```
[checkout-root] $ cd cloudformation
[checkout-root]/cloudformation $ ./make-dev-stack.rb -e
Output written to appstack-dev.yaml
```

In order to run this script, you'll need ruby 2.x installed together with the
Optimist gem: `gem install optimist`

You can override the input and output filenames, run `./make-dev-stack.rb --help` for details.

Once it has been generated, **deploy** the cloudformation in your usual way (probably via the AWS console)

### 2. Generate dev stack configuration

Once you have your dev stack configured, you need to update `application.conf` to point to the newly deployed resources.

There is a script provided to help with this as well:

```
[checkout-root] $ cd cloudformation
[checkout-root]/cloudformation $ ./make-dev-config.rb -s {your-stack-name} [-r {region}]
[checkout-root]/cloudformation $
```

This requires the aws-sdk gem as well as Optimist:

```
$ gem install aws-sdk optimist
```

This will generate a new file in the `conf/` directory called `application-DEV.conf` by replacing the relevant
configuration keys with values obtained from the stack `{your-stack-name}`.  In order to run, this requires AWS credentials
with the rights to inspect deployed Cloudformation stacks.

The exact replacements are controlled in a table at the top of the script called `$settings_mapping`.  Consult this if the output is not what you expect.

Run `$ ./make-dev-config.rb --help` for more information on available options.

In order to use the configuration, you need to specify `config.file=application-DEV.conf` when running.
In Intellij, this can be done by going to the Run configuration and specifying `-Dconfig.file=application-DEV.conf` in the JVM Options box.
From the commandline it should be sufficient to add the -D option as above to your commandline.

### 3. Setting up authentication

Archivehunter uses oauth2 for login so you need to have an identity provider (IdP) available for it to authenticate against.

The simplest way to get hold of this is to install prexit-local from its private repo in Gitlab, and use the Keycloak
installation in minikube that gives you.

Alternatively, you can integrate to your organisation's IdP or follow the instructions at https://www.keycloak.org/getting-started to
set up a local instance.

Once you have it running, you'll need to edit the `oAuth` section in application-DEV.conf:

```hocon 
oAuth {
    clientId: "archivehunter" //this is the client id you created when setting up a new client in Keycloak
    resource: "https://keycloak.local"  //base URL of your keycloak installation
    oAuthUri: "https://keycloak.local/auth/realms/master/protocol/openid-connect/auth"  //auth URL, you should not need to change this except for the server
    tokenUrl: "https://keycloak.local/auth/realms/master/protocol/openid-connect/token" //token URL, you should not need to change this except for the server
    adminClaimName: "multimedia_admin"  //name of the JWT claim to indicate an administrator. For dev I usually set this up as a "static mapping" in keycloak
    enforceSecure: false    //If you are running your _archive hunter dev instance_ under http not https then you need to set this to false. Otherwise must be true.
    tokenSigningCertPath: "keycloak.pem"  //you need to get the signing certificate from your Keycloak realm and save it as a PEM file. Then point to that file path here.
    validAudiences: ["archivehunter"]     //the default audience in keycloak is the client ID
    oAuthTokensTable: "archivehunter-DEV-andy-OAuthTokensTable-1C46GVKE0M3TM" //this is filled in by `make_dev_config.rb`
}
```

With this in place, and keycloak running, you should be able to log in and out.

### 4. Copy in data (optional)

A script is provided at `utils/copy_dynamo_table.rb` so you can copy the contents of e.g. your CODE environment proxies, jobs, etc. into
your DEV tables in order to debug and fix issues.

This requires the following gems:

```
$ gem install optimist aws-sdk awesome_print
```

Run `utils/copy_dynamo_table.rb --help` to see the usage instructions.

### 5. Run local Elasticsearch cluster

Fortunately, Docker makes this very easy. Just run `utils/run_local_elasticsearch.sh`.  This will start up a single-node dev
cluster in Docker, storing its data in a subdirectory called `esdata` which is included in the .gitignore file.

### 6. Build the UI in development mode

The UI is provided by nodejs, and needs transpiling from JSX:

```
[checkout-root] $ cd frontend/
[checkout-root]/frontend $ npm install
[checkout-root]/frontend $ npm run dev
```
 
This will build the file `[checkout-root]/public/javascripts/bundle.js` with all of the UI in it and will keep running, rebuilding
it every time the contents of the JSX files change.

---------

## Notification lambdas
While periodic scanning is all very well, it's usually a better idea to pick up incoming events as they happen rather than bundle them into large infrequent updates.
That is where the inputLambda event code comes in handy.

To use this:

- deploy `cloudformation/bucketmonitor.yaml`, ensuring that permissions are granted for access to any buckets you want to monitor
- manually configure each bucket to send events to the lambda:
  - go to the bucket in S3 console
  - click 'Properties'
  - under 'Advanced', select 'Events'
  - within 'Events' select 'New Notification'
  - select 'ObjectCreate(all)' and 'ObjectDelete(all)'
  - give it a name
  - select the lambda that the cloudformation `bucketmonitor.yaml` deployed in 'Send To'
  
Once this has been done, the index will be automatically updated with any new or deleted files without a need for scanning

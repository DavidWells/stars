---
repo: hybox/aws
url: 'https://github.com/hybox/aws'
homepage: ''
starredAt: '2018-11-15T04:52:34Z'
createdAt: '2016-04-25T22:41:21Z'
updatedAt: '2024-07-12T08:54:59Z'
language: Ruby
license: Apache-2.0
branch: master
stars: 24
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:04.885Z'
description: AWS CloudFormation templates for the Hydra-in-a-Box application stack
tags:
  - aws
  - cloudformation
  - hydra
---

# aws

[![Launch Stack](https://s3.amazonaws.com/cloudformation-examples/cloudformation-launch-stack.png)](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/new?stackName=hybox&templateURL=https://s3.amazonaws.com/hybox-deployment-artifacts/cloudformation/current/templates/stack.yaml)

These AWS CloudFormation templates create a full application stack for a multitenant-ready  [Hyku](https://github.com/projecthydra-labs/hyku) application, including:

  - a dedicated [Amazon Virtual Private Cloud](https://aws.amazon.com/vpc) (VPC) for the stack components, with public and private subnets across 3 Availability Zones, and a bastion host providing SSH access for system administrators;
  - a multi-node SolrCloud cluster backed by a multi-node zookeeper ensemble;
  - two PostgreSQL databases, each with a multi-availability zone hot spare, one for the Hyku webapp, and one for Fedora;
  - a (single node) Fedora 4 server;
  - and a Rails application stack, with auto-scaling webapp and worker tiers and continuous deployment of the application code.

![AWS Stack Diagram](https://cloud.githubusercontent.com/assets/111218/16077301/e8a0dc6c-32ef-11e6-80b4-e9e74c18973e.png)


## Creating the full stack

0. Select an AWS region, e.g.:

```
$ AWS_DEFAULT_REGION=us-east-1
```

1. Create or import an [EC2 key-pair](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html) for that region.

2. Create a [public hosted zone in Route53](http://docs.aws.amazon.com/Route53/latest/DeveloperGuide/CreatingHostedZone.html); the web application will automatically manage DNS entries in this zone. A registered domain name is needed to pair with the Route53 hosted zone. You can [use Route53 to register a new domain](http://docs.aws.amazon.com/Route53/latest/DeveloperGuide/domain-register.html) or [use Route53 to manage an existing domain](http://docs.aws.amazon.com/Route53/latest/DeveloperGuide/MigratingDNS.html).

3. Create an [S3 bucket](http://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-bucket.html) to be used for the persistent storage of binary content.

4. Create an [IAM user](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html) and [give that user permission](https://aws.amazon.com/blogs/security/writing-iam-policies-how-to-grant-access-to-an-amazon-s3-bucket/) to access the S3 bucket created in the previous step. In this case, setting user permissions by attaching an inline policy is recommended. Make sure to capture the new user's API access credentials.

5. (Optional) If creating the stack in a region other than us-east-1, create an additional S3 bucket the desired region with public read only permissions. This will be used to hold source bundles for Elastic Beanstalk environments. In total, the bucket needs files for solr, zookeeper, fedora, and hyku. To create the needed files:

Solr:
```console
cd assets/solr
zip -r solr.zip .
```
Zookeeper:
```console
cd assets/zookeeper
zip -r zookeeper.zip .
```
Hyku:
```console
wget -O hyku.zip https://github.com/samvera-labs/hyku/archive/master.zip
```
Fedora:
```console
wget https://hybox-deployment-artifacts.s3.amazonaws.com/fcrepo-webapp-ext-4.8.0-SNAPSHOT.war
```
Upload the archive files to your regional S3 bucket. The bucket and the file names will be referenced in a params file described below.

6. Copy the `params/defaults.json` template to a new environment-specific file, populating the parameter values as appropriate for your environment. This repo ignores local files placed in the `params/private/` directory and is where secret params can be set. Make sure to set values for at least these parameters (the default settings, while insecure, will work for the other parameters, and should suffice for development purposes):
   - `KeyName`: the name of the key-pair created in step 1
   - `PublicZoneName`: the name of the hosted zone created in step 2 (with a trailing period)
   - `DatabasePassword` and `FcrepoDatabasePassword`: password for Hyku and Fedora databases
   - `FcrepoS3BucketName`: the name of the S3 bucket created in step 3
   - `FcrepoS3AccessKey` and `FcrepoS3SecretKey`: API credentials for user created in step 4
   - `SecretKeyBase`: rails key generation base
   - `S3BucketEB`: name of the S3 bucket that contains the Beanstalk source bundles described in step 5
   - `WebappS3Key`: name of the hyku zip file created in step 5
   - `SolrS3Key`: name of the solr zip file created in step 5
   - `ZookeeperS3Key`: name of the zookeeper zip file created in step 5
   - `S3FedoraFilename`: name of the fcrepo zip file created in step 5

7. Create the full application stack:

```console
$ aws --region $AWS_DEFAULT_REGION cloudformation create-stack --disable-rollback --stack-name hybox --template-body https://s3.amazonaws.com/hybox-deployment-artifacts/cloudformation/current/templates/stack.yaml --capabilities CAPABILITY_IAM --parameters file://params/private.json
```

The --disable-rollback parameter in this call prevents the entire stack from being torn down if an error occurs during the build process. Without this option, if the stack fails to create, a rollback will be performed to tear down the entire stack, making it more difficult to discern the cause of the failure.

You can also create (or update) your application from branches of the cloudformation repository:

```console
$ aws --region $AWS_DEFAULT_REGION cloudformation create-stack --stack-name hybox --template-body https://s3.amazonaws.com/hybox-deployment-artifacts/cloudformation/branch/branch-name/templates/stack.yaml --capabilities CAPABILITY_IAM --parameters file://params/private.json
```

You can also deploy branches of the hybox application repository by setting the `WebappS3Key` parameter for your stack to point at the branch-specific deployment artifact (e.g. `hyku/branch/branch-name/hyku.zip`)

The stack will spin up in the following order:

```console
|- stack
   |- mail
   |- slack
   |- vpc
      |- securitygroups
          |- bastion
          |- zookeeper
              |- solr
          |- redis
          |- postgres
          |- postgres-fedora
              |- fcrepo
                  |- application
                      |- workers
                      |- webapp
                          |- codepipeline

```

8. (Optional) If you set the `ContactEmail` parameter, which enables messages from the contact form to be sent to a specified email address, you will also need to verify that email address in SES. Go to the [SES console](https://console.aws.amazon.com/ses/home) (make sure to select the correct region) select _Email Addresses_ then the _Verify a new email address_ button. You will need to click a link from an email that is sent to complete the verification process.

9. (Optional) Enable HTTPS support
    - Create the certificate: Use the AWS Certificate Manager to create an SSL certificate for the domain configured in Route53 (in step 2 above). To complete the certificate creation, a verification email will be sent to the address [defined by the domain registration](https://whois.icann.org/en). If you already have a certificate for this domain, [use the command line AWS tool to add it to IAM.](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/configuring-https-ssl-upload.html)
    - Turn on HTTPS, using the Console
        - Enable HTTPS
            - Select the Hyku webapp application in the Elastic Beanstalk console
            - Choose the _Configuration_ section and select the gear icon for the _Load Balancer_ section
            - Select the new SSL cert in the _SSL certificate ID_ drop-down box
            - Set secure listener port to 443
            - Verify the protocol box (below the secure listener port) is set to HTTPS
            - Select Apply at the bottom of the page.
        - Force HTTP to HTTPS
            - Back in the _Configuration_ section in the Elastic Beanstalk console, select the gear icon for the _Software Configuration_ section
            - Under _Environment Properties_ add a property named `SETTINGS__SSL_CONFIGURED` with a value of `true`
            - Select Apply at the bottom of the page.
    - Turn on HTTPS, using the command line (an alternative to the Console directions above)
        - In the AWS Certificate Manager, select your certificate and capture its ARN value
        - In your CloudFormation parameters file, set the `SSLCertificateId` parameter to the certificate ARN
        - Perform an `update-stack` with CloudFormation (this can be done using the same command noted above for `create-stack`, but without the --disable-rollback option.)

## Travis deployment integration

The AWS CloudFormation stack must be deployed into an S3 bucket for CloudFormation to correctly resolve sub-stack references. The `templates/travis.json` stack will bootstrap the necessary buckets, IAM user, and access keys to support continuous deployment from both this CloudFormation repository and the Hydra-in-a-Box application repository.

This bootstrapping is already provided for the main repositories, but if you deploy a fork of this stack, you may need to create this stack and configure continuous deployment for your forks. These files will expire from S3 after a period of time, so pushing a change to the repository may be required to republish the templates.

```console
$ aws --region $AWS_DEFAULT_REGION cloudformation create-stack --stack-name travis --template-body file://templates/travis.json --capabilities CAPABILITY_IAM
```

You will need the outputs from this stack to create [deploy steps](https://docs.travis-ci.com/user/deployment/s3 ) for these repositories.

## Cost

Based on AWS bills for accounts running this stack throughout 2017, the cost of running Hyku using the configuration defined in these templates is roughly $800-$900 per month. Variation will depend on configured instance minimums and usage/load.

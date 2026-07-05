---
repo: shortdiv/cant-dutch-this
url: 'https://github.com/shortdiv/cant-dutch-this'
homepage: null
starredAt: '2020-04-10T21:01:55Z'
createdAt: '2019-11-19T17:43:29Z'
updatedAt: '2024-07-01T07:29:55Z'
language: JavaScript
license: MIT
branch: master
stars: 20
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:58.830Z'
description: null
tags: []
---

# Predictive Prefetching Demo

An example site showing how to do predictive prefetches with 11ty.


## Getting Started

### 1. Clone this repository:

```
git clone git@github.com:shortdiv/cant-dutch-this.git my-first-predictive-prefetch
```


### 2. Navigate to the directory

```
cd my-first-predictive-prefetch
```

Specifically have a look at `.eleventy.js` to see if you want to configure any Eleventy options differently.

### 3. Install dependencies

```
npm install OR yarn 
```

### 4. Edit _data/metadata.json

### 5. Run Eleventy

```
npm run build OR yarn build
```

Or build and host locally for local development
```
npm run serve OR yarn serve
```

Or build automatically when a template changes:
```
npm run watch OR yarn watch
```

Or in debug mode:
```
DEBUG=* npx eleventy
```

### Authentication Notes
## Create Your Credentials

### Create a Service Account
Go to the Credentials page in the Google APIs console.

If you don't have an existing project, click "Create" to create a new project. Otherwise, select an existing project from the project dropdown.

Select "Service Account key" from the "Create credentials" dropdown.

Fill out the form for creating a service account key:

Service account dropdown: Select "New Service Account".
Service account name: Create a service account a name.
Role: Select "Service Accounts" > "Service Account User".
Service account ID: Leave as is.
Key type: Select P12 key.
Click Create.

### Setup Your Private Key
Note the private key password, you'll need this when you're converting your password to a pem file.

Move this key into the root directory for this project, outside of /src.

Generate a *.p12 certificate by running this command from the directory for this project:
```
$ openssl pkcs12 -in *.p12 -out key.pem -nodes -clcerts
```

### Configure GA

You now need to add this service account to GA for the proper permissions.

In your GA account, create a new user and add the necessary permissions. 

Add a new user. (Admin > User Management > + > Add New Users)
Email Address: example@example-project-123456.iam.gserviceaccount.com.

Permissions: Select "Read & Analyze."

**Note that you may need to Enable the Google Analytics Reporting API in your project**


### Configure env vars
We'll need to now configure our env variables. To do this in 11ty, we'll lean on nodeenv, which should alr be a dependency in this project. To take advantage of this, add `VIEW_ID` and `SERVICE_ACCOUNT` to a .env file in your root dir. You can find these values in the view column of the accounts dropdown in GA.

VIEW_ID=12345678
SERVICE_ACCOUNT_EMAIL=cant-dutch-this@some-example-account-123456.iam.gserviceaccount.com

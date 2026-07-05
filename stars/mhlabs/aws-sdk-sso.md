---
repo: mhlabs/aws-sdk-sso
url: 'https://github.com/mhlabs/aws-sdk-sso'
homepage: ''
starredAt: '2021-07-31T22:49:56Z'
createdAt: '2020-08-04T22:03:59Z'
updatedAt: '2021-07-31T22:49:56Z'
language: JavaScript
license: NA
branch: master
stars: 4
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:49.382Z'
description: AWS SSO support for aws-sdk-js
tags: []
---

# aws-sdk-sso

SingleSignOnCredentials provider aws-sdk-js.

## Usage
```
const AWS = require("aws-sdk");
require("aws-sdk-sso");

AWS.config.credentialProvider.providers.push(
    new AWS.SingleSignOnCredentials()
);
``` 

## Known issues
Does not yet support browser redirect login. Please use 'aws sso login` first. This is in lieu of official support form AWS and shouldn't be used for cruical tasks.

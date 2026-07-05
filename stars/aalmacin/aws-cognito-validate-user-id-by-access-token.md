---
repo: aalmacin/aws-cognito-validate-user-id-by-access-token
url: 'https://github.com/aalmacin/aws-cognito-validate-user-id-by-access-token'
homepage: 'https://www.npmjs.com/package/aws-cognito-validate-user-id-by-access-token'
starredAt: '2020-03-23T19:43:19Z'
createdAt: '2020-02-29T15:22:17Z'
updatedAt: '2020-03-23T19:43:19Z'
language: JavaScript
license: NA
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:01.462Z'
description: npm package for validating user id by access token
tags: []
---

# How to use

## Installation

```
  npm install aws-cognito-validate-user-id-by-access-token
```

## Usage

Replace:

* `ACCESS_TOKEN_FROM_COGNITO` with the access token you get from AWS Cognito 
* `SUB_FROM_COGNITO` with the the sub/user id of the user in AWS Cognito User Pools

```js

  const validateUserId = require('aws-cognito-validate-user-id-by-access-token');

  validateUserId(ACCESS_TOKEN_FROM_COGNITO, SUB_FROM_COGNITO).then(res => {
    // ... do something
  })

```


## As a Lambda layer

```
  mkdir nodejs
  cd nodejs
  npm init -y
  npm install aws-cognito-validate-user-id-by-access-token
```

Then `zip` the nodejs folder and upload to lambda

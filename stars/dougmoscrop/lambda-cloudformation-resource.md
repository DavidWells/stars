---
repo: dougmoscrop/lambda-cloudformation-resource
url: 'https://github.com/dougmoscrop/lambda-cloudformation-resource'
homepage: null
starredAt: '2018-11-15T23:53:10Z'
createdAt: '2017-05-01T18:36:14Z'
updatedAt: '2020-12-07T17:40:12Z'
language: JavaScript
license: NA
branch: master
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:03.858Z'
description: null
tags: []
---

# lambda-cloudformation-resource

A wrapper for Lambda-backed custom resources in CloudFormation that has no dependencies and handles timeouts for you.

## Usage
```js
const helper = require('lambda-cloudformation-resource');

module.exports.handler = helper((event) => {
  if (event.RequestType === 'Delete') {
    // maybe you do not need to handle Delete
    return;
  }

  // return a promise
  return doSomething();
});
```

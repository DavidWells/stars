---
repo: andrewoh531/dynogels-promisified
url: 'https://github.com/andrewoh531/dynogels-promisified'
homepage: null
starredAt: '2017-09-28T21:21:27Z'
createdAt: '2016-07-25T07:41:44Z'
updatedAt: '2023-08-23T15:51:37Z'
language: JavaScript
license: NOASSERTION
branch: master
stars: 38
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:41.122Z'
description: Promisifies methods exposed by dynogels (Dynamo DB mapper)
tags:
  - dynamodb
  - dynogels
  - promises
---

# dynogels-promisified
I take no credit for this code. It is inspired by [vogels-promisified](https://github.com/servel333/vogels-promisified)
but modified to use [Dynogels](https://github.com/clarkie/dynogels).

This package promisifies the functions in [Dynogels](https://github.com/clarkie/dynogels) using [Bluebird](http://bluebirdjs.com/docs/api-reference.html) using the default 'Async' suffix. i.e. all methods in
Dynogels are modified with an 'Async' suffix.

## Usage

```javascript
var dynogels = require("dynogels-promisified");
```

## Example

```javascript
var User = module.exports = dynogels.define("User", {
  hashKey : "userId",
  timestamps : false,
  schema : {
    userId: dynogels.types.uuid(),
    name: Joi.string(),
  },
});

User
  .getAsync(userId)
  .then(function(user){
    // ...
  })
  .catch(function(err){
    // ...
  });

User
  .scan()
  .where("userId").equals(userId)
  .execAsync()
  .then(function(user){
    // ...
  })
  .catch(function(err){
    // ...
  });
```

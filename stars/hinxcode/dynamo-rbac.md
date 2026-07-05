---
repo: hinxcode/dynamo-rbac
url: 'https://github.com/hinxcode/dynamo-rbac'
homepage: ''
starredAt: '2017-10-18T20:42:46Z'
createdAt: '2017-03-01T08:44:02Z'
updatedAt: '2024-07-12T22:15:02Z'
language: JavaScript
license: NA
branch: master
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:37.206Z'
description: Simple role-based access control use with dynamoDB
tags: []
---

# dynamo-rbac

## Local DB
Setting up a [dynamoDB-Local](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html) for the purpose of developing with local database.

## Installation
```
$ npm install
```

## Usage
```
const RBAC = require('dynamo-rbac')

RBAC.connectDB({
    region: 'us-west-2',
    endpoint: 'http://localhost:8000',
    apiVersion: '2012-08-10'
})

RBAC.setSchema({
    user: 'UserTable',
    role: 'RoleTable'
})
```

## Build with gulp
```
$ npm run build
```

## Unit testing
```
$ npm test
```


## License
MIT

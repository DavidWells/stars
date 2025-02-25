---
repo: kevinold/serverless-graphql-dadjokes
url: 'https://github.com/kevinold/serverless-graphql-dadjokes'
homepage: ''
starredAt: '2016-08-25T20:32:47Z'
createdAt: '2016-08-25T12:59:44Z'
updatedAt: '2020-02-11T15:37:26Z'
language: JavaScript
license: NA
branch: master
stars: 21
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:19.938Z'
description: Example Serverless GraphQL v1.0 "Dad Jokes" service from React Rally 2016
tags: []
---


Setup with [AWS as a provider is required](https://github.com/serverless/serverless/blob/master/docs/guide/provider-account-setup.md)

Then:

```
npm install -g serverless@beta
```

Inside this repo:

```
npm install

serverless deploy
```

Loading jokes into DynamoTables:

```
node load-jokes.js
```


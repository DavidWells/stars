---
repo: Raynos/fake-lambda-api
url: 'https://github.com/Raynos/fake-lambda-api'
homepage: ''
starredAt: '2020-12-13T03:55:19Z'
createdAt: '2020-06-01T10:59:46Z'
updatedAt: '2020-12-13T13:55:07Z'
language: JavaScript
license: MIT
branch: master
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:17.678Z'
description: Setup a fake Lambda API server for testing purposes
tags: []
---

# fake-lambda-api

Setup a fake Lambda API server for testing purposes

## Example

```js
const AWS = require('aws-sdk')
const FakeLambdaAPI = require('fake-lambda-api').FakeLambdaAPI

async function test() {
  const server = new FakeLambdaAPI({ port: 0 })
  await server.bootstrap()

  server.populateFuntions('account', 'us-east-1', [...])
  const cachePath = path.join(__dirname, 'fixtures')
  await server.populateFromCache(cachePath)

  const lambda = new AWS.Lambda({
    endpoint: `http://${server.hostPort}`,
    sslEnabled: false
  })

  const data = await lambda.listFunctions().promise()
  console.log('list of functions', data)

  await server.close()
}

process.on('unhandledRejection', (err) => { throw err })
test()
```

## Features

Currently this `fake-lambda-api` module supports the read API
to call `listFunctions()`.

It also supports APIs designed for making a read-only copy of
production data cached on disk. This allows for using fixture
data for local developmet & integrationt ests.

## Support

The following `aws-sdk` methods are supported

 - `lambda.listFunctions()`

## Recommended testing approach

Create the `FakeLambdaAPI` server in your test harness. Then
configure your aws client to point to your endpoint.

You can call `populate` methods to populate mock data into your
fake lambda API server.

## Recommended local approach

Create the `FakeLambdaAPI` server on some HTTP port of your
choice.

We recommend copying the `scripts/cache-from-prod.js` into your
application, this will cache production data into a fixtures
directory.

You can then configure `FakeLambdaAPI` to fetch that fixtures
data into memory and configure your app to point to `FakeLambdaAPI`
on whatever port you've chosen.

Example snippet

```js
'use strict'

const path = require('path')
const AWS = require('aws-sdk')
const FakeLambdaAPI = require('../index.js').FakeLambdaAPI

async function main () {
  const fakeLambda = new FakeLambdaAPI({
    cachePath: path.join(__dirname, '..', 'fixtures')
  })
  await fakeLambda.fetchAndCache(AWS, 'all')
}

main().then(null, (/** @type {Error} */ err) => {
  process.nextTick(() => {
    throw err
  })
})
```

## install

```
% npm install fake-lambda-api
```

## MIT Licensed


---
repo: vandium-io/aws-cognito-public-keys
url: 'https://github.com/vandium-io/aws-cognito-public-keys'
homepage: null
starredAt: '2020-03-23T19:32:21Z'
createdAt: '2020-01-22T19:58:02Z'
updatedAt: '2020-03-23T19:32:21Z'
language: JavaScript
license: BSD-3-Clause
branch: master
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:01.614Z'
description: Gets public keys for a given AWS Cognito user pool id
tags: []
---

[![Build Status](https://travis-ci.org/vandium-io/aws-cognito-public-keys.svg?branch=master)](https://travis-ci.org/vandium-io/aws-cognito-public-keys)
[![npm version](https://badge.fury.io/js/aws-cognito-public-keys.svg)](https://badge.fury.io/js/aws-cognito-public-keys)

# `aws-cognito-public-keys`

Module for retrieving public keys for AWS Cognito user pools

## Features
* Does not require AWS credentials
* Synchronous and asynchronous methods
* Node.js 12.x compatible, works in AWS Lambda environments

## Installation
Install via npm.

	npm install aws-cognito-public-keys --save

## Getting Started

```js
const { getKeysSync } = require( 'aws-cognito-public-keys' );

const userPoolId = 'us-east-1_ZLPZ8Z7yS'; // your user pool id

const awsRegion = 'us-east1';             // valid AWS Region

const key = getKeysSync( userPoolId, awsRegion );

// keys =
// {
//    "<key id 1>": { ...key1 ... }
//    "<key id 2>": { ...key2 ... }
//    ..
// }
```

## API

### `async getKeys( userPoolId, region )`

Gets the Cognito public keys asynchronously. Returns a promise that resolves to
an object that contains the keys.

### `getKeysSync( userPoolId, region )`

Gets the Cognito public keys synchronously and blocks until resolved. Returns an
object that contains the keys.


## Feedback

We'd love to get feedback on how to make this tool better. Feel free to contact
us at `feedback@vandium.io`

## License

[BSD-3-Clause](https://en.wikipedia.org/wiki/BSD_licenses)

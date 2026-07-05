---
repo: JamesKyburz/fetch-lambda
url: 'https://github.com/JamesKyburz/fetch-lambda'
homepage: 'https://github.com/jameskyburz/fetch-lambda'
starredAt: '2021-01-08T05:12:37Z'
createdAt: '2018-08-21T11:41:03Z'
updatedAt: '2021-09-11T10:36:02Z'
language: JavaScript
license: NA
branch: master
stars: 7
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:08.691Z'
description: fetch for lambda bypassing api gateway
tags:
  - api-gateway
  - aws
  - faas
  - fetch
  - http
  - lambda
  - node
  - proxy
---

# fetch-lambda 

fetch for lambda bypassing api gateway

* only aws-lambda supported for now
* doesn't fully support fetch only the basics
* only a string body is supported

The payload sent and received from lambda assumes the api gateway format.

Only multiValueHeaders and multiValueQueryStringParameters are supported.

[![js-standard-style](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://github.com/feross/standard)
[![Greenkeeper badge](https://badges.greenkeeper.io/JamesKyburz/fetch-lambda.svg)](https://greenkeeper.io/)
[![build status](https://api.travis-ci.org/JamesKyburz/fetch-lambda.svg)](https://travis-ci.org/JamesKyburz/fetch-lambda)
[![downloads](https://img.shields.io/npm/dm/fetch-lambda.svg)](https://npmjs.org/package/fetch-lambda)

### usage

```javascript
const fetch = require('fetch-lambda')

fetch('aws-lambda://function:version/path', fetchOptions)

// if no :version is given then the latest lambda is invoked.
```

# license

[Apache License, Version 2.0](LICENSE)

---
repo: ForbesLindesay/sync-rpc
url: 'https://github.com/ForbesLindesay/sync-rpc'
homepage: null
starredAt: '2018-09-18T22:34:02Z'
createdAt: '2017-06-06T11:25:12Z'
updatedAt: '2024-12-27T08:58:36Z'
language: JavaScript
license: MIT
branch: master
stars: 77
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:14.223Z'
description: Run asynchronous commands synchronously by putting them in a separate process
tags: []
---

# sync-rpc

Run asynchronous commands synchronously by putting them in a separate process

[![Build Status](https://img.shields.io/travis/ForbesLindesay/sync-rpc/master.svg)](https://travis-ci.org/ForbesLindesay/sync-rpc)
[![Dependency Status](https://img.shields.io/david/ForbesLindesay/sync-rpc/master.svg)](http://david-dm.org/ForbesLindesay/sync-rpc)
[![NPM version](https://img.shields.io/npm/v/sync-rpc.svg)](https://www.npmjs.org/package/sync-rpc)

## Installation

```
npm install sync-rpc --save
```

## Usage

### worker.js

```js
function init(connection) {
  // you can setup any connections you need here
  return function (message) {
    // Note how even though we return a promise, the resulting rpc client will be synchronous
    return Promise.resolve('sent ' + message + ' to ' + connection);
  }
}
module.exports = init;
```

```js
const assert = require('assert');
const rpc = require('sync-rpc');

const client = rpc(__dirname + '/../test-worker.js', 'My Server');

const result = client('My Message');

assert(result === 'sent My Message to My Server');
```

## License

MIT

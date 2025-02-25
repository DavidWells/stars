---
repo: limulus/call-me-maybe
url: 'https://github.com/limulus/call-me-maybe'
homepage: null
starredAt: '2018-11-07T05:21:54Z'
createdAt: '2015-09-11T17:35:43Z'
updatedAt: '2024-04-29T02:27:18Z'
language: JavaScript
license: MIT
branch: master
stars: 39
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:05.965Z'
description: Let your JS API users either give you a callback or receive a promise
tags: []
---

# call-me-maybe [![Continuous Release](https://github.com/limulus/call-me-maybe/actions/workflows/continuous-release.yaml/badge.svg)](https://github.com/limulus/call-me-maybe/actions/workflows/continuous-release.yaml)

Let your JS API users either give you a callback or receive a promise.

## Usage

```javascript
var maybe = require("call-me-maybe")

module.exports = function asyncFunc (cb) {
  return maybe(cb, new Promise(function(resolve, reject) {
    // ...
  }))
}
```

## API

### maybe(cb, promise)

If the callback `cb` is truthy, returns `undefined` and will call `cb` when `promise` is settled. The parameters passed to `cb` are standard error-first:

  - If `promise` is fulfilled, then it is called with the result of the promise: `cb(null, result)`
  - If `promise` is rejected, then it is called with the rejection error: `cb(err)`

If `cb` is falsey, then `promise` is returned.

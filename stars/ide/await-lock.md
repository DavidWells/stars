---
repo: ide/await-lock
url: 'https://github.com/ide/await-lock'
homepage: NA
starredAt: 2022-10-16T05:26:29.000Z
stars: 92
hasReadMe: true
refreshedAt: '2025-02-25T21:49:14.517Z'
description: Mutex locks for async functions
---

# AwaitLock ![tests](https://github.com/ide/await-lock/workflows/Tests/badge.svg) [![codecov](https://codecov.io/gh/ide/await-lock/branch/master/graph/badge.svg)](https://codecov.io/gh/ide/await-lock)
Mutex locks for async functions

# API

[API documentation](https://github.com/ide/await-lock/wiki/API-documentation)

# Usage

This package is published only as an ES module. In addition to importing ES modules from ES modules, modern versions of Node.js support [requiring ES modules from CommonJS modules](https://nodejs.org/api/modules.html#loading-ecmascript-modules-using-require).

```javascript
import AwaitLock from 'await-lock';

let lock = new AwaitLock();

async function runSerialTaskAsync() {
  await lock.acquireAsync();
  try {
    // IMPORTANT: Do not return a promise from here because the finally clause
    // may run before the promise settles, and the catch clause will not run if
    // the promise is rejected
  } finally {
    lock.release();
  }
}
```

You can also use AwaitLock with [co](https://github.com/tj/co) and generator functions.

```javascript
import AwaitLock from 'await-lock';

let runSerialTaskAsync = co.wrap(function*() {
  yield lock.acquireAsync();
  try {
    // Run async code in the critical section
  } finally {
    lock.release();
  }
});
```

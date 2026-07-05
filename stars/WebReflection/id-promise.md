---
repo: WebReflection/id-promise
url: 'https://github.com/WebReflection/id-promise'
homepage: null
starredAt: '2025-02-27T02:01:35Z'
createdAt: '2020-04-27T07:22:44Z'
updatedAt: '2025-02-27T02:01:36Z'
language: JavaScript
license: ISC
branch: master
stars: 18
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-03-01T22:29:46.734Z'
description: 'A cluster friendly, identity based, Promise resolver'
tags: []
---

# id-promise

[![Build Status](https://travis-ci.com/WebReflection/id-promise.svg?branch=master)](https://travis-ci.com/WebReflection/id-promise) [![Coverage Status](https://coveralls.io/repos/github/WebReflection/id-promise/badge.svg?branch=master)](https://coveralls.io/github/WebReflection/id-promise?branch=master)

The goal of this module is to hold on the very first promise that asks for a specific task, resolved once for all concurrent promises that meanwhile asked for that very same task during its resolution time.

## In a nutshell

In the following example, after the first `samePromise()`, all other `samePromise()` invokes will simply hold until the first invoke has been resolved, granting that for 300 ms, dictated in the following example by `setTimeout`, no extra timer will be set, and `++samePromiseCalls` won't be incremented more than once.

```js
import idPromise from 'id-promise';
// const idPromise = require('id-promise');

let samePromiseCalls = 0;
const samePromise = () => idPromise(
  'some-unique-id:samePromise',
  (resolve, reject) => {
    setTimeout(resolve, 300, ++samePromiseCalls);
  }
);

// ask for the same task as many times as you want
samePromise().then(console.log);
samePromise().then(console.log);
samePromise().then(console.log);
samePromise().then(console.log);
```

### Cluster Friendly

If the callback is executed within a _forked_ worker, it will put on hold the same _id_ for all workers that meanwhile might ask for the same operation.

This is specially useful when a single _fork_ would need to perform a potentially very expensive operation, either DB or file system related, but it shouldn't perform such operation more than once, as both DB and file system are shared across all workers.

```js
import idPromise from 'id-promise';
// const idPromise = require('id-promise');

const optimizePath = path => idPromise(
  // ⚠ use strong identifiers, not just path!
  `my-project:optimizePath:${path}`,
  (resolve, reject) => {
    performSomethingVeryExpensive(path)
      .then(resolve, reject);
  }
);

// invoke it as many times as you need
optimizePath(__filename).then(...);
optimizePath(__filename).then(...);
optimizePath(__filename).then(...);
```

### How does it work

In _master_, each _unique id_ is simply stored once, and removed from the _Map_ based cache once resolved, or rejected. Each call to the same _unique id_ will return the very same promise that is in charge of resolving or rejecting.

In _workers_, each _uunique id_ would pass through _master_ to understand if other workers asked for it already, or it should be executed as task.
The task is then eventually executed within the single _worker_ and, once resolved, propagated to every other possible worker that meanwhile asked for the same task.


## Caveats

This module has been created to solve some very specific use case and it's important to understand where it easily fails.

There are 3 kinds of caveats to consider with this module:

  * **name clashes**, so that weak unique identifiers will easily cause troubles. Try to use your project/module namespace as prefix, plus the functionality, plus any other static information that summed to the previous details would make the operation really unique (i.e. a fully resolved file path)
  * **serialization**, so that you cannot resolve values that cannot be serialized and passed around workers, and you should rather stick with _JSON_ compatible values only.
  * **different parameters**, so that if a promise is cached but the next call internally refers to different values, the result might be unexpected

While the first caveat is quite easy to understand, the last one is subtle:

```js
import idPromise from 'id-promise';
// const idPromise = require('id-promise');

const writeOnce = (where, what) => idPromise(
  `my-project:writeOnce:${where}`,
  (resolve, reject) => {
    fs.writeFile(where, what, err => {
      if (err) reject(err);
      else resolve(what);
    });
  }
);

// concurrent writes
writeOnce('/tmp/test.txt', 'a').then(console.log);
writeOnce('/tmp/test.txt', 'b').then(console.log);
writeOnce('/tmp/test.txt', 'c').then(console.log);
```

Above concurrent `writeOnce(where, what)` invokes uses the same _id_ with different values to write. Accordingly with how fast the writing operation would be, the outcome might be unpredictable, but in the worst case scenario, where it was something very expensive, all 3 invokes will resolve with the string `"a"`.

The rule of thumbs here is that _First Come, First Serve_, so specifically for writing files this module might be not the solution.


## Use cases

  * expensive operations that don't need to be performed frequently, including recursive asynchronous folders crawling or scanning
  * expensive file operations such as compression, archive zipping, archive extraction, and so on and so forth, where the source path is unique and operation would grant always the same outcome
  * any expensive operation that accepts *always* a unique entry point that should grant always the same outcome

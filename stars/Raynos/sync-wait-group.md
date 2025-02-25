---
repo: Raynos/sync-wait-group
url: 'https://github.com/Raynos/sync-wait-group'
homepage: null
starredAt: '2020-12-13T04:09:45Z'
createdAt: '2019-05-27T13:56:40Z'
updatedAt: '2024-04-08T18:13:07Z'
language: JavaScript
license: MIT
branch: master
stars: 8
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:17.563Z'
description: A port of golang sync.WaitGroup
tags: []
---

# sync-wait-group

<!--
    [![build status][build-png]][build]
    [![Coverage Status][cover-png]][cover]
    [![Davis Dependency status][dep-png]][dep]
-->

<!-- [![NPM][npm-png]][npm] -->

A port of golang sync.WaitGroup

## Example

```js
const WaitGroup = require("sync-wait-group").WaitGroup;

async function main() {
    const wg = new WaitGroup();
    let n = 0;

    wg.add(1);
    (async () => {
        n++;
        wg.done();
    })();

    wg.add(1);
    (async () => {
        n++;
        wg.done();
    })();

    await wg.wait();
    cassert.equal(n, 2);
}
```

## Docs

### `const wg = new WaitGroup()`

Creates a wait group instance. This instance contains a cached
promise that is used when `wait()` is called so once the waitgroup
is finished this object cannot be re-used.

It's safe to call `wait()` if you do not call `add()` ; aka the
internal counter === 0.

It's safe to call `wait()` multiple times.
It's safe to call `wait()` after `done()` has been called and
the waitgroup is already finished.

This pattern is considered better then creating a `Deferred`

```js
// Instead of using deferred use WaitGroup
const d = new Deferred();

(async () => {
    d.resolve();
})();

await d.promise();

// This is preferred as it's more clear what your intent is.
// When you use deferred it's confusing why you didn't use
// new Promise((resolve, reject) => { ... }) instead.
const wg = new WaitGroup();
wg.add(1);

(async () => {
    wg.done();
})();

await wg.wait();
```

### `wg.add(n)`

Increments the counter of pending work that your waiting for by
N.

If your waiting for a single event you can call `wg.add(1)`

If your implementing fanout or scatter gather then you can call
`wg.add(number_of_tasks)`

If you call `add()` after the waitgroup is finished, aka the
internal counter has been decremented to `0` by `done()` then
an exception is thrown.

### `wg.done()`

Call `done()` to notify that a piece of work your waiting for
has completed. This will decrement the internal counter by 1.

If the counter is `0` then all the promises returned from
`wg.wait()` will resolve successfully.

If calling `done()` would make the counter negative then an
exception is thrown.

### `const promise = wg.wait()`

Returns a cached `Promise` that resolves once the wg has finished.
This happens when `done()` has been called enough to decrement
the counter increased by `add(n)`.

If you call `wait()` without calling `add()` or `done()` then
it returns a resolved promise.

## Installation

`npm install sync-wait-group`

## Tests

`npm test`

## Contributors

 - Raynos

## MIT Licensed

  [build-png]: https://secure.travis-ci.org/Raynos/sync-wait-group.png
  [build]: https://travis-ci.org/Raynos/sync-wait-group
  [cover-png]: https://coveralls.io/repos/Raynos/sync-wait-group/badge.png
  [cover]: https://coveralls.io/r/Raynos/sync-wait-group
  [dep-png]: https://david-dm.org/Raynos/sync-wait-group.png
  [dep]: https://david-dm.org/Raynos/sync-wait-group
  [npm-png]: https://nodei.co/npm/sync-wait-group.png?stars&downloads
  [npm]: https://nodei.co/npm/sync-wait-group

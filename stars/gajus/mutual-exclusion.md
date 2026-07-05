---
repo: gajus/mutual-exclusion
url: 'https://github.com/gajus/mutual-exclusion'
homepage: null
starredAt: '2020-06-24T03:31:15Z'
createdAt: '2020-06-24T03:12:57Z'
updatedAt: '2021-02-05T10:54:52Z'
language: JavaScript
license: NOASSERTION
branch: master
stars: 14
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:48.078Z'
description: Mutual Exclusion (mutex) object for JavaScript.
tags: []
---

# mutual-exclusion (mutex)

[![GitSpo Mentions](https://gitspo.com/badges/mentions/gajus/mutual-exclusion?style=flat-square)](https://gitspo.com/mentions/gajus/mutual-exclusion)
[![Travis build status](http://img.shields.io/travis/gajus/mutual-exclusion/master.svg?style=flat-square)](https://travis-ci.org/gajus/mutual-exclusion)
[![Coveralls](https://img.shields.io/coveralls/gajus/mutual-exclusion.svg?style=flat-square)](https://coveralls.io/github/gajus/mutual-exclusion)
[![NPM version](http://img.shields.io/npm/v/mutual-exclusion.svg?style=flat-square)](https://www.npmjs.org/package/mutual-exclusion)
[![Canonical Code Style](https://img.shields.io/badge/code%20style-canonical-blue.svg?style=flat-square)](https://github.com/gajus/canonical)
[![Twitter Follow](https://img.shields.io/twitter/follow/kuizinas.svg?style=social&label=Follow)](https://twitter.com/kuizinas)

Mutual Exclusion ([mutex](https://en.wikipedia.org/wiki/Mutual_exclusion)) object for JavaScript.

* [Motivation](#motivation)
* [API](#api)
  * [Configuration](#configuration)
* [Usage examples](#usage-examples)
  * [Image server example](#image-server-example)
* [Related libraries](#related-libraries)

## Motivation

Promised based mutex allows to sequentially perform the same asynchronous operation. A typical use case example is checking if a resource exists and reading/ creating resource as an atomic asynchronous operation.

Suppose that you have a HTTP service that upon request downloads and serves an image. A naive implementation might look something like this:

```js
router.use('/images/:uid', async (incomingMessage, serverResponse) => {
  const uid = incomingMessage.params.uid;

  const temporaryDownloadPath = path.resolve(
    downloadDirectoryPath,
    uid,
  );

  const temporaryFileExists = await fs.pathExists(temporaryDownloadPath);

  if (!temporaryFileExists) {
    try {
      await pipeline(
        // Some external storage engine.
        storage.createReadStream('images/' + uid),
        fs.createWriteStream(temporaryDownloadPath),
      );
    } catch (error) {
      await fs.remove(temporaryDownloadPath);

      throw error;
    }
  }

  fs
    .createReadStream(temporaryDownloadPath)
    .pipe(serverResponse);
});

```

In the above example, if two requests are made at near the same time, then both of them will identify that `temporaryFileExists` is `false` and at least one of them will fail. Mutex solves this problem by limiting concurrent execution of several asynchronous operations (see [Image server example](#image-server-example)).

## API

```js
import {
  createMutex,
  HoldTimeoutError,
  WaitTimeoutError,,
} from 'mutual-exclusion';
import type {
  LockConfigurationInputType,
  MutexConfigurationInputType,
  MutexType,
} from 'mutual-exclusion';

/**
 * Thrown in case of `holdTimeout`.
 */
HoldTimeoutError;

/**
 * Thrown in case of `waitTimeout`.
 */
WaitTimeoutError;

const mutex: MutexType = createMutex(mutexConfigurationInput: MutexConfigurationInputType);

(async () => {
  // Lock is acquired.
  await mutex.lock(async () => {
    // Perform whatever operation that requires locking.

    mutex.isLocked();
    // true
  });

  // Lock is released.
  mutex.isLocked();
  // false
})()

```

### Configuration

`MutexConfigurationInputType` (at the mutex-level) and `LockConfigurationInputType` (at the individual lock-level) can be used to configure the scope and timeouts.

```js
/**
 * @property holdTimeout The maximum amount of time lock can be held (default: 30000).
 * @property key Used to scope mutex (default: a random generated value).
 * @property waitTimeout The maximum amount of time lock can be waited for (default: 5000).
 */
type MutexConfigurationInputType = {|
  +holdTimeout?: number,
  +key?: string,
  +waitTimeout?: number,
|};

type LockConfigurationInputType = {|
  +holdTimeout?: number,
  +key?: string,
  +waitTimeout?: number,
|};

```

## Usage examples

### Image server example

[Motivation](#motivation) section of the documentation demonstrates a flawed implementation of an image proxy server. That same service can utilise Mutex to solve the illustrated problem:

```js
router.use('/images/:uid', async (incomingMessage, serverResponse) => {
  const uid = incomingMessage.params.uid;

  const temporaryDownloadPath = path.resolve(
    downloadDirectoryPath,
    uid,
  );

  await mutex.lock(async () => {
    const temporaryFileExists = await fs.pathExists(temporaryDownloadPath);

    if (!temporaryFileExists) {
      try {
        await pipeline(
          // Some external storage engine.
          storage.createReadStream('images/' + uid),
          fs.createWriteStream(temporaryDownloadPath),
        );
      } catch (error) {
        await fs.remove(temporaryDownloadPath);

        throw error;
      }
    }
  }, {
    // Fail if image cannot be downloaded within 30 seconds.
    holdTimeout: 30000,

    // Restrict concurrency only for every unique image request.
    key: uid,

    // Fail subsequent requests if they are not attempted within 5 seconds.
    // This would happen if there is a high-concurrency or if the original request is taking a long time.
    waitTimeout: 5000,
  });

  fs
    .createReadStream(temporaryDownloadPath)
    .pipe(serverResponse);
});

```

## Related libraries

* [await-mutex](https://www.npmjs.com/package/await-mutex) – Similar implementation to mutual-exclusion, but without separation by `key` and timeouts.

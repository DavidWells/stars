---
repo: redabacha/remember-promise
url: 'https://github.com/redabacha/remember-promise'
homepage: ''
starredAt: '2022-09-14T22:01:18Z'
createdAt: '2022-09-10T19:52:19Z'
updatedAt: '2024-10-12T11:32:30Z'
language: TypeScript
license: MIT
branch: main
stars: 41
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:30.160Z'
description: Remembering promises that were made!
tags: []
---

# remember-promise

[![bundle size](https://pkg-size.dev/badge/bundle/852)](https://pkg-size.dev/remember-promise)
[![codecov](https://codecov.io/gh/redabacha/remember-promise/graph/badge.svg?token=KMRTWA2DHQ)](https://codecov.io/gh/redabacha/remember-promise)
[![JSR score](https://jsr.io/badges/@reda/remember-promise/score)](https://jsr.io/@reda/remember-promise/score)
[![JSR](https://jsr.io/badges/@reda/remember-promise)](https://jsr.io/@reda/remember-promise)
[![npm](https://shields.io/npm/v/remember-promise)](https://www.npmjs.com/package/remember-promise)
[![license](https://shields.io/github/license/redabacha/remember-promise)](https://github.com/redabacha/remember-promise/blob/main/LICENSE)

A simple utility to remember promises that were made! It is greatly inspired by
the [p-memoize](https://github.com/sindresorhus/p-memoize) utility but with
additional built-in features and changes such as:

- ttl expiry
- stale-while-revalidate behavior
- ability to ignore results from being cached
- [optimal probabilistic cache stampede prevention](https://cseweb.ucsd.edu/~avattani/papers/cache_stampede.pdf)
- zero dependencies +
  [tiny bundle size](https://pkg-size.dev/remember-promise) + universal runtime
  support!

## Installation

remember-promise is available on both
[npm](https://www.npmjs.com/package/remember-promise) and
[JSR](https://jsr.io/@reda/remember-promise). The npm package is published as
CommonJS for maximum compatibility.

To use from npm, install the
[remember-promise](https://www.npmjs.com/package/remember-promise) package and
then import into a module:

```js
import { rememberPromise } from "remember-promise";
```

To use from JSR, install the
[@reda/remember-promise](https://jsr.io/@reda/remember-promise) package and then
import into a module:

```js
import { rememberPromise } from "@reda/remember-promise";
```

## Usage

```js
import { rememberPromise } from "remember-promise";

const getRedditFeed = rememberPromise(
  (subreddit) =>
    fetch(`https://www.reddit.com/r/${subreddit}.json`).then((res) =>
      res.json()
    ),
  {
    ttl: 300_000, // 5 minutes before the result must be revalidated again
    /* see below for a full list of available options */
  },
);

const firstResult = await getRedditFeed("all");
const secondResult = await getRedditFeed("all"); // this call is cached

// only one http request is made
const [thirdResult, fourthResult] = await Promise.all([
  getRedditFeed("javascript"),
  getRedditFeed("javascript"),
]);
```

## Options

| Name                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ttl`                | Configures how long in milliseconds the cached result should be used before needing to be revalidated. Additionally, setting this value to zero or a negative number will disable caching. **NOTE: the actual revalidation of the cached result is done slightly before expiry by default. This can be adjusted using the `xfetchBeta` option.** By default this is `Infinity` so the cached result will be used indefinitely.                                                                                                                                                                                                      |
| `allowStale`         | This enables stale-while-revalidate behavior where an expired result can still be used while waiting for it to be updated in the background asynchronously. By default this is set to `true` so the behavior is enabled.                                                                                                                                                                                                                                                                                                                                                                                                            |
| `cache`              | This is where cached results will be stored. It can be anything you want such as [lru-cache](https://github.com/isaacs/node-lru-cache) or a redis backed cache as long as it implements a `get` and `set` method defined in the `RememberPromiseCache` type. If you would like to disable caching and only deduplicate identical concurrent calls instead then set this to `false`. When this is set to `false`, the `onCacheUpdateError` and `shouldIgnoreResult` options will be never be used. By default this is a new instance of [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map). |
| `getCacheKey`        | Identical behavior to the `cacheKey` option in [p-memoize](https://github.com/sindresorhus/p-memoize#cachekey) except that it's allowed to return a promise. It should return what the cache key is based on the parameters of the given function. By default this will serialize all arguments using `JSON.stringify`.                                                                                                                                                                                                                                                                                                             |
| `onCacheUpdateError` | Use this to catch errors when attempting to update the cache or if `shouldIgnoreResult` throws an error. By default this is `undefined` which means any errors will be rethrown as an unhandled promise rejection.                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `shouldIgnoreResult` | Determines whether the returned result should be added to the cache. By default this is `undefined` which means it will always use the returned result for caching.                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `xfetchBeta`         | This is the beta value used in [optimal probabilistic cache stampede prevention](https://cseweb.ucsd.edu/~avattani/papers/cache_stampede.pdf) where values more than 1 favors earlier revalidation while values less than 1 favors later revalidation. By default this is set to 1 so the revalidation of a cached result will happen at a random time slightly before expiry. **If you wish to opt-out of this behavior, then set this value to 0.**                                                                                                                                                                               |

---
repo: Kikobeats/hyperlru
url: 'https://github.com/Kikobeats/hyperlru'
homepage: 'https://kikobeats.github.io/hyperlru/'
starredAt: '2021-04-23T17:28:23Z'
createdAt: '2016-12-25T21:03:31Z'
updatedAt: '2023-01-28T03:05:24Z'
language: JavaScript
license: MIT
branch: master
stars: 34
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:47.566Z'
description: Tiny & Fast LRU Implementation as possible.
tags:
  - cache
  - lru
  - lru-cache
---

# hyperlru

![Last version](https://img.shields.io/github/tag/Kikobeats/hyperlru.svg?style=flat-square)
[![Build Status](https://img.shields.io/travis/Kikobeats/hyperlru/master.svg?style=flat-square)](https://travis-ci.org/Kikobeats/hyperlru)
[![Coverage Status](https://img.shields.io/coveralls/Kikobeats/hyperlru.svg?style=flat-square)](https://coveralls.io/github/Kikobeats/hyperlru)
[![Dependency status](https://img.shields.io/david/Kikobeats/hyperlru.svg?style=flat-square)](https://david-dm.org/Kikobeats/hyperlru)
[![Dev Dependencies Status](https://img.shields.io/david/dev/Kikobeats/hyperlru.svg?style=flat-square)](https://david-dm.org/Kikobeats/hyperlru#info=devDependencies)
[![NPM Status](https://img.shields.io/npm/dm/hyperlru.svg?style=flat-square)](https://www.npmjs.org/package/hyperlru)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/Kikobeats)

> Tiny & Fast LRU Implementation as possible.

## Features

* **Fast**: High performance (See [benchmark](#benchmark)).
* **Simple**: The whole project is ~60 lines of code.
* **Lightweight**: The package weighs less than a megabyte, with zero dependencies.

There are a lot of LRU implementations, but most of them have a poor perfomance and they are hard to understand.

**hyperlru** is an Abstract LRU implementation using traditional and efficienty data structures:

 - **Double Linked List**: It maintains the least recent list of items.
 - **Hash Table** It keeps the data for easily access to cache content.

For use it, you need to provide one of the created providers:

- [hyperlru-object](https://github.com/Kikobeats/hyperlru-object)
- [hyperlru-map](https://github.com/Kikobeats/hyperlru-map)

## Install

```bash
$ npm install hyperlru --save
```

## Usage

```js
const hyperlru = require('hyperlru')
const myProvider = require('my-hyperlru-provider')

const createLRU = hyperlru(myProvider)
const cache = createLRU({ max: 1000 })
```

## Benchmark

| name                                                | size    | gzip    | set  | get1  | update | get2  | evict |
|-----------------------------------------------------|---------|---------|------|-------|--------|-------|-------|
| [lru-fast](https://npm.im/lru-fast)                 | 2.34 kB | 793 B   | 6855 | 27105 | 21550  | 25159 | 4003  |
| [tiny-lru](https://npm.im/tiny-lru)                 | 4 kB    | 1.64 kB | 4159 | 10746 | 18909  | 15925 | 4042  |
| [lru_cache](https://npm.im/lru_cache)               | 2.19 kB | 756 B   | 5320 | 14489 | 10785  | 15963 | 4242  |
| [simple-lru-cache](https://npm.im/simple-lru-cache) | 1.43 kB | 565 B   | 3289 | 12134 | 8600   | 15266 | 3334  |
| **[hyperlru-object](https://npm.im/hyperlru-object)**   | 433 B   | 265 B   | 1152 | 8800  | 6205   | 8635  | 1039  |
| [hashlru](https://npm.im/hashlru)                   | 628 B   | 332 B   | 4438 | 5834  | 4703   | 5960  | 3474  |
| **[hyperlru-map](https://npm.im/hyperlru-map)**         | 329 B   | 232 B   | 850  | 4555  | 4030   | 4397  | 690   |
| [lru](https://npm.im/lru)                           | 6.07 kB | 1.86 kB | 2672 | 3302  | 3142   | 3898  | 1347  |
| [lru-cache](https://npm.im/lru-cache)               | 19.1 kB | 6.23 kB | 989  | 4702  | 3034   | 4536  | 773   |
| [secondary-cache](https://npm.im/secondary-cache)   | 22.6 kB | 6.54 kB | 1427 | 2292  | 2740   | 4579  | 1164  |
| [quick-lru](https://npm.im/quick-lru)               | 1.23 kB | 489 B   | 2441 | 2075  | 2525   | 2119  | 2525  |
| [modern-lru](https://npm.im/modern-lru)             | 2.27 kB | 907 B   | 1019 | 2531  | 2021   | 2456  | 731   |
| [mkc](https://npm.im/mkc)                           | 10.5 kB | 3.61 kB | 729  | 1230  | 715    | 1129  | 575   |

## API

### hyperlru([options])

#### options

##### max

Type: `number`<br>
Default: `1000`

Max of element to keep into the cache.

### .set(key, value)

Set the value of the key and mark the key as most recently used.

It returns the `value`.

### .get(key)

Query the value of the key and mark the key as most recently used.

It returns the value of key if found; `undefined` otherwise.

### .peek(key)

Query the value of the key without marking the key as most recently used.

It returns the value of key if found; `undefined` otherwise.

### .keys()

It retrieves all the keys currently in the cache.

### .values()

It retrieves all the values currently in the cache.

### .clear()

Clear all the elements in the cache.

### .remove(key)

Remove the value from the cache.

Returns: value of key if found; `undefined` otherwise.

## License

MIT © [Kiko Beats](https://github.com/Kikobeats).

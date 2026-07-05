---
repo: sindresorhus/djb2a
url: 'https://github.com/sindresorhus/djb2a'
homepage: null
starredAt: '2021-11-24T18:07:48Z'
createdAt: '2018-01-07T00:37:16Z'
updatedAt: '2025-01-07T20:11:33Z'
language: JavaScript
license: MIT
branch: main
stars: 33
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:34.457Z'
description: DJB2a non-cryptographic hash function
tags:
  - djb2
  - djb2a
  - hashing
  - node-module
  - non-cryptographic-hash-functions
  - npm-package
---

# djb2a

> [DJB2a](http://www.cse.yorku.ca/~oz/hash.html#djb2) non-cryptographic hash function

[DJB2a has good distribution and collisions are rare.](https://softwareengineering.stackexchange.com/questions/49550/which-hashing-algorithm-is-best-for-uniqueness-and-speed/145633#145633)

## Install

```
$ npm install djb2a
```

## Usage

```js
import djb2a from 'djb2a';

djb2a('🦄🌈');
//=> 1484783307
```

It returns the hash as a positive integer.

## Related

- [fnv1a](https://github.com/sindresorhus/fnv1a) - FNV-1a non-cryptographic hash function
- [sdbm](https://github.com/sindresorhus/sdbm) - SDBM non-cryptographic hash function

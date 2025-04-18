---
repo: zeke/lil-env-thing
url: 'https://github.com/zeke/lil-env-thing'
homepage: ''
starredAt: '2018-03-13T18:37:07Z'
createdAt: '2015-12-28T22:33:57Z'
updatedAt: '2021-01-13T19:48:26Z'
language: JavaScript
license: NA
branch: main
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:24.902Z'
description: ' A tiny convenience module for managing process.env.NODE_ENV'
tags: []
---

# lil-env-thing

A tiny convenience module for managing process.env.NODE_ENV

## Installation

This uses ES6 classes with getter methods, so node >=4 is required.

```sh
npm install lil-env-thing --save
```

## Usage

```js
const env = require('lil-env-thing')

// Assuming process.env.NODE_ENV is undefined:

env.test          // false
env.development   // false
env.production    // false
env.current       // undefined


process.env.NODE_ENV = 'test'

env.test          // true
env.development   // false
env.production    // false
env.current       // 'test'
```

## Tests

```sh
npm install
npm test
```

## Dependencies

None

## Dev Dependencies

- [chai](https://github.com/chaijs/chai): BDD/TDD assertion library for node.js and the browser. Test framework agnostic.
- [mocha](https://github.com/mochajs/mocha): simple, flexible, fun test framework


## License

MIT

_Generated by [package-json-to-readme](https://github.com/zeke/package-json-to-readme)_

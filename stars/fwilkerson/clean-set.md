---
repo: fwilkerson/clean-set
url: 'https://github.com/fwilkerson/clean-set'
homepage: 'https://www.npmjs.com/package/clean-set'
starredAt: '2018-11-16T19:03:46Z'
createdAt: '2018-06-06T05:03:52Z'
updatedAt: '2024-07-31T02:10:05Z'
language: JavaScript
license: MIT
branch: master
stars: 177
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:02.764Z'
description: A deep assignment alternative to the object spread operator and Object.assign
tags: []
---

# clean-set

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Build Status](https://travis-ci.org/fwilkerson/clean-set.svg?branch=master)](https://travis-ci.org/fwilkerson/clean-set)
[![codecov](https://codecov.io/gh/fwilkerson/clean-set/branch/master/graph/badge.svg)](https://codecov.io/gh/fwilkerson/clean-set)

> Quickly update a value in a deeply nested object and clone each node touched for simple change tracking `===`.

Check out [dset](https://github.com/lukeed/dset) if you just want to do an in place mutation on a deeply nested value.

## Install

> npm i clean-set

Includes builds for commonjs, umd, and esm and is less than ~~200b~~ 182b gzip (thanks to [@lukeed](https://github.com/lukeed))

## Usage

```javascript
let current = {
  a: { b: [], c: true },
  d: [],
  e: {
    f: { g: 'hello' },
    h: { i: 0 },
  },
};

let next = cleanSet(current, 'e.h.i', 1);

/**
 * Alternatively you can provide a function for the final parameter to
 * receive the current value of that node.
 *
 * let next = cleanSet(current, 'e.h.i', i => i + 1);
 */

// The value is assigned
console.log(next.e.h.i !== current.e.h.i); // true

// Each parent node touched is a new reference
console.log(next.e.h !== current.e.h); // true
console.log(next.e !== current.e); // true
console.log(next !== current); // true

// Untouched references remain the same
console.log(next.e.f === current.e.f); // true
console.log(next.a === current.a); // true
console.log(next.a.b === current.a.b); // true
console.log(next.d === current.d); // true
```

Here's what an object spread equivalent would look like.

```javascript
let next = {
  ...current,
  e: {
    ...current.e,
    h: { ...current.e.h, i: 1 },
  },
};
```

## Benchmarks

Check out the [es bench link](https://esbench.com/bench/5b16f1cbf2949800a0f61cf2) to run the benchmarks yourself.

> Note: YMMV canary and firefox dev have some impressive improvements for object assign and object spread respectively.

Chrome 67

<img src="./assets/chrome_67.png">

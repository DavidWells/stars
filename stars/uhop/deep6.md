---
repo: uhop/deep6
url: 'https://github.com/uhop/deep6'
homepage: ''
starredAt: '2021-12-18T08:15:54Z'
createdAt: '2020-11-04T20:51:32Z'
updatedAt: '2024-07-16T22:28:45Z'
language: JavaScript
license: NOASSERTION
branch: master
stars: 8
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:26.888Z'
description: >-
  No dependency mini-library: deep equivalency, object pattern matching, deep
  cloning, unification.
tags:
  - deep-equal
  - deep-equals
  - unification
---

# deep6 [![NPM version][npm-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/deep6.svg
[npm-url]:   https://npmjs.org/package/deep6

`deep6` is a no-dependency ES6 mini-library:

* Advanced deep equivalency for JavaScript structures.
  * Extensible to accommodate custom objects.
* Traversing objects.
  * Extensible deep cloning.
* Written in ES6:
  * Use it in Node or browsers without transpiling.
  * Natively supports `Map`, `Set`, typed arrays.
  * Natively supports symbols and property descriptors.
  * Presented as ES6 modules, yet provides CommonJS modules for convenience.
* Efficient non-recursive algorithms.
  * ~500 tests to ensure correctness.
  * Support for circular dependencies.
  * Support for "loose" comparisons.
* Unification.
  * Identifying and capturing object fragments.

## Intro

```js
import equal, {match, clone, any} from 'deep6';

const x = {a: 1, b: 2, c: ['hi!', 42, null, {}]};

// deep equality
equal(x, {b: 2, a: 1, c: ['hi!', 42, null, {}]});     // true
equal(x, {b: 2, a: 1, c: ['hi!', 42, null, {z: 1}]}); // false

// pattern matching
match(x, {a: 1});         // true
match(x, {z: 1});         // false
match(x, {a: 1, c: any}); // true
match(x, {a: 1, c: []});  // false
match(x, {a: 1, d: any}); // false

// deep cloning
const y = clone(x);
equal(x, y);              // true

// circular dependencies are fine
const z = {},
  w = {};
z.z = z;
w.z = w;
const p = clone(w);
equal(z, w);              // true
equal(z, p);              // true

// more standard types
const m = {a: new Map(), b: Buffer.from([99, 98, 97])};
m.a.set('a', [Symbol(), new Set([1, 2, 3])]);
m.a.set('b', [/^abc/i, new Date()]);
const n = clone(m);
equal(m, n);              // true

// advanced: symbols
const s = Symbol(),
  t = {[s]: 42, [Symbol.for('deep6')]: 33},
  u = {[s]: 42, [Symbol.for('deep6')]: 33},
  v = clone(u, {symbols: true});
equal(t, u, {symbols: true}); // true
equal(t, v, {symbols: true}); // true

// advanced: clone non-enumerable properties
const r = {a: 1};
Object.defineProperty(r, 'b', {value: 2, enumerable: false});
const q = clone(r, {allProps: true});
r === q;                  // false
equal(r, {a: 1});         // true
equal(r, {a: 1, b: 2});   // false
r.a === q.a;              // true
r.b === q.b;              // true
```

## Docs

All pertinent information is in the [wiki](https://github.com/uhop/deep6/wiki).

## Installation and use

```bash
npm install --save deep6
```

```js
// ES6 modules
import equal, {clone} from 'deep6';
import matchString from 'deep6/unifiers/matchString';
```

```js
// CommonJS modules
const {equal, clone} = require('deep6/cjs');
const matchString = require('deep6/cjs/unifiers/matchString').default;
```

## License

BSD-3-Clause

## Release History

- 1.1.4 *updated dev deps.*
- 1.1.3 *updated dev deps.*
- 1.1.2 *updated dev deps.*
- 1.1.1 *reformulated `any` as a well-known symbol.*
- 1.1.0 *separated from [yopl](https://npmjs.org/package/yopl), extensive refactoring.*
- 1.0.1 *added the exports statement.*
- 1.0.0 *the first 1.0 release.*

---
repo: lukeed/nestie
url: 'https://github.com/lukeed/nestie'
homepage: ''
starredAt: '2020-09-10T01:39:43Z'
createdAt: '2020-09-09T00:02:09Z'
updatedAt: '2024-12-28T17:56:13Z'
language: JavaScript
license: MIT
branch: master
stars: 202
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:35.155Z'
description: A tiny (215B) and fast utility to expand a flattened object
tags: []
---

# nestie [![CI](https://github.com/lukeed/nestie/workflows/CI/badge.svg)](https://github.com/lukeed/nestie/actions) [![codecov](https://badgen.now.sh/codecov/c/github/lukeed/nestie)](https://codecov.io/gh/lukeed/nestie)

> A tiny (215B) and [fast](#benchmarks) utility to expand a flattened object

This module expands an Object who's keys are delimited/condensed representatives of multiple levels.

By default, the `.` character is used as a delimiter. This is customizable. <br>Keys are split using the delimiter, each signifying a new level/depth.


## Install

```
$ npm install --save nestie
```


## Usage

> Please see [Keys](#keys) for pathing options

```js
import { nestie } from 'nestie';

nestie({
  'a': 'hi',
  'b.b.0': 'foo',
  'b.b.1': '',
  'b.b.3': 'bar',
  'b.d': 'hello',
  'b.e.a': 'yo',
  'b.e.b': null,
  'b.e.c': 'sup',
  'b.e.d': 0,
  'b.e.f.0.foo': 123,
  'b.e.f.0.bar': 123,
  'b.e.f.1.foo': 465,
  'b.e.f.1.bar': 456,
  'c': 'world'
});
//=> {
//=>   a: 'hi',
//=>   b: {
//=>     b: ['foo', '', , 'bar'],
//=>     d: 'hello',
//=>     e: {
//=>       a: 'yo',
//=>       b: null,
//=>       c: 'sup',
//=>       d: 0,
//=>       f: [
//=>         { foo: 123, bar: 123 },
//=>         { foo: 465, bar: 456 },
//=>       ]
//=>     }
//=>   },
//=>   c: 'world'
//=> }
```

## Keys

Here are additional examples using different key-notation combinations in order represent different Array/Object structures.

```js
nestie({
  'hello.there': 123,
  'hello.world': 456,
});
//=> {
//=>   hello: {
//=>     there: 123,
//=>     world: 456
//=>   }
//=> }

nestie({
  'foo.0.bar': 1,
  'foo.1': 'hello',
  'foo.2.bar': 3,
});
//=> {
//=>   foo: [
//=>     { bar: 1 },
//=>     'hello',
//=>     { bar: 3 }
//=>   ]
//=> }

nestie({
  '0.0': 'foo',
  '0.1': 'bar',
  '1.foo.bar': 123,
  '1.foo.baz.0': 4,
  '1.foo.baz.1': 5,
  '1.foo.baz.2': 6,
  '1.hello': 'world',
  '2': 'howdy'
});
//=> [
//=>   ['foo', 'bar'],
//=>   {
//=>     foo: {
//=>       bar: 123,
//=>       baz: [4, 5, 6]
//=>     },
//=>     hello: 'world'
//=>   },
//=>   'howdy'
//=> ]
```

## API

### nestie(input, delimiter?)
Returns: `Object` or `Array`

Returns a new Object or Array, depending on the keys.

> **Note:** A `null` or `undefined` input will return `undefined`~!

#### input
Type: `Object`

The object to expand.

#### delimiter
Type: `String`<br>
Default: `.`

The "glue" used to join multi-level keys together. <br>
Keys will be split using this `delimiter` string, signifying a new level/depth.

```js
const input = {
  'foo.bar': 123,
  'hello_world': 456,
};

nestie(input);
//=> {
//=>   foo: { bar: 123 },
//=>   hello_world: 456,
//=> }

nestie(input, '_');
//=> {
//=>   'foo.bar': 123,
//=>   hello: { world: 456 },
//=> }
```


## Benchmarks

> Running on Node.js v18.12.1

> **Note:** The `≠` denotes that the candidate has a different API and is not a direct comparison.

```
Load Time:
  dset         0.421ms
  lodash/set   5.472ms
  flat         0.926ms
  nestie       0.131ms

Validation:
  ✘ lodash/set ≠ (FAILED) @ "array w/ holes"
  ✘ dset ≠ (FAILED) @ "array w/ holes"
  ✔ flat.unflatten
  ✔ nestie

Benchmark:
  lodash/set ≠     x 365,431 ops/sec ±0.46% (96 runs sampled)
  dset ≠           x 528,696 ops/sec ±0.12% (99 runs sampled)
  flat.unflatten   x 235,161 ops/sec ±0.16% (98 runs sampled)
  nestie           x 565,665 ops/sec ±0.13% (99 runs sampled)
```


## Related

* [flattie](https://github.com/lukeed/flattie) – flatten an object using customizable glue in 187 bytes <br>_This is `nestie`'s reverse / counterpart._
* [dset](https://github.com/lukeed/dset) – safely write deep Object values in 160 bytes
* [dlv](https://github.com/developit/dlv) – safely read from deep properties in 120 bytes


## License

MIT © [Luke Edwards](https://lukeed.com)

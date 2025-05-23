---
repo: ehmicky/test-each
url: 'https://github.com/ehmicky/test-each'
homepage: ''
starredAt: '2019-07-11T19:22:27Z'
createdAt: '2019-05-22T18:41:45Z'
updatedAt: '2025-02-04T20:38:23Z'
language: JavaScript
license: Apache-2.0
branch: main
stars: 114
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:29.777Z'
description: "\U0001F916 Repeat tests. Repeat tests. Repeat tests."
tags:
  - cartesian
  - code-quality
  - data-driven
  - data-driven-testing
  - data-driven-tests
  - es6
  - foreach
  - functional-programming
  - fuzz
  - fuzz-testing
  - fuzzing
  - iterable
  - javascript
  - library
  - nodejs
  - snapshot-testing
  - test
  - test-automation
  - testing
  - typescript
---

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/ehmicky/design/main/test-each/test-each_dark.svg"/>
  <img alt="test-each logo" src="https://raw.githubusercontent.com/ehmicky/design/main/test-each/test-each.svg" width="500"/>
</picture>

[![Node](https://img.shields.io/badge/-Node.js-808080?logo=node.js&colorA=404040&logoColor=66cc33)](https://www.npmjs.com/package/test-each)
[![Browsers](https://img.shields.io/badge/-Browsers-808080?logo=firefox&colorA=404040)](https://unpkg.com/test-each?module)
[![TypeScript](https://img.shields.io/badge/-Typed-808080?logo=typescript&colorA=404040&logoColor=0096ff)](/src/main.d.ts)
[![Codecov](https://img.shields.io/badge/-Tested%20100%25-808080?logo=codecov&colorA=404040)](https://codecov.io/gh/ehmicky/test-each)
[![Minified size](https://img.shields.io/bundlephobia/minzip/test-each?label&colorA=404040&colorB=808080&logo=webpack)](https://bundlephobia.com/package/test-each)
[![Mastodon](https://img.shields.io/badge/-Mastodon-808080.svg?logo=mastodon&colorA=404040&logoColor=9590F9)](https://fosstodon.org/@ehmicky)
[![Medium](https://img.shields.io/badge/-Medium-808080.svg?logo=medium&colorA=404040)](https://medium.com/@ehmicky)

🤖 Repeat tests. Repeat tests. Repeat tests.

Repeats tests using different inputs
([Data-Driven Testing](https://en.wikipedia.org/wiki/Data-driven_testing)):

- test runner independent: works with your current setup
- generates [test titles](#test-titles) that are descriptive, unique, for any
  JavaScript type (not just JSON)
- loops over every possible combination of inputs
  ([cartesian product](#cartesian-product))
- can use random functions ([fuzz testing](#fuzz-testing))
- [snapshot testing](#snapshot-testing) friendly

# Hire me

Please
[reach out](https://www.linkedin.com/feed/update/urn:li:activity:7117265228068716545/)
if you're looking for a Node.js API or CLI engineer (11 years of experience).
Most recently I have been [Netlify Build](https://github.com/netlify/build)'s
and [Netlify Plugins](https://www.netlify.com/products/build/plugins/)'
technical lead for 2.5 years. I am available for full-time remote positions.

# Example

<!-- eslint-disable max-nested-callbacks -->

```js
// The examples use Ava but any test runner works (Jest, Mocha, Jasmine, etc.)
import test from 'ava'

import multiply from './multiply.js'

import { each } from 'test-each'

// The code we are testing

// Repeat test using different inputs and expected outputs
each(
  [
    { first: 2, second: 2, output: 4 },
    { first: 3, second: 3, output: 9 },
  ],
  ({ title }, { first, second, output }) => {
    // Test titles will be:
    //    should multiply | {"first": 2, "second": 2, "output": 4}
    //    should multiply | {"first": 3, "second": 3, "output": 9}
    test(`should multiply | ${title}`, (t) => {
      t.is(multiply(first, second), output)
    })
  },
)

// Snapshot testing. The `output` is automatically set on the first run,
// then re-used in the next runs.
each(
  [
    { first: 2, second: 2 },
    { first: 3, second: 3 },
  ],
  ({ title }, { first, second }) => {
    test(`should multiply outputs | ${title}`, (t) => {
      t.snapshot(multiply(first, second))
    })
  },
)

// Cartesian product.
// Run this test 4 times using every possible combination of inputs
each([0.5, 10], [2.5, 5], ({ title }, first, second) => {
  test(`should mix integers and floats | ${title}`, (t) => {
    t.is(typeof multiply(first, second), 'number')
  })
})

// Fuzz testing. Run this test 1000 times using different numbers.
each(1000, Math.random, ({ title }, index, randomNumber) => {
  test(`should correctly multiply floats | ${title}`, (t) => {
    t.is(multiply(randomNumber, 1), randomNumber)
  })
})
```

# Install

```
npm install -D test-each
```

This package works in both Node.js >=18.18.0 and
[browsers](https://raw.githubusercontent.com/ehmicky/dev-tasks/main/src/browserslist).

This is an ES module. It must be loaded using
[an `import` or `import()` statement](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c),
not `require()`. If TypeScript is used, it must be configured to
[output ES modules](https://www.typescriptlang.org/docs/handbook/esm-node.html),
not CommonJS.

# Usage

```js
import { each } from 'test-each'

const inputs = [
  ['red', 'blue'],
  [0, 5, 50],
]
each(...inputs, (info, color, number) => {})
```

Fires `callback` once for each possible combination of `inputs`.

Each `input` can be an [`array`](#cartesian-product), a
[`function`](#input-functions) or an [`integer`](#fuzz-testing).

A common use case for `callback` is to define tests (using any test runner).

[`info`](#info) is an `object` whose properties can be used to generate
[test titles](#test-titles).

### Test titles

Each combination of parameters is stringified as a `title` available in the
`callback`'s [first argument](#infotitle).

Titles should be included in test titles to make them descriptive and unique.

Long titles are truncated. An incrementing counter is appended to duplicates.

Any JavaScript type is
[stringified](https://github.com/facebook/jest/tree/master/packages/pretty-format),
not just JSON.

You can customize titles either by:

- defining `title` properties in `inputs` that are
  [plain objects](https://stackoverflow.com/a/52453477/1526301)
- using the [`info` argument](#info)

<!-- eslint-disable max-nested-callbacks -->

```js
import { each } from 'test-each'

each([{ color: 'red' }, { color: 'blue' }], ({ title }, param) => {
  // Test titles will be:
  //    should test color | {"color": "red"}
  //    should test color | {"color": "blue"}
  test(`should test color | ${title}`, () => {})
})

// Plain objects can override this using a `title` property
each(
  [
    { color: 'red', title: 'Red' },
    { color: 'blue', title: 'Blue' },
  ],
  ({ title }, param) => {
    // Test titles will be:
    //    should test color | Red
    //    should test color | Blue
    test(`should test color | ${title}`, () => {})
  },
)

// The `info` argument can be used for dynamic titles
each([{ color: 'red' }, { color: 'blue' }], (info, param) => {
  // Test titles will be:
  //    should test color | 0 red
  //    should test color | 1 blue
  test(`should test color | ${info.index} ${param.color}`, () => {})
})
```

### Cartesian product

If several `inputs` are specified, their
[cartesian product](https://github.com/ehmicky/fast-cartesian) is used.

```js
import { each } from 'test-each'

// Run callback five times: a -> b -> c -> d -> e
each(['a', 'b', 'c', 'd', 'e'], (info, param) => {})

// Run callback six times: a c -> a d -> a e -> b c -> b d -> b e
each(['a', 'b'], ['c', 'd', 'e'], (info, param, otherParam) => {})

// Nested arrays are not iterated.
// Run callback only twice: ['a', 'b'] -> ['c', 'd', 'e']
each(
  [
    ['a', 'b'],
    ['c', 'd', 'e'],
  ],
  (info, param) => {},
)
```

### Input functions

If a `function` is used instead of an array, each iteration fires it and uses
its return value instead. The `function` is called with the
[same arguments](https://github.com/ehmicky/test-each#testeachinputs-callback)
as the `callback`.

The generated values are included in [test titles](#test-titles).

<!-- eslint-disable max-params -->

```js
import { each } from 'test-each'

// Run callback with a different random number each time
each(['red', 'green', 'blue'], Math.random, (info, color, randomNumber) => {})

// Input functions are called with the same arguments as the callback
each(
  ['02', '15', '30'],
  ['January', 'February', 'March'],
  ['1980', '1981'],
  (info, day, month, year) => `${day}/${month}/${year}`,
  (info, day, month, year, date) => {},
)
```

### Fuzz testing

Integers can be used instead of arrays to multiply the number of iterations.

This enables [fuzz testing](https://en.wikipedia.org/wiki/Fuzzing) when combined
with [input functions](#input-functions) and libraries like
[faker.js](https://github.com/tzuryby/Faker.js),
[chance.js](https://github.com/chancejs/chancejs) or
[json-schema-faker](https://github.com/json-schema-faker/json-schema-faker).

```js
import faker from 'faker'

// Run callback 1000 times with a random UUID and color each time
each(
  1000,
  faker.random.uuid,
  faker.random.arrayElement(['green', 'red', 'blue']),
  (info, randomUuid, randomColor) => {},
)

// `info.index` can be used as a seed for reproducible randomness.
// The following series of 1000 UUIDs will remain the same across executions.
each(
  1000,
  ({ index }) => faker.seed(index) && faker.random.uuid(),
  (info, randomUuid) => {},
)
```

### Snapshot testing

This library works well with
[snapshot testing](https://github.com/bahmutov/snap-shot-it#use).

Any library can be used
([`snap-shot-it`](https://github.com/bahmutov/snap-shot-it),
[Ava snapshots](https://github.com/avajs/ava/blob/master/docs/04-snapshot-testing.md),
[Jest snapshots](https://jestjs.io/docs/en/snapshot-testing),
[Node TAP snapshots](https://node-tap.org/plugins/snapshot/), etc.).

<!-- eslint-disable max-nested-callbacks -->

```js
import { each } from 'test-each'

// The `output` is automatically set on the first run,
// then re-used in the next runs.
each(
  [
    { first: 2, second: 2 },
    { first: 3, second: 3 },
  ],
  ({ title }, { first, second }) => {
    test(`should multiply outputs | ${title}`, (t) => {
      t.snapshot(multiply(first, second))
    })
  },
)
```

### Side effects

If `callback`'s [parameters](#params) are directly modified, they should be
copied to prevent side effects for the next iterations.

<!-- eslint-disable fp/no-mutation, no-param-reassign -->

```js
import { each } from 'test-each'

each(
  ['green', 'red', 'blue'],
  [{ active: true }, { active: false }],
  (info, color, param) => {
    // This should not be done, as the objects are re-used in several iterations
    param.active = false

    // But this is safe since it's a copy
    const newParam = { ...param }
    newParam.active = false
  },
)
```

### Iterables

[`iterable()`](#iterableinputs) can be used to iterate over each combination
instead of providing a callback.

<!-- eslint-disable fp/no-loops -->

```js
import { iterable } from 'test-each'

const combinations = iterable(
  ['green', 'red', 'blue'],
  [{ active: true }, { active: false }],
)

for (const [{ title }, color, param] of combinations) {
  test(`should test color | ${title}`, () => {})
}
```

The return value is an
[`Iterable`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators#Iterables).
This can be converted to an array with the spread operator.

<!-- eslint-disable max-nested-callbacks -->

```js
const array = [...combinations]

array.forEach(([{ title }, color, param]) => {
  test(`should test color | ${title}`, () => {})
})
```

# API

## each(...inputs, callback)

`inputs`: `Array | function | integer` (one or [several](#cartesian-product))\
`callback`: `(info, ...params) => void`

Fires `callback` with each combination of [`params`](#params).

## iterable(...inputs)

`inputs`: `Array | function | integer` (one or [several](#cartesian-product))\
_Return value_:
[`Iterable<[info, ...params]>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators#Iterables)

Returns an
[`Iterable`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators#Iterables)
looping through each combination of [`params`](#params).

### info

_Type_: `object`

#### info.title

_Type_: `string`

Like [`params`](#params) but stringified. Should be used in
[test titles](#test-titles).

#### info.titles

_Type_: `string[]`

Like [`info.title`](#infotitle) but for each [`param`](#params).

#### info.index

_Type_: `integer`

Incremented on each iteration. Starts at `0`.

#### info.indexes

_Type_: `integer[]`

Index of each [`params`](#params) inside each initial
[`input`](#eachinputs-callback).

### params

_Type_: `any` (one or [several](#cartesian-product))

Combination of inputs for the current iteration.

# Support

For any question, _don't hesitate_ to [submit an issue on GitHub](../../issues).

Everyone is welcome regardless of personal background. We enforce a
[Code of conduct](CODE_OF_CONDUCT.md) in order to promote a positive and
inclusive environment.

# Contributing

This project was made with ❤️. The simplest way to give back is by starring and
sharing it online.

If the documentation is unclear or has a typo, please click on the page's `Edit`
button (pencil icon) and suggest a correction.

If you would like to help us fix a bug or add a new feature, please check our
[guidelines](CONTRIBUTING.md). Pull requests are welcome!

<!-- Thanks go to our wonderful contributors: -->

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- prettier-ignore -->
<!--
<table><tr><td align="center"><a href="https://fosstodon.org/@ehmicky"><img src="https://avatars2.githubusercontent.com/u/8136211?v=4" width="100px;" alt="ehmicky"/><br /><sub><b>ehmicky</b></sub></a><br /><a href="https://github.com/ehmicky/test-each/commits?author=ehmicky" title="Code">💻</a> <a href="#design-ehmicky" title="Design">🎨</a> <a href="#ideas-ehmicky" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ehmicky/test-each/commits?author=ehmicky" title="Documentation">📖</a></td></tr></table>
-->
<!-- ALL-CONTRIBUTORS-LIST:END -->

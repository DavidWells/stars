---
repo: lukeed/uvu
url: 'https://github.com/lukeed/uvu'
homepage: ''
starredAt: '2020-07-14T18:50:22Z'
createdAt: '2020-05-11T21:02:01Z'
updatedAt: '2025-02-20T12:11:32Z'
language: JavaScript
license: MIT
branch: master
stars: 2979
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:43.656Z'
description: >-
  uvu is an extremely fast and lightweight test runner for Node.js and the
  browser
tags: []
---

<div align="center">
  <img src="shots/uvu.jpg" alt="uvu" height="120" />
</div>

<div align="center">
  <a href="https://npmjs.org/package/uvu">
    <img src="https://badgen.now.sh/npm/v/uvu" alt="version" />
  </a>
  <a href="https://github.com/lukeed/uvu/actions">
    <img src="https://github.com/lukeed/uvu/workflows/CI/badge.svg" alt="CI" />
  </a>
  <a href="https://licenses.dev/npm/uvu">
    <img src="https://licenses.dev/b/npm/uvu" alt="licenses" />
  </a>
  <a href="https://npmjs.org/package/uvu">
    <img src="https://badgen.now.sh/npm/dm/uvu" alt="downloads" />
  </a>
</div>

<div align="center">
  <b>uvu</b> is an extremely fast and lightweight test runner for Node.js and the browser<br>
  <b>U</b>ltimate <b>V</b>elocity, <b>U</b>nleashed<br><br>
  <img width="380" alt="example with suites" src="shots/suites.gif"/>
</div>


## Features

* Super [lightweight](https://npm.anvaka.com/#/view/2d/uvu)
* Extremely [performant](#benchmarks)
* Individually executable test files
* Supports `async`/`await` tests
* Supports native ES Modules
* Browser-Compatible
* Familiar API


## Install

```
$ npm install --save-dev uvu
```


## Usage

> Check out [`/examples`](/examples) for a list of working demos!

```js
// tests/demo.js
import { test } from 'uvu';
import * as assert from 'uvu/assert';

test('Math.sqrt()', () => {
  assert.is(Math.sqrt(4), 2);
  assert.is(Math.sqrt(144), 12);
  assert.is(Math.sqrt(2), Math.SQRT2);
});

test('JSON', () => {
  const input = {
    foo: 'hello',
    bar: 'world'
  };

  const output = JSON.stringify(input);

  assert.snapshot(output, `{"foo":"hello","bar":"world"}`);
  assert.equal(JSON.parse(output), input, 'matches original');
});

test.run();
```

Then execute this test file:

```sh
# via `uvu` cli, for all `/tests/**` files
$ uvu -r esm tests

# via `node` directly, for file isolation
$ node -r esm tests/demo.js
```

> **Note:** The `-r esm` is for legacy Node.js versions. [Learn More](/docs/esm.md)

> [View the `uvu` CLI documentation](/docs/cli.md)


## Assertions

The [`uvu/assert`](/docs/api.assert.md) module is _completely_ optional.

In fact, you may use any assertion library, including Node's native [`assert`](https://nodejs.org/api/assert.html) module! This works because `uvu` relies on thrown Errors to detect failures. Implicitly, this also means that any uncaught exceptions and/or unhandled `Promise` rejections will result in a failure, which is what you want!


## API

### Module: `uvu`

> [View `uvu` API documentation](/docs/api.uvu.md)

The main entry from which you will import the `test` or `suite` methods.

### Module: `uvu/assert`

> [View `uvu/assert` API documentation](/docs/api.assert.md)

A collection of assertion methods to use within your tests. Please note that:

* these are browser compatible
* these are _completely_ optional


## Benchmarks

> via the [`/bench`](/bench) directory with Node v10.21.0

Below you'll find each test runner with two timing values:

* the `took ___` value is the total process execution time – from startup to termination
* the parenthesis value (`(___)`) is the self-reported execution time, if known

Each test runner's `stdout` is printed to the console to verify all assertions pass.<br>Said output is excluded below for brevity.

```
~> "ava"   took   594ms  (  ???  )
~> "jest"  took   962ms  (356  ms)
~> "mocha" took   209ms  (  4  ms)
~> "tape"  took   122ms  (  ???  )
~> "uvu"   took    72ms  (  1.3ms)
```


## License

MIT © [Luke Edwards](https://lukeed.com)

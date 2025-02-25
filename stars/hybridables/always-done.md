---
repo: hybridables/always-done
url: 'https://github.com/hybridables/always-done'
homepage: ''
starredAt: '2016-11-22T02:30:15Z'
createdAt: '2015-07-12T16:07:47Z'
updatedAt: '2024-10-29T23:13:13Z'
language: JavaScript
license: MIT
branch: master
stars: 32
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:15.131Z'
description: >-
  :trophy: Handle completion and errors with elegance! Support for async/await,
  promises, callbacks, streams and observables. A drop-in replacement for
  async-done - pass 100% of its tests plus more
tags: []
---

<p align="center">
  <a href="https://github.com/hybridables">
    <img height="250" width="250" src="https://avatars1.githubusercontent.com/u/10666022?v=3&s=250">
  </a>
</p>

# [always-done][author-www-url] [![npmjs.com][npmjs-img]][npmjs-url] [![The MIT License][license-img]][license-url] [![npm downloads][downloads-img]][downloads-url] 

> Handle completion and errors with elegance! Support for streams, callbacks, promises, child processes, async/await and sync functions. A drop-in replacement for [async-done][] - pass 100% of its tests plus more

[![code climate][codeclimate-img]][codeclimate-url] [![standard code style][standard-img]][standard-url] [![travis build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![dependency status][david-img]][david-url]

## Table of Contents
- [Install](#install)
- [Usage](#usage)
- [Background](#background)
- [Resolution](#resolution)
- [API](#api)
  * [alwaysDone](#alwaysdone)
- [Supports](#supports)
  * [Handles `async/await` completion](#handles-asyncawait-completion)
  * [Callbacks completion](#callbacks-completion)
  * [Completion of synchronous functions](#completion-of-synchronous-functions)
  * [Completion of Promises](#completion-of-promises)
  * [Streams completion](#streams-completion)
  * [Handles completion of Observables](#handles-completion-of-observables)
  * [Completion of Child Process](#completion-of-child-process)
  * [Handling errors](#handling-errors)
  * [Always completes](#always-completes)
  * [Passing custom context](#passing-custom-context)
  * [Passing custom arguments](#passing-custom-arguments)
  * [Returning a thunk](#returning-a-thunk)
- [Related](#related)
- [Contributing](#contributing)

## Install
> Install with [npm](https://www.npmjs.com/)

```sh
$ npm i always-done --save
```

## Usage
> For more use-cases see the [tests](./test.js)

```js
const fs = require('fs')
const alwaysDone = require('always-done')

alwaysDone((cb) => {
  fs.readFile('./package.json', 'utf8', cb)
}, (err, res) => {
  if (err) return console.error(err)

  let json = JSON.parse(res)
  console.log(json.name) // => 'always-done'
})
```

## Background

Behind the scenes we use just good plain old `try/catch` block. Sounds you strange? See what "hard" job is done on [try-catch-callback][] and [try-catch-core][].

In the first one, we just calls a function inside try/catch and calls `done` callback with error or result of that function.

About second one, there we wraps the `done` callback with [once][] and [dezalgo][] to ensure it will be called in the next tick.

Here, in `always-done`, we just give a `callback` to that [try-catch-core][] package and "listen" what is the result. Actually we not listening anything, we just make a few checks to understand what the incoming value is - promise, child process, stream, observable and etc.

## Resolution

Nothing so magical. Try/catch block for most of the things works briliant. And [on-stream-end][] module (which is drop-in replacement for [end-of-stream][]) for streams and child processes.

**[back to top](#readme)**

## API

### [alwaysDone](index.js#L55)
> Handle completion of `fn` and optionally pass `done` callback, otherwise it returns a thunk. If that `thunk` does not accept function, it returns another thunk until you pass `done` to it.

**Params**

* `<fn>` **{Function}**: function to be called    
* `[opts]` **{Object}**: optional options, such as `context` and `args`, passed to [try-catch-core][]    
* `[opts.context]` **{Object}**: context to be passed to `fn`    
* `[opts.args]` **{Array}**: custom argument(s) to be pass to `fn`, given value is arrayified    
* `[opts.passCallback]` **{Boolean}**: pass `true` if you want `cb` to be passed to `fn` args    
* `[done]` **{Function}**: on completion    
* `returns` **{Function}**: thunk until you pass `done` to that thunk  

**Example**

```js
var alwaysDone = require('always-done')
var options = {
  context: { num: 123, bool: true }
  args: [require('assert')]
}

alwaysDone(function (assert, next) {
  assert.strictEqual(this.num, 123)
  assert.strictEqual(this.bool, true)
  next()
}, options, function (err) {
  console.log(err, 'done') // => null, 'done'
})

alwaysDone(function (cb) {
  cb(new Error('foo bar'))
}, function done (err) {
  console.log(err) // => Error: foo bar
})

```

**[back to top](#readme)**

## Supports
> Handles completion and errors of async/await, synchronous and asynchronous (callback) functions, also functions that returns streams, promises, child process and observables.

### Handles `async/await` completion

```js
alwaysDone(async function () {
  return await Promise.resolve('foobar')
}, function done (e, res) {
  console.log(res) // => 'foobar'
})
```

**[back to top](#readme)**

### Callbacks completion

```js
var alwaysDone = require('always-done')

alwaysDone(function (cb) {
  fs.readFile('./package.json', 'utf8', cb)
}, function done (err, res) {
  if (err) return console.log(err)
 
  var pkg = JSON.parse(res)
  console.log(pkg.name) // => 'always-done'
})
```

**[back to top](#readme)**

### Completion of synchronous functions

#### Returning a value

```js
alwaysDone(function () {
  return 123
}, function done (e, res) {
  console.log(res) // => 123
})
```

#### Returning an error

```js
alwaysDone(function () {
  return new Error('qux bar')
}, function done (err) {
  console.log(err.message) // => 'qux bar'
})
```

**[back to top](#readme)**

### Completion of Promises

#### Returning a resolved Promise

```js
alwaysDone(function () {
  return Promise.resolve(12345)
}, function done (e, res) {
  console.log(res) // => 12345
})
```

#### Returning a rejected Promise

```js
alwaysDone(function () {
  return Promise.reject(new Error('foo bar'))
}, function done (err) {
  console.log(err.message) // => 'foo bar
})
```

**[back to top](#readme)**

### Streams completion
> Using [on-stream-end][] and [stream-exhaust][]

#### Unpiped streams

```js
alwaysDone(function () {
  return fs.createReadStream('./package.json')
}, function done (e) {
  console.log('stream completed')
})
```

#### Failing unpiped streams

```js
alwaysDone(function () {
  return fs.createReadStream('foo bar')
}, function done (err) {
  console.log(err.code) // => ENOENT
  console.log(err.message) // => No such file or directory
})
```

#### Failing piped streams

```js
alwaysDone(function () {
  var read = fs.createReadStream('foo bar')
  return read.pipe(through2())
}, function done (err) {
  console.log(err.code) // => ENOENT
  console.log(err.message) // => No such file or directory
})
```

**[back to top](#readme)**

### Handles completion of Observables
> Using `.subscribe` method of the observable

#### Empty observable
```js
var Observable = require('rx').Observable

alwaysDone(function () {
  return Observable.empty()
}, function done (e, res) {
  console.log(e, res) // => null, undefined
})
```

#### Successful observable

```js
alwaysDone(function () {
  return Observable.return([1, 2, 3])
}, function done (e, res) {
  console.log(res) // => [1, 2, 3]
})
```

#### Failing observable

```js
alwaysDone(function () {
  return Observable.throw(new Error('observable error'))
}, function done (err) {
  console.log(err.message) // => 'observable error'
})
```

**[back to top](#readme)**

### Completion of Child Process
> Basically, they are streams, so completion is handled using [on-stream-end][] which is drop-in replacement for [end-of-stream][]

#### Successful exec

```js
var cp = require('child_process')

alwaysDone(function () {
  return cp.exec('echo hello world')
}, function done (e, res) {
  console.log(res) // => 'hello world'
})
```

#### Failing exec

```js
var cp = require('child_process')

alwaysDone(function () {
  return cp.exec('foo-bar-baz sasa')
}, function done (err) {
  console.log(err.message) // => 'exited with error code: 12'
})
```

#### Failing spawn

```js
var cp = require('child_process')

alwaysDone(function () {
  return cp.spawn('foo-bar-baz', ['hello world'])
}, function done (err) {
  console.log(err.code) // => ENOENT
})
```

**[back to top](#readme)**

### Handling errors

#### uncaught exceptions

```js
alwaysDone(function () {
  foo // ReferenceError
  return 55
}, function (err) {
  console.log(err.name)
  // => ReferenceError: foo is not defined
})
```

#### thrown errors

```js
alwaysDone(function () {
  JSON.parse('{"foo":')
}, function (err) {
  console.log(err)
  // => SyntaxError: Unexpected end of JSON input
})
```

**[back to top](#readme)**

### Always completes
> It may looks strange, but it's logical. If you pass empty function it just completes with `undefined` result and `null` error.

**Example**

```js
// passing empty function
alwaysDone(function () {}, function (err, res) {
  console.log(err, res) // => null, undefined
})
```

**[back to top](#readme)**

### Passing custom context

```js
var alwaysDone = require('always-done')
var opts = {
  context: { foo: 'bar' }
}

alwaysDone(function () {
  console.log(this.foo) // => 'bar'
}, opts, function done () {
  console.log('end')
})
```

**[back to top](#readme)**

### Passing custom arguments
> It may be strange, but this allows you to pass more arguments to that first function and the last argument always will be "callback" until `fn` is async or sync but with `passCallback: true` option.

```js
var alwaysDone = require('always-done')
var options = {
  args: [1, 2]
}

alwaysDone(function (a, b) {
  console.log(arguments.length) // => 2
  console.log(a) // => 1
  console.log(b) // => 2

  return a + b + 3
}, options, function done (e, res) {
  console.log(res) // => 9
})
```

**[back to top](#readme)**

### Returning a thunk
> Can be used as _thunkify_ lib without problems, just don't pass a done callback.

```js
var fs = require('fs')
var alwaysDone = require('always-done')
var readFileThunk = alwaysDone(function (cb) {
  fs.readFile('./package.json', cb)
})

readFileThunk(function done (err, res) {
  console.log(err, res) // => null, Buffer
})
```

**[back to top](#readme)**

## Related
- [async-done](https://www.npmjs.com/package/async-done): Force async using nextTick and normalize completion/errors for callbacks, promises, observables, child… [more](https://github.com/gulpjs/async-done#readme) | [homepage](https://github.com/gulpjs/async-done#readme "Force async using nextTick and normalize completion/errors for callbacks, promises, observables, child processes and streams.")
- [base](https://www.npmjs.com/package/base): base is the foundation for creating modular, unit testable and highly pluggable… [more](https://github.com/node-base/base) | [homepage](https://github.com/node-base/base "base is the foundation for creating modular, unit testable and highly pluggable node.js applications, starting with a handful of common methods, like `set`, `get`, `del` and `use`.")
- [end-of-stream](https://www.npmjs.com/package/end-of-stream): Call a callback when a readable/writable/duplex stream has completed or failed. | [homepage](https://github.com/mafintosh/end-of-stream "Call a callback when a readable/writable/duplex stream has completed or failed.")
- [is-node-stream](https://www.npmjs.com/package/is-node-stream): Strictly and correctly checks if value is a nodejs stream. | [homepage](https://github.com/tunnckocore/is-node-stream#readme "Strictly and correctly checks if value is a nodejs stream.")
- [minibase](https://www.npmjs.com/package/minibase): MiniBase is minimalist approach to Base - @node-base, the awesome framework. Foundation… [more](https://github.com/node-minibase/minibase#readme) | [homepage](https://github.com/node-minibase/minibase#readme "MiniBase is minimalist approach to Base - @node-base, the awesome framework. Foundation for building complex APIs with small units called plugins. Works well with most of the already existing [base][] plugins.")
- [on-stream-end](https://www.npmjs.com/package/on-stream-end): Handles completion and errors of any stream - readable/writable/duplex. | [homepage](https://github.com/tunnckocore/on-stream-end#readme "Handles completion and errors of any stream - readable/writable/duplex.")
- [try-catch-callback](https://www.npmjs.com/package/try-catch-callback): try/catch block with a callback, used in [try-catch-core][]. Use it when you… [more](https://github.com/hybridables/try-catch-callback#readme) | [homepage](https://github.com/hybridables/try-catch-callback#readme "try/catch block with a callback, used in [try-catch-core][]. Use it when you don't care about asyncness so much and don't want guarantees. If you care use [try-catch-core][].")
- [try-catch-core](https://www.npmjs.com/package/try-catch-core): Low-level package to handle completion and errors of sync or asynchronous functions… [more](https://github.com/hybridables/try-catch-core#readme) | [homepage](https://github.com/hybridables/try-catch-core#readme "Low-level package to handle completion and errors of sync or asynchronous functions, using [once][] and [dezalgo][] libs. Useful for and used in higher-level libs such as [always-done][] to handle completion of anything.")

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/hybridables/always-done/issues/new).  
But before doing anything, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.

## [Charlike Make Reagent](http://j.mp/1stW47C) [![new message to charlike][new-message-img]][new-message-url] [![freenode #charlike][freenode-img]][freenode-url]

[![tunnckoCore.tk][author-www-img]][author-www-url] [![keybase tunnckoCore][keybase-img]][keybase-url] [![tunnckoCore npm][author-npm-img]][author-npm-url] [![tunnckoCore twitter][author-twitter-img]][author-twitter-url] [![tunnckoCore github][author-github-img]][author-github-url]

[async-done]: https://github.com/gulpjs/async-done
[base]: https://github.com/node-base/base
[dezalgo]: https://github.com/npm/dezalgo
[end-of-stream]: https://github.com/mafintosh/end-of-stream
[on-stream-end]: https://github.com/tunnckocore/on-stream-end
[once]: https://github.com/isaacs/once
[stream-exhaust]: https://github.com/chrisdickinson/stream-exhaust.git
[try-catch-callback]: https://github.com/hybridables/try-catch-callback
[try-catch-core]: https://github.com/hybridables/try-catch-core

[npmjs-url]: https://www.npmjs.com/package/always-done
[npmjs-img]: https://img.shields.io/npm/v/always-done.svg?label=always-done

[license-url]: https://github.com/hybridables/always-done/blob/master/LICENSE
[license-img]: https://img.shields.io/npm/l/always-done.svg

[downloads-url]: https://www.npmjs.com/package/always-done
[downloads-img]: https://img.shields.io/npm/dm/always-done.svg

[codeclimate-url]: https://codeclimate.com/github/hybridables/always-done
[codeclimate-img]: https://img.shields.io/codeclimate/github/hybridables/always-done.svg

[travis-url]: https://travis-ci.org/hybridables/always-done
[travis-img]: https://img.shields.io/travis/hybridables/always-done/master.svg

[coveralls-url]: https://coveralls.io/r/hybridables/always-done
[coveralls-img]: https://img.shields.io/coveralls/hybridables/always-done.svg

[david-url]: https://david-dm.org/hybridables/always-done
[david-img]: https://img.shields.io/david/hybridables/always-done.svg

[standard-url]: https://github.com/feross/standard
[standard-img]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg

[author-www-url]: http://www.tunnckocore.tk
[author-www-img]: https://img.shields.io/badge/www-tunnckocore.tk-fe7d37.svg

[keybase-url]: https://keybase.io/tunnckocore
[keybase-img]: https://img.shields.io/badge/keybase-tunnckocore-8a7967.svg

[author-npm-url]: https://www.npmjs.com/~tunnckocore
[author-npm-img]: https://img.shields.io/badge/npm-~tunnckocore-cb3837.svg

[author-twitter-url]: https://twitter.com/tunnckoCore
[author-twitter-img]: https://img.shields.io/badge/twitter-@tunnckoCore-55acee.svg

[author-github-url]: https://github.com/tunnckoCore
[author-github-img]: https://img.shields.io/badge/github-@tunnckoCore-4183c4.svg

[freenode-url]: http://webchat.freenode.net/?channels=charlike
[freenode-img]: https://img.shields.io/badge/freenode-%23charlike-5654a4.svg

[new-message-url]: https://github.com/tunnckoCore/ama
[new-message-img]: https://img.shields.io/badge/ask%20me-anything-green.svg

[always-done]: https://github.com/hybridables/always-done

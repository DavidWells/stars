---
repo: tunnckoCore/capture-spawn
url: 'https://github.com/tunnckoCore/capture-spawn'
homepage: 'http://www.tunnckocore.tk'
starredAt: '2016-11-21T23:30:12Z'
createdAt: '2016-03-19T23:36:20Z'
updatedAt: '2019-09-19T21:21:59Z'
language: JavaScript
license: MIT
branch: master
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:15.800Z'
description: Asynchronously capturing spawn output.
tags: []
---

# [capture-spawn][author-www-url] [![npmjs.com][npmjs-img]][npmjs-url] [![The MIT License][license-img]][license-url] 

> Asynchronously capturing spawn output.

[![code climate][codeclimate-img]][codeclimate-url] [![standard code style][standard-img]][standard-url] [![travis build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![dependency status][david-img]][david-url]

## Install
```
npm i capture-spawn --save
```

## Usage
> For more use-cases see the [tests](./test.js)

```js
const captureSpawn = require('capture-spawn')
```

### [captureSpawn](index.js#L38)
> Capture output of asynchronous `spawn`.

**Params**

* `cp` **{Stream}**: Child process spawn stream.    
* `callback` **{Function}**: Gets error, result or result buffer - `cb(err, res, buf)`.    
* `returns` **{Stream}**: Passed `cp` stream.  

**Example**

```js
var captureSpawn = require('capture-spawn')
var spawn = require('cross-spawn-async')

var cp = spawn('echo', ['hello charlike', 'world'])
var stream = captureSpawn(cp, function callback (err, res, buf) {
  if (err) return console.error(err)
  console.log('result', res) // => 'hello charlike world\n'
  console.log('buffer', buf) // => <Buffer ...>
  console.log('result === buffer.toString()', buf.toString()) // => 'hello charlike world\n'
})
console.log(cp === stream) // => true
```

### Error handling
> Where `buffer` is the `stderr` output and `code` can be `string` or `number`.

```js
var proc = spawn('node', ['not-exist', 'something'])
captureSpawn(proc, console.log)
// => SpawnError {
//   name: 'SpawnError',
//   message: '',
//   code: 1,
//   buffer: <Buffer 6d 6f 64 75 ...>
// }
```

## Related
* [capture-stream](https://www.npmjs.com/package/capture-stream): Capture stream output. | [homepage](https://github.com/doowb/capture-stream)
* [cross-spawn](https://www.npmjs.com/package/cross-spawn): Cross platform child_process#spawn and child_process#spawnSync | [homepage](https://github.com/IndigoUnited/node-cross-spawn)
* [cross-spawn-async](https://www.npmjs.com/package/cross-spawn-async): Cross platform child_process#spawn | [homepage](https://github.com/IndigoUnited/node-cross-spawn-async)
* [function-arguments](https://www.npmjs.com/package/function-arguments): Get arguments of a function, useful for and used in dependency injectors.… [more](https://www.npmjs.com/package/function-arguments) | [homepage](https://github.com/tunnckocore/function-arguments)
* [gitclone-defaults](https://www.npmjs.com/package/gitclone-defaults): Powerful and flexible signature for `gitclone` - defaults, checks, validating, etc. | [homepage](https://github.com/tunnckocore/gitclone-defaults)
* [parse-git-config](https://www.npmjs.com/package/parse-git-config): Parse `.git/config` into a JavaScript object. sync or async. | [homepage](https://github.com/jonschlinkert/parse-git-config)
* [parse-git-log](https://www.npmjs.com/package/parse-git-log): Parse default `git log` style to array of objects from git repository… [more](https://www.npmjs.com/package/parse-git-log) | [homepage](https://github.com/tunnckoCore/parse-git-log)
* [run-commands](https://www.npmjs.com/package/run-commands): Cross-platform run series of commands or in parallel flow. Run commands in… [more](https://www.npmjs.com/package/run-commands) | [homepage](https://github.com/tunnckoCore/run-commands)
* [spawn-commands](https://www.npmjs.com/package/spawn-commands): Launches a new process with the given command, with command line arguments… [more](https://www.npmjs.com/package/spawn-commands) | [homepage](https://github.com/jonschlinkert/spawn-commands)

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/tunnckoCore/capture-spawn/issues/new).  
But before doing anything, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.

## [Charlike Make Reagent](http://j.mp/1stW47C) [![new message to charlike][new-message-img]][new-message-url] [![freenode #charlike][freenode-img]][freenode-url]

[![tunnckoCore.tk][author-www-img]][author-www-url] [![keybase tunnckoCore][keybase-img]][keybase-url] [![tunnckoCore npm][author-npm-img]][author-npm-url] [![tunnckoCore twitter][author-twitter-img]][author-twitter-url] [![tunnckoCore github][author-github-img]][author-github-url]

[error-base]: https://github.com/doowb/error-base
[is-child-process]: https://github.com/tunnckocore/is-child-process

[npmjs-url]: https://www.npmjs.com/package/capture-spawn
[npmjs-img]: https://img.shields.io/npm/v/capture-spawn.svg?label=capture-spawn

[license-url]: https://github.com/tunnckoCore/capture-spawn/blob/master/LICENSE
[license-img]: https://img.shields.io/badge/license-MIT-blue.svg

[codeclimate-url]: https://codeclimate.com/github/tunnckoCore/capture-spawn
[codeclimate-img]: https://img.shields.io/codeclimate/github/tunnckoCore/capture-spawn.svg

[travis-url]: https://travis-ci.org/tunnckoCore/capture-spawn
[travis-img]: https://img.shields.io/travis/tunnckoCore/capture-spawn/master.svg

[coveralls-url]: https://coveralls.io/r/tunnckoCore/capture-spawn
[coveralls-img]: https://img.shields.io/coveralls/tunnckoCore/capture-spawn.svg

[david-url]: https://david-dm.org/tunnckoCore/capture-spawn
[david-img]: https://img.shields.io/david/tunnckoCore/capture-spawn.svg

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


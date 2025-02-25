---
repo: floatdrop/require-from-string
url: 'https://github.com/floatdrop/require-from-string'
homepage: null
starredAt: '2022-02-24T06:40:56Z'
createdAt: '2015-07-18T15:00:12Z'
updatedAt: '2025-01-03T21:51:09Z'
language: JavaScript
license: MIT
branch: master
stars: 298
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:09.774Z'
description: Load module from string
tags: []
---

# require-from-string [![Build Status](https://travis-ci.org/floatdrop/require-from-string.svg?branch=master)](https://travis-ci.org/floatdrop/require-from-string)

Load module from string in Node.

## Install

```
$ npm install --save require-from-string
```


## Usage

```js
var requireFromString = require('require-from-string');

requireFromString('module.exports = 1');
//=> 1
```


## API

### requireFromString(code, [filename], [options])

#### code

*Required*  
Type: `string`

Module code.

#### filename
Type: `string`  
Default: `''`

Optional filename.


#### options
Type: `object`

##### appendPaths
Type: `Array`

List of `paths`, that will be appended to module `paths`. Useful, when you want
to be able require modules from these paths.

##### prependPaths
Type: `Array`

Same as `appendPaths`, but paths will be prepended.

## License

MIT © [Vsevolod Strukchinsky](http://github.com/floatdrop)

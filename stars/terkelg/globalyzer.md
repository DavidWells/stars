---
repo: terkelg/globalyzer
url: 'https://github.com/terkelg/globalyzer'
homepage: ''
starredAt: '2021-05-14T19:26:48Z'
createdAt: '2018-04-15T06:39:40Z'
updatedAt: '2024-04-02T00:17:00Z'
language: JavaScript
license: MIT
branch: master
stars: 10
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:42.337Z'
description: Detect and extract the static part of a glob string.
tags:
  - extract
  - glob
  - globbing
  - parser
  - strings
---

# globalyzer [![Build Status](https://travis-ci.org/terkelg/globalyzer.svg?branch=master)](https://travis-ci.org/terkelg/globalyzer)[![Build status](https://ci.appveyor.com/api/projects/status/0xqnmxt99rsnnjqh?svg=true)](https://ci.appveyor.com/project/terkelg/globalyzer)

>  Detect and extract the static part of a glob string

Utility to detect if a string contains a glob and then split it in a glob and none-glob part.

## Install

```
npm install globalyzer --save
```

## Usage

```js
const globalyzer = require('globalyzer');

globalyzer('foo/bar/.git/');
// => { base: 'foo/bar/.git/', glob: '', isGlob: false }

globalyzer('foo/bar/**/baz');
// => { base: 'foo/bar', glob: '**/baz', isGlob: true }
```


## API

### globalyzer(glob, options)

Type: `function`<br>
Returns: `{ base, glob, isGlob }`

Returns an object with the (non-glob) base path and the actual pattern and a is-glob flag.

#### options.strict

Type: `Boolean`<br>
Default: `true`

Be strict about what's a glob and what's not


#### glob

Type: `String`

Glob string to analyze.


## Credit

This is a fork of [is-glob](https://github.com/micromatch/is-glob) and [glob-base](https://github.com/micromatch/glob-base)


## License

MIT © [Terkel Gjervig](https://terkel.com)

---
repo: mattdesl/relative-require-regex
url: 'https://github.com/mattdesl/relative-require-regex'
homepage: ''
starredAt: '2019-09-13T23:36:27Z'
createdAt: '2015-04-26T17:11:21Z'
updatedAt: '2019-09-29T07:33:18Z'
language: JavaScript
license: MIT
branch: master
stars: 4
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:24.031Z'
description: test whether a require string is relative
tags: []
---

# relative-require-regex

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

A regex to test whether a require string is a system path (relative or absolute). Module lookups like `"url"` will return false.

```js
var relative = require('relative-require-regex')()

relative.test('url')            => false
relative.test('is-array')       => false
relative.test('xtend/mutable')  => false

relative.test('./foo')          => true
relative.test('../foo')         => true
relative.test('/home/index.js') => true
```

## Usage

[![NPM](https://nodei.co/npm/relative-require-regex.png)](https://www.npmjs.com/package/relative-require-regex)

#### `reg = relative()`

Returns a new regex that tests whether the require path is relative or not, according to Node's [resolve algorithm](https://github.com/substack/node-resolve).

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/relative-require-regex/blob/master/LICENSE.md) for details.

---
repo: bengl/tage
url: 'https://github.com/bengl/tage'
homepage: null
starredAt: '2022-10-11T01:29:26Z'
createdAt: '2016-01-05T17:35:36Z'
updatedAt: '2025-02-21T13:26:24Z'
language: JavaScript
license: MIT
branch: master
stars: 6
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:25.449Z'
description: template tags easily made from other functions
tags: []
---

# tage

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

**tage** will turn your functions into template tags.

Just take a function that has a string as its first argument, then pass it into
tage to get a function that works as a template tag, returning a new function.

The new function acts exactly as the old one as well, so you can use it both
ways.

> NOTE: This only works in environments that support template tags.

## Example

```js
var tage = require('tage')
var assert = require('assert')

function foo(str, arg1, arg2) {
  return str + arg1 + arg2
}

var tageFoo = tage(foo)

assert.equal(tageFoo('one', 'two', 'three'), 'onetwothree')
assert.equal(tageFoo `one` ('two', 'three'), 'onetwothree')
```

## License

See LICENSE.txt

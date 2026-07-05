---
repo: rtsao/selector-has
url: 'https://github.com/rtsao/selector-has'
homepage: null
starredAt: '2016-01-12T19:41:01Z'
createdAt: '2015-08-27T02:41:34Z'
updatedAt: '2016-01-12T19:41:01Z'
language: JavaScript
license: MIT
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:35.172Z'
description: A helper utility to check the presence of a class in a CSS selector
tags: []
---

# selector-has

[![build status][travis]][travis-uri]
[![coverage status][coveralls]][coveralls-uri]
[![coverage status][deps]][deps-uri]

A helper utility to check the presence of a class in a CSS selector

# usage

```javascript
var has = require('selector-has');

has('.foo > .bar', 'foo');
// => true

has('.foobar', 'foo');
// => false

```

[travis]: https://travis-ci.org/rtsao/selector-has.svg?branch=master
[travis-uri]: https://travis-ci.org/rtsao/selector-has

[coveralls]: https://coveralls.io/repos/rtsao/selector-has/badge.svg?branch=master
[coveralls-uri]: https://coveralls.io/r/rtsao/selector-has

[deps]: https://david-dm.org/rtsao/selector-has.svg
[deps-uri]: https://david-dm.org/rtsao/selector-has

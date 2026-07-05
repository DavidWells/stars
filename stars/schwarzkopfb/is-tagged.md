---
repo: schwarzkopfb/is-tagged
url: 'https://github.com/schwarzkopfb/is-tagged'
homepage: null
starredAt: '2022-10-11T01:29:47Z'
createdAt: '2016-01-18T14:20:14Z'
updatedAt: '2022-10-11T01:29:47Z'
language: JavaScript
license: MIT
branch: master
stars: 5
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:25.232Z'
description: >-
  Check whether a function call is initiated by a tagged template string or
  invoked in a regular way
tags: []
---

[![view on npm](https://img.shields.io/npm/v/is-tagged.svg?style=flat-square)](https://www.npmjs.com/package/is-tagged)
[![npm module downloads per month](http://img.shields.io/npm/dm/is-tagged.svg?style=flat-square)](https://www.npmjs.com/package/is-tagged)
[![Build Status](https://img.shields.io/travis/schwarzkopfb/is-tagged.svg?style=flat-square)](https://travis-ci.org/schwarzkopfb/is-tagged)
[![Coverage Status](https://img.shields.io/coveralls/schwarzkopfb/is-tagged.svg?style=flat-square)](https://coveralls.io/github/schwarzkopfb/is-tagged?branch=master)

# is-tagged

Check whether a function call is initiated by a tagged template string or invoked in a regular way

## Installation

```
npm install --save is-tagged
```

## Usage

```javascript
const isTagged = require('is-tagged')

function fn() {
    return isTagged(arguments)
}

fn('foo') // false
fn`bar` // true
```

## License

[MIT license](https://github.com/schwarzkopfb/is-tagged/blob/master/LICENSE).

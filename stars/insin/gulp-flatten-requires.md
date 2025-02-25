---
repo: insin/gulp-flatten-requires
url: 'https://github.com/insin/gulp-flatten-requires'
homepage: null
starredAt: '2016-07-07T00:53:23Z'
createdAt: '2015-01-23T02:39:35Z'
updatedAt: '2019-03-17T09:22:15Z'
language: JavaScript
license: NOASSERTION
branch: master
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:21.350Z'
description: Flattens relative require('./<path>/<module>') calls to require('./<module>')
tags: []
---

# gulp-flatten-requires [![build status](https://secure.travis-ci.org/insin/gulp-flatten-requires.png)](http://travis-ci.org/insin/gulp-flatten-requires)

Rewrites relative `require()` calls to use flat paths in the same directory.

Whatever quote type was used in the original `require()` call will be preserved.

| Before                    | After            |
| ------------------------- | ---------------- |
| `require('./path/to/a')`  | `require('./a')` |
| `require('../path/to/b')` | `require('./b')` |
| `require("./c")`          | `require("./c")` |

## Install

```
npm install --save-dev gulp-flatten-requires
```

## Usage

This plugin is intended to be used in conjunction with
[gulp-flatten](https://github.com/armed/gulp-flatten) for a quick-and-dirty
means of creating a flat directory of a library's modules to be published to
[npm](https://www.npmjs.org) for cleaner requiring of the library's constituent
parts.

```javascript
var gulp = require('gulp')
var flatten = require('gulp-flatten')
var flattenRequires = require('gulp-flatten-requires')

gulp.task('copy-npm', function() {
  return gulp.src('./build/modules/**/*.js')
    .pipe(flatten())
    .pipe(flattenRequires())
    .pipe(gulp.dest('./npm'))
})
```

**Note:** This assumes that every module in your project is uniquely named.

## MIT Licensed

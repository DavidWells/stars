---
repo: feross/run-series
url: 'https://github.com/feross/run-series'
homepage: ''
starredAt: '2018-11-12T17:48:15Z'
createdAt: '2014-04-13T01:17:40Z'
updatedAt: '2025-01-04T01:25:26Z'
language: JavaScript
license: MIT
branch: master
stars: 246
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:05.475Z'
description: Run an array of functions in series
tags:
  - async
  - browser
  - javascript
  - nodejs
  - series
---

# run-series [![travis][travis-image]][travis-url] [![npm][npm-image]][npm-url] [![downloads][downloads-image]][downloads-url] [![javascript style guide][standard-image]][standard-url]

[travis-image]: https://img.shields.io/travis/feross/run-series/master.svg
[travis-url]: https://travis-ci.org/feross/run-series
[npm-image]: https://img.shields.io/npm/v/run-series.svg
[npm-url]: https://npmjs.org/package/run-series
[downloads-image]: https://img.shields.io/npm/dm/run-series.svg
[downloads-url]: https://npmjs.org/package/run-series
[standard-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[standard-url]: https://standardjs.com

### Run an array of functions in series

![series](https://raw.githubusercontent.com/feross/run-series/master/img.png) [![Sauce Test Status](https://saucelabs.com/browser-matrix/run-series.svg)](https://saucelabs.com/u/run-series)

### install

```
npm install run-series
```

### usage

#### series(tasks, [callback])

Run the functions in the `tasks` array in series, each one running once the previous
function has completed. If any functions in the series pass an error to its callback, no
more functions are run, and `callback` is immediately called with the value of the error.
Otherwise, `callback` receives an array of results when `tasks` have completed.

##### arguments

- `tasks` - An array containing functions to run, each function is passed a
`callback(err, result)` which it must call on completion with an error `err` (which can
be `null`) and an optional result value.
- `callback(err, results)` - An optional callback to run once all the functions have
completed. This function gets a results array containing all the result arguments passed
to the task callbacks.

##### example

```js
var series = require('run-series')

series([
  function (callback) {
    // do some stuff ...
    callback(null, 'one')
  },
  function (callback) {
    // do some stuff ...
    callback(null, 'two')
  }
],
// optional callback
function (err, results) {
  // the results array will equal ['one','two']
})
```

This module is basically equavalent to
[`async.series`](https://github.com/caolan/async#seriestasks-callback), but it's
handy to just have the functions you need instead of the kitchen sink. Modularity!
Especially handy if you're serving to the browser and need to reduce your javascript
bundle size.

Works great in the browser with [browserify](http://browserify.org/)!

### see also

- [run-auto](https://github.com/feross/run-auto)
- [run-parallel](https://github.com/feross/run-parallel)
- [run-parallel-limit](https://github.com/feross/run-parallel-limit)
- [run-waterfall](https://github.com/feross/run-waterfall)

### license

MIT. Copyright (c) [Feross Aboukhadijeh](http://feross.org).

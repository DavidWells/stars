---
repo: isaacs/once
url: 'https://github.com/isaacs/once'
homepage: null
starredAt: '2015-01-04T09:01:11Z'
createdAt: '2012-08-14T07:25:37Z'
updatedAt: '2024-08-29T18:11:22Z'
language: JavaScript
license: ISC
branch: main
stars: 222
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:57.828Z'
description: Run a function exactly one time
tags: []
---

# once

Only call a function once.

## usage

```javascript
var once = require('once')

function load (file, cb) {
  cb = once(cb)
  loader.load('file')
  loader.once('load', cb)
  loader.once('error', cb)
}
```

Or add to the Function.prototype in a responsible way:

```javascript
// only has to be done once
require('once').proto()

function load (file, cb) {
  cb = cb.once()
  loader.load('file')
  loader.once('load', cb)
  loader.once('error', cb)
}
```

Ironically, the prototype feature makes this module twice as
complicated as necessary.

To check whether your function has been called, use `fn.called`. Once the
function is called for the first time the return value of the original
function is saved in `fn.value` and subsequent calls will continue to
return this value.

```javascript
var once = require('once')

function load (cb) {
  cb = once(cb)
  var stream = createStream()
  stream.once('data', cb)
  stream.once('end', function () {
    if (!cb.called) cb(new Error('not found'))
  })
}
```

## `once.strict(func)`

Throw an error if the function is called twice.

Some functions are expected to be called only once. Using `once` for them would
potentially hide logical errors.

In the example below, the `greet` function has to call the callback only once:

```javascript
function greet (name, cb) {
  // return is missing from the if statement
  // when no name is passed, the callback is called twice
  if (!name) cb('Hello anonymous')
  cb('Hello ' + name)
}

function log (msg) {
  console.log(msg)
}

// this will print 'Hello anonymous' but the logical error will be missed
greet(null, once(msg))

// once.strict will print 'Hello anonymous' and throw an error when the callback will be called the second time
greet(null, once.strict(msg))
```

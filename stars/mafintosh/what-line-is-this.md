---
repo: mafintosh/what-line-is-this
url: 'https://github.com/mafintosh/what-line-is-this'
homepage: null
starredAt: '2019-10-20T03:51:01Z'
createdAt: '2015-01-30T20:51:01Z'
updatedAt: '2025-01-21T18:31:25Z'
language: JavaScript
license: MIT
branch: master
stars: 57
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:15.207Z'
description: >-
  Output a message prefixed with the name and line number of the source file
  where you outputted the message
tags: []
---

# what-line-is-this

Output a message prefixed with the name and line number
of the source file where you outputted the message

```
npm install what-line-is-this
```

[![build status](http://img.shields.io/travis/mafintosh/what-line-is-this.svg?style=flat)](http://travis-ci.org/mafintosh/what-line-is-this)

## Usage

Assuming the following file is saved as `/Users/maf/index.js`

``` js
var what = require('what-line-is-this')

var foo = function () {
  what('line is this?')
}

what('line is this?')
foo()
```

Running it will produce the following output

```
/Users/maf/index.js:4 - line is this?
/Users/maf/index.js:7 - line is this?
```

If you wanted to output the line of the calling method instead use `what.stack(pos)`
to change the stack frame being used.

``` js
var what = require('what-line-is-this').stack(1)

var foo = function() {
  what('line is this?')
}

foo()
```

Running the above will print

```
/Users/maf/index.js:7 - line is this?
```

## License

MIT

---
repo: rlidwka/markdown-it-regexp
url: 'https://github.com/rlidwka/markdown-it-regexp'
homepage: ''
starredAt: '2015-06-08T23:13:56Z'
createdAt: '2014-11-22T11:04:54Z'
updatedAt: '2023-09-08T16:52:21Z'
language: JavaScript
license: MIT
branch: master
stars: 53
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:41.851Z'
description: make simple markdown-it plugins easier
tags: []
---


Make simple [markdown-it](https://github.com/markdown-it/markdown-it) plugins easier.

## Usage:

```js
var md     = require('markdown-it')
var Plugin = require('markdown-it-regexp')

var plugin = Plugin(
  // regexp to match
  /@(\w+)/,

  // this function will be called when something matches
  function(match, utils) {
    var url = 'http://example.org/u/' + match[1]

    return '<a href="' + utils.escape(url) + '">'
         + utils.escape(match[1])
         + '</a>'
  }
)

md()
  .use(plugin)
  .render("hello @user")

// prints out:
// <p>hello <a href="http://example.org/u/user">user</a></p>
```

[Live demo as jsfiddle](https://jsfiddle.net/arve0/nz0Lb6ox/).

## Fair warning:

1. it could be slower than you expect
2. it is a draft, breaking changes might happen


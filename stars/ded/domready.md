---
repo: ded/domready
url: 'https://github.com/ded/domready'
homepage: ''
starredAt: '2016-04-01T19:12:04Z'
createdAt: '2011-04-14T20:19:38Z'
updatedAt: '2025-02-24T11:59:18Z'
language: JavaScript
license: MIT
branch: master
stars: 875
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:29.275Z'
description: lets you know when the dom is ready
tags: []
---

## domReady

It's easy. Works like this:

``` js
domready(function () {
  // dom is loaded!
})
```

-------------------------
## Deprecation Notice

Compatibility with `IE6`, `IE7`, and `IE8` has been fully dropped. If your application requires this level of support, please use the [`0.3.0`](https://github.com/ded/domready/tree/v0.3.0) release.

-------------------------


### Browser support

  * IE9+
  * Firefox 4+
  * Safari 3+
  * Chrome *
  * Opera *

### Building

``` sh
npm install
make
open tests/test.html
```

### Including with Ender

Don't already have [Ender](http://enderjs.com)? Install it like this:

``` sh
npm install ender -g
```

Include domready in your package:

``` sh
ender add domready
```

Then use it like this

``` js
require('domready')(function () {
  $('body').html('<p>boosh</p>')
})

// or

$(document).ready(function () {
  $('body').html('<p>boosh</p>')
})
```

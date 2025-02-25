---
repo: mattdesl/normalize-file-to-url-path
url: 'https://github.com/mattdesl/normalize-file-to-url-path'
homepage: ''
starredAt: '2019-09-13T23:24:36Z'
createdAt: '2015-07-27T03:36:14Z'
updatedAt: '2019-09-14T02:54:34Z'
language: JavaScript
license: MIT
branch: master
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:24.552Z'
description: normalizes a file to a URL pathname
tags: []
---

# normalize-file-to-url-path

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

A simple function to normalize a file path into a [URL path](https://nodejs.org/api/url.html) that can be used when testing `req.url` from an HTTP server.

```js
var toUrl = require('normalize-file-to-url-path')

toUrl('./foo.js')
//=> 'foo.js'

toUrl('foo bar.js')
//=> 'foo%20bar.js'

toUrl('/')
//=> null
```

Experimental -- mostly used internally across some of my tools.

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/normalize-file-to-url-path/blob/master/LICENSE.md) for details.

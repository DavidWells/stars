---
repo: mattdesl/require-package-name
url: 'https://github.com/mattdesl/require-package-name'
homepage: ''
starredAt: '2019-09-13T23:31:46Z'
createdAt: '2015-04-26T18:11:51Z'
updatedAt: '2020-10-21T17:26:45Z'
language: JavaScript
license: MIT
branch: master
stars: 11
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:24.237Z'
description: gets the package name for a require statement
tags: []
---

# require-package-name

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Gets the base package name for a module path in a require statement. Assumes the path [is not relative](https://www.npmjs.com/package/relative-require-regex).

```js
var name = require('require-package-name')

//get the module name for a require path
name('events')                  => 'events'
name('events/')                 => 'events'
name('events/index.js')         => 'events'
name('@username/button/a.js')   => '@username/button'
name('@username//foo/a.js')     => '@username/foo'

//or, get the base name excluding any scope
name.base('@username/button/a.js')   => 'button'
name.base('@username//foo/a.js')     => 'foo'
```

## Usage

[![NPM](https://nodei.co/npm/require-package-name.png)](https://www.npmjs.com/package/require-package-name)

#### `name = packageName(str)`

Gets the name of a module for a require string like `'xtend'` from `'xtend/mutable.js'`.

#### `base = packageName.base(str)`

Gets the *base* name of a module. This is the same as above, except it excludes scoped usernames.

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/require-package-name/blob/master/LICENSE.md) for details.

---
repo: mattdesl/install-if-needed
url: 'https://github.com/mattdesl/install-if-needed'
homepage: ''
starredAt: '2019-09-13T23:05:52Z'
createdAt: '2015-04-30T13:51:31Z'
updatedAt: '2024-08-23T10:19:44Z'
language: JavaScript
license: MIT
branch: master
stars: 18
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:24.849Z'
description: installs the given modules if needed
tags: []
---

# install-if-needed

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Installs the given list of modules and saves them into their respective fields in your nearest `package.json`. Dependencies that already exist in your `package.json` will be skipped.

```js
var install = require('install-if-needed')

install({
  dependencies: ['through2'],
  devDependencies: ['tape@2.x', 'standard']
}, function(err) {
  if (err)
    console.error("There was an error installing.")
})
```

You can pass `{ stdio: 'inherit' }` to preserve logging and colors, acting like the usual `npm install` command.

## Usage

[![NPM](https://nodei.co/npm/install-if-needed.png)](https://www.npmjs.com/package/install-if-needed)

#### `install(opt[, cb])`

Looks at `package` JSON and installs any of the specified dependencies that are not listed in their respective field. 

- `cwd` the directory for the [closest package.json](https://www.npmjs.com/package/closest-package), (default `process.cwd()`)
- `package` optional package data, if not defined will search for closest `package.json`
- `save` whether to `--save`, `--save-dev` and `--save-optional` (default true)
- `dependencies` dependencies to install
- `devDependencies` dev dependencies to install
- `optionalDependencies` optional dependencies to install
- `command` the command to spawn when installing, defaults to `'npm'`

Other options are passed to [spawn-npm-install](https://www.npmjs.com/package/spawn-npm-install).

On complete, `cb` is called with `(err)` status. All dependencies also accept a single string instead of an array.

Alternatively, `opt` can be a string or array, which is the same as listing it in `dependencies`.

```js
//e.g.
//  npm install tape --save
install('tape', done)
```

## Motivation

This helps build CLI tooling that auto-installs modules as needed. For example, a tool which stubs out an empty test file for [tape](https://www.npmjs.com/package/tape):

```js
#!/usr/bin/env node
var install = require('install-if-needed')
var fs = require('fs')
var template = fs.readFileSync(__dirname + '/template.js')

install({
  devDependencies: 'tape'
}, function(err) {
  if (err) throw err
  fs.writeFile(process.argv[2], template)
})
```

And the CLI might be as simple as:

```sh
quick-tape tests/simple.js
```

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/install-if-needed/blob/master/LICENSE.md) for details.

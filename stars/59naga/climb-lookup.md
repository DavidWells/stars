---
repo: 59naga/climb-lookup
url: 'https://github.com/59naga/climb-lookup'
homepage: ''
starredAt: '2016-06-13T22:41:12Z'
createdAt: '2016-03-02T13:29:11Z'
updatedAt: '2016-06-13T22:41:12Z'
language: JavaScript
license: NA
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:23.358Z'
description: 'lookup the closest file. like a require() '
tags: []
---

Climb lookup
---

<p align="right">
  <a href="https://npmjs.org/package/climb-lookup">
    <img src="https://img.shields.io/npm/v/climb-lookup.svg?style=flat-square">
  </a>
  <a href="https://travis-ci.org/59naga/climb-lookup">
    <img src="http://img.shields.io/travis/59naga/climb-lookup.svg?style=flat-square">
  </a>
  <a href="https://codeclimate.com/github/59naga/climb-lookup/coverage">
    <img src="https://img.shields.io/codeclimate/github/59naga/climb-lookup.svg?style=flat-square">
  </a>
  <a href="https://codeclimate.com/github/59naga/climb-lookup">
    <img src="https://img.shields.io/codeclimate/coverage/github/59naga/climb-lookup.svg?style=flat-square">
  </a>
  <a href="https://gemnasium.com/59naga/climb-lookup">
    <img src="https://img.shields.io/gemnasium/mathiasbynens/he.svg?style=flat-square">
  </a>
</p>

> lookup the file while climbing to recursively. like a require().

Usage
---

```bash
npm install climb-lookup --save
```

```js
import {lookup, lookupSync, getPaths} from 'climb-lookup';

console.log(lookupSync('package.json')); // /path/to/package.json
```

[API Reference](https://npmcdn.com/climb-lookup/esdoc/index.html)

Why?
---

It may fail to read the configuration file due to `process.cwd()`.

```bash
cd my-project
tree . -L 1
# .
# ├── src
# ├── test
# └── package.json
node -e "require(process.cwd()+'/package.json')" # ok

cd test
node -e "require(process.cwd()+'/package.json')" # Error: Cannot find module './test/package.json'
```

`climb-lookup` is lookup the file while climbing to recursively. like a `require()`.

```bash
cd my-project
tree . -L 1
# .
# ├── src
# ├── test
# └── package.json
node -e "require(require('climb-lookup').lookupSync('package.json'))" # ok

cd test
node -e "require(require('climb-lookup').lookupSync('package.json'))" # ok
```

Test
---
```bash
git clone https://github.com/59naga/climb-lookup.git
cd climb-lookup

npm install
npm test
```

License
---
[MIT](http://59naga.mit-license.org/)

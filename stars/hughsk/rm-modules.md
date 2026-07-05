---
repo: hughsk/rm-modules
url: 'https://github.com/hughsk/rm-modules'
homepage: null
starredAt: '2019-09-13T23:51:02Z'
createdAt: '2014-11-20T02:36:06Z'
updatedAt: '2022-05-06T01:49:03Z'
language: JavaScript
license: NOASSERTION
branch: master
stars: 26
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:23.943Z'
description: >-
  Recursively remove *all* node_modules directories within the chosen root
  directory
tags: []
---

# rm-modules
![](http://img.shields.io/badge/stability-experimental-orange.svg?style=flat)
![](http://img.shields.io/npm/v/rm-modules.svg?style=flat)
![](http://img.shields.io/npm/dm/rm-modules.svg?style=flat)
![](http://img.shields.io/npm/l/rm-modules.svg?style=flat)

Recursively remove *all* `node_modules` directories within the chosen root
directory.

Useful for cleaning a project which has more than one `node_modules` tree.

## CLI Usage

[![NPM](https://nodei.co/npm/rm-modules.png)](https://nodei.co/npm/rm-modules/)

``` bash
npm install -g rm-modules
rm-modules
```

## Module Usage

### `rm(root, done(err))`

Recursively removes every `node_modules` directory within the `root` directory,
calling `done(err)` when complete.

## License

MIT. See [LICENSE.md](http://github.com/hughsk/rm-modules/blob/master/LICENSE.md) for details.

---
repo: kellyselden/merge-package.json
url: 'https://github.com/kellyselden/merge-package.json'
homepage: null
starredAt: '2021-01-02T05:50:55Z'
createdAt: '2017-11-03T01:45:54Z'
updatedAt: '2024-07-22T01:30:24Z'
language: JavaScript
license: MIT
branch: main
stars: 22
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:10.708Z'
description: 'Merge package.json using local, base, and remote'
tags: []
---

# merge-package.json

[![npm version](https://badge.fury.io/js/merge-package.json.svg)](https://www.npmjs.com/package/merge-package.json)

Merge package.json using local, base, and remote

* Preserves ordering
* Follows SemVer
* Uses best guess to resolve conflicts

```js
const mergePackageJson = require('merge-package.json');

let merged = mergePackageJson(local, base, remote);
```

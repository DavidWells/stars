---
repo: zkochan/which-pm-runs
url: 'https://github.com/zkochan/which-pm-runs'
homepage: ''
starredAt: '2021-08-10T21:47:41Z'
createdAt: '2017-04-08T12:55:21Z'
updatedAt: '2024-03-19T08:33:09Z'
language: JavaScript
license: MIT
branch: master
stars: 8
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:48.301Z'
description: Detects what package manager executes the process
tags: []
---

> this package has been moved to https://github.com/zkochan/packages/tree/master/which-pm-runs

# which-pm-runs

> Detects what package manager executes the process

[![npm version](https://img.shields.io/npm/v/which-pm-runs.svg)](https://www.npmjs.com/package/which-pm-runs) [![Build Status](https://img.shields.io/travis/zkochan/which-pm-runs/master.svg)](https://travis-ci.org/zkochan/which-pm-runs)

## Installation

```
npm i which-pm-runs
```

## Usage

```js
'use strict'
const whichPMRuns = require('which-pm-runs')

whichPMRuns()
//> {name: "pnpm", version: "0.64.2"}
```

## Related

* [which-pm](https://github.com/zkochan/which-pm) - Detects what package manager was used for installation

## License

[MIT](LICENSE) © [Zoltan Kochan](http://kochan.io)

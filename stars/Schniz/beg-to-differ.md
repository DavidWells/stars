---
repo: Schniz/beg-to-differ
url: 'https://github.com/Schniz/beg-to-differ'
homepage: null
starredAt: '2022-02-25T23:48:37Z'
createdAt: '2015-01-30T18:00:11Z'
updatedAt: '2022-02-25T23:48:37Z'
language: JavaScript
license: NA
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:07.366Z'
description: Simple string diff patching for node.js
tags: []
---

beg-to-differ.js ![Travis CI](https://travis-ci.org/Schniz/beg-to-differ.svg)
================

Simple string diff patches for your app.

Installing
----------

```bash
npm install --save beg-to-differ
```

Usage
-----

```bash
var differ = require('beg-to-differ');

var patch = differ.createPatch("from String", "to String");
var toString = differ.applyPatch("from String", patch);
```

Can be used in Neo4j relationships without `JSON.stringify`ing it (array of strings) for implementing a simple versioning system.

Testing
-------

```bash
npm test
```

Contributing
------------

- fork
- branch
- write tests
- code (don't break shit)
- commit & push
- pull request
- profit

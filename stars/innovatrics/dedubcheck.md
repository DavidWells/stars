---
repo: innovatrics/dedubcheck
url: 'https://github.com/innovatrics/dedubcheck'
homepage: null
starredAt: '2023-12-24T00:56:15Z'
createdAt: '2018-11-22T15:56:56Z'
updatedAt: '2024-08-05T15:55:25Z'
language: JavaScript
license: MIT
branch: master
stars: 6
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:41.821Z'
description: 'dedubcheck - De-Duplicate Dependency Checker for Node.js monorepos '
tags:
  - deduplication
  - duplicates
  - duplicity
  - javascript
  - nodejs
  - nodejs-modules
---

# Dedubcheck

This tool check your monorepo for diferent versions of the same dependencies (by recursively looking for `package.json` file).

To ignore certain package, create `.dedubcheck.js` file in your root dir containing:

```javascript
module.exports = [['packages/web/package.json', 'lodash'], ['<path-to-package.json>', '<name-of-package>'], [...]];
```

To run this thing, just do:

```bash
$ dedubcheck
```

For some debug info:

```bash
$ dedubcheck --debug
```

---
repo: medikoo/uni-global
url: 'https://github.com/medikoo/uni-global'
homepage: ''
starredAt: '2025-12-11T17:11:58Z'
createdAt: '2021-09-30T14:21:45Z'
updatedAt: '2025-12-11T17:11:58Z'
language: JavaScript
license: ISC
branch: main
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-12-27T22:31:49.273Z'
description: Global namespace with no global scope pollution
tags: []
---

[![Build status][build-image]][build-url]
[![Tests coverage][cov-image]][cov-url]
[![npm version][npm-image]][npm-url]

# uni-global

## Global namespace with no global scope pollution

### Use case

In modules world, there's possiblity that two different instance of same modules (e.g. installed in different `node_modules`) are being run in same process.

If for any reason they need to operate on context instance that's same for the given application or process, then ocassionally introduced multiple installations may break the application.

This module provides interface wich can be used to ensure that no matter how many instances of given module are loaded, in all cases they end with same context instance.

### Example usage:

```javascript
// No matter how many instances of given module are loaded in the process, they will always end with same context instance
const globalContext = require("uni-global")("my-scope-name");

// globalContext is a plain object, on which needed global data can be stored.
globalContext.someSingletonData = ...

```

### Adapt manually other realm

If there's a need to adapt other environment realm (e.g. coming from iframe) to share same uni-global directory.

Register it with `adaptRealm` util as below:

```javascript
const adaptRealm = require("uni-global/adapt-realm");

adaptRealm(iFrameWindow); // Pass global object of the other realm
```

### Installation

```bash
npm install uni-global
```

## Security contact information

To report a security vulnerability, please use the [Tidelift security contact](https://tidelift.com/security). Tidelift will coordinate the fix and disclosure.

[build-image]: https://github.com/medikoo/uni-global/workflows/Integrate/badge.svg
[build-url]: https://github.com/medikoo/uni-global/actions?query=workflow%3AIntegrate
[cov-image]: https://img.shields.io/codecov/c/github/medikoo/uni-global.svg
[cov-url]: https://codecov.io/gh/medikoo/uni-global
[npm-image]: https://img.shields.io/npm/v/uni-global.svg
[npm-url]: https://www.npmjs.com/package/uni-global

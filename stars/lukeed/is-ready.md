---
repo: lukeed/is-ready
url: 'https://github.com/lukeed/is-ready'
homepage: null
starredAt: '2018-11-16T19:01:39Z'
createdAt: '2017-11-27T16:53:38Z'
updatedAt: '2022-12-21T00:01:12Z'
language: JavaScript
license: MIT
branch: master
stars: 28
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:02.866Z'
description: >-
  A tiny (309B) library to detect when `window` globals are defined and ready to
  use~!
tags: []
---

# is-ready [![Build Status](https://travis-ci.org/lukeed/is-ready.svg?branch=master)](https://travis-ci.org/lukeed/is-ready)

> A tiny (309B) library to detect when `window` globals are defined and ready to use~!

This module exposes three module definitions:

* **ES Module**: `dist/is-ready.es.js`
* **CommonJS**: `dist/is-ready.js`
* **UMD**: `dist/is-ready.min.js`

If using the UMD bundle, the library is exposed as `is-ready` globally.


## Install

```
$ npm install --save is-ready
```


## Usage

```js
const isReady = require('is-ready');

// Check if "window.firebase" is loaded
isReady('firebase').then(_ => {
  firebase.initializeApp(...);
});

// Check if "window.firebase" & "window.firebase.auth" are loaded
isReady(['firebase', 'firebase.auth']).then(_ => {
  firebase.auth().onAuthStateChanged(...);
});

// This is equivalent (but requires dependency/hierarchy knowledge)
isReady('firebase').then(_ => {
  //=> ready: window.firebase
  isReady('firebase.auth').then(_ => {
    //=> ready: window.firebase.auth
  });
});
```

## API

### isReady(name)

Returns: `Promise`

#### name

Type: `String` or `Array`

The global variable name(s) to check. These are the would-be variable(s) mounted to `window` once loaded. For example, if you know a library will be accesible as `window.foobar`, then you would use `isReady('foobar')`.

Any nested or sub-module names should be delimited with a `.`; eg `firebase.auth`. See [`dlv`](https://github.com/developit/dlv) for more info on dot-notation access.


## License

MIT © [Luke Edwards](https://lukeed.com)

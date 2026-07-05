---
repo: mswjs/is-node-process
url: 'https://github.com/mswjs/is-node-process'
homepage: 'https://npm.im/is-node-process'
starredAt: '2022-02-10T18:08:53Z'
createdAt: '2021-07-18T23:48:51Z'
updatedAt: '2024-07-12T20:52:11Z'
language: TypeScript
license: NA
branch: main
stars: 12
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:14.545Z'
description: >-
  Reliably determines if the code is running in Node.js. Treats Jest, React
  Native, Electron, and others like Node.js.
tags:
  - check
  - nodejs
  - process
---

[![Package version](https://img.shields.io/npm/v/is-node-process.svg)](https://www.npmjs.com/package/is-node-process)

# `is-node-process`

Reliably determines if the code is running in Node.js

## Motivation

This library was created to provide a reliable way of determining a Node.js process, taking into account:

- Browser-like environments (JSDOM);
- Electron renderer process;
- React Native runtime.

### Why relying on `window` is a bad idea

There are environments (i.e. JSDOM) that polyfill the global `window` object and some of its API for the sake of emulating browser-like behaviors, while still remaining a Node.js process.

### Why relying on `process` is a bad idea

Electron injects a global `process` object in the browser runtime when run with the `nodeIntegration: true` option.

## Getting started

```sh
$ npm install is-node-process
# or
$ yarn add is-node-process
```

```js
// any/code.js
const { isNodeProcess } = require('is-node-process')
isNodeProcess() // true/false
```

---
repo: flexdinesh/browser-or-node
url: 'https://github.com/flexdinesh/browser-or-node'
homepage: ''
starredAt: '2021-11-19T04:39:02Z'
createdAt: '2018-01-24T18:30:11Z'
updatedAt: '2025-02-14T08:16:06Z'
language: TypeScript
license: MIT
branch: master
stars: 246
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:37.652Z'
description: Check where your code is running. In the browser or in node.js environment.
tags:
  - browser
  - nodejs
  - npm-package
---

# Browser or Node.js

[![npm version](https://badge.fury.io/js/browser-or-node.svg)](https://www.npmjs.com/package/browser-or-node)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Check in which environment the code is running - browser/node.js/webworker/jsdom/deno.

## Install

```
$ npm install --save browser-or-node
```

## Usage

Import the checks and use it in your code. Works with both ESM and CJS imports.

```js
import * as jsEnv from "browser-or-node";
// import { isBrowser, isNode, isWebWorker, isJsDom, isDeno, isBun } from "browser-or-node";
// const jsEnv = require("browser-or-node");

if (jsEnv.isBrowser) {
  // do browser only stuff
}

if (jsEnv.isNode) {
  // do node.js only stuff
}

if (jsEnv.isWebWorker) {
  // do web worker only stuff
}

if (jsEnv.isJsDom) {
  // do jsdom only stuff
}

if (jsEnv.isDeno) {
  // do deno only stuff
}

if (jsEnv.isBun) {
  // do bun only stuff
}
```

## License

MIT © Dinesh Pandiyan

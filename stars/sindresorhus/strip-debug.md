---
repo: sindresorhus/strip-debug
url: 'https://github.com/sindresorhus/strip-debug'
homepage: ''
starredAt: '2019-01-27T18:35:52Z'
createdAt: '2014-01-11T20:48:53Z'
updatedAt: '2024-11-09T07:39:06Z'
language: JavaScript
license: MIT
branch: main
stars: 85
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:50.255Z'
description: 'Strip console, alert, and debugger statements from JavaScript code'
tags: []
---

# strip-debug

> Strip `console`, `alert`, and `debugger` statements from JavaScript code

Useful for making sure you didn't leave any logging in production code.

## Usage

```sh
npm install @babel/core strip-debug
```

## Usage

```js
import {transformSync} from '@babel/core';
import stripDebug from 'strip-debug';

transformSync('function foo(){console.log("foo");alert("foo");debugger;}', {
	plugins: [stripDebug]
}).code;
//=> 'function foo() { void 0;void 0; }'
```

To prevent any side-effects, `console.*`/`alert*` is replaced with `void 0` instead of being stripped.

If you shadow the `console` global with your own local variable, it will still be removed.

## Related

- [strip-debug-cli](https://github.com/sindresorhus/strip-debug-cli) - API for this module

---
repo: unjs-archive/jimp-compact
url: 'https://github.com/unjs-archive/jimp-compact'
homepage: ''
starredAt: '2021-11-30T02:22:01Z'
createdAt: '2019-08-20T21:14:03Z'
updatedAt: '2025-01-16T15:26:10Z'
language: TypeScript
license: NA
branch: main
stars: 118
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:33.560Z'
description: >-
  ✏️ Lightweight version of Jimp -- An image processing library written entirely
  in JavaScript for Node.js
tags:
  - jimp
  - jpeg
  - node
  - nodejs
  - png
  - resize
---

# ✏️ Jimp Compact

<!-- [![automated](https://flat.badgen.net/badge/publish/automated/green)](#) -->
<!-- [![circle ci](https://flat.badgen.net/circleci/github/unjs/jimp-compact)](https://circleci.com/gh/unjs/jimp-compact) -->
[![npm version](https://flat.badgen.net/npm/v/jimp-compact)](https://www.npmjs.com/package/jimp-compact)
[![npm downloads](https://flat.badgen.net/npm/dm/jimp-compact)](https://www.npmjs.com/package/jimp-compact)
[![install size](https://flat.badgen.net/packagephobia/install/jimp-compact)](https://packagephobia.now.sh/result?p=jimp-compact)

> Lightweight version of [Jimp](https://github.com/oliver-moran/jimp) compiled with [vercel/ncc](https://github.com/vercel/ncc)

## Why?

This package has **27x** smaller install size with **all** features of original jimp (Jimp install size is [~33.8MB](https://packagephobia.now.sh/result?p=jimp)) by bundling all `node_modules` and removing extra files.

## Usage

Install and import/require `jimp-compact` instead of `jimp` npm package.

```sh
# npm
npm i jimp-compact

# yarn
yarn add jimp-compact
```

```js
// ESM
import Jimp from 'jimp-compact'

// CJS
const Jimp = require('jimp-compact')
```

See [jimp docs](https://github.com/oliver-moran/jimp/tree/master/packages/jimp) for full usage.

## Known Issues

In order to make typescript working, you need to (also) install `jimp` in `devDependencies`!
Track issue via [#39](https://github.com/unjs/jimp-compact/issues/39) and [#42](https://github.com/unjs/jimp-compact/issues/52).

## License

MIT - Based on [Jimp](https://github.com/oliver-moran/jimp/blob/master/LICENSE)

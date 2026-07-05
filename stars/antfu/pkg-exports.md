---
repo: antfu/pkg-exports
url: 'https://github.com/antfu/pkg-exports'
homepage: ''
starredAt: '2022-06-28T20:28:19Z'
createdAt: '2022-06-27T14:53:40Z'
updatedAt: '2025-02-22T18:58:04Z'
language: TypeScript
license: MIT
branch: main
stars: 119
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:39.858Z'
description: Get exports of an local npm package.
tags: []
---

# pkg-exports

[![NPM version](https://img.shields.io/npm/v/pkg-exports?color=a1b858&label=)](https://www.npmjs.com/package/pkg-exports)

Get exports of an local npm package.

## Install

```bash
npm i pkg-exports
```

## Usage

### `getExportsRuntime`

Get the exports by evaluate the module in worker thread.

```ts
import { getExportsRuntime } from 'pkg-exports'

const exports = await getExportsRuntime('vue')
console.log(exports) // ['ref', 'computed', ...]
```


### `getExportsStatic`

Get the exports by static analysis (only work with ESM). **Experimental**.

```ts
import { getExportsStatic } from 'pkg-exports'

const exports = await getExportsStatic('vue')
console.log(exports) // ['ref', 'computed', ...]
```

## Sponsors

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg'/>
  </a>
</p>

## License

[MIT](./LICENSE) License © 2022 [Anthony Fu](https://github.com/antfu)

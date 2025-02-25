---
repo: antfu/fsxx
url: 'https://github.com/antfu/fsxx'
homepage: ''
starredAt: '2021-06-14T00:55:38Z'
createdAt: '2021-06-06T12:32:18Z'
updatedAt: '2025-01-15T15:38:43Z'
language: JavaScript
license: MIT
branch: main
stars: 283
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:34.879Z'
description: File system in zx style
tags:
  - fs
  - zx
---

# fsxx

[![NPM version](https://img.shields.io/npm/v/fsxx?color=a1b858&label=)](https://www.npmjs.com/package/fsxx)

File system in [zx](https://github.com/google/zx) style.

```ts
import { cd, io, read } from 'fsxx'

console.log(await read`README.md`)

const { name } = await read.json`package.json`

cd('packages')
const { data, save } = await io.json`./core/package.json`
data.version = '0.1.1'
await save()

const isMIT = read.sync`LICENSE`.includes('MIT')
```

> **EXPERIMENTAL**: APIs are very likely to be overhauled in the future.

## Sponsors

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg'/>
  </a>
</p>

## License

[MIT](./LICENSE) License © 2021 [Anthony Fu](https://github.com/antfu)

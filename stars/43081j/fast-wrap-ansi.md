---
repo: 43081j/fast-wrap-ansi
url: 'https://github.com/43081j/fast-wrap-ansi'
homepage: null
starredAt: '2025-12-26T15:18:00Z'
createdAt: '2025-08-03T23:26:14Z'
updatedAt: '2025-12-26T15:18:00Z'
language: TypeScript
license: MIT
branch: main
stars: 8
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-12-27T22:31:47.960Z'
description: A tiny and fast library for word wrapping terminal output.
tags: []
---

# fast-wrap-ansi

Wordwrap a string, taking ANSI escape codes into account.

A fast, light fork of the `wrap-ansi` package.


## Install

```bash
npm i -S fast-wrap-ansi
```

## Usage

```ts
import {wrapAnsi} from 'fast-wrap-ansi';

const str = 'This is a string with some \x1b[31mANSI\x1b[39m codes.';
const wrapped = wrapAnsi(str, 20);
console.log(wrapped);
```

## License

MIT

---
repo: antfu/strip-literal
url: 'https://github.com/antfu/strip-literal'
homepage: ''
starredAt: '2022-06-07T19:24:03Z'
createdAt: '2022-05-07T02:44:35Z'
updatedAt: '2025-01-15T10:56:58Z'
language: TypeScript
license: MIT
branch: main
stars: 85
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:43.433Z'
description: Strip comments and string literals from JavaScript code
tags: []
---

# strip-literal

[![NPM version](https://img.shields.io/npm/v/strip-literal?color=a1b858&label=)](https://www.npmjs.com/package/strip-literal)

Strip comments and string literals from JavaScript code. Powered by [`js-tokens`](https://github.com/lydell/js-tokens).

## Usage

<!-- eslint-disable no-template-curly-in-string -->

```ts
import { stripLiteral } from 'strip-literal'

stripLiteral('const foo = `//foo ${bar}`') // 'const foo = `       ${bar}`'
```

Comments, string literals will be replaced by spaces with the same length to keep the source map untouched.

## Sponsors

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg'/>
  </a>
</p>

## License

[MIT](./LICENSE) License © 2022 [Anthony Fu](https://github.com/antfu)

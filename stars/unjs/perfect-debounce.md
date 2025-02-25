---
repo: unjs/perfect-debounce
url: 'https://github.com/unjs/perfect-debounce'
homepage: ''
starredAt: '2022-03-15T19:13:29Z'
createdAt: '2022-03-15T11:15:26Z'
updatedAt: '2025-02-17T11:05:59Z'
language: TypeScript
license: MIT
branch: main
stars: 235
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:59.085Z'
description: Debounce promise-returning & async functions.
tags: []
---

# perfect-debounce

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions][github-actions-src]][github-actions-href]
[![Codecov][codecov-src]][codecov-href]

Improved debounce function with Promise support.

## Features

- Well tested debounce implementation
- Native Promise support
- Avoid duplicate calls while promise is being resolved
- Configurable `trailing` and `leading` behavior

## Usage

Install package:

```sh
# npm
npm install perfect-debounce

# yarn
yarn add perfect-debounce

# pnpm
pnpm add perfect-debounce
```

Import:

```js
// ESM
import { debounce } from 'perfect-debounce'

// CommonJS
const { debounce } = require('perfect-debounce')
```

Debounce function:

```js
const debounced = debounce(async () => {
  // Some heavy stuff
}, 25)
```

When calling `debounced`, it will wait at least for `25ms` as configured before actually calling our function. This helps to avoid multiple calls.

To avoid initial wait, we can set `leading: true` option. It will cause function to be immediately called if there is no other call:

```js
const debounced = debounce(async () => {
  // Some heavy stuff
}, 25, { leading: true })
```

If executing async function takes longer than debounce value, duplicate calls will be still prevented a last call will happen. To disable this behavior, we can set `trailing: false` option:

```js
const debounced = debounce(async () => {
  // Some heavy stuff
}, 25, { trailing: false })
```

## 💻 Development

- Clone this repository
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable` (use `npm i -g corepack` for Node.js < 16.10)
- Install dependencies using `pnpm install`
- Run interactive tests using `pnpm dev`

## License

Made with 💛

Based on [sindresorhus/p-debounce](https://github.com/sindresorhus/p-debounce).

Published under [MIT License](./LICENSE).

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/perfect-debounce?style=flat-square
[npm-version-href]: https://npmjs.com/package/perfect-debounce

[npm-downloads-src]: https://img.shields.io/npm/dm/perfect-debounce?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/perfect-debounce

[github-actions-src]: https://img.shields.io/github/actions/workflow/status/unjs/perfect-debounce/ci.yml?branch=main&style=flat-square
[github-actions-href]: https://github.com/unjs/perfect-debounce/actions?query=workflow%3Aci

[codecov-src]: https://img.shields.io/codecov/c/gh/unjs/perfect-debounce/main?style=flat-square
[codecov-href]: https://codecov.io/gh/unjs/perfect-debounce

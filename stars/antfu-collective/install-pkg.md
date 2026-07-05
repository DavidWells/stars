---
repo: antfu-collective/install-pkg
url: 'https://github.com/antfu-collective/install-pkg'
homepage: ''
starredAt: '2021-10-03T19:36:49Z'
createdAt: '2021-09-28T04:41:34Z'
updatedAt: '2025-02-20T21:12:25Z'
language: TypeScript
license: MIT
branch: main
stars: 185
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:43.813Z'
description: Install package programmatically.
tags: []
---

# install-pkg

[![NPM version](https://img.shields.io/npm/v/@antfu/install-pkg?color=a1b858&label=)](https://www.npmjs.com/package/@antfu/install-pkg)

Install package programmatically. Detect package managers automatically (`npm`, `yarn`, `bun` and `pnpm`).

```bash
npm i @antfu/install-pkg
```

```ts
import { installPackage } from '@antfu/install-pkg'

await installPackage('vite', { silent: true })
```

## Sponsors

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg'/>
  </a>
</p>

## License

[MIT](./LICENSE) License © 2021 [Anthony Fu](https://github.com/antfu)

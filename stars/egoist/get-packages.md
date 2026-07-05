---
repo: egoist/get-packages
url: 'https://github.com/egoist/get-packages'
homepage: ''
starredAt: '2022-02-05T18:50:12Z'
createdAt: '2022-01-31T15:22:11Z'
updatedAt: '2024-02-24T12:04:36Z'
language: TypeScript
license: MIT
branch: main
stars: 46
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:16.248Z'
description: 'Get packages from a monorepo (pnpm, yarn, npm, lerna)'
tags: []
---

**💛 You can help the author become a full-time open-source maintainer by [sponsoring him on GitHub](https://github.com/sponsors/egoist).**

---

# @egoist/get-packages

[![npm version](https://badgen.net/npm/v/@egoist/get-packages)](https://npm.im/@egoist/get-packages) [![npm downloads](https://badgen.net/npm/dm/@egoist/get-packages)](https://npm.im/@egoist/get-packages)

> Get packages from a monorepo (pnpm, yarn, npm, lerna)

## Install

```bash
npm i @egoist/get-packages
```

## Usage

```ts
import { getPackages } from "@egoist/get-packages"

const workspace = await getPackages(".")

// For a monorepo:
// workspace.type => 'monorepo'
// workspace.npmClient => 'pnpm' | 'yarn' | 'npm'
// workspace.root => { data, path }
// workspace.packages => [{ data, path }]

// For a non-monorepo:
// workspace.type => 'non-monorepo'
// workspace.npmClient => 'pnpm' | 'yarn' | 'npm'
// workspace.package => { data, path }
```

Type docs: https://paka.dev/npm/@egoist/get-packages

## Sponsors

[![sponsors](https://sponsors-images.egoist.sh/sponsors.svg)](https://github.com/sponsors/egoist)

## License

MIT &copy; [EGOIST](https://github.com/sponsors/egoist)

---
repo: antfu/pnpm-patch-i
url: 'https://github.com/antfu/pnpm-patch-i'
homepage: ''
starredAt: '2023-01-17T19:09:00Z'
createdAt: '2023-01-17T10:52:49Z'
updatedAt: '2025-02-23T00:21:52Z'
language: TypeScript
license: MIT
branch: main
stars: 277
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:58.529Z'
description: A better and interactive pnpm patch
tags:
  - patch-management
  - pnpm
---

# pnpm-patch-i

[![NPM version](https://img.shields.io/npm/v/pnpm-patch-i?color=a1b858&label=)](https://www.npmjs.com/package/pnpm-patch-i)

A better and interactive `pnpm patch`.

## Usage

```bash
npx pnpm-patch-i package-name
```

This CLI wraps with [`pnpm patch`](https://pnpm.io/cli/patch) and provides a better interactive experience:

- Have the patch dir under your local `node_modules/` folder instead of a global temp folder
- More human-friendly folder name instead of random string
- Open the editing folder in your editor via [`launch-editor`](https://github.com/yyx990803/launch-editor)
- Wait for your changes and automatically run `pnpm commit-patch <dir>` for you
- Always runs at where `pnpm-lock.yaml` is located

### Apply Patch from a directory

It's also possible to apply a patch directly from a directory (normally a local build of the package), for example:

```bash
npx pnpm-patch-i vite ../vite/packages/vite --build
```

`--build` (`-b`) flag will invoke `npm run build` in the source directory before applying the patch.

## Sponsors

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg'/>
  </a>
</p>

## License

[MIT](./LICENSE) License © 2023 [Anthony Fu](https://github.com/antfu)

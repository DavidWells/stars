---
repo: unjs/nypm
url: 'https://github.com/unjs/nypm'
homepage: ''
starredAt: '2022-12-09T23:29:20Z'
createdAt: '2022-12-06T15:26:07Z'
updatedAt: '2025-02-25T17:45:14Z'
language: TypeScript
license: MIT
branch: main
stars: 549
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:00:04.787Z'
description: "\U0001F308 Unified Package Manager for Node.js (npm, pnpm, yarn), Bun and Deno"
tags: []
---

# 🌈 nypm

<!-- automd:badges color="yellow" codecov -->

[![npm version](https://img.shields.io/npm/v/nypm?color=yellow)](https://npmjs.com/package/nypm)
[![npm downloads](https://img.shields.io/npm/dm/nypm?color=yellow)](https://npm.chart.dev/nypm)
[![codecov](https://img.shields.io/codecov/c/gh/unjs/nypm?color=yellow)](https://codecov.io/gh/unjs/nypm)

<!-- /automd -->

🌈 Unified Package Manager for Node.js (npm, pnpm, yarn), Bun and Deno.

✅ Supports [npm](https://docs.npmjs.com/cli/v10/commands/npm), [yarn](https://yarnpkg.com/), [pnpm](https://pnpm.io/) and [bun](https://bun.sh/package-manager) and [deno](https://deno.com/) out of the box with a unified API.

✅ Provides an **API interface** to interact with package managers.

✅ **Autodetects** project's package manager using `package.json` and known lockfiles.

✅ **[corepack](https://github.com/nodejs/corepack)** integration for **pnpm** and **yarn**.

## `nypm` command

**Install dependencies:**

```sh
npx nypm i
```

**Add a dependency:**

```sh
npx nypm add defu
```

**Remove a dependency:**

```sh
npx nypm remove defu
```

## API Usage

Install package:

<!-- automd:pm-i -->

```sh
# ✨ Auto-detect
npx nypm install nypm

# npm
npm install nypm

# yarn
yarn add nypm

# pnpm
pnpm install nypm

# bun
bun install nypm

# deno
deno install nypm
```

<!-- /automd -->

Import:

```js
// ESM import
import { addDependency } from "nypm";

// or dynamic import
const { addDependency } = await import("nypm");
```

### `addDependency(name, options)`

Adds dependency to the project.

### `addDevDependency(name, options)`

Adds dev dependency to the project.

### `detectPackageManager(cwd, options)`

Detect the package manager used in a directory (and up) by checking various sources:

1. Use `packageManager` field from package.json
2. Known lock files and other files

### `ensureDependencyInstalled(name, options)`

Ensures dependency is installed.

### `installDependencies(options)`

Installs project dependencies.

### `removeDependency(name, options)`

Removes dependency from the project.

### `dedupeDependencies(options)`

Dedupe project dependencies.

### `runScript(name, options)`

Runs a script defined in the `package.json` file.

> [!NOTE]
> For `bun` and `deno` it will remove the lockfile and reinstall all dependencies.

## 💻 Development

- Clone this repository
- Play [Nyan Cat](https://www.nyan.cat/) in the background (really important!)
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable`
- Install dependencies using `pnpm install`
- Run interactive tests using `pnpm dev`

## Related Projects

NYPM is inspired from previous attempts and projects for unifying package manager experience.

- [pi0/yarnpm](https://github.com/pi0/yarnpm)
- [unjs/lmify](https://github.com/unjs/lmify)
- [antfu/ni](https://github.com/antfu/ni)
- [antfu/install-pkg](https://github.com/antfu/install-pkg)
- [egoist/dum](https://github.com/egoist/dum)
- [nodejs/corepack](https://github.com/nodejs/corepack)

## License

Made with 💛

Published under [MIT License](./LICENSE).

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/nypm?style=flat-square
[npm-version-href]: https://npmjs.com/package/nypm
[npm-downloads-src]: https://img.shields.io/npm/dm/nypm?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/nypm
[github-actions-src]: https://img.shields.io/github/actions/workflow/status/unjs/nypm/ci.yml?branch=main&style=flat-square
[github-actions-href]: https://github.com/unjs/nypm/actions?query=workflow%3Aci
[codecov-src]: https://img.shields.io/codecov/c/gh/unjs/nypm/main?style=flat-square
[codecov-href]: https://codecov.io/gh/unjs/nypm

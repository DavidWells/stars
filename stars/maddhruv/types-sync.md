---
repo: maddhruv/types-sync
url: 'https://github.com/maddhruv/types-sync'
homepage: ''
starredAt: '2021-05-12T22:49:28Z'
createdAt: '2021-05-02T12:00:53Z'
updatedAt: '2024-10-08T15:54:09Z'
language: TypeScript
license: MIT
branch: master
stars: 24
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:43.040Z'
description: 'Sync your types :wink:'
tags:
  - definitelytyped
  - nodejs
  - npm
  - types
  - typescript
  - yarn
---

# types-sync

Keep your types in sync with DefinitelyTyped - auto install/uninstall types for dependencies on
postinstall.

[![npm version](https://badge.fury.io/js/types-sync.svg)](https://www.npmjs.com/package/types-sync)

## Features

- Works with `npm`, `yarn`, `pnpm`, `bolt`
- In sync with [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)
- Can be hooked with npm and husky hooks

## Install

`npm install -D types-sync`

## Usage

### As CLI

Use `types-sync` as `postinstall` scripts in your _package.json_

```js
"scripts": {
  "postinstall": "types-sync",
}
```

### As Module

```ts
import typesSync from 'types-sync';

const types = typesSync({
  dependencies,
  devDependencies,
  ignore,
});
```

## Config

Add a `.types-syncrc.json` at the root of your project.

| options        | type                       | description                             |
| -------------- | -------------------------- | --------------------------------------- |
| dependencies   | `Array`                    | dependencies to manually add for sync   |
| ignore         | `Array`                    | ignore these dependencies from removing |
| packageManager | `npm`/`yarn`/`pnpm`/`bolt` | package manager to use                  |
| removeUnused   | `Boolean`                  | remove unsued types                     |

Note: `types-sync` will automatically detect the package manager being used according to the lock
files. Explicitly defining the `packageManager` config option is optional and if defined will force
`types-sync` to use the specified package manager.

Refer to
[./types-syncrc.json](https://github.com/maddhruv/types-sync/blob/master/.types-syncrc.json) for
full config

## Related

- Uses [types-directory](https://github.com/maddhruv/types-directory) under the hood to fetch all
  available types

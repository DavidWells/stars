---
repo: npm/map-workspaces
url: 'https://github.com/npm/map-workspaces'
homepage: ''
starredAt: '2021-05-15T00:57:52Z'
createdAt: '2020-03-06T23:57:14Z'
updatedAt: '2024-11-20T21:39:56Z'
language: JavaScript
license: NOASSERTION
branch: main
stars: 20
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:41.653Z'
description: 'Retrieves a name:pathname Map for a given workspaces config'
tags:
  - npm-cli
---

# @npmcli/map-workspaces

[![NPM version](https://img.shields.io/npm/v/@npmcli/map-workspaces)](https://www.npmjs.com/package/@npmcli/map-workspaces)
[![Build Status](https://img.shields.io/github/actions/workflow/status/npm/map-workspaces/ci.yml?branch=main)](https://github.com/npm/map-workspaces)
[![License](https://img.shields.io/npm/l/@npmcli/map-workspaces)](https://github.com/npm/map-workspaces/blob/main/LICENSE.md)

Retrieves a name:pathname Map for a given workspaces config.

Long version: Reads the `workspaces` property from a valid **workspaces configuration** object and traverses the paths and globs defined there in order to find valid nested packages and return a **Map** of all found packages where keys are package names and values are folder locations.

## Install

`npm install @npmcli/map-workspaces`

## Usage:

```js
const mapWorkspaces = require('@npmcli/map-workspaces')
await mapWorkspaces({
  cwd,
  pkg: {
    workspaces: {
      packages: [
        "a",
        "b"
      ]
    }
  }
})
// ->
// Map {
//   'a': '<cwd>/a'
//   'b': '<cwd>/b'
// }
```

## Examples:

### Glob usage:

Given a folder structure such as:

```
├── package.json
└── apps
   ├── a
   │   └── package.json
   ├── b
   │   └── package.json
   └── c
       └── package.json
```

```js
const mapWorkspaces = require('@npmcli/map-workspaces')
await mapWorkspaces({
  cwd,
  pkg: {
    workspaces: [
      "apps/*"
    ]
  }
})
// ->
// Map {
//   'a': '<cwd>/apps/a'
//   'b': '<cwd>/apps/b'
//   'c': '<cwd>/apps/c'
// }
```

## API:

### `mapWorkspaces(opts) -> Promise<Map>`

- `opts`:
  - `pkg`: A valid `package.json` **Object**
  - `cwd`: A **String** defining the base directory to use when reading globs and paths.
  - `ignore`: An **Array** of paths to be ignored when using [globs](https://www.npmjs.com/package/glob) to look for nested package.
  - ...[Also support all other glob options](https://www.npmjs.com/package/glob#options)

#### Returns

A **Map** in which keys are **package names** and values are the **pathnames** for each found **workspace**.

## LICENSE

[ISC](./LICENSE)


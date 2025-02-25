---
repo: Luke-zhang-04/utils
url: 'https://github.com/Luke-zhang-04/utils'
homepage: ''
starredAt: '2021-12-27T20:49:05Z'
createdAt: '2021-07-28T14:53:14Z'
updatedAt: '2024-05-02T03:22:47Z'
language: TypeScript
license: 0BSD
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:25.507Z'
description: >-
  Simple but useful utility functions without the bloat of Lodash + an intuitive
  API for Node Crypto and Web Crypto
tags: []
---

# Utilities

[![Test Coverage](https://api.codeclimate.com/v1/badges/fcd61de6806fd794213c/test_coverage)](https://codeclimate.com/github/Luke-zhang-04/utils/test_coverage)
[![Tests](https://img.shields.io/github/actions/workflow/status/luke-zhang-04/utils/CI.yml?branch=master&label=tests&logo=github)](https://github.com/Luke-zhang-04/utils/actions/workflows/CI.yml)

Useful utility functions without the bloat of Lodash. Lodash contains many unnecessary functions, and have functions which rely on each other, creating massive bundles even if you only used one function. These utilities are tree-shakeable, independent (some exceptions), pure functions and are built with performance in mind. I use these functions in my own projects.

Even though most of these functions are trivial to write, it becomes annoying to have to write them over and over again, so I put them into a repo that can be installed with a package manager.

Included are also wrappers around existing APIs. For example, the Node Crypto API is hard to use, and requires many steps. The functions in `node/crypto` allow for easy hashing and encryption.

## Installation

Install directly from Github.

**To install with semver:**

```
npm i Luke-zhang-04/utils#semver:<semver>
pnpm add Luke-zhang-04/utils#semver:<semver>
yarn add Luke-zhang-04/utils#semver:<semver>
```

E.g

```
npm i Luke-zhang-04/utils#semver:^1.0.0
```

**To install a specific version:**

```
npm i Luke-zhang-04/utils#v<version>
pnpm add Luke-zhang-04/utils#v<version>
yarn add Luke-zhang-04/utils#v<version>
```

Or

```
npm i https://github.com/Luke-zhang-04/utils/releases/download/v<version>utils.tar.gz
pnpm add https://github.com/Luke-zhang-04/utils/releases/download/v<version>utils.tar.gz
yarn add https://github.com/Luke-zhang-04/utils/releases/download/v<version>utils.tar.gz
```

**"Rolling release"**

```
npm i Luke-zhang-04/utils#dist
pnpm add Luke-zhang-04/utils#dist
yarn add Luke-zhang-04/utils#dist
```

**To install a specific commit:**

```
npm i Luke-zhang-04/utils#<Commit hash>
pnpm add Luke-zhang-04/utils#<Commit hash>
yarn add Luke-zhang-04/utils#<Commit hash>
```

Make sure the commits are specifically from the dist branch.

## Usage

Visit the [wiki](https://github.com/Luke-zhang-04/utils/wiki) for documentation

### Importing

It is recommended that either named or star imports are used. Default imports may not be tree-shaken properly.

Imports from the `cjs` directory do not work. Node will automatically map imports to cjs or mjs based on the running program.

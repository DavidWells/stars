---
repo: neo-hack/neo
url: 'https://github.com/neo-hack/neo'
homepage: 'https://neo-docs.netlify.app/'
starredAt: '2022-01-24T02:17:51Z'
createdAt: '2018-10-03T10:48:23Z'
updatedAt: '2024-07-07T12:33:13Z'
language: TypeScript
license: MIT
branch: master
stars: 12
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:18.826Z'
description: 'neo - new repo. template manager, happy hacking!'
tags:
  - cli
  - neo
  - template
---

<img width='128' align='right' src='https://user-images.githubusercontent.com/6839576/146879486-df3486cd-ec8d-4f1e-bd96-675f16703752.png' alt='logo' />

*neo - new repo. `neo` use `pnpm` to manage your template, create hack project as quick as possible.*


[![npm](https://img.shields.io/npm/v/@aiou/neo)](https://github.com/neo-hack/neo/tree/master/packages/core) [![GitHub](https://img.shields.io/github/license/neo-hack/neo)](https://github.com/neo-hack/neo/tree/master/packages/core)

## table of contents

- [table of contents](#table-of-contents)
- [install](#install)
- [get started](#get-started)
- [contribute](#contribute)

## install

```bash
npm install @aiou/neo -g
```

## get started

Create project from remote `npm-package` as template

```bash
neo create @aiou/bin-template project
```

Or save `@aiou/bin-template` into store first


```bash
neo add @aiou/bin-template
```

In the next time, `neo create` will prefer load template from local store. It's fast ⚡

Check [Documentation](https://neo-docs.netlify.app) for more details.

## contribute

environment require 

- `pnpm@^7.4.0`
- `node^14`

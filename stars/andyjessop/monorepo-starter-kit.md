---
repo: andyjessop/monorepo-starter-kit
url: 'https://github.com/andyjessop/monorepo-starter-kit'
homepage: ''
starredAt: '2020-12-21T07:24:32Z'
createdAt: '2020-12-18T15:40:37Z'
updatedAt: '2024-11-08T01:09:35Z'
language: JavaScript
license: NA
branch: main
stars: 43
isPublic: true
isTemplate: true
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:15.520Z'
description: 'A starter config for Lerna with Typescript, Rollup, ESLint, Jest, and Prettier'
tags: []
---

# Monorepo Starter Kit

A starter kit that provides configuration for a multi-package monorepo with the following features:

- Packages bundled with Rollup
- TypeScript-friendly throughout
- ESLint (uses the `standard` config with a few extras)
- Jest for unit tests
- Prettier (opinionated code formatting)
- Individual package configs extend base configs

## Installation

Clone the repo:

```bash
git clone git@github.com:andyjessop/lerna-rollup-typescript.git
```

Install dependencies

```bash
cd lerna-rollup-typescript
npm i
```

Get started by linking the packages:

```bash
./node_modules/.bin/lerna bootstrap --hoist
```

Then you can run all builds/tests/lints from the root with:

```bash
./node_modules/.bin/lerna run build
./node_modules/.bin/lerna run lint
./node_modules/.bin/lerna run test
```

Or run them from the roots of individual packages:

```bash
npm run build
npm run lint
npm run test
```

There's not much else to write here. The rest is up to the docs at:

- [Lerna](https://github.com/lerna/lerna)
- [TypeScript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/)
- [Jest](https://jestjs.io/)
- [Prettier](https://prettier.io/)

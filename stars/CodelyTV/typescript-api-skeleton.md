---
repo: CodelyTV/typescript-api-skeleton
url: 'https://github.com/CodelyTV/typescript-api-skeleton'
homepage: 'https://pro.codely.tv/library/de-javascript-a-typescript-128106/347481/about/'
starredAt: '2022-02-13T21:57:21Z'
createdAt: '2021-07-06T14:36:28Z'
updatedAt: '2025-02-12T06:15:35Z'
language: TypeScript
license: NA
branch: main
stars: 198
isPublic: true
isTemplate: true
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:24.339Z'
description: "\U0001F537\U0001F30D TypeScript API Skeleton: Bootstrap your new HTTP API backend with TypeScript"
tags:
  - back-end
  - backend
  - backend-api
  - ci
  - eslint
  - github-actions
  - jest
  - node
  - node-js
  - nodejs
  - supertest
  - ts
  - tsconfig
  - typescript
---

# TypeScript Express API Bootstrap (base / project starter)

This is a repository intended to serve as a starting point if you want to bootstrap a express API project in TypeScript.

## Features

- [TypeScript](https://www.typescriptlang.org/) (v4)
- [ts-node-dev](https://github.com/wclr/ts-node-dev)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/) with:
  - [Codely's config](https://github.com/lydell/eslint-plugin-simple-import-sort/) (includes ESLint's recommended rules, Prettier, Import plugin and more)
  - [Jest plugin](https://www.npmjs.com/package/eslint-plugin-jest)
- [Jest](https://jestjs.io) with [DOM Testing Library](https://testing-library.com/docs/dom-testing-library/intro)
- [GitHub Action workflows](https://github.com/features/actions) set up to run tests and linting on push

## Running the app

```
# install dependencies
npm install

# run in dev mode on port 3000
npm run dev

# generate production build
npm run build

# run generated content in dist folder on port 3000
npm run start
```

## Testing

### Jest with supertest

```
npm run test
```

## Linting

```
# run linter
npm run lint

# fix lint issues
npm run lint:fix
```

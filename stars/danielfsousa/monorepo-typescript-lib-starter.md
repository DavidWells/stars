---
repo: danielfsousa/monorepo-typescript-lib-starter
url: 'https://github.com/danielfsousa/monorepo-typescript-lib-starter'
homepage: ''
starredAt: '2021-01-02T05:02:45Z'
createdAt: '2020-10-03T16:33:28Z'
updatedAt: '2021-03-03T12:15:53Z'
language: JavaScript
license: MIT
branch: main
stars: 3
isPublic: true
isTemplate: true
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:11.315Z'
description: "\U0001F680  Starter kit for monorepo libraries in Typescript"
tags:
  - boilerplate
  - cli
  - deno
  - generator
  - hacktoberfest
  - isomorphic
  - lerna
  - lib
  - library
  - monorepo
  - scaffold
  - starter
  - template
  - typescript
---

# monorepo-typescript-lib-starter

[![CI status](https://github.com/danielfsousa/monorepo-typescript-lib-starter/workflows/ci/badge.svg?branch=main)](https://github.com/danielfsousa/monorepo-typescript-lib-starter/actions?query=workflow%ci)
[![codecov](https://codecov.io/gh/danielfsousa/monorepo-typescript-lib-starter/branch/main/graph/badge.svg)](https://codecov.io/gh/danielfsousa/monorepo-typescript-lib-starter)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Typedoc reference](https://img.shields.io/badge/typedoc-reference-informational)](https://danielfsousa.github.io/monorepo-typescript-lib-starter/)

Starter kit for monorepo libraries in Typescript.

If you are building a small library and don't want a monorepo checkout: [danielfsousa/typescript-lib-starter](https://github.com/danielfsousa/typescript-lib-starter)

## Quick start

```bash
npm init @danielfsousa monorepo-typescript-lib my-lib
```

## Features

- [lerna](https://github.com/lerna/lerna) for managing a monorepo
- [RollupJS](https://github.com/rollup/rollup) for multiple [optimized bundles](https://2ality.com/2017/04/setting-up-multi-platform-packages.html) with tree shaking for UMD (browsers), CommonJS (Node.js) and ES Modules (module bundlers)
- Automatic types (\*.d.ts) file generation
- Tests and coverage report generation using [Jest](https://github.com/facebook/jest)
- [ESlint](https://github.com/eslint/eslint) with [standard](https://github.com/standard/eslint-config-standard-with-typescript) style for linting typescript and javascript files
- [Prettier](https://github.com/prettier/prettier) for code formatting
- Automatic documentation generation with [TypeDoc](https://github.com/TypeStrong/typedoc) and deployment to [Github Pages](https://pages.github.com/)
- Pre-commit hooks with [husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged) for linting, code formatting, unit tests and commit message validation
- [Codecov](https://codecov.io/) for consuming coverage reports
- Automatic releases and changelog, using [lerna](https://github.com/lerna/lerna) and [Commitizen](https://github.com/commitizen/cz-cli)(https://conventionalcommits.org/en/v1.0.0/)
- CI/CD with [Github Actions](https://docs.github.com/en/free-pro-team@latest/actions)
- Pre-created examples for a [CLI app](./packages/cli/README.md) and an isomorphic [core library](./packages/core/README.md) that runs on browsers, [Node.js](https://nodejs.org/en/) and [Deno](https://deno.land/)

## Scripts

Execute the scripts from the root directory to run for all packages or inside a package folder to run only for that project.

- `npm run bootstrap` Syslink packages and binaries
- `npm run clean` Remove generated code, typings and caches
- `npm run commit` Commit using conventional commit style
- `npm run docs` Generate and open documentation
- `npm run format` Format code using prettier
- `npm run format:check` Check if code is following the prettier style
- `npm run lint` Lints code
- `npm run lint:fix` Lints and tries to fix linting errors
- `npm run publish` Bump packages versions based on the commits messages, edit the CHANGELOG file and publish a new release to npm and github
- `npm run test` Run test suite and generate coverage report
- `npm run test:watch` Run test suite in interactive watch mode
- `npm run watch` Run build script in watch mode

## Git hooks

- `pre-commit`: Lints, check your code style and runs associated unit tests for every staged file
- `commit-msg`: Check if your commit message follows the Conventional Commits specification before every commit (you can run `npm run commit` to help you create a good commit message)

## Credits

- [alexjoverm/typescript-library-starter](https://github.com/alexjoverm/typescript-library-starter)
- [SatadruBhattacharjee/monorepo-typescript-library-starter](https://github.com/SatadruBhattacharjee/monorepo-typescript-library-starter/)
- [entria/entria-fullstack](https://github.com/entria/entria-fullstack)

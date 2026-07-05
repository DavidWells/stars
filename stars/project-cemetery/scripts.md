---
repo: project-cemetery/scripts
url: 'https://github.com/project-cemetery/scripts'
homepage: ''
starredAt: '2021-01-01T05:43:09Z'
createdAt: '2019-02-21T18:19:22Z'
updatedAt: '2024-04-03T09:11:11Z'
language: JavaScript
license: MIT
branch: master
stars: 21
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:12.424Z'
description: >-
  Speed up the creation and maintenance of your JS applications. Zero
  configuration way to use modern code-quality tools.
tags:
  - eslint
  - eslint-config
  - javascript
  - js
  - lint
  - prettier
  - ts
  - typescript
---

# @solid-soda/scripts

[![Scripts sets up by @solid-soda/scripts](https://img.shields.io/static/v1?label=@solid-soda/scripts&color=75ddf4)](https://github.com/solid-soda/scripts)

<img src="https://raw.githubusercontent.com/solid-soda/assets/master/logo.png" align="right"
     alt="Solid Soda logo" width="160" height="160">

Speed up the creation and maintenance of your JS applications. Zero configuration way to use modern code-quality tools.

- **Zero-config.** Any tool is already configured for you.
- **Universal.** Supports TS, React, and can be used with any tech.
- **Uniform.** Config can be shared (all projects have the same configs).

## TL;DR

```sh
npx @solid-soda/scripts
```

## Motivation

1. Before start to code we must set-up ESLint, Stylelint, Prettier, Commitizen, etc. We can to automate all of this. Machines have to suffer.
2. New lint rule adding is a hell. We provide the one source of true for any project. Just run `@solid-soda/scripts` in your project directory.

## Usage

Just run scripts in a directory with your project.

Just run:

```sh
npx @solid-soda/scripts
```

It will generate all configs and put it to repository. Now, you can use any provided tool.

Some scripts will be added to your `package.json`:

- `commit` — runs Commitizen and allow create nice commit messages
- `pretty` — runs Prettier and format all code in the repo
- `lint:code` — runs ESLint and preform static analysis of code

If you have some styles in the repo, we will add extra script:

- `lint:styles` — runs Stylelint and preform static analysis of styles

If you want to release repo by git-tags, we will add ont more script:

- `release` — runs Standard Version, updates CHANGELOG.md, bump version in `package.json` and created git-tag

Also, this library sets up `lint-staged` (prettify all staged files), `Commitlint` (check commit messages by [Conventional Commits specifications](https://www.conventionalcommits.org/en/v1.0.0-beta.2/#specification)) and `simple-git-hooks` (to run Prettier and Commitlint).

## Migration guide

Upgrading from version **1.x.x**, you must do one simple action: just run `@solid-soda/scripts` in your repository.

For example:

```sh
npx @solid-soda/scripts
```

## Acknowledgements

This project based on [mrm](https://github.com/sapegin/mrm) and setup configs for [Commitizen](http://commitizen.github.io/cz-cli/), [Commitlint](https://commitlint.js.org/#/), [ESLint](https://eslint.org), [simple-git-hooks](https://github.com/toplenboren/simple-git-hooks), [lint-staged](https://github.com/okonet/lint-staged), [Prettier](https://prettier.io), [Stylelint](https://stylelint.io).

---
repo: vintagesucks/random-starred-repository
url: 'https://github.com/vintagesucks/random-starred-repository'
homepage: 'https://github.com/vintagesucks/weeklyrandom'
starredAt: '2021-04-17T05:14:06Z'
createdAt: '2018-10-08T00:53:19Z'
updatedAt: '2025-01-21T23:19:55Z'
language: JavaScript
license: MIT
branch: master
stars: 13
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:50.628Z'
description: ':star: Returns a random repository starred by a user'
tags:
  - github-api
  - nodejs
  - random
  - starred-repositories
  - weekly-random
---

# random-starred-repository

[![Build Status](https://github.com/vintagesucks/random-starred-repository/workflows/Build/badge.svg)](https://github.com/vintagesucks/random-starred-repository/actions) [![CodeQL](https://github.com/vintagesucks/random-starred-repository/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/vintagesucks/random-starred-repository/actions/workflows/codeql-analysis.yml) [![Dependabot](https://badgen.net/badge/Dependabot/enabled/green?icon=dependabot)](https://dependabot.com/) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo) [![npm](https://img.shields.io/npm/v/random-starred-repository)](https://www.npmjs.com/package/random-starred-repository)

Returns a random repository starred by a user

## Usage
```sh
npx -q random-starred-repository username
```

## Example output
```sh
https://github.com/carbon-app/carbon
```

## Development
Run test matrix locally with [`act`](https://github.com/nektos/act):
```sh
act --job build \
  --workflows .github/workflows/nodejs.yml \
  --platform ubuntu-latest=shivammathur/node:latest \
  --container-architecture linux/amd64
```

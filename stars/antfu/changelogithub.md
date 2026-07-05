---
repo: antfu/changelogithub
url: 'https://github.com/antfu/changelogithub'
homepage: ''
starredAt: '2022-06-29T19:43:55Z'
createdAt: '2022-06-13T04:58:57Z'
updatedAt: '2025-02-21T12:58:17Z'
language: TypeScript
license: MIT
branch: main
stars: 779
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:39.604Z'
description: Generate changelog for GitHub
tags:
  - changelog
  - github
  - github-actions
  - release
---

# changelogithub

[![NPM version](https://img.shields.io/npm/v/changelogithub?color=a1b858&label=)](https://www.npmjs.com/package/changelogithub)

Generate changelog for GitHub releases from [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/), powered by [changelogen](https://github.com/unjs/changelogen).

[👉 Changelog example](https://github.com/unocss/unocss/releases/tag/v0.39.0)

## Features

- Support exclamation mark as breaking change, e.g. `chore!: drop node v10`
- Grouped scope in changelog
- Create the release note, or update the existing one
- List contributors

## Usage

In GitHub Actions:

```yml
# .github/workflows/release.yml

name: Release

permissions:
  contents: write

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Set node
        uses: actions/setup-node@v4
        with:
          registry-url: https://registry.npmjs.org/
          node-version: lts/*

      - run: npx changelogithub # or changelogithub@0.12 to ensure a stable result
        env:
          GITHUB_TOKEN: ${{secrets.GITHUB_TOKEN}}
```

It will be trigged whenever you push a tag to GitHub that starts with `v`.

## Configuration

You can put a configuration file in the project root, named as `changelogithub.config.{json,ts,js,mjs,cjs}`, `.changelogithubrc` or use the `changelogithub` field in `package.json`.

## Preview Locally

```bash
npx changelogithub --dry
```

## Why?

I used to use [`conventional-github-releaser`](https://github.com/conventional-changelog/releaser-tools/tree/master/packages/conventional-github-releaser) for almost all my projects. Until I found that it [does NOT support using exclamation marks for breaking changes](https://github.com/conventional-changelog/conventional-changelog/issues/648) - hiding those important breaking changes in the changelog without the awareness from maintainers.

## License

[MIT](./LICENSE) License © 2022 [Anthony Fu](https://github.com/antfu)

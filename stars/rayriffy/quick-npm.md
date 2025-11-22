---
repo: rayriffy/quick-npm
url: 'https://github.com/rayriffy/quick-npm'
homepage: null
starredAt: '2025-11-22T19:58:23Z'
createdAt: '2023-06-30T11:32:27Z'
updatedAt: '2025-11-22T19:58:24Z'
language: TypeScript
license: MIT
branch: main
stars: 3
isPublic: true
isTemplate: true
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-11-22T22:30:53.877Z'
description: Quick start template to rapidly develop NPM packages with speed
tags: []
---

# quick-npm

Quick start template to rapidly develop NPM packages with speed, and automations.

## Install

```bash
bun add @rayriffy/quick-npm
```

## Setting up

1. Allow GitHub Actions to create pull request
2. Generate NPM authotization token into `NPM_TOKEN` secret

## Publishing

This repository has been configured to automatically publish NPM packages by [Changesets](https://github.com/changesets/changesets). Run `bun changeset` command to publishing your changes before commit.

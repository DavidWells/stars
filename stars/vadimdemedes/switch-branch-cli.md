---
repo: vadimdemedes/switch-branch-cli
url: 'https://github.com/vadimdemedes/switch-branch-cli'
homepage: null
starredAt: '2022-06-20T22:50:09Z'
createdAt: '2022-05-21T16:22:06Z'
updatedAt: '2024-09-29T17:34:10Z'
language: JavaScript
license: NA
branch: main
stars: 66
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:40.374Z'
description: Switch git branches by their pull request title
tags: []
---

# switch-branch-cli [![Build Status](https://github.com/vadimdemedes/switch-branch-cli/workflows/test/badge.svg)](https://github.com/vadimdemedes/switch-branch-cli/actions)

> Switch Git branches by their pull request title

<img src="demo.gif" alt="" width="600">

## Install

```console
npm install --global switch-branch-cli
```

## Usage

```
$ switch-branch --help

  Switch Git branches by their pull request title

  Usage
    $ switch-branch

```

## FAQ

### Why does it ask for my GitHub personal access token?

This CLI needs it to fetch your pull requests for the current Git repository. Your personal access token is stored locally and you will be asked for it only once (unless you revoke it or token expires).

---
repo: Kikobeats/git-authors-cli
url: 'https://github.com/Kikobeats/git-authors-cli'
homepage: ''
starredAt: '2021-12-18T06:54:10Z'
createdAt: '2018-06-20T16:45:57Z'
updatedAt: '2024-11-18T02:00:17Z'
language: JavaScript
license: MIT
branch: master
stars: 112
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:27.192Z'
description: It detects project contributors; add contributors into `package.json`
tags: []
---

# git-authors-cli

![Last version](https://img.shields.io/github/tag/Kikobeats/git-authors-cli.svg?style=flat-square)
[![NPM Status](https://img.shields.io/npm/dm/git-authors-cli.svg?style=flat-square)](https://www.npmjs.org/package/git-authors-cli)

![](demo.png)

> Detects project contributors and add it into `package.json`

Add credits for people that help you ship code is important, but it is a task easy to forget. This tool makes it easy to integrate as part of your release process, so your contributors are always up to date ✨.

## Install

```bash
$ npm install git-authors-cli --global
```

## CLI

```
$ git-authors-cli --help

  Print all contributors and add it into package.json

  Usage
    $ git-authors-cli [options]

  Options
    --cwd    Specify the path for running the command (defaults to process.cwd())
    --save   Write contributors into package.json if it exists (defaults to true)
    --print  Show information from the terminal (defaults to true)
    --ignore-pattern  Skip authors if their name or email match pattern (allow multiple)

  Examples
    $ git-authors-cli # Get contributors for the current path project.
    $ git-authors-cli ~/Projects/metascraper # Get contributors for a specific path project.
    $ git-authors-cli --ignore-pattern noreply.github.com # Ignore github public surrogate emails.
```

## License

**git-authors-cli** © [Kiko Beats](https://kikobeats.com), released under the [MIT](https://github.com/Kikobeats/git-authors-cli/blob/master/LICENSE.md) License.<br>
Authored and maintained by Kiko Beats with help from [contributors](https://github.com/Kikobeats/git-authors-cli/contributors).

> [kikobeats.com](https://kikobeats.com) · GitHub [Kiko Beats](https://github.com/Kikobeats) · X [@Kikobeats](https://x.com/Kikobeats)

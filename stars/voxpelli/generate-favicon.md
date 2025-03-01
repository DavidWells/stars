---
repo: voxpelli/generate-favicon
url: 'https://github.com/voxpelli/generate-favicon'
homepage: null
starredAt: '2025-02-26T22:11:27Z'
createdAt: '2025-01-13T09:59:07Z'
updatedAt: '2025-02-26T22:11:28Z'
language: JavaScript
license: MIT
branch: main
stars: 8
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-03-01T22:29:47.734Z'
description: Helper to generate favicons
tags: []
---

# @voxpelli/generate-favicon

CLI for generating favicons from SVG source

[![npm version](https://img.shields.io/npm/v/@voxpelli/generate-favicon.svg?style=flat)](https://www.npmjs.com/package/@voxpelli/generate-favicon)
[![npm downloads](https://img.shields.io/npm/dm/@voxpelli/generate-favicon.svg?style=flat)](https://www.npmjs.com/package/@voxpelli/generate-favicon)
[![neostandard javascript style](https://img.shields.io/badge/code_style-neostandard-7fffff?style=flat&labelColor=ff80ff)](https://github.com/neostandard/neostandard)
[![Module type: ESM](https://img.shields.io/badge/module%20type-esm-brightgreen)](https://github.com/voxpelli/badges-cjs-esm)
[![Types in JS](https://img.shields.io/badge/types_in_js-yes-brightgreen)](https://github.com/voxpelli/types-in-js)
[![Follow @voxpelli@mastodon.social](https://img.shields.io/mastodon/follow/109247025527949675?domain=https%3A%2F%2Fmastodon.social&style=social)](https://mastodon.social/@voxpelli)

## Install

### Globally

```sh
npm install -g @voxpelli/generate-favicon
```

### Locally

```sh
npm install -D @voxpelli/generate-favicon
```

## Options

```
  Usage
    $ generate-favicon example.svg

  Output options
    --background [#0000]  -b  A background color to use when extending (parsed using "color-string")
    --ico                 -i  Whether to output a .ico file (in a standard size)
    --name                -n  Custom name to use for output
    --no-default              Skips default favicon output
    --size                -s  The size to output PNG file for with optional values using a ":" as a separator: size:name:padding:suffix

  Options
    --dry-run                 Runs without saving anything
    --help                    Prints this help and exits.
    --silent                  Use to silent any text output
    --version                 Prints current version and exits.

  Examples
    $ generate-favicon --name something --background #000 --no-default --size 120 --size 240 --ico example.svg
    $ generate-favicon --background #000 example.svg example-2.svg
```

## See also

- This tool is inspired and based on the excellent [How to Favicon in 2025: Three files that fit most needs](https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs)

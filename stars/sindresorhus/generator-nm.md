---
repo: sindresorhus/generator-nm
url: 'https://github.com/sindresorhus/generator-nm'
homepage: null
starredAt: '2016-06-17T21:53:43Z'
createdAt: '2015-03-14T05:58:33Z'
updatedAt: '2025-01-31T11:47:39Z'
language: JavaScript
license: MIT
branch: main
stars: 741
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:22.906Z'
description: Scaffold out a node module
tags: []
---

> [!IMPORTANT]
> Deprecated. Just use [this boilerplate](https://github.com/sindresorhus/node-module-boilerplate) instead.

# generator-nm

> Scaffold out a [node module](https://github.com/sindresorhus/node-module-boilerplate)

Optionally with a [CLI](http://en.wikipedia.org/wiki/Command-line_interface).

This is what I use for [my own modules](https://www.npmjs.com/~sindresorhus).

![](screenshot.png)

## Install

```sh
npm install --global yo generator-nm
```

## Usage

With [yo](https://github.com/yeoman/yo):

```sh
yo nm
```

There are multiple command-line options available:

```
$ yo nm --help

  Usage:
    yo nm [options]

  Options:
    --help          # Print the generator's options and usage
    --skip-cache    # Do not remember prompt answers                      Default: false
    --skip-install  # Do not automatically install dependencies           Default: false
    --org           # Publish to a GitHub organization account
    --cli           # Add a CLI
    --coverage      # Add code coverage with nyc
    --codecov       # Upload coverage to codecov.io (implies --coverage)
```

The `--org` option takes a string value (i.e. `--org=avajs`). All others are boolean flags and can be negated with the `no` prefix (i.e. `--no-codecov`). You will be prompted for any options not passed on the command-line.

## Tip

Use [chalk](https://github.com/sindresorhus/chalk) if you want colors in your CLI.

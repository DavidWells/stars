---
repo: zeke/npe
url: 'https://github.com/zeke/npe'
homepage: ''
starredAt: '2018-08-23T19:02:10Z'
createdAt: '2014-06-08T18:45:46Z'
updatedAt: '2024-10-27T14:00:42Z'
language: JavaScript
license: NA
branch: main
stars: 93
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:15.578Z'
description: >-
  Node Package Editor: a CLI for one-off inspection and editing of properties in
  package.json files.
tags: []
---

# npe [![Build Status](https://travis-ci.org/zeke/npe.png?branch=master)](https://travis-ci.org/zeke/npe)

Node Package Editor: a CLI for one-off inspection and editing of properties in package.json files.

See also [dot-json](https://github.com/maikelvl/dot-json), a CLI for editing
any JSON file.

## Installation

```sh
npm install npe --global
```

## Usage

```sh
cd some/node/project

# Get stuff from package.json
npe name
npe scripts
npe scripts.test
npe repository.url
open $(npe repository.url)

# Set stuff in package.json
npe name foo
npe scripts.start "node index.js"

# Keywords string will be turned into an array
# If commas are present, they'll be the delimiter. Otherwise spaces.
npe keywords "foo, bar, cheese whiz"
npe keywords "foo bar baz"

# The current working directory's package.json is used by default,
# but you can point to another package file with a flag:
npe name --package=some/other/package.json
npe name other --package=some/other/package.json
```

## License

MIT

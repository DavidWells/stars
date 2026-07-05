---
repo: benrbray/remark-cite
url: 'https://github.com/benrbray/remark-cite'
homepage: ''
starredAt: '2022-11-13T06:02:58Z'
createdAt: '2021-05-06T14:09:40Z'
updatedAt: '2024-12-03T19:58:36Z'
language: TypeScript
license: MIT
branch: master
stars: 22
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:09.895Z'
description: >-
  Adds support for pandoc-style citations to the Markdown syntax for the remark
  and micromark parsers.
tags: []
---

# `remark-cite`

Following [convention](https://github.com/micromark/micromark/discussions/56), this repository contains **three separate `npm` packages** related to support for [`pandoc`-style](https://pandoc.org/MANUAL.html#extension-citations) citation syntax for the `remark` Markdown parser.

* [`micromark-extension-cite`](https://www.npmjs.com/package/@benrbray/micromark-extension-cite) defines a new [syntax extension](https://github.com/micromark/micromark#syntaxextension) for `micromark`, which is responsible for converting markdown syntax to a token stream
* [`mdast-util-cite`](https://www.npmjs.com/package/@benrbray/mdast-util-cite) describes how to convert tokens output by `micromark-extension-cite` into either an HTML string or `mdast` syntax tree.
* [`remark-cite`](https://www.npmjs.com/package/@benrbray/remark-cite) encapsulates the above functionality into a `remark` plugin.

For more information, see the individual folders for each package.

## Contributing

Pull requests for bugfixes or new features / options are welcome.  Be aware that changes to the syntax extension `micromark-extension-cite` may also have an impact on the other two packages, and you will need to test all three.

## Development

Build dependencies, in order:

```
lerna run build
```

Publishing

```
lerna publish --no-private
```

## Publishing Guide

> (this section is for myself, so I don't forget how to publish the packages :) )

It seems that `npm version` does not work properly from subdirectories, so we use `lerna` instead.  However, `lerna publish` does not properly erase `workspace` protocol markers when publishing from `pnpm` monorepos, so we have to publish the packages in two steps:

1. First, increment all package versions by running `lerna version` from the project root.
2. Next, use `lerna run publish-pnpm`, which calls the `publish-pnpm" script for all packages.

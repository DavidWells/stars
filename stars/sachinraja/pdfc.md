---
repo: sachinraja/pdfc
url: 'https://github.com/sachinraja/pdfc'
homepage: ''
starredAt: '2022-01-06T02:12:07Z'
createdAt: '2021-10-24T22:28:06Z'
updatedAt: '2024-07-05T19:11:42Z'
language: TypeScript
license: MIT
branch: main
stars: 7
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:23.055Z'
description: PDF compiler for your source code
tags:
  - compiler
  - pdf
  - shiki
  - syntax-highlighting
---

# pdfc

PDF compiler for your source code

Uses [`Shiki`](https://github.com/shikijs/shiki) for perfect syntax highlighting and [`shiki-renderer-pdf`](https://github.com/sachinraja/shiki-renderer-pdf) to create the PDFs.

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Installation

```sh
npm install pdfc
```

## Usage

Most uses are through the CLI, but there is a programatic API.

### CLI

To compile all files in a directory to PDFs you can use this:

```sh
pdfc src
```

`src` is the `rootDir` here, so all paths will be relative to that. You cannot include files outside of the `rootDir`.

Output is placed in the `pdfs` directory by default. To change the output directory you can use the `-d` or `--out-dir` flag:

```sh
pdfc src -d pdf-build
```

This will compile all files in `src` by default. If you want to restrict to a subset of files you can use the `--include` flag:

```sh
pdfc src --include "src/**/*.js"
```

This will compile only the js files in `src`. The same can be done with the `--exclude` flag:

```sh
pdfc src --exclude "node_modules" --exclude "src/**/*.test.js"
```

This will exclude all test files from compilation. Note that `node_modules` should also be excluded here because it is only excluded by default if `--exclude` is not passed. If `include` is specified, `exclude` will apply to the included files.

You can also specify a theme to use with the `-t` or `--theme` flag:

```sh
pdfc src -t github-light
```

If none if specified, it will default to `light-plus`. See [shiki docs](https://github.com/shikijs/shiki/blob/main/docs/themes.md#all-themes) for a list of themes.

Run `pdfc --help` for more on what you can do.

### API

Please note that this package is pure ESM, see [this](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c) for more details.

Compile PDFs, this will also write files to `pdfs` by default:

```js
import { compilePdfs } from 'pdfc'
;(async () => {
  await compilePdfs({
    rootDir: 'src',
    include: ['src/**/*.js'],
    theme: 'light-plus',
  })
})()
```

Compile string to a `PDFDocument` instance:

```js
import fs from 'node:fs/promises'
import { stringToPdf } from 'pdfc'
;(async () => {
  const code = 'console.log("Hello World")'

  const pdfDocument = await stringToPdf(code, {
    lang: 'js',
    theme: 'light-plus',
  })

  const pdfBytes = await pdfDocument.save()
  await fs.writeFile('hello-world.pdf', pdfBytes, 'binary')
})()
```

Read more about what you can do with `pdfDocument` [here](https://pdf-lib.js.org/).

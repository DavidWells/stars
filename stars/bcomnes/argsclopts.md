---
repo: bcomnes/argsclopts
url: 'https://github.com/bcomnes/argsclopts'
homepage: 'https://www.npmjs.com/package/argsclopts'
starredAt: '2024-05-10T21:37:36Z'
createdAt: '2023-12-26T22:05:21Z'
updatedAt: '2024-11-28T22:41:02Z'
language: JavaScript
license: MIT
branch: master
stars: 6
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:30.526Z'
description: cliclopts but for Node.js parseArgs
tags:
  - cli
  - helptext
  - nodejs
  - parseargs
---

# argsclopts
[![latest version](https://img.shields.io/npm/v/argsclopts.svg)](https://www.npmjs.com/package/argsclopts)
[![Actions Status](https://github.com/bcomnes/argsclopts/workflows/tests/badge.svg)](https://github.com/bcomnes/argsclopts/actions)
[![Coverage Status](https://coveralls.io/repos/github/bcomnes/argsclopts/badge.svg?branch=master)](https://coveralls.io/github/bcomnes/argsclopts?branch=master)
[![downloads](https://img.shields.io/npm/dm/argsclopts.svg)](https://npmtrends.com/argsclopts)
[![Types in JS](https://img.shields.io/badge/types_in_js-yes-brightgreen)](https://github.com/voxpelli/types-in-js)
[![Socket Badge](https://socket.dev/api/badge/npm/package/argsclopts)](https://socket.dev/npm/package/argsclopts)

[cliclopts](https://github.com/finnp/cliclopts) but for [Node.js parseArgs](https://nodejs.org/api/util.html#utilparseargsconfig). A library that formats standard usage strings using the `node:util` `parseArgs` `options` object shape with an additional `help` field added to it.

```
npm install argsclopts
```

## Usage

``` js
import { printHelpText } from 'argsclopts'
import { join } from 'node:path'
import { parseArgs } from 'node:util'

/**
 * @typedef {import('argsclopts').ArgscloptsParseArgsOptionsConfig} ArgscloptsParseArgsOptionsConfig
 */

const pkgPath = join(import.meta.dirname, 'package.json')

/** @type {ArgscloptsParseArgsOptionsConfig} */
const options = {
  foo: {
    type: 'boolean',
    short: 'f',
    help: 'A foo flag thats a boolean'
  },
  bar: {
    type: 'string',
    help: 'A bar flag thats a string'
  }
}

await printHelpText({
  options,
  pkgPath
})
/*

Usage: argsclopts [options]

    Example: argsclopts

    --foo, -f             A foo flag thats a boolean
    --bar                 A bar flag thats a string

argsclopts (v1.0.0)

 */

const args = ['-f', '--bar', 'b']
const { values } = parseArgs({ args, options })
console.log(values)
// { foo: true, bar: 'b' }
```

## API

### `import { formatHelpText, printHelpText, usage, header, footer } from 'argsclopts'`

You can import `formatHelpText`, `printHelpText`, `usage`, `header`, `footer` from `argsclopts`.
s
### `helpText = formatHelpText({ options, [pkgPath], [name], [version], [footerFn], [headerFn], [exampleFn]})`

Generate the `helptText` string. Requires passing in an `options` object that you provide to [`parseArgs`](https://nodejs.org/api/util.html#utilparseargsconfig), with one additional field per flag: `help`. You should also provide `pkgPath` (a resolved path the `package.json`) so that a bin name and version can be resolved. Otherwise, pass in a `name` and `version` to override any resolved data from `pkgPath`. If both  `name` and `version` are provided, a `pkgPath` is required. The `headerFn`, and `exampleFn` can be used to override the header text and the `footerFn` can be used to override the footer text.

An example `options` object might look like this:

```js
const options = {
  foo: {
    type: 'boolean',
    short: 'f',
    help: 'A foo flag thats a boolean'
  },
  bar: {
    type: 'string',
    help: 'A bar flag thats a string'
  }
}
```


### `void printHelpText({ options, [pkgPath], [name], [version], [footerFn], [headerFn], [exampleFn]})`

Exactly the same as `formatHelpText` except it uses `console.log` to print the text for you. Returns nothing.

### `usageText = usage(options)`

Generate just the usage string with a given `options` object.

### `headerText = header({ [pkgPath], [name], [headerFn], [exampleFn] })`

Generate the headerText only. Pass in either a `pkgPath` string path to the `package.json` of the bin you are printing for, or a `name`. The `headerFn` and `exampleFn` allow you to override the header text that is generated. Each function receilves an object with a `name` key.

### `footerText = footer({ [pkgPath], [name], [version], [footerFn] })`

Generate the footerText only. Pass in either a `pkgPath` string path to the `package.json` of the bin you are printing for, or a `name` and/or `version`. The `footerFn` lets you override the footer text template and receives an object with a `name` and `version` key.

## License

MIT

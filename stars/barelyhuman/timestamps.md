---
repo: barelyhuman/timestamps
url: 'https://github.com/barelyhuman/timestamps'
homepage: ''
starredAt: '2023-12-29T02:07:53Z'
createdAt: '2023-04-30T22:20:15Z'
updatedAt: '2023-12-29T02:07:53Z'
language: JavaScript
license: MIT
branch: main
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:41.137Z'
description: 'A tiny timestamp parsing and formatting library (Node, Deno, ESM) '
tags:
  - deno
  - esm
  - library
  - node
  - parse
  - timestamps
---

# @barelyhuman/timestamps

> A tiny timestamp parsing and formatting library

This is just an internal utility used by TillWhen for parsing and formatting
timestamps.

## Installation

```sh
npm i @barelyhuman/timestamps
# or
yarn add @barelyhuman/timestamps
```

## Usage

```js
import {
  fromSeconds,
  fromMilliseconds,
  formatSeconds,
  formatMilliseconds,
  parse,
} from '@barelyhuman/timestamps'

fromSeconds(3600) // {hours:1, minutes:0, seconds:0}
fromMilliseconds(3600 * 1000) // {hours:1, minutes:0, seconds:0}
formatSeconds(3600, '{hh}:{mm}:{ss}') // 01:00:00
formatMilliseconds(3600 * 1000, '{hh}:{mm}:{ss}') // 01:00:00
parse('01:00:00', '{hh}:{mm}:{ss}') // {hours:1, minutes:0, seconds:0}
```

## License

[LICENSE](/LICENSE)

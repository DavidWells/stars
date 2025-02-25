---
repo: withspectrum/markdown-linkify
url: 'https://github.com/withspectrum/markdown-linkify'
homepage: null
starredAt: '2022-02-23T18:26:03Z'
createdAt: '2017-07-08T19:05:38Z'
updatedAt: '2023-01-27T20:23:20Z'
language: JavaScript
license: MIT
branch: master
stars: 23
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:12.720Z'
description: >-
  Turn plain URLs in text into Markdown links. Works in the browser and on the
  server.
tags:
  - linkify
  - linkify-text
  - markdown
---

# `markdown-linkify`

Turn plain URLs in text into Markdown links. Works in the browser and on the server.

## Usage

1. Input:  `"Made by folks from https://spectrum.chat"`
2. Output: `"Made by folks from [https://spectrum.chat](https://spectrum.chat)"`

```javascript
const linkify = require('markdown-linkify');

const text = 'Made by folks from https://spectrum.chat'
const linked = linkify(text);

console.log(linked)
// -> 'Made by folks from [https://spectrum.chat](http://spectrum.chat)'
```

We use [`linkify-it`](http://npm.im/linkify-it) to detect URLs which supports major TLDs without protocol (`google.com`, `facebook.net` etc) and everything that uses a protocol. (e.g. `https://bla.bullshit`, `mailto:hi@spectrum.chat`) We err on the side of being certain and not-linkifying rather than over-linkifying.

## Installation

```sh
npm install --save markdown-linkify
# or if you have yarn installed
yarn add markdown-linkify
```

## License

Licensed under the MIT License, Copyright ©️ 2017 Maximilian Stoiber. See [LICENSE.md](LICENSE.md) for more information.

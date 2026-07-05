---
repo: daangn/cjk-slug
url: 'https://github.com/daangn/cjk-slug'
homepage: ''
starredAt: '2021-07-10T19:57:08Z'
createdAt: '2021-07-05T02:24:33Z'
updatedAt: '2024-01-04T16:59:11Z'
language: TypeScript
license: MIT
branch: main
stars: 57
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:51.124Z'
description: URL-friendly string converter that supports CJK characters
tags:
  - cjk
  - seo
  - url
---

# cjk-slug

[![Package Version](https://img.shields.io/npm/v/cjk-slug)](https://npm.im/cjk-slug)
[![License](https://img.shields.io/npm/l/cjk-slug)](#License)
[![NPM Bundle Size](https://img.shields.io/bundlephobia/minzip/cjk-slug)](https://bundlephobia.com/package/cjk-slug)

URL-friendly string converter that supports CJK characters

## Usage

```js
import slugify from 'cjk-slug';

slugify('당근마켓 - 대한민국 1등 동네 커뮤니티');
// => 당근마켓-대한민국-1등-동네-커뮤니티
```

## Other languages

This package only cares about CJK characters.

You can use [`@sindresorhus/transliterate`](https://github.com/sindresorhus/transliterate) as needed.

## License

MIT

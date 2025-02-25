---
repo: vaneenige/uon
url: 'https://github.com/vaneenige/uon'
homepage: 'https://www.npmjs.com/package/uon'
starredAt: '2019-02-03T02:02:07Z'
createdAt: '2019-01-22T21:05:42Z'
updatedAt: '2025-02-24T23:56:27Z'
language: TypeScript
license: MIT
branch: master
stars: 84
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:48.648Z'
description: " \U0001F428 A tiny 200b route change observer."
tags:
  - navigation
  - observer
  - route
---

# Update On Navigate (uon)

[![npm version](https://img.shields.io/npm/v/uon.svg)](https://www.npmjs.com/package/uon)
[![gzip size](http://img.badgesize.io/https://unpkg.com/uon/dist/uon.mjs?compression=gzip)](https://unpkg.com/uon)
[![license](https://img.shields.io/npm/l/uon.svg)](https://github.com/vaneenige/uon/blob/master/LICENSE)
[![dependencies](https://img.shields.io/badge/dependencies-none-ff69b4.svg)](https://github.com/vaneenige/uon/blob/master/package.json)
[![TypeScript](https://img.shields.io/static/v1.svg?label=&message=TypeScript&color=294E80)](https://www.typescriptlang.org/)

Update On Navigate (uon) is a tiny library that observes route changes and delivers updates through a callback.

#### Features:

- Small in size, no dependencies
- Observe native navigation
- Observe manual navigation

## Install

```
$ npm install --save uon
```

## Usage

```js
// Import the library
import uon from 'uon';

// Observe route changes
uon((route) => { ... });
```
> The returned route will be the current pathname.

## License

MIT © <a href="https://use-the-platform.com">Colin van Eenige</a>


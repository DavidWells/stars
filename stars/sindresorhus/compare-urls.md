---
repo: sindresorhus/compare-urls
url: 'https://github.com/sindresorhus/compare-urls'
homepage: null
starredAt: '2020-12-05T07:21:49Z'
createdAt: '2015-01-14T06:07:14Z'
updatedAt: '2025-01-07T20:11:03Z'
language: JavaScript
license: MIT
branch: main
stars: 66
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:18.941Z'
description: Compare URLs by first normalizing them
tags: []
---

# compare-urls

> Compare URLs by first [normalizing](https://github.com/sindresorhus/normalize-url) them

## Install

```sh
npm install compare-urls
```

## Usage

```js
import compareUrls from 'compare-urls';

compareUrls('HTTPS://sindresorhus.com/?b=b&a=a', 'sindresorhus.com/?a=a&b=b');
//=> true
```

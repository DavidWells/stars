---
repo: WebReflection/path-crawler
url: 'https://github.com/WebReflection/path-crawler'
homepage: null
starredAt: '2025-02-27T01:57:28Z'
createdAt: '2021-09-14T08:45:05Z'
updatedAt: '2025-02-27T01:57:28Z'
language: JavaScript
license: ISC
branch: main
stars: 8
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-03-01T22:29:46.760Z'
description: An utility to crawl generic objects paths.
tags: []
---

# path-crawler

[![build status](https://github.com/WebReflection/path-crawler/actions/workflows/node.js.yml/badge.svg)](https://github.com/WebReflection/path-crawler/actions) [![Coverage Status](https://coveralls.io/repos/github/WebReflection/path-crawler/badge.svg?branch=main)](https://coveralls.io/github/WebReflection/path-crawler?branch=main)

An utility to crawl generic objects paths.

```js
import {crawl} from 'path-crawler';
// const {crawl} = require('path-crawler');

crawl(
  ['test?.some.number[]'],
  ({id, field, hint, optional}, value) => {
    // id is the unique path index, 0 in this case
    // field is the last field of the path: "number"
    // hint can be empty string, ?, or []
    // optional is true if the field was optional
    // if non undefined value is returned,
    // the original field is overwritten with the new value.
    return value.map(x => x * x);
  },
  {
    test: {
      some: [
        // will become [1, 4, 9]
        {number: [1, 2, 3]},
        // will become [16, 25]
        {number: [4, 5]}
      ]
    }
  }
);
```

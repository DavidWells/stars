---
repo: WebReflection/re
url: 'https://github.com/WebReflection/re'
homepage: null
starredAt: '2024-09-18T15:43:59Z'
createdAt: '2024-09-18T12:32:46Z'
updatedAt: '2024-10-22T01:31:00Z'
language: JavaScript
license: MIT
branch: main
stars: 12
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:20.377Z'
description: A template literal tag that sanitizes interpolations.
tags: []
---

# @webreflection/re

[![Coverage Status](https://coveralls.io/repos/github/WebReflection/re/badge.svg?branch=main)](https://coveralls.io/github/WebReflection/re?branch=main)

A template literal tag that sanitizes interpolations.

```js
import re from '@webreflection/re';

// strings get escaped
const interpolations = '?';

// arrays get joined by `|` after
// escaping each single value
const options = ['reg', 'exp'];

const safe = re`/unescaped (${options}) code with ${interpolations}!/m`;

safe.test('unescaped reg code with ?!');  // true
safe.test('unescaped exp code with ?!');  // true
safe.test('unescaped nope code with ?!'); // false
```

This module simply allows creating *RegExp* instances without worrying about interpolation content because it gets sanitized out of the box via latest [RegExp.escape](https://tc39.es/proposal-regex-escaping/) feature or via [escape-string-regexp](https://www.npmjs.com/package/escape-string-regexp) when the former has not been implemented yet.

The whole source code is [less than 20 LOC](./esm/index.js).

Enjoy 👋

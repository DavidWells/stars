---
repo: mark-when/parser
url: 'https://github.com/mark-when/parser'
homepage: null
starredAt: '2022-08-29T18:30:30Z'
createdAt: '2022-07-06T01:59:02Z'
updatedAt: '2025-01-30T10:35:48Z'
language: TypeScript
license: MIT
branch: main
stars: 43
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:36.499Z'
description: Markwhen parser
tags: []
---

# Markwhen parser

Parse markwhen documents. Outputs a list of events given plain text.

See [markwhen.com](https://markwhen.com), [the documentation](https://docs.markwhen.com), and the [changelog](./CHANGELOG.md).

```js
import { parse } from "@markwhen/parser";

const markwhen = parse(`
title: this is my title
timezone: America/New_York

#neat:
  color: blue
  timezone: -3

2022: event

group My Group #neat
2024: another event

`);

console.log(markwhen);
```

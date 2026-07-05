---
repo: natemoo-re/ultramatter
url: 'https://github.com/natemoo-re/ultramatter'
homepage: ''
starredAt: '2023-02-05T22:26:11Z'
createdAt: '2023-01-29T00:30:40Z'
updatedAt: '2024-01-08T03:52:30Z'
language: TypeScript
license: MIT
branch: main
stars: 123
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:56.875Z'
description: <1kB frontmatter parser that supports a reasonable subset of YAML
tags: []
---

# `ultramatter`

A <1kB library for parsing frontmatter. `ultramatter` has zero dependencies and is compatible with any JavaScript runtime.

### Features

- It's very small.
- It's very fast.
- It supports a small, relaxed subset of YAML
  - Maps (`key: value`)
  - Sequences (`- list`)
  - Inline Arrays (`[0, 1, 2]`)
  - Literal Blocks (`|`)
  - Comments (`# comment`)
  - Quoted values (`'single'`, `"double"`)
  - Boolean values (`true` and `false` ONLY)
  - Tabs are valid

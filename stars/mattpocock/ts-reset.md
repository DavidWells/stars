---
repo: mattpocock/ts-reset
url: 'https://github.com/mattpocock/ts-reset'
homepage: 'https://www.totaltypescript.com/ts-reset'
starredAt: '2024-12-21T23:41:08Z'
createdAt: '2023-02-19T14:01:18Z'
updatedAt: '2025-02-24T09:26:22Z'
language: TypeScript
license: MIT
branch: main
stars: 8011
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:14.117Z'
description: 'A ''CSS reset'' for TypeScript, improving types for common JavaScript API''s'
tags:
  - reset
  - typescript
---

![TS Reset - Improved TypeScript's Built-in Typings](https://raw.githubusercontent.com/mattpocock/ts-reset/main/og-image.png)

**Without `ts-reset`**:

- 🚨 `.json` (in `fetch`) and `JSON.parse` both return `any`
- 🤦 `.filter(Boolean)` doesn't behave how you expect
- 😡 `array.includes` often breaks on readonly arrays

`ts-reset` smooths over these hard edges, just like a CSS reset does in the browser.

**With `ts-reset`**:

- 👍 `.json` (in `fetch`) and `JSON.parse` both return `unknown`
- ✅ `.filter(Boolean)` behaves EXACTLY how you expect
- 🥹 `array.includes` is widened to be more ergonomic
- 🚀 And several more changes!

## Official Docs

Check out our docs page on [Total TypeScript](https://totaltypescript.com/ts-reset)

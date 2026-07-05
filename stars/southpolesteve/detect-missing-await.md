---
repo: southpolesteve/detect-missing-await
url: 'https://github.com/southpolesteve/detect-missing-await'
homepage: null
starredAt: '2023-01-24T19:56:27Z'
createdAt: '2019-12-06T21:29:40Z'
updatedAt: '2024-05-23T19:37:17Z'
language: JavaScript
license: MIT
branch: master
stars: 8
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:57.503Z'
description: Detects potential missing `await` calls in JavaScript/Typescript at runtime
tags: []
---

# detect-missing-await

This module helps you find missing `await` statements at runtime.

It is a runtime analog to the [eslint "no-floating-promises" rule](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-floating-promises.md)

> 🚨 Do not use this module in production 🚨

It should be used for debugging only. It mutates the `Promise` global and does magic with proxies. This is dangerous

## Installation

`npm install detect-missing-await`

## Example usage

```js
require('detect-missing-await')

async function main() {
  const promise1 = await Promise.resolve()
  const promise2 = Promise.resolve() // Will log as missing an `await` statement
}

main()
```

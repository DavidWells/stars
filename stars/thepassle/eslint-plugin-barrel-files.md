---
repo: thepassle/eslint-plugin-barrel-files
url: 'https://github.com/thepassle/eslint-plugin-barrel-files'
homepage: null
starredAt: '2024-01-28T19:14:17Z'
createdAt: '2024-01-28T15:21:51Z'
updatedAt: '2025-02-22T18:41:36Z'
language: JavaScript
license: MIT
branch: main
stars: 135
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:37.758Z'
description: null
tags: []
---

# eslint-plugin-barrel-files

Barrel files are files that just re-export a bunch of things from other files. If you're using a bundler, bundlers usually apply treeshaking and dead code elimination algorithms to remove any unused code.

In many environments however, like test runners, browsers, CDN environments or server side JavaScript runtimes, treeshaking does not get applied. This means that lots of modules get loaded unnecessarily, which can cause significant performance slowdowns.

For more information, I recommend reading [Speeding up the JavaScript ecosystem - The barrel file debacle](https://marvinh.dev/blog/speeding-up-javascript-ecosystem-part-7/)

## Supported Rules

- [barrel-files/avoid-barrel-files](./docs/rules/avoid-barrel-files.md)
- [barrel-files/avoid-importing-barrel-files](./docs/rules/avoid-importing-barrel-files.md)
- [barrel-files/avoid-namespace-import](./docs/rules/avoid-namespace-import.md)
- [barrel-files/avoid-re-export-all](./docs/rules/avoid-re-export-all.md)

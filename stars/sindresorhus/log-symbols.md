---
repo: sindresorhus/log-symbols
url: 'https://github.com/sindresorhus/log-symbols'
homepage: null
starredAt: '2017-05-17T16:21:35Z'
createdAt: '2014-07-10T00:51:52Z'
updatedAt: '2025-02-20T01:28:50Z'
language: JavaScript
license: MIT
branch: main
stars: 751
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:45.171Z'
description: Colored symbols for various log levels
tags: []
---

# log-symbols

<img src="screenshot.png" width="226" height="192" align="right">

> Colored symbols for various log levels

Includes fallbacks for Windows CMD which only supports a [limited character set](https://en.wikipedia.org/wiki/Code_page_437).

## Install

```sh
npm install log-symbols
```

## Usage

```js
import logSymbols from 'log-symbols';

console.log(logSymbols.success, 'Finished successfully!');
// Terminals with Unicode support:     ✔ Finished successfully!
// Terminals without Unicode support:  √ Finished successfully!
```

## API

### logSymbols

#### info
#### success
#### warning
#### error

## Related

- [figures](https://github.com/sindresorhus/figures) - Unicode symbols with Windows CMD fallbacks
- [py-log-symbols](https://github.com/ManrajGrover/py-log-symbols) - Python port
- [log-symbols](https://github.com/palash25/log-symbols) - Ruby port
- [guumaster/logsymbols](https://github.com/guumaster/logsymbols) - Golang port

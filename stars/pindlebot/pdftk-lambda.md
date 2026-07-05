---
repo: pindlebot/pdftk-lambda
url: 'https://github.com/pindlebot/pdftk-lambda'
homepage: null
starredAt: '2018-12-15T07:25:01Z'
createdAt: '2018-07-24T08:04:06Z'
updatedAt: '2021-12-11T21:50:49Z'
language: JavaScript
license: NA
branch: master
stars: 13
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:55.730Z'
description: null
tags: []
---

## pdftk-lambda

### Installation and Usage

```bash
npm i pdftk-lambda
```

Next, require the package at the top of your lambda function.

```js
// modifies PATH, LD_LIBRARY_PATH, and PKG_CONFIG_PATH to point to the pdftk binary and libgcj.so.10
require('pdftk-lambda')

```

## Why This Package?

Installing this package makes it possible to use pdftk in AWS lambda. It includes two binaries, pdftk and the dependency libgcj.so.10.

`pdftk-lambda` was compiled using the latest public Amazon Linux AMI version (amzn-ami-hvm-2017.03.1.20170812-x86_64-gp2) as of this writing (07/24/2018).


---
repo: pindlebot/safe-s3-key
url: 'https://github.com/pindlebot/safe-s3-key'
homepage: null
starredAt: '2018-12-15T08:28:23Z'
createdAt: '2018-10-05T10:24:11Z'
updatedAt: '2019-04-16T02:10:44Z'
language: JavaScript
license: NA
branch: master
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:55.096Z'
description: null
tags: []
---

## safe-s3-key

### Pupose

Given a string, return a string that can be safely used as an S3 key.

AWS S3 prohibits the use of certain special characters. This package strips unsafe characters.

### Installation

```bash
npm i safe-s3-key
```

### Usage

```js
require('safe-s3-key')('foo&$@=;:+ ,?bar')
// => foobar
```

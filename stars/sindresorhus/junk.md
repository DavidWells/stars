---
repo: sindresorhus/junk
url: 'https://github.com/sindresorhus/junk'
homepage: ''
starredAt: '2020-01-06T20:47:03Z'
createdAt: '2013-05-04T19:44:19Z'
updatedAt: '2025-01-07T20:10:47Z'
language: JavaScript
license: MIT
branch: main
stars: 241
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:09.307Z'
description: Filter out OS junk files like .DS_Store and Thumbs.db
tags: []
---

# junk

> Filter out [system junk files](test.js) like `.DS_Store` and `Thumbs.db`

## Install

```
$ npm install junk
```

## Usage

```js
import fs from 'node:fs/promises';
import {isNotJunk} from 'junk';

const files = await fs.readdir('some/path');

console.log(files);
//=> ['.DS_Store', 'test.jpg']

console.log(files.filter(isNotJunk));
//=> ['test.jpg']
```

## API

### isJunk(filename)

Returns `true` if `filename` matches a junk file.

### isNotJunk(filename)

Returns `true` if `filename` does not match a junk file.

### junkRegex

Regex used for matching junk files.

---
repo: sindresorhus/slash
url: 'https://github.com/sindresorhus/slash'
homepage: ''
starredAt: '2022-01-30T06:24:28Z'
createdAt: '2013-07-18T23:26:17Z'
updatedAt: '2025-01-27T20:25:22Z'
language: JavaScript
license: MIT
branch: main
stars: 331
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:17.214Z'
description: Convert Windows backslash paths to slash paths
tags: []
---

# slash

> Convert Windows backslash paths to slash paths: `foo\\bar` ➔ `foo/bar`

[Forward-slash paths can be used in Windows](http://superuser.com/a/176395/6877) as long as they're not extended-length paths.

This was created since the `path` methods in Node.js outputs `\\` paths on Windows.

## Install

```sh
npm install slash
```

## Usage

```js
import path from 'node:path';
import slash from 'slash';

const string = path.join('foo', 'bar');
// Unix    => foo/bar
// Windows => foo\\bar

slash(string);
// Unix    => foo/bar
// Windows => foo/bar
```

## API

### slash(path)

Type: `string`

Accepts a Windows backslash path and returns a path with forward slashes.

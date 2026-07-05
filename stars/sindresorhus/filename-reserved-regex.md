---
repo: sindresorhus/filename-reserved-regex
url: 'https://github.com/sindresorhus/filename-reserved-regex'
homepage: null
starredAt: '2020-08-15T05:43:09Z'
createdAt: '2015-01-14T05:05:42Z'
updatedAt: '2025-01-07T20:11:03Z'
language: JavaScript
license: MIT
branch: main
stars: 50
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:39.777Z'
description: Regular expression for matching reserved filename characters
tags: []
---

# filename-reserved-regex

> Regular expression for matching reserved filename characters

On Unix-like systems `/` is reserved and [`<>:"/\|?*`](https://docs.microsoft.com/en-us/windows/win32/fileio/naming-a-file#naming-conventions) as well as non-printable characters `\u0000-\u001F` on Windows.

## Install

```
$ npm install filename-reserved-regex
```

## Usage

```js
import filenameReservedRegex, {windowsReservedNameRegex} from 'filename-reserved-regex';

filenameReservedRegex().test('foo/bar');
//=> true

filenameReservedRegex().test('foo-bar');
//=> false

'foo/bar'.replace(filenameReservedRegex(), '!');
//=> 'foo!bar'

windowsReservedNameRegex().test('aux');
//=> true
```

## API

### filenameReservedRegex()

Returns a regex that matches all invalid characters.

### windowsReservedNameRegex()

Returns an exact-match case-insensitive regex that matches invalid Windows
filenames. These include `CON`, `PRN`, `AUX`, `NUL`, `COM1`, `COM2`, `COM3`, `COM4`, `COM5`,
`COM6`, `COM7`, `COM8`, `COM9`, `LPT1`, `LPT2`, `LPT3`, `LPT4`, `LPT5`, `LPT6`, `LPT7`, `LPT8`
and `LPT9`.

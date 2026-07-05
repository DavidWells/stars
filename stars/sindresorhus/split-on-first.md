---
repo: sindresorhus/split-on-first
url: 'https://github.com/sindresorhus/split-on-first'
homepage: ''
starredAt: '2019-09-15T18:32:54Z'
createdAt: '2019-02-07T10:21:41Z'
updatedAt: '2024-06-24T04:54:59Z'
language: JavaScript
license: MIT
branch: main
stars: 75
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:23.753Z'
description: Split a string on the first occurrence of a given separator
tags:
  - npm-package
  - split
  - string
  - string-manipulation
  - string-split
---

# split-on-first

> Split a string on the first occurrence of a given separator

This is similar to [`String#split()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split), but that one splits on all the occurrences, not just the first one.

## Install

```
$ npm install split-on-first
```

## Usage

```js
import splitOnFirst from 'split-on-first';

splitOnFirst('a-b-c', '-');
//=> ['a', 'b-c']

splitOnFirst('key:value:value2', ':');
//=> ['key', 'value:value2']

splitOnFirst('a---b---c', '---');
//=> ['a', 'b---c']

splitOnFirst('a-b-c', '+');
//=> []

splitOnFirst('abc', '');
//=> []
```

## API

### splitOnFirst(string, separator)

#### string

Type: `string`

The string to split.

#### separator

Type: `string`

The separator to split on.

## Related

- [split-at](https://github.com/sindresorhus/split-at) - Split a string at one or more indices

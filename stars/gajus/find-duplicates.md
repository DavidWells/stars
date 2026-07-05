---
repo: gajus/find-duplicates
url: 'https://github.com/gajus/find-duplicates'
homepage: null
starredAt: '2020-05-11T21:33:44Z'
createdAt: '2018-06-29T10:47:41Z'
updatedAt: '2022-07-03T11:26:42Z'
language: JavaScript
license: NOASSERTION
branch: master
stars: 8
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:53.491Z'
description: Finds duplicate entries in a JavaScript array using an iteratee.
tags:
  - javascript
  - utility
---

# find-duplicates

[![Travis build status](http://img.shields.io/travis/gajus/find-duplicates/master.svg?style=flat-square)](https://travis-ci.org/gajus/find-duplicates)
[![Coveralls](https://img.shields.io/coveralls/gajus/find-duplicates.svg?style=flat-square)](https://coveralls.io/github/gajus/find-duplicates)
[![NPM version](http://img.shields.io/npm/v/find-duplicates.svg?style=flat-square)](https://www.npmjs.org/package/find-duplicates)
[![Canonical Code Style](https://img.shields.io/badge/code%20style-canonical-blue.svg?style=flat-square)](https://github.com/gajus/canonical)
[![Twitter Follow](https://img.shields.io/twitter/follow/kuizinas.svg?style=social&label=Follow)](https://twitter.com/kuizinas)

Finds duplicate entries in a JavaScript array using an iteratee.

## API

```js
type DuplicatePointerType<T> = {|
  +index: number,
  +value: T,
|};

const findDuplicates = <T: *>(members: $ReadOnlyArray<T>, iteratee: (T) => string) => $ReadOnlyArray<$ReadOnlyArray<DuplicatePointerType<T>>>;

```

## Usage

`findDuplicates` produces an array of duplicate input array entries as identified using iteratee function.

```js
import findDuplicates from 'find-duplicates';

const haystack = [
  {
    id: 1,
    name: 'a'
  },
  {
    id: 2,
    name: 'b'
  },
  {
    id: 3,
    name: 'a'
  },
  {
    id: 4,
    name: 'b'
  },
  {
    id: 5,
    name: 'c'
  }
];

const duplicates = findDuplicates(haystack, (subject) => {
  return subject.name;
});

duplicates;
[
  [
    {
      index: 0,
      value: {
        id: 1,
        name: 'a'
      }
    },
    {
      index: 2,
      value: {
        id: 3,
        name: 'a'
      }
    }
  ],
  [
    {
      index: 1,
      value: {
        id: 2,
        name: 'b'
      },
    },
    {
      index: 3,
      value: {
        id: 4,
        name: 'b'
      },
    },
  ]
]

```

## Benchmark

Run benchmark before making changes and ensure that performance does not degrade after changes.

```bash
$ npm run benchmark

```

---
repo: sindresorhus/array-shuffle
url: 'https://github.com/sindresorhus/array-shuffle'
homepage: null
starredAt: '2021-12-14T02:36:55Z'
createdAt: '2014-05-23T22:59:12Z'
updatedAt: '2025-02-11T15:47:40Z'
language: JavaScript
license: MIT
branch: main
stars: 105
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:28.484Z'
description: Randomize the order of items in an array
tags: []
---

# array-shuffle

> Randomize the order of items in an array

Uses the [Durstenfeld algorithm](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm) which is based on the [Fisher–Yates algorithm](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle).

## Install

```
$ npm install array-shuffle
```

## Usage

```js
import arrayShuffle from 'array-shuffle';

const shuffled = arrayShuffle([1, 2, 3, 4, 5, 6]);
//=> [3, 5, 4, 1, 2, 6]
```

## API

### arrayShuffle(array)

#### array

Type: `Array`

The array to shuffle.

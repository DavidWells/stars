---
repo: syropian/move-sort
url: 'https://github.com/syropian/move-sort'
homepage: null
starredAt: '2022-10-30T05:08:55Z'
createdAt: '2018-04-06T00:07:06Z'
updatedAt: '2022-10-30T05:08:55Z'
language: TypeScript
license: MIT
branch: main
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:15.193Z'
description: Switch an array item's index and get a new sorted array.
tags: []
---

# move-sort [![Tests](https://github.com/syropian/move-sort/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/syropian/move-sort/actions/workflows/test.yml)

> Switch an array item's index and get a new sorted array.

## Install

```
$ npm install move-sort --save
```

**or** include it in a `<script>` tag, hosted by [unpkg](https://unpkg.com).

```js
<script src="https://unpkg.com/move-sort/dist/move-sort.iife.js" />
```

## Usage

```ts
import moveSort from 'move-sort'

const items = ['a', 'b', 'c', 'd', 'e']
const sortedItems = moveSort(items, 4, 0)

console.log(sortedItems) // returns ["e", "a", "b", "c", "d"]
```

**Note:** `move-sort` always returns a new array, and does not mutate the original array you pass into it.

## API

### moveSort(items, startIndex, endIndex)

#### items

Type: `T extends any[]`

The original array you want to generate a sorted array for.

#### startIndex

Type: `number`

The index of the inital element in the array you want to move.

#### endIndex

Type: `number`

The target index of the inital element in the array you want to move it to.

### Index constraints

The start and end index arguments are clamped to the bounds of the `items` array. Indexes less than `0` will become `0` and indexes greater than `(items.length - 1)` will become `(items.length - 1)`.

## Development

```bash
# To run the tests
$ pnpm test
# or
$ pnpm run test:watch

# To publish the dist files
$ pnpm run build
```

## License

MIT © [Collin Henderson](https://github.com/syropian)

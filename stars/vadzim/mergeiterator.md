---
repo: vadzim/mergeiterator
url: 'https://github.com/vadzim/mergeiterator'
homepage: null
starredAt: '2022-04-04T14:59:52Z'
createdAt: '2017-08-17T11:22:52Z'
updatedAt: '2022-04-04T14:59:52Z'
language: JavaScript
license: MIT
branch: master
stars: 10
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:50.274Z'
description: merges async iterators
tags: []
---

# mergeiterator

Merges async iterators.

[![NPM version](https://img.shields.io/npm/v/mergeiterator.svg?style=flat-square)](https://npmjs.org/package/mergeiterator)
[![Build Status](https://img.shields.io/travis/vadzim/mergeiterator/master.svg?style=flat-square)](https://travis-ci.org/vadzim/mergeiterator)
[![Coverage Status](https://img.shields.io/codecov/c/github/vadzim/mergeiterator/master.svg?style=flat-square)](https://codecov.io/gh/vadzim/mergeiterator/branch/master)

Merges list of async or sync iterables into async one.

It accepts any iterable like arrays, generators, async generators or even promises which resolve to iterables.
Any iterator can be infinite, including the list of iterables itself.

```javascript
import merge from "mergeiterator"

async function DoIt() {
	for await (const v of merge([
		[1, 2, Promise.resolve(3)],
		Promise.resolve([4, 5]),
		(function*() {
			let i = 9
			while (true) {
				yield i++
				yield Promise.resolve(i++)
			}
		})(),
		(async function*() {
			yield 6
			yield await Promise.resolve(7)
			yield Promise.resolve(8)
		})(),
	])) {
		console.log(v)
	}
}

// 1 4 2 9 5 3 10 6 11 7 12 8 13 14 15 16 17 18 19 20 ...
```

This function guarantees, that if some value is yielded by some of iterables, then that value will be eventually yielded. This is basically about infinite iterables.
It also guarantees that the order of values within the same iterable is preserved.

If some iterable yields a promise, its value will be used, not a promise itself.

If some iterable throws an error, that error will be redirected to a caller and other iterables will be closed.

Return values of iterables are discarded.

## API

-   [merge](#merge)
    -   [Parameters](#parameters)

### merge

Merges async or sync iterables into async one.

#### Parameters

-   `sequences` **AnyIterable&lt;AnyIterable&lt;T>>** 

Returns **AsyncGenerator&lt;T, any, any>** 

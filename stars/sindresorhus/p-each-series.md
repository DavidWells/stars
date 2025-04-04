---
repo: sindresorhus/p-each-series
url: 'https://github.com/sindresorhus/p-each-series'
homepage: null
starredAt: '2016-11-01T18:21:34Z'
createdAt: '2016-10-21T04:52:43Z'
updatedAt: '2024-10-13T15:15:36Z'
language: JavaScript
license: MIT
branch: main
stars: 50
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:17.058Z'
description: Iterate over promises serially
tags: []
---

# p-each-series

> Iterate over promises serially

Useful as a side-effect iterator. Prefer [`p-map`](https://github.com/sindresorhus/p-map) if you don't need side-effects, as it's concurrent.

## Install

```
$ npm install p-each-series
```

## Usage

```js
import pEachSeries from 'p-each-series';

const keywords = [
	getTopKeyword(), //=> Promise
	'rainbow',
	'pony'
];

const iterator = async element => saveToDiskPromise(element);

console.log(await pEachSeries(keywords, iterator));
//=> ['unicorn', 'rainbow', 'pony']
```

## API

### pEachSeries(input, iterator)

Returns a `Promise` that is fulfilled when all promises in `input` and ones returned from `iterator` are fulfilled, or rejects if any of the promises reject. The fulfillment value is the original `input`.

#### input

Type: `Iterable<Promise | unknown>`

Iterated over serially in the `iterator` function.

#### iterator(element, index)

Type: `Function`

Return value is ignored unless it's `Promise`, then it's awaited before continuing with the next iteration.

### pEachSeries.stop

Stop iterating through items by returning `pEachSeries.stop` from the iterator function.

```js
import pEachSeries from 'p-each-series';

// Logs `a` and `b`.
const result = await pEachSeries(['a', 'b', 'c'], value => {
	console.log(value);

	if (value === 'b') {
		return pEachSeries.stop;
	}
});

console.log(result);
//=> ['a', 'b', 'c']
```

## Related

- [p-map-series](https://github.com/sindresorhus/p-map-series) - Map over promises serially
- [p-series](https://github.com/sindresorhus/p-series) - Run promise-returning & async functions in series
- [p-pipe](https://github.com/sindresorhus/p-pipe) - Compose promise-returning & async functions into a reusable pipeline
- [p-waterfall](https://github.com/sindresorhus/p-waterfall) - Run promise-returning & async functions in series, each passing its result to the next
- [p-reduce](https://github.com/sindresorhus/p-reduce) - Reduce a list of values using promises into a promise for a value
- [p-map](https://github.com/sindresorhus/p-map) - Map over promises concurrently
- [More…](https://github.com/sindresorhus/promise-fun)

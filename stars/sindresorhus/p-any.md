---
repo: sindresorhus/p-any
url: 'https://github.com/sindresorhus/p-any'
homepage: null
starredAt: '2018-12-17T21:33:52Z'
createdAt: '2016-10-21T05:28:21Z'
updatedAt: '2024-10-13T15:14:18Z'
language: JavaScript
license: MIT
branch: main
stars: 55
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:52.830Z'
description: Wait for any promise to be fulfilled
tags: []
---

# p-any

> Wait for any promise to be fulfilled

Useful when you need the fastest promise.

You probably want this instead of `Promise.race()`. [Reason.](http://bluebirdjs.com/docs/api/promise.race.html)

*With [Node.js 15](https://medium.com/@nodejs/node-js-v15-0-0-is-here-deb00750f278), there's now a built-in [`Promise#any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any) method. The benefit of this package is that it has cancellation functionality.*

## Install

```
$ npm install p-any
```

## Usage

Checks 3 websites and logs the fastest.

```js
import pAny from 'p-any';
import got from 'got';

const first = await pAny([
	got.head('https://github.com').then(() => 'github'),
	got.head('https://google.com').then(() => 'google'),
	got.head('https://twitter.com').then(() => 'twitter'),
]);

console.log(first);
//=> 'google'
```

## API

### pAny(input, options?)

Returns a [cancelable `Promise`](https://github.com/sindresorhus/p-cancelable) that is fulfilled when any promise from `input` is fulfilled. If all the `input` promises reject, it will reject with an [`AggregateError`](https://github.com/sindresorhus/aggregate-error) error.

#### input

Type: `Iterable<Promise | unknown>`

#### options

Type: `object`

##### filter

Type: `Function`

Receives the value resolved by the promise. Used to filter out values that doesn't satisfy a condition.

### AggregateError

Exposed for instance checking.

## Related

- [p-some](https://github.com/sindresorhus/p-some) - Wait for a specified number of promises to be fulfilled
- [p-locate](https://github.com/sindresorhus/p-locate) - Get the first fulfilled promise that satisfies the provided testing function
- [More…](https://github.com/sindresorhus/promise-fun)

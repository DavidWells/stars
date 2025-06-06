---
repo: sindresorhus/p-forever
url: 'https://github.com/sindresorhus/p-forever'
homepage: null
starredAt: '2022-11-08T20:05:55Z'
createdAt: '2016-11-18T09:33:22Z'
updatedAt: '2024-10-13T15:15:57Z'
language: TypeScript
license: MIT
branch: main
stars: 45
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:11.965Z'
description: Run promise-returning & async functions repeatedly until you end it
tags: []
---

# p-forever

> Run promise-returning & async functions until you end it

Think of it like an async version of `while (true) {}`.

## Install

```
$ npm install p-forever
```

## Usage

Here we create some numbered fixtures. The `createFixture()` function returns a Promise.

```js
import pForever from 'p-forever';

pForever(async index => {
	index++;

	if (index > 100) {
		return pForever.end;
	}

	await createFixture(index);

	return index;
}, 0);
```

or

```js
import pForever from 'p-forever';

let index = 0;

pForever(async () => {
	index++;

	if (index > 100) {
		return pForever.end;
	}

	await createFixture(index);
});
```


## API

### pForever(fn, initialValue?)

Returns a `Promise` that is fulfilled when `fn` returns `pForever.end`, or rejects if any of the promises returned from `fn` rejects.

#### fn(previousValue)

Type: `Function`

Receives the previously returned value. If a `Promise` is returned, it's awaited before calling `fn` again.

#### initialValue

Initial value to pass to `fn`.

### pForever.end

Symbol used to end the loop.

## Related

- [p-times](https://github.com/sindresorhus/p-times) - Run promise-returning & async functions a specific number of times concurrently
- [p-whilst](https://github.com/sindresorhus/p-whilst) - Calls a function repeatedly while a condition returns true and then resolves the promise
- [More…](https://github.com/sindresorhus/promise-fun)

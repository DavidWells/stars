---
repo: terkelg/simultan
url: 'https://github.com/terkelg/simultan'
homepage: ''
starredAt: '2022-02-18T07:18:07Z'
createdAt: '2021-01-25T20:22:58Z'
updatedAt: '2023-06-14T00:15:18Z'
language: JavaScript
license: MIT
branch: main
stars: 15
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:18.031Z'
description: Simultaneously run an async function on any iterable with limited concurrency
tags:
  - async
  - concurrency
  - concurrent
  - iterator
  - promises
---

# Simultan [![CI](https://github.com/terkelg/simultan/workflows/CI/badge.svg)](https://github.com/terkelg/simultan/actions) [![npm](https://badgen.now.sh/npm/v/simultan)](https://npmjs.org/package/simultan)

> Simultaneously run an async function on any iterable with limited concurrency.

Simultan takes an iterable, executes an async method on each value, and returns a single `Promise`. The promise contains an array of all the resolved return values. The number of concurrent invocations can be limited.

## Install

```
$ npm install --save simultan
```


## Usage

```js
import { simultan } from 'simultan';

const urls = [
    // ... array of urls to fetch
]

await simultan(urls, async url => {
    const response = fetch(url);
    return response.json();
});
//=> [{...}, {...}, {...}, ]
```


## API

### simultan<T, R = unknown>(iterable, fn, limit = 200)
Returns: `Promise<unknown[]>`

Simultan executes an async callback on each value of any [`Iterable`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols). A single `Promise` is returned with an array of the resolved return values.

This returned promise will resolve when all invocations of the callback method have been resolved.

#### iterable
Type: `Iterable<T> | AsyncIterable<T>`<br>
Required: `true`

Iterable to iterate and execute async callback function on.

#### fn
Type: `IteratorFn<T, R> = (item: T) => Promise<R>`<br>
Required: `true`

#### limit
Type: `number`<br>
Default: `200`<br>
Required: `false`

Maximum number of concurrent invocations.

## License

MIT © [Terkel Gjervig](https://terkel.com)

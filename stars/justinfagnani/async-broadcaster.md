---
repo: justinfagnani/async-broadcaster
url: 'https://github.com/justinfagnani/async-broadcaster'
homepage: null
starredAt: '2021-06-28T05:43:12Z'
createdAt: '2021-06-24T00:42:32Z'
updatedAt: '2024-02-06T06:23:39Z'
language: TypeScript
license: MIT
branch: main
stars: 17
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:32.323Z'
description: Observable alternative using async iterators
tags: []
---

# async-broadcaster

Observable alternative using async iterators

## Install

```sh
npm i async-broadcaster
```

## Why

It's a common requirement to let users subscribe to new values that are produced asynchronously. Often we reach for an observable library (RxJS, zen-observable, Wonka, etc.) to manage subscriptions and allow broadcasting of new values, but full observable implementations may be overkill for simple subscriptions. Observable also bring along a new API, when JavaScript already has an standard API for _consuming_ asynchronous values: [async iterables](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of).

What's needed to enable consumers to use async iterables is a way for producers to make async iterables that can be listened to by multiple listeners and correctly handle buffering, unsubscription, etc.

This is what AsyncBroadcaster does.

AsyncBroadcaster takes a single async iterable and adapts it to allow multiple listeners.

## Features

- Supports multiple listeners
- Buffers values for slow listeners
- Efficiently clears the buffer of values seen by all listeners
- Supports AbortSignal for cancelling iteration
- Automatically cleans up when listeners break or return from for/await...of loops

## Usage

```ts
import {AsyncBroadcaster} from 'async-broadcaster';

async function* makeOneHundred() {
  for (let i = 0; i < 100; i++) {
    yield i;
  }
}

const broadcaster = new AsyncBroadcaster(makeOneHundred());

// listen to broadcast values
logValues(broadcaster.iterable);

// We can listen more than once
logValues(broadcaster.iterable);

async function logValues(iterable) {
  // listening is done with anything that can consume async iterables, like
  // a for/await-of loop:
  for await (const o of iterable) {
    console.log(o);
  }
}
```

### Pairs well with IxJS

Async iterables don't have the functional methods that Array does like `map()`, `reduce()`, or `filter()`, nor the common reactive operators like `count()`, `zip()`, etc.

These can be imported from a library that works with any async iterable, such as [IxJS](https://github.com/ReactiveX/IxJS).

```ts

import { filter, map } from 'ix/asynciterable/operators';

const results = from(broadcaster.iterable).pipe(
  filter(async x => x % 2 === 0),
  map(async x => x * x)
);

for await (let item of results) {
  console.log(`Next: ${item}`);
}
```

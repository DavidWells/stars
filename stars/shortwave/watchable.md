---
repo: shortwave/watchable
url: 'https://github.com/shortwave/watchable'
homepage: 'https://www.shortwave.com/blog/watchables-realtime-react-without-redux/'
starredAt: '2022-02-17T05:25:32Z'
createdAt: '2022-01-06T19:04:15Z'
updatedAt: '2023-06-14T01:25:36Z'
language: TypeScript
license: MIT
branch: main
stars: 33
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:21.660Z'
description: A library to expose state into React
tags:
  - react
  - state-management
  - typescript
---

# Watchable

A small library to expose state into React.

## Features

- 🧑‍🏫 **Easy to learn:** Small API surface - all you need are two classes and a hook to get started.
- 🤏 **Small:** 2.15 kb bundle minified and gzipped. Supports ESM and tree shaking.
- ⚡ **Fast:** Minimized renders with built-in memoization.
- ⚛️  **React:** Built for React in mind with hooks built in.
- ⌨️  **Typescript:** It's written in TypeScript and types are exported along with the library.

## Introduction

Watchables are objects that store your application state. They can be subscribed too for updates, but at the same time the existing value can be retrieved synchronously, even when transforms are applied. This library pairs well with React and comes with a couple of [hooks](https://github.com/shortwave/watchable/blob/main/src/hooks.ts) such as `useWatchable` and `useMemoizedWatchable`.

A watchable can be used a simple way to expose state into your React components without needing a full blown state management system like Redux or MobX.

See our [blog post](https://www.shortwave.com/blog/watchables-realtime-react-without-redux/) for more background on how this library came to be.

## Basic usage

```typescript
import { WatchableSubject } from '@shortwave/watchable';

const v = WatchableSubject.of(0);

console.log(`Count is at ${w.getValue()}`);
// output: Count is at 0

/* Subscriptions to a value synchronously fires, so updates cannot be missed. */
v.watch((count) => {
  console.log(`Count is ${w.getValue()}`);
});
// output: Count is 0

v.update(1);
// output: Count is 1

v.update(1);
// no output - the value is memoized
```

## Advanced usage

See the example/ and tests/ directories for the full API and more examples.

#### `watchable.map(mapper: (t: T) => U): Watchable<U>`

Useful for transforming internal state to external state or dropping private data.

```typescript
const v = WatchableSubject.of(0);
const u = v.map((n) => `Count is ${n}`);
u.watch((s) => console.log(s));
// output: Count is 0
v.update(6);
// output: Count is 6
```

#### `watchable.withHooks({setup, tearDown}): Watchable<U>`

Allows for tracking subscriptions so you can cleanup other resources when the value isn't being watched anymore (for example, setting up and tearing down a websocket connection).

```typescript
const v = WatchableSubject.of(0);
const u = v.withHooks({
  setup: () => console.log("First watcher started!"),
  tearDown: () => console.log("Last watcher stopped!"),
});
const unsub1 = u.watch((s) => { /* noop */ });
// output: First watcher started!
const unsub2 = u.watch((s) => { /* noop */ });
unsub1();
// no output
unsub2();
// output: Last watcher stopped!
```

#### `watchable.toPromise()`

Useful in imperative code an async callback where you need to access a value that may still be loading.

```typescript
const v = WatchableSubject.empty<number>();
v.toPromise().then((value) => {
  console.log(`Count is ${value}`);
});
setTimeout(() => {
  v.update(0);
  // output: Count is 0
  v.update(1);
  // No output - promise is resolved already
}, 150);
```

#### `watchable.snapshot()`

Can be used to get only the current value, or the first value after loading. An example of where this can be used is to perform searches against frequently updated values.

```typescript
const v = WatchableSubject.of<number>(1);
const snap = v.snapshot();
console.log(`Snapshot value ${snap.getValue()}`);
// output: Snapshot value 1
v.update(2);
console.log(`Snapshot value ${snap.getValue()}`);
// output: Snapshot value 1
```

#### `partialCombineWatchable`

We frequently use this to create "batch" versions of hooks, this allows for combining a map of several watchables into one. This omits any empty watchables.

```typescript
import {partialCombineWatchable, Watchable, WatchableSubject} from "@shortwave/watchable";

const mapOfWatchables: Map<string, Watchable<number>> = new Map([
  ['a', WatchableSubject.of(1)],
  ['b', WatchableSubject.of(2)],
  ['c', WatchableSubject.empty()],
]);
const watchableMap: Watchable<Map<string, number>> = partialCombineWatchable(mapOfWatchables);
console.log(watchableMap.getValue());
// output: Map([['a', 1], ['b', 2]])
```

Here's an example of using this to create a "batch" version of a hook.

```typescript
import {useMemoizedWatchable, partialCombineWatchable} from "@shortwave/watchable";

function useBatchOnlineStatusService(users: UserId[]): Map<UserId, OnlineStatus> {
  const service = useOnlineStatusService();
  const value = useMemoizedWatchable(() => {
    const statusByUser: Map<UserId, Watchable<OnlineStatus>> = new Map(users.map((userId) =>
      [userId, service.watchOnlineStatus(userId)]
    ));
    return partialCombineWatchable(statusByUser);
  }, [service, users]);
  // partialCombineWatchable is never empty, but we need to make typescript happy and provide
  // a default loading value.
  return value ?? new Map();
}
```

## Contributing

We're using [DTS](https://github.com/weiran-zsd/dts-cli) to manage this library.

The library resides inside `/src`, and there is a [Vite-based](https://vitejs.dev) playground for it inside `/example`.

The recommended workflow is to run DTS in one terminal:

```bash
npm start # or yarn start
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

Then run the example inside another:

```bash
cd example
npm i # or yarn to install dependencies
npm start # or yarn start
```

The default example imports and live reloads whatever is in `/dist`, so if you are seeing an out of date component, make sure DTS is running in watch mode like we recommend above. 

To do a one-off build, use `npm run build` or `yarn build`.

To run tests, use `npm test` or `yarn test`.

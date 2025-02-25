---
repo: vycke/chifferobe
url: 'https://github.com/vycke/chifferobe'
homepage: ''
starredAt: '2022-01-02T00:13:39Z'
createdAt: '2019-09-26T15:23:31Z'
updatedAt: '2024-05-14T02:16:15Z'
language: TypeScript
license: MIT
branch: main
stars: 15
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:24.350Z'
description: TypeScript implementation of event-driven proxy state.
tags: []
---

# Chifferobe

![](https://github.com/vyckes/chifferobe/workflows/test/badge.svg)
[![Node version](https://img.shields.io/npm/v/chifferobe.svg?style=flat)](https://www.npmjs.com/package/chifferobe)
[![NPM Downloads](https://img.shields.io/npm/dm/chifferobe.svg?style=flat)](https://www.npmjs.com/package/chifferobe)
[![Minified size](https://img.shields.io/bundlephobia/min/chifferobe@latest?label=minified)](https://www.npmjs.com/package/chifferobe)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A proxy based signals library that allows for small but powerful state management. It is build on top of three core principles:

- **Reactive**: like any signals library, _effects_ can be created that are executed once state is changed.
- **Immutable**: data can be made immutable and cannot be mutated directly. Changes can be made via commands.
- **Access-layer**: commands can be registered to the store. These are functions that can be invoked to make changes.

## Example

**Simple definition of a store**

```js
import { signal, effect } from "chifferobe";
// define a command
const increment =
  (state) =>
  (amount = 1) =>
    (state.count += amount);
// define the signal
const myStore = signal({ count: 0 }, { increment });
// interact with the signal
console.log(myStore.count); // 0
myStore.increment(2);
console.log(myStore.count); // 2
```

**Basic effects**

```js
// Define an effect
let double = 0;
const dispose = effect(() => (double = myStore.count * 2));
console.log(double); // 4
myStore.increment(2);
console.log(double); // 8
// Remove the effect
dispose();
```

**Effects based in multiple stores**

```js
const myStore1 = signal({ count: 0 }, { increment });
const myStore2 = signal({ count: 4 }, { increment });
// Define an effect
let sum = 0;
const dispose = effect(() => (sum = myStore1.count + myStore2.count));
console.log(sum); // 4
myStore.increment(2);
console.log(double); // 6
// Remove the effect
dispose();
```

## TypeScript example

```ts
type CountStore = { count: number };
type CountCommands = {
  increment: (number?: number) => CountStore;
};

const initStore = { count: 0 };
const commands = {
  increment: (state) => (n) => {
    return { ...s, count: s.count + n };
  },
};

const store = signal<CountStore, CountCommands>(initStore, commands);
```

## React hooks example

A generic React Hook implementation that automatically rerenders if the store value changes.

```jsx
import { effect } from "chifferobe";
import { useLayoutEffect, useReducer } from "react";

export function useStore(store, key) {
  const [state, setState] = useState({});

  useLayoutEffect(() => {
    const dispose = effect(() => setState(store[key]));
    return () => dispose();
  }, []); //eslint-disable-line

  return state;
}

// Apply in a component
function MyButton() {
  // here a view on the data is being used in the hook
  const count = useReadStore(myStore, "count");
  return <button onClick={store.increment}>{`value ${count}`}</button>;
}
```

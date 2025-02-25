---
repo: alexeyraspopov/selectre
url: 'https://github.com/alexeyraspopov/selectre'
homepage: 'https://selectre.js.org'
starredAt: '2021-12-02T03:35:47Z'
createdAt: '2021-11-22T19:17:14Z'
updatedAt: '2022-02-16T02:30:50Z'
language: TypeScript
license: ISC
branch: main
stars: 11
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:31.626Z'
description: Time & Space Efficient State Selectors
tags:
  - memoization
  - react
  - redux
  - selector
---

# Selectre

    npm install selectre

Tiny time and space efficient state selectors for React, Redux, and more.

- Selectre is built as a more efficient alternative to
  [Reselect](https://github.com/reduxjs/reselect)
- Selectre is designed to work with Redux's `useSelector()` and React's `useSyncExternalStore()` and
  ensure the least amount of unnecessary computations for things that don't change.
- Selectre uses very efficient implementation of LRU cache to ensure no overhead in accessing cached
  computation results.
- Selectre uses shallow equality by default to help developers avoid shooting themselves in the
  foot.
- Selectre caches parametric selectors in the way that allows developers not to use additional
  measures to memoize stuff in components.

## Creating and using selectors

```tsx
import { createSelector } from "selectre";
import { useSelector } from "react-redux";

let selectNumberCompletedTodos = createSelector(
  (state) => state.todos,
  (todos) => todos.filter((todo) => todo.completed).length,
);

function CompletedTodosCounter() {
  let numberCompletedTodos = useSelector(selectNumberCompletedTodos());
  return <span>{numberCompletedTodos}</span>;
}
```

Selectors uniformity is important because it affects the amount of effort needed to eventually add
parameters to a simple selectors.

```tsx
import { createSelector } from "selectre";
import { useSelector } from "react-redux";

let selectNumberFilteredTodos = createSelector(
  (state) => state.todos,
  (_, completed) => completed,
  (todos, completed) => todos.filter((todo) => todo.completed === completed).length,
);

function TodoCounter({ completed }) {
  let numberFilteredTodos = useSelector(selectNumberFilteredTodos(completed));
  return <span>{numberFilteredTodos}</span>;
}
```

```typescript
let selectNumberCompletedTodos = createSelector(
  (state) => state.todos,
  (_, completed) => completed,
  (todos, completed) => todos.filter((todo) => todo.completed === completed).length,
  // isInputEqual for comparing inputs, isOutputEqual for the output
  { isInputEqual: Object.is },
);
```

## Using Selectre with React's `useSyncExternaStore()`

```javascript
import { useSyncExternalStoreWithSelector } from "use-sync-external-store/with-selector";

function useSelector(selector) {
  // TODO
}
```

## Credits

- The intent and main API is similar and based on [Reselect](https://github.com/reduxjs/reselect)
- LRU cache implementation is based on
  [Guillaume Plique's article about LRU cache and using typed arrays to implement Doubly-Linked Lists](https://yomguithereal.github.io/posts/lru-cache)
  (GitHub: [@Yomguithereal](https://github.com/Yomguithereal), Twitter:
  [@Yomguithereal](https://twitter.com/Yomguithereal))
- Cache key's hash function implementation is based on
  [Immutable.js `hashCode()`](https://github.com/immutable-js/immutable-js/blob/4d0e9819e509861d0f16a64a4fc0bfdc892563f9/src/Hash.js)

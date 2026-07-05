---
repo: dabbott/tree-visit
url: 'https://github.com/dabbott/tree-visit'
homepage: null
starredAt: '2022-10-16T05:05:33Z'
createdAt: '2020-07-18T00:10:58Z'
updatedAt: '2025-01-31T19:42:48Z'
language: TypeScript
license: MIT
branch: master
stars: 32
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:23.685Z'
description: A tree traversal library.
tags: []
---

# tree-visit

A tree traversal library.

```bash
npm install --save tree-visit
```

OR

```bash
yarn add tree-visit
```

## API

The recommended way to use `tree-visit` is by calling `defineTree(getChildren)`, where `getChildren` is a function which returns a node's children as an array. The `defineTree` API returns an object containing every library function with the `getChildren` option already set.

You may alternately import individual functions, e.g. `visit`, and pass the `{ getChildren }` option when calling them. Importing individual functions can reduce your bundle size to the bear minimum (though the entire library is small and has 0 dependencies, so this may not be necessary).

Most callback functions, such as `getChildren`, `predicate`, `onEnter`, and `onLeave`, are passed an `IndexPath` as the second argument, containing an array of integer indexes that identify that node. The root node is implicitly included in the `IndexPath` (i.e. there's no `0` first in every `IndexPath`).

- [access](#access)
- [accessPath](#accessPath)
- [defineTree](#defineTree)
- [diagram](#diagram)
- [find](#find)
- [findAll](#findAll)
- [findIndexPath](#findIndexPath)
- [flat](#flat)
- [visit](#visit)

---

### `access`

Returns a node by its `IndexPath`.

**Type**: `function access<T>(node: T, indexPath: IndexPath, options: BaseOptions<T>): T`

#### Example

```js
import { access } from 'tree-visit'

const getChildren = (node) => node.children || []

const rootNode = {
  name: 'a',
  children: [
    { name: 'b' },
    {
      name: 'c',
      children: [{ name: 'd' }],
    },
  ],
}

access(rootNode, [1, 0], { getChildren })
// #=> { name: 'd' }
```

---

### `accessPath`

Returns an array of each node in an `IndexPath`.

**Type**: `function accessPath<T>(node: T, indexPath: IndexPath, options: BaseOptions<T>): T`

#### Example

```js
import { accessPath } from 'tree-visit'

const getChildren = (node) => node.children || []

const rootNode = {
  name: 'a',
  children: [
    { name: 'b' },
    {
      name: 'c',
      children: [{ name: 'd' }],
    },
  ],
}

access(rootNode, [1, 0], { getChildren })
// #=> [{ name: 'a', children: [...] }, { name: 'c', children: [...] }, { name: 'd' }]
```

---

### `defineTree`

Returns a version of every library function with the `getChildren` option already set.

This also allows for more concise calls to most functions.

**Type**: `function defineTree<T>(baseOptions: BaseOptions<T>): Tree<T>`

#### Example

```js
import { defineTree } from 'tree-visit'

const getChildren = (node) => node.children || []

const { visit, find } = defineTree({ getChildren })

const rootNode = {
  name: 'a',
  children: [
    { name: 'b' },
    {
      name: 'c',
      children: [{ name: 'd' }],
    },
  ],
}

visit(rootNode, (node) => {
  console.log(node)
})
// #=> a, b, c, d

find(rootNode, (node) => node.name === 'd')
// #=> { name: 'd' }
```

---

### `diagram`

Generate a diagram of the tree, as a string.

**Type**: `function diagram<T>(node: T, options: DiagramOptions<T>): string`

#### Example

```js
import { diagram } from 'tree-visit'

const getChildren = (node) => node.children || []
const getLabel = (node) => node.name

const rootNode = {
  name: 'a',
  children: [
    { name: 'b' },
    {
      name: 'c',
      children: [{ name: 'd' }],
    },
  ],
}

diagram(rootNode, { getChildren, getLabel })
// #=> a
// #=> ├── b
// #=> └── c / d
```

---

### `find`

Find a node matching a predicate function.

**Type**: `function find<T>(node: T, options: FindOptions<T>): T | undefined`

#### Example

```js
import { find } from 'tree-visit'

const getChildren = (node) => node.children || []

const rootNode = {
  name: 'a',
  children: [
    { name: 'b' },
    {
      name: 'c',
      children: [{ name: 'd' }],
    },
  ],
}

find(rootNode, { getChildren, predicate: (node) => node.name === 'd' })
// #=> { name: 'd' }
```

---

### `findAll`

Find all nodes matching a predicate function.

**Type**: `findAll<T>(node: T, options: FindOptions<T>): T[]`

#### Example

```js
import { findAll } from 'tree-visit'

const getChildren = (node) => node.children || []

const rootNode = {
  name: 'a',
  children: [
    { name: 'b' },
    {
      name: 'c',
      children: [{ name: 'd' }],
    },
  ],
}

findAll(rootNode, { getChildren, predicate: (node) => node.name === 'd' })
// #=> [{ name: 'd' }]
```

---

### `findIndexPath`

Find the `IndexPath` of a node matching a predicate function.

**Type**: `findIndexPath<T>(node: T, options: FindOptions<T>): T[]`

#### Example

```js
import { findIndexPath } from 'tree-visit'

const getChildren = (node) => node.children || []

const rootNode = {
  name: 'a',
  children: [
    { name: 'b' },
    {
      name: 'c',
      children: [{ name: 'd' }],
    },
  ],
}

findIndexPath(rootNode, { getChildren, predicate: (node) => node.name === 'd' })
// #=> [1, 0]
```

---

### `findAllIndexPaths`

Find the `IndexPath` of all nodes matching a predicate function.

**Type**: `findAllIndexPaths<T>(node: T, options: FindOptions<T>): T[]`

#### Example

```js
import { findAllIndexPaths } from 'tree-visit'

const getChildren = (node) => node.children || []

const rootNode = {
  name: 'a',
  children: [
    { name: 'b' },
    {
      name: 'c',
      children: [{ name: 'd' }],
    },
  ],
}

findAllIndexPaths(rootNode, {
  getChildren,
  predicate: (node) => node.name === 'c' || node.name === 'd',
})
// #=> [[1], [1, 0]]
```

---

### `flat`

Returns an array containing the root node and all of its descendants.

This is analogous to `Array.prototype.flat` for flattening arrays.

**Type**: `function flat<T>(node: T, options: BaseOptions<T>): T[]`

#### Example

```js
import { flat } from 'tree-visit'

const getChildren = (node) => node.children || []

const rootNode = {
  name: 'a',
  children: [
    { name: 'b' },
    {
      name: 'c',
      children: [{ name: 'd' }],
    },
  ],
}

flat(rootNode, { getChildren }).map((node) => node.name)
// #=> ['a', 'b', 'c', 'd']
```

---

### `visit`

Visit each node in the tree, calling an optional `onEnter` and `onLeave` for each.

From `onEnter`:

- return nothing or `undefined` to continue
- return `"skip"` to skip the children of that node and the subsequent `onLeave`
- return `"stop"` to end traversal

From `onLeave`:

- return nothing or `undefined` to continue
- return `"stop"` to end traversal

**Type**: `function visit<T>(node: T, options: VisitOptions<T>): void`

#### Example

```js
import { visit } from 'tree-visit'

const getChildren = (node) => node.children || []

const rootNode = {
  name: 'a',
  children: [
    { name: 'b' },
    {
      name: 'c',
      children: [{ name: 'd' }],
    },
  ],
}

visit(rootNode, {
  getChildren,
  onEnter: (node) => {
    console.log(node)
  },
})
// #=> a, b, c, d
```

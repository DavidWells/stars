---
repo: mesqueeb/compare-anything
url: 'https://github.com/mesqueeb/compare-anything'
homepage: 'https://npmjs.com/compare-anything'
starredAt: '2021-12-14T02:33:39Z'
createdAt: '2019-01-09T16:16:05Z'
updatedAt: '2025-02-19T18:48:13Z'
language: TypeScript
license: MIT
branch: main
stars: 10
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:28.635Z'
description: >-
  Compares objects and tells you which props are duplicate, and props are only
  present once.
tags:
  - compare
  - compare-arrays
  - compare-objects
  - count-if
  - countif
  - duplicates
  - find-duplicates
  - javascript
  - remove-duplicates
  - typescript
---

# Compare anything 🛰

<a href="https://www.npmjs.com/package/compare-anything"><img src="https://img.shields.io/npm/v/compare-anything.svg" alt="Total Downloads"></a>
<a href="https://www.npmjs.com/package/compare-anything"><img src="https://img.shields.io/npm/dw/compare-anything.svg" alt="Latest Stable Version"></a>

```
npm i compare-anything
```

Compares objects and arrays and tells you which props or values are duplicates, and which are only present once.

It works just like you would compare two columns in excel! But who needs excel when you've got JavaScript, am I right? 😃
## Meet the family (more tiny utils with TS support)

- [is-what 🙉](https://github.com/mesqueeb/is-what)
- [is-where 🙈](https://github.com/mesqueeb/is-where)
- [merge-anything 🥡](https://github.com/mesqueeb/merge-anything)
- [check-anything 👁](https://github.com/mesqueeb/check-anything)
- [remove-anything ✂️](https://github.com/mesqueeb/remove-anything)
- [getorset-anything 🐊](https://github.com/mesqueeb/getorset-anything)
- [map-anything 🗺](https://github.com/mesqueeb/map-anything)
- [filter-anything ⚔️](https://github.com/mesqueeb/filter-anything)
- [copy-anything 🎭](https://github.com/mesqueeb/copy-anything)
- [case-anything 🐫](https://github.com/mesqueeb/case-anything)
- [flatten-anything 🏏](https://github.com/mesqueeb/flatten-anything)
- [nestify-anything 🧅](https://github.com/mesqueeb/nestify-anything)

## Usage

It works just like you would expect. You `compare(objectA, objectB)` and it gives you all kind of info.

You can do all kind of things with compare-anything!

- Compare object props, to see which props are present in which objects
  <!-- 2. (WIP) Compare object values, to see which prop values are equal in all objects and which not -->
  <!-- 3. (WIP) Compare arrays, to see which values are present in all arrays and which not -->

## Compare object props

Which props are present in which objects. Remember, **this function only looks at the prop-names!** Not the values.

Will return an info object with:

- `props` - an array with all props of all objects
- `presentInAll` - is the prop present in all passed objects? `true`/`false` per prop
- `perProp` - an array of objects per prop that had that specific prop
- `presentIn` - an array of indexes per prop that had that specific prop (indexes of the params you passed to the function)

```js
import { compareObjectProps } from 'compare-anything'

// only props 'b' and 'c' are present in both ↓
const objectA = {a: '🎴', b: '🎴', c: '🎴'}
const objectB = {b: '🀄️', c: '🀄️', d: '🀄️'}

compareObjectProps(objectA, objectB)
// returns ↓
{
  props: ['a', 'b', 'c', 'd'],
  presentInAll: { a: false, b: true, c: true, d: false },
  perProp: { a: [objectA], b: [objectA, objectB], c: [objectA, objectB], d: [objectB] },
  presentIn: { a: [0], b: [0, 1], c: [0, 1], d: [1] }
}
```

### Compare more than two

You can pass **as many arguments as you want**!

```js
// keep on adding objects to compare!
compareObjectProps(objectA, objectB, objectC, objectD, objectE)
```

### Compare objects in an array

When you need to compare objects in an array you can use destructuring:

```js
// you can compare an array of objects like so:
compareObjectProps(...objectArray)
```

### Find duplicates based on one prop value

When you need to find duplicate objects based on one single prop value of that object, you can easily do so as follows:

```js
compareObjectProps(
  ...arrayOfObjects.map(obj => {
    return { [obj.idField]: obj }
  })
)
```

In the example above you can change `idField` by the actual prop name you need. By making a key out of the value you can easily find duplicates based on just this field.

### Nested props

If we require to check even **nested props** we can use the [flatten-anything](https://github.com/mesqueeb/flatten-anything) function like shown below:

```js
import flatten from 'flatten-anything'
import { compareObjectProps } from 'compare-anything'

const objectA = {nested: {a: '🎴', b: '🎴'}}
const objectB = {nested: {a: '🀄️', c: '🀄️'}}

const flatA = flatten(objectA)
// →　{'nested.a': '🎴', 'nested.b': '🎴'}
const flatB = flatten(objectB)
// →　{'nested.a': '🀄️', 'nested.c': '🀄️'}

compareObjectProps(flatA, flatB)
// returns ↓
{
  props: ['nested.a', 'nested.b', 'nested.c'],
  presentInAll: { 'nested.a': true, 'nested.b': false, 'nested.c': false },
  perProp: { 'nested.a': [objectA, objectB], 'nested.b': [objectA], 'nested.c': [objectB] },
  presentIn: { 'nested.a': [0, 1], 'nested.b': [0], 'nested.c': [1] }
}
```

<!-- ## Compare object values

Which values are the same in which objects. Will return an info object with:

- `props` - an array with all props of all objects
- `sameInAll` - true/false per prop
- `sameIn` - sets of indexes of the objects where the value was equal

```js
import { compareObjectValues } from 'compare-anything'

const objectA = {a: '', b: 'same', c: 'diff', d: ''}
const objectB = {b: 'same', c: 'Diff', e: '', f: ''}
const objectC = {b: 'same', c: 'Diff'}
const objectE = {b: 'same', c: 'diff'}

compareObjectValues(objectA, objectB)
// returns ↓
{
  props: ['a', 'b', 'c', 'd', 'e', 'f'],
  sameInAll: { a: false, b: true, c: false, d: false, e: false, f: false },
  sameIn: { a: [], b: [[0, 1, 2, 3]], c: [[0, 3], [1, 2]], d: [], e: [], f: [] },
}
``` -->

<!--
## Compare arrays

Which values are present in which arrays. Will return an info object with:

- `values` - an array with all values of all arrays
- `presentInAll` - true/false per value
- `presentIn` - the param indexes of where the prop was present

```js
import { compareArrays } from 'compare-anything'

const arrayA = [1, 2, 'a']
const arrayB = [1, 'a', 'b']

compareArrays(arrayA, arrayB)
// returns ↓
{
  values: [1, 2, 'a', 'b'],
  presentInAll: new Map([
    [1, true], [2, false], ['a', true], ['b', false]
  ]),
  presentIn: new Map([
    [1, [0, 1]], [2, [0]], ['a', [0, 1]], ['b', [1]]
  ]),
}
```
-->

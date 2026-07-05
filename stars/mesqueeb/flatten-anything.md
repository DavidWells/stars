---
repo: mesqueeb/flatten-anything
url: 'https://github.com/mesqueeb/flatten-anything'
homepage: 'https://npmjs.com/flatten-anything'
starredAt: '2021-12-14T02:29:59Z'
createdAt: '2019-01-13T03:55:01Z'
updatedAt: '2025-02-19T18:46:44Z'
language: TypeScript
license: MIT
branch: main
stars: 32
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:28.727Z'
description: >-
  Flatten objects and replace nested props with 'prop.subprop'. A simple and
  small integration.
tags:
  - flatten
  - flatten-deep-object
  - flatten-nested-props
  - flatten-object
  - flatten-paths
  - get-flat-object
  - object
  - pathify
  - pathify-props
  - paths
---

# Flatten anything 🏏

<a href="https://www.npmjs.com/package/flatten-anything"><img src="https://img.shields.io/npm/v/flatten-anything.svg" alt="Total Downloads"></a>
<a href="https://www.npmjs.com/package/flatten-anything"><img src="https://img.shields.io/npm/dw/flatten-anything.svg" alt="Latest Stable Version"></a>

```
npm i flatten-anything
```

Flatten objects and replace nested props with 'prop.subprop'. A simple and small integration.

I was looking for:

- A simple solution to flatten objects & arrays
- Only flatten plain objects and **not special class instances**!

This last one is crucial! So many libraries use custom classes that create objects with special prototypes, and such objects all break when trying to flatten them. So we gotta be careful!

flatten-anything will flatten objects and their nested properties, but only as long as they're "plain objects". As soon as a sub-prop is not a "plain object" and has a special prototype, it will stop flattening there and reference that instance "as is". ♻️

Very usable for creating a payload for **Firebase Firestore** `update` function, which only accepts flat objects! With Firestore for example `Firebase.firestore.FieldValue.delete()` does not break.

Can be used in combination with [nestify-anything](https://github.com/mesqueeb/nestify-anything), which does the exact opposite of this one! 😉
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

- If you pass an object, it will flatten all nested properties
- If you pass an array, it will flatten all nested arrays

### Flatten objects

```js
import { flatten } from 'flatten-anything'

const target = { name: 'Ho-oh', types: { fire: true, flying: true } }

flatten(target)
// returns {
//   name: 'Ho-oh',
//   types.fire: true,
//   types.flying: true
// }
```

> Please note that when you pass an object it will only flatten nested object props, and do nothing to arrays inside the object.

### Flatten arrays

```js
import { flatten } from 'flatten-anything'

const target = [1, 2, ['a', 'b', ['y', 'z']], 3]

flatten(target)
// returns [1, 2, 'a', 'b', 'y', 'z', 3]
```

> Please note that when you pass an array it will only flatten direct arrays, and do nothing to objects inside the array.

### Limit the depth to flatten

> currently only works with objects. Please open an issue if you want it to work with arrays as well!

```js
const target = {
  name: 'Lugia',
  appearence: {
    // let's only flatten 1 level until here:
    parts: { wings: true },
    colors: { white: true, blue: true },
  },
}
const untilDepth = 1

flatten(target, untilDepth)
// returns {
//   name: 'Lugia',
//   appearence.parts: { wings: true },
//   appearence.colors: { white: true, blue: true },
// }
```

### Flatten only certain props

It's possible to only flatten eg. one prop.

```js
import { flattenObjectProps } from 'flatten-anything'

const target = {
  appearence: { hair: 'orange' },
  traits: { strength: 9000 },
}
const propsToFlatten = ['traits']

flattenObjectProps(target, propsToFlatten)
// returns {
//   appearence: { hair: 'orange' },
//   traits.strength: 9000,
// }
```

You can also point to a nested object property to only flatten specific nested props, but keep the rest as an object!

```js
const target = {
  traits: {
    strength: 9000,
    range: { min: 8000, max: 10000 },
  },
}

const propsToFlatten = ['traits.range']
// only flatten `traits.range` and nothing else.

flattenObjectProps(target, propsToFlatten)
// returns {
//   traits: { strength: 9000 },
//   'traits.range': {min: 8000, max: 10000},
// }
```

### Treeshaking

Importing `flatten` allows you to use it for both objects _and_ arrays.

If you use webpack, rollup, etc. you can _import less code_ by specifying the exact flatten function you need:

```js
import { flattenObject } from 'flatten-anything'
// or
import { flattenArray } from 'flatten-anything'
```

### Example for Firestore

```js
const pokemon = {
  name: 'Charizard',
  types: { dark: true, fire: true, flying: true },
}
// we want to delete the `dark` type from this Pokemon

const payload = flatten({
  types: { dark: Firebase.firestore.FieldValue.delete() },
})
Firebase.firestore()
  .doc('pokemon/charizard')
  .update(payload)
```

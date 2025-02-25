---
repo: mesqueeb/map-anything
url: 'https://github.com/mesqueeb/map-anything'
homepage: ''
starredAt: '2021-12-14T02:35:09Z'
createdAt: '2020-01-08T01:58:29Z'
updatedAt: '2025-02-24T21:26:30Z'
language: TypeScript
license: MIT
branch: main
stars: 11
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:28.594Z'
description: >-
  Array.map but for objects with good TypeScript support. A small and simple
  integration.
tags:
  - compose
  - map-object
  - map-reduce
  - mapping
  - object-map
  - object-mapper
  - object-to-object
  - transform
---

# Map anything 🗺

<a href="https://www.npmjs.com/package/map-anything"><img src="https://img.shields.io/npm/v/map-anything.svg" alt="Total Downloads"></a>
<a href="https://www.npmjs.com/package/map-anything"><img src="https://img.shields.io/npm/dw/map-anything.svg" alt="Latest Stable Version"></a>

```
npm i map-anything
```

Array.map but for objects with good TypeScript support. A small and simple integration.

## Motivation

I always want to do:

```js
someObject.map((val) => someFunction)
```

But this doesn't exist for objects, you need to do this instead:

```js
Object.entries(someObject).reduce((carry, [key, value], index, array) => {
  carry[key] = someFunction(value, key, array)
  return carry
}, {})
```

So I made a wrapper function for that. 😃

`map-anything` has very good [#TypeScript](#typescript) support as well.

## Usage

Provided Functions:

- `mapObject` takes an object and maps over the values of each key
- `mapObjectAsync` takes an object and maps a promise over the values of each key, after which you can just do a single await
- `mapMap` takes a map and maps over the values of each key

### Basic Usage

```js
import { mapObject } from 'map-anything'

const pokemon = {
  '001': { name: 'Bulbasaur', level: 10 },
  '004': { name: 'Charmander', level: 8 },
  '007': { name: 'Squirtle', level: 11 },
}

const levelUp = mapObject(pokemon, (pkmn) => {
  return { ...pkmn, level: pkmn.level + 1 }
})

// results in:
levelUp ===
  {
    '001': { name: 'Bulbasaur', level: 11 },
    '004': { name: 'Charmander', level: 9 },
    '007': { name: 'Squirtle', level: 12 },
  }
```

### Access the propName in the map function

A function passed to `Array.map` will get the value as first argument and an **index** as second. With `mapObject` you will get the **propName** as second argument.

```js
import { mapObject } from 'map-anything'

const pokemon = {
  '001': { name: 'Bulbasaur', level: 10 },
  '004': { name: 'Charmander', level: 8 },
  '007': { name: 'Squirtle', level: 11 },
}

const addIds = mapObject(pokemon, (pkmn, propName) => {
  const id = propName
  return { ...pkmn, id }
})

// results in:
addIds ===
  {
    '001': { name: 'Bulbasaur', level: 10, id: '001' },
    '004': { name: 'Charmander', level: 8, id: '004' },
    '007': { name: 'Squirtle', level: 11, id: '007' },
  }
```

### Map Object Async

```ts
const pokemon = {
  '001': { name: 'Bulbasaur', level: 10 },
  '004': { name: 'Charmander', level: 8 },
  '007': { name: 'Squirtle', level: 11 },
}

const result = await mapObjectAsync(pokemon, async (pkmn, propName) => {
  const id = propName
  const data = await fetchData(id) // hypothetical API call
  return { ...pkmn, data }
})

// results in:
result ===
  {
    '001': { name: 'Bulbasaur', level: 10, data: '...' }, // some fetched data
    '004': { name: 'Charmander', level: 8, data: '...' },
    '007': { name: 'Squirtle', level: 11, data: '...' },
  }
```

## TypeScript

Without having to specify the return type in the reducer, I've set `map-anything` up so it automatically detects that type for you!

![typescript support](https://raw.githubusercontent.com/mesqueeb/map-anything/master/.github/typescript-support.png)

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

## Source code

The source code is rather simple, it's doing something like the snippet show here below.
<br />However, it's adding amazing typescript.

```JavaScript
function mapObject (object, fn) {
  return Object.entries(object)
    .reduce((carry, [key, value], index, array) => {
      carry[key] = fn(value, key, array)
      return carry
    }, {})
}
```

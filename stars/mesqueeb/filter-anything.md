---
repo: mesqueeb/filter-anything
url: 'https://github.com/mesqueeb/filter-anything'
homepage: 'https://npmjs.com/filter-anything'
starredAt: '2021-12-14T02:23:14Z'
createdAt: '2018-12-15T15:50:47Z'
updatedAt: '2025-02-19T18:49:31Z'
language: TypeScript
license: MIT
branch: main
stars: 36
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:28.947Z'
description: >-
  A simple (TypeScript) integration of "pick" and "omit" to filter props of an
  object
tags:
  - delete-props
  - fillables
  - filter
  - filter-fields
  - filter-props
  - guard
  - guarded
  - guarded-props
  - omit
  - pick
  - props-stay
  - typescript
  - wildcard
---

# Filter anything ⚔️

<a href="https://www.npmjs.com/package/filter-anything"><img src="https://img.shields.io/npm/v/filter-anything.svg" alt="Total Downloads"></a>
<a href="https://www.npmjs.com/package/filter-anything"><img src="https://img.shields.io/npm/dw/filter-anything.svg" alt="Latest Stable Version"></a>

```
npm i filter-anything
```

An implementation that filters out object props like the TypeScript "pick" and "omit".
In the Laravel world, this is also called "fillables" and "guard".

## Motivation

I created this package because I needed:

- be able to filter out object props based on just what we need - aka "pick" props
- be able to filter out object props based on what we don't need - aka "omit" props
- **supports for nested properties**
- supports wildcards `*` for nested properties
- the return type must be TypeScript supported! (see screenshots below)

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

### Pick

With `pick` you pass an object and an array of keys of an object - **the props which may stay**.

```js
import { pick } from 'filter-anything'

const squirtle = { id: '007', name: 'Squirtle', type: 'water' }

const newObject = pick(squirtle, ['name', 'type'])
// returns { name: 'Squirtle', type: 'water' }
```

### Omit

With `omit` you pass an object and an array of keys of an object - the props which should be removed.

```js
import { omit } from 'filter-anything'

const squirtle = { id: '007', name: 'Squirtle', type: 'water' }

const withoutId = omit(squirtle, ['id'])
// returns { name: 'Squirtle', type: 'water' }
```

### Aliases

`pick()` and `omit()` can also be imported with the names `fillable()` and `guard()`. This pays homage to my history with Laravel. 😉

### TypeScript

TypeScript users will love this, because, as you can see, the result has the correct type automatically!

![typescript example pick](https://raw.githubusercontent.com/mesqueeb/filter-anything/master/.github/typescript-pick.png)
![typescript example omit](https://raw.githubusercontent.com/mesqueeb/filter-anything/master/.github/typescript-omit.png)

### Nested props

In the example below we want to get rid of the **nested property** called "discard".

```js
const doc = { items: { keep: '📌', discard: '✂️' } }

pick(doc, ['items.keep'])
// returns {items: {keep: '📌'}}

omit(doc, ['items.discard'])
// returns {items: {keep: '📌'}}
```

> Please note that TypeScript users will need to cast the result when using nested props.

## Wildcards

Yes! You can also work with wildcards by using `*` in the path.

```js
const doc = {
  123: { keep: '📌', discard: '✂️' },
  456: { keep: '📌', discard: '✂️' },
}
// use wildcard *
omit(doc, ['*.discard'])
// returns {
//   '123': {keep: '📌'},
//   '456': {keep: '📌'}
// }
```

> Please note that TypeScript users will need to cast the result when using wildcards props.

Feel free to open issues for any requests, questions or bugs!

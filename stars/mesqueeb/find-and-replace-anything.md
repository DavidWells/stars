---
repo: mesqueeb/find-and-replace-anything
url: 'https://github.com/mesqueeb/find-and-replace-anything'
homepage: 'https://npmjs.com/find-and-replace-anything'
starredAt: '2021-12-14T02:31:00Z'
createdAt: '2018-09-11T01:05:11Z'
updatedAt: '2025-02-19T18:47:39Z'
language: TypeScript
license: MIT
branch: main
stars: 21
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:28.752Z'
description: >-
  Replace one val with another or all occurrences in an object recursively. A
  simple & small integration.
tags:
  - find-and-replace
  - find-and-replace-if
  - find-prop
  - find-replace
  - has-prop
  - javascript
  - recursively
  - replace-if
  - replace-prop-value
  - replace-value
  - search-object-prop
  - search-prop
---

# Find and replace anything 🎣

<a href="https://www.npmjs.com/package/find-and-replace-anything"><img src="https://img.shields.io/npm/v/find-and-replace-anything.svg" alt="Total Downloads"></a>
<a href="https://www.npmjs.com/package/find-and-replace-anything"><img src="https://img.shields.io/npm/dw/find-and-replace-anything.svg" alt="Latest Stable Version"></a>

```
npm i find-and-replace-anything
```

Replace one val with another or all occurrences in an object recursively. A simple & small integration.

There are two methods you can import and use:

- **findAndReplace** find `a` replace with `b` (recursively on an object)
- **findAndReplaceIf** execute a function on every prop in an object recursively, and replace the prop with what the function returns

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

## find and replace

This will find a value inside an object and replace it with another:

- `findAndReplace(object, find, replace)`

```js
import { findAndReplace } from 'find-and-replace-anything'

findAndReplace({deep: {nested: {prop: 'a'}}}, 'a', 'b')
  // returns
  {deep: {nested: {prop: 'b'}}}

findAndReplace('works on "exact" strings as well', 'a', 'b')
  // returns
  'works on "exact" strings as well'

findAndReplace('a', 'a', 'b')
  // returns
  'b'

// works with other types as well:
findAndReplace({nr: 1}, 1, 100)
  // returns
  {nr: 100}
```

## find and replace IF

This will execute a provided function to every prop in the object recursively. The "check" function provided will receive the prop's value as param:

- `findAndReplaceIf(object, checkFn)` checkFn receives each `propVal` of the object recursively

```js
import { findAndReplaceIf } from 'find-and-replace-anything'

// function that replaces 'a' with 'b'
function checkFn (foundVal) {
  if (foundVal === 'a') return 'b'
  return foundVal
  // always return original foundVal when no replacement occurs
}

findAndReplaceIf({deep: {nested: {prop: 'a'}}}, checkFn)
  // returns
  {deep: {nested: {prop: 'b'}}}

  // this is what gets executed in order:
  checkFn({deep: {nested: {prop: 'a'}}})
  checkFn({nested: {prop: 'a'}})
  checkFn({prop: 'a'})
  checkFn('a')
  // the final execution replaces 'a' with 'b'
  // and then returns the entire object

// also works on non-objects
findAndReplace('a', checkFn)
  // returns
  'b'
```

## A note on plain objects vs classes

> only for `findAndReplace()`

Please note that it will also recursively look inside special objects like JavaScript classes etc. So make sure you test the behaviour properly in those cases! (especially when your classes have read-only properties etc.)

```js
class MyClass {
  constructor () {
    this.prop = 1
  }
}
const target = {
  prop: 1,
  class: new MyClass()
}
findAndReplace(target, 1, 2)
  // this will replace 1 with 2 in the class as well and returns:
  {prop: 2, class: {prop: 2}}
```

If you need it to only recursively go through plain JavaScript object and avoid going in custom classes etc. you can pass a 4th parameter like so:

```js
findAndReplace(target, 1, 2, {onlyPlainObjects: true})
  // this will replace 1 with 2 only in the plain object and returns:
  {prop: 2, class: {prop: 1}}
```

> Also be careful with circular references! It will cause this library to crash.

## Source code

It's literally just this:

```js
/**
 * @param {*} target Target can be anything
 * @param {*} find val to find
 * @param {*} replaceWith val to replace
 * @returns the target with replaced values
 */
function findAndReplaceRecursively (target, find, replaceWith) {
  if (!isObject(target)) {
    if (target === find) return replaceWith
    return target
  }
  return Object.keys(target)
    .reduce((carry, key) => {
      const val = target[key]
      carry[key] = findAndReplaceRecursively(val, find, replaceWith)
      return carry
    }, {})
}
```

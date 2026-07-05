---
repo: DiegoZoracKy/for-each-property-deep
url: 'https://github.com/DiegoZoracKy/for-each-property-deep'
homepage: null
starredAt: '2022-12-21T02:23:48Z'
createdAt: '2017-05-28T22:57:06Z'
updatedAt: '2023-09-08T17:25:39Z'
language: JavaScript
license: NA
branch: master
stars: 4
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:00:02.243Z'
description: >-
  Executes a callback for each property found on a object, recursively on nested
  properties, with options regarding enumerability (enumerable or
  non-enumerable) and ownership (inherited or only own properties). It excludes
  built-in properties from Object and Function prototypes by default, and this
  behaviour can also be configured via options.
tags: []
---

# for-each-property-deep

[![Build Status](https://api.travis-ci.org/DiegoZoracKy/for-each-property-deep.svg)](https://travis-ci.org/DiegoZoracKy/for-each-property-deep)

Executes a callback for each property found on a object, recursively on nested properties, with options regarding **enumerability** (enumerable or non-enumerable) and **ownership** (inherited or only own properties). It excludes built-in properties from Object and Function prototypes by default, and this behaviour can also be configured via options.

## Goal

The goal is to provide a way to iterate through object's properties with a clean interface regarding **enumerability** and **ownership**, e.g. `{ enumerability: 'enumerable', inherited: true }`. Also, discarding (or not, is an option) the built-in properties that may be found when looking up on the prototype-chain.

This module is the recursive version, which will traverse object's nested properties, of [for-each-property](https://github.com/DiegoZoracKy/for-each-property).

## Usage

```javascript

const forEachPropertyDeep = require('for-each-property-deep');

const object = { a: { b: { c: 'cValue'} } };
const callback = (value, key, path, parent, state) => console.log(key, path);
const options = {enumerability: 'enumerable', inherited: false};

const resultState = forEachPropertyDeep(object, callback, options);

// All outputs (console.log) from callback will be:
// a [ 'a' ]
// b [ 'a', 'b' ]
// c [ 'a', 'b', 'c' ]
```
 **object**:
 Literal object, Object Instance, Class Reference... Any object whose properties can be iterated on.

 **callback**:
 Function that will receive `(value, key, path, parent, state)`.

 * **value**
 Current property value

 * **key**
 Current property name

 * **path**
 An array representing the current property path. e.g. from the above example it will be `[ 'a', 'b', 'c' ]` for the `'c'` property

 * **parent**
 The parent object of the current property. e.g. from the above example it will be the object `{ c: 'cValue' }` for the `'c'` property

 * **state**
 Is an object that will be stateful throughall iterations, and it will be the value returned by calling `forEachPropertyDeep`. It can be useful to handle any data from within the callback function, instead of relying on external variables. e.g., to store and get all the *paths* found.

 **options**:
 * **enumerability**:
 The options are: `'enumerable'` *(default)*, `'nonenumerable'` or `'all'`

 * **inherited**:
 The options are: `true` *(default)* or `false`

 * **excludeBuiltInPropsOf**:
 An array of objects whose prototype properties must be excluded. It defaults to `[Function, Object]`

 * **excludeProps**:
 An array properties that must be excluded. The default is `['prototype']`

## Example

To check an extended example on use cases regarding **enumerability** and **ownership** check [for-each-property#example](https://github.com/DiegoZoracKy/for-each-property#example).

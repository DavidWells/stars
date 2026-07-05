---
repo: moondef/constantie
url: 'https://github.com/moondef/constantie'
homepage: ''
starredAt: '2019-09-13T22:40:31Z'
createdAt: '2019-09-09T08:26:08Z'
updatedAt: '2023-01-28T05:31:00Z'
language: JavaScript
license: MIT
branch: master
stars: 16
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:25.129Z'
description: A tiny JavaScript library for creation of fully immutable objects and arrays
tags:
  - immutable
  - immutable-objects
---

# constantie
## A tiny JavaScript library for creation of fully immutable objects and arrays

### API
```js
Constantie(object || array)
```

### Installation
```bash
yarn add constantie
```

### Usage
```js
const Constantie = require("constantie");

const obj = Constantie({a: 1, b: 2, c: 3});
const arr = Constantie([1, 2, 3]);

obj.d = 4; // Error! You can't change properties of this object

Object.defineProperty(obj, "d", {
  value: 4,
  writable: true,
  enumerable: true,
  configurable: true
}); // Error! You can't change properties of this object

arr.push(4); // Error! You can't change elements of this array
```

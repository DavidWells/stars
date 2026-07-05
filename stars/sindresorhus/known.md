---
repo: sindresorhus/known
url: 'https://github.com/sindresorhus/known'
homepage: ''
starredAt: '2018-03-13T18:00:10Z'
createdAt: '2015-01-30T06:12:16Z'
updatedAt: '2025-01-07T20:11:04Z'
language: JavaScript
license: MIT
branch: main
stars: 86
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:25.624Z'
description: Allow only access to known object properties using ES2015 Proxy
tags:
  - es2015-proxy
  - nodejs
  - npm-package
  - object-property
---

# known

> Allow only access to known object properties using [ES2015 `Proxy`](https://ponyfoo.com/articles/es6-proxies-in-depth)

## Install

```
$ npm install known
```

## Usage

```js
import known from 'known';

const object = {foo: true};

console.log(object.bar);
//=> undefined

const object2 = known(object);

// Throws a TypeError when you try to access an unknown property
console.log(object2.bar);
//=> [TypeError] Unknown property: bar
```

Note that `known` transparently wraps the given object, meaning prototype properties will also exist. So `known(someObject).__proto__` does not throw. If you want non-own properties to throw, ensure your object is created with `Object.create(null)`.

## Related

- [on-change](https://github.com/sindresorhus/on-change) - Watch an object or array for changes (Uses `Proxy` too)
- [negative-array](https://github.com/sindresorhus/negative-array) - Negative array index support (Uses `Proxy` too)

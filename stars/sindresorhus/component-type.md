---
repo: sindresorhus/component-type
url: 'https://github.com/sindresorhus/component-type'
homepage: null
starredAt: '2017-07-19T05:28:55Z'
createdAt: '2012-08-30T15:48:16Z'
updatedAt: '2025-02-12T21:42:26Z'
language: JavaScript
license: MIT
branch: main
stars: 76
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:43.784Z'
description: Type assertions aka less-broken `typeof`
tags: []
---

# component-type

> Type assertions aka less-broken `typeof`

## Install

```sh
npm install component-type
```

## Usage

```js
import type from 'component-type';

const date = new Date();

console.log(type(date));
//=> 'date'
```

## API

```js
type(new Date) === 'date'
type({}) === 'object'
type(null) === 'null'
type(undefined) === 'undefined'
type('hey') === 'string'
type(true) === 'boolean'
type(false) === 'boolean'
type(12) === 'number'
type(type) === 'function'
type(/asdf/) === 'regexp'
type((function(){ return arguments })()) === 'arguments'
type([]) === 'array'
type(document.createElement('div')) === 'element'
type(NaN) === 'nan'
type(new Error('Oh noes')) === 'error'
type(new Buffer) === 'buffer'
```

It makes no guarantees about the correctness when fed untrusted user-input.

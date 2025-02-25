---
repo: lukeed/salteen
url: 'https://github.com/lukeed/salteen'
homepage: null
starredAt: '2019-10-06T23:29:32Z'
createdAt: '2019-03-24T23:26:12Z'
updatedAt: '2023-04-29T04:44:51Z'
language: JavaScript
license: MIT
branch: master
stars: 95
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:16.926Z'
description: >-
  A snappy and lightweight (259B) utility to encrypt and decrypt values with
  salt.
tags: []
---

# salteen [![Build Status](https://badgen.now.sh/travis/lukeed/salteen)](https://travis-ci.org/lukeed/salteen)

> A snappy and lightweight (259B) utility to encrypt and decrypt values with salt.

Both `encrypt` and `decrypt` are factory functions that accept a `salt` key and return new functions to be called with the unique value(s) to handle. This allows you reuse instances across multiple values.

This module is available in three formats:

* **CommonJS**: `dist/salteen.js`
* **ESModule**: `dist/salteen.mjs`
* **UMD**: `dist/salteen.min.js`


## Install

```
$ npm install --save salteen
```


## Usage

```js
const { encrypt, decrypt } = require('salteen');

const MY_SALT = 'foobar'; // PS: the longer the better

const encoder = encrypt(MY_SALT);
const decoder = decrypt(MY_SALT);

['hello', 'world'].map(encoder);
//=> ['7f727b7b78', '6078657b73']

['7f727b7b78', '6078657b73'].map(decoder);
//=> ['hello', 'world']
```


## API

### encrypt(salt)
Returns: `Function`

Returns a new `Function` which will accept a `value<String>` to be encrypted, using `salt` as the salting value.

#### salt
Type: `String`

The salting value to be used – longer salts are more secure.

### decrypt(salt)
return `Function`

Returns a new `Function` which will accept a `value<String>` to be decrypted, using `salt` as the salting value.

#### salt
Type: `String`

The salting value to be used – longer salts are more secure.


## Benchmarks

> Results below are with Node v11.11.0

```
encrypt  x 281,299 ops/sec ±0.66% (97 runs sampled)
decrypt  x 383,827 ops/sec ±1.81% (90 runs sampled)
```


## License

MIT © [Luke Edwards](https://lukeed.com)

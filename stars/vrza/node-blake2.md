---
repo: vrza/node-blake2
url: 'https://github.com/vrza/node-blake2'
homepage: ''
starredAt: '2022-01-06T22:35:00Z'
createdAt: '2015-05-09T22:15:41Z'
updatedAt: '2025-01-17T12:19:27Z'
language: C
license: NOASSERTION
branch: master
stars: 60
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:22.812Z'
description: >-
  All four BLAKE2 variants (blake2b, blake2bp, blake2s, blake2sp) with stream
  support for Node.js
tags:
  - blake2
  - hash
  - hashing
---

# node-blake2

[![NPM version][npm-image]][npm-url]
[![Build status][github-actions-image]][github-actions-url]

Why BLAKE2 for hashing? "BLAKE2 is a cryptographic hash function **faster than MD5, SHA-1, SHA-2, and SHA-3**, yet is at least as secure as the latest standard SHA-3. BLAKE2 has been [adopted](https://www.blake2.net/#us) by many projects due to its high speed, security, and simplicity." [https://blake2.net/](https://blake2.net/)

node-blake2 provides a [stream](https://nodejs.org/api/stream.html)-compatible
blake2b, blake2bp, blake2s, and blake2sp `Hash` and `KeyedHash` for Node.js.

node-blake2 has been tested to work with the following compilers and platforms:

| Compiler                          | Operating System            | Architecture             |
|-----------------------------------|-----------------------------|--------------------------|
| GCC 8.3.0, 10.2.0, 11.2.0, 12.2.1 | GNU/Linux Gentoo            | x86_64                   |
| LLVM clang 11.1.0, 13.0.0, 15.0.7 | GNU/Linux Gentoo            | x86_64                   |
| GCC 5.4.0                         | GNU/Linux Ubuntu 16.04      | x86_64                   |
| LLVM clang 11.1.0                 | OpenBSD 7.0                 | x86_64                   |
| Apple LLVM clang 9.1.0            | macOS 10.13                 | x86_64                   |
| Visual Studio 2019                | Windows 11                  | x86_64                   |
| Visual Studio 2015                | Windows 10                  | x86_64                   |
| GCC 10.2.1                        | GNU/Linux RPi OS 2021-10-30 | armv7l Cortex-A53 RPi 3  |
| GCC 10.2.1                        | GNU/Linux Debian 11.2       | aarch64 Cortex-A57 QEMU  |
| GCC 9.3.0                         | GNU/Linux Ubuntu 20.04      | aarch64 Cortex-A72 RPi 4 |
| Apple LLVM clang 12.0.5           | macOS 12                    | aarch64 Apple M1         |

## Prerequisites for building on Windows

[Visual Studio Build Tools](https://github.com/felixrieseberg/windows-build-tools).

Python is required by [node-gyp](https://github.com/nodejs/node-gyp).

The Node.js Windows installer can automatically install Python and Visual Studio build tools.

## Install

In your project, run:

```sh
npm install blake2 --save
```

or install from the GitHub repo:

```sh
npm install vrza/node-blake2 --save
```

## Examples

### Unkeyed BLAKE2b

```js
var blake2 = require('blake2');
var h = blake2.createHash('blake2b');
h.update(Buffer.from("test"));
console.log(h.digest("hex"));
```

`blake2.createHash` works like node's
[`crypto.createHash`](https://nodejs.org/api/crypto.html#crypto_crypto_createhash_algorithm_options).

### Keyed BLAKE2b

```js
var blake2 = require('blake2');
var h = blake2.createKeyedHash('blake2b', Buffer.from('key - up to 64 bytes for blake2b, 32 for blake2s'));
h.update(Buffer.from("test"));
console.log(h.digest("hex"));
```

`blake2.createKeyedHash` takes a key argument like
[`crypto.createHmac`](https://nodejs.org/api/crypto.html#crypto_crypto_createhmac_algorithm_key_options).
Although it is not an HMAC, a keyed hash serves the same purpose.

### Important notes

- `blake2.create{Hash,KeyedHash}` support algorithms `blake2b`, `blake2bp`, `blake2s`, and `blake2sp`.
- Data passed to `.update` on `blake2.{Hash,KeyedHash}` must be a `Buffer`.
- Keys passed to `blake2.createKeyedHash(algo, key)` must be a `Buffer`.
- Just as with `crypto.Hash`, `.digest()` can only be called once.

### With streams

This works exactly like it does with [`crypto.Hash`](https://nodejs.org/api/crypto.html#crypto_crypto_createhash_algorithm_options).  See [b2sum.js](https://github.com/vrza/node-blake2/blob/master/b2sum.js).

### Custom digest length

BLAKE2 can generate digests between 1-64 bytes for BLAKE2b and 1-32 bytes for
BLAKE2s.  Pass `digestLength` as an option to use a digest shorter than the
default (maximum length):

```js
var blake2 = require('blake2');
var h = blake2.createHash('blake2b', {digestLength: 16});
h.update(Buffer.from("test"));
h.digest(); // Returns a Buffer with 16 bytes
```

or with a key:

```js
var blake2 = require('blake2');
var h = blake2.createKeyedHash('blake2b', Buffer.from('my key'), {digestLength: 16});
h.update(Buffer.from("test"));
h.digest(); // Returns a Buffer with 16 bytes
```

Note that BLAKE2 will generate completely different digests for shorter digest
lengths; they are not simply a slice of the default digest.

### Copying a hash object

You can call `.copy()` on a `Hash` or `KeyedHash`, which will return a new object with all of the internal BLAKE2 state copied from the source object.

```js
var blake2 = require('blake2');
var h = blake2.createHash('blake2b');
h.update(Buffer.from("test"));

// Call .copy() before .digest(), because .digest() finalizes internal state
var j = h.copy();

// h is unaffected by updates to j
j.update(Buffer.from("more"));

console.log(h.digest());
console.log(j.digest());
```

## Known issues

- On Windows, node-blake2 requires enabling AVX instructions as a workaround for the way the upstream build preprocessor detects support for SSE2.

[npm-image]: https://img.shields.io/npm/v/blake2.svg
[npm-url]: https://npmjs.org/package/blake2
[github-actions-image]: https://github.com/vrza/node-blake2/actions/workflows/build.yml/badge.svg
[github-actions-url]: https://github.com/vrza/node-blake2/actions

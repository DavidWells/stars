---
repo: github/tweetsodium
url: 'https://github.com/github/tweetsodium'
homepage: null
starredAt: '2022-01-06T22:31:48Z'
createdAt: '2018-09-17T16:39:05Z'
updatedAt: '2024-12-24T21:13:40Z'
language: JavaScript
license: MIT
branch: main
stars: 44
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:23.021Z'
description: libsodium sealed cryptobox using tweetnacl
tags: []
---

# ⚠️ `tweetsodium` is deprecated and unmaintained ⚠️

Consider using [`libsodium.js`](https://github.com/jedisct1/libsodium.js), maintained by the same author as `libsodium`. For example:

```js
import libsodium from "libsodium-wrappers";

// Compatible with the same `Uint8Array` arguments as `tweetsodium.seal()`
async function async_encrypt(messageBytes, publicKey) {
  await libsodium.ready;
  return libsodium.crypto_box_seal(messageBytes, publicKey);
}

// Compatible with the same `Uint8Array` arguments as `tweetsodium.sealOpen()`
async function async_decrypt(messageBytes, publicKey, privateKey) {
  await libsodium.ready;
  return libsodium.crypto_box_seal_open(messageBytes, publicKey, privateKey);
}
```

Or if you are able to use top-level await:

```js
import libsodium from "libsodium-wrappers";
await libsodium.ready;

// Use:
// - `libsodium.crypto_box_seal` instead of `tweetsodium.seal`
// - `libsodium.crypto_box_seal_open` instead of `tweetsodium.sealOpen`
```

<br>
<br>
<br>

---

<br>
<br>
<br>

# tweetsodium [![Build Status](https://travis-ci.org/mastahyeti/tweetsodium.svg?branch=master)](https://travis-ci.org/mastahyeti/tweetsodium)

This library implements [libsodium's sealed boxes](https://download.libsodium.org/doc/public-key_cryptography/sealed_boxes) using the [tweetnacl-js](https://github.com/dchest/tweetnacl-js) and [blakejs](https://github.com/dcposch/blakejs) libraries.

## Usage

```javascript
const nacl = require("tweetnacl");
const sodium = require("tweetsodium");

// generate public key to use for encryption and coresponding secret key to use
// for decryption
const keyPair = nacl.box.keyPair();

// encrypts message string using public key
function encrypt(message) {
  const encoder = new TextEncoder();
  const messageBytes = encoder.encode(message);

  return sodium.seal(messageBytes, keyPair.publicKey);
}

// decrypts message using secret key
function decrypt(ciphertext) {
  const encoder = new TextEncoder();
  const ciphertextBytes = encoder.encode(ciphertext);

  return sodium.sealOpen(ciphertextBytes, keyPair.publicKey, keyPair.secretKey);
}
```

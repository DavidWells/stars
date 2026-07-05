---
repo: hokaccha/node-jwt-simple
url: 'https://github.com/hokaccha/node-jwt-simple'
homepage: ''
starredAt: '2017-12-27T20:08:46Z'
createdAt: '2012-01-24T05:04:37Z'
updatedAt: '2025-02-02T22:14:04Z'
language: JavaScript
license: MIT
branch: master
stars: 1362
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:33.275Z'
description: JWT(JSON Web Token) encode and decode module for node.js
tags: []
---

# jwt-simple

[JWT(JSON Web Token)](http://self-issued.info/docs/draft-jones-json-web-token.html) encode and decode module for node.js.

## Install

    $ npm install jwt-simple

## Usage

```javascript
let jwt = require('jwt-simple');
let payload = { foo: 'bar' };
let secret = 'xxx';

// HS256 secrets are typically 128-bit random strings, for example hex-encoded:
// let secret = Buffer.from('fe1a1915a379f3be5394b64d14794932', 'hex')

// encode
let token = jwt.encode(payload, secret);

// decode
let decoded = jwt.decode(token, secret);
console.log(decoded); //=> { foo: 'bar' }
```

### decode params

```javascript
/*
 * jwt.decode(token, key, noVerify, algorithm)
 */

// decode, by default the signature of the token is verified
let decoded = jwt.decode(token, secret);
console.log(decoded); //=> { foo: 'bar' }

// decode without verify the signature of the token,
// be sure to KNOW WHAT ARE YOU DOING because not verify the signature
// means you can't be sure that someone hasn't modified the token payload
let decoded = jwt.decode(token, secret, true);
console.log(decoded); //=> { foo: 'bar' }

// decode with a specific algorithm (not using the algorithm described in the token payload)
let decoded = jwt.decode(token, secret, false, 'HS256');
console.log(decoded); //=> { foo: 'bar' }
```

### Algorithms

By default the algorithm to encode is `HS256`.

The supported algorithms for encoding and decoding are `HS256`, `HS384`, `HS512` and `RS256`.

```javascript
// encode using HS512
jwt.encode(payload, secret, 'HS512')
```

---
repo: nak2k/node-json-thumbprint
url: 'https://github.com/nak2k/node-json-thumbprint'
homepage: ''
starredAt: '2024-12-27T20:29:43Z'
createdAt: '2016-08-24T15:34:55Z'
updatedAt: '2024-12-27T20:29:44Z'
language: JavaScript
license: NA
branch: master
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:53:35.382Z'
description: The thumbprint of a JSON
tags: []
---

# json-thumbprint

The thumbprint of a JSON based on [RFC 7638 - JSON Web Key (JWK) Thumbprint](https://tools.ietf.org/html/rfc7638).

## Installation

``` bash
npm install json-thumbprint
```

## Example

``` js
const { thumbprint } = require('json-thumbprint');

const json = { x: 1, y: 2 };

const result = thumbprint(json, { algorithm: 'sha256', encoding: 'hex' });
```

## API

### thumbprint(json, options)

This function computes the thumbprint of the specified object.

___Arguments___

* `json` - An object to obtain a thumbprint.
* `options.algorithm` - A hash algorithm to compute a thumbprint.
    This option passes the `crypto.createHash` function in node.js.
* `options.encoding` - An encoding to return a computed thumbprint.
    This option passes the `hash.digest` method in node.js.

## License

MIT

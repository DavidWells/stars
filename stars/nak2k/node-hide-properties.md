---
repo: nak2k/node-hide-properties
url: 'https://github.com/nak2k/node-hide-properties'
homepage: ''
starredAt: '2024-12-27T20:31:34Z'
createdAt: '2017-09-17T01:14:18Z'
updatedAt: '2024-12-27T20:31:35Z'
language: JavaScript
license: NA
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:53:35.273Z'
description: Hide properties of an object
tags: []
---

# hide-properties

Hide properties of an object.

## Installation

```
npm i hide-properties -S
```

## Usage

``` javascript
const { hideProperties } = require('hide-properties');

const obj = { a: 1, b: 2, c: 3 };

console.log(obj);
// => { a: 1, b: 2, c: 3 }

hideProperties(obj, ['a', 'c']);

console.log(obj);
// => { b: 2 }
```

## License

MIT

---
repo: ndhoule/clone
url: 'https://github.com/ndhoule/clone'
homepage: null
starredAt: '2017-07-05T19:33:43Z'
createdAt: '2016-05-09T23:09:22Z'
updatedAt: '2018-09-25T02:33:30Z'
language: JavaScript
license: MIT
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:44.153Z'
description: Deeply clone an object.
tags: []
---

# clone [![CI][ci-badge]][ci-link]

Deeply clones a source object.

## Installation

```sh
$ npm install @ndhoule/clone
```

## API

### `clone(target : *)` => *

Deeply copies an input object.

```javascript
var a = { a: 1 };
var cloned = clone(a);

console.log(cloned); //=> { a: 1 }
console.log(cloned === a); //=> false
```

## Acknowledgements

Based on [component/clone](https://github.com/component/clone).

## License

Released under the [MIT license](LICENSE.md).

[ci-link]: https://travis-ci.org/ndhoule/clone
[ci-badge]: https://travis-ci.org/ndhoule/clone.svg?branch=master

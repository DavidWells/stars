---
repo: timoxley/offset
url: 'https://github.com/timoxley/offset'
homepage: ''
starredAt: '2016-07-26T23:31:33Z'
createdAt: '2012-10-25T05:18:22Z'
updatedAt: '2023-08-27T04:04:40Z'
language: JavaScript
license: MIT
branch: master
stars: 59
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:20.439Z'
description: Get offset of an element within the document
tags: []
---

# document-offset

Get offset of a DOM Element or Range within the document.

## Installation

```
$ npm install document-offset
```

### [component(1)](http://component.io):

```
$ component install timoxley/offset
```

## API

### offset(el)

Get offset of an element within the document (relative to the top left
of the document).

Example:

```js
var offset = require('document-offset')
var target = document.getElementById('target')
console.log(offset(target))
// => {top: 69, left: 108}
```

## Credit

Code adapted from jQuery.

## License

MIT

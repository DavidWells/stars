---
repo: mafintosh/tiny-byte-size
url: 'https://github.com/mafintosh/tiny-byte-size'
homepage: null
starredAt: '2022-08-24T17:32:22Z'
createdAt: '2022-08-18T19:12:57Z'
updatedAt: '2024-02-08T03:21:49Z'
language: JavaScript
license: MIT
branch: master
stars: 19
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:37.125Z'
description: 'Dead simple, single file, tiny byte formatter'
tags: []
---

# tiny-byte-size

Dead simple, no configuration needed, tiny byte formatter

```
npm install tiny-byte-size
```

## Usage

``` js
const byteSize = require('tiny-byte-size')

console.log(byteSize(100)) // 100B
console.log(byteSize(1000)) // 1kB
console.log(byteSize(1100)) // 1.1kB
console.log(byteSize(10101010)) // 10.1MB
console.log(byteSize.perSecond(10101010)) // 10.1MB/s
console.log(byteSize.perSecond(10101010, 500)) // 20.2MB/s
```

## License

MIT

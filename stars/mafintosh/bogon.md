---
repo: mafintosh/bogon
url: 'https://github.com/mafintosh/bogon'
homepage: null
starredAt: '2021-04-07T00:52:15Z'
createdAt: '2021-04-06T21:37:58Z'
updatedAt: '2024-04-02T12:08:49Z'
language: JavaScript
license: MIT
branch: master
stars: 34
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:53.052Z'
description: Check if an IP is a bogon
tags: []
---

# bogon

Check if an IP is a bogon

```
npm install bogon
```

https://ipinfo.io/bogon


## Usage

``` js
const bogon = require('bogon')

console.log(bogon('192.168.0.1')) // true
console.log(bogon('8.8.8.8')) // false
```

As a utility it also exposes an `isPrivate` helper
to detect if a bogon IP is a private IP address on a local network.

``` js
console.log(bogon.isPrivate('192.168.0.1')) // true
console.log(bogon('224.0.1.1')) // true
console.log(bogon.isPrivate('224.0.1.1')) // false
```

## License

MIT

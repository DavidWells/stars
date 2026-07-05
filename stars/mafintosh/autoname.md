---
repo: mafintosh/autoname
url: 'https://github.com/mafintosh/autoname'
homepage: null
starredAt: '2021-01-22T21:52:34Z'
createdAt: '2021-01-22T21:46:30Z'
updatedAt: '2021-02-08T19:43:26Z'
language: JavaScript
license: MIT
branch: master
stars: 18
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:05.349Z'
description: Auto naming of objects for easier debugging
tags: []
---

# autoname

Auto naming of objects for easier debugging.

```
npm install autoname
```

## Usage

``` js
const autoname = require('autoname')

autoname(someObject) // ClassName#id
autoname(someObject) // <same as above>
autoname(another) // AnotherClass#id
```

All state is stored in a WeakMap so nothing is modified, so you could
probably use this in an production env.

## License

MIT

---
repo: mafintosh/fd-lock
url: 'https://github.com/mafintosh/fd-lock'
homepage: null
starredAt: '2019-02-03T02:05:34Z'
createdAt: '2019-01-23T12:19:07Z'
updatedAt: '2025-02-11T15:50:53Z'
language: JavaScript
license: MIT
branch: master
stars: 37
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:48.694Z'
description: Advisory cross-platform lock on a file using a file descriptor to it.
tags: []
---

# fd-lock

Advisory cross-platform lock on a file using a file descriptor to it.

```
npm install fd-lock
```

## Usage

``` js
const lock = require('fd-lock')

// Can we lock the file using the fd?
console.log(lock(fd))
```

## API

#### `bool = lock(fd)`

Try to lock access to a file using a file descriptor.
Returns true if the file could be locked, false if not.

Note that the lock is only advisory and there is nothing stopping someone from accessing the file by simply ignoring the lock.

Works across processes as well.

#### `bool = lock.unlock(fd)`

Unlocks a file if you have the lock.

## License

MIT

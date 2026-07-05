---
repo: taylorhakes/localstorage-lock
url: 'https://github.com/taylorhakes/localstorage-lock'
homepage: null
starredAt: '2020-01-07T19:43:43Z'
createdAt: '2017-12-26T01:55:17Z'
updatedAt: '2023-01-24T14:19:03Z'
language: JavaScript
license: MIT
branch: master
stars: 9
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:09.266Z'
description: Generic localstorage lock implementation
tags: []
---

# localstorage-lock
Generic localstorage lock implementation

## API
### runWithLock
Run a specified code block with a localstorage lock

**`runWithLock(<localstorage key>, <fn to run>, <options>);`**

Options:
```js
{
  timeout: 1000, // Time release the lock if function fails or takes too long
  lockWriteTime: 50, // Expected time to write to localstorage (unlikely to change)
  checkTime: 10, // How often to recheck the lock, if don't have the lock
  retry: true // Retry getting the lock, if not acquired
}
```

#### Example Use
```js

// Make sure only one browser window retrieves a localstorage key and does console.log
runWithLock('lock.some-key', () => {
  
  const someKey = localStorage.getItem('some-key');
  console.log(someKey)
  localStorage.removeItem('some-key')
}, { timeout: 500 });
```

### tryRunWithLock
Wrapper function for `tryWithLock` with option `retry: false`

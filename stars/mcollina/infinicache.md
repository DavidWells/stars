---
repo: mcollina/infinicache
url: 'https://github.com/mcollina/infinicache'
homepage: null
starredAt: '2021-07-16T16:49:13Z'
createdAt: '2021-07-15T16:28:09Z'
updatedAt: '2023-03-06T18:37:19Z'
language: JavaScript
license: MIT
branch: main
stars: 53
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:50.818Z'
description: null
tags: []
---

# infinicache

A cache for Node.js that can use all available system memory without crashing.
It's based on `WeakRef` and `FinalizationRegistry`.

## Install

```bash
npm i infinicache
```

## Usage

```js
import Cache from 'infinicache'
import { promisify } from 'util'

const immediate = promisify(setImmediate)

const cache = new Cache({
  ttl: 5 // seconds
})

// Create a scope so that obj goes
// out of scope
{
  const obj = { foo: 'bar' }
  cache.set('hello', obj)
  console.log(cache.get('hello'))
}

await immediate()

// We need to allocate a bazillion amount of objects
// to trigger a GC
const data = []
for (let i = 0; i < 1000000; i++) {
  data.push({ i })
}

console.log(cache.get('hello'))
```

Note that this Cache is slower than most LRU caches. If you are looking for an LRU cache,
use [mnemonist `LRUCache`](https://yomguithereal.github.io/mnemonist/lru-cache.html).

## License

MIT

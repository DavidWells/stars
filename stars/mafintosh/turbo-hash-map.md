---
repo: mafintosh/turbo-hash-map
url: 'https://github.com/mafintosh/turbo-hash-map'
homepage: null
starredAt: '2022-03-23T02:52:42Z'
createdAt: '2022-01-17T13:25:22Z'
updatedAt: '2025-02-11T15:51:33Z'
language: JavaScript
license: MIT
branch: master
stars: 38
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:54.289Z'
description: >-
  Fast Map built for keys that are always fixed size uniformly distributed
  buffers.
tags: []
---

# turbo-hash-map

Fast Map built for keys that are always fixed size uniformly distributed buffers.

```
npm install turbo-hash-map
```

Uses a prefix trie to map hashes to values in an effectice manner.

## Usage

``` js
const HashMap = require('turbo-hash-map')

const map = new HashMap()

map.set(hash('hello world'), 'a value')

function hash (val) { // any hash algo without practical collisions will work
  return crypto.createHash('sha256').update(val).digest()
}
```

## API

#### `const m = new HashMap()`

Create a new HashMap. The HashMap follows the api of a JS map, except keys are buffers containing hashes.

#### `m.set(hash, value)`

Insert a value with a hash as the key. Hash should be a fixed size buffer.

#### `const value = m.get(hash)`

Get the value out. Returns `undefined` if the value cannot be found.

#### `const bool = m.has(hash)`

Does the map have it?

#### `const deleted = m.delete(hash)`

Delete an entry.

#### `m.size`

How many entries?

#### `m.clear()`

Delete all entries.

#### `...m`

Iterate the map. Yields arrays of `[hash, value]`.

#### `...m.keys()`

Key (hash) iterator.

#### `...m.values()`

Value iterator.

## Performance

There is a bench included. On my macbook this yields

```
turbo-hash-map-set: 2.068s
turbo-hash-map-get: 1.931s
js-map-set: 16.078s
js-map-get: 6.626s
```

## License

MIT

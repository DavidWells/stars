---
repo: barelyhuman/uvu-inline-snapshot
url: 'https://github.com/barelyhuman/uvu-inline-snapshot'
homepage: ''
starredAt: '2025-01-14T19:32:38Z'
createdAt: '2023-10-02T12:31:31Z'
updatedAt: '2025-01-14T19:32:39Z'
language: JavaScript
license: MIT
branch: main
stars: 4
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:14.760Z'
description: 'Minimal Inline Snapshot utility for uvu/assert http://github.com/lukeed/uvu'
tags:
  - inline
  - snapshot
  - snapshot-testing
  - testing
  - uvu
---

# uvu-inline-snapshot

> Minimal Inline Snapshot utility for uvu/assert

### Limitations 
- Not tested enough with Typescript to confirm that it works with it. 

### Installation

```sh
npm i uvu uvu-inline-snapshot
```

### Usage

```js
const { test } = require('uvu')
const { inlineSnapshot } = require('uvu-inline-snapshot')

const add = (x, y) => x + y

test('example 1', async () => {
  await inlineSnapshot(add(1, 2), '')
})

test.run()

// --------------------
// will be converted to
const { test } = require('uvu')
const { inlineSnapshot } = require('uvu-inline-snapshot')

const add = (x, y) => x + y

test('example 1', async () => {
  await inlineSnapshot(add(1, 2), '3') // Filled for you
})

test.run()
```

To update multiple snapshots, just run the tests with `UVU_SNAPSHOTS=1` 

```sh
; UVU_SNAPSHOTS=1 uvu 
```

## License

[MIT](/LICENSE)

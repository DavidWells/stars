---
repo: holepunchto/ready-resource
url: 'https://github.com/holepunchto/ready-resource'
homepage: null
starredAt: '2022-09-12T16:58:16Z'
createdAt: '2022-09-12T11:21:06Z'
updatedAt: '2025-02-13T22:31:55Z'
language: JavaScript
license: MIT
branch: main
stars: 17
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:31.643Z'
description: Modern single resource management
tags: []
---

# ready-resource

Modern single resource management

```
npm install ready-resource
```

## Usage

``` js
const ReadyResource = require('ready-resource')

class Thing extends ReadyResource {
  constructor () {
    super()
  }

  async _open () {
    // open the resource
  }

  async _close () {
    // close the resource
  }
}

const r = new Thing()

await r.ready() // calls _open once
await r.ready() // noop

await r.close() // calls _close after _open has finished
await r.close() // noop
```

## License

MIT

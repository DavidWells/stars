---
repo: shigma/prochain
url: 'https://github.com/shigma/prochain'
homepage: ''
starredAt: '2021-12-01T06:18:45Z'
createdAt: '2021-04-24T07:02:31Z'
updatedAt: '2024-09-06T10:17:10Z'
language: TypeScript
license: MIT
branch: main
stars: 21
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:32.643Z'
description: Proxified Promise Chain in JavaScript
tags:
  - chain
  - javascript
  - promise
  - proxy
  - typescript
---

# prochain

Proxified Promise Chain in JavaScript.

It allows for method and property chaining without need for intermediate then() or await for cleaner and simpler code.

```js
const { wrap } = require('prochain')
 
// Instead of thens
fetch(url)
  .then(res => res.json())
  .then(json => json.foo.bar)
  .then(value => console.log(value))

// Instead of awaits
const res = await fetch(url)
const json = await res.json()
const value = json.foo.bar
console.log(value)

// With prochain
const value = await wrap(fetch(url)).json().foo.bar
console.log(value)

// Or you can even create a wrapped fetch
const wrapFetch = wrap(fetch)
const value = await wrapFetch(url).json().foo.bar
console.log(value)
```

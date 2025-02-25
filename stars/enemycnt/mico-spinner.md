---
repo: enemycnt/mico-spinner
url: 'https://github.com/enemycnt/mico-spinner'
homepage: ''
starredAt: '2021-11-30T02:48:38Z'
createdAt: '2021-06-15T19:12:13Z'
updatedAt: '2022-02-13T12:37:40Z'
language: JavaScript
license: MIT
branch: main
stars: 42
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:33.397Z'
description: Minimal spinner for Node.js.
tags: []
---

# mico-spinner

<img src="./terminal-screenshot.svg" alt="screenshot">


Minimalistic spinner for Node.js.

* Only single dependency ([Pico Colors](https://github.com/alexeyraspopov/picocolors)) without sub-dependencies. In contrast, `ora` has [30 sub-dependencies](https://npm.anvaka.com/#/view/2d/ora).
* Detects Unicode and color support in terminal.

## Usage

```js
let micoSpinner = require('mico-spinner')

let spinner = micoSpinner('Long task').start()
try {
  await longTask()
  spinner.succeed()
} catch (e) {
  spinner.fail()
  console.error(e.stack)
}
```

### Similar projects
- [Nano Spinner](https://github.com/usmanyunusov/nanospinner)

---
repo: jamiebuilds/spawndamnit
url: 'https://github.com/jamiebuilds/spawndamnit'
homepage: null
starredAt: '2018-01-19T05:34:32Z'
createdAt: '2018-01-19T02:32:53Z'
updatedAt: '2024-11-18T20:24:12Z'
language: JavaScript
license: MIT
branch: master
stars: 79
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:29.715Z'
description: Take care of your spawn()
tags:
  - async
  - child
  - events
  - node
  - processes
  - promises
  - spawn
---

# spawndamnit

> Take care of your `spawn()`

## Features

- Returns an `await`-able promise
- Collects `stdout` and `stderr` buffers
- Emits events "stdout" and "stderr"
- Automatically kills all spawn processes when parent process dies

## Installation

```sh
yarn add spawndamnit
```

## Usage

**Basic:**

```js
const spawn = require('spawndamnit');

async function main() {
  let child = spawn('npm', ['star', 'spawndamnit']);

  child.on('stdout', data => console.log(data.toString()));
  child.on('stderr', data => console.error(data.toString()));

  let { code, stdout, stderr } = await child;

  console.log(code === 0 ? 'success' : 'error');
}
```

---
repo: ascorbic/tiny-spin
url: 'https://github.com/ascorbic/tiny-spin'
homepage: ''
starredAt: '2024-03-26T19:14:20Z'
createdAt: '2020-11-09T10:33:50Z'
updatedAt: '2025-02-02T16:47:41Z'
language: JavaScript
license: NA
branch: main
stars: 16
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:33.322Z'
description: A CLI spinner in under 1kB
tags: []
---

# tiny-spin

![600 bytes](https://edge.bundlejs.com/?q=tiny-spin&badge)

## A tiny, zero-dependency CLI spinner

[Try it out](https://repl.it/@ascorbic/tiny-spin-demo)

When you want a CLI spinner in just a few bytes. Installation:

```shell
npm i tiny-spin
```

or

```shell
yarn add tiny-spin
```

Usage:

```js
// CommonJS
const { spin } = require("tiny-spin");

const stop = spin("Doing stuff");

// Do stuff

stop();
```

```js
// ESM

import { spin } from "tiny-spin";

const stop = spin("Doing stuff");

// Do stuff

stop();
```

## API

### `spin(message, frames, interval)`

- `message`: the message displayed after the spinner. Default empty
- `frames`: an array of strings that are the frames displayed by the spinner. Default `["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"]`
- `interval`: the interval between frames. Default 80ms.

Returns a function that you call to stop the spinner.

Author: [Matt Kane](https://github.com/ascorbic). MIT licence.

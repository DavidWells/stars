---
repo: jasnell/awaitable-timers
url: 'https://github.com/jasnell/awaitable-timers'
homepage: null
starredAt: '2021-03-17T23:36:12Z'
createdAt: '2021-03-17T15:08:12Z'
updatedAt: '2022-03-23T18:11:39Z'
language: JavaScript
license: MIT
branch: main
stars: 22
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:57.812Z'
description: Polyfill of Node.js awaitable timers
tags: []
---

# Node.js awaitable timers

Extracts the Node.js awaitable timers (from `require('timers/promises')`)
implementation from Node.js.

See: https://nodejs.org/dist/latest-v15.x/docs/api/timers.html#timers_timers_promises_api for details.

Should also work in most modern browsers. The implementation does make use of newer
JavaScript features such as optional chaining, trailing commas, argument defaults and
spread operators.

*Pull requests welcome if someone wants to contribute tests or fixes*

## Examples

```js
const {
  setTimeout,
  setImmediate,
  setInterval
} = require('awaitable-timers');

async function foo() {
  await setTimeout(1000);
  console.log('hello world after 1 second');
}

async function bar() {
  await setImmediate();
  console.log('hello world after 1 event loop tick');
}

async function baz() {
  for await (const _ of setInterval(1000)) {
    console.log('outputs once per second');
  }
}
```

Also available as ESM:

```js
import {
  setTimeout,
  setImmediate,
  setInterval
} from 'awaitable-timers';
```

## License

MIT License (see https://github.com/nodejs/node/blob/master/LICENSE)

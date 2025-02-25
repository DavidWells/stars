---
repo: sindresorhus/get-stdin
url: 'https://github.com/sindresorhus/get-stdin'
homepage: ''
starredAt: '2020-07-30T20:43:33Z'
createdAt: '2014-02-13T18:33:12Z'
updatedAt: '2025-02-08T01:41:23Z'
language: JavaScript
license: MIT
branch: main
stars: 338
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:41.693Z'
description: Get stdin as a string or buffer
tags: []
---

# get-stdin

> Get [stdin](https://nodejs.org/api/process.html#process_process_stdin) as a string or buffer

## Install

```sh
npm install get-stdin
```

## Usage

```js
// example.js
import getStdin from 'get-stdin';

console.log(await getStdin());
//=> 'unicorns'
```

```
$ echo unicorns | node example.js
unicorns
```

## API

Both methods returns a promise that is resolved when the `end` event fires on the `stdin` stream, indicating that there is no more data to be read.

### getStdin()

Get `stdin` as a `string`.

In a TTY context, a promise that resolves to an empty `string` is returned.

### getStdin.buffer()

Get `stdin` as a `Buffer`.

In a TTY context, a promise that resolves to an empty `Buffer` is returned.

## Tip

You can now accomplish this natively in Node.js using [`streamConsumers.text()`](https://nodejs.org/api/webstreams.html#streamconsumerstextstream) or [`streamConsumers.buffer()`](https://nodejs.org/api/webstreams.html#streamconsumersbufferstream):

```js
// example.js
import {text} from 'node:stream/consumers';

console.log(await text(stream))
//=> 'unicorns'
````

```
$ echo unicorns | node example.js
unicorns
```

## Related

- [get-stream](https://github.com/sindresorhus/get-stream) - Get a stream as a string or buffer

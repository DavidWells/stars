---
repo: ggoodman/with-defer
url: 'https://github.com/ggoodman/with-defer'
homepage: 'https://ggoodman.github.io/with-defer/'
starredAt: '2021-03-17T23:21:39Z'
createdAt: '2021-03-17T02:40:40Z'
updatedAt: '2023-12-06T20:42:34Z'
language: TypeScript
license: MIT
branch: main
stars: 21
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:57.954Z'
description: Run a function with an injected go-like defer helper
tags: []
---

# with-defer

> Because once you've tasted go's `defer`, you can't get enough.

This library provides tools to help you clean up resources in a simple and intuitive way. As you create more than one resource that needs to be disposed in a single, complex flow, you find yourself fighting with deeply-nested `try / finally` blocks and a sense of dread. _"What happened to the flattened logic that I was promised with `async / await`?"_, you might ask. Fear not, we're here to help.

Using `runWithDefer` will allow you to colocate your instructions to free resources with their creation. Some real-world use-cases:

- In tests, instead of having shared `let` variables instantiated in `.before` handlers and cleaned up in `.after` handlers, wrap your test logic in `runWithDefer` and get better typing and cleaner logic.
- In complex CLI workflows or build tool logic, this can help dispose of handles that might otherwise keep the event loop open, preventing your app from cleanly exiting.
- Manage the closing of your server and database connections.
- ... we'd love to hear what else you can dream up.

## Installation

```sh
npm install with-defer
```

## Usage

Below is a fictitious example that opens a file handle for reading, and writes the contents of that file to another file handle opened for writing. Notice that the instructions to close the file handles are adjacent to the code that opens them. This makes it easy to understand the intent of the code.

Deferred clean-up functions will be run in FIFO order. This means the last registered clean-up function will run first. If a clean-up function returns a `Promise`, it will be awaited. Any rejections or thrown exceptions in clean-up functions will NOT prevent others from running. If any clean-up functions throw, these errors will be accumulated and the whole `runWithDefer` function will return a rejected `Promise` whose value is an [`AggregateError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError) of the thrown exceptions.

> _**Note**: Yes, I know that there are 'better' ways to achieve the example below in Node.js. The point isn't so much writing one file's contents to another but how these file handles are cleaned up._

```js
import * as Fs from 'fs';
import { runWithDefer } from 'with-defer';

async function main() {
  await runWithDefer(async (defer) => {
    // Open a file handle and make sure we close it.
    const handle1 = await Fs.promises.open('path/to/file', 'r+');
    defer(() => handle1.close());

    const content = await handle1.readFile('utf8');

    // We open a 2nd handle here and register its close function. Notice we don't have to deal
    // with crazy nesting of try / catch blocks and can co-locate clean-up with obtaining the
    // resource.
    const handle2 = await Fs.promises.open('path/to/file2', 'w+');
    defer(() => handle2.close());

    await handle2.writeFile(content);
  });
}
```

## Docs

Read the [API Documentation](https://ggoodman.github.io/with-defer/) online.

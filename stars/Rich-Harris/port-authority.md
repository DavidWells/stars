---
repo: Rich-Harris/port-authority
url: 'https://github.com/Rich-Harris/port-authority'
homepage: null
starredAt: '2022-02-24T06:58:08Z'
createdAt: '2018-03-05T19:35:24Z'
updatedAt: '2024-10-11T16:37:24Z'
language: JavaScript
license: NOASSERTION
branch: master
stars: 56
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:09.350Z'
description: Utilities for dealing with ports in Node apps
tags: []
---

# port-authority

Utilities for dealing with ports in Node apps.

![Port Authority](https://user-images.githubusercontent.com/1162160/36995526-4484c6ac-2082-11e8-9158-a3fb960a9586.jpg)

```js
import * as ports from 'port-authority';

async function start(port) {
  if (port) {
    // if the selected port is unavailable,
    // print something nicer than EADDRINUSE
    const available = await ports.check(port);
    if (!available) {
      console.log(`> Port ${port} is unavailable`);
      return;
    }
  } else {
    // if no port was selected, start at 3000
    // and keep counting until we find one
    port = await ports.find(3000);
  }

  const proc = child_process.fork('server.js', [], {
    env: {
      PORT: port
    }
  });

  try {
    await ports.waitUntilBusy(port, {
      timeout: 5000
    });

    console.log(`> Server is running on port ${port}`);

    setTimeout(() => proc.kill(), 100);
    await ports.waitUntilFree(port);

    console.log(`> Port ${port} is free`);
  } catch (err) {
    console.log(`> Could not find server on port ${port}`);
    proc.kill();
  }
}

start();
```

There are existing libraries to do this stuff, but I couldn't find any that do all the things that port-authority does, with treeshakeable functions and a modern Promise-based API.

## Additional functions

On Unix-like systems, you can also do the following:

```js
// Find the process ID that is using port n.
// Returns `null` if port is currently unused
const pid = await ports.blame(n);

// Kill the process using port n, if any.
// Returns `true` if the port was in use
const killed = await ports.kill(n);
```

PRs welcome to make this work on all operating systems.

## License

[LIL](LICENSE)

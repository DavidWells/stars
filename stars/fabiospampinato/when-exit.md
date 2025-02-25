---
repo: fabiospampinato/when-exit
url: 'https://github.com/fabiospampinato/when-exit'
homepage: ''
starredAt: '2023-12-29T19:32:14Z'
createdAt: '2022-02-08T21:14:31Z'
updatedAt: '2025-01-12T18:35:29Z'
language: TypeScript
license: MIT
branch: master
stars: 13
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:40.246Z'
description: Execute a function right before the process is about to exit.
tags:
  - catch
  - event
  - exit
  - handle
  - hook
  - intercept
  - signal
---

# WhenExit

Execute a function right before the process, or the browser's tab, is about to exit.

## Install

```sh
npm install when-exit
```

## Usage

```ts
import whenExit from 'when-exit';

// Registering multiple callbacks

onExit ( () => {
  console.log ( 'Callback 1' );
});

onExit ( () => {
  console.log ( 'Callback 2' );
});

// Registering and disposing a callback

const disposer = onExit ( () => {
  console.log ( 'Callback 3' );
});

disposer ();

// Triggering the process to exit

process.exit (); // Callback 1 and 2 are called before exiting
```

## License

MIT © Fabio Spampinato

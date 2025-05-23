---
repo: azu/localstorage-ponyfill
url: 'https://github.com/azu/localstorage-ponyfill'
homepage: null
starredAt: '2021-11-21T21:10:09Z'
createdAt: '2017-08-18T15:39:45Z'
updatedAt: '2024-10-24T01:20:43Z'
language: TypeScript
license: MIT
branch: master
stars: 56
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:36.928Z'
description: Universal LocalStorage for browser and Node.js.
tags:
  - browser
  - node
  - ponyfill
  - storage
---

# localstorage-ponyfill [![Actions Status: test](https://github.com/azu/localstorage-ponyfill/workflows/test/badge.svg)](https://github.com/azu/localstorage-ponyfill/actions?query=workflow%3A"test")

Universal LocalStorage ponyfill library for Browser and Node.js.

## Install

Install with [npm](https://www.npmjs.com/):

    npm install localstorage-ponyfill

## Usage

### Auto(Browser or Node.js)

Automatically select mode.

- If the environment defined `window.localStorage` -> "browser"
- else -> "node"

```js
import { createLocalStorage } from "localstorage-ponyfill";
const localStorage = createLocalStorage();
localStorage.setItem("key", "value");
const value = localStorage.getItem("key");
assert.strictEqual(value, "value");        
```

### Browser

Native localStorage.

```js
import { createLocalStorage } from "localstorage-ponyfill";
const localStorage = createLocalStorage({ mode : "browser" });
```

### Node.js

Use [node-localstorage](https://github.com/lmaccherone/node-localstorage "node-localstorage")

Store data to `<app-root>/.cache/localstorage-ponyfill/*` by default.

```js
import { createLocalStorage } from "localstorage-ponyfill";
const localStorage = createLocalStorage({ mode : "node" });
```

You can setting the path by `storeFilePath` option.

```js
import { createLocalStorage } from "localstorage-ponyfill";
const localStorage = createLocalStorage({ mode : "node", storeFilePath: "./path/to/dir" });
```

### InMemory

InMemory localStorage work on Node.js and Browser.

Use [localstorage-memory](https://github.com/gr2m/localstorage-memory "localstorage-memory")

```js
import { createLocalStorage } from "localstorage-ponyfill";
const localStorage = createLocalStorage({ mode : "memory" });
```

## API

Same with [Window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

```ts
export interface LocalStoragePonyfill {
    readonly length: number;

    clear(): void;

    getItem(key: string): string | null;

    key(index: number): string | null;

    removeItem(key: string): void;

    setItem(key: string, data: string): void;

    [key: string]: any;

    [index: number]: string;
}

```

## IndexedDB

If you want to get IndexedDB storage, please use [azu/kvs](https://github.com/azu/kvs).

## Changelog

See [Releases page](https://github.com/azu/localstorage-ponyfill/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/localstorage-ponyfill/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu

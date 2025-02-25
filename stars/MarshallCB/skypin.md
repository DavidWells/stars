---
repo: MarshallCB/skypin
url: 'https://github.com/MarshallCB/skypin'
homepage: ''
starredAt: '2022-02-18T07:53:20Z'
createdAt: '2020-11-25T22:52:29Z'
updatedAt: '2022-02-18T13:07:05Z'
language: JavaScript
license: MIT
branch: main
stars: 9
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:17.426Z'
description: 'Generate pinned URLs from https://skypack.dev'
tags: []
---

<div align="center">
  <img src="https://github.com/marshallcb/skypin/raw/main/meta/skypin.png" alt="Skypin Logo" width="300" />
</div>

<h1 align="center">skypin</h1>

<h3 align="center">Convert NPM imports into Skypack Pinned URL's</h3>

<div align="center">
  <a href="https://npmjs.org/package/skypin">
    <img src="https://badgen.now.sh/npm/v/skypin" alt="version" />
  </a>
  <a href="https://packagephobia.com/result?p=skypin">
    <img src="https://badgen.net/packagephobia/install/skypin" alt="install size" />
  </a>
  <a href="https://bundlephobia.com/result?p=skypin">
    <img src="https://img.badgesize.io/MarshallCB/skypin/main/es.js?compression=brotli" alt="browser size" />
  </a>
</div>


## About

Skypack is a CDN built for browser modules. This module converts npm module id's into the optimized Skypack URL for optimal performance. Read more [here](https://docs.skypack.dev/skypack-cdn/api-reference/pinned-urls-optimized). This could be used in build tools (like [rollup](https://github.com/MarshallCB/rollup-plugin-skypin)) to convert source code into browser-optimized modules.

## Usage

**NodeJS**
```js
import { skypin } from 'skypin';

// Uses version of package found in node_modules (if it exists - otherwise 'latest')
await skypin('hueman')
// ~> https://cdn.skypack.dev/pin/hueman@v2.1.1-ElNqhC8YFxLlgRtjjL9o/min/hueman.js

await skypin('hueman', { pin: false })
// ~> https://cdn.skypack.dev/hueman@2.1.1

await skypin('hueman', { min: false })
// ~> https://cdn.skypack.dev/hueman@2.1.1

// Specify version directly
await skypin('hueman@2.0.0')
// ~> https://cdn.skypack.dev/pin/hueman@v2.0.0-Eh8v1x3dV0iEyJ9rG915/min/hueman.js

```

**Browser** [Codepen](https://codepen.io/marshallcb/pen/qBaaJRY?editors=0011)
```js
import { skypin } from 'https://cdn.skypack.dev/skypin'

await skypin('hueman')
```

## API

#### `skypin(module_id, options)` -> `URL`
- `module_id`: String that identifies the package in npm (`hueman`, `uhtml@latest`, `themepark@1.0.0`, etc.) (version number optional)
- `options`:
  - `pin`: Boolean (default `true`). Read more [here](https://docs.skypack.dev/skypack-cdn/api-reference/pinned-urls-optimized)
  - `min`: Boolean (default `true`). Based on normal vs. minified in skypack lookup page
- **Returns**: Promise that resolves to URL that can be used as an import statement in the browser

Uses the version of the package found in `node_modules`. Requires that the module has been installed to the current working directory. May take a few seconds if the package has not been "pinned" on skypack before.

## References

- [Skypack](https://skypack.dev/)

## License

MIT © [Marshall Brandt](https://m4r.sh)

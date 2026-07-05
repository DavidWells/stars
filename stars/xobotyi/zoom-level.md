---
repo: xobotyi/zoom-level
url: 'https://github.com/xobotyi/zoom-level'
homepage: ''
starredAt: '2023-12-03T23:06:22Z'
createdAt: '2019-05-31T07:47:40Z'
updatedAt: '2024-10-17T22:30:56Z'
language: TypeScript
license: MIT
branch: master
stars: 23
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:42.311Z'
description: >-
  A comprehensive cross-browser package that allow you to determine page's and
  element's zoom level
tags:
  - browser
  - scale
  - zoom
  - zoom-detect
  - zoom-level
---

<div align="center">

# zoom-level

[![NPM Version](https://flat.badgen.net/npm/v/zoom-level)](https://www.npmjs.com/package/zoom-level)
[![NPM Downloads](https://flat.badgen.net/npm/dm/zoom-level)](https://www.npmjs.com/package/zoom-level)
[![NPM Dependents](https://flat.badgen.net/npm/dependents/zoom-level)](https://www.npmjs.com/package/zoom-level)
[![Build](https://img.shields.io/github/workflow/status/xobotyi/zoom-level/CI?style=flat-square)](https://github.com/xobotyi/zoom-level/actions)
[![Types](https://flat.badgen.net/npm/types/zoom-level)](https://www.npmjs.com/package/zoom-level)
[![Tree Shaking](https://flat.badgen.net/bundlephobia/tree-shaking/zoom-level)](https://bundlephobia.com/result?p=zoom-level)

× **[LIVE EXAMPLE](https://codesandbox.io/s/zoomlevel-live-example-841ns)** ×

</div>

---

## ABOUT

This plugin allows you to detect browser's and separate element's zoom level.  
It is [lightweight](https://bundlephobia.com/result?p=zoom-level) and has **no dependencies**!

## INSTALLATION

```bash
npm install zoom-level
# or via yarn
yarn add zoom-level
```

**INSTALLATION NOTE:**  
This lib is written in ES6+ and delivering with both, transpiled and untranspiled versions:

- `main` field of `package.json` is pointing ES5 with CJS modules resolution;
- `module` field is pointing to ES5 with ES modules resolution;
- `esnext` field is pointing to ESNext with ES modules resolution;

Depending on your targets you may have to use [Webpack](https://webpack.js.org/) and/or
[Babel](http://babeljs.io/) to pull untranspiled version of package.  
See some tips on wiring thing
up: [https://2ality.com/2017/06/pkg-esnext.html](https://2ality.com/2017/06/pkg-esnext.html)

## USAGE

```javascript
import zoomLevel from "zoom-level";

zoomLevel(); // 1;

window.addEventListener("resize", () => {
  zoomLevel(); // will return current browser's zoom level
});
```

Or, in case you want to detect separate element's zoom level (they can use own `zoom` CSS property
which stacks with browser's one);

```javascript
import { elementZoomLevel } from "zoom-level";

const zoomedBlock = document.createElement("div");
zoomedBlock.style.zoom = 0.5;
zoomedBlock.style.width = "150px";
zoomedBlock.style.height = "150px";
zoomedBlock.style.margin = "32px";
zoomedBlock.style.padding = "32px";
zoomedBlock.style.background = "rgba(0,0,0,.05)";
zoomedBlock.innerText = "Lorem ipusm dolor sit amet";
document.appendChild(zoomedBlock);

elementZoomLevel(zoomedBlock); // 0.5;

window.addEventListener("resize", () => {
  elementZoomLevel(zoomedBlock); // if you zoom to 200% it'll be 1
});
```

## TESTS

Sadly i have no idea how to manage testing of this package, due to there is no known ways to control
browser's zoom level.  
If you know how to do it - please let me know.

## Related projects

- [react-scrollbars-custom](https://www.npmjs.com/package/react-scrollbars-custom) &mdash; The best
  React custom scrollbars component. Allows you to customise scrollbars as you like it,
  crossbrowser!
- [@xobotyi/scrollbar-width](https://www.npmjs.com/package/@xobotyi/scrollbar-width) &mdash; A tool
  to get browser's scrollbars width.
- [@xobotyi/should-reverse-rtl-scroll](https://www.npmjs.com/package/@xobotyi/should-reverse-rtl-scroll)
  &mdash; A tool detecting if RTL scroll value should be negative.

---
repo: uiwjs/copy-to-clipboard
url: 'https://github.com/uiwjs/copy-to-clipboard'
homepage: 'https://uiwjs.github.io/copy-to-clipboard'
starredAt: '2021-07-25T03:23:23Z'
createdAt: '2018-09-06T01:52:53Z'
updatedAt: '2025-01-13T15:58:22Z'
language: JavaScript
license: MIT
branch: master
stars: 17
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:49.781Z'
description: Copy text to the clipboard in modern browsers
tags:
  - browser
  - clipboard
  - clipboard-copy
  - clipboard-js
  - copy
---

Copy Text to Clipboard
===

[![Buy me a coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-048754?logo=buymeacoffee)](https://jaywcjlove.github.io/#/sponsor) 
![No Dependencies](http://jaywcjlove.github.io/sb/status/no-dependencies.svg)
[![NPM Downloads](https://img.shields.io/npm/dm/@uiw/copy-to-clipboard.svg?style=flat)](https://www.npmjs.com/package/@uiw/copy-to-clipboard)
[![Build & Deploy](https://github.com/uiwjs/copy-to-clipboard/workflows/Build/badge.svg)](https://github.com/uiwjs/react-codemirror/actions)
[![Open in unpkg](https://img.shields.io/badge/Open%20in-unpkg-blue)](https://uiwjs.github.io/npm-unpkg/#/pkg/@uiw/copy-to-clipboard/file/README.md)
[![npm version](https://img.shields.io/npm/v/@uiw/copy-to-clipboard.svg)](https://www.npmjs.com/package/@uiw/copy-to-clipboard)
[![Repo Dependents](https://badgen.net/github/dependents-repo/uiwjs/copy-to-clipboard)](https://github.com/uiwjs/copy-to-clipboard/network/dependents)
[![Coverage Status](https://uiwjs.github.io/copy-to-clipboard/badges.svg)](https://uiwjs.github.io/copy-to-clipboard/lcov-report/)

**This styling is an extra step which is likely not required.**

Why is it here? To ensure:

1. the element is able to have focus and selection.
2. if element was to `flash` render it has minimal visual impact.
3. less flakyness with selection and copying which **might** occur if the textarea element is not visible.

The likelihood is the element won't even render, not even a flash, so some of these are just precautions. However in IE the element is visible whilst the popup box asking the user for permission for the web page to copy to the clipboard. Place in top-left corner of screen regardless of scroll position.

## Usage

You will need Node.js installed on your system.

```bash
$ npm i @uiw/copy-to-clipboard
```

```js
import copyTextToClipboard from '@uiw/copy-to-clipboard';

copyTextToClipboard('test', (isCopy) => {
  console.log('isCopy:', isCopy);
});
```

Or manually download and link [copy-to-clipboard](https://unpkg.com/@uiw/copy-to-clipboard/dist/) in your HTML, It can also be downloaded via [UNPKG](https://unpkg.com/@uiw/copy-to-clipboard/dist/):

```html
<script src="https://unpkg.com/@uiw/copy-to-clipboard/dist/copy-to-clipboard.umd.js"></script>
<script type="text/javascript">
copyTextToClipboard('test', (isCopy) => {
  console.log('isCopy:', isCopy);
});
</script>
```

## Contributors

As always, thanks to our amazing contributors!

<a href="https://github.com/uiwjs/copy-to-clipboard/graphs/contributors">
  <img src="https://uiwjs.github.io/copy-to-clipboard/CONTRIBUTORS.svg" />
</a>

Made with [contributors](https://github.com/jaywcjlove/github-action-contributors).

### License

Licensed under the MIT License.

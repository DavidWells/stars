---
repo: jaywcjlove/parcel-plugin-markdown-string
url: 'https://github.com/jaywcjlove/parcel-plugin-markdown-string'
homepage: 'https://jaywcjlove.github.io/parcel-plugin-markdown-string'
starredAt: '2022-01-16T18:15:49Z'
createdAt: '2018-03-16T13:17:19Z'
updatedAt: '2023-10-27T10:29:14Z'
language: TypeScript
license: MIT
branch: master
stars: 21
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:20.971Z'
description: "\U0001F4E6@parcel-bundler plugin for loader markdown string, markdown output HTML. "
tags:
  - markdown
  - markdown-to-html
  - parcel-bundler
  - parcel-plugin
  - parceljs
---

parcel-transformer-markdown
===

[![Buy me a coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-048754?logo=buymeacoffee)](https://jaywcjlove.github.io/#/sponsor)
[![NPM Downloads](https://img.shields.io/npm/dm/parcel-transformer-markdown.svg?style=flat)](https://www.npmjs.com/package/parcel-transformer-markdown)
[![Build & Deploy](https://github.com/jaywcjlove/parcel-plugin-markdown-string/actions/workflows/ci.yml/badge.svg)](https://github.com/jaywcjlove/parcel-plugin-markdown-string/actions/workflows/ci.yml)
[![parcel-transformer-markdown version](https://img.shields.io/npm/v/parcel-transformer-markdown.svg?label=parcel-transformer-markdown)](https://www.npmjs.com/package/parcel-transformer-markdown)
[![parcel-plugin-markdown-string version](https://img.shields.io/npm/v/parcel-plugin-markdown-string.svg?label=parcel-plugin-markdown-string)](https://www.npmjs.com/package/parcel-plugin-markdown-string)

[**`Parcel 2`**](https://parceljs.org/) plugin for loader markdown string, markdown output HTML.

> ⚠️ ~~[`parcel-plugin-markdown-string`](https://github.com/jaywcjlove/parcel-plugin-markdown-string/tree/parcel-plugin-markdown-string)~~ => [`parcel-transformer-markdown`](https://www.npmjs.com/package/parcel-transformer-markdown)

```diff
- parcel-plugin-markdown-string 
+ parcel-transformer-markdown
```

## Example usage

Install the plugin

```bash
npm install parcel-transformer-markdown --save-dev
```

`.parcelrc`

```js
{
  "extends": "@parcel/config-default",
  "transformers": {
    "*.md": [ "parcel-transformer-markdown" ]
  }
}
```

`index.html`:

```html
<!DOCTYPE html>
<div id="root"></div>
<script type="module" src="index.js"></script>
```

**Output HTML string**

Import your markdown files! Output HTML string.

```js
import HTMLStr from './Markdown.md';

console.log(HTMLStr) // => Output HTML string.
document.body.innerHTML = HTMLStr;
```

**Output Markdown string**

```js
// .markedrc
{
  "marked": false
}
```

```js
import str from './Markdown.md';

console.log(str) // => Output Markdown string.
document.body.innerHTML = str;
```

## Configuration

[Marked](https://github.com/markedjs/marked) can be configured using a `.markedrc`, `.markedrc.js`, or `marked.config.js` file. See the [Marked API Reference](https://marked.js.org/using_advanced#options) for details on the available options.

> Note: `.markedrc.js` and `marked.config.js` are supported for JavaScript-based configuration, but should be avoided when possible because they reduce the effectiveness of Parcel's caching. Use a JSON based configuration format (e.g. `.markedrc`) instead.

There is a `marked` configuration that converts `markdown` to `HTML`. Otherwise just read the `markdown` string.

```js
{
  "marked": {
    "breaks": true,
    "pedantic": false,
    "gfm": true,
    "tables": true,
    "sanitize": false,
    "smartLists": true,
    "smartypants": false,
    "xhtml": false
  }
}
```

## Contributors

As always, thanks to our amazing contributors!

<a href="https://github.com/jaywcjlove/parcel-plugin-markdown-string/graphs/contributors">
  <img src="https://jaywcjlove.github.io/parcel-plugin-markdown-string/CONTRIBUTORS.svg" />
</a>

Made with [github-action-contributors](https://github.com/jaywcjlove/github-action-contributors).

## License

MIT © [Kenny Wong](https://wangchujiang.com)

---
repo: sindresorhus/domify
url: 'https://github.com/sindresorhus/domify'
homepage: null
starredAt: '2017-03-15T21:21:40Z'
createdAt: '2012-06-22T00:31:46Z'
updatedAt: '2025-01-07T20:10:46Z'
language: JavaScript
license: MIT
branch: main
stars: 259
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:46.656Z'
description: html -> elements
tags: []
---

# domify

> Turn a HTML string into DOM elements, cross-platform

## Usage

Works out of the box in the browser:

```js
import domify from 'domify';

document.addEventListener('DOMContentLoaded', () => {
	const element = domify('<p>Hello <em>there</em></p>');
	document.body.appendChild(element);
});
```

You can also run it in Node.js and other non-browser environments by passing a custom implementation of `document`:

```js
import {JSDOM} from 'jsdom';

const jsdom = new JSDOM();

domify('<p>Hello <em>there</em></p>', jsdom.window.document);
```

**Note:** For browser-only use, prefer [`DOMParser.parseFromString()`](https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString).

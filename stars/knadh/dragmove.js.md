---
repo: knadh/dragmove.js
url: 'https://github.com/knadh/dragmove.js'
homepage: 'https://knadh.github.io/dragmove.js/docs/'
starredAt: '2020-09-20T20:06:02Z'
createdAt: '2020-09-15T10:07:26Z'
updatedAt: '2025-02-18T04:30:57Z'
language: JavaScript
license: MIT
branch: master
stars: 838
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:30.282Z'
description: ' A super tiny Javascript library to make DOM elements draggable and movable. ~500 bytes (minified+gzipped) and no dependencies.'
tags:
  - dom-manipulation
  - drag-and-drop
  - draggable
  - draggable-elements
  - move
---

<a href="https://zerodha.tech"><img src="https://zerodha.tech/static/images/github-badge.svg" align="right" /></a>

# dragmove.js

A super tiny Javascript library to make DOM elements draggable and movable. Has touch screen support. Zero dependencies and 500 bytes Gzipped. [Demo here](https://knadh.github.io/dragmove.js/docs/).

## Usage

### Node
```shell
npm install @knadh/dragmove
```

```javascript
import { dragmove } from @knadh/dragmove;

// (target, handler, onStart(target, x, y), onEnd(target, x, y)).
// onStart and onEnd are optional callbacks that receive target element, and x, y coordinates.

dragmove(document.querySelector("#box"), document.querySelector("#box .drag-handle"));
```

### ES6 module
[Check this example](https://github.com/knadh/dragmove.js/blob/master/docs/index.html) to include dragmove.js as a `<script>` directly on an HTML page.

Licensed under the MIT License.

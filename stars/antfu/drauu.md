---
repo: antfu/drauu
url: 'https://github.com/antfu/drauu'
homepage: 'https://drauu.netlify.app/'
starredAt: '2021-09-13T01:42:32Z'
createdAt: '2021-08-05T17:03:34Z'
updatedAt: '2025-02-25T10:58:23Z'
language: TypeScript
license: MIT
branch: main
stars: 1275
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:45.802Z'
description: Headless SVG-based drawboard in browser.
tags:
  - drawboard
---

# drauu

[![NPM version](https://img.shields.io/npm/v/drauu?color=a1b858&label=)](https://www.npmjs.com/package/drauu)

SVG-based drawing tool in browser. Built for [Slidev](https://github.com/slidevjs/slidev).

[Live Demo](http://drauu.netlify.app/) (built with Vanilla JavaScript!)

## Features

- Vanilla JavaScript - integrate into any framework you like
- SVG-based - scalable, transparent, and serializable
- Stylus / Touch pressure support
- Headless (unstyled) - style it as you want
- Undo / Redo stacks

## Install

```bash
npm i drauu
```

```html
<svg id="svg"></svg>
```

```js
import { createDrauu } from 'drauu'

const drauu = createDrauu({
  el: '#svg',
  brush: {
    mode: 'stylus', // 'line', 'rectangle', 'ellipse'
    color: 'skyblue',
    size: 5,
  }
})

// change brush color
drauu.options.brush.color = 'red'
```

## Credits

Inspired by

- [scribby](https://github.com/naknomum/scribby) by [naknomum](https://github.com/naknomum)
- [excalidraw](https://github.com/excalidraw/excalidraw)
- [draw](https://github.com/amoshydra/draw) by [amoshydra](https://github.com/amoshydra)
- [live-draw](https://github.com/antfu/live-draw) by [antfu](https://github.com/antfu)

Thanks!

## Sponsors

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg'/>
  </a>
</p>

## License

MIT

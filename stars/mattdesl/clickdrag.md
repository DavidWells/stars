---
repo: mattdesl/clickdrag
url: 'https://github.com/mattdesl/clickdrag'
homepage: null
starredAt: '2019-09-21T22:18:27Z'
createdAt: '2014-09-11T00:38:00Z'
updatedAt: '2024-02-24T00:27:03Z'
language: JavaScript
license: MIT
branch: master
stars: 15
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:23.517Z'
description: low-level DOM click and drag handler
tags: []
---

# clickdrag

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Generic low-level click and drag utility for DOM events. Normalizes mouse and touch events and handles clicking outside of the element. 

```js
var drag = require('clickdrag')(element, { touch: true })

drag.on('start', startHandler) //touchstart / mousedown
drag.on('move', moveHandler)   //touchmove / mousemove + move outside
drag.on('end', stopHandler)    //touchend / mouseup + up outside
```

## Usage

[![NPM](https://nodei.co/npm/clickdrag.png)](https://nodei.co/npm/clickdrag/)

#### `drag = clickdrag(element[, options])`

Creates a new draggable emitter for the given element.

Options:

- `parent` the element or document to attach mouse outside events, defaults to `document`
- `touch` whether to listen for `touchstart`, `touchend`, `touchmove` and emit the normalized `start`, `move`, and `end` events. Defaults to false (i.e. `mouse` events only).

#### `drag.enabled`

Boolean, default true. If set to false, events will be ignored.

#### `drag.element`

The element passed into the constructor. 

#### `drag.dispose()`

Disposes the listeners, removing them from the DOM elements, and removing references to `element`.

## events

#### `drag.on('start')`
#### `drag.on('move')`
#### `drag.on('end')`

The start (mousedown), move (mousemove and mousemove outside), and end (mouseup and mouseup outside) events. 

Each is emitted with the parameters `(event, offset, delta)`. The `event` is the original MouseEvent. The `offset` is an object with `x` and `y` values, relative to the element you passed at constructor. The `delta` has `x` and `y` delta from where the drag start originated (for `start` events it will be `{0, 0}`).

*Note:* Keep in mind that the MouseEvent's `target` may not match the element passed to the constructor, since the mousemove/mouseup events need to be triggered on its parent (or the document).

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/clickdrag/blob/master/LICENSE.md) for details.

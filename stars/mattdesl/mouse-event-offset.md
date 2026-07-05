---
repo: mattdesl/mouse-event-offset
url: 'https://github.com/mattdesl/mouse-event-offset'
homepage: null
starredAt: '2019-09-13T23:17:09Z'
createdAt: '2014-08-31T23:41:29Z'
updatedAt: '2025-01-16T13:46:32Z'
language: JavaScript
license: MIT
branch: master
stars: 29
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:24.778Z'
description: get relative position in an element on mouse clicks
tags: []
---

# mouse-event-offset

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Computes the `[ offsetX, offsetY ]` from a mouse or touch event, relative to the top left of the `target` element.

```js 
var offset = require('mouse-event-offset')

window.addEventListener('touchstart', function (ev) {
  var target = ev.currentTarget
  var touch = ev.changedTouches[0]
  var pos = offset(touch, target)
  //=> [ 128, 52 ]
})
```
## Usage

### `position = offset(event, [target], [out])`

Pass a MouseEvent or TouchEvent as `event`. 

Optionally, you can specify a `target` element which the touch event should be relative to. Defaults to `event.currentTarget`, falling back to `event.srcElement` for older IE.

You can also specifiy `out` to store the position in that array, and avoid creating a new one.

## Changelog

- `3.x` new version; simpler API, less assumptions, avoids GC thrashing
- `2.x` uses `ev.currentTarget` instead of `ev.target`
- `1.x` simple implementation using `ev.target || ev.srcElement`

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/mouse-event-offset/blob/master/LICENSE.md) for details.

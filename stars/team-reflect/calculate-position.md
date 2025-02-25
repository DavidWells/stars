---
repo: team-reflect/calculate-position
url: 'https://github.com/team-reflect/calculate-position'
homepage: null
starredAt: '2021-09-27T21:03:58Z'
createdAt: '2021-03-17T01:57:11Z'
updatedAt: '2022-09-09T19:20:30Z'
language: TypeScript
license: MIT
branch: master
stars: 11
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:44.629Z'
description: null
tags: []
---

# calculate-position

Calculates the best position (left/top coords) for a given anchor and dimensions.

Mostly useful for placing popups and tooltips correctly in the viewports.

Behind the scenes we calculate all the position positions for the popup element (TopLeft, TopRight etc) and then choose the one that has the largest overlap with the viewport (normal the window).

### calculateBestDirection

Calculates the best direction (e.g. BottomLeft) for a given anchor and dimensions.

Valid directions are:
- `TopLeft`
- `TopRight`
- `TopCenter`
- `BottomLeft`
- `BottomRight`
- `BottomCenter`

`BottomRight` is the default direction.

Valid arguments:
```
@param anchor - anchor position that calculations will be based of
@param dimensions - width/height dimensions of popup element
@param viewport - (optional) viewport rectangle (defaults to window)
```

Example:
```js
import {calculateBestDirection} from 'calculate-position'

const anchor = popupAnchorElement.getBoundingClientRect()
const dimensions = {width: popupWidth, height: popupHeight}

console.log(calculateBestDirection({anchor, dimensions}))
// => Direction.TopLeft
```

### calculateBestPosition

Returns coordinates (i.e. `top` and `left`) for a given anchor and dimensions.

Valid arguments:
```
@param anchor - anchor position that calculations will be based of. Typically an element being hovered over.
@param dimensions - width/height dimensions of popup element
@param viewport - optional viewport rectangle (defaults to window)
```

Example:
```js
import {calculateBestPosition} from 'calculate-position'

const anchor = anchorElement.getBoundingClientRect()
const dimensions = {width: popupWidth, height: popupHeight}

console.log(calculateBestPosition({anchor, dimensions}))
// => {left: 200, top: 100}
```


---
repo: estrattonbailey/overunder
url: 'https://github.com/estrattonbailey/overunder'
homepage: 'https://overunder.now.sh/'
starredAt: '2023-11-25T20:58:04Z'
createdAt: '2016-07-03T11:39:05Z'
updatedAt: '2023-12-09T11:12:33Z'
language: JavaScript
license: NA
branch: master
stars: 25
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:43.258Z'
description: Tiny waypoint library.
tags:
  - emits-events
  - listeners
  - position
  - waypoint-library
---

# overunder
Tiny waypoint library. **750 bytes gzipped.**

## Features
1. Supports both x and y axis
2. Accepts both integer values and DOM nodes
3. Only one `scroll` and one `resize` listener

# Usage
```javascript
import overunder from 'overunder'

const scroller = overunder({
  y: 1000
})

scroller.on('y over', () => {
  console.log('user scrolled over 1000px')
})

scroller.update()
```
```javascript
import overunder from 'overunder'

const scroller = overunder({
  y: document.getElementById('lazyImg')
})

scroller.on('y over', () => {
  console.log('#lazyImg is visible')
})

scroller.update()
```
```javascript
import overunder from 'overunder'

const scroller = overunder({
  x: 900
})

scroller.on('x under', () => {
  console.log('viewport is < 900px wide')
})

scroller.update()
```
```javascript
import overunder from 'overunder'

const scroller = overunder({
  x: 900,
  x2: 1200
})

scroller.on('x between', () => {
  console.log('viewport is between 900px and 1200px wide')
})

scroller.update()
```
```javascript
import overunder from 'overunder'

const scroller = overunder({
  x: 900,
  y: document.getElementById('hideNavTrigger')
})

scroller.on('x under', () => {
  scroller.update({
    y: document.getElementById('hideNavTrigger2')
  })
})
scroller.on('x over', () => {
  scroller.update({
    y: document.getElementById('hideNavTrigger')
  })
})

scroller.update()
```

## Events
`overunder` emits events depending on what waypoints you pass to it. They follow
the same pattern: `<axis> <position>`. Given an `x` and `y` value, `overunder`
will emit the following events.
- `x over`
- `x under`
- `y over`
- `y under`

Pass a second value for each and `overunder` will emit `between` event:
- `x between`
- `y between`

### Subscribing to events
```javascript
const listener = scroll.on('y over', () => {})

listener() // destroy listener
```

## API
### update([options])
Checks position and fires applicable listeners.
```javascript
scroller.update()
```
Pass an optional options object to update waypoint values.
```javascript
scroller.update({
  x: 1000
})
```

## License
MIT License © [Eric Bailey](https://estrattonbailey.com)

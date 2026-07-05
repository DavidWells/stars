---
repo: estrattonbailey/scroll-restoration
url: 'https://github.com/estrattonbailey/scroll-restoration'
homepage: null
starredAt: '2023-11-25T21:11:05Z'
createdAt: '2017-01-28T22:19:32Z'
updatedAt: '2023-12-15T02:02:43Z'
language: JavaScript
license: NA
branch: master
stars: 13
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:43.274Z'
description: A tiny scroll management library using native DOM APIs.
tags: []
---

# scroll-restoration
A tiny scroll management library that uses native DOM APIs, **~372 bytes**.

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](http://standardjs.com)

## Install
```bash
npm i scroll-restoration --save
```

## Usage 
Import, then call `scroller.init()`. This will listen for `beforeunload` events, check for `scrollPosition` property on the window, and restore that position on page load.
```javascript
import scroller from 'scroll-restoration'

scroller.init()
```

For SPAs, you'll want to save scroll position before new routes, and restore position when returning to previous routes:
```javascript
// new route
scroller.save()

// popstate, return to previous route
scroller.restore()
```

Optionally, `restore()` can accept a callback as it's first and only parameter. If provided, the callback will be fired with the `scrollPosition` property, and you can do what you will with it. Use this for animated scrolling, etc.
```javascript
scroller.restore(pos => {
  // handle scrolling
})
```

The `save()` method also accepts an optional param, `y`, which is a scroll position (in px).
```javascript
scroller.save(365)
```

The `scrollPosition` value is stored on the `history` object i.e. `history.state.scrollPosition`. For convenience, you can also call:
```javascript
scroller.state() // returns scrollPosition
```

## Example
To run the example, clone this repo, then:
```bash
# move into example dir
cd srraf/example
# install deps
npm i
# compile JS
npm run js:build # or js:watch
# serve index.html and update with changes
live-server 
```

MIT License

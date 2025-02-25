---
repo: EvanHahn/MouseTracker.js
url: 'https://github.com/EvanHahn/MouseTracker.js'
homepage: null
starredAt: '2015-03-13T15:50:48Z'
createdAt: '2014-05-07T11:12:47Z'
updatedAt: '2024-12-08T11:50:20Z'
language: JavaScript
license: Unlicense
branch: master
stars: 5
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:47.644Z'
description: keep mouse.x and mouse.y updated
tags: []
---

mouse tracker dot js
====================

where's the mouse at?

```javascript
var mouse = mouseTracker();
```

now `mouse.x` and `mouse.y` stay updated! they're initially set to `null`.

that's basically it!

you can also set what element to bind to.

```javascript
var mouse = mouseTracker({
  element: document.querySelector('canvas')
});
```

if you don't like that the starting values being `null`:

```javascript
var mouse = mouseTracker({
  startX: 100,
  startY: 200
});
```

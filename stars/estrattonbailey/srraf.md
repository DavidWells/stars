---
repo: estrattonbailey/srraf
url: 'https://github.com/estrattonbailey/srraf'
homepage: ''
starredAt: '2023-11-25T20:24:34Z'
createdAt: '2017-01-25T16:04:05Z'
updatedAt: '2024-08-27T07:45:16Z'
language: JavaScript
license: NA
branch: master
stars: 30
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:43.750Z'
description: Monitor scrolling and resizing without event listeners.
tags:
  - resize
  - scroll
  - scrolling
---

# srraf
Monitor scrolling and resizing without event listeners. **300 bytes gzipped.**

## Install 
```bash
npm i srraf --save
```

# Usage
```javascript
import srraf from 'srraf'

const scroller = srraf(({ x, px, y, py, vh, pvh, vw, pvw }, timestamp) => {
  // ...
})

scroller.update() // check position
scroller.destroy() // destroy listener
```

Note: values prefixed with `p` denote *previous* values.

## License
MIT License © [Eric Bailey](https://estrattonbailey.com)

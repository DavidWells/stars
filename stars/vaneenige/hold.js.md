---
repo: vaneenige/hold.js
url: 'https://github.com/vaneenige/hold.js'
homepage: ''
starredAt: '2022-01-02T19:53:08Z'
createdAt: '2017-01-14T00:52:50Z'
updatedAt: '2023-02-10T15:31:59Z'
language: JavaScript
license: MIT
branch: master
stars: 19
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:23.882Z'
description: A tiny (no dependency) library for click / touch and hold functionality!
tags: []
---

# Hold.js
A tiny (no dependency) library for click / touch and hold functionality.
Size: `2.0kb (minified)` and  `0.8kb (gzip)`

# Usage
``` javascript
const hold = new Hold();
```

### Parameters
* `element` *(default: window)* - Element in which the click and touch events should be added.
* `begin` *(default: 0)* - Lowest number from where to begin counting.
* `end` *(default: 1)* - Highest number from where to stop counting.
* `duration` *(default: 1)* - Duration of holding from begin to end (in seconds).
* `intervalDuration` *(default: 8)* - Length of every interval while holding (in ms).
* `loop` *(default: false)* - Use when value reaches end and should start from begin.
* `reset` *(default: false)* - Use when value reaches end and should discontinue the interval and reset current to begin.
* `onProgress` - Callback for every interval. Returns mix of begin and end based on calculated progress).
* `onComplete` - Callback for reaching the end value and stopping the interval. If not provided the interval won't be stopped.



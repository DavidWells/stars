---
repo: estrattonbailey/vsbl
url: 'https://github.com/estrattonbailey/vsbl'
homepage: null
starredAt: '2023-11-25T20:23:28Z'
createdAt: '2018-09-20T14:40:59Z'
updatedAt: '2023-12-08T07:09:47Z'
language: JavaScript
license: NA
branch: master
stars: 14
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:43.800Z'
description: In-viewport detection without event listeners.
tags: []
---

# vsbl
In-viewport detection without event listeners. **440 bytes gzipped.**

## Install
```
npm i vsbl --save
```

# Usage
```javascript
import vsbl from 'vsbl'

const enter = () => {}
const exit = () => {}

const listener = vsbl(document.getElementById('scroll'))(enter, exit)

listener() // destroy
```

## Options
### `threshold`
Trigger visibility sooner or later than usual.
- Values below `0.5` will be treated as a percentage of the viewport
- Values of `0.5` and over will be considered pixel values

```javascript
const listener = vsbl(node, { threshold: 0.25 })(() => console.log('visible'))
```

You can optionally include this threshold as an attribute on the element itself:
```html
<div id='scroll' data-threshold='0.25'></div>
```

## License
MIT License © [Eric Bailey](https://estrattonbailey.com)

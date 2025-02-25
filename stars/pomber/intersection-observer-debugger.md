---
repo: pomber/intersection-observer-debugger
url: 'https://github.com/pomber/intersection-observer-debugger'
homepage: ''
starredAt: '2020-09-13T07:03:07Z'
createdAt: '2020-09-01T23:36:19Z'
updatedAt: '2025-02-11T01:16:30Z'
language: JavaScript
license: NA
branch: master
stars: 133
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:33.039Z'
description: >-
  A script you include during development that shows the root, target, and
  intersection every time an IntersectionObserver is triggered.
tags:
  - debugger
  - intersection-observer
  - visualizer
---

# IntersectionObserver Debugger

<div align="center">
<img alt="demo" src="https://user-images.githubusercontent.com/1911623/91918354-0b2ef680-ec99-11ea-9250-e040d0f3be76.gif" width="600" />
<br/>
</div>

A script you include during development that shows the root, target and intersection every time an IntersectionObserver is triggered.

## Usage

Import the script from your html:

```html
<script src="https://unpkg.com/intersection-observer-debugger"></script>
```

Or, install the dependency and import it from JS:

```bash
$ npm install intersection-observer-debugger --save-dev
```

```js
// index.js
import "intersection-observer-debugger"
```

Make sure to import it before any code that may use the IntersectionObserver constructor.

## License

MIT

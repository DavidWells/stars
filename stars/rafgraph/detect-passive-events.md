---
repo: rafgraph/detect-passive-events
url: 'https://github.com/rafgraph/detect-passive-events'
homepage: 'https://detect-it.rafgraph.dev'
starredAt: '2019-09-05T20:15:16Z'
createdAt: '2016-11-08T19:27:26Z'
updatedAt: '2023-03-13T01:50:06Z'
language: TypeScript
license: MIT
branch: main
stars: 39
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:26.230Z'
description: Detect if the browser supports passive event listeners
tags: []
---

# Detect Passive Events

Detects if the browser supports passive event listeners. Tree-shakable and side-effect free. Also available as part of [`detect-it`][detectitrepo].

[Live detection test][livedetectiontest]

[![npm](https://img.shields.io/npm/dm/detect-passive-events?label=npm)](https://www.npmjs.com/package/detect-passive-events) [![npm bundle size](https://img.shields.io/bundlephobia/minzip/detect-passive-events?color=purple)](https://bundlephobia.com/result?p=detect-passive-events) ![npm type definitions](https://img.shields.io/npm/types/detect-passive-events?color=blue)

> Note that the code used in the detection is adapted from this [Passive Events Explainer][passiveexplainer].

### Using `detect-passive-events`

```
npm install --save detect-passive-events
```

```js
// supportsPassiveEvents is a boolean
import { supportsPassiveEvents } from 'detect-passive-events';

if (supportsPassiveEvents) {
  // passive events are supported by the browser
  document.addEventListener('scroll', handleScroll, { capture: false, passive: true });
} else {
  // passive events are not supported by the browser
  document.addEventListener('scroll', handleScroll, false);
}
```

### Or use the script directly in the browser

Optionally, instead using `npm install` you can the load the script directly in the browser. A minified UMD version is available from Unpkg for this purpose.

```html
<script src="https://unpkg.com/detect-passive-events@2/dist/detect-passive-events.umd.production.js"></script>
```

```js
// it will be available on the window as DetectPassiveEvents
if (window.DetectPassiveEvents.supportsPassiveEvents) {
  document.addEventListener('scroll', handleScroll, { capture: false, passive: true });
} else {
  document.addEventListener('scroll', handleScroll, false);
}
```

<!-- links -->

[livedetectiontest]: https://detect-it.rafgraph.dev
[passiveexplainer]: https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
[detectitrepo]: https://github.com/rafgraph/detect-it

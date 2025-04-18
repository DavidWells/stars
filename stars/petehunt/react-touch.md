---
repo: petehunt/react-touch
url: 'https://github.com/petehunt/react-touch'
homepage: null
starredAt: '2014-12-28T23:35:04Z'
createdAt: '2013-11-11T12:41:17Z'
updatedAt: '2025-02-14T15:51:39Z'
language: JavaScript
license: NA
branch: gh-pages
stars: 447
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:59.527Z'
description: React photo viewer for mobile
tags: []
---

# React touch demos

![unmaintained](http://img.shields.io/badge/status-unmaintained-red.png)

This demo uses [ReactHack](http://github.com/petehunt/ReactHack) to build a high-performance, lazy-loading 3d intertial touch app targeted at the iPhone 5. It really shows off what web technologies can do these days.

## Software being used

  * [React](http://github.com/facebook/react) JS library (so easy to use, and performance is great without even trying!)
  * [Zynga Scroller](http://github.com/zynga/scroller) for touch gesture physics (not in repo)

## Why target iPhone 5?

  * I know the GPU perf characteristics
  * Android touch event latency sucks vs iPhone
  * I know the screen size so I can avoid image resizing

## FAQ

  * **Why is this cool?** It performs well and has native-like interactions (as in you can partially open-close the left nav). To do this you need to animate every frame with JS (no CSS transitions or animations here!)
  * **Why doesn't it work without JS enabled?** Because this is a JS tech demo. React does support server rendering so I could render to a static page with little to no code changes though.
  * **The markup isn't semantic!** The semantic-ness can be improved for sure. But we should care less about semantic-ness and more about performance or else the web will die at the hands of native mobile SDKs.
  * **What's React got to do with it?** React's one-way data binding is so performant that we can write the whole app declaratively. I don't think it's easy to do in other data binding frameworks.

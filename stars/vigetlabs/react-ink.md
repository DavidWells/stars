---
repo: vigetlabs/react-ink
url: 'https://github.com/vigetlabs/react-ink'
homepage: 'https://react-ink.netlify.com/'
starredAt: '2015-04-18T03:44:23Z'
createdAt: '2014-11-24T16:34:45Z'
updatedAt: '2025-02-02T00:47:23Z'
language: JavaScript
license: MIT
branch: master
stars: 323
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:45.644Z'
description: A React component for adding material design style ink
tags: []
---

# React Ink

[![CircleCI](https://img.shields.io/circleci/project/vigetlabs/react-ink.svg?maxAge=2592000)](https://circleci.com/gh/vigetlabs/react-ink)
[![npm](https://img.shields.io/npm/v/react-ink.svg?maxAge=2592000)](https://www.npmjs.com/package/react-ink)
[![npm](https://img.shields.io/npm/dm/react-ink.svg?maxAge=2592000)](https://www.npmjs.com/package/react-ink)

Add the Material Design ripple effect to React component.

![Ink Gif](http://cl.ly/image/1r36102z0M3r/ink.gif)

## Usage

Ink must be placed within another component with a position is not `static` (so `relative`, `fixed`, or `absolute`).

```js
import React from 'react'
import Ink from 'react-ink'

const InkeyButton () => {
  return (
    <button style={{ position: "relative" }}>
      <Ink />
    </button>
  )
}
```

There are several options available for how `<Ink />` renders, see the [`getDefaultProps()` declaration](https://github.com/vigetlabs/react-ink/blob/master/src/index.js#L33-L37), however descriptions follow:


## Configuration

```javascript
{
  background : true,      // When true, pressing the ink will cause the background to fill with the current color
  duration   : 1000,      // Duration of the full animation completion
  opacity    : 0.25,      // The opacity of the ink blob
  radius     : 150,       // The size of the effect, will not exceed bounds of containing element
  recenter   : true,      // When true, recenter will pull ink towards the center of the containing element
  style      : {...},     // See src/style.js. Any rules set here will extend these values
  hasTouch   : true|false // Override internal hasTouch detection
}
```


***

<a href="http://code.viget.com">
  <img src="http://code.viget.com/github-banner.png" alt="Code At Viget">
</a>

Visit [code.viget.com](http://code.viget.com) to see more projects from [Viget.](https://viget.com)

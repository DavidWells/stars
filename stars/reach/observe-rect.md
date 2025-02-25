---
repo: reach/observe-rect
url: 'https://github.com/reach/observe-rect'
homepage: null
starredAt: '2021-07-07T05:50:56Z'
createdAt: '2018-06-02T07:04:29Z'
updatedAt: '2024-12-10T14:15:19Z'
language: JavaScript
license: NA
branch: develop
stars: 401
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:51.517Z'
description: Observe the Rect of a DOM Element
tags: []
---

<p align="center">
  <a href="https://reach.tech">
    <img alt="Reach observeRect" src="./logo.png" width="400">
  </a>
</p>

<p align="center">
  Observe the rect of a DOM element.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@reach/observe-rect"><img src="https://img.shields.io/npm/v/@reach/observe-rect.svg?style=flat-square"></a>
  <a href="https://www.npmjs.com/package/@reach/observe-rect"><img src="https://img.shields.io/npm/dm/@reach/observe-rect.svg?style=flat-square"></a>
</p>

<p align="center">
  <img src="./demo.gif" alt="Demo"/>
</p>

## Installation

```
npm install @reach/observe-rect
# or
yarn add @reach/observe-rect
```

## Usage

```js
import observeRect from "@reach/observe-rect";

let node = document.getElementById("some-node");

let rectObserver = observeRect(node, rect => {
  console.log("left", rect.left);
  console.log("top", rect.top);
  console.log("height", rect.height);
  console.log("width", rect.width);
});

// start observing
rectObserver.observe();

// stop observing
rectObserver.unobserve();
```

## About

A lot of things can change the position or size of an element, like scrolling, content reflows and user input. This utility observes and notifies you when your element's rect changes.

## Legal

MIT License
Copyright (c) 2018-present, Ryan Florence

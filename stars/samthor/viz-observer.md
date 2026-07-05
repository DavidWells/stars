---
repo: samthor/viz-observer
url: 'https://github.com/samthor/viz-observer'
homepage: 'https://www.npmjs.com/package/viz-observer'
starredAt: '2024-02-27T04:56:16Z'
createdAt: '2021-01-22T05:49:33Z'
updatedAt: '2025-01-02T02:54:29Z'
language: TypeScript
license: Apache-2.0
branch: main
stars: 27
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:35.102Z'
description: Notifies your code on DOM node move or resize
tags:
  - dom
  - javascript
---


This is an ES Module which exports the default method `vizObserver`.
It notifies you when an element is resized or moved on a page, including when it appears or disappears (similar to but _not quite_ being added/removed from the DOM).
See [this post](https://whistlr.info/2021/observing-dom/) for an explanation, or watch the animation:

<div style="text-align: center">
  <img src="https://storage.googleapis.com/hwhistlr.appspot.com/assets/node-io-hack.webp" />
</div>

## Usage

Install as "viz-observer".

```js
import vizObserver from 'viz-observer';

const cleanup = vizObserver(yourElement, (rect) => {
  console.info('element is now at', rect);
});

// later
cleanup();
```

This returns a cleanup method which you _must_ call when done, otherwise you risk memory leaks.
You can instead pass an `AbortSignal` as `{signal}` in the third argument:

```js
const ac = new AbortController();

vizObserver(yourElement, yourCallback, {signal: ac.signal});

// later
ac.abort();
```

## Requirements

This requires `IntersectionObserver`, which [is pretty widely supported](https://caniuse.com/intersectionobserver).
It also requires `ResizeObserver` but this was released before `IntersectionObserver` in all browsers bar one.

For Safari 12.x, which was the only browser to introduce `IntersectionObserver` _before_ `ResizeObserver`, it supports working in a slightly restricted mode: it won't report elements shrinking.
It'll only report elements when they grow, move or are removed/added from the page.

## Notes

This works totally fine inside Shadow DOM.
It's how the author uses it: I report the location of interesting elements and "attach" unrelated elements to them, such as for a popup or tooltip.

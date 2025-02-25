---
repo: jchn/simple-masonry-layout
url: 'https://github.com/jchn/simple-masonry-layout'
homepage: 'https://simple-masonry-layout.netlify.app'
starredAt: '2025-01-01T00:19:33Z'
createdAt: '2016-02-22T11:33:54Z'
updatedAt: '2025-01-01T06:51:47Z'
language: TypeScript
license: MIT
branch: master
stars: 12
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:53:33.241Z'
description: >-
  Calculating masonry layouts based on rectangles, without being tied to the
  DOM.
tags:
  - layout
  - masonry
  - masonry-grid
  - masonry-layout
---

# SimpleMasonryLayout

Create masonry style layouts and render them any way you want.

## Install

`npm i @jchn/simple-masonry-layout`

## Creating the layout

SimpleMasonryLayout has one single function which is called `getLayout`, this function will return an object describing the layout.

```ts
import { getLayout } from "@jchn/simple-masonry-layout";

const items = [
  { size: { width: 150, height: 200 }, data: null },
  { size: { width: 200, height: 150 }: data: null },
];
const layout = getLayout(items, 800, 3, { gutter: 10 });
```

```ts
getLayout<T>(
  items: Item<T>[],    // The input dimensions, oftentimes the width and height of an image
  width: number,    // The width of the grid
  columns: number,  // The number of columns
  options?: Options // More options
) => Layout<T>

type Layout<T> = {
  items: GridItem<T>[]
  height: number
}

type Item<T> = {
  size: Size,
  data: T
}

type GridItem<T> = {
  rect: Rect
  data: T
}

type Size = {
  width: number,
  height: number
}

type Rect = {
  x: number,
  y: number,
  width: number,
  height: number
}

type Options = {
  gutter: number,   // x and y gutter
  gutterX: number,  // x gutter
  gutterY: number,  // y gutter
  paddingY: number, // additional height added to rectangle
  collapsing: bool, // if the elements should collapse into each other
  centering: bool   // if the elements should be centered if there are less items then columns
}
```

Now it's up to you to translate this layout object to something on screen using the DOM or a Canvas or anything else:

```ts
const container = document.querySelector(".container")

container.style.height = `${layout.height}px`

layout.items.forEach({ rect } => {
  const div = document.createElement('div')

  div.style.cssText = `
    position: absolute;
    top: ${rect.x};
    left: ${rect.y};
    width: ${rect.width}px;
    height: ${rect.height}px;
    border: 1px solid;
  `

  document.body.appendChild(div)
})
```

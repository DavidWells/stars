---
repo: accurat/yogurt-layout
url: 'https://github.com/accurat/yogurt-layout'
homepage: ''
starredAt: '2021-04-03T03:52:36Z'
createdAt: '2021-03-26T13:57:53Z'
updatedAt: '2025-02-06T09:42:29Z'
language: JavaScript
license: MIT
branch: main
stars: 30
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:54.874Z'
description: 'A small JS layout computation library, to organize space in SVGs and canvases.'
tags: []
---

<div align="center" style="text-align: center;">
  <h1>🍦 Yogurt Layout 🥛</h1>
  A small JS layout computation library, to organize space in SVGs and canvases.
</div>

<p align="center">
  <a href="https://www.npmjs.com/package/yogurt-layout">
    <img alt="npm"
      src="https://img.shields.io/npm/v/yogurt-layout">
  </a>
</p>

## Install

```bash
yarn add yogurt-layout
```

or

```bash
npm install yogurt-layout --save
```

## Example

To obtain this result:

<img width="250" alt="screenshot" src="https://user-images.githubusercontent.com/1799710/112647465-d8bd3480-8e48-11eb-8ecd-79309ef8419c.png">

Do this and then render the given `<rect>`s:

```js
const layout = makeLayout({
  id: 'root',
  direction: 'column',
  width: 500,
  height: 500,
  padding: 20,
  children: [
    { id: 'title', width: '100%', height: 50 },
    {
      id: 'chart',
      width: '100%',
      height: 'auto',
      direction: 'row',
      padding: 0,
      children: [
        { id: 'left', width: 100, height: '100%' },
        {
          id: 'center-wrapper',
          width: 'auto',
          height: '100%',
          padding: [10, 20],
          direction: 'row',
          children: [{ id: 'center', width: '100%', height: '100%' }],
        },
        { id: 'right', width: 100, height: '100%' },
      ],
    },
    { id: 'legend', width: '100%', height: 150 },
  ],
})

console.log(layout)

// layout === {
//   root: { top, left, right, bottom, width, height },
//   title: { top, left, right, bottom, width, height },
//   chart: { top, left, right, bottom, width, height },
//   legend: { top, left, right, bottom, width, height },
//   ...
// }
```

## API

The only exported function is `makeLayout`, which is to be called with a nested configuration of **LayoutNode**s.
The root node **LayoutNodeRoot** must have numerical `width` and `height`, the nested ones can have them in *pixels* (integers), *percentages* (strings as `'50%'`), or *`'auto'`* to make it auto-expanding and take  the remaining space.
Every **LayoutNode** can also have children, a `direction` to position them (`'row' | 'column'`) and a padding (ssupporting CSS format as arrays).
The output is an object with the ids as keys, and the LayoutBlocks `{ width, height, left, top }` as values.

```typescript
declare function makeLayout(root: LayoutNodeRoot): Dictionary<LayoutBlock>

// Where:

type LayoutNode = {
  id: string
  children?: LayoutNode[]
  width: number | Percentage | 'auto'
  height: number | Percentage | 'auto'
  direction?: 'row' | 'column'
  padding?: PaddingFormat //
}

type LayoutNodeRoot = LayoutNode & { width: number; height: number; top?: number; left?: number }

type PaddingFormat =
  | number
  | [number, number]
  | [number, number, number, number]
  | { top?: number; right?: number; bottom?: number; left?: number }

type LayoutBlock = {
  id: string
  width: number
  height: number
  top: number
  left: number
}
```

## License

[MIT](https://github.com/accurat/yogurt-layout/blob/master/LICENSE) © [Accurat](https://github.com/accurat)

---

This project was bootstrapped with [urca generator](https://github.com/ilariaventurini/urca/).

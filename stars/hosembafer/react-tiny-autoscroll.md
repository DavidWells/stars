---
repo: hosembafer/react-tiny-autoscroll
url: 'https://github.com/hosembafer/react-tiny-autoscroll'
homepage: 'https://react-tiny-autoscroll.netlify.app'
starredAt: '2022-06-20T21:27:13Z'
createdAt: '2022-05-13T22:26:37Z'
updatedAt: '2023-04-28T10:04:38Z'
language: TypeScript
license: MIT
branch: main
stars: 19
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:41.786Z'
description: Automatically scrolls the element when the cursor approaches the boundaries.
tags:
  - autoscroll
  - react
  - react-autoscroll
  - scroll
  - scrollable
---

# react-tiny-autoscroll
[![npm version](https://img.shields.io/npm/v/react-tiny-autoscroll?logo=npm)](https://www.npmjs.com/package/react-tiny-autoscroll)
[![npm downloads](https://img.shields.io/npm/dw/react-tiny-autoscroll?logo=npm)](https://www.npmjs.com/package/react-tiny-autoscroll)
[![npm size](https://img.shields.io/bundlephobia/minzip/react-tiny-autoscroll?logo=npm)](https://www.npmjs.com/package/react-tiny-autoscroll)
![commit activity](https://img.shields.io/github/commit-activity/y/hosembafer/react-tiny-autoscroll)
![license](https://img.shields.io/github/license/hosembafer/react-tiny-autoscroll)

Automatically scrolls the element when the cursor approaches the boundaries.

### [Demo](https://react-tiny-autoscroll.netlify.app)

Mostly helpful when used in combination with drag and drop-like components which do not support scrollable containers.

## Install via [npm](https://www.npmjs.com/package/react-tiny-autoscroll)

```shell
npm install react-tiny-autoscroll
```

or

```shell
yarn add react-tiny-autoscroll
```

## Usage

```JSX
const containerRef = useRef();

useAutoScroll({
  containerRef,
});

// Making our container scrollable
const style: CSSProperties = {
  height: 400,
  overflowY: "auto",
  border: "1px solid red",
};

return (
  <div ref={containerRef} style={style}>
    {items.map((n) => (
      <Item key={n} />
    )}
  </div>
);
```

## API

- `containerRef` - reference to the scrollable container
- `skip` - lets you disable/enable the scrolling
- `threshold` - distance to boundaries where scrolling will start
- `maxSpeed` - maximum number of pixels allowed to scroll in 10ms

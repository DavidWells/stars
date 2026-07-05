---
repo: AndrzejSala/use-scroll-direction
url: 'https://github.com/AndrzejSala/use-scroll-direction'
homepage: 'https://andrzejsala.github.io/use-scroll-direction/'
starredAt: '2021-12-26T02:49:24Z'
createdAt: '2021-09-18T21:08:06Z'
updatedAt: '2025-02-15T01:03:30Z'
language: TypeScript
license: MIT
branch: main
stars: 32
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:25.613Z'
description: >-
  A simple, performant, and cross-browser hook for detecting scroll direction in
  your next react app.
tags:
  - custom-hook
  - detect
  - direction
  - hook
  - hooks
  - react
  - scroll
  - scrolling
  - typescript
  - window
---

<p align="center">
  <a href="https://www.npmjs.com/package/use-scroll-direction"><img src="https://user-images.githubusercontent.com/16742965/138960767-ef7af8a6-da86-4db3-848f-ad8d1aec3beb.png" align="center" width="80" /></a>
</p>
<h1 align="center">use-scroll-direction</h1>

[![Latest Stable Version](https://img.shields.io/npm/v/use-scroll-direction.svg)](https://www.npmjs.com/package/use-scroll-direction)
[![CI Status](https://github.com/AndrzejSala/use-scroll-direction/workflows/CI/badge.svg)](https://github.com/AndrzejSala/use-scroll-direction/actions)
[![Codecov](https://img.shields.io/codecov/c/github/AndrzejSala/use-scroll-direction.svg)](https://www.npmjs.com/package/use-scroll-direction)
[![Gzipped size](https://img.shields.io/bundlephobia/minzip/use-scroll-direction?label=size)](https://www.npmjs.com/package/use-scroll-direction)
[![License](https://img.shields.io/npm/l/use-scroll-direction.svg)](./LICENSE)

> A simple, performant, and cross-browser hook for detecting scroll direction in your next react app.

## Key Features
- **Performant** 🔥 </br>
Do what is only needed. In a good way. </br>
Use passive listener and throttling to make it invesible for your device.

- **Versatile** 💪🏼 </br>
Handle both X & Y axis, on browser window or custom element (ref).
Need more quick/lazy response? Play with `wait` option.

- **Microlight** 🪶 </br>
It's lighter than the air, only ~1.6kB.

- **Cross-everything** 🖥️ </br>
The same behavior on all kind of browsers and devices. No excuces (even on Iphone Safari).

- **Great support** 👨🏻 </br>
Stuck with implementation or has interesting use case and need something more? Create an issue and share your voice.  

## Installation
```bash
npm i use-scroll-direction
```

## Usage
The hook returns the object with the actual scroll direction which could be one of three states: **'NONE'**, **'DOWN'**, **'UP'**, **'LEFT'**, **'RIGHT'** and useful booleans.

### Use on window object
```tsx
import {useScrollDirection} from "use-scroll-direction";

export const WindowExample = () => {
    const {
        scrollDirection,
        isScrolling,
        isScrollingUp,
        isScrollingDown,
        isScrollingLeft,
        isScrollingRight
    } = useScrollDirection();

    useEffect(() => {
        console.log(scrollDirection)
    }, [scrollDirection]);

    return (
      <div>{...}</div>
    )
};

```
### Use on the specific element
```tsx
import {useScrollDirection} from "use-scroll-direction";

export const ComponentRefExample = () => {
    const elementRef = useRef(null);
    const {scrollDirection} = useScrollDirection({ref: elementRef});

    useEffect(() => {
        console.log(scrollDirection)
    }, [scrollDirection]);

    return (
        //The content needs to overflow a container
        <div ref={elementRef} style={{height: '100vh', overflowY: 'scroll'}} >
            <div>{...}</div>
        </div>
    )
};
```

## Available options

| Name | Type | Description |
| - | - | - |
| `wait` | `?number` | Time in ms for throttling of scroll handler (default: 50)
| `timeToReset` | `?number` | Time in ms after last scroll event to reset the state (default: 150)
| `ref` | `?HTMLElement` | When passed, the listener will be attached to element instead of window object 

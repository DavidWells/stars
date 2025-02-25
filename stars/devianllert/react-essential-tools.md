---
repo: devianllert/react-essential-tools
url: 'https://github.com/devianllert/react-essential-tools'
homepage: 'https://devianllert.github.io/react-essential-tools/'
starredAt: '2020-12-31T21:18:31Z'
createdAt: '2019-11-08T12:00:29Z'
updatedAt: '2025-01-28T16:55:17Z'
language: TypeScript
license: MIT
branch: master
stars: 13
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:12.672Z'
description: Collection of essential React Hooks and Components
tags:
  - components
  - hooks
  - react
  - react-hooks
  - reactjs
  - typescript
  - web
---

# react-essential-tools

<div align="center">
  <a href="https://circleci.com/gh/devianllert/react-essential-tools/">
    <img src="https://circleci.com/gh/devianllert/react-essential-tools/tree/develop.svg?style=svg" alt="Build" />
  </a>
  <a href="https://www.npmjs.com/package/react-essential-tools">
    <img src="https://img.shields.io/npm/v/react-essential-tools.svg" alt="NPM package" />
  </a>
  <a href="https://github.com/devianllert/react-essential-tools/issues">
    <img src="https://img.shields.io/github/issues/devianllert/react-essential-tools.svg" alt="Issue Status" />
  </a>
  <a href="https://github.com/devianllert/react-essential-tools/issues">
    <img src="https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat" alt="Contributions welcome" />
  </a>
  <img alt="Travis (.org)" src="https://img.shields.io/travis/devianllert/react-essential-tools">
  <br/>
  <br/>
</div>

Collection of essential React Hooks and Components

[Live storybook usage examples](https://devianllert.github.io/react-essential-tools/)

# Features

- Easy to learn and use.
- Contains a wealth of useful Components.
- Contains a wealth of advanced Hooks that are refined from the app.
- Contains a wealth of basic Hooks.
- Written in TypeScript.

## Installation

```
npm i react-essential-tools
```

## Usage

You need to have React [`16.8.0`](https://reactjs.org/blog/2019/02/06/react-v16.8.0.html) or later installed to use the Hooks API. You can import each hook or component using ES6 named imports (tree shaking recommended).

```js
import { Tooltip, useAsync } from 'react-essential-tools';
```

### Components

| Source | Preview | Short description |
| ------ | ------- | ----------------- |
| [`CircularProgress`](./src/components/CircularProgress) | [Demo](https://devianllert.github.io/react-essential-tools/?path=/story/components-circularprogress--indeterminate) | Progress indicators commonly known as spinners, express an unspecified wait time or display the length of a process. |
| [`Modal`](./src/components/Skeleton) | [Demo](https://devianllert.github.io/react-essential-tools/?path=/story/components-modal--basic) | Provides a solid foundation for creating dialogs, popovers, lightboxes, or whatever else. |
| [`Backdrop`](./src/components/Skeleton) | [Demo](https://devianllert.github.io/react-essential-tools/?path=/story/components-backdrop--basic) | A dimmed layer over your application. |
| [`Skeleton`](./src/components/Skeleton) | [Demo](https://devianllert.github.io/react-essential-tools/?path=/story/components-skeleton--basic) | Placeholder for loading |
| [`NoSsr`](./src/components/NoSsr) | | Disable SSR for content |
| [`Tooltip`](./src/components/Tooltip) | [Demo](https://devianllert.github.io/react-essential-tools/?path=/story/components-tooltip--basic) | Small popup with info |
| [`Popper`](./src/components/Popper) | [Demo](https://devianllert.github.io/react-essential-tools/?path=/story/components-popper--basic) | Displays content on top of another |
| [`Collapse`](./src/components/Collapse) | [Demo](https://devianllert.github.io/react-essential-tools/?path=/story/components-collapse--basic) | Animates expand/collapse of content |
| [`Slide`](./src/components/Slide) | [Demo](https://devianllert.github.io/react-essential-tools/?path=/story/components-slide--basic) | Animates slide-in/slide-out of content |
| [`Zoom`](./src/components/Zoom) | [Demo](https://devianllert.github.io/react-essential-tools/?path=/story/components-zoom--basic) | Animates zoom-in/zoom-out of content |
| [`Fade`](./src/components/Fade) | [Demo](https://devianllert.github.io/react-essential-tools/?path=/story/components-fade--basic) | Animates fade-in/fade-out of content |
| [`Grow`](./src/components/Grow) | [Demo](https://devianllert.github.io/react-essential-tools/?path=/story/components-grow--basic) | Animates scale-in/scale-out of content |
| [`Portal`](./src/components/Portal) | [Demo](https://devianllert.github.io/react-essential-tools/?path=/story/components-portal--basic) | Render content inside any target DOM-node |

### Hooks

| Source | Preview | Short description |
| ------ | ------- | ----------------- |
| [`useDebouncedCallback`](./src/hooks/useDebouncedCallback) | [Demo](https://devianllert.github.io/react-essential-tools/?path=/story/hooks-usedebouncedcallback--basic) | Get debounced callback |
| [`useLongPress`](./src/hooks/useLongPress) | [Demo](https://devianllert.github.io/react-essential-tools/?path=/story/hooks-uselongpress--basic) | Fires a callback after long pressing |
| [`useHover`](./src/hooks/useHover) | [Demo](https://devianllert.github.io/react-essential-tools/?path=/story/hooks-usehover--basic) | Tracks hovering of the element |
| [`useHistory`](./src/hooks/useHistory) | [Demo](https://devianllert.github.io/react-essential-tools/?path=/story/hooks-usehistory--basic) | State with undo/redo/reset |
| [`useMedia`](./src/hooks/useMedia) | [Demo](https://devianllert.github.io/react-essential-tools/?path=/story/hooks-usemedia--basic) | CSS media query state |
| [`useMotion`](./src/hooks/useMotion) | [Demo](https://devianllert.github.io/react-essential-tools/?path=/story/hooks-usemotion--basic) | Device acceleration sensor state |
| [`useClipboard`](./src/hooks/useClipboard) | [Demo](https://devianllert.github.io/react-essential-tools/?path=/story/hooks-useclipboard--basic) | Read and write to the user's clipboard |
| [`useMouse`](./src/hooks/useMouse) | [Demo](https://devianllert.github.io/react-essential-tools/?path=/story/hooks-usemouse--basic) | Mouse position state  |
| [`useIntersection`](./src/hooks/useIntersection) | [Demo](https://devianllert.github.io/react-essential-tools/?path=/story/hooks-useintersection--basic) | Intersection of elements\viewport state |
| [`useClickAway`](./src/hooks/useClickAway) | [Demo](https://devianllert.github.io/react-essential-tools/?path=/story/hooks-useclickaway--basic) | Fires a callback on outside click |
| [`useNetwork`](./src/hooks/useNetwork) | [Demo](https://devianllert.github.io/react-essential-tools/?path=/story/hooks-usenetwork--basic) | Network information state |
| [`useWindowScroll`](./src/hooks/useWindowScroll) | [Demo](https://devianllert.github.io/react-essential-tools/?path=/story/hooks-usewindowscroll--basic) | Window scroll position state |
| [`useKey`](./src/hooks/useKey) | [Demo](https://devianllert.github.io/react-essential-tools/?path=/story/hooks-usekey--basic) | Fires a callback after configured keyboard keys usage |
| [`useEvent`](./src/hooks/useEvent) | [Demo](https://devianllert.github.io/react-essential-tools/?path=/story/hooks-useevent--basic) | Add listeners and auto-clean on unmount |
| [`useTimeoutFn`](./src/hooks/useTimeoutFn) | [Demo](https://devianllert.github.io/react-essential-tools/?path=/story/hooks-usetimeoutfn--basic) | Fires callback with delay |
| [`useInterval`](./src/hooks/useInterval) | [Demo](https://devianllert.github.io/react-essential-tools/?path=/story/hooks-useinterval--basic) | Fires callback with controlled interval |
| [`usePrevious`](./src/hooks/usePrevious) | [Demo](https://devianllert.github.io/react-essential-tools/?path=/story/hooks-useprevious--basic) | Previous state value |
| [`useUpdateEffect`](./src/hooks/useUpdateEffect) | [Demo](https://devianllert.github.io/react-essential-tools/?path=/story/hooks-useupdateeffect--basic) | `useEffect` with first invocation skip |
| [`useMount`](./src/hooks/useMount) | [Demo](https://devianllert.github.io/react-essential-tools/?path=/story/hooks-usemount--basic) | Fires callback on mount |
| [`useUnmount`](./src/hooks/useUnmount) | [Demo](https://devianllert.github.io/react-essential-tools/?path=/story/hooks-useunmount--basic) | Fires callback on unmount |
| [`useLocalStorage`](./src/hooks/useLocalStorage) | | Sync state to `localstorage` |
| [`useAsync`](./src/hooks/useAsync) | [Demo](https://devianllert.github.io/react-essential-tools/?path=/story/hooks-useasync--basic) | Async/Promise resolved instantly to state |
| [`useAsyncFn`](./src/hooks/useAsyncFn) | [Demo](https://devianllert.github.io/react-essential-tools/?path=/story/hooks-useasyncfn--basic) | Async/Promise resolved by callback to state |
| [`useBoolean`](./src/hooks/useBoolean) | [Demo](https://devianllert.github.io/react-essential-tools/?path=/story/hooks-useboolean--basic) | State with boolean value and toggle callback |
| [`useSetState`](./src/hooks/useSetState) | [Demo](https://devianllert.github.io/react-essential-tools/?path=/story/hooks-usesetstate--basic) | State with similar to class components `setState` merging behavior |
| [`useFirstMountState`](./src/hooks/useFirstMountState) | [Demo](https://devianllert.github.io/react-essential-tools/?path=/story/hooks-usefirstmountstate--basic) | Return `true` on first component's render |
| [`useMountedState`](./src/hooks/useMountedState) | [Demo](https://devianllert.github.io/react-essential-tools/?path=/story/hooks-usemountedstate--basic) | Return callback to check if component is mounted |
| [`useIsomorphicLayoutEffect`](./src/hooks/useIsomorphicLayoutEffect) | | `useLayoutEffect` that does not show warning when server-side rendering |

## License

This project is licensed under the MIT license, Copyright (c) 2019 Ruslan Povolockii.
For more information see [`LICENSE.md`](./LICENSE.md).

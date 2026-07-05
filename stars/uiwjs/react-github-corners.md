---
repo: uiwjs/react-github-corners
url: 'https://github.com/uiwjs/react-github-corners'
homepage: 'https://uiwjs.github.io/react-github-corners'
starredAt: '2021-07-24T18:42:02Z'
createdAt: '2019-11-20T14:14:42Z'
updatedAt: '2025-02-01T08:15:50Z'
language: TypeScript
license: MIT
branch: master
stars: 14
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:49.982Z'
description: >-
  Add a Github corner to your project page, This GitHub corner for react
  component/web component.
tags:
  - corners
  - github
  - github-pages
  - react
  - react-component
  - react-github-corners
  - reactjs
  - web-component
  - web-components
---

react-github-corners
===
<!--dividing-->

[![CI](https://github.com/uiwjs/react-github-corners/actions/workflows/ci.yml/badge.svg)](https://github.com/uiwjs/react-github-corners/actions/workflows/ci.yml)
[![jsDelivr CDN](https://data.jsdelivr.com/v1/package/npm/@uiw/react-github-corners/badge?style=rounded)](https://www.jsdelivr.com/package/npm/@uiw/react-github-corners)
[![NPM Downloads](https://img.shields.io/npm/dm/@uiw/react-github-corners.svg?style=flat)](https://www.npmjs.com/package/@uiw/react-github-corners)
[![npm version](https://img.shields.io/npm/v/@uiw/react-github-corners.svg)](https://www.npmjs.com/package/@uiw/react-github-corners)
[![Open in unpkg](https://img.shields.io/badge/Open%20in-unpkg-blue)](https://uiwjs.github.io/npm-unpkg/#/pkg/@uiw/react-github-corners/file/README.md)

Add a Github corner to your project page, This [GitHub corners](https://uiwjs.github.io/react-github-corners) for [**@react**](https://github.com/facebook/react) component. Visit [https://uiwjs.github.io/react-github-corners](https://uiwjs.github.io/react-github-corners) to preview the example effects.

Preview Example: [Github](https://uiwjs.github.io/react-github-corners) | [Gitee](https://uiw.gitee.io/react-github-corners/)

## Installation

```bash
npm install --save @uiw/react-github-corners
# Via Yarn:
yarn add @uiw/react-github-corners
```

Or use Web Components

```bash
npm install --save @uiw/github-corners
```

Or load the ES module directly through unpkg

unpkg.com CDN:

```html
<script type="module" src="https://unpkg.com/@uiw/github-corners?module"></script>
```

Skypack CDN:

```html
<script type="module" src="https://cdn.skypack.dev/@uiw/github-corners"></script>
```

## Usage

```jsx
import GitHubCorners from '@uiw/react-github-corners';

function Demo() {
  return (
    <GitHubCorners
      position="left"
      href="https://github.com/uiwjs/react-github-corners"
    />
  )
}
```

Use it in your HTML:

```html
<github-corners target="__blank" position="fixed" href="https://github.com/uiwjs/react-github-corners"></github-corners>
```

Learn about web components [here](https://developer.mozilla.org/en-US/docs/Web/Web_Components).

[![npm version](https://img.shields.io/npm/v/@uiw/github-corners.svg?label=github-corners)](https://www.npmjs.com/package/@uiw/github-corners)

Using web components in React:

```jsx
import React from 'react';
import '@uiw/github-corners';

function Demo() {
  return (
    <github-corners target="__blank" position="fixed" href="https://github.com/uiwjs/react-github-corners"></github-corners>
  );
}
```

## React Props

```typescript
interface GitHubCornersProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * The link to your project page.
   */
  href?: string;
  /**
   * The width and height of the corner. 
   * Default: `80`
   */
  size?: number;
  /**
   * The background color of the corner.
   * Default: `#151513`
   */
  bgColor?: string;
  /**
   * The Github logo color of the corner.
   * Default: `#fff`
   */
  color?: string;
  /**
   * The position of corner. 
   * Default: `right`
   */
  position?: 'left' | 'right';
  /**
   * It is positioned relative to the initial containing block established.
   * Default: `false`
   */
  fixed?: boolean;
  /**
   * Sets the z-order of a positioned element and its descendants or flex items.
   */
  zIndex?: number;
}
```

| Property Name | Type | Default Value | Description |
| ---- | ---- | ---- | ---- |
| href | String | - | The link to your project page. |
| size | String | `80` | The width and height of the corner. |
| bgColor | String | `#151513` | The background color of the corner. |
| color | String | `#fff` | The Github logo color of the corner. |
| position | String | `left`/`right` | The position of corner. |
| fixed | Boolean | `false` | It is positioned relative to the initial containing block established. |
| zIndex | Number | - | Sets the z-order of a positioned element and its descendants or flex items. |

## Development

Runs the project in development mode.  

```bash
# Step 1, run first, listen to the component compile and output the .js file
npm run hoist
# Step 2, listen for compilation output type .d.ts file
npm run watch:wc
npm run watch
# Step 3, development mode, listen to compile preview website instance
npm run start
```

Builds the app for production to the build folder.

```bash
npm run build:all
npm run doc
```

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

## Contributors

As always, thanks to our amazing contributors!

<a href="https://github.com/uiwjs/react-github-corners/graphs/contributors">
  <img src="https://uiwjs.github.io/react-github-corners/CONTRIBUTORS.svg" />
</a>

Made with [action-contributors](https://github.com/jaywcjlove/github-action-contributors).

## License

Licensed under the MIT License.

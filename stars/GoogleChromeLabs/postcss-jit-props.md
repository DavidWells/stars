---
repo: GoogleChromeLabs/postcss-jit-props
url: 'https://github.com/GoogleChromeLabs/postcss-jit-props'
homepage: 'https://stackblitz.com/edit/jit-open-props?file=postcss.config.js'
starredAt: '2021-10-19T19:10:08Z'
createdAt: '2021-10-04T17:52:43Z'
updatedAt: '2025-02-20T15:12:17Z'
language: JavaScript
license: Apache-2.0
branch: main
stars: 223
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:42.307Z'
description: >-
  A CSS custom property helper based on PostCSS. Supply a pool of variables and
  this plugin will add them to the stylesheet as they are used.
tags:
  - bundle-size
  - custom-properties
  - postcss-plugin
---

# PostCSS (Just In Time) Props

> Only ship used variables! A CSS custom property helper based on PostCSS

[![Version](https://img.shields.io/npm/v/postcss-jit-props)](https://www.npmjs.com/package/postcss-jit-props)
[![postcss compatibility](https://img.shields.io/npm/dependency-version/postcss-jit-props/peer/postcss)](https://postcss.org/)
[![Unit Tests](https://github.com/GoogleChromeLabs/postcss-jit-props/actions/workflows/node.js.yml/badge.svg)](https://github.com/GoogleChromeLabs/postcss-jit-props/actions/workflows/node.js.yml)

<br>

`postcss-jit-props` watches for CSS variables and ensures a value entry exists in the stylesheet. [Try in browser](https://stackblitz.com/edit/jit-open-props?file=postcss.config.js)

This lets you **provide a huge pool of properties** for development and design, and rather than try and purge unused variables, **only adds what was used**. 

<br>

## Example

CSS Before / During Development:  
```css
.foo {
  color: var(--brand-1);
  padding: var(--size-1) var(--size-2);
  margin-block-start: var(--size-2);
  animation: var(--fade-in);
}

@media (--dark) {
  .foo {
    color: white;
  }
}
```

CSS After / Result of Plugin:  
```diff
+ @custom-media --dark (prefers-color-scheme: dark);

+ :root {
+   --brand-1: #81A1C1;
+   --size-1: 1rem;
+   --size-2: 2rem;
+   --fade-in: fade-in .5s ease;
+ }

.foo {
  color: var(--brand-1);
  padding: var(--size-1) var(--size-2);
  margin-block-start: var(--size-2);
  animation: var(--fade-in);
}

@media (--dark) {
  .foo {
    color: white;
  }
}

+ @keyframes fade-in {
+   to { opacity: 1; }
+ }
```

<br>

## Usage

**Step 1:** Install plugin:

```sh
npm install --save-dev postcss-jit-props
```

<br>

**Step 2:** Add the plugin to plugins in `postcss.config.js` and **pass it your props (CSS || JS || JSON)**.

Pass JS objects:
```js
module.exports = {
  plugins: [
    require('postcss-jit-props')({
      '--brand-1': '#81A1C1',
      '--size-1': '1rem',
      '--size-2': '2rem',
      '--fade-in': 'fade-in .5s ease',
      '--fade-in-@': '@keyframes fade-in {to { opacity: 1 }}',
      '--dark': '@custom-media --dark (prefers-color-scheme: dark);',
      '--text': 'white',
      '--text-@media:dark': 'black',
    }),
    require('autoprefixer'),
  ]
}
```

or pass CSS files 

```js
module.exports = {
  plugins: [
    require('postcss-jit-props')({files: ['./props.css']}),
    require('autoprefixer'),
  ]
}
```

or JSON ✨

> Javascript and JSON must use the `-@` suffix on their custom property name in order for jit-props to find associated `@keyframes`

Configure where the selector the props are pushed to. Some CSS Module environments, for example, don't want the props in `:root`, so we can configure the plugin to push them where it's acceptable for the environment, like `:global`: 

```js
module.exports = {
  plugins: [
    require('postcss-jit-props')({
      ...MyProps,
      custom_selector: ':global'
    }),
    require('autoprefixer'),
  ]
}
```

Configure the `@layer` the props are pushed to. : 

```js
module.exports = {
  plugins: [
    require('postcss-jit-props')({
      ...MyProps,
      layer: 'design.system'
    }),
    require('autoprefixer'),
  ]
}
```

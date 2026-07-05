---
repo: vadimdemedes/import-jsx
url: 'https://github.com/vadimdemedes/import-jsx'
homepage: ''
starredAt: '2022-10-21T03:55:04Z'
createdAt: '2017-06-24T09:06:00Z'
updatedAt: '2024-11-16T15:12:57Z'
language: JavaScript
license: MIT
branch: main
stars: 179
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:19.427Z'
description: Import and transpile JSX on the fly
tags: []
---

# import-jsx ![Build Status](https://github.com/vadimdemedes/import-jsx/workflows/test/badge.svg)

> Import and transpile JSX via [loader hooks](https://nodejs.org/dist/latest-v18.x/docs/api/esm.html#loaders). It doesn't transpile anything besides JSX and caches transpiled sources by default.

## Install

```console
npm install import-jsx
```

## Usage

> **Note**:
> `import-jsx` only works with ES modules.

```sh
node --loader=import-jsx react-example.js
```

**react-example.js**

```jsx
const HelloWorld = () => <h1>Hello world</h1>;
```

## Examples

### React

React is auto-detected by default and `react` will be auto-imported, if it's not already.

```jsx
const HelloWorld = () => <h1>Hello world</h1>;
```

### Preact

If an alternative library is used and exports `createElement`, like Preact, configure `import-jsx` to import it instead of React:

```jsx
/** @jsxImportSource preact */

const HelloWorld = () => <h1>Hello world</h1>;
```

### Any JSX pragma

For libraries not compatible with React's API, but which still support JSX, import it and configure `import-jsx` to use its pragma:

```jsx
/** @jsxRuntime classic */
/** @jsx h */
import h from 'vhtml';

const HelloWorld = () => <h1>Hello world</h1>;
```

### Disable cache

`import-jsx` caches transpiled sources by default, so that the same file is transpiled only once.
If that's not a desired behavior, turn off caching by setting `IMPORT_JSX_CACHE=0` or `IMPORT_JSX_CACHE=false` environment variable.

```console
IMPORT_JSX_CACHE=0 node --loader=import-jsx my-code.js
```

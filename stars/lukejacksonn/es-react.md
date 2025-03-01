---
repo: lukejacksonn/es-react
url: 'https://github.com/lukejacksonn/es-react'
homepage: 'https://codepen.io/lukejacksonn/pen/EMxVWM'
starredAt: '2019-09-29T06:05:48Z'
createdAt: '2019-02-25T17:27:27Z'
updatedAt: '2025-01-13T03:59:50Z'
language: JavaScript
license: NA
branch: master
stars: 232
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:22.497Z'
description: ES6 module exposing the latest version of react and react-dom
tags: []
---

# es-react

> An ES6 module exposing the latest version of react, react-dom, react-is, and prop-types

Ever wanted to just import react into your project as a module **without** a build step or even script tags? Native browser support for module [imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) is [pretty good](https://caniuse.com/#feat=es6-module) so this should be an option for react developers now! Alas, there has not been an ES6 module compatible build released yet.

This package allows you import `react` and `react-dom` as ES6 modules from a CDN like [`unpkg`](https://unpkg.com):

```html
<script type="module">
  import { React, ReactDOM, PropTypes } from 'https://unpkg.com/es-react';

  ReactDOM.render(
    React.createElement('h1', {}, 'Hello from es-react'),
    document.body
  );
</script>
```

By default es-react exports the **production build** of react. For the **development build** use the `/dev` subfolder:

```js
import { React, ReactDOM } from 'https://unpkg.com/es-react/dev';
```

You may also import any members of the React package directly:

```js
import React, {
  Component,
  useState /* ... */,
} from 'https://unpkg.com/es-react';
```

And every package is also being provided as a separate file:

- `es-react/index.js`: Exports all of `React` and exports `{ React, ReactDOM, ReactIs, PropTypes }`
- `es-react/react.js`: Exports all of `React` plus a default export
- `es-react/react-dom.js`: Exports all of `ReactDOM` plus a default export (but not `react-dom/server`)
- `es-react/react-is.js`: Exports all of `ReactIs` plus a default export
- `es-react/prop-types.js`: Exports all of `PropTypes` plus a default export
- `es-react/react-dom-server.js`: Exports all of `ReactDOMServerBrowser` plus a default export

All development-versions of these packages are also available under `es-react/dev/`.

## Features

- All the latest React features (hooks, suspense, lazy, memo etc.)
- Use React directly from any javascript file (no build step required)
- Compatible with [`htm`](https://github.com/developit/htm) (for JSX compilation at runtime)

## Usage

Import `React` and `ReactDOM` directly from any script with `type="module"`. The package is intended to be available from [`unpkg`](https://unpkg.com) (without having to append `?module` to the package name).

```js
import { React, ReactDOM } from 'https://unpkg.com/es-react@16.13.1';
```

It is strongly advised that you specify a version when requesting the module – this speeds up the request time and helps with caching. If you don't specify a number then unpkg will redirect and serve up the latest available version.

## Example

Create a new file, copy the code below into it and then open the file in a browser – or [try online](https://codepen.io/lukejacksonn/pen/EMxVWM).

> If you would like the browser to reload when you update the code, then you can use a dev server like [servor](https://github.com/lukejacksonn/servor) dependency free by running `npx servor --reload --browse`.

```js
<script type="module">
  import { React, ReactDOM } from 'https://unpkg.com/es-react@16.13.1';

  import htm from 'https://unpkg.com/htm?module'
  const html = htm.bind(React.createElement)

  const Counter = props => {
    const [count, setCount] = React.useState(parseInt(props.count))
    return html`
      <div>
        <h1>${count}</h1>
        <button onClick=${e => setCount(count - 1)}>Decrement</button>
        <button onClick=${e => setCount(count + 1)}>Increment</button>
      </div>
    `
  }

  ReactDOM.render(
    html`
      <h1>Look Ma! No script tags, no build step</h1>
      <${Counter} count=0 />
    `,
    document.body
  )

</script>
```

## Implementation

The latest versions of all packages are installed via (pinned) entries in `package.json` and built and bundled using Rollup with automatic code splitting.

The exports of each package are automatically expanded and `object-assign` is stripped from the output, since all browsers that support ESM will also support `Object.assign`
(See `scripts/expand-exports-plugin.js` and `scripts/replace-object-assign.js` for the Babel plugins that do this)

## Acknowledgements

Barely any of the code in this repo is written by myself. It is just a wrapper for React that is written and maintained by the team at Facebook. Thanks to my employer [Formidable](https://github.com/formidablelabs) for allowing me the time to think about and work on fun and experimental projects like this.

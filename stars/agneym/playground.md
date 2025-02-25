---
repo: agneym/playground
url: 'https://github.com/agneym/playground'
homepage: 'https://www.agney.dev/blog/introducing-playground'
starredAt: '2021-11-30T02:45:11Z'
createdAt: '2019-11-11T18:54:38Z'
updatedAt: '2025-02-19T00:49:18Z'
language: TypeScript
license: MIT
branch: master
stars: 1069
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:33.362Z'
description: 'A simple playground for HTML, CSS and JavaScript supporting module imports.'
tags:
  - microbundle
  - playground
  - react
  - styled-components
  - typescript
---

<p align="center"><img src="./assets/icon.png"></p>
<h2 align="center">Playground</h2>
<p align="center">
<strong>A simple playground for HTML, CSS and JavaScript supporting module imports.</strong>
<br>
<a href="https://www.npmjs.com/package/@agney/playground">
  <img src="https://badge.fury.io/js/%40agney%2Fplayground.svg" />
</a>
<img src="https://img.shields.io/badge/module%20formats-umd%2C%20cjs%2C%20esm-green.svg" />
<br />
<a href="https://github.com/agneym/playground/actions">
  <img src="https://github.com/agneym/playground/workflows/Node%20CI/badge.svg" />
</a>
<a href="https://prettier.io">
  <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square" />
</a>
<a href="http://makeapullrequest.com">
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" />
</a>
<br>

**Playground** is a HTML, CSS and JS demonstration component that runs entirely in the browser and does not require loading any third party sites.

<div align="center">
  <img src="https://user-images.githubusercontent.com/1884712/111428687-108fe380-86b5-11eb-94d1-a861e5c25d36.png" alt="screenshot" />
</div>

## Usage

Install from `npm` with:

```
npm install @agney/playground
# OR
yarn add @agney/playground
```

```jsx
import Playground from "@agney/playground";
/* Why is there a tabs import? https://github.com/agneym/playground#why-is-there-a-reacttabs-import*/
import "@reach/tabs/styles.css";

const App = () => {
  const snippet = {
    markup: `<div id=app />`,
    css: ``,
    javascript: `import { h, Component, render } from 'preact';
import htm from 'htm';

const html = htm.bind(h);

const app = html\`<div>Hello World from Playground!</div>\`

render(app, document.getElementById('app'));`,
  };
  return (
    <Playground
      id="example"
      initialSnippet={snippet}
      defaultEditorTab="javascript"
      transformJs
    />
  );
};
```

## Demo

https://www.agney.dev/blog/introducing-playground

## Features

1. Load preview for predefined code.
1. Autoreloading preview.
1. Allows bare ES package imports. This means you can add imports for any library that supports ES Module resolution and playground will automatically load it into your code.
1. See console output in the component itself.
1. Control the tab loaded by default for your use-case.

## Applications

1. Add to static blogs to present your HTML, CSS or JavaScript code.
1. Allow users to change the code and see the output in real time.

## API

|      Props       |                                                   description                                                   |                                           default                                           | required |
| :--------------: | :-------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------: | :------: |
|        id        |                                       a unique identifier for the iFrame                                        |                                                                                             |   true   |
|  initialSnippet  |                                          Initial code to be displayed                                           |                                                                                             |   true   |
| defaultEditorTab |                Initial editor tab to be displyed. Possible values: "markup", "css", "javascript"                |                                          "markup"                                           |  false   |
| defaultResultTab |                Initial tab on result panel to be displayed. Possible values: "console", "result"                |                                          "result"                                           |  false   |
|   transformJs    |             Transform the JavaScript using Babel. This is required if you want bare module imports              |                                            false                                            |  false   |
|     presets      | Array of presets you want Babel to transform. This works only if transformJs is true. Eg. `["react", "es2015"]` |                                                                                             |  false   |
|      theme       |                             Pass in the theme variables to customise the appearance                             | [Our Theme](https://github.com/agneym/playground/blob/master/playground/src/utils/theme.ts) |  false   |

### Format for initial snippet

```js
{
  markup: `<h1>Title</h1>`,
  css: `h1 { color: red }`,
  javascript: `console.log("this")`
}
```

### Why is there a @reach/tabs import?

Playground uses [`@reach/tabs`](https://reach.tech/tabs/) as a dependency. We could bundle the stylesheet or inject it inline on runtime. But both those options add unnecessary code if you are already using it.

_This might cause breaking changes if you have a different version of `@reach/tabs` but then I'm just expecting it to be stable along the road._

### How does module imports work?

If an NPM package exposes an endpoint for "module", then you can direcly import this package by it's name.

```js
import { format } from "date-fns";

format(new Date(2014, 1, 11), "yyyy-MM-dd");
```

Unfortunately, not all packages currently support this feature. You can search through an entire list of packages through [Skypack](https://www.skypack.dev/).

You can use community created packages to replicate the functionality. For eg. React would be:

```js
import React, { createElement } from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";

ReactDOM.render(
  createElement("div", {}, "Hello World"),
  document.getElementById("app")
);
```

### How do I demo React code with JSX?

```jsx
import Playground from "@agney/playground";

const App = () => {
  const snippet = {
    markup: `<div id=app />`,
    css: ``,
    javascript: `import React, { createElement } from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";

ReactDOM.render(
  <h1>Hello World</h1>,
  document.getElementById("app")
);`,
  };
  return (
    <Playground
      initialSnippet={snippet}
      defaultEditorTab="javascript"
      transformJs
      presets={["react"]}
    />
  );
};
```

## What about the bundle size?

The component is fairly small at about ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@agney/playground). You can find the total size and time on [Bundle Phobia](https://bundlephobia.com/result?p=@agney/playground).

When transforming JavaScript it uses [Babel Standalone](https://babeljs.io/docs/en/babel-standalone) which adds a considerable size. Playground loads Babel from a CDN so that it can be loaded from browser cache on change.

It uses [Chrome's Native Lazy Loading](https://web.dev/native-lazy-loading/) so that the iframes for results are loaded lazily and your pages remain fast.

## Contributing

This project makes use of [Yarn Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) for development.

1. Run `yarn` for installing dependencies.

2. Run `yarn start` to start development on package.

3. To start example, run `yarn start-example`.

Pull Requests are Welcome. Please create an issue to discuss before making a feature or large change. Thank You :smile:

## Credits

<div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

---
repo: kingRayhan/reactjs-visibility
url: 'https://github.com/kingRayhan/reactjs-visibility'
homepage: 'https://www.npmjs.com/package/reactjs-visibility'
starredAt: '2021-08-14T04:58:52Z'
createdAt: '2021-08-08T05:04:49Z'
updatedAt: '2023-12-07T11:23:32Z'
language: TypeScript
license: MIT
branch: main
stars: 26
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:47.779Z'
description: 'Detect when an element is becoming visible or hidden on the page. '
tags: []
---

# React Visibility

Detect when an element is becoming visible or hidden on the page.

<div align="center">
    <img src="react-visibility.jpg"/>
</div>

[![GitHub Pages deploy](https://github.com/kingRayhan/reactjs-visibility/actions/workflows/gh-pages-publish.yml/badge.svg)](https://github.com/kingRayhan/reactjs-visibility/actions/workflows/gh-pages-publish.yml)
[![Publish to NPM](https://github.com/kingRayhan/reactjs-visibility/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/kingRayhan/reactjs-visibility/actions/workflows/npm-publish.yml)

![npm bundle size](https://img.shields.io/bundlephobia/min/reactjs-visibility)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/reactjs-visibility)
[![npm downloads](https://img.shields.io/npm/dt/@kingrayhan/react-onscreen)](https://www.npmjs.com/package/reactjs-visibility)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/kingrayhan/reactjs-visibility/blob/master/LICENSE)

## [See in action](https://kingrayhan.github.io/reactjs-visibility/)

### Installation

```bash
npm install reactjs-visibility
```

> ⚠️ This plugin uses the Intersection Observer API that is not supported in every browser (currently supported in Edge, Firefox and Chrome). You need to include a polyfill to make it work on incompatible browsers.

### Detech visibility with `<VisibilityObserver>` component

```jsx
import React from "react";
import { VisibilityObserver } from "reactjs-visibility";

const App = () => {
  const handleChangeVisibility = (visible) => {
    if (visible) {
      alert("I am now visible");
    }
  };

  const options = {
    rootMargin: "200px",
  };

  return (
    <div>
      <h1 style={{ fontSize: 500 }}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni nam
        exercitationem sit alias perferendis, odit ex optio iure assumenda!
        Voluptatum, nulla. Assumenda iusto nesciunt adipisci totam repellat id
        excepturi minima.
      </h1>

      <VisibilityObserver
        onChangeVisibility={handleChangeVisibility}
        options={options}
      >
        Loadmore...
      </VisibilityObserver>
    </div>
  );
};
```

### Detech visibility with `useVisibility()` Hook

**Example 1**

```jsx
import React from "react";
import { useVisibility } from "reactjs-visibility";

const App = () => {
  const handleChangeVisibility = (visible) => {
    if (visible) {
      alert("I am now visible");
    }
  };

  const options = {};

  const { ref, visible } = useVisibility({
    onChangeVisibility: handleChangeVisibility,
    options,
  });

  console.log(visible);

  return (
    <div>
      <h1 style={{ fontSize: 50 }}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni nam
        exercitationem sit alias perferendis, odit ex optio iure assumenda!
        Voluptatum, nulla. Assumenda iusto nesciunt adipisci totam repellat id
        excepturi minima.
      </h1>

      <div ref={ref}>Loadmore...</div>
    </div>
  );
};
```

**Example 2**

```jsx
import React from "react";
import { useVisibility } from "reactjs-visibility";

const App = () => {
  const { ref, visible } = useVisibility();

  useEffect(() => {
    if (visible) {
      alert("I am now visible");
    }
  }, [visible]);

  return (
    <div>
      <h1 style={{ fontSize: 50 }}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni nam
        exercitationem sit alias perferendis, odit ex optio iure assumenda!
        Voluptatum, nulla. Assumenda iusto nesciunt adipisci totam repellat id
        excepturi minima.
      </h1>

      <div ref={ref}>Loadmore...</div>
    </div>
  );
};
```

## Options

It's possible to pass the [IntersectionObserver `options` object](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver#Parameters) using the `intersection`

### License

MIT license, Copyright (c) KingRayhan. For more information see `LICENSE`.

---
repo: kadirahq/react-no-ssr
url: 'https://github.com/kadirahq/react-no-ssr'
homepage: null
starredAt: '2018-12-16T08:15:33Z'
createdAt: '2016-02-19T04:52:04Z'
updatedAt: '2025-02-25T18:10:36Z'
language: JavaScript
license: MIT
branch: master
stars: 452
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:53.062Z'
description: React component to wrap non SSR friendly components
tags: []
---

# react-no-ssr

**React component to wrap non SSR components.**

When working with Server Side Rendering(SSR) enabled apps, you have to deal with client only components.
This wrapper makes it simple to work with those components.

### Installation

```
npm i --save react-no-ssr
```

### Usage

Let's say `Comments` is our **client only** component. Now we need to render it only on the client. Here's how we do it.

```js
import React from 'react';
import NoSSR from 'react-no-ssr';
import Comments from './comments.jsx';

const MyPage = () => (
  <div>
    <h2>My Blog Post</h2>
    <hr />
    <NoSSR>
      <Comments />
    </NoSSR>
  </div>
);
```

Then, `<Comments />` component is only rendered on the client just after it's mounted. It doesn't render when the SSRed HTML is booting up in the client. So, there won't be any React warning messages on the console.

### Render a Component on SSR

Usually, we need to add some loading text or similar until `<Comments />` component starts to render. Here's how to do it.

```js
const Loading = () => (<div>Loading...</div>);
const MyPage = () => (
  <div>
    ....
    <NoSSR onSSR={<Loading />}>
      <Comments />
    </NoSSR>
  </div>
);
```

Then `<Loading />` component will be rendered until `<Comments />` component is rendered to the DOM.

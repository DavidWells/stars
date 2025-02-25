---
repo: Thinkmill/react-markings
url: 'https://github.com/Thinkmill/react-markings'
homepage: 'http://thejameskyle.com/react-markings'
starredAt: '2017-08-29T16:21:10Z'
createdAt: '2017-08-22T05:53:17Z'
updatedAt: '2024-11-23T23:48:40Z'
language: JavaScript
license: MIT
branch: master
stars: 884
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:42.103Z'
description: '**Markdown** in <Components/>, <Components/> in **Markdown**'
tags:
  - markdown
  - react
---

# Recommendation: Use [MDX](https://mdxjs.com), it's the same thing, but better

(Although this library may be easier for you to integrate while MDX tools get built)

---

# react-markings

> Markdown in components, components in markdown

- Allows you to write markdown using [commonmark.js](https://github.com/commonmark/commonmark.js)
- Renders markdown as React elements using [commonmark-react-renderer](https://github.com/rexxars/commonmark-react-renderer)
- Embed React components inside your markdown (in any paragraph position) like this:

```js
import * as React from 'react';
import md from 'react-markings';

function Example() {
  return (
    <pre>
      <code>...</code>
    </pre>
  );
}

export default function ReadMe() {
  return md`
    # react-markings

    > Markdown in components, components in markdown

    - Allows you to write markdown using [commonmark.js](https://github.com/commonmark/commonmark.js)
    - Renders markdown as React elements using [commonmark-react-renderer](https://github.com/rexxars/commonmark-react-renderer)
    - Embed React components inside your markdown (in any paragraph position) like this:

    ${<Example/>}
  `;
}
```

If you want to customize rendering further, you can use `customize` to pass your
own [renderers](https://github.com/rexxars/commonmark-react-renderer#type-renderer-options).

```js
import * as React from 'react';
import md from 'react-markings';

let customMd = md.customize({
  renderers: {
    // customize heading with class
    heading: props => React.createElement('h' + props.level, { className: 'fancy-heading' }, props.children),
  },
});

export default function CustomHeading() {
  return customMd`
    # Fancy Heading
  `;
}
```

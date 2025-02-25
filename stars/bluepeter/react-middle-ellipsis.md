---
repo: bluepeter/react-middle-ellipsis
url: 'https://github.com/bluepeter/react-middle-ellipsis'
homepage: 'https://bluepeter.github.io/react-middle-ellipsis/'
starredAt: '2021-03-09T04:57:08Z'
createdAt: '2019-05-21T22:43:53Z'
updatedAt: '2024-09-12T05:56:21Z'
language: JavaScript
license: MIT
branch: master
stars: 63
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:59.443Z'
description: 'Truncate a long string in the middle, instead of the end.'
tags:
  - react
  - react-component
  - reactjs
---

# React Middle Ellipsis

[Check out the demo.](https://bluepeter.github.io/react-middle-ellipsis/)

Adding ellipses to the end of long text is cool. But not always! Sometimes the
end of the text contains vital information, particularly for URLs or filenames.

This React component is designed with that use case in mind.

## Install

```bash
yarn add react-middle-ellipsis
```

## Usage

Once `import`ed, you can then wrap any node with `<MiddleEllipsis>`. This will
compute the width of the surrounding parent node. Then, it will look for the
child node (so make sure to add a `span` at minimum internally): it will use
this element to compute the width of the child, and then shorten the text
element whose class is `ellipseMe` (optional) to fit within the parent.

The component re-computes things if the browser window is resized, too!

```jsx
import React from "react";
import MiddleEllipsis from "react-middle-ellipsis";

const Component = props => {
  return (
  <>
    <div style={{ width: "350px", whiteSpace: "nowrap" }}>
      <MiddleEllipsis>
        <span>
          I am some long text that should be ellipsed in the middle because
          the end contains important stuff.
        </span>
      </MiddleEllipsis>
    </div>
    <div style={{ width: "350px", whiteSpace: "nowrap" }}>
      <MiddleEllipsis>
        <span>
          Don't ellipse me.{" "}
          <span className="ellipseMe">
            I am some long text that should be ellipsed in the middle because
            the end contains important stuff.
          </span>
        </span>
      </MiddleEllipsis>
    </div>
  <>
  );
};

export default Component;
```

## Development

Notes for developing this component.

`yarn && yarn run start` in this directory and separately also in `/example`.
This will live reload any changes made in `/src`.

Change the version number in `package.json` and `npm publish` once
complete.Then, go to Github Releases and follow the instructions to publish a
new version there too.

## License

MIT © [bluepeter](https://github.com/bluepeter)

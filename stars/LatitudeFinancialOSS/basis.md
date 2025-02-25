---
repo: LatitudeFinancialOSS/basis
url: 'https://github.com/LatitudeFinancialOSS/basis'
homepage: 'https://basis.vercel.app'
starredAt: '2021-01-21T03:39:38Z'
createdAt: '2020-01-06T03:13:14Z'
updatedAt: '2024-09-22T16:35:12Z'
language: JavaScript
license: MIT
branch: master
stars: 57
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:05.715Z'
description: Basis Design System
tags:
  - components-library
  - design-system
  - emotion
  - react
---

![CI](https://github.com/LatitudeFinancialOSS/basis/workflows/CI/badge.svg)

# Basis Design System

## Installation

```shell
npm install --save basis @emotion/core prop-types
```

Install the fonts that your theme needs. For example, if you are using the default theme:

```shell
npm install --save typeface-{montserrat,roboto}
```

## Usage

```jsx
import React from "react";
import { BasisProvider, defaultTheme, Text } from "basis";
import "typeface-montserrat";
import "typeface-roboto";

function App() {
  return (
    <BasisProvider theme={defaultTheme}>
      <Text>Hello World</Text>
    </BasisProvider>
  );
}

export default App;
```

## Developing locally

```shell
npm install
npm start
```

## Thanks

- [Formidable Labs](https://formidable.com/) for creating [react-live](https://www.npmjs.com/package/react-live).
- [Ryan Seddon](https://twitter.com/ryanseddon) for creating [react-frame-component](https://www.npmjs.com/package/react-frame-component).
- [Sharvil Nanavati](https://twitter.com/snrrrub) for providing the `basis` npm package name.
- [Vercel](https://vercel.com) for outstanding deployment experience.

## License

MIT

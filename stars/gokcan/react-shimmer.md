---
repo: gokcan/react-shimmer
url: 'https://github.com/gokcan/react-shimmer'
homepage: 'https://nh9x1.csb.app'
starredAt: '2018-12-10T17:48:32Z'
createdAt: '2018-06-26T12:56:11Z'
updatedAt: '2025-02-11T15:50:38Z'
language: TypeScript
license: MIT
branch: master
stars: 1158
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:58.102Z'
description: "\U0001F320 Async loading, performant Image component for React.js"
tags:
  - async
  - loader
  - placeholder
  - react
  - react-image
  - react-suspense
  - shimmer
---

<p align='center'>
  <img alt='Logo' src='https://cdn.rawgit.com/gokcan/react-shimmer/master/media/logo.png' width=40%>
</p>

> A powerful, customisable, Suspense-like `<img>` component that (optionally) simulates a [**shimmer**](https://github.com/facebook/Shimmer) effect while __loading__. (with zero dependencies!).

<p align="center">
  <a href="https://www.npmjs.com/package/react-shimmer">
    <img alt= "NPM" src="https://img.shields.io/npm/v/react-shimmer.svg">
  </a>
  <a href="https://standardjs.com">
    <img alt="JavaScript Style Guide" src="https://img.shields.io/badge/code_style-standard-brightgreen.svg">
  </a>
  <a href="https://github.com/gokcan/react-shimmer/actions?query=workflow%3A%22Node.js+CI%22">
    <img alt="Github Actions CI Status" src="https://github.com/gokcan/react-shimmer/workflows/Node.js%20CI/badge.svg?branch=master">
  </a>
  <a href="https://codeclimate.com/github/gokcan/react-shimmer/maintainability">
    <img alt= "Maintainability" src="https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/maintainability">
  </a>
</p>

<p align="center">
  <img alt="Header" src="https://cdn.rawgit.com/gokcan/react-shimmer/master/media/header.png" width=60%>
</p>

### [__Live Demo__](https://codesandbox.io/s/nh9x1)

![](https://cdn.rawgit.com/gokcan/react-shimmer/master/media/demo.gif)

## Install

```bash
npm i react-shimmer
```

or

```bash
yarn add react-shimmer
```

## Usage

```jsx
import React from 'react'
import { Image, Shimmer } from 'react-shimmer'

function App() {
  return (
    <div>
      <Image
        src='https://source.unsplash.com/random/800x600'
        fallback={<Shimmer width={800} height={600} />}
      />
    </div>
  )
}
```

```jsx
import React from 'react'
import { Image, Breathing } from 'react-shimmer'

function App() {
  return (
    <div>
      <Image
        src='https://source.unsplash.com/random/800x600'
        fallback={<Breathing width={800} height={600} />}
      />
    </div>
  )
}
```

or you can use your custom React component as a fallback:

```jsx
import React from 'react'
import { Image } from 'react-shimmer'

import Spinner from './Spinner'

function App(props) {
  return (
    <div>
      <Image
        src="https://example.com/test.jpg"
        fallback={<Spinner />}
      />
    </div>
  )
}
```

### Properties

Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
`src`|string|yes||
`fallback`|ReactNode|yes||
`errorFallback`|func|no||
`onLoad`|func|no||
`delay`|number|no|| Delay in milliseconds before showing the `fallback`
`fadeIn`|bool|no|false|Use built-in fade animation on img
`NativeImgProps`|React.ImgHTMLAttributes<HTMLImageElement>|no||
-----

## Contributing
---

Feel free to send PRs.

## License

MIT © [gokcan](https://github.com/gokcan)

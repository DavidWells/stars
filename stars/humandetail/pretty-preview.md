---
repo: humandetail/pretty-preview
url: 'https://github.com/humandetail/pretty-preview'
homepage: ''
starredAt: '2022-10-15T05:47:16Z'
createdAt: '2022-10-07T14:24:29Z'
updatedAt: '2023-07-04T10:07:03Z'
language: TypeScript
license: MIT
branch: main
stars: 10
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:24.143Z'
description: A pretty image preview package
tags: []
---

<p align="center">pretty-review</p>
<hr />
<p align="center">
  <a href="https://codecov.io/gh/humandetail/pretty-preview" >
    <img src="https://codecov.io/gh/humandetail/pretty-preview/branch/main/graph/badge.svg?token=5X0OFEAMK3"/>
  </a>
  <a href="https://www.npmjs.com/package/pretty-preview">
    <img src="https://img.shields.io/npm/v/pretty-preview.svg" />
  </a>
  <a href="https://github.com/humandetail/pretty-preview/actions/workflows/page.ci.yml">
    <img src="https://github.com/humandetail/pretty-preview/actions/workflows/page.ci.yml/badge.svg?branch=main" />
  </a>
  <a href="https://github.com/humandetail/pretty-preview">
    <img src="https://img.shields.io/github/license/humandetail/pretty-preview.svg" />
  </a>
  <a href="https://github.com/humandetail/pretty-preview">
    <img src="https://img.shields.io/github/issues/humandetail/pretty-preview.svg" />
  </a>
  <a href="https://github.com/humandetail/pretty-preview">
    <img src="https://img.shields.io/github/forks/humandetail/pretty-preview.svg" />
  </a>
  <a href="https://github.com/humandetail/pretty-preview">
    <img src="https://img.shields.io/github/stars/humandetail/pretty-preview.svg" />
  </a>
</p>

## Project Activity

![Project Activity](https://repobeats.axiom.co/api/embed/b8a418e53edc5bf4f39de27f5352cd6a193699a3.svg "Repobeats analytics image")

## Demo

[demo](https://humandetail.github.io/pretty-preview/)

## Install

Install with npm:

```bash
npm i pretty-preview
```

Install with yarn:

```bash
yarn add pretty-preview
```

Install with pnpm:

```base
pnpm add pretty-preview
```

## Usage

```js
import PrettyPreview from 'pretty-preview'
import 'pretty-preview/index.css'

new PrettyPreview({
  root: '.wrapper'
})
```

## Params

|param|type|default|description|
|:--|:--|-|-|
|root|HTMLElement \| string|document.body|The parent element to listen on.|
|selector|string|'img'|The element to listen on.|
|srcAttr|string|'src'|The property that need to be collected from the selector|
|useMask|boolean|true|-|
|loop|boolean|false|Enable infinite loop switching between pictures|

## License

[MIT License](https://github.com/humandetail/pretty-preview/blob/main/LICENSE) © 2022-PRESENT [Humandetail](https://github.com/humandetail)

---
repo: privatenumber/svg-browser-export
url: 'https://github.com/privatenumber/svg-browser-export'
homepage: ''
starredAt: '2021-11-22T06:52:06Z'
createdAt: '2021-09-08T20:27:06Z'
updatedAt: '2024-05-28T18:59:27Z'
language: TypeScript
license: NA
branch: develop
stars: 23
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:35.265Z'
description: 'Export SVG to PNG, JPEG, or WEBP in the browser'
tags:
  - browser
  - convert
  - export
  - frontend
  - jpeg
  - png
  - save
  - svg
  - webp
---

# svg-browser-export <a href="https://npm.im/svg-browser-export"><img src="https://badgen.net/npm/v/svg-browser-export"></a> <a href="https://npm.im/svg-browser-export"><img src="https://badgen.net/npm/dm/svg-browser-export"></a> <a href="https://bundlephobia.com/result?p=svg-browser-export"><img src="https://badgen.net/bundlephobia/minzip/svg-browser-export"></a>

Export SVG to PNG, JPEG, or WEBP in the browser

<sub>Support this project by ⭐️ starring and sharing it. [Follow me](https://github.com/privatenumber) to see what other cool projects I'm working on! ❤️</sub>

## 🚀 Install

```bash
npm i svg-browser-export
```

## 🚦 Quick usage

```ts
import { exportSvg } from 'svg-browser-export'

const svgString = '<svg>...</svg>'

const exportedFileUrl = await exportSvg(svgString, 'png')
// => data:image/png;base64,....
```


## 👩‍🏫 Examples

### Exporting an SVG on the page
Select the DOM element (eg. using [querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)) and access `.innerHTML` for the SVG string.
```ts
const svgElement = document.querySelector('.svg-selector')

const exportedFileUrl = await exportSvg(svgElement.innerHTML, 'png')
```

### Downloading the exported file
Use it with [downloadjs](https://www.npmjs.com/package/downloadjs) to automatically download the exported asset.

```ts
import { exportSvg } from 'svg-browser-export'
import download from 'downloadjs'

...

const exportedFileUrl = await exportSvg(svgString, 'png')

download(exportedFileUrl, 'anyFileName.png')

```

## ⚙️ API

### exportSvg(svgString, exportFormat, scale)

Returns a promise that resolves to the exported file as a Base64 data URL.

#### svgString
Type: `string`

The SVG string to convert.

#### exportFormat
Type: `'png' | 'jpeg' | 'bmp' | 'ico' | 'webp'`

The format to export the SVG to.


#### scale
Type: `number`

Optional

If you want to scale the SVG. For example, passing in `2` would double the dimensions of the SVG.


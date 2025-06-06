---
repo: image-size/image-size
url: 'https://github.com/image-size/image-size'
homepage: ''
starredAt: '2021-11-30T02:51:44Z'
createdAt: '2013-07-01T23:58:32Z'
updatedAt: '2025-02-25T11:45:33Z'
language: TypeScript
license: MIT
branch: main
stars: 2094
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:33.272Z'
description: Node module for detecting image dimensions
tags:
  - dimensions
  - image-analysis
  - image-size
---

# image-size

[![Build Status](https://circleci.com/gh/image-size/image-size.svg?style=shield)](https://circleci.com/gh/image-size/image-size)
[![Package Version](https://img.shields.io/npm/v/image-size.svg)](https://www.npmjs.com/package/image-size)
[![Downloads](https://img.shields.io/npm/dm/image-size.svg)](http://npm-stat.com/charts.html?package=image-size&author=netroy&from=&to=)

Fast, lightweight NodeJS package to get dimensions of any image file or buffer.

## Key Features
- Zero dependencies
- Supports all major image formats
- Works with both files and buffers
- Minimal memory footprint - reads only image headers
- ESM and CommonJS support
- TypeScript types included

## Supported formats

- BMP
- CUR
- DDS
- GIF
- HEIC (HEIF, AVCI, AVIF)
- ICNS
- ICO
- J2C
- JPEG-2000 (JP2)
- JPEG
- JPEG-XL
- KTX (1 and 2)
- PNG
- PNM (PAM, PBM, PFM, PGM, PPM)
- PSD
- SVG
- TGA
- TIFF
- WebP

## Installation

```shell
npm install image-size
# or
yarn add image-size
# or
pnpm add image-size
```

## Usage

### Passing in a Buffer/Uint8Array
Best for streams, network requests, or when you already have the image data in memory.

```javascript
import { imageSize } from 'image-size'
// or
const { imageSize } = require('image-size')

const dimensions = imageSize(buffer)
console.log(dimensions.width, dimensions.height)
```

### Reading from a file
Best for local files. Returns a promise.

```javascript
import { imageSizeFromFile } from 'image-size/fromFile'
// or
const { imageSizeFromFile } = require('image-size/fromFile')

const dimensions = await imageSizeFromFile('photos/image.jpg')
console.log(dimensions.width, dimensions.height)
```

Note: Reading from files has a default concurrency limit of **100**
To change this limit, you can call the `setConcurrency` function like this:

```javascript
import { setConcurrency } from 'image-size/fromFile'
// or
const { setConcurrency } = require('image-size/fromFile')
setConcurrency(123456)
```

### 3. Command Line
Useful for quick checks.

```shell
npx image-size image1.jpg image2.png
```

### Multi-size

If the target file/buffer is an HEIF, an ICO, or a CUR file, the `width` and `height` will be the ones of the largest image in the set.

An additional `images` array is available and returns the dimensions of all the available images

```javascript
import { imageSizeFromFile } from 'image-size/fromFile'
// or
const { imageSizeFromFile } = require('image-size/fromFile')

const { images } = await imageSizeFromFile('images/multi-size.ico')
for (const dimensions of images) {
  console.log(dimensions.width, dimensions.height)
}
```

### Using a URL

```javascript
import url from 'node:url'
import http from 'node:http'
import { imageSize } from 'image-size'

const imgUrl = 'http://my-amazing-website.com/image.jpeg'
const options = url.parse(imgUrl)

http.get(options, function (response) {
  const chunks = []
  response
    .on('data', function (chunk) {
      chunks.push(chunk)
    })
    .on('end', function () {
      const buffer = Buffer.concat(chunks)
      console.log(imageSize(buffer))
    })
})
```

You can optionally check the buffer lengths & stop downloading the image after a few kilobytes.
**You don't need to download the entire image**

### Disabling certain image types

```javascript
import { disableTypes } from 'image-size'
// or
const { disableTypes } = require('image-size')

disableTypes(['tiff', 'ico'])
```

### JPEG image orientation

If the orientation is present in the JPEG EXIF metadata, it will be returned by the function. The orientation value is a [number between 1 and 8](https://exiftool.org/TagNames/EXIF.html#:~:text=0x0112,8%20=%20Rotate%20270%20CW) representing a type of orientation.

```javascript
import { imageSizeFromFile } from 'image-size/fromFile'
// or
const { imageSizeFromFile } = require('image-size/fromFile')

const { width, height, orientation } = await imageSizeFromFile('images/photo.jpeg')
console.log(width, height, orientation)
```

# Limitations

1. **Partial File Reading**
   - Only reads image headers, not full files
   - Some corrupted images might still report dimensions

2. **SVG Limitations**
   - Only supports pixel dimensions and viewBox
   - Percentage values not supported

3. **File Access**
   - Reading from files has a default concurrency limit of 100
   - Can be adjusted using `setConcurrency()`

4. **Buffer Requirements**
   - Some formats (like TIFF) require the full header in buffer
   - Streaming partial buffers may not work for all formats

## License

MIT

## Credits

not a direct port, but an attempt to have something like
[dabble's imagesize](https://github.com/dabble/imagesize/blob/master/lib/image_size.rb) as a node module.

## [Contributors](Contributors.md)

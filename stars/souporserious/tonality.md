---
repo: souporserious/tonality
url: 'https://github.com/souporserious/tonality'
homepage: ''
starredAt: '2022-10-16T08:55:23Z'
createdAt: '2017-04-28T01:38:59Z'
updatedAt: '2022-10-16T22:57:53Z'
language: JavaScript
license: MIT
branch: master
stars: 11
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:21.338Z'
description: Some small functions to help build and adjust color tone palettes.
tags: []
---

## Tonality

[![npm version](https://badge.fury.io/js/tonality.svg)](https://badge.fury.io/js/tonality)
[![Dependency Status](https://david-dm.org/souporserious/tonality.svg)](https://david-dm.org/souporserious/tonality)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Some small functions to help build and adjust color tone palettes.

![tonality](images/palette.png)

## Install

`yarn add tonality`

`npm install tonality --save`

```html
<script src="https://unpkg.com/purpose/dist/tonality.js"></script>
(UMD library exposed as `Tonality`)
```

## Example Usage

```js
import {
  createTone,
  createTones,
  createColorScale,
  createColorScales,
  flattenColorScales,
  getLightness,
} from '../src/index'

const colors = {
  info: '#3595bb',
  danger: '#eb6654',
  warning: '#ffbe30',
  success: '#88c163',
  grey: '#9fa3a7',
}
const colorScales = createColorScales(colors)
const flatColorScales = flattenColorScales(colorScales)
const successTone = createTone(colors.success)

successTone(0) // darkest shade
successTone(0.5) // medium shade
successTone(1) // lightest shade
```

## Running Locally

clone repo

`git clone git@github.com:souporserious/tonality.git`

move into folder

`cd ~/tonality`

install dependencies

`yarn`

run dev mode

`yarn dev`

open your browser and visit: `http://localhost:8080/`

## Thank You
[This article](https://medium.com/@erikdkennedy/color-in-ui-design-a-practical-framework-e18cacd97f9e) sparked my inspiration for these helpers. Thank you @erikdkennedy!

The code behind this idea was heavily inspired by the [Monochrome](https://monochrome.jxnblk.com/0077d6) app. Thank you @jxnblk!

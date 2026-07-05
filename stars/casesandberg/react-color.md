---
repo: casesandberg/react-color
url: 'https://github.com/casesandberg/react-color'
homepage: 'http://casesandberg.github.io/react-color/'
starredAt: '2015-08-17T21:30:26Z'
createdAt: '2015-08-09T18:45:30Z'
updatedAt: '2025-02-25T18:33:01Z'
language: JavaScript
license: MIT
branch: master
stars: 12102
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:38.668Z'
description: ':art: Color Pickers from Sketch, Photoshop, Chrome, Github, Twitter & more'
tags:
  - chrome
  - color-picker
  - inline-styles
  - photoshop
  - react
  - react-component
  - sketch
---

# [React Color](http://casesandberg.github.io/react-color/)

[![Npm Version][npm-version-image]][npm-version-url]
[![Build Status][travis-svg]][travis-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

* **13 Different Pickers** - Sketch, Photoshop, Chrome and many more

* **Make Your Own** - Use the building block components to make your own

## Demo

![Demo](https://media.giphy.com/media/26FfggT53qE304CwE/giphy.gif)

[**Live Demo**](http://casesandberg.github.io/react-color/)

## Installation & Usage

```sh
npm install react-color --save
```

### Include the Component

```js
import React from 'react'
import { SketchPicker } from 'react-color'

class Component extends React.Component {

  render() {
    return <SketchPicker />
  }
}
```
You can import `AlphaPicker` `BlockPicker` `ChromePicker` `CirclePicker` `CompactPicker` `GithubPicker` `HuePicker` `MaterialPicker` `PhotoshopPicker` `SketchPicker` `SliderPicker` `SwatchesPicker` `TwitterPicker` respectively.

> 100% inline styles via [ReactCSS](http://reactcss.com/)

[travis-svg]: https://travis-ci.org/casesandberg/react-color.svg
[travis-url]: https://travis-ci.org/casesandberg/react-color
[license-image]: http://img.shields.io/npm/l/react-color.svg
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/react-color.svg
[downloads-url]: http://npm-stat.com/charts.html?package=react-color
[npm-version-image]: https://img.shields.io/npm/v/react-color.svg
[npm-version-url]: https://www.npmjs.com/package/react-color

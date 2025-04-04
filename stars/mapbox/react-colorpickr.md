---
repo: mapbox/react-colorpickr
url: 'https://github.com/mapbox/react-colorpickr'
homepage: 'https://labs.mapbox.com/react-colorpickr/'
starredAt: '2015-08-05T01:34:30Z'
createdAt: '2015-04-26T17:44:04Z'
updatedAt: '2024-11-10T19:19:27Z'
language: TypeScript
license: ISC
branch: publisher-production
stars: 208
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:38.902Z'
description: A themeable colorpicker with HSL and RGB support for React
tags:
  - color
  - color-picker
  - colorpicker
  - hsl
  - hsla
  - react
  - rgb
  - rgba
  - rgba-values
---

A colorpicker for React
---

[![npm version](http://img.shields.io/npm/v/@mapbox/react-colorpickr.svg)](https://npmjs.org/package/@mapbox/react-colorpickr) [![Build Status](https://travis-ci.com/mapbox/react-colorpickr.svg?branch=publisher-production)](https://travis-ci.com/mapbox/react-colorpickr)

__[Demo](https://labs.mapbox.com/react-colorpickr/)__

## Install

    npm install @mapbox/react-colorpickr

You'll also want to include a copy of [colorpickr.css](./example/colorpickr.css) in your code.

``` html
<link href='react-colorpickr.css' rel='stylesheet' />
```

## Usage

```js
import React from 'react'
import ColorPicker from '@mapbox/react-colorpickr'

function Example() {
  return (
    <ColorPicker onChange={console.log} />
  )
}
```

## Required properties

#### onChange `(color) => void`

Value should be a function and is called whenever a color is updated from the colorpicker. Returns a color object.

## Optional properties

#### theme `Object<[key: string]: string>`

By default, react-colorpickr depends on [Assembly](https://labs.mapbox.com/assembly/) and the CSS located in [`dist/colorpickr.css`](./example/colorpickr.css). You can however, override it thanks to [react-themeable](https://github.com/markdalgleish/react-themeable) which react-colorpickr uses internally. See the properties used and the class name values in [`theme.ts`](./src/theme.ts).

#### initialValue `string`

Accepts any [valid css color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value). If this isn't provided, a default color is used.

#### colorSpace `'hsl' | 'rgb' | 'hex'`

Initializes what should be displaed in the bottom color input. Defaults to `hex`.

#### mode `'disc' | 'values'`

Initializes which view tab is active. Defaults to `disc`.

#### eyedropper `boolean`

When `true`, an eyedropper is added to the top-right of the interface. Defaults to `true`.

#### reset `boolean`

When `true`, a reset button is added that when pressed, reverts to the initialized color. Defaults to `true`.

#### alpha `boolean`

When `true`, a alpha range slider and input is provided. Defatuls to `true`.

#### mounted `(ColorPickr) => void`

To use internal methods from react-colorpickr, `mounted` provides access to the components instance. This is helpful for calling methods like `overrideValue` that can manually set a new color.

```js
const [instance, setInstance] = useState(null);

const override = () => {
  instance.overrideValue('red');
};

render() {
  <>
    <ColorPickr mounted={picker => setInstance(picker)} onChange={console.log} />
    <button onClick={override}>Override</button>
  </>
}
```

#### discRadius `number`

Optional property to provide a different disc radius for selection. Helpful if you are re-themeing the interface. Defaults to `18`.


#### readOnly `boolean`

If `true` the colorpicker will render in a readonly state with values clearly shown and selectable, but not editable. Defaults to `false`.

## Developing

    npm install & npm start
    
Then open http://localhost:9966 in browser.

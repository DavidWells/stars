---
repo: rikschennink/shiny
url: 'https://github.com/rikschennink/shiny'
homepage: 'https://pqina.nl/shiny/'
starredAt: '2019-02-03T02:07:25Z'
createdAt: '2019-01-14T10:01:41Z'
updatedAt: '2025-02-11T21:34:25Z'
language: JavaScript
license: MIT
branch: master
stars: 2800
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:48.558Z'
description: "\U0001F31F Shiny reflections for mobile websites"
tags:
  - css
  - devicemotion
  - javascript
  - light
  - mobile
  - motion
---

# Shiny, Simulating Reflections for Mobile Websites

Add shiny reflections to **text**, **backgrounds**, and **borders** on devices that support the `DeviceMotion` event.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/rikschennink/shiny/blob/gh-pages/LICENSE)
[![Still in beta](https://badge.fury.io/js/%40rikschennink%2Fshiny.svg)](https://badge.fury.io/js/%40rikschennink%2Fshiny)
[![Less than 1kB](https://badgen.net/bundlephobia/minzip/shiny)](https://bundlephobia.com/result?p=shiny)

**⚠️ It looks like iOS 12.2 will [disable use of device sensors](https://twitter.com/rikschennink/status/1090912464403861504) on Safari, so development of Shiny.js is on hold for now**

<img src="https://github.com/rikschennink/shiny/blob/master/demo.gif?raw=true" width="450" alt=""/>

[Demo](https://pqina.nl/shiny/) 

*Use a mobile device, preferably iPhone in portrait mode at the moment*

## Todo

- Fix landscape orientation rendering
- Test on Android (waiting for test device to arrive)
- Add option to pass custom handler


## Installation

Install from npm:

```
npm install @rikschennink/shiny --save
```

Or download `dist/shiny.umd.js` and include the script on your page like shown below.


## API

There's currently only one API call to make and it's `shiny()`. You can either pass a selector or an element (or array of elements), the second argument can be a configuration object telling Shiny how to render the special effects. 

If the second argument is not supplied Shiny will render a radial background gradient with a white center and a transparent outer ring.

```js
// No config supplied, select element by class
shiny('.my-shiny-element');

// Select multiple elements
shiny('.my-shiny-element, #my-other-shiny-element');

// Configuration object, see below for details
shiny('.my-shiny-element', { /* config here */ });

// Pass element object
const myElement = document.querySelector('my-shiny-element');
shiny(myElement, { /* config here */ });

// Pass array of elements
shiny([myElement, myOtherElement], { /* config here */ });
```


## Usage

```html
<!-- The element you want to make shiny -->
<div class="my-shiny-element">Hello World</div>

<!-- Include the library -->
<script src="shiny.umd.js"></script>

<!-- Initialize the SHINYNESS -->
<script>
shiny('.my-shiny-element', {
    // type of shiny to render, 
    // 'background', 'border', or 'text'
    type: 'background',
    gradient: {

        // type of gradient
        // 'linear' or 'radial'
        type: 'radial',

        // angle of gradient when type is linear
        angle: '110deg',

        // flip axis movement
        flip: {
            x: true,
            y: false
        },

        // colors to use
        colors: [
            // offset, color, opacity
            // ! don't pass rgba or hsla colors, supply the opacity seperately
            [0, '#fff', 1], // white at 0%
            [1, '#fff', 0], // to fully transparent white at 100%
        ]

    },

    // optional pattern fill
    pattern: {
        type: 'noise', // only 'noise' for now
        opacity: .5
    }
});
</script>
```


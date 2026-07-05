---
repo: pixu1980/detector-js
url: 'https://github.com/pixu1980/detector-js'
homepage: 'http://detector.js.org'
starredAt: '2023-04-21T17:15:41Z'
createdAt: '2017-06-13T15:57:51Z'
updatedAt: '2025-02-22T06:03:26Z'
language: TypeScript
license: MIT
branch: master
stars: 32
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:51.700Z'
description: 'DetectorJS, zero-dependency platform/environment detector written in ES6'
tags:
  - browser-detection
  - cpu-detection
  - detection
  - detector
  - detector-js
  - engine-detection
  - es6
  - feature-detection
  - gpu-detection
  - javascript
  - layout-engine-detection
  - library
  - module
  - npm
  - os-detection
  - platform-detection
  - rollup-js
  - useragent-parser
  - yarn
  - zero-dependency
---

# detector-js
v2.0.11

## Description
DetectorJS, zero-dependency platform/environment detector written in TypeScript

Please feel free to ask for modifications, fixes or do a PR to improve Detector behaviors or add detection rules

## Author
Emiliano &#39;Pixu&#39; Pisu &lt;pisuemiliano.1980@gmail.com&gt;

## Badges
[![NPM](https://nodei.co/npm/detector-js.png)](https://nodei.co/npm/detector-js/)

[![NPM downloads/month](https://img.shields.io/npm/dm/detector-js.svg)](https://img.shields.io/npm/dm/detector-js.svg) [![GitHub stars](https://img.shields.io/github/stars/pixu1980/detector-js.svg?style=plastic)](https://github.com/pixu1980/detector-js/stargazers) [![GitHub forks](https://img.shields.io/github/forks/pixu1980/detector-js.svg?style=plastic)](https://github.com/pixu1980/detector-js/network) [![GitHub issues](https://img.shields.io/github/issues/pixu1980/detector-js.svg?style=plastic)](https://github.com/pixu1980/detector-js/issues) [![GitHub license](https://img.shields.io/github/license/pixu1980/detector-js.svg?style=plastic)](https://github.com/pixu1980/detector-js/blob/master/LICENSE) [![Build Status](https://travis-ci.org/pixu1980/detector-js.svg?branch=master)](https://travis-ci.org/pixu1980/detector-js) [![Coverage Status](https://coveralls.io/repos/github/pixu1980/detector-js/badge.svg?branch=master)](https://coveralls.io/github/pixu1980/detector-js?branch=master)

## Documentation
Check out the [Latest Documentation](https://detector.js.org/docs/index.html) here


## Installation
This is a JS/TS module available through the [npm registry](https://www.npmjs.com/). 

It can be installed using either [`npm`](https://docs.npmjs.com/getting-started/installing-npm-packages-locally) or [`yarn`](https://yarnpkg.com/en/) package managers.

```sh
npm i detector-js
```

```sh
yarn add detector-js
```

## Usage
```js
import { Detector } from 'detector-js';

const detector = new Detector();

// It's possible to specify a custom userAgent if needed
// const detector = new Detector('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15');

console.log(detector);
// {
//   engine:{
//     name:'WebKit',
//     version:'605.1.15'
//   },
//   browser:{
//     name:'Safari',
//     version:'12.0.3'
//   },
//   os:{
//     name:'macOS',
//     version:'10.14.3',
//     versionName:'Mojave'
//   },
//   cpu:{
//     platform:'MacIntel',
//     cores:1,
//     architecture:'x64',
//     vendor:'intel'
//   },
//   gpu:{
//     webGLVendor:'WebKit',
//     webGLRenderer:'WebKit WebGL',
//     vendor:'Intel Inc.',
//     model:'Intel Iris',
//     renderer:'Intel Iris OpenGL Engine'
//   },
//   platform:'desktop',
//     feature: {
//     pointerEnabled:false,
//     pixelRatio:1,
//     pointerLock:true,
//     quirksMode:false,
//     css3D:true,
//     cssTransform:true,
//     cssTransition:true,
//     deviceMotion:false,
//     deviceOrientation:false,
//     contextMenu:false,
//     classList:false,
//     placeholder:true,
//     viewportUnit:true,
//     remUnit:true,
//     canvas:true,
//     svg:true,
//     webGL:true,
//     webVR:false,
//     touch:false,
//     forceTouch:true,
//     srcset:true,
//     sizes:true,
//     pictureElement:true,
//     dialogElement:false,
//     addEventListener:true,
//     asyncScript:true,
//     battery:false,
//     cors:true,
//     deferScript:true,
//     file:true,
//     fileSystem:false,
//     fullscreen:true,
//     fullscreenKeyboard:true,
//     geolocation:true,
//     historyAPI:true,
//     littleEndian:false,
//     localStorage:true,
//     matchMedia:true,
//     querySelector:true,
//     querySelectorAll:true,
//     serviceWorker:true,
//     typedArray:true,
//     userMedia:false,
//     vibration:false,
//     worker:true,
//     audio:{
//       supported:true,
//       context:true,
//       formats:{
//         mp3:true,
//         webm:false,
//         ogg:false,
//         opus:false,
//         wav:true,
//         m4a:true
//       }
//     },
//     video:{
//       supported:true,
//       formats:{
//         mp4:true,
//         ogv:false,
//         webm:false
//       }
//     }
//   }
// }
```

## Todo
- refine browsers regexes
- refine documentation
- implement modular custom build feature
- decide to implement or not device infos detection

## Dependencies
- [@detector-js/core](https://ghub.io/@detector-js/core): DetectorJS Core Module
- [@detector-js/feature](https://ghub.io/@detector-js/feature): DetectorJS Feature Module
- [@detector-js/hardware](https://ghub.io/@detector-js/hardware): DetectorJS Hardware Module
- [@detector-js/software](https://ghub.io/@detector-js/software): DetectorJS Software Module
- [@detector-js/detector](https://ghub.io/@detector-js/detector): DetectorJS Detector Module

## Dev Dependencies
- [@parcel/packager-ts](https://ghub.io/@parcel/packager-ts): DetectorJS, zero-dependency platform/environment detector written in TypeScript
- [@parcel/transformer-typescript-types](https://ghub.io/@parcel/transformer-typescript-types): DetectorJS, zero-dependency platform/environment detector written in TypeScript
- [@types/node](https://ghub.io/@types/node): TypeScript definitions for Node.js
- [lerna](https://ghub.io/lerna): Lerna is a fast, modern build system for managing and publishing multiple JavaScript/TypeScript packages from the same repository
- [parcel](https://ghub.io/parcel): Blazing fast, zero configuration web application bundler
- [pkg-2-readme](https://ghub.io/pkg-2-readme): Generate a README.md from package.json contents
- [standard-version](https://ghub.io/standard-version): replacement for `npm version` with automatic CHANGELOG generation
- [typedoc](https://ghub.io/typedoc): Create api documentation for TypeScript projects.
- [typescript](https://ghub.io/typescript): TypeScript is a language for application scale JavaScript development



## License
MIT

## Powered By
<a href="http://js.org" target="_blank" title="JS.ORG | JavaScript Community">
<img src="http://logo.js.org/dark_horz.png" width="102" alt="JS.ORG Logo"/></a>
<!-- alternatives [bright|dark]_[horz|vert|tiny].png (width[horz:102,vert:50,tiny:77]) -->

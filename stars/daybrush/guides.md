---
repo: daybrush/guides
url: 'https://github.com/daybrush/guides'
homepage: 'https://daybrush.com/guides/'
starredAt: '2022-11-29T19:47:47Z'
createdAt: '2019-11-09T11:41:32Z'
updatedAt: '2025-02-19T07:13:41Z'
language: TypeScript
license: MIT
branch: master
stars: 353
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:00:09.388Z'
description: A Guides component that can draw ruler and manage guidelines.
tags:
  - angular
  - editor
  - guidelins
  - guides
  - preact
  - react
  - scena
  - scenejs
  - svelte
  - vue
---



<p align="middle" ><img src="https://raw.githubusercontent.com/daybrush/guides/master/demo/images/guides.png"/></p>
<h2 align="middle">Guides</h2>
<p align="middle">
<a href="https://www.npmjs.com/package/@scena/guides" target="_blank"><img src="https://img.shields.io/npm/v/@scena/guides.svg?style=flat-square&color=007acc&label=version" alt="npm version" /></a>
<img src="https://img.shields.io/badge/language-typescript-blue.svg?style=flat-square"/>
<a href="https://github.com/daybrush/guides/blob/master/LICENSE" target="_blank"><img src="https://img.shields.io/github/license/daybrush/guides.svg?style=flat-square&label=license&color=08CE5D"/></a>
<a href="https://github.com/daybrush/guides/tree/master/packages/react-guides" target="_blank"><img alt="React" src="https://img.shields.io/static/v1.svg?label=&message=React&style=flat-square&color=61daeb"></a>
<a href="https://github.com/daybrush/guides/tree/master/packages/preact-guides" target="_blank"><img alt="Preact" src="https://img.shields.io/static/v1.svg?label=&message=Preact&style=flat-square&color=673ab8"></a>
<a href="https://github.com/daybrush/guides/tree/master/packages/ngx-guides" target="_blank"><img alt="Angular" src="https://img.shields.io/static/v1.svg?label=&message=Angular&style=flat-square&color=C82B38"></a>
<a href="https://github.com/daybrush/guides/tree/master/packages/vue-guides" target="_blank"><img
    alt="Vue"
    src="https://img.shields.io/static/v1.svg?label=&message=Vue2&style=flat-square&color=3fb984"></a>
<a href="https://github.com/daybrush/guides/tree/master/packages/vue3-guides" target="_blank"><img
    alt="Vue3"
    src="https://img.shields.io/static/v1.svg?label=&message=Vue3&style=flat-square&color=3fb984"></a>
<a href="https://github.com/daybrush/guides/tree/master/packages/svelte-guides" target="_blank"><img
    alt="Svelte"
    src="https://img.shields.io/static/v1.svg?label=&message=Svelte&style=flat-square&color=C82B38"></a>
</p>
<p align="middle">A Guides component that can draw ruler and manage guidelines.</p>
<p align="middle">
    <a href="https://daybrush.com/guides" target="_blank"><strong>Demo</strong></a> /
    <a href="https://daybrush.com/guides/release/latest/doc/" target="_blank"><strong>API</strong></a> /
    <a href="https://github.com/daybrush/ruler" target="_blank"><strong>Ruler</strong></a> /
    <a href="https://github.com/daybrush/scena" target="_blank"><strong>Main Project</strong></a>
</p>


## ⚙️ Installation
### npm
```sh
$ npm i @scena/guides
```

### scripts
```html
<script src="//daybrush.com/guides/release/latest/dist/guides.min.js"></script>
```

## 🚀 How to use
```tsx

import Guides from "@scena/guides";

const guides = new Guides(document.body, {
    type: "horizontal",
}).on("changeGuides", e => {
    console.log(e.guides);
});


let scrollX = 0;
let scrollY = 0;
window.addEventListener("resize", () => {
    guides.resize();
});

window.addEventListener("wheel", e => {
    scrollX += e.deltaX;
    scrollY += e.deltaY;

    guides.scrollGuides(scrollY);
    guides.scroll(scrollX);
});

```

### Ruler Units

The default unit is px, and a line is drawn every 50px. If you want to use a different unit instead of the px unit, use it like this:

* 1px (Default)
    * zoom: 1
    * unit: 50 (every 50px)
* 1cm = 37.7952px
    * zoom: 37.7952
    * unit: 1 (every 1cm)
* 1in = 96px = 2.54cm
    * zoom: 96
    * unit: 1 (every 1in)

See: 
- https://www.w3schools.com/cssref/css_units.asp
- https://www.scaler.com/topics/css/css-units/


## ⚙️ Developments
The `guides` repo is managed as a [monorepo](https://github.com/lerna/lerna) with `yarn`.

```sh
yarn config set registry https://registry.npmjs.org/
```


## ⭐️ Show Your Support
Please give a ⭐️ if this project helped you!

## 👏 Contributing

If you have any questions or requests or want to contribute to `guides` or other packages, please write the [issue](https://github.com/daybrush/guides/issues) or give me a Pull Request freely.

## 🐞 Bug Report

If you find a bug, please report to us opening a new [Issue](https://github.com/daybrush/guides/issues) on GitHub.


## 📝 License

This project is [MIT](https://github.com/daybrush/guides/blob/master/LICENSE) licensed.

```
MIT License

Copyright (c) 2019 Daybrush

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

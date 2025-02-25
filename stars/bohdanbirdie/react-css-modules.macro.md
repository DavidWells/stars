---
repo: bohdanbirdie/react-css-modules.macro
url: 'https://github.com/bohdanbirdie/react-css-modules.macro'
homepage: 'https://www.npmjs.com/package/react-css-modules.macro'
starredAt: '2019-09-13T22:39:06Z'
createdAt: '2019-09-12T07:10:15Z'
updatedAt: '2023-06-22T20:19:20Z'
language: JavaScript
license: MIT
branch: master
stars: 22
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:25.173Z'
description: A babel-macro that allows you to reference CSS Modules via styleName attribute
tags:
  - babel
  - babel-macros
  - babel-plugin-macros
---

# react-css-modules.macro

[![Babel Macro](https://img.shields.io/badge/babel--macro-%F0%9F%8E%A3-f5da55.svg?style=flat-square)](https://github.com/kentcdodds/babel-plugin-macros)

Inspired by [babel-plugin-react-css-modules](https://github.com/gajus/babel-plugin-react-css-modules)

## 🙌 Motivation

With the support of CSS Loader - CSS modules became a common use case, especially in [Create React App](https://create-react-app.dev/docs/adding-a-css-modules-stylesheet).
One of the downsides is that you are forced to access styles map via object keys which is not so handy.

```JavaScript
import React, { Component } from 'react';
import styles from './Button.module.css'; // Import css modules stylesheet as styles
import './another-stylesheet.css'; // Import regular stylesheet

class Button extends Component {
  render() {
    // reference as a js object
    return <button className={styles.error}>Error Button</button>;
  }
}
```

One of the solutions is using the [babel-plugin-react-css-modules](https://github.com/gajus/babel-plugin-react-css-modules) but you either need to eject or rewire.

Since CRA support [babel-plugin-macros](https://github.com/kentcdodds/babel-plugin-macros) - we can take advantage of that and still have `styleName` attribute be mapped to imported CSS modules.

## 📦 Usage

```JavaScript
import { macro } from 'react-css-modules.macro';
import React, { Component } from 'react';
import styles from './Button.module.css';
import './another-stylesheet.css';

macro(styles)

class Button extends Component {
  render() {
    return (
      <button className="some_global_style" styleName="styles-file-style">
        Error Button
      </button>
    )
  }
}
```

Will be converted to

```JavaScript
import _bindStyleNames from "react-css-modules.macro'/dist/bindStyleName";
import React, { Component } from 'react';
import styles from './Button.module.css'; // Import css modules stylesheet as styles

import './another-stylesheet.css'; // Import regular stylesheet

const _getStyleName = _bindStyleNames(styles);

class Button extends Component {
  render() {
    return (
      <button className={"some_global_style" + _getStyleName("styles-file-style")}>
        Error Button
      </button>
    );
  }

}
```

## ⚙️ Config

[babel-plugin-macros support](https://github.com/kentcdodds/babel-plugin-macros/blob/master/other/docs/user.md) a configuration for every separate macro in your project.
The easiest way to specify it is to add a section to the `package.json`

```JSON
"babelMacros": {
    "reactCssModulesMacro": { "option": "value" }
  },
```

| Option     | Type    | Default value | Description
| :--------- | :------ | :------------ | :----------
| enableMemo | boolean | true          | Select whether use memoization or not
| targetTag  | string  | "styleName"   | Allow usage of custom tag name instead of `styleName`
| warning    | boolean | false         | Enable/disable warning messages

## 🐝 Performance
In simple words, performance is similar to what you would do by having a function that will accept the string of classnames and will convert it to the hashed classnames.
 (`Input -> split(' ') -> map -> find each hashed name -> join(' ')`.
 This is basically what the injected helper function `getStyleName()` will do. There is no build-time optimization here. But there is optional runtime optimization achieved with memoization. I used the package [memoizee](https://www.npmjs.com/package/memoizee) to do such a thing. Memoization can be turned `off/on` using the config.

## 🛣 Roadmap

- [ ] Improve performance
  - [x] Add memoization
  - [x] Add compile time string to array conversion where possible
- [ ] Add tests for `bindStyleName` helper
- [x] Add config support
  - [x] Make memoization optional
  - [x] Make warning optional

## 🗒 License

MIT

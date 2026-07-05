---
repo: zebateira/react-use-system-theme
url: 'https://github.com/zebateira/react-use-system-theme'
homepage: null
starredAt: '2020-12-29T06:16:53Z'
createdAt: '2019-12-02T18:40:11Z'
updatedAt: '2024-09-06T15:02:27Z'
language: JavaScript
license: MIT
branch: master
stars: 18
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:13.752Z'
description: >-
  React Hook to get the system theme (OS theme: light or dark) based on
  prefers-colors-scheme media query and subscribes to changes as well.
tags: []
---

# react-use-system-theme

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url]

[npm-url]:https://npmjs.org/package/react-use-system-theme
[downloads-image]:https://img.shields.io/npm/dm/react-use-system-theme.svg
[npm-image]:https://img.shields.io/npm/v/react-use-system-theme.svg
[travis-url]:https://travis-ci.org/zebateira/react-use-system-theme
[travis-image]:https://img.shields.io/travis/zebateira/react-use-system-theme/master.svg
[codecov-url]:https://codecov.io/gh/zebateira/react-use-system-theme
[codecov-image]:https://img.shields.io/codecov/c/github/zebateira/react-use-system-theme/master.svg
[david-dm-url]:https://david-dm.org/zebateira/react-use-system-theme
[david-dm-image]:https://img.shields.io/david/zebateira/react-use-system-theme.svg
[david-dm-dev-url]:https://david-dm.org/zebateira/react-use-system-theme?type=dev
[david-dm-dev-image]:https://img.shields.io/david/dev/zebateira/react-use-system-theme.svg

A React Hook to get the system theme (OS theme: light or dark) based on `prefers-color-scheme`. Subscribes to changes as well.

```js
import useSystemTheme from 'react-use-system-theme';

function App() {
    const systemTheme = useSystemTheme('dark');

    return <Page theme={systemTheme} />
}
```


![Demo](https://i.imgur.com/XHbuLIb.gif)


## Install

```sh
$ npm install react-use-system-theme
```

This library is written in modern JavaScript and is published in both CommonJS and ES module transpiled variants. If you target older browsers please make sure to transpile accordingly.

## Usage

**`useSystemTheme(initialTheme : Optional)` hook**:

```js
import React from 'react';
import { ThemeProvider } from 'styled-components';
import useSystemTheme from 'react-use-system-theme';

const theme = {
    light: {
        colors: {
            primary: '#fff'
        }
    },
    dark: {
        colors: {
            primary: '#000'
        }
    }
}

function App() {
    const systemTheme = useSystemTheme('dark');

    return (
        <ThemeProvider theme={ theme[systemTheme] }>
            ...
        </ThemeProvider>
    );
}
```

### Values

The values can be either `dark`, `light` or `null` if the system has no preference for the theme (or if `matchMedia` is not supported).

### SSR

Value will be `null` or `initialTheme` if provided, so you can choose which default theme you want to use before we are able to detect the theme.

## Why do you need this?

Initially, support for dark mode apps have been implemented by adding a simple toggle in some settings.
Additionally, some apps have started to support another option "System Default": this is great because the user does not have to change all the apps theme constantly, instead, just change the system theme (mac/windows/linux/android/ios) in one place, and all the apps should change it's theme.

This react hook allows get the currently active system theme and to also subscribe to the theme changes in order to allow the ui to update to the new theme.

Usually, the CSS support for this using the media query `(prefers-color-scheme: light)` would be enough, but for `CSS-in-JS` solutions, you probably are getting the theme settings from a js object, so if we can simply use one theme object (`theme.light`/`theme.dark`) given the users system defined theme, we can make our styles simpler.

**Disclaimer**: Browser support for [`prefers-color-scheme` is coming along really well](https://caniuse.com/#feat=prefers-color-scheme), but still, this is an experimental feature: use it wisely!


## Tests

```sh
$ npm test
$ npm test -- --watch # during development
```


## License

Released under the [MIT License](https://www.opensource.org/licenses/mit-license.php).

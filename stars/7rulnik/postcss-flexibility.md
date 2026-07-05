---
repo: 7rulnik/postcss-flexibility
url: 'https://github.com/7rulnik/postcss-flexibility'
homepage: ''
starredAt: '2016-01-27T21:36:00Z'
createdAt: '2015-12-23T20:41:41Z'
updatedAt: '2024-08-19T21:09:33Z'
language: JavaScript
license: MIT
branch: master
stars: 296
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:32.459Z'
description: PostCSS plugin for Flexibility polyfill
tags:
  - flexbox
  - flexibility
  - postcss
---

# PostCSS Flexibility

[![NPM version](https://badge.fury.io/js/postcss-flexibility.svg)](http://badge.fury.io/js/postcss-flexibility)
[![Build Status](https://travis-ci.org/7rulnik/postcss-flexibility.svg)](https://travis-ci.org/7rulnik/postcss-flexibility)
[![Dependency Status](https://david-dm.org/7rulnik/postcss-flexibility.svg)](https://david-dm.org/7rulnik/postcss-flexibility)
[![devDependency Status](https://david-dm.org/7rulnik/postcss-flexibility/dev-status.svg)](https://david-dm.org/7rulnik/postcss-flexibility#info=devDependencies)
[![Coverage Status](https://coveralls.io/repos/7rulnik/postcss-flexibility/badge.svg)](https://coveralls.io/r/7rulnik/postcss-flexibility)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)


[PostCSS] plugin for [Flexibility].


```css
.foo {
    display: flex;
}
```
will be processed to:
```css
.foo {
    -js-display: flex;
    display: flex;
}
```

## Installation

```sh
$ npm install --save-dev postcss postcss-flexibility
```

## Usage

```js
postcss([ require('postcss-flexibility') ])
```

See [PostCSS] docs for examples for your environment.

### Excluding rules

You can exclude rule from transformation by adding `/* flexibility-disable */` comment.

```css
.foo {
    /* flexibility-disable */
    display: flex;
}
```
will be processed to:
```css
.foo {
    /* flexibility-disable */
    display: flex;
}
```

### License

MIT © [Valentin Semirulnik](https://twitter.com/7rulnik)

[PostCSS]: https://github.com/postcss/postcss
[Flexibility]: https://github.com/10up/flexibility

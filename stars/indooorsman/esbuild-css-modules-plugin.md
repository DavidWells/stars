---
repo: indooorsman/esbuild-css-modules-plugin
url: 'https://github.com/indooorsman/esbuild-css-modules-plugin'
homepage: ''
starredAt: '2021-12-15T23:02:41Z'
createdAt: '2021-03-05T05:52:21Z'
updatedAt: '2025-02-13T13:49:49Z'
language: JavaScript
license: MIT
branch: main
stars: 92
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:28.092Z'
description: A esbuild plugin to bundle css modules into js(x)/ts(x)
tags:
  - css
  - css-modules
  - esbuild
  - esbuild-plugin
  - lightningcss
---

# esbuild-css-modules-plugin

[![npm version](https://img.shields.io/npm/v/esbuild-css-modules-plugin)](https://www.npmjs.com/package/esbuild-css-modules-plugin)
[![Test](https://github.com/indooorsman/esbuild-css-modules-plugin/actions/workflows/test.yml/badge.svg)](https://github.com/indooorsman/esbuild-css-modules-plugin/actions/workflows/test.yml)

A esbuild plugin to bundle css modules into js(x)/ts(x). Based on extremely fast [Lightning CSS](https://lightningcss.dev/)

Works both with `bundle: false` and `bundle: true`.

If build with `bundle: false`, `xxx.modules.css` will be transformed to `xxx.modules.css.js`.

See [index.d.ts](https://github.com/indooorsman/esbuild-css-modules-plugin/blob/main/index.d.ts) for all settings & [`./test/test.js`](https://github.com/indooorsman/esbuild-css-modules-plugin/blob/main/test/test.js) for examples.

## Install

```shell
npm i -D esbuild-css-modules-plugin
```

or

```shell
yarn add -D esbuild-css-modules-plugin
```

## Usage

```js
import esbuild from 'esbuild';
import CssModulesPlugin from 'esbuild-css-modules-plugin';

esbuild.build({
  plugins: [
    CssModulesPlugin({
      // @see https://github.com/indooorsman/esbuild-css-modules-plugin/blob/main/index.d.ts for more details
      force: true,
      emitDeclarationFile: true,
      localsConvention: 'camelCaseOnly',
      namedExports: true,
      inject: false
    })
  ]
});
```

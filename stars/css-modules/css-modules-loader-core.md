---
repo: css-modules/css-modules-loader-core
url: 'https://github.com/css-modules/css-modules-loader-core'
homepage: ''
starredAt: '2021-02-16T19:11:49Z'
createdAt: '2015-05-28T00:11:23Z'
updatedAt: '2023-11-02T03:12:36Z'
language: JavaScript
license: NA
branch: master
stars: 91
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:02.133Z'
description: 'A loader-agnostic CSS Modules implementation, based on PostCSS'
tags: []
---

# CSS Module Loader Core
> A loader-agnostic CSS Modules implementation, based on PostCSS

[![Build Status](https://travis-ci.org/css-modules/css-modules-loader-core.svg?branch=master)](https://travis-ci.org/css-modules/css-modules-loader-core)

## API

```js
import Core from 'css-modules-loader-core'
let core = new Core()
```

### core.load( sourceString , sourcePath , pathFetcher ) =><br>&nbsp;&nbsp;Promise({ injectableSource, exportTokens })

Processes the input CSS `sourceString`, looking for dependencies such as `@import` or `:import`. Any localisation will happen by prefixing a sanitised version of `sourcePath` When dependencies are found, it will ask the `pathFetcher` for each dependency, resolve & inline any imports, and return the following object:

- `injectableSource`: the final, merged CSS file without `@import` or `:import` statements
- `exportTokens`: the mapping from local name to scoped name, as described in the file's `:export` block

These should map nicely to what your build-tool-specific loader needs to do its job.

### new Core([plugins])

The default set of plugins is [[postcss-modules-local-by-default](https://github.com/css-modules/postcss-modules-local-by-default), [postcss-modules-extract-imports](https://github.com/css-modules/postcss-modules-extract-imports), [postcss-modules-scope](https://github.com/css-modules/postcss-modules-scope)] (i.e. the CSS Modules specification). This can override which PostCSS plugins you wish to execute, e.g.

```js
import Core from 'css-loader-core'
import autoprefixer from 'autoprefixer'
import colorFunctions from 'postcss-color-function'

// Don't run local-by-default, but use colorFunctions 
// beforehand and autoprefixer afterwards:
let core = new Core([
  colorFunctions, 
  core.plugins.extractImports, 
  core.plugins.scope, 
  autoprefixer("Last 2 Versions")
])
```

---
repo: gorriecoe/postcss-functions-lite
url: 'https://github.com/gorriecoe/postcss-functions-lite'
homepage: ''
starredAt: '2021-01-01T00:29:45Z'
createdAt: '2020-10-26T02:36:20Z'
updatedAt: '2021-01-01T14:09:53Z'
language: JavaScript
license: BSD-3-Clause
branch: main
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:12.564Z'
description: PostCSS plugin for exposing JavaScript functions.
tags:
  - postcss
  - postcss-functions
---

# Postcss-functions-lite

[PostCSS](https://github.com/postcss/postcss) plugin for exposing JavaScript functions.  This is a lite [alternative](https://github.com/andyjansson/postcss-functions) which doesn't include globbing or have promises built in.

Inspired by [postcss functions by Andy Jansson](https://github.com/andyjansson/postcss-functions).

## Key differences between lite and [functions](https://github.com/andyjansson/postcss-functions)

Lite is a bare minimal alternative of [postcss functions](https://github.com/andyjansson/postcss-functions)

- [Globbing](#globbing) is not built in.
- Promises are not built in.

## Installation

```js
npm install --save-dev postcss-functions-lite
```

### Requirements

- Postcss 8

## Usage

```js
const fs = require('fs')
const postcss = require('postcss')
const postcssFunctions = require('postcss-functions-lite')

const options = {
  // options
}

const css = fs.readFileSync('input.css', 'utf8')

postcss()
  .use(postcssFunctions(options))
  .process(css)
  .then(result => {
    const output = result.css
  })
```

Example of a function call:

```css
body {
  prop: foobar()
}
```

## Options

### functions

Type: `Object`

An object containing functions. The function name will correspond with the object key.

**Example:**

```js
const color = require('css-color-converter')
const postcssFunctions = require('postcss-functions-lite')

return postcssFunctions({
  functions: {
    darken: (value, frac) =>  {
      const darken = 1 - parseFloat(frac)
      const rgba = color(value).toRgbaArray()
      const r = rgba[0] * darken
      const g = rgba[1] * darken
      const b = rgba[2] * darken
      return color([r,g,b]).toHexString()
    }
  }
})
```

```css
.foo {
  /* make 10% darker */
  color: darken(blue, 0.1)
}
```

## Globbing

As mentioned above lite doesn't include globbing.  If you require globbing then it is recommended to switch to [functions](https://github.com/andyjansson/postcss-functions) or alternatively build a basic glob.

**Example:**

```js
const path require('path')
const glob = require('glob')
const postcssFunctions = require('postcss-functions-lite')
let globFunctions = {}

// ...
glob.sync('**/*.js').forEach(file => {
  const name = path.basename(file, path.extname(file))
  globFunctions[name] = require(path.basename(file, path.extname(file)))
})
// ...

return postcssFunctions({
  functions: {
    doSomething: (value) =>  {
      // do something
    },
    ...globFunctions
  }
})
```

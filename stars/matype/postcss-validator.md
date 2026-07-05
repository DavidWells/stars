---
repo: matype/postcss-validator
url: 'https://github.com/matype/postcss-validator'
homepage: null
starredAt: '2021-09-10T17:25:17Z'
createdAt: '2017-03-14T14:04:59Z'
updatedAt: '2021-09-11T09:01:27Z'
language: JavaScript
license: NOASSERTION
branch: master
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:46.124Z'
description: PostCSS plugin to check if an input string is valid CSS
tags: []
---

# postcss-validator [![Build Status](https://travis-ci.org/morishitter/postcss-validator.svg)](https://travis-ci.org/morishitter/postcss-validator)

PostCSS is very flexible CSS parser, so we can extend CSS syntax easily.
But, The output of PostCSS plugins may not be valid CSS string.
[postcss-validator](https://github.com/morishitter/postcss-validator) can check if an input string is valid CSS.

## Features

postcss-validator can check to using the followings:

- Nested selector (like Sass)
- Unknown properties

## Example

### Using nested selectors

Input:

```
.class {
  color: tomato;

  .nested {
    color: lime;
  }
}
```

Yield:

```
CssSyntaxError: postcss-validator: <css input>:2:3: Nested rules [.nested]
```

### Using unknown property

Input:

```
.class {
  margintop: 10px;
}
```

Yield:

```
CssSyntaxError: postcss-validator: <css input>:2:3: Unknown property [margintop] is used
```

## Installation

```shell
$ npm install postcss-validator
```

## Usage

Set postcss-validator at the bottom of loaded PostCSS plugins.

### in Node.js

```js
// dependencies
var fs = require("fs")
var postcss = require("postcss")
var customProperties = require("postcss-custom-properties")
var nesting = require("postcss-nesting")
var validator = require("postcss-validator")

// css to be processed
var css = fs.readFileSync("input.css", "utf8")

// process css
var output = postcss()
  .use(customProperties())
  .use(nesting())
  .use(validator())
  .process(css)
  .css
```

## License

The MIT License (MIT)

Copyright (c) 2017 Masaaki Morishita

---
repo: joeattardi/json-colorizer
url: 'https://github.com/joeattardi/json-colorizer'
homepage: null
starredAt: '2021-11-22T02:06:52Z'
createdAt: '2016-10-29T01:29:25Z'
updatedAt: '2025-02-12T16:50:41Z'
language: TypeScript
license: MIT
branch: main
stars: 85
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:36.163Z'
description: A library for colorizing JSON strings
tags:
  - chalk
  - json
  - syntax-highlighting
---

# JSON Colorizer

![Logo](logo.png)

A library for colorizing JSON strings

![](https://raw.githubusercontent.com/joeattardi/json-colorizer/master/screenshot.png)

This package is a simple console syntax highlighter for JSON.

## Installation
`npm install --save json-colorizer`

## Usage

```js
const { colorize } = require('json-colorizer');
console.log(colorize({ "foo": "bar" }));
```

You can also pass a JavaScript object to the `colorize` function:

```js
const { colorize } = require('json-colorizer');
console.log(colorize({
  foo: 'bar',
  baz: 42
}));
```

## Pretty-printing output

By default, the output JSON will be pretty-printed with an indentation of 2 spaces. You can adjust this by passing the `indent` option.

```js
const { colorize } = require('json-colorizer');
console.log(colorize({
  foo: 'bar',
  baz: 42
}, { indent: 4 }));
```

## Customizing the colors

You can override any of the colors used for token types by providing a `colors` option. This should map token types to the names of color functions. These color functions are contained in the `color` object exported by the library.

```js
const { colorize, color } = require('json-colorizer');

console.log(colorize({ foo: 'bar' }, {
  colors: {
    StringLiteral: color.red
  }
}));
```

The list of valid token types and color functions are listed below.

### Token types

- `Brace`: curly braces (`{`, `}`)
- `Bracket`: square brackets (`[`, `]`)
- `Colon`: colon character (`:`)
- `Comma`: comma character (`,`)
- `StringKey`: the key in a key/value pair
- `NumberLiteral`: a number value
- `StringLiteral`: a string value
- `BooleanLiteral`: a boolean literal (`true`, `false`)
- `NullLiteral`: the literal `null` value

### Color functions in the `color` object

- `black`
- `red`
- `green`
- `yellow`
- `blue`
- `magenta`
- `cyan`
- `white`
- `gray`

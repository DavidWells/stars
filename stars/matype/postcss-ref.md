---
repo: matype/postcss-ref
url: 'https://github.com/matype/postcss-ref'
homepage: null
starredAt: '2016-10-27T02:24:49Z'
createdAt: '2016-10-23T08:45:11Z'
updatedAt: '2024-10-24T05:46:02Z'
language: JavaScript
license: NOASSERTION
branch: master
stars: 26
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:17.604Z'
description: PostCSS plugin to refer properties from another rule (@ref rule)
tags: []
---

# postcss-ref [![Build Status](https://travis-ci.org/morishitter/postcss-ref.svg)](https://travis-ci.org/morishitter/postcss-ref)

PostCSS plugin to refer properties from another rule (@ref rule)

## Spec

### Abstract

This specification defines the @ref rule, which allows an author to refer properties in another style rule.

### Using @ref rule

```
@ref = @ref <selector-name>, <reffered-property-name>( ,<new-property-name>)
```

#### Example

```css
.foo {
  font-size: 12px;
  color: #333;
}

.bar {
  @ref .foo, font-size;
  color: #444;
}
```

### `ref()` notation (with `atRule` option)

You can pass an option to `postcss-ref` which lets you use `ref` as a function (`ref()`) instead of an atRule (`@ref`)

```
ref() = ref(<selector-name>, <reffered-property-name>)
```

#### Example
```css
.foo {
  font-size: 12px;
  color: #333;
}

.bar {
  font-size: ref(.foo, font-size);
  color: #444;
}
```

### with media queries

It also works with @media rules

```css
.foo {
  font-size: 10px;
}

@media (min-width: 1602px) {
  .foo {
    font-size: 12px;
    color: #333;
  }
}

.bar {
  @ref @media (min-width: 1602px) .foo, font-size;
}
```

or

```css
.bar {
  font-size: ref(@media (min-width: 1602px) .foo, font-size);
}
```

This allows you to be more verbose with what you are doing.

## Installation

```shell
$ npm install postcss-ref
```

## How to use postcss-ref

### in Node.js

```js
// dependencies
var fs = require("fs")
var postcss = require("postcss")
var ref = require("postcss-ref")

// css to be processed
var css = fs.readFileSync("input.css", "utf8")

// process css
var output = postcss()
  .use(ref()) // If using the function way change it to `ref({ atRule: false })`
  .process(css)
  .css
```

## Example

Input:

```css
.foo {
  font-size: 12px;
  color: #333;
}

.bar {
  @ref .foo, font-size;
  color: #444;
}
```

Output:

```css
.foo {
  font-size: 12px;
  color: #333;
}

.bar {
  font-size: 12px;
  color: #444;
}
```

### Works well with custom properties

Input:

```css
.foo {
  --font-m: 12px;
  color: #333;
}

.bar {
  @ref .foo, --font-m, font-size;
}
```

Output:

```css
.foo {
  --font-m: 12px;
  color: #333;
}

.bar {
  font-size: var(--font-m);
}
```

Input:

```css
.foo {
  --font-m: 12px;
  color: #333;
}

.bar {
  font-size: ref(.foo, --font-m);
}
```

Output:

```css
.foo {
  --font-m: 12px;
  color: #333;
}

.bar {
  font-size: var(--font-m);
}
```

## License

The MIT License (MIT)

Copyright (c) 2016 Masaaki Morishita

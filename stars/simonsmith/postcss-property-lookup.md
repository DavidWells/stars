---
repo: simonsmith/postcss-property-lookup
url: 'https://github.com/simonsmith/postcss-property-lookup'
homepage: ''
starredAt: '2015-09-24T22:45:43Z'
createdAt: '2015-05-23T21:06:49Z'
updatedAt: '2025-01-18T20:48:53Z'
language: JavaScript
license: MIT
branch: master
stars: 66
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:37.200Z'
description: 'PostCSS plugin for property lookups, similar to Stylus'
tags:
  - lookup
  - postcss
  - postcss-property-lookup
  - stylus
---

# postcss-property-lookup [![Build Status][ci-img]][ci]

[PostCSS] plugin that allows referencing property values without a variable, [similar to Stylus](https://learnboost.github.io/stylus/docs/variables.html#property-lookup).

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://api.travis-ci.org/simonsmith/postcss-property-lookup.svg?branch=master
[ci]:      https://travis-ci.org/simonsmith/postcss-property-lookup


```css
.Test {
  margin-left: 20px;
  margin-right: @margin-left;
  color: red;
  background: @color url('test.png');
  line-height: 1.5;
  font-size: @(line-height)em;
}
```

```css
.Test {
  margin-left: 20px;
  margin-right: 20px;
  color: red;
  background: red url('test.png');
  line-height: 1.5;
  font-size: 1.5em;
}
```

Check the [test fixtures](test/fixtures/in) for more examples.

## Usage

```js
postcss([ require('postcss-property-lookup') ])
```

See [PostCSS] docs for examples for your environment.

## Installation

```
$ yarn add postcss-property-lookup
```

## Usage

### JavaScript

```js
postcss([
  require('postcss-property-lookup')(/* options */),
  // more plugins...
])
```

### TypeScript

```ts
///<reference path="node_modules/postcss-property-lookup/.d.ts" />
import postcssPropertyLookup from 'postcss-property-lookup';

postcss([
  postcssPropertyLookup(/* options */),
  // more plugins...
])
```

## Options

### logLevel

Type: `string: <error|warn>`<br>
Required: `false`<br>
Default: `warn`

When a lookup cannot be resolved, this specifies whether to throw an error or log a warning. In the case of a warning, the invalid lookup value will be replaced with an empty string.

---
repo: sonic16x/postcss-global-import
url: 'https://github.com/sonic16x/postcss-global-import'
homepage: null
starredAt: '2020-12-24T01:37:04Z'
createdAt: '2016-10-10T04:19:19Z'
updatedAt: '2020-12-24T01:37:04Z'
language: JavaScript
license: NA
branch: master
stars: 24
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:14.628Z'
description: Post CSS Plugin for global import css.
tags: []
---

# [Postcss](https://github.com/postcss/postcss) global import.

[![npm package][npm-badge]][npm]
[![build status](https://img.shields.io/travis/scherebedov/postcss-global-import/master.svg?style=flat-square)](https://travis-ci.org/scherebedov/postcss-global-import)

[npm-badge]: https://img.shields.io/npm/v/postcss-global-import.svg?style=flat-square
[npm]: https://www.npmjs.org/package/postcss-global-import


## Installation

```
npm install --save postcss-global-import
```

## Example

Having files foo.css:

```css
.foo {
  color: green;
}

@media (min-width: 640px) {
  .foo {
    color: red
  }
}
```

And local.css:

```css
@global-import "./foo.css";

/* Some Css */
```

We will get:

```css
:global .foo {
  color: green;
}

@media (min-width: 640px) {
  :global .foo {
    color: red
  }
}

/* Some Css */
```

## Options

### sync

In case of sync enabled this plugin will be work synchronously. It's useful in case with usage
`css-modules-require-hook` hook, which doesn't support async postcss plugins.

### globalizeKeyframes

[postcss-modules]: https://github.com/css-modules/postcss-modules
[postcss-modules-local-by-default]: https://www.npmjs.com/package/postcss-modules-local-by-default

By default, `postcss-global-import` do nothing with keyframe names,
because there is no way to escape animation name in `animation-name` or `animation` properties
for plugin [postcss-modules-local-by-default][]
which currently using as dependency [postcss-modules][] plugin.
So, in other words, if you are using [postcss-modules][] or
 [postcss-modules-local-by-default][] plugins **and**
 turn on `globalizeKeyframes` option, following css would
 be not imported properly:

```css
@keyframes myCoolAnimation {
}

.foo {
  animation: myCoolAnimation;
}
```

And animation property value `myCoolAnimation` will be renamed but keyframe name not:

```css
@keyframes myCoolAnimation {
}

.foo {
  animation: _myCoolAnimation__7zliz_1;
}
```

Turn this option on only if you want import keyframes itself and there are no usage of these keyframes in imported file.
In this case postcss-global-import plugin turns

```css
@keyframes myCoolAnimation {
}
```

into

```css
@keyframes :global(myCoolAnimation) {
}
```

This semantic for keyframe names is supported by [postcss-modules-local-by-default][].
There is new [postcss-icss-keyframes](https://github.com/css-modules/postcss-icss-keyframes) plugin (which is coming to replace [postcss-modules-local-by-default][] along with [postcss-icss-selectors](https://www.npmjs.com/package/postcss-icss-selectors)) which currently doesn't support any mechanics for escaping keyframe names from renaming. PRs for both postcss-icss-keyframes and postcss-global-import are welcome.

## Configuring Webpack

Basically only thing you should do is include this plugin to plugin list inside your `postcss.config.js` file and configure any [postcss loader](https://github.com/postcss/postcss-loader) for your css files.


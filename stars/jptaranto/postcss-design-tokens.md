---
repo: jptaranto/postcss-design-tokens
url: 'https://github.com/jptaranto/postcss-design-tokens'
homepage: null
starredAt: '2022-02-10T06:29:55Z'
createdAt: '2022-02-07T23:23:34Z'
updatedAt: '2025-02-18T02:49:20Z'
language: JavaScript
license: MIT
branch: main
stars: 32
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:14.975Z'
description: null
tags: []
---

# postcss-design-tokens

[PostCSS] plugin that provides a function to retrieve design tokens expressed in JS or JSON, within CSS.

[postcss]: https://github.com/postcss/postcss

```css
:root {
  --blue: token("colors.blue");
}

.foo {
  color: var(--blue);
}
```

```css
:root {
  --blue: #000066;
}

.foo {
  color: var(--blue);
}
```

Tokens can be expressed within a `.js` or `.json` file and imported via the [plugin options](#options).

## Install

```sh
npm install --save-dev postcss postcss-design-tokens
```

## Configuration

Import your design tokens and add the plugin to the `plugins` list in `postcss.config.js`:

```js
const tokens = require("./design-tokens.js")

module.exports = {
  plugins: {
    "postcss-design-tokens": { tokens },
  },
}
```

## Usage

Use the token() function in your CSS to retrieve the token values. Any of the below arg formats are valid (with quotes or without):

```css
.foo {
  font-size: token(large);
  color: token("blue");
}
```

Use dot notation for nested values:

```css
.foo {
  font-size: token(fontSizes.large);
  color: token("colors.blue");
}
```

And, ideally use them inside [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties):

```css
:root {
  --font-size-l: token(fontSizes.large);
  --blue: token("colors.blue");
}

.foo {
  font-size: var(--font-size-l);
  color: var(--blue);
}
```

And media queries:

```css
@media (min-width: token(breakpoint.desktop)) {
  .foo {
    display: block;
  }
}
```

Or if you're using `@custom-media`:

```css
@custom-media --desktop-up (min-width: token(breakpoint.desktop));

@media (--desktop-up) {
  .foo {
    display: block;
  }
}
```

[official docs]: https://github.com/postcss/postcss#usage

## Options

### `tokens` (required)

A JS object of your design tokens. Tokens can be nested to any level and there's no defined structure
you need to adhere to.

Instead of defining these inside your `postcss.config.js` it
makes more sense to define them inside either a `.js` file:

```js
module.exports = {
  color: {
    blue: "#000066",
    shades: {
      lightBlue: "#0074D9",
    },
  },
  fontSize: {
    l: "1.5rem",
    xl: "2rem",
    small: "1rem",
  },
}
```

Or a `.json` file:

```json
{
  "color": {
    "blue": "#000066",
    "shades": {
      "lightBlue": "#0074D9"
    }
  },
  "fontSize": {
    "l": "1.5rem",
    "xl": "2rem",
    "small": "1rem"
  }
}
```

Then, simply `require()` in your `postcss.config.js`:

```js
const tokens = require("./design-tokens.json")

module.exports = {
  plugins: {
    "postcss-design-tokens": { tokens },
  },
}
```

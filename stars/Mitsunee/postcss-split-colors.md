---
repo: Mitsunee/postcss-split-colors
url: 'https://github.com/Mitsunee/postcss-split-colors'
homepage: 'https://www.npmjs.com/package/postcss-split-colors'
starredAt: '2023-05-19T21:09:46Z'
createdAt: '2022-02-18T14:43:56Z'
updatedAt: '2023-12-28T14:55:37Z'
language: TypeScript
license: NA
branch: main
stars: 9
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:49.210Z'
description: PostCSS Plugin to destructure colors in custom properties
tags:
  - css
  - css3
  - css3-color
  - css3-properties
  - postcss
  - postcss-plugin
---

# postcss-split-colors

[PostCSS] plugin to destructure colors in custom properties.

Use `!split` in the custom property color declaration you want to split.

[postcss]: https://github.com/postcss/postcss

```css
:root {
  --primary: rgb(14, 14, 14) !split;
  --accent: hsl(0 80% 50% / 25%) !split;
}
```

```css
:root {
  --primary-rgb: 14 14 14;
  --primary: rgb(var(--primary-rgb));
  --accent-rgb: 230 26 26;
  --accent-hsl: 0deg 80% 50%;
  --accent: hsl(var(--accent-hsl / 25%));
}
```

Currently the color functions `rgb()`, `hsl()`, `lch()`, `lab()`, `hwb()` and hex color (with 3, 4, 6 or 8 digits) are supported via [colord]. Alpha values are preserved by default (see options). Note that currently all values are converted to RGB internally, meaning there will be rounding errors in conversions involving non-sRGB color functions. This will be fixed in a future release.

## Usage

**Step 1:** Install plugin:

```sh
npm install --save-dev postcss postcss-split-colors
```

**Step 2:** Check your project for an existing PostCSS config: `postcss.config.js`
in the project root.

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

**Step 3:** Add the plugin to plugins list:

```diff
+ const splitColors = require("postcss-split-colors");

  module.exports = {
    plugins: [
+     splitColors(/* pluginOptions */),
      require("autoprefixer")
    ]
  }
```

## Options

### prompt

Modify the prompt text from `"split"` to any string. The preceeding `!` is added by the plugin:

```js
// postcss.config.js
const splitColors = require("postcss-split-colors");

module.exports = {
  plugins: [splitColors({ prompt: "foobar" })]
};
```

```css
/* your-file.css */
.selector {
  --color: #ff8800 !foobar;
}
```

### convert

Add additional color format conversions to every transformation:

```js
// postcss.config.js
const splitColors = require("postcss-split-colors");

module.exports = {
  plugins: [splitColors({ convert: { rgb: true } })]
};
```

Available keys: `rgb`, `hsl`, `lab`, `lch`, `hwb`. Hex colors are treated as RGB.

### preserve

Preserves the initial declaration, only removing the prompt. This is currently recommended if you find that you are getting rounding errors.

```js
// postcss.config.js
const splitColors = require("postcss-split-colors");

module.exports = {
  plugins: [splitColors({ preserve: true })]
};
```

### preserveAlpha

Preserves the alpha value of the initial declaration, injecting only the split-off color property. This is enabled by default, and can be disabled with `false` (which omits the value in the transformed declaration):

```js
// postcss.config.js
const splitColors = require("postcss-split-colors");

module.exports = {
  plugins: [splitColors({ preserveAlpha: false })]
};
```

[official docs]: https://github.com/postcss/postcss#usage
[colord]: https://github.com/omgovich/colord

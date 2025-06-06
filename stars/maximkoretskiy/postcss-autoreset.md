---
repo: maximkoretskiy/postcss-autoreset
url: 'https://github.com/maximkoretskiy/postcss-autoreset'
homepage: null
starredAt: '2015-09-24T22:42:29Z'
createdAt: '2015-08-25T08:41:24Z'
updatedAt: '2025-01-29T01:10:48Z'
language: JavaScript
license: MIT
branch: master
stars: 246
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:37.299Z'
description: PostCSS plugin for automatic rules isolation
tags: []
---

# PostCSS Auto Reset

[![Build Status][ci-img]][ci] [![NPM][npm-img]][npm] [![David DM][david-img]][david]

<img align="right" width="135" height="95"
     title="Philosopher’s stone, logo of PostCSS"
     src="http://postcss.github.io/postcss/logo-leftp.png">

[PostCSS] plugin for automatic conditional rules reset. Useful for creation of
bullet-proof styles isolation in your extension. Can be used in combination with
[postcss-initial][initial].

[postcss]: https://github.com/postcss/postcss
[ci-img]: https://travis-ci.org/maximkoretskiy/postcss-autoreset.svg
[ci]: https://travis-ci.org/maximkoretskiy/postcss-autoreset
[npm-img]: https://badge.fury.io/js/postcss-autoreset.svg
[npm]: https://www.npmjs.com/package/postcss-autoreset
[david-img]: https://david-dm.org/maximkoretskiy/postcss-autoreset.svg
[david]: https://david-dm.org/maximkoretskiy/postcss-autoreset
[initial]: https://github.com/maximkoretskiy/postcss-initial

The following CSS is written in [BEM](https://en.bem.info/) notation.

```css
.block {
  padding: 1em;
}

.block:hover {
  background-color: red;
}

.block__element {
  margin: 1em;
}

.block--modifier {
  border: 1em;
}
```

```css
.block,
.block__element {
  /* combined reset block */
  all: initial;
}

.block {
  /* reseted */
  padding: 1em;
}

.block:hover {
  /* ignored, we don`t need to reset pseudoclasses  */
  background-color: red;
}

.block__element {
  /* reseted */
  margin: 1em;
}

.block--modifier {
  /* ignored, we don`t need to reset BEM modifiers  */
  border: 1em;
}
```

## Options

### reset

Set of properties that we use to reset rules.  
Takes `string` or `object`.  
Possible values:

- 'initial' - `all: initial`;
- 'sizes' - reset size properties.

Use object to create your own reset. CSS-in-JS notation is supported.

**Example**

```js
postcss([
  require("postcss-autoreset")({
    reset: {
      margin: 0,
      padding: 0,
      borderRadius: 0,
    },
  }),
]);
```

### rulesMatcher

Rules filter function.  
Takes `string` or `function`.  
Possible values:

- 'bem' - reset all [BEM](https://en.bem.info/) blocks and element, ignore modifiers and pseudoclasses. (naming: `.block__element-modifier`);
- 'suit' - reset all [SUIT CSS](https://suitcss.github.io/) components and parts, ignore modifiers, states and pseudoclasses.

You can define custom rules filter to fit your styles naming.

**Example**

```js
postcss([
  require("postcss-autoreset")({
    rulesMatcher: (rule) => rule.selector.match(/regexp/),
  }),
]);
```

Reset only simple rules. See [#28](https://github.com/maximkoretskiy/postcss-autoreset/issues/28)

```js
postcss([
  require("postcss-autoreset")({
    rulesMatcher: (rule) => rule.selector.match(/^[.]\w+$/),
  }),
]);
```

## Usage

**Step 1:** Install plugin:

```sh
npm install --save-dev postcss postcss-autoreset
```

**Step 2:** Check you project for existed PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json`
or `postcss` in bundle config.

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

**Step 3:** Add the plugin to plugins list:

```diff
module.exports = {
  plugins: [
+   require('postcss-autoreset')(),
    require('autoprefixer')
  ]
}
```

[official docs]: https://github.com/postcss/postcss#usage

---
repo: ahabhgk/postcss-atomizer
url: 'https://github.com/ahabhgk/postcss-atomizer'
homepage: null
starredAt: '2021-10-06T21:09:45Z'
createdAt: '2021-09-09T17:07:48Z'
updatedAt: '2021-10-06T21:09:45Z'
language: TypeScript
license: MIT
branch: main
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:43.379Z'
description: (WIP) Using atom css without css-in-js
tags: []
---

# (WIP) PostCSS Atomizer

[PostCSS] plugin for using atomic css in css modules.

[PostCSS]: https://github.com/postcss/postcss

```css
.foo {
    /* Input example */
}
```

```css
.foo {
  /* Output example */
}
```

## Usage

**Step 1:** Install plugin:

```sh
npm install --save-dev postcss postcss-atomizer
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
+   require('postcss-atomizer'),
    require('autoprefixer')
  ]
}
```

[official docs]: https://github.com/postcss/postcss#usage

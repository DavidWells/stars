---
repo: chrisdwheatley/netlify-plugin-image-optim
url: 'https://github.com/chrisdwheatley/netlify-plugin-image-optim'
homepage: ''
starredAt: '2020-05-28T19:48:14Z'
createdAt: '2019-11-05T06:23:55Z'
updatedAt: '2024-12-12T06:17:47Z'
language: JavaScript
license: MIT
branch: master
stars: 64
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:50.773Z'
description: >-
  Optimize images as part of your Netlify build process. Optimizes PNG, JPEG,
  GIF and SVG file formats.
tags:
  - image-optimization
  - netlify
  - netlify-plugin
---

<h1 align="center">netlify-plugin-image-optim</h1>

<div align="center">

Optimize images as part of your Netlify build process. Optimizes PNG, JPEG, GIF and SVG file formats.

</div>

## Install

You can install this plugin in the Netlify UI from this [direct in-app installation link](https://app.netlify.com/plugins/netlify-plugin-image-optim/install) or from the [Plugins directory](https://app.netlify.com/plugins).

To use file-based installation, add the following lines to your `netlify.toml` file:

```toml
[[plugins]]
package = "netlify-plugin-image-optim"
```

Note: The `[[plugins]]` line is required for each plugin, even if you have other plugins in your `netlify.toml` file already.

To complete file-based installation, from your project's base directory, use npm, yarn, or any other Node.js package manager to add this plugin to `devDependencies` in `package.json`.

```
npm install -D netlify-plugin-image-optim
```

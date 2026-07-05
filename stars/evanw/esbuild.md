---
repo: evanw/esbuild
url: 'https://github.com/evanw/esbuild'
homepage: 'https://esbuild.github.io/'
starredAt: '2020-11-27T23:33:36Z'
createdAt: '2016-06-14T16:08:50Z'
updatedAt: '2025-02-25T12:37:47Z'
language: Go
license: MIT
branch: main
stars: 38602
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:20.742Z'
description: An extremely fast bundler for the web
tags:
  - bundler
  - commonjs
  - compiler
  - css
  - esm
  - javascript
  - jsx
  - minifier
  - react
  - tsx
  - typescript
---

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./images/wordmark-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="./images/wordmark-light.svg">
    <img alt="esbuild: An extremely fast JavaScript bundler" src="./images/wordmark-light.svg">
  </picture>
  <br>
  <a href="https://esbuild.github.io/">Website</a> |
  <a href="https://esbuild.github.io/getting-started/">Getting started</a> |
  <a href="https://esbuild.github.io/api/">Documentation</a> |
  <a href="https://esbuild.github.io/plugins/">Plugins</a> |
  <a href="https://esbuild.github.io/faq/">FAQ</a>
</p>

## Why?

Our current build tools for the web are 10-100x slower than they could be:

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./images/benchmark-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="./images/benchmark-light.svg">
    <img alt="Bar chart with benchmark results" src="./images/benchmark-light.svg">
  </picture>
</p>

The main goal of the esbuild bundler project is to bring about a new era of build tool performance, and create an easy-to-use modern bundler along the way.

Major features:

- Extreme speed without needing a cache
- [JavaScript](https://esbuild.github.io/content-types/#javascript), [CSS](https://esbuild.github.io/content-types/#css), [TypeScript](https://esbuild.github.io/content-types/#typescript), and [JSX](https://esbuild.github.io/content-types/#jsx) built-in
- A straightforward [API](https://esbuild.github.io/api/) for CLI, JS, and Go
- Bundles ESM and CommonJS modules
- Bundles CSS including [CSS modules](https://github.com/css-modules/css-modules)
- Tree shaking, [minification](https://esbuild.github.io/api/#minify), and [source maps](https://esbuild.github.io/api/#sourcemap)
- [Local server](https://esbuild.github.io/api/#serve), [watch mode](https://esbuild.github.io/api/#watch), and [plugins](https://esbuild.github.io/plugins/)

Check out the [getting started](https://esbuild.github.io/getting-started/) instructions if you want to give esbuild a try.

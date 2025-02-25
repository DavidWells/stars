---
repo: mlshv/exactify
url: 'https://github.com/mlshv/exactify'
homepage: 'https://dev.to/mishgun/is-your-packagejson-safe-20c1'
starredAt: '2022-10-27T20:52:36Z'
createdAt: '2022-10-25T11:32:24Z'
updatedAt: '2023-11-19T09:19:01Z'
language: JavaScript
license: MIT
branch: main
stars: 13
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:16.504Z'
description: >-
  CLI tool that removes ^ prefix from package.json dependecies and replaces them
  with specific versions from package-lock.json
tags:
  - cli
  - javascript
  - packagejson
  - security
---

# Exactify.js

CLI tool that removes ^ prefix from package.json dependecies and replaces them with specific versions from package-lock.json.

## Usage

```
npx exactify
```

## Motivation

TL;DR: having inexact versions of dependencies in `package.json` is unsafe because it exposes your package to security and compatibility risks.

See more: [Is your package.json safe?](https://dev.to/mishgun/is-your-packagejson-safe-20c1)

## Example
```shell
$ npx exactify

🙌 You are going to replace all inexact package.json versions with specific versions from package-lock.json


Example: "react": "^17.0.3" -> "react": "17.0.15"

? Do you want to procceed? Yes
? Do you also want to add save-exact=true in your .npmrc? (recommended) Yes

Packages with updated minor versions:
@iframely/embed.js: ^1.3.2 -> 1.9.0
@juggle/resize-observer: ^3.0.2 -> 3.4.0
@popperjs/core: ^2.5.4 -> 2.11.6
@sentry/browser: ^7.15.0 -> undefined
@types/react-beautiful-dnd: ^13.1.1 -> 13.1.2
@welldone-software/why-did-you-render: ^4.2.1 -> 4.3.2
axios: ^0.19.0 -> 0.19.2
classnames: ^2.2.6 -> 2.3.2
copy-webpack-plugin: ^6.2.1 -> 6.4.1
core-js: ^3.6.4 -> 3.25.5
emoji-mart: ^3.0.0 -> 3.0.1
eslint-plugin-react-hooks: ^4.2.0 -> 4.6.0
highlight.js: ^10.6.0 -> 10.7.3
hotkeys-js: ^3.9.5 -> 3.10.0
http-proxy-middleware: ^1.0.4 -> 1.3.1
immutable: ^4.0.0-rc.12 -> 4.1.0
jquery: ^3.5.1 -> 3.6.1
mini-css-extract-plugin: ^1.2.1 -> 1.6.2
moment: ^2.24.0 -> 2.29.4
nanoevents: ^5.0.1 -> 5.1.13
normalize-url: ^4.5.0 -> 4.5.1
optimize-css-assets-webpack-plugin: ^5.0.3 -> 5.0.8
prop-types: ^15.7.2 -> 15.8.1
quill-mention: ^3.0.0 -> 3.1.0
react-beautiful-dnd: ^13.0.0 -> 13.1.1
react-hotkeys-hook: ^3.4.6 -> 3.4.7
react-popper: ^2.2.4 -> 2.3.0
react-router-dom: ^5.1.2 -> 5.3.4
semver: ^7.3.5 -> 7.3.8
swiper: ^5.3.7 -> 5.4.5
use-long-press: ^1.1.1 -> 1.2.0
workbox-precaching: ^6.1.5 -> 6.5.4
workbox-routing: ^6.1.5 -> 6.5.4
workbox-webpack-plugin: ^6.1.5 -> 6.5.4
workbox-window: ^6.1.5 -> 6.5.4
yjs: ^13.5.10 -> 13.5.41
@sentry/types: ^7.15.0 -> undefined
@sentry/webpack-plugin: ^1.11.1 -> 1.19.0
@storybook/addon-actions: ^6.3.5 -> 6.5.12
@storybook/addon-essentials: ^6.3.5 -> 6.5.12
@storybook/addon-links: ^6.3.5 -> 6.5.12
@storybook/addon-storysource: ^6.3.5 -> 6.5.12
@storybook/addon-viewport: ^6.3.5 -> 6.5.12
@storybook/addons: ^6.3.5 -> 6.5.12
@storybook/react: ^6.3.5 -> 6.5.12
@swc/core: ^1.2.110 -> 1.3.6
@swc/jest: ^0.2.22 -> 0.2.23
@testing-library/jest-dom: ^5.16.2 -> 5.16.5
@testing-library/react: ^12.1.4 -> 12.1.5
@types/jest: ^27.0.1 -> 27.5.2
@types/react: ^16.14.0 -> 16.14.32
@types/react-dom: ^16.9.8 -> 16.9.16
@types/react-router-dom: ^5.1.2 -> 5.3.3
@typescript-eslint/eslint-plugin: ^5.38.0 -> 5.39.0
@typescript-eslint/parser: ^5.38.0 -> 5.39.0
autoprefixer: ^10.3.3 -> 10.4.12
css-loader: ^3.2.0 -> 3.6.0
cypress: ^5.3.0 -> 5.6.0
eslint-config-prettier: ^6.4.0 -> 6.15.0
eslint-plugin-import: ^2.18.2 -> 2.26.0
eslint-plugin-prettier: ^3.1.1 -> 3.4.1
eslint-plugin-react: ^7.16.0 -> 7.31.8
file-loader: ^5.0.2 -> 5.1.0
husky: ^3.0.9 -> 3.1.0
jest-canvas-mock: ^2.2.0 -> 2.4.0
lint-staged: ^9.4.2 -> 9.5.0
postcss: ^8.3.6 -> 8.4.17
prettier: ^2.4.1 -> 2.7.1
react-dev-utils: ^10.2.0 -> 10.2.1
sass: ^1.39.0 -> 1.55.0
sass-loader: ^10.2.0 -> 10.3.1
style-loader: ^1.0.0 -> 1.3.0
typescript: ^4.3.4 -> 4.8.4
webpack: ^4.43.0 -> 4.46.0
webpack-cli: ^3.1.0 -> 3.3.12
webpack-dev-server: ^3.11.2 -> 3.11.3
webpack-merge: ^5.3.0 -> 5.8.0

Removed 111 carets from package versions
77 minor versions were updated with actual versions from package-lock.json
```

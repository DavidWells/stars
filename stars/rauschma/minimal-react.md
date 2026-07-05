---
repo: rauschma/minimal-react
url: 'https://github.com/rauschma/minimal-react'
homepage: 'https://2ality.com/2020/08/minimal-react.html'
starredAt: '2020-09-13T19:22:17Z'
createdAt: '2020-08-24T12:11:18Z'
updatedAt: '2024-11-09T17:49:20Z'
language: JavaScript
license: MIT
branch: master
stars: 46
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:32.800Z'
description: null
tags: []
---

# Minimal React project

Trying out the examples online: https://rauschma.github.io/minimal-react/build/

## Installing the examples on your computer

* Download and install [Node.js](https://nodejs.org/en/) (this also installs the npm package manager).
* Install the npm packages that this repository depends on:
  ```
  cd minimal-react
  npm install
  ```

## Running the examples locally

* Start the development server:
  ```
  cd minimal-react
  npm start
  ```
* The dev server prints root URLs to the console, e.g.: [`http://localhost:8080/`](http://localhost:8080/)
  * Open one of them in a web browser.
* The browser tab is refreshed automatically when you change either HTML or JavaScript code.

## Building the examples

You can also create a stand-alone version of this web app that doesn’t need the development server to run:

```js
npm run build
```

Afterwards, the complete web app is in directory `minimal-react/build`, ready to be deployed.

## Technologies used in this project

This is an exhaustive list of dependencies:

* [Snowpack](https://www.snowpack.dev): `snowpack`, `@snowpack/plugin-react-refresh`
* [React](https://reactjs.org): `react`, `react-dom`
* [HTM](https://github.com/developit/htm): `htm`
* [Immer](https://immerjs.github.io/immer/docs/introduction): `immer`

---
repo: dilanx/craco
url: 'https://github.com/dilanx/craco'
homepage: 'https://craco.js.org'
starredAt: '2020-02-14T17:42:04Z'
createdAt: '2018-10-14T21:49:44Z'
updatedAt: '2025-02-25T13:09:03Z'
language: TypeScript
license: Apache-2.0
branch: main
stars: 7446
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:05.094Z'
description: >-
  Create React App Configuration Override, an easy and comprehensible
  configuration layer for Create React App.
tags:
  - configuration
  - cra
  - create-react-app
  - customization
  - react
---

<div align="center">
  <a href="https://craco.js.org">
    <img src="https://craco.js.org/img/craco.png" width="200" height="200">
  </a>
  <h1>CRACO</h1>
  <p>
  
**C**reate **R**eact **A**pp **C**onfiguration **O**verride, an easy and comprehensible configuration layer for create-react-app.

**Find config docs, API docs, plugins, and example configs at [craco.js.org](https://craco.js.org)!**

  </p>

  <br>

[![npm status](https://img.shields.io/npm/v/@craco/craco.svg)](https://www.npmjs.com/package/@craco/craco) [![npm downloads](https://img.shields.io/npm/dm/@craco/craco.svg)](https://www.npmjs.com/package/@craco/craco) [![npm license](https://img.shields.io/npm/l/@craco/craco?color=orange)](https://github.com/dilanx/craco/blob/main/packages/craco/LICENSE) [![GitHub stars](https://img.shields.io/github/stars/dilanx/craco?color=red)](https://github.com/dilanx/craco) [![GitHub contributors](https://img.shields.io/github/contributors/dilanx/craco?color=blueviolet)](https://github.com/dilanx/craco/graphs/contributors) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-blueviolet.svg)](https://github.com/dilanx/craco/pulls) ![Node.js CI](https://github.com/dilanx/craco/actions/workflows/run-tests.yml/badge.svg)

</div>

Get all the benefits of [Create React App](https://create-react-app.dev) **and** customization without using 'eject' by adding a single configuration (e.g. `craco.config.js`) file at the root of your application and customize your ESLint, Babel, PostCSS configurations and many more.

1. Install the latest version of the package from npm as a dev dependency:

   ```
   npm i -D @craco/craco
   ```

2. Create a CRACO configuration file in your project's root directory and [configure](https://craco.js.org/docs/):

   ```diff
     my-app
     ├── node_modules
   + ├── craco.config.js
     └── package.json
   ```

3. Update the existing calls to `react-scripts` in the `scripts` section of your `package.json` to use the `craco` CLI:

   ```diff title="package.json"
   "scripts": {
   -  "start": "react-scripts start"
   +  "start": "craco start"
   -  "build": "react-scripts build"
   +  "build": "craco build"
   -  "test": "react-scripts test"
   +  "test": "craco test"
   }
   ```

Visit [craco.js.org](https://craco.js.org) to learn more.

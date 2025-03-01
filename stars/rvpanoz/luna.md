---
repo: rvpanoz/luna
url: 'https://github.com/rvpanoz/luna'
homepage: ''
starredAt: '2020-08-10T20:51:57Z'
createdAt: '2017-09-18T22:22:06Z'
updatedAt: '2025-02-20T16:42:12Z'
language: JavaScript
license: GPL-3.0
branch: master
stars: 1008
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:40.205Z'
description: Manage npm dependencies through a modern UI.
tags:
  - electron
  - epics
  - javascript
  - linux
  - macos
  - material-ui
  - nodejs
  - npm
  - npm-desktop-manager
  - npm-gui
  - npm-management
  - observables
  - react
  - reactjs
  - redux
  - redux-observable
  - rxjs6
  - webpack
  - windows
---

## Luna - npm management through a modern UI. Built with Electron :hibiscus:

<p align="center">
  <img alt="Luna" src="./resources/media/images/luna-small.jpeg">
</p>

<p align="center">npm desktop manager for handling npm dependencies. Supported platforms: OS X Windows and Linux.</p>

---

[![Build Status](https://travis-ci.com/rvpanoz/luna.svg?branch=master)](https://travis-ci.com/rvpanoz/luna)
[![CodeFactor](https://www.codefactor.io/repository/github/rvpanoz/luna/badge)](https://www.codefactor.io/repository/github/rvpanoz/luna)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![NPM Version](https://img.shields.io/npm/v/npm.svg?style=flat)]()
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Frvpanoz%2Fluna.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Frvpanoz%2Fluna?ref=badge_shield)
<a href="https://github.com/rvpanoz/luna/blob/master/LICENSE">
<img alt="License: GPL3.0" src="https://img.shields.io/badge/License-GPL3.0-yellow.svg" target="_blank" />
</a>

## Motivation

Luna was created with main purpose to provide a flexible and modern UI for npm dependencies management. You can install, update and uninstall packages using a user interface build on latest web technologies.

## Features

- Manage global and local packages
- Search for new packages
- Install packages
- Update packages
- Uninstall packages
- Filter packages by name, group and outdated
- Preview package details (versions, statistics, dependencies and more)
- Get notifications for missing dependencies or extraneous packages

## Screenshots

<div style="display: flex; flex-wrap: wrap;padding: 0 4px; justify-content: space-between;">
  <div style="flex: 25%;max-width: 25%;padding: 8px 4px;">
    <img style="margin-top: 8px; vertical-align: middle;" title="luna-1" src="./resources/media/images/luna-screen-1.png"/>
  </div>
  <div style="flex: 25%;max-width: 25%;padding: 8px 4px;">
    <img style="margin-top: 8px; vertical-align: middle;" title="luna-2" src="./resources/media/images/luna-screen-2.png"/>
  </div>
  <div style="flex: 25%;max-width: 25%;padding: 8px 4px;">
    <img style="margin-top: 8px; vertical-align: middle;" title="luna-3" src="./resources/media/images/luna-screen-3.png"/>
  </div>
  <div style="flex: 25%;max-width: 25%;padding: 8px 4px;">
    <img style="margin-top: 8px; vertical-align: middle;" title="luna-3" src="./resources/media/images/luna-screen-4.png"/>
  </div>
</div>

## How it works

The Renderer Process architecture:

- Action (Event) driven nature
- The IO Management, Business Logic Management and Predictable Application State Management processors (middlewares)
  are subscribers of the application action stream.
- The IO Management and Business Logic Management are consumers and producers of actions.
- The Predictable State Management is just a consumer of actions
- The views are listeners of the predictable state and they are re rendered whenever the predictable state changes
  and they produce actions upon the user interaction (clicks)

<div style="display: flex; flex-wrap: wrap;padding: 0 4px;">
  <div style="flex: 25%;max-width: 100%;padding: 0 4px;">
    <img style="margin-top: 8px; vertical-align: middle;" title="luna-renderer" src="./resources/media/images/luna-renderer.png"/>
  </div>
</div>

## Usage

Install application's dependencies:

`npm install`

Start the application

`npm start`

Start the development server and run the application in development mode:

`npm run dev`

## Binaries

All binaries of the latest version are uploaded to the [releases](https://github.com/rvpanoz/luna/releases)

## Tech Stack

- [Electron](https://electronjs.org//) - [🛠](https://stackshare.io/electron) - [🐙](https://github.com/electron/electron) - Build cross-platform desktop apps with JavaScript, HTML, and CSS
- [React](https://reactjs.org/) - [🛠](https://stackshare.io/react) - [🐙](https://github.com/facebook/react) - React is a JavaScript library for building user interfaces
- [Redux](https://redux.js.org/) - [🛠](https://stackshare.io/reduxjs) - [🐙](https://github.com/reduxjs/redux) - Predictable state container for JavaScript apps
- [Webpack](https://webpack.js.org/) - [🛠️](https://stackshare.io/webpack) - [🐙](https://github.com/webpack/webpack) - A static module bundler for modern JavaScript applications.
- [Babel](https://babeljs.io/) - [🛠️](https://stackshare.io/babel) - [🐙](https://github.com/babel/babel) - A JavaScript compiler; use next generation JavaScript, today.
- [Rxjs](https://rxjs-dev.firebaseapp.com/) - [🛠️](https://stackshare.io/rxjs) - [🐙](https://github.com/Reactive-Extensions/RxJS) - Reactive extensions library for Javascript
- [Material-UI](https://material-ui.com//) - [🛠️](https://stackshare.io/material-ui) - [🐙](https://github.com/mui-org/material-ui) - React components that implement Google's Material Design.

## GreeceJS meetup presentation

You can view my presentation in the GreeceJS meetup at http://bit.ly/2RES3AN

## Contributing and Issues

Contributions, issues and feature requests are welcome. <br />Feel free to check [issues page](https://github.com/rvpanoz/luna/issues).

Pull requests are always welcome. 💪 <br />
Be sure to merge the latest from "upstream" before making a pull request. 🙏

## License

Copyright © 2020 [rvpanoz](https://github.com/rvpanoz). This project is [GPL-3.0](https://github.com/rvpanoz/luna/blob/master/LICENSE) licensed.

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Frvpanoz%2Fluna.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Frvpanoz%2Fluna?ref=badge_large)

---

In memory of my friend luna :heart:

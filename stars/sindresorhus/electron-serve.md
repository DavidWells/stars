---
repo: sindresorhus/electron-serve
url: 'https://github.com/sindresorhus/electron-serve'
homepage: null
starredAt: '2018-01-11T19:12:24Z'
createdAt: '2018-01-11T09:00:55Z'
updatedAt: '2025-02-21T02:48:48Z'
language: JavaScript
license: MIT
branch: main
stars: 449
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:30.551Z'
description: Static file serving for Electron apps
tags:
  - electron
  - electron-module
  - nodejs
  - npm-package
  - serve
  - server
  - single-page-app
  - static-file-server
---

# electron-serve

> Static file serving for Electron apps

Normally you would just use `win.loadURL('file://…')`, but that doesn't work when you're making a single-page web app, which most Electron apps are today, as [`history.pushState()`](https://developer.mozilla.org/en-US/docs/Web/API/History_API)'ed URLs don't exist on disk. It serves files if they exist, and falls back to `index.html` if not, which means you can use router modules like [`react-router`](https://github.com/ReactTraining/react-router), [`vue-router`](https://github.com/vuejs/vue-router), etc.

## Install

```sh
npm install electron-serve
```

*Requires Electron 30 or later.*

## Usage

```js
import {app, BrowserWindow} from 'electron';
import serve from 'electron-serve';

const loadURL = serve({directory: 'renderer'});

let mainWindow;

(async () => {
	await app.whenReady();

	mainWindow = new BrowserWindow();

	await loadURL(mainWindow);

	// Or optionally with search parameters.
	await loadURL(mainWindow, {id: 4, foo: 'bar'});

	// The above is equivalent to this:
	await mainWindow.loadURL('app://-');
	// The `-` is just the required hostname
})();
```

## API

### loadUrl = serve(options)

#### options

Type: `object`

##### directory

*Required*\
Type: `string`

The directory to serve, relative to the app root directory.

##### scheme

Type: `string`\
Default: `'app'`

Custom scheme. For example, `foo` results in your `directory` being available at `foo://-`.

##### hostname

Type: `string`\
Default: `'-'`

Custom hostname.

##### file

Type: `string`\
Default: `'index'`

Custom HTML filename. This gets appended with `'.html'`.

##### isCorsEnabled

Type: `boolean`\
Default: `true`

Whether [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) should be enabled.
Useful for testing purposes.

##### partition

Type: `string`\
Default: [`electron.session.defaultSession`](https://electronjs.org/docs/api/session#sessiondefaultsession)

The [partition](https://electronjs.org/docs/api/session#sessionfrompartitionpartition-options) where the protocol should be installed, if not using Electron's default partition.

### loadUrl(window, searchParameters?)

The `serve` function returns a `loadUrl` function, which you use to serve your HTML file in that window.

##### window

*Required*\
Type: `BrowserWindow`

The window to load the file in.

##### searchParameters

Type: `object | URLSearchParams`

Key value pairs or an [`URLSearchParams` instance](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) to set as the search parameters.

## Related

- [electron-util](https://github.com/sindresorhus/electron-util) - Useful utilities for developing Electron apps and modules
- [electron-reloader](https://github.com/sindresorhus/electron-reloader) - Simple auto-reloading for Electron apps during development
- [electron-debug](https://github.com/sindresorhus/electron-debug) - Adds useful debug features to your Electron app
- [electron-context-menu](https://github.com/sindresorhus/electron-context-menu) - Context menu for your Electron app
- [electron-dl](https://github.com/sindresorhus/electron-dl) - Simplified file downloads for your Electron app
- [electron-unhandled](https://github.com/sindresorhus/electron-unhandled) - Catch unhandled errors and promise rejections in your Electron app

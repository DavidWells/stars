---
repo: lyrictenor/electron-open-link-in-browser
url: 'https://github.com/lyrictenor/electron-open-link-in-browser'
homepage: ''
starredAt: '2016-04-30T05:31:13Z'
createdAt: '2015-08-28T19:43:42Z'
updatedAt: '2024-05-01T10:34:43Z'
language: JavaScript
license: MIT
branch: master
stars: 19
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:26.776Z'
description: Open a link in browser for Electron and browser.
tags: []
---

# electron-open-link-in-browser

[![NPM version][npm-image]][npm-url] [![Travis-CI Status][travis-image]][travis-url] [![Appveyor Status][appveyor-image]][appveyor-url] [![Daviddm Status][daviddm-image]][daviddm-url]

> Open a link in browser for Electron and browser.

#### Electron app to browser

![Electron to browser](https://cloud.githubusercontent.com/assets/75448/9560922/626a5610-4e6a-11e5-9a1f-af9c2cd43f38.gif)

#### browser to browser

![browser to browser](https://cloud.githubusercontent.com/assets/75448/9560923/6a926ba2-4e6a-11e5-84ff-3be91ad410d3.gif)


## Install

```
$ npm install --save electron-open-link-in-browser
```


## Usage

```html
<script type="text/javascript" src="build/electron-open-link-in-browser.js"></script>
<a
  href="https://github.com/lyrictenor/electron-triage-for-github"
  onClick="electronOpenLinkInBrowser();"
  >
  github.com/lyrictenor/electron-triage-for-github
</a>

<button
  type="button"
  onclick="electronOpenLinkInBrowser('http://example.com');"
  >
  Example.com
</button>
```

### React.js + JSX + Browserify/Webpack

```html
var electronOpenLinkInBrowser = require("electron-open-link-in-browser");

<a
  href="https://github.com/lyrictenor/electron-triage-for-github"
  onClick={electronOpenLinkInBrowser.bind(this)}
  >
  github.com/lyrictenor/electron-triage-for-github
</a>

<button
  type="button"
  onClick={electronOpenLinkInBrowser.bind(this, "http://example.com")}
  >
  Example.com
</button>
```


## API

### electronOpenLinkInBrowser([url,] event)

Jump to the href property.

#### url

*Optional*

Type: `string`

Jump to url.


## Changelog

[changelog.md](./changelog.md).


## License

MIT © [sanemat](http://sane.jp)


[travis-url]: https://travis-ci.org/lyrictenor/electron-open-link-in-browser
[travis-image]: https://img.shields.io/travis/lyrictenor/electron-open-link-in-browser/master.svg?style=flat-square&label=travis
[appveyor-url]: https://ci.appveyor.com/project/sanemat/electron-open-link-in-browser/branch/master
[appveyor-image]: https://img.shields.io/appveyor/ci/sanemat/electron-open-link-in-browser/master.svg?style=flat-square&label=appveyor
[npm-url]: https://npmjs.org/package/electron-open-link-in-browser
[npm-image]: https://img.shields.io/npm/v/electron-open-link-in-browser.svg?style=flat-square
[daviddm-url]: https://david-dm.org/lyrictenor/electron-open-link-in-browser
[daviddm-image]: https://img.shields.io/david/lyrictenor/electron-open-link-in-browser.svg?style=flat-square

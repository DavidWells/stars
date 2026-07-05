---
repo: michaellzc/better-opn
url: 'https://github.com/michaellzc/better-opn'
homepage: 'https://www.npmjs.com/package/better-opn'
starredAt: '2021-07-27T17:20:59Z'
createdAt: '2018-07-25T13:44:42Z'
updatedAt: '2024-12-02T07:31:41Z'
language: JavaScript
license: MIT
branch: master
stars: 42
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:49.661Z'
description: A better open. Reuse the same tab on Chromium-based browsers on macOS.
tags:
  - open
  - opn
---

# better-opn

> A better opn. Reuse the same tab on Chrome for 👨‍💻. Inspire by [create-react-app](https://github.com/facebook/create-react-app)

## Install

> `$ yarn add better-opn`

> `$ npm install better-opn`


## Usage

If you wish to overwrite the default browser, override `BROWSER` environment variable to your desired browser name (name is platform dependent).

```js
const opn = require('better-opn');

opn('http://localhost:3000');
```

### Reuse tab by match host

In case your app can navigate to another pathnames and still want to reuse opened tab, set environment variable `OPEN_MATCH_HOST_ONLY=true` can tell this program to find reusable tab by only match the host part of your URL.

```js
process.env.OPEN_MATCH_HOST_ONLY = 'true';

opn('http://localhost:3000/foo/bar'); // This will reuse any tab with URL starting with http://localhost:3000/
```

## Author

- [Michael Lin](https://michaellin.me)

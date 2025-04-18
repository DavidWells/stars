---
repo: Availity/react-block-ui
url: 'https://github.com/Availity/react-block-ui'
homepage: 'https://availity.github.io/react-block-ui/'
starredAt: '2022-02-22T03:21:03Z'
createdAt: '2016-09-07T00:17:30Z'
updatedAt: '2024-12-25T08:10:47Z'
language: JavaScript
license: MIT
branch: master
stars: 301
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:15.637Z'
description: Easy way to block the user from interacting with your UI.
tags:
  - availity
  - blockui
  - hacktoberfest
  - javascript
  - loading-indicator
  - react
  - redux
  - ui
---

> Deprecation Notice: This package is no longer supported. Please switch to [@availity/block-ui](https://www.npmjs.com/package/@availity/block-ui).

[![npm version](https://badge.fury.io/js/react-block-ui.svg)](https://badge.fury.io/js/react-block-ui) [![Build Status](https://travis-ci.org/Availity/react-block-ui.svg?branch=master)](https://travis-ci.org/Availity/react-block-ui) [![Coverage Status](https://coveralls.io/repos/github/Availity/react-block-ui/badge.svg?branch=master)](https://coveralls.io/github/Availity/react-block-ui?branch=master)
# react-block-ui
Easy way to block the user from interacting with your UI.

## About
This library contains easy to use components to prevent the user from interacting with the user interface based on some conditions.

There is also a separate component which works with redux to help block and unblock automatically based on redux action types. See the ReduxBlockUi component for more details.

## Documentation
See: [https://availity.github.io/react-block-ui/](https://availity.github.io/react-block-ui/)

## Installation

Install `react-block-ui` via NPM

```sh
npm install --save react-block-ui react react-dom
```

Import the components you need, example:

```js
import BlockUi from 'react-block-ui';
import ReduxBlockUi from 'react-block-ui/redux'; // only for redux
import reduxMiddleware from 'react-block-ui/reduxMiddleware'; // only for redux
import from 'react-block-ui/style.css';
```

## Development

Install dependencies:

```sh
npm install
```

Run examples at [http://localhost:8080/](http://localhost:8080/) with webpack dev server:

```sh
npm start
```

Run tests:

```sh
npm test
```

Run tests & coverage report:

```sh
npm test:coverage
```

Watch tests:

```sh
npm run test:watch
```

## Disclaimer
Open source software components distributed or made available in the Availity Materials are licensed to Company under the terms of the applicable open source license agreements, which may be found in text files included in the Availity Materials.

## License
[MIT](./LICENSE)

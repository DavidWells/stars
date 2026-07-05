---
repo: caiogondim/redux-logdown.js
url: 'https://github.com/caiogondim/redux-logdown.js'
homepage: 'https://npm.im/redux-logdown'
starredAt: '2018-10-26T21:47:38Z'
createdAt: '2017-03-29T20:29:02Z'
updatedAt: '2019-05-26T13:32:28Z'
language: JavaScript
license: MIT
branch: master
stars: 8
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:09.198Z'
description: Redux logging middleware
tags:
  - javascript
  - logdown
  - redux
---

# redux-logdown

<div>
  <a href="https://www.npmjs.com/package/redux-logdown"><img src="https://img.shields.io/npm/v/redux-logdown.svg" /></a>
</div>

<br>

`redux-logdown` is a tiny logger library for [Redux](https://redux.js.org/) written with
[logdown](https://github.com/caiogondim/logdown.js) that supports `localStorage.debug` for
enabling/disabling store logging.

## Installation

```bash
$ npm install --save redux-logdown
```

## Preview

<img src="http://rawgit.com/caiogondim/redux-logdown.js/master/img/preview.png">

## Usage

```js
const redux = require('redux')
const reduxLogdown = require('redux-logdown')

// ...

const middleware = reduxLogdown('loremStore', { diff: true })
const store = redux.createStore(
  reducer,
  undefined,
  redux.applyMiddleware(middleware)
)
```

### Enabling/disabling

Same rules for enabling/disabling as [logdown.js](https://github.com/caiogondim/logdown.js#enablingdisabling-instances).

### Options

#### `diff`
- Default: `false`

Enable/disable logging of previous and current state after each action.

## FAQ

### Why not using `redux-logger`?

`redux-logger` don't support `localStorage.debug` out of the box, which is the standard way to
disble/enable debugging modules in the JavaScript ecosystem. So I decided to create a Redux logger
that supports `localStorage.debug`, just like logdown and debug does.


---

[caiogondim.com](https://caiogondim.com) &nbsp;&middot;&nbsp;
GitHub [@caiogondim](https://github.com/caiogondim) &nbsp;&middot;&nbsp;
Twitter [@caio_gondim](https://twitter.com/caio_gondim)

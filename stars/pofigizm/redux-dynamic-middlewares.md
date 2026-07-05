---
repo: pofigizm/redux-dynamic-middlewares
url: 'https://github.com/pofigizm/redux-dynamic-middlewares'
homepage: null
starredAt: '2017-07-20T20:05:59Z'
createdAt: '2017-02-23T07:05:55Z'
updatedAt: '2024-12-24T23:17:24Z'
language: JavaScript
license: MIT
branch: master
stars: 70
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:43.347Z'
description: Allow add or remove redux middlewares dynamically
tags:
  - code-splitting
  - dynamic
  - middlewares
  - redux
  - redux-dynamic-middlewares
---

# redux-dynamic-middlewares

ℹ️ If you are building big redux app see [redux-dynamic](https://github.com/pofigizm/redux-dynamic).

[![npm version](https://img.shields.io/npm/v/redux-dynamic-middlewares.svg?style=flat-square)](https://www.npmjs.com/package/redux-dynamic-middlewares)
[![npm downloads](https://img.shields.io/npm/dm/redux-dynamic-middlewares.svg?style=flat-square)](https://www.npmjs.com/package/redux-dynamic-middlewares)

Allow add or remove redux middlewares dynamically (for example: on route change).

```
npm install --save redux-dynamic-middlewares
```

## Example

common usage:
```js

// configure store

import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/index'

import dynamicMiddlewares from 'redux-dynamic-middlewares'

const store = createStore(
  rootReducer,
  applyMiddleware(
    // ... other static middlewares
    dynamicMiddlewares
  )
)

// some other place in your code

import { addMiddleware, removeMiddleware, resetMiddlewares } from 'redux-dynamic-middlewares'

const myMiddleware = store => next => action => {
  // do something
  return next(action)
}

// will add middleware to existing chain
addMiddleware(myMiddleware /*[, anotherMiddleware ... ]*/)

// will remove middleware from chain (only which was added by `addMiddleware`)
removeMiddleware(myMiddleware)

// clean all dynamic middlewares
resetMiddlewares()

```

complex usage (when need many instances):
```js

// configure store

import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/index'

import { createDynamicMiddlewares } from 'redux-dynamic-middlewares'

const dynamicMiddlewaresInstance = createDynamicMiddlewares()

const store = createStore(
  rootReducer,
  applyMiddleware(
    // ... other static middlewares
    dynamicMiddlewaresInstance.enhancer
  )
)

// some other place in your code

const myMiddleware = store => next => action => {
  // do something
  return next(action)
}

// will add middleware to existing chain
dynamicMiddlewaresInstance.addMiddleware(myMiddleware /*[, anotherMiddleware ... ]*/)

// will remove middleware from chain (only which was added by `addMiddleware`)
dynamicMiddlewaresInstance.removeMiddleware(myMiddleware)

// clean all dynamic middlewares
dynamicMiddlewaresInstance.resetMiddlewares()

```

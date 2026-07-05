---
repo: redux-utilities/redux-actions
url: 'https://github.com/redux-utilities/redux-actions'
homepage: 'https://redux-actions.js.org'
starredAt: '2018-09-16T04:13:03Z'
createdAt: '2015-07-01T21:08:45Z'
updatedAt: '2025-02-24T12:50:21Z'
language: JavaScript
license: MIT
branch: master
stars: 6506
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:14.370Z'
description: Flux Standard Action utilities for Redux.
tags: []
---

# redux-actions

[![Build Status](https://travis-ci.org/redux-utilities/redux-actions.svg?branch=master)](https://travis-ci.org/redux-utilities/redux-actions)
[![codecov](https://codecov.io/gh/redux-utilities/redux-actions/branch/master/graph/badge.svg)](https://codecov.io/gh/redux-utilities/redux-actions)
[![npm](https://img.shields.io/npm/v/redux-actions.svg)](https://www.npmjs.com/package/redux-actions)
[![npm](https://img.shields.io/npm/dm/redux-actions.svg)](https://www.npmjs.com/package/redux-actions)

> [Flux Standard Action](https://github.com/acdlite/flux-standard-action) utilities for Redux

### Table of Contents

- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
- [Documentation](#documentation)

# Getting Started

## Installation

```bash
$ npm install --save redux-actions
```

or

```bash
$ yarn add redux-actions
```

The [npm](https://www.npmjs.com) package provides [ES modules](http://jsmodules.io/) that should be compatible with every modern build tooling.

## Usage

```js
import { createActions, handleActions, combineActions } from 'redux-actions';

const defaultState = { counter: 10 };

const { increment, decrement } = createActions({
  INCREMENT: (amount = 1) => ({ amount }),
  DECREMENT: (amount = 1) => ({ amount: -amount })
});

const reducer = handleActions(
  {
    [combineActions(increment, decrement)]: (
      state,
      { payload: { amount } }
    ) => {
      return { ...state, counter: state.counter + amount };
    }
  },
  defaultState
);

export default reducer;
```

[See the full API documentation.](https://redux-actions.js.org/)

## Documentation

- [Introduction](https://redux-actions.js.org/introduction)
- [API](https://redux-actions.js.org/api)
- [External Resources](https://redux-actions.js.org/externalresources)
- [Changelog](https://redux-actions.js.org/changelog)
- [Contributors](https://github.com/redux-utilities/redux-actions/graphs/contributors)

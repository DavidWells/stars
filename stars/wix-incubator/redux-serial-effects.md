---
repo: wix-incubator/redux-serial-effects
url: 'https://github.com/wix-incubator/redux-serial-effects'
homepage: ''
starredAt: '2018-03-08T18:59:34Z'
createdAt: '2017-08-27T11:30:57Z'
updatedAt: '2023-03-13T08:53:06Z'
language: JavaScript
license: MIT
branch: master
stars: 13
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:26.387Z'
description: Predictable side-effect middleware for the predictable state container
tags:
  - effects
  - middleware
  - redux
  - serial-effects
  - side-effects
---

# Redux Serial Effects

Predictable side-effect middleware for the predictable state container.

## Approach

Serial effects does two things:

1. Implements an Elm-like architecture for executing side-effects
1. Manages a queue of side-effects for execution (hence the name)

The first promotes DRYness, reduces fragmentation of business logic, and increases composability.
The second makes side-effects predictable by executing side-effects in the order they were
generated.

### Generating Side-effects

Side-effects are generated in similar fashion to the Elm Architecture. The most notable difference
being that the `reducer` is not responsible for generating side-effects. A new player is involved,
called `subscriber`, which differs from a Redux listener in several aspects:

1. Subscribers receive both the state before the dispatched action was processed by the reducers
   (a.k.a. `from`), and the final state after the reducer changed it (a.k.a. `to`).
2. Subscribers maybe return a list of effects to execute.

Serial-effects tracks changes to the state, and each time a change is detected, calls all registered
subscribers. Each subscriber receives both the state before the dispatched action was processed by the reducers
(a.k.a. `from`), and the final state after the reducer changed it (a.k.a. `to`), and my return a list of effects to execute.
Serial-effects will collect all these effects and will execute them as described in the next section.

### Executing Side-effects

Once all subscribers have been called for a given state transition, and have returned their lists of
effects to execute, Serial-effects will organise these effects in two groups: immediate, and
queued.

Immediate effects are executed synchronously before `dispatch` returns. Any exception thrown by an
immediate effect is thrown to the code that called `dispatch`. Any promises returned by immediate
effects are ignored.

Once all immediate effects have completed, queued effects are put into the middleware's internal
execution queue, to be executed when their turn arrives. Dispatch will then return. All queued
effects produced by a single transition are queued together and will be executed concurrently. The
queue will wait for all promises returned by these effects before advancing to the next group of
queued effects. It stops waiting if any promise is rejected, and execution rights are passed to the
next group of queued effects.

### Completion Actions

Each effect may specify which action should be dispatched, if any, when it completes. For every
effect that completes, either successfully or not, the middleware will dispatch the action to the
store, with the effect's results. 

The action's payload will hold whether the effect completed successfully or not, and what value or
error it returned or resolved/rejected with.

## Usage

```javascript
const { createStore, applyMiddleware } = require('redux')
const { createMiddleware } = require('redux-serial-effects')

// actions

const SET_DISPLAY_ITEM = 'SET_DISPLAY_ITEM'
const DATA_RESPONSE_SUCCESS = 'DATA_RESPONSE_SUCCESS'
const DATA_RESPONSE_FAILURE = 'DATA_RESPONSE_FAILURE'

const setItemToDisplay = id => ({
  type: SET_DISPLAY_ITEM,
  id
})

const dataResponseSuccess = data => ({
  type: DATA_RESPONSE_SUCCESS,
  data
})

const dataResponseFailure = error => ({
  type: DATA_RESPONSE_FAILURE,
  error
})

// effects

const getDataFromRemoteServiceEffect = id => ({
  run: () =>
    new Promise((resolve, reject) => {
      setTimeout(() => resolve({ content: 'item data' }), 10)
    }),
  isQueued: true,
  resultActionCreator: (error, payload) =>
    error ? dataResponseFailure(error) : dataResponseSuccess(payload)
})

// reducer

const initialState = {
  itemToDisplay: {
    id: 0,
    data: {}
  },
  errorState: false,
  errorDescription: null
}

const getDisplayItemId = state => state.itemToDisplay.id

const reducer = (state, action) => {
  switch (action.type) {
    case SET_DISPLAY_ITEM:
      return Object.assign({}, state, {
        itemToDisplay: Object.assign({}, state.itemToDisplay, {
          id: action.id
        })
      })

    case DATA_RESPONSE_FAILURE:
      return Object.assign({}, state, {
        errorState: true,
        errorDescription: action.error
      })

    case DATA_RESPONSE_SUCCESS:
      return Object.assign({}, state, {
        errorState: false,
        errorDescription: null,
        itemToDisplay: Object.assign({}, state.itemToDisplay, {
          data: action.data
        })
      })

    default:
      return state
  }
}

// subscriber

const subscriber = ({ from, to, hasChanged }) => {
  if (hasChanged(getDisplayItemId)) {
    return getDataFromRemoteServiceEffect(to.itemToDisplay.id)
  }
}

// store

const { middleware, subscribe } = createMiddleware()
subscribe(subscriber)
const store = createStore(reducer, initialState, applyMiddleware(middleware))

store.dispatch(setItemToDisplay(1))
```

## Status of the API

Public API is not stable yet.


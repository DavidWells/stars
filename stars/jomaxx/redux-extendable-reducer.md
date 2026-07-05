---
repo: jomaxx/redux-extendable-reducer
url: 'https://github.com/jomaxx/redux-extendable-reducer'
homepage: ''
starredAt: '2017-01-08T23:13:39Z'
createdAt: '2017-01-07T21:14:02Z'
updatedAt: '2023-01-28T18:04:33Z'
language: JavaScript
license: NA
branch: master
stars: 29
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:49.709Z'
description: >-
  Redux reducer capable of lazily extending itself. Useful for large single page
  applications that utilize bundle splitting.
tags: []
---

# redux-extendable-reducer

Redux reducer capable of lazily extending itself. Useful for large single page applications that utilize bundle splitting.

*NOTE: formally redux-injectable-reducer*

## Install

```
npm install --save redux redux-extendable-reducer
```

## Usage

```js
import { createStore } from 'redux';
import rootReducer, { extendReducer } from 'redux-extendable-reducer';

const countReducer = (state = 0, action) => {
  if (action.type === 'INCREMENT_COUNT') return state + 1;
  return state;
};

const incrementCount = () => ({ type: 'INCREMENT_COUNT' });

const store = createStore(rootReducer);

store.dispatch(incrementCount());

console.log(store.getState().count); // undefined

store.dispatch(extendReducer({ count: countReducer }));

console.log(store.getState().count); // 0

store.dispatch(incrementCount());

console.log(store.getState().count); // 1
```

### with React

```js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import rootReducer, { extendReducer } from 'redux-extendable-reducer';

const countReducer = (state = 0, action) => {
  if (action.type === 'INCREMENT_COUNT') return state + 1;
  return state;
};

const incrementCount = () => ({ type: 'INCREMENT_COUNT' });

class App extends Component {
  static propTypes = {
    count: PropTypes.number,
    extendReducer: PropTypes.func.isRequired,
    incrementCount: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.extendReducer({ count: countReducer });
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.props.incrementCount();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return <span>{this.props.count}</span>;
  }
}

const ConnectedApp = connect(
  state => ({ count: state.count }),
  { extendReducer, incrementCount }
)(App);

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('root')
);
```

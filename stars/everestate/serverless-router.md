---
repo: everestate/serverless-router
url: 'https://github.com/everestate/serverless-router'
homepage: ''
starredAt: '2024-12-31T22:21:10Z'
createdAt: '2018-05-24T07:53:15Z'
updatedAt: '2025-01-01T14:53:32Z'
language: JavaScript
license: MIT
branch: master
stars: 6
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:53:33.729Z'
description: 'Serverless, minimalist, pluggable, universal router.'
tags:
  - lambda
  - router
  - routing
  - serverless
---

# @everestate/serverless-router [![npm version](https://badge.fury.io/js/%40everestate%2Fserverless-router.svg)](https://www.npmjs.com/package/@everestate/serverless-router)

> Serverless, minimalist, pluggable, universal router.

## Installation

```
npm install @everestate/serverless-router --save
```

## Usage

To use `serverless-router` you will need at least one of its plugins.

* [serverless-router-aws](https://github.com/everestate/serverless-router-aws)
* [serverless-router-dynamics](https://github.com/everestate/serverless-router-dynamics)
* [serverless-router-event](https://github.com/everestate/serverless-router-event)
* and others


```javascript
const Router = require('@everestate/serverless-router');
const { HTTP } = require('@everestate/serverless-router-aws');

cosnt userService = require('../services/userService');

function dispatch(event) {
  const router = new Router([HTTP]);

  router.http
    .post('/users', () =>
      userService.createUser(event.body)) // returns promise
    .get('/users/:id', () =>
      userService.getUserById(event.pathParameters.id)) // returns promise
    .patch('/users/:id', () =>
      userService.updateUser(event.pathParameters.id, event.body)) // returns promise
    .delete('/users/:id', () =>
      userService.deleteUser(event.pathParameters.id)); // returns promise

  router.mismatch(() => {
    const { path, httpMethod } = event;
    return Promise.reject(new Error(`Unknown route: ${httpMethod} ${path}`));
  });

  return router.dispatch(event);
}

function myLambdaHandler(event, context, callback) {
  return dispatch(event)
    .then(result =>
      callback(null, { statusCode: result.code, body: JSON.stringify({ payload: result.payload }) }))
    .catch(error =>
      callback(null, { statusCode: '500', body: JSON.stringify({ message: error.message }) }));
}
```

### When route is mismatched

By default `serverless-router` will throw `error` on route mismatch.

It's possible to define a custom mismatch handler, and it would be called with same arguments as `dispatch` was called:

```javascript
router.mismatch((event, context, callback) => {
  const { path, httpMethod } = event;
  return callback(null, {
    statusCode: '404',
    body: JSON.stringify({ message: `ServerlessRouter can't find the route ${httpMethod} ${path}` }),
  });
});
```

## Middleware

When middleware are set, they will be called before each matched route in order they registered.
Middleware callback is expected to return `Promise` and could be defined with `use`:
```
router.use((event, context, callback) => {
    const { source } = event;
    if (source === 'bad source') {
        return Promise.reject(new Error('Bad event source'));
    }
    return Promise.resolve();
})
```

## Plugins

Check the [docs/plugins.md](./docs/plugins.md) to find out how to implement the new plugin.

## License

[MIT](./LICENSE)

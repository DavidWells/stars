---
repo: pburtchaell/redux-promise-middleware
url: 'https://github.com/pburtchaell/redux-promise-middleware'
homepage: 'https://pburtchaell.gitbook.io/redux-promise-middleware/'
starredAt: '2020-05-06T05:40:35Z'
createdAt: '2015-07-13T03:55:34Z'
updatedAt: '2025-01-19T10:25:01Z'
language: JavaScript
license: MIT
branch: main
stars: 1982
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:54.578Z'
description: 'Enables simple, yet robust handling of async action creators in Redux'
tags:
  - async
  - async-functions
  - optimistic-updates
  - promises
  - redux
---

# Redux Promise Middleware

[![npm downloads](https://img.shields.io/npm/dm/redux-promise-middleware.svg?style=flat)](https://www.npmjs.com/package/redux-promise-middleware)

Redux Promise Middleware enables simple, yet robust handling of async action creators in [Redux](http://redux.js.org). 

```js
const asyncAction = () => ({
  type: 'PROMISE',
  payload: new Promise(...),
})
```

Given a single action with an async payload, the middleware transforms the action to a separate pending action and a separate fulfilled/rejected action, representing the states of the async action.

The middleware can be combined with [Redux Thunk](https://github.com/gaearon/redux-thunk) to chain action creators.

```js
const secondAction = (data) => ({
  type: 'SECOND',
  payload: {...},
})

const firstAction = () => {
  return (dispatch) => {
    const response = dispatch({
      type: 'FIRST',
      payload: new Promise(...),
    })

    response.then((data) => {
      dispatch(secondAction(data))
    })
  }
}
```

## Documentation and Help
- [Introduction](/docs/introduction.md)
- [Guides](/docs/guides/)
- [Examples](/examples)

**Heads Up:** Version 6 includes some breaking changes. Check the [upgrading guide](docs/upgrading/v6.md) for help.

## Issues
For bug reports and feature requests, [file an issue on GitHub](https://github.com/pburtchaell/redux-promise-middleware/issues/new).

For help, [ask a question on StackOverflow](https://stackoverflow.com/questions/tagged/redux-promise-middleware).

## Releases
- [Release History](https://github.com/pburtchaell/redux-promise-middleware/releases)
- [Upgrade from 5.x to 6.0.0](docs/upgrading/v6.md)
- [Upgrade from 4.x to 5.0.0](docs/upgrading/v5.md)
- [Upgrade from 3.x to 4.0.0](docs/upgrading/v4.md)

For older versions:
- [5.x](https://github.com/pburtchaell/redux-promise-middleware/tree/5.1.1)
- [4.x](https://github.com/pburtchaell/redux-promise-middleware/tree/4.4.0)
- [3.x](https://github.com/pburtchaell/redux-promise-middleware/tree/3.3.0)
- [2.x](https://github.com/pburtchaell/redux-promise-middleware/tree/2.4.0)
- [1.x](https://github.com/pburtchaell/redux-promise-middleware/tree/1.0.0)

## Maintainers
Please reach out to us if you have any questions or comments.

Patrick Burtchaell (pburtchaell):
- [GitHub](https://github.com/pburtchaell)

Thomas Hudspith-Tatham (tomatau):
- [GitHub](https://github.com/tomatau)

## License

[Code licensed with the MIT License (MIT)](/LICENSE). 

[Documentation licensed with the CC BY-NC License](https://creativecommons.org/licenses/by-nc/4.0/).

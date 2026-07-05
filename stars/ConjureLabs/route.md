---
repo: ConjureLabs/route
url: 'https://github.com/ConjureLabs/route'
homepage: ''
starredAt: '2018-08-25T22:14:47Z'
createdAt: '2018-02-01T21:25:20Z'
updatedAt: '2023-04-22T23:19:47Z'
language: JavaScript
license: MIT
branch: master
stars: 7
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:15.314Z'
description: Express routing defined by a directory structure
tags:
  - async
  - express
  - node
  - routing
---

*This repo has been archived — https://github.com/tmarshall/soda is an active replacement*

---

[![CircleCI](https://circleci.com/gh/ConjureLabs/route/tree/master.svg?style=svg)](https://circleci.com/gh/ConjureLabs/route/tree/master)

This library walks a directory and turns it into express routes.

The current version requires express >= 5, so that async handlers are supported.

## Install

```sh
npm install @conjurelabs/route
```

or

```sh
yarn add @conjurelabs/route
```

**!! This requires `express>=5`**, since earlier versions of Express don't work with `async` route handlers.

## Usage

Let's say you have your routes in a directory like:

```
.
└── routes
    └── account
        ├── $accountId
        │   ├── delete.js
        │   ├── get.js
        │   ├── patch.js
        │   ├── post.js
        │   └── put.js
        └── all.js
```

Note that params are defined with a `$`, not a `:`. Colons cause issues when searching in editors.

Each file just needs to export an express route handler:

```js
module.exports = (req, res, next) => {
  res.send('result')
}
```

You can also export an array of handlers:

```js
const fn1 = (req, res, next) => { /* logic */ }
const fn2 = (req, res, next) => { /* logic */ }
module.exports = [fn1, fn2]
```

This library will automatically convert these exported functions into express route handlers. You will need to walk your route directory, and mount them on your express server:

```js
const express = require('express')
const walkRoutes = require('@conjurelabs/route')
const routes = await walkRoutes(path.resolve(__dirname, 'routes'))
const server = express()
server.use(routes)
```

### Filenames

This library supports the following express verbs: `get`, `post`, `put`, `patch`, `delete`, and `all`. Any verb the library does not recognize will be ignored.

A file `get.js` will expose a `GET` route.

You can append anything after `get.` if you want to chain multiple handlers. E.g. `get.0.js`, `get.1.js`. Filenames are sorted before being exposed, so `get.0.js` will be mounted first, on the given path.

### Middleware

You can add middleware methods in a `.middleware` directory. All routes in that directory, or any sub-directory, will have access to these middleware functions.

They are disabled by default, and can be enabled for all files in the directory, and sub-directories, by providing a `.middleware.flags.js` file.

Let's say you have the following structure:

```
.
└── routes
    ├── .middleware
    │   ├── requireLoggedIn.js
    │   └── appendSession.js
    ├── .middleware.flags.js
    └── account
        ├── $accountId
        │   ├── delete.js
        │   ├── get.js
        │   ├── patch.js
        │   ├── post.js
        │   └── put.js
        └── all.js
```

Where middleware files look like:

```js
// routes/.middleware/requireLoggedIn.js
module.exports = async (req, res, next) => {
  if (!req.user) {
    return next(new Error('Invalid auth'))
  }
  next()
}
```

And we have a root `.middleware.flags.js` of:

```js
module.exports = {
  requireLoggedIn: true,
  appendSession: false
}
```

This will only implement the `requireLoggedIn` middleware on all routes, by default. If you wanted to turn that off inside a specific sub-directory, you can add a `.middleware.flags.js` in that sub-directory.

Middleware functions are run before route handlers.

If you want to see examples, take a look at [the test mock directories](./test/mocks/)

#### Route-Exported Middleware Flags

If you need to set middleware flags on a specific route, instead of a whole directory, you can do so:

```js
module.exports = (req, res) => {
  res.send('some route')
}

module.exports.middlewareFlags = {
  appendSession: true
}
```

#### Middleware Flag Resolution

Flags are resolved bottom-up. Route-exported flags come first, then flags set in `.middleware.flags.js` files, going upward in the directory.

#### Middleware skipping

Sometimes you'll want to simply skip all the route handlers in a file or directory based on some condition. For example, you might have an API directory of debug routes that should only be available if you're in Development.

Middleware methods get four args: `(req, res, next, skip)`. `skip` is a function that will skip over any handlers. So, in the example of debug routes, you could have a middleware function like this:

```js
// routes/.middleware/devOnly.js
const { NODE_ENV } = process.env
module.exports = (req, res, next, skip) => {
  if (NODE_ENV !== 'development') {
    return skip()
  }
  next()
}
```

Then, wherever you enable this middleware, the routes will only be available if `NODE_ENV === 'development'`, or else they will 404.

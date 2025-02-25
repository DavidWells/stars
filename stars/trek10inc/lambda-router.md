---
repo: trek10inc/lambda-router
url: 'https://github.com/trek10inc/lambda-router'
homepage: null
starredAt: '2018-01-16T21:30:35Z'
createdAt: '2017-07-24T16:07:21Z'
updatedAt: '2024-02-27T05:03:16Z'
language: JavaScript
license: NA
branch: master
stars: 9
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:30.230Z'
description: Simple lightweight lambda router
tags: []
---

# Lightweight promise based router for AWS Lambda invoked by AWS Apigateway lambda proxy integration

## Inspiration

## Usage
Define your common middleware, routes, and default route.
```
const Router = require('lambda-router');
const routes = require('./routes'); // your routes
const authorizer = require('./authorizer'); // your authorizer
let router = new Router({
  middleware: [
  	middleware1,
  	middleware2
  ],
  routes: [
  	[ 'GET', '/widgets', routes.getWidgets ],
  	[ 'GET', '/widgets/:widgetId', [ authorizer.widget.get, routes.getWidget ] ],
  	[ 'PUT', '/widgets/:widgetId', [ authorizer.widget.put, routes.putWidget ] ]
  ],
  defaultRoute: routes.defaultRoute
});
```

Use the router
```
module.exports.handler = function (event, context, callback) {
  event._context = context // lambda-router only passes the event object. I do this if I need the context object.
  return router.route(event)
  .then(result => {
  	// post route processing
  	callback(null, result)
  })
  .catch(err => {
  	// handle the error here
  })
}
```

## Middleware
Middleware is a function that takes the lambda event as a parameter, performs some work, including modifying the event and returns the event (or another object).
The result is passed to the next middleware function. Middleware can return a promise of the event object or the event object.

Middleware errors/rejections are not handled.

## How it works
Each common middleware function is called in turn with the results from the preceeding middleware. The first middleware function is called with the event object passed into `router.route`.
After the common middleware executes, the correct route is determined using the [path-to-regexp](https://github.com/pillarjs/path-to-regexp).

The path parameters are added to the `event.pathParameters` object to make migrating from apigateway routing simpler.

After the route is determine the route's middleware is called in the same manner as the common middleware. Finally the route handler is called.

Using the above example router configuration and the request `GET /widgets/1234` router in effect makes these calls
```
Promise.resolve(event)
.then(middleware1)
.then(middleware2)
.then(router.checkRoute) // this is where the route is determined and path parameters are added to the event
.then(authorizer.widget.get)
.then(routes.getWidget)
```

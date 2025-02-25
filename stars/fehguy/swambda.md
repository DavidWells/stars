---
repo: fehguy/swambda
url: 'https://github.com/fehguy/swambda'
homepage: null
starredAt: '2018-06-07T03:16:37Z'
createdAt: '2018-04-30T18:20:36Z'
updatedAt: '2024-01-14T12:44:36Z'
language: JavaScript
license: NA
branch: main
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:21.232Z'
description: null
tags: []
---

# Swambda

[![CircleCI](https://circleci.com/gh/fehguy/swambda.svg?style=svg)](https://circleci.com/gh/fehguy/swambda)

Integrate swagger specifications and lambda into an easy-to-use routing tier.
This package is optimized for use with the [netlify](https://netlify.com) system.

By utilizing an OpenAPI specification and the swambda project, developers can
easily implement full REST API applications in Lambda without using an API
gateway or other infrastructure.  When used with the Netlify system, you can
host efficient, scalable REST APIs for free, while using the entire ecosystem
of the OpenAPI specification including spec editors, code generators, testing
systems, etc.

## Note! Project is not complete and not ready for production!

You can make a difference, too, by sending pull requests.

### Concept

Swambda will take a valid OpenAPI 2.0 specification and use a single operation
extension (`x-swagger-router-controller`) and `operationId` to extract arguments
and route requests directly to a controller function.  The arguments will be
parsed, extracted, and coerced into the format as designated by the OAI spec.
The developer's job is then to simply implement controller functions to perform
business logic.

It is expected that each controller function will return a promise, and can
optionally use a simple function to correctly format a response as appropriate
for the netlify platform.

for example:

```
GET: /pets/{petId}
```

in an OAI definition:

```yaml
/pets/{petId}:
  get:
    summary: Info for a specific pet
    operationId: getPetById
    x-swagger-router-controller: Pets
    tags:
      - pets
    parameters:
      - name: petId
        in: path
        required: true
        description: The id of the pet to retrieve
        type: string
    responses:
      200:
        description: The pet requested
        schema:
          $ref: "#/definitions/Pet"
```

will call the `Pets.js` javascript file method `getPetById`:

```js
const getPetById = exports.getPetById = (args) => {
  const petId = args.petId;
 /* return a promise and resolve with the pet data */
}
```

#### Basic setup

Import the project and expose a single handler function:


```js
"use strict";

let swambda = require("swambda");
const handler = exports.handler = (event, context, callback) => {
```

Set a cache.  For a lambda, using `global` is a common practice.  If outside
of a lambda-like runtime, use something else that supports a map.  This also
exposes the `Swambda` class globally in our example, so `new Swambda()` resolves.

```js
swambda.cacheWith(global);

const router = swambda.fromCache()
  .catch((err) => {
    // not in cache, need to create

    // load spec as object via webpack yml-loader
    const swagger = require("yml-loader!./swagger.yaml");

    // set the route path
    return new Swambda(event.path)
      .load(swagger)
      .then(router => {
        return router;
      });
});
```

Note! the `event.path` variable is used during initialization to help determine
where the library responses are being served from.  This eases the setup.

We now are guaranteed to have a `router` object, which can process the request:

```js
router.process(event)
  .then((result) => {
    // return result to the caller
    callback(null, result);
  })
  .catch((err) => {
    // catch any errors and do something meaningful
    callback(null, err);
  });
```

Note: the `.catch()` is not expected to be invoked at runtime. Any `reject(..)`
messages should be caught inside your controller code, and passed to the
`respondWith` function.  That allows you to send a proper error message and
payload, not just some ugly stack trace.

You can configure optional features, so you can add authentication, response signing,
etc:

```js

new Swambda(event.path)
  .cors()                       // enable CORS and add additional response headers
  .preProcessor(preProcessor)   // add a pre-processor for requests
  .postProcessor(postProcessor) // add a post-processor for responses
  //-> continue with loading
```

When configuring CORS support, you can optionally add headers in the function.
For example, if you want to allow a header called `Bearer`:

```js
new Swambda(event.path)
  .cors({
    "Access-Control-Allow-Headers": "Content-Type, Bearer"
  })
```

This will merge with the "standard" CORS response headers like

* `Access-Control-Allow-Headers`
* `Access-Control-Allow-Methods`
* `Access-Control-Allow-Origin`

The `preProcessor` signature looks like this:

```js
const preProcessor = function (event, args) {
  return new Promise((resolve, reject) => {
    // for example, detect the user from the headers using a custom function
    args[user] = detectUserFromHeaders(event.headers);
    resolve(args);
  });
}
```

Note that the preProcessor can add additional arguments into the `args` hash,
just be sure to avoid collisions with arguments defined in the OAI Spec.

The `postProcessor` can inject additional headers, handle special error codes, etc:

```js
const postProcessor = function (response) {
  return new Promise((resolve, reject) => {
    if(response.statusCode === 500) {
      response.headers["x-error-code"] = "abcd123";
    }
    resolve (response);
  })
}
```

Finally, implementing the business logic is easy!

```js
// Node: `respondWith` is implicitly available with a global cache

const getPetById = exports.getPetById = (args) => {
  return new Promise((resolve, reject) => {
    const petId = args.petId;
    if(typeof petId === "undefined") {
      respondWith(resolve, 400, {
        code: 400,
        message: "invalid pet id"
      });
      return;
    }
    if(data[petId]) {
      respondWith(resolve, 200, data[petId]);
    }
    respondWith(resolve, 404, {
      code: 404,
      message: "pet not found"
    });
  })
}
```

Here is a [full example](https://github.com/fehguy/swambda/blob/master/examples/README.md)

### FAQs

What about performance?  Use the cache during setup and it has almost zero
overhead.

What parameter types are supported?  Primitives and objects are currently
supported. Parameters with arrays, form data are not (but easy to add).

---
repo: dougmoscrop/get-openapi-paths
url: 'https://github.com/dougmoscrop/get-openapi-paths'
homepage: null
starredAt: '2020-11-18T23:23:13Z'
createdAt: '2020-11-18T19:33:58Z'
updatedAt: '2021-10-18T08:34:08Z'
language: JavaScript
license: NA
branch: master
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:23.123Z'
description: Infer an OpenAPI paths-like object from various web frameworks
tags: []
---

# get-openapi-paths

This library tries to return paths from various frameworks for inclusion in an auto-generated OpenAPI specification

Supports:

- koa-router
- koa/router
- express
- connect (routes only, no methods)
- fastify

Does not support:

- koa-route


## Sample output

```js
const getPaths = require('get-openapi-paths');
const express = require('express');

const app = express();

app.get('/foo', ...);

const paths = getPaths(app);

/*
paths is:
{
    '/foo': {
        get: {}
    }
}
*/
```

## Prior Art

- https://github.com/serverless-components/express/commit/5cc5086f18ec9cf6480caf5cc5b9f676d7108cf2
- https://github.com/thenativeweb/get-routes/
- https://github.com/wesleytodd/express-openapi
- https://github.com/expressjs/express/issues/3308
- https://github.com/AlbertoFdzM/express-list-endpoints

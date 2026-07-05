---
repo: twentyfourg/jest-apidoc
url: 'https://github.com/twentyfourg/jest-apidoc'
homepage: null
starredAt: '2022-04-03T05:14:01Z'
createdAt: '2021-02-22T16:03:48Z'
updatedAt: '2022-04-03T05:14:01Z'
language: JavaScript
license: NA
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:51.907Z'
description: null
tags: []
---

#### Installation

`npm i jest-apidoc`

#### Configuration

Creates [apidoc.js](https://apidocjs.com/) documentation from jest tests

Create a jest-apidoc.json at project root with the following structure

```
{
    "outFolder": string, // path to write apidoc to
    "ignoreRoutes": string[], // array of routes to ignore
}
```

From your tests, call `setApiResponse({ method, params, status, response })`. I recommend writing an api request wrapper like so (uses supertest):

```
const request = require('supertest');
const { setApiResponse } = require('jest-apidoc');
const server = require('./app');

const apiRequest = async (
  method,
  url,
  params = {},
) => {
  const loadedServer = request(server);
  let requestBuilder;

  switch (method) {
    case GET:
      requestBuilder = loadedServer.get(url).query(params);
      break;
    case POST:
      requestBuilder = loadedServer.post(url).send(params);
      break;
    case DELETE:
      requestBuilder = loadedServer.delete(url).send(params);
      break;
    case PUT:
      requestBuilder = loadedServer.put(url).send(params);
      break;
    case PATCH:
      requestBuilder = loadedServer.patch(url).send(params);
      break;
    default:
      throw new Error(`No method for: ${method}`);
  }

  return requestBuilder
    .set('Content-Type', 'application/json')
    .then((res) => {
        setApiResponse({ method, params, status: res.statusCode, response });
        return res;
    });
};
```

Expects tests to be structured like:

```
describe('some-route.routes.js`, () => {
    describe('GET /some-route', () => {
        test('some functionality', async () => {
            ...
        });
    });
});
```

In your [test setup file](https://jestjs.io/docs/en/configuration#setupfilesafterenv-array), add the `writeApiDoc()` in the `afterAll()`

```
const { writeApiDoc } = require('jest-apidoc');

afterAll(() => {
    writeApiDoc();
})
```

Above will write all response set through `setApiResponse()` to the `outFolder` of `jest-apidoc.json`

See /example for test and generate api doc example

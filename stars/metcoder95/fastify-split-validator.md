---
repo: metcoder95/fastify-split-validator
url: 'https://github.com/metcoder95/fastify-split-validator'
homepage: ''
starredAt: '2021-12-22T02:32:19Z'
createdAt: '2021-10-19T22:36:07Z'
updatedAt: '2025-01-09T19:18:40Z'
language: JavaScript
license: MIT
branch: main
stars: 10
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:25.847Z'
description: >-
  fastify-split-validator is a plugin which allows you to setup, granularly,
  different validator per HTTP part of the request. This works at a route level,
  doing a fallback into a default validator using the default server config from
  the instance where the plugin is being installed.
tags:
  - ajv
  - fastify
  - fastify-plugin
  - fastify-split-validator
  - node
  - validator
---

# fastify-split-validator

[![CI](https://github.com/MetCoder95/fastify-split-validator/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/MetCoder95/fastify-split-validator/actions/workflows/ci.yml) [![CodeQL](https://github.com/MetCoder95/fastify-split-validator/actions/workflows/codeql-analysis.yml/badge.svg?branch=main)](https://github.com/MetCoder95/fastify-split-validator/actions/workflows/codeql-analysis.yml) ![npm](https://img.shields.io/npm/v/fastify-split-validator)

---

`fastify-split-validator` is a plugin which allows you to setup, granularly, different validates per HTTP part of the request. This works at a route level, doing a fallback into a default validator using the default server config from the instance where the plugin is being installed.

You can provide your own default validator to act as fallback in case this is not defined within the definition of the route (_by default uses Ajv@8 as default fallback_).

## Setup

Install by running `npm install fastify-split-validator`.

### Options

**Instance**

- `defaultValidator`: default validator to be used as fallback in case nothing is provided at a route level definition

Example:

```js
const fastify = require('fastify');
const splitValidator = require('fastify-split-validator');
const Ajv = require('ajv');

const app = fastify();
const validator = new Ajv({});

await app.register(splitValidator, { defaultValidator: validator });
```

>**Note**:
> It is important to advice that with the new fastify@v4, all the route registration now happens asynchronously.
> This change translates in a way that if any plugin is meant to set logic into the `onRoute` hook for manipulating
> routes after registration, it is necessary to await until the plugin is fully loaded before proceeding with the next parts
> of your route definition. Otherwise, this can lead to non-deterministic behaviours when the plugin will not the expected
> effect on your fastify application.

**On Route**

- `schemaValidators`: an object with the HTTP parts as keys and the validators to be used for that part as values
  - `schemaValidators.body`: validator to be used for the body of the request
  - `schemaValidators.params`: validator to be used for the params of the request
  - `schemaValidators.headers`: validator to be used for the headers of the request
  - `schemaValidators.querystring`: validator to be used for the querystring of the request
  - `schemaValidators.query`: alias for `schemaValidators.querystring`

### TypeScript

```ts
import fastify from 'fastify';
import splitValidator from 'fastify-split-validator';
import Ajv from 'ajv';

const app = fastify();
const validator = new Ajv({});
const bodyValidator = new Ajv({});
const headersValidator = new Ajv({});

await app.register(splitValidator, { defaultValidator: validator });

app.post('/', {
  config: {
    schemaValidators: {
      body: bodyValidator,
      headers: headersValidator,
    },
  },
}, (req, reply) => {
  // ...
});
```

### JavaScript
```js
const fastify = require('fastify');
const splitValidator = require('fastify-split-validator');
const Ajv = require('ajv');

const app = fastify();
const validator = new Ajv({});
const bodyValidator = new Ajv({});
const headersValidator = new Ajv({});

await app.register(splitValidator, { defaultValidator: validator });

app.post('/', {
  config: {
    schemaValidators: {
      body: bodyValidator,
      headers: headersValidator,
    },
  },
}, (req, reply) => {
  // ...
});
```

See [test](test/index.test.js) for more examples.

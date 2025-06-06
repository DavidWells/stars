---
repo: evanshortiss/env-var
url: 'https://github.com/evanshortiss/env-var'
homepage: ''
starredAt: '2023-03-13T20:30:49Z'
createdAt: '2016-03-10T21:29:58Z'
updatedAt: '2025-02-12T12:46:30Z'
language: JavaScript
license: MIT
branch: master
stars: 594
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:55.004Z'
description: >-
  Verification, sanitization, and type coercion for environment variables in
  Node.js
tags:
  - dotenv
  - env
  - environment
  - environment-variables
  - environment-vars
  - javascript
  - nodejs
  - parsing-variables
  - sanitization
  - typescript
  - typescript-support
  - variables
  - verifies
---

# env-var

<div align="center">

[![NPM version](https://img.shields.io/npm/v/env-var.svg?style=flat)](https://www.npmjs.com/package/env-var)
[![TypeScript](https://badgen.net/npm/types/env-var)](http://www.typescriptlang.org/)
[![License](https://badgen.net/npm/license/env-var)](https://opensource.org/licenses/MIT)
[![Coverage Status](https://coveralls.io/repos/github/evanshortiss/env-var/badge.svg?branch=master)](https://coveralls.io/github/evanshortiss/env-var?branch=master)
[![npm downloads](https://img.shields.io/npm/dm/env-var.svg?style=flat)](https://www.npmjs.com/package/env-var)
[![Known Vulnerabilities](https://snyk.io//test/github/evanshortiss/env-var/badge.svg?targetFile=package.json)](https://snyk.io//test/github/evanshortiss/env-var?targetFile=package.json)


Verification, sanitization, and type coercion for environment variables in Node.js and web applications. Supports TypeScript!
<br>
<br>
</div>

* 🏋 Lightweight. Zero dependencies and just ~4.7kB when minified!
* 🧹 Clean and simple code, as [shown here](https://gist.github.com/evanshortiss/0cb049bf676b6138d13384671dad750d).
* 🚫 [Fails fast](https://en.wikipedia.org/wiki/Fail-fast) if your environment is misconfigured.
* 👩‍💻 Friendly error messages and example values for better debugging experience.
* 🎉 TypeScript support provides compile time safety and better developer experience.
* 📦 Support for frontend projects, e.g in React, React Native, Angular, etc.

## Contents

- [API](API.md): The full API set for `env-var`
- [Changelog](CHANGELOG.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Contributing](CONTRIBUTING.md)
- [Examples](EXAMPLE.md): Example usage of `env-var`

## Install

### npm

```shell
npm install env-var
```

### yarn

```shell
yarn add env-var
```

## Getting started

You can use `env-var` in both JavaScript and TypeScript!

### Node.js Javascript example

```js
const env = require('env-var');

// Or using module import syntax:
// import env from 'env-var'

const PASSWORD = env.get('DB_PASSWORD')
  // Throws an error if the DB_PASSWORD variable is not set (optional)
  .required()
  // Decode DB_PASSWORD from base64 to a utf8 string (optional)
  .convertFromBase64()
  // Call asString (or other APIs) to get the variable value (required)
  .asString();

// Read in a port (checks that PORT is in the range 0 to 65535)
// Alternatively, use a default value of 5432 if PORT is not defined
const PORT = env.get('PORT').default('5432').asPortNumber()
```

### Node.js TypeScript example

```ts
import * as env from 'env-var';

// Read a PORT environment variable and ensure it's a positive integer.
// An EnvVarError will be thrown if the variable is not set, or if it
// is not a positive integer.
const PORT: number = env.get('PORT').required().asIntPositive();
```

### WebApp Example

When using environment variables in a web application, usually your tooling
such as `vite` imposes special conventions and doesn't expose `process.env`.
Use `from` function to workaround this, and create an `env` object like so:

```ts
import { from } from 'env-var'

const env = from({
  BASE_URL: import.meta.env.BASE_URL,
  VITE_CUSTOM_VARIABLE: import.meta.env.CUSTOM_VARIABLE
})
```

For more examples, refer to the `/example` directory and [EXAMPLE.md](EXAMPLE.md). A summary of the examples available in `/example` is written in the ['Other examples' section of EXAMPLE.md](EXAMPLE.md#other-examples).

## API

The examples above only cover a very small set of `env-var` API calls. There are many others such as `asFloatPositive()`, `asJson()` and `asRegExp()`. For a full list of `env-var` API calls, check out [API.md](API.md).

You can also create your own custom accessor; refer to the ['extraAccessors' section of API.md](API.md#extraAccessors).

## Logging

Logging is disabled by default in `env-var` to prevent accidental logging of secrets.

To enable logging, you need to create an `env-var` instance using the `from()` function that the API provides and pass in a logger.

- A built-in logger is available, but a custom logger is also supported.
- Always exercise caution when logging environment variables!

### Using the Built-in Logger

The built-in logger will print logs only when `NODE_ENV` is **not** set to either `prod` or `production`.

```js
const { from, logger } =  require('env-var')
const env = from(process.env, {}, logger)

const API_KEY = env.get('API_KEY').required().asString()
```

This is an example output from the built-in logger generated by running [example/logging.js](example/logging.js):

![logging example output](screenshots/logging.png)

### Using a Custom Logger

If you need to filter `env-var` logs based on log levels (e.g. trace logging only) or have your own preferred logger, you can use a custom logging solution such as `pino` easily.

See the ['Custom logging' section of EXAMPLE.md](EXAMPLE.md#custom-logging) for more information.

## Optional integration with dotenv

You can optionally use [dotenv](https://www.npmjs.com/package/dotenv) with [env-var](https://www.npmjs.com/package/env-var).

There is no coupling between `dotenv` and `env-var`, but you can easily use them both together. This loose coupling reduces package bloat and allows you to start or stop using one without being forced to do the same for the other.

See the ['dotenv' section of EXAMPLE.md](EXAMPLE.md#dotenv) for more information.

## Contributing

Contributions are welcomed and discussed in [CONTRIBUTING.md](CONTRIBUTING.md). If you would like to discuss an idea, open an issue or a PR with an initial implementation.

## Contributors

* @aautio
* @avocadomaster
* @caccialdo
* @ChibiBlasphem
* @DigiPie
* @dror-weiss
* @evanshortiss
* @gabrieloczkowski
* @hhravn
* @ineentho
* @itavy
* @jerome-fox
* @joh-klein
* @Lioness100
* @MikeyBurkman
* @pepakriz
* @rmblstrp
* @shawnmclean
* @todofixthis
* @xuo

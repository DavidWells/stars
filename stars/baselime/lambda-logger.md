---
repo: baselime/lambda-logger
url: 'https://github.com/baselime/lambda-logger'
homepage: null
starredAt: '2023-04-30T06:11:11Z'
createdAt: '2023-04-11T10:42:10Z'
updatedAt: '2024-07-19T23:14:04Z'
language: JavaScript
license: MIT
branch: main
stars: 11
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:51.514Z'
description: An opinionated logger for AWS Lambda
tags:
  - debugging
  - lambda
  - logger
  - logging
  - logging-library
---

## AWS Lambda Logging Library for Node.js

[![Documentation][docs_badge]][docs] [![License][license_badge]][license]

The library offers a straightforward logging solution for Node.js-based AWS
Lambda functions, requiring no external dependencies.

```javascript
const { logger } = require("@baselime/lambda-logger");

logger.info("This is an informational message", {
  operation: "copy-paste-replace",
  count: 9000,
});
```

The library provides an object that includes four logging functions - `info`,
`warn`, `debug`, and `error` - enabling you to log messages with varying levels
of severity. By setting the `LOG_LEVEL` environment variable, you can control
the visibility of the logs. The library is incredibly easy to use, with no
external dependencies. It enhances `console.log` with useful defaults.

### Installation

```bash
npm install @baselime/lambda-logger
```

### Usage

```javascript
const { logger } = require("@baselime/lambda-logger");

logger.info("This is an informational message", { payload: { foo: "bar" } });
logger.warn("This is a warning message", { payload: { foo: "bar" } });
logger.debug("This is a debug message", { payload: { foo: "bar" } });
logger.error("This is an error message", { payload: { foo: "bar" } });
```

By default, the library only prints logs with a severity level of info or
higher. However, you can control the logging level by setting the LOG_LEVEL
environment variable to one of the following values:

- `DEBUG`: All log messages will be printed.
- `INFO` (default): Only messages with a severity level of `info`, `warn`, or
  `error` will be printed.
- `WARN`: Only messages with a severity level of `warn` or `error` will be
  printed.
- `ERROR`: Only messages with a severity level of `error` will be printed.

Additionally, you can use the `wrap` method to instrument your AWS Lambda
function and gain visibility of its trigger event and response, which can be
helpful when debugging.

### Example

```javascript
const { wrap, logger } = require("@baselime/lambda-logger");

exports.handler = wrap(async (event, context) => {
  logger.info("Lambda function started");
  try {
    const result = await someAsyncFunction();
    logger.debug("Result", result);
    return result;
  } catch (error) {
    logger.error("Error", error);
    throw error;
  }
});
```

### Middy

We also support [Middy](https://middy.js.org) The lambda middleware framework.

```javascript
import { Baselime, logger } from "@baselime/lambda-logger";
import middy from "@middy/core";

exports.handler = middy()
  .use(Baselime())
  .handler(function (e, context) {
    const requests = e.Records.map((el) =>
      Buffer.from(el.kinesis.data, "base64").toString("utf-8")
    );
    logger.info("The events to stream", requests);
  });
```

### Contributing

If you would like to contribute to the development of this library, please
submit a pull request on GitHub.

### License

This library is licensed under the MIT License. See the [LICENSE](LICENSE) file
for details.

<!-- Badges -->

[docs]: https://baselime.io/docs/
[docs_badge]: https://img.shields.io/badge/docs-reference-blue.svg?style=flat-square
[license]: https://opensource.org/licenses/MIT
[license_badge]: https://img.shields.io/github/license/baselime/lambda-logger.svg?color=blue&style=flat-square&ghcache=unused

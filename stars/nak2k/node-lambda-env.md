---
repo: nak2k/node-lambda-env
url: 'https://github.com/nak2k/node-lambda-env'
homepage: ''
starredAt: '2024-12-27T20:05:37Z'
createdAt: '2017-07-24T15:03:07Z'
updatedAt: '2024-12-27T20:05:37Z'
language: JavaScript
license: NA
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:53:35.861Z'
description: Configure environment variables for AWS Lambda
tags: []
---

# lambda-env

Configure environment variables for AWS Lambda.

## Installation

```
npm i lambda-env -S
```

## Usage

``` javascript
const { setEnv, unsetEnv } = require('lambda-env');

setEnv({
  functionName: 'Sandbox',
  env: {
    TEST: 'test',
  },
}, (err, env) => {
});

unsetEnv({
  functionName: 'Sandbox',
  env: ['TEST'],
}, (err, env) => {
});
```

## API

### setEnv(options, callback)

- `options.functionName`
    - A name of a lambda function.
- `options.env`
    - An object that specify environment variables of a lambda function.
    - If environment variables of a lambda function are configured, this object is merged into an existing configuration.
- `callback(err, env)`
    - A callback which is called when environment variables setting is succeed, or an error occurs.

### unsetEnv(options, callback)

- `options.functionName`
    - A name of a lambda function.
- `options.env`
    - An array that has names of environment variables to be removed.
- `callback(err, env)`
    - A callback which is called when environment variables setting is succeed, or an error occurs.

## License

MIT

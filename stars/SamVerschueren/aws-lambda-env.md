---
repo: SamVerschueren/aws-lambda-env
url: 'https://github.com/SamVerschueren/aws-lambda-env'
homepage: null
starredAt: '2016-08-22T23:22:33Z'
createdAt: '2015-09-01T13:56:29Z'
updatedAt: '2022-06-30T15:52:31Z'
language: JavaScript
license: MIT
branch: master
stars: 7
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:20.041Z'
description: Detect the environment the lambda function is running in.
tags: []
---

# aws-lambda-env [![Build Status](https://travis-ci.org/SamVerschueren/aws-lambda-env.svg?branch=master)](https://travis-ci.org/SamVerschueren/aws-lambda-env)

> Extracts the environment of the lambda function.


## Installation

```
$ npm install --save aws-lambda-env
```


## Usage

```js
var lambdaEnv = require('aws-lambda-env');

exports.handler = function(event, context) {
	var env = lambdaEnv(context);
	//=> production
};
```


## API

### lambdaEnv(context, [options])

Returns the alias or version of the lambda invocation. Returns `undefined` if `$LATEST` is executed.

#### context

Type: `object`

Context of the lambda function.

#### options

Type: `object`  
Default: `{$LATEST: 'development', default: 'production'}`

Maps the function version to a specific stage. If the version is not present in the map, it will pick the `default` value.


## License

MIT © [Sam Verschueren](https://github.com/SamVerschueren)

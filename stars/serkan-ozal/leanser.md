---
repo: serkan-ozal/leanser
url: 'https://github.com/serkan-ozal/leanser'
homepage: null
starredAt: '2022-09-30T17:34:39Z'
createdAt: '2022-09-30T12:59:48Z'
updatedAt: '2024-07-26T00:29:49Z'
language: JavaScript
license: MIT
branch: master
stars: 20
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:27.570Z'
description: >-
  AWS Lambda Cleaner - Cleanup resources on AWS Lambda container shutdown
  (timeout and/or spin-down)
tags: []
---

# leanser

![build Status](https://github.com/serkan-ozal/leanser/actions/workflows/build.yml/badge.svg)
![npm version](https://badge.fury.io/js/leanser.svg)
![license](https://img.shields.io/badge/license-MIT-blue)

AWS Lambda Cleaner - Cleanup resources on AWS Lambda container shutdown (timeout and/or spin-down).

> :warning: You have `500 milliseconds` to complete all of your callbacks before function shutdown.

## Installation

You can add `leanser` package into your AWS Lambda function either by NPM package or by AWS Lambda layer as shown below:

### By NPM package

To install the middleware, you can use NPM:

```
npm install --save leanser
```

### By AWS Lambda Layer

You can also add `leanser` as layer into your AWS Lambda function.

```
arn:aws:lambda:${region}:273094347961:layer:leanser:${layer-version}

```

**Latest layer version:** ![leanser](https://api.globadge.com/v1/badgen/aws/lambda/layer/latest-version/us-east-1/273094347961/leanser) (badge powered by [Globadge serverless](https://www.globadge.com/badges/serverless))

**Note:** In the ARN above, you need to replace `${region}` with the actual AWS region you deployed your AWS Lambda function. 

## Usage

```javascript
const { register } = require('leanser');

async function myCleaner() {
    // Run your custom cleanup logic (close connections, etc ...)  
};

async function myAnotherCleaner() {
    // Run your another custom cleanup logic (close connections, etc ...)  
};

register(myCleaner, myAnotherCleaner);

exports.handler = async function(event, context) {
    // Do something meaningful

    return {
        statusCode: 200,
    }
};
```

## Configuration

* **Optionally**, you can disable/enable cleaner.

    - **By environment variable:**
      Set `LEANSER_ENABLE` environment variable to `false` to disable cleaner or to `true` (which is default) to enable cleaner back.
  ```
  LEANSER_ENABLE=false
  ```  

## Contributing

Everyone is very welcome to contribute to this repository.
Feel free to [raise issues](https://github.com/serkan-ozal/leanser/issues)
or to [submit Pull Requests](https://github.com/serkan-ozal/leanser/pulls).

## License

Licensed under [MIT License](LICENSE).

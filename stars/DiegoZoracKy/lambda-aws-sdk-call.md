---
repo: DiegoZoracKy/lambda-aws-sdk-call
url: 'https://github.com/DiegoZoracKy/lambda-aws-sdk-call'
homepage: null
starredAt: '2018-10-08T03:10:04Z'
createdAt: '2018-09-21T02:24:09Z'
updatedAt: '2023-09-08T17:45:17Z'
language: JavaScript
license: NA
branch: master
stars: 8
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:12.917Z'
description: 'A common Lambda to call any AWS service via AWS SDK '
tags: []
---

# lambda-aws-sdk-call

A common Lambda to call any AWS service via AWS SDK. It is based on the AWSJavaScriptSDK. Check the [documentation](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/top-level-namespace.html) to get Config, Services, Methods and Parameters names. Initial motivations can be read at [“One Lambda to call any AWS service via AWS SDK”](https://medium.com/@DiegoZoracKy/one-lambda-to-call-any-aws-service-via-aws-sdk-ad572f0477f5) 

## Installation

Create a new Lambda function, set its Runtime to Node.js 8.10+ and paste on it the content of the file:

https://github.com/DiegoZoracKy/lambda-aws-sdk-call/blob/master/lambda-call-aws-sdk.js

## Example

Example of an input to call [lambda's listFunctions](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Lambda.html#listFunctions-property) method defining the param *MaxItems* equals to 1:

**Input**
```javascript
{
  "AWSConfig": {
    "region": "us-east-1"
  },
  "service": "Lambda",
  "method": "listFunctions",
  "params": {
      "MaxItems": 1
  }
}
```


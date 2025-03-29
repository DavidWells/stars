---
repo: ServerlessLife/lambda-logger-extension
url: 'https://github.com/ServerlessLife/lambda-logger-extension'
homepage: null
starredAt: '2025-03-27T20:32:11Z'
createdAt: '2024-10-07T05:45:12Z'
updatedAt: '2025-03-27T20:32:11Z'
language: JavaScript
license: NA
branch: main
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-03-29T22:30:02.160Z'
description: Lambda Extension that adds logs to already deployed Lambda
tags: []
---

# Lambda Extension that adds logs to already deployed Lambda

A reusable extension for Node.js Lambda that logs requests and responses without code changes or redeployment.

Lambda Extension is detailed described in the article [Add Logging to AWS Lambda Without Redeploying Using a Simple Extension](https://www.serverlesslife.com/Add_Logging_to_AWS_Lambda_Without_Redeploying_Using_a_Simple_Extension.html)

## How to use

**Add Layer to Lambda**

Open your Lambda in your AWS console, switch to the "Code" tab and scroll down to "Layers".

Click "Add a layer".

Select "Specify an ARN", enter the Layer ARN and click Add.

**Add environment variable**

Go to "Configuration" tab and select "Environment variables"

Click Edit and add environment variable.

```bash
AWS_LAMBDA_EXEC_WRAPPER = /opt/logger
```

**Use the extension at your own risk.**

## List of Lambda Layers ARN

- ap-south-1: `arn:aws:lambda:ap-south-1:076585967075:layer:lambda-logger-extension:1`
- eu-north-1: `arn:aws:lambda:eu-north-1:076585967075:layer:lambda-logger-extension:1`
- eu-west-3: `arn:aws:lambda:eu-west-3:076585967075:layer:lambda-logger-extension:1`
- eu-west-2: `arn:aws:lambda:eu-west-2:076585967075:layer:lambda-logger-extension:1`
- eu-west-1: `arn:aws:lambda:eu-west-1:076585967075:layer:lambda-logger-extension:22`
- ap-northeast-3: `arn:aws:lambda:ap-northeast-3:076585967075:layer:lambda-logger-extension:1`
- ap-northeast-2: `arn:aws:lambda:ap-northeast-2:076585967075:layer:lambda-logger-extension:1`
- ap-northeast-1: `arn:aws:lambda:ap-northeast-1:076585967075:layer:lambda-logger-extension:1`
- ca-central-1: `arn:aws:lambda:ca-central-1:076585967075:layer:lambda-logger-extension:1`
- sa-east-1: `arn:aws:lambda:sa-east-1:076585967075:layer:lambda-logger-extension:1`
- ap-southeast-1: `arn:aws:lambda:ap-southeast-1:076585967075:layer:lambda-logger-extension:1`
- ap-southeast-2: `arn:aws:lambda:ap-southeast-2:076585967075:layer:lambda-logger-extension:1`
- eu-central-1: `arn:aws:lambda:eu-central-1:076585967075:layer:lambda-logger-extension:2`
- us-east-1: `arn:aws:lambda:us-east-1:076585967075:layer:lambda-logger-extension:1`
- us-east-2: `arn:aws:lambda:us-east-2:076585967075:layer:lambda-logger-extension:1`
- us-west-1: `arn:aws:lambda:us-west-1:076585967075:layer:lambda-logger-extension:1`
- us-west-2: `arn:aws:lambda:us-west-2:076585967075:layer:lambda-logger-extension:1`

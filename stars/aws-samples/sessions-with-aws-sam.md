---
repo: aws-samples/sessions-with-aws-sam
url: 'https://github.com/aws-samples/sessions-with-aws-sam'
homepage: 'https://slip.link/sws-vids'
starredAt: '2025-01-30T06:39:07Z'
createdAt: '2020-07-17T14:34:54Z'
updatedAt: '2025-02-15T11:51:01Z'
language: JavaScript
license: MIT-0
branch: master
stars: 387
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:09.330Z'
description: >-
  This repo contains all the SAM templates created in the Twitch series
  #SessionsWithSAM. The show is every Thursday on Twitch at 10 AM PDT.
tags:
  - aws
  - sam
  - serverless
---

<!-- Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
//
Permission is hereby granted, free of charge, to any person obtaining a copy of this
software and associated documentation files (the "Software"), to deal in the Software
without restriction, including without limitation the rights to use, copy, modify,
merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so.
//
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. -->

# Sessions With SAM

This repo contains all the SAM templates created in the Twitch series #SessionsWithSAM. The show is every Thursday on [Twitch](https://twitch.tv/aws) at 10 AM PDT.

# Episodes


### Simple HTTP API with JWT Authorizer
In this episode I build a SAM template for HTTP API with a non-authenticated route and an authenticated route.

[Code](./http-api/README.md) | [Video](https://youtu.be/klOScYEojzY)

### Cognito and HTTP API
In this episode I talk through building an Amazon Cognito identity provider for HTTP API and JWT authorization. I also talk through using Cognito user groups as custom scopes for route access.

[Code](./cognito/README.md) | [Video](https://youtu.be/nBtWCjKd72M)

### EventBridge

In this session we build a custom EventBridge bus and an HTTP API endpoint to push data into it. We also add multiple rules to trigger Lambda functions for asynchronous processing.

[Code](./eventbridge/README.md) | [Video](https://youtu.be/73R02KufLac)

### Building a Kinesis Firehose application for ingesting website access logs

In this session we build an Amazon Kinesis Firehose SAM template for ingesting website access logs from Amazon API Gateway. The data is stored in a raw bucket, processed by a Lambda function, and then stored in a processed bucket as well. During the processing period, the data is also pushed to an Amazon DynamoDB table for real-time analytics.

[Code](./kinesis-firehose/README.md) | [Video](https://youtu.be/jdTBtaxs0hA)

### Analyzing API Gateway access logs using Kinesis

Continuing from session 4, this session adds a Kinesis Data Analytics application to create real-time analytics from API Gateway access logs. The entire application is built using SAM templates and the SAM CLI.

[Code](./kinesis-firehose/README.md) | [Video](https://youtu.be/ce0v-q9EVTQ)

### SAM templates for SQS, cross-account queue policies & Lambda event sources

In this session with SAM we build an AWS SAM template for creating an Amazon SQS queue. We also connect the queue as an event source for a Lambda function. Finally we create a queue policy to allow cross account posting to the queue and show how to test it in Postman.

[Code](./SQS/README.md) | [Video](https://youtu.be/q2rbHMyJBDY)

### Creating safe linear and canary deploys for Lambda functions

In this session I show how to use SAM to create safe deployments for Lambda functions in serverless applications. I demonstrate linear and canary deployments and how to configure pre and post traffic tests.

[Code](./safe-deploy/README.md) | [Video](https://youtu.be/RE4r_6edaXc)

### SAM templates for HTTP API and REST API custom domains

In this session I create a SAM template that builds a custom domain for API Gateway HTTP APIs and REST APIs. The template generates the hosted zone and ssl cert as well. I also show how to attach the same custom domain to both HTTP API and REST API at the same time.

[Code](./custom-domains/README.md) | [Video](https://youtu.be/4uXEGNKU5NI)

### Managing AWS Step Functions as IaC with SAM

In this episode I am joined by AWS Serverless DA Rob Sutter. Together we talk through the new Step Functions state machine support in AWS SAM.

[Code](./step-functions/README.md) | [Video](https://youtu.be/BguUgdZwymQ)

### Creating a Lambda function with an Amazon EFS mounted using SAM

In this episode James Beswick and I talk through configuring Amazon EFS for Lambda functions. This includes configuring EFS in a VOC as well. All by using SAM and SAM CLI.

[Code](https://github.com/aws-samples/aws-lambda-efs-samples) | [Video](https://youtu.be/up1op216trk)

### Using SAM and Stackery to build .Net Lambda functions

In this episode, I am joined by Chase Douglas, Stackery CTO. We talk through using SAM with Stackery to manage .NET Serverless applications.

[Code](./dotnet-api/README.md) | [Video](https://youtu.be/PGA8hbydHUA)

### Using SAM to create and use secrets

In this session we cover using AWS Systems Manager Parameter Store and the AWS Secrets Manager within AWS SAM templates. Using these services helps developers store account specific secrets that are easily utilized by SAM on application creation and updates.

[Code](./secrets/README.md) | [Video](https://youtu.be/aBPWq8SD8WA)

### Adding governance to serverless applications with AWS Config and AWS SAM

This session is the first of four on adding governance to serverless application. In this session I demonstrate configuring an account to record and store governance data in AWS Config with AWS SAM.

[Code](./governance/README.md) | [Video]()

### Using the new HTTP APIs direct integrations in AWS SAM
In this session I will walk through creating a direct service integration on HTTP API. We will cover building it in the console and exporting for use with AWS SAM.

[Code](./http-api-direct-integration/README.md) | [Video](https://youtu.be/qa3lkaz7pnI)

### Adding governance to serverless applications with AWS Config and AWS SAM Part 2

This session is the second of four on adding governance to serverless application. In this session I demonstrate configuring AWS managed rules used in AWS Config.

[Code](./governance/README.md) | [Video](https://youtu.be/BCZvShTgLGY)

### Adding governance to serverless applications with AWS Config and AWS SAM Part 3

This session is the third of four on adding governance to serverless application. In this session I demonstrate building custom rules for AWS Config.

[Code](./governance/README.md) | [Video](https://youtu.be/6Xs6g8FO5qY)

### Adding governance to serverless applications with AWS Config and AWS SAM Part 4

This session is the final of four on adding governance to serverless application. In this session I demonstrate making the initial setup template reusable across regions and accounts. I also add aggregates to collect data from multiple accounts on a single dashboard..

[Code](./governance/README.md) | [Video](https://youtu.be/5wj8GG8JGCQ)

### Using SAM CLI custom build

This session covers using the AWSSAM CLI custom build to use Makefiles in the build process. THis example demonstrates using webpack in node apps.
[Code](./node-webpack-custom-build/README.md) | [Video](https://youtu.be/wpccutnSbAk)

### Lambda Layers
This session talks through using Lambda layers externally and internal to the application. It also covers local development with Layers.
[Code](./lambda-layers/README.md) | [Video](https://youtu.be/o72i8_FH320)


# Additional Templates

These templates do not have an accompanying episode or it has not aired yet.

### HTTP API Access logging
This template shows how to setup access logging on an HTTP API gateay.
[Code](./http-api-logging/README.md)

### Building custom runtime - Swift example
This projects builds two Lambda functions built with Swift. Squared is a simple Lambda that returns the squared value of a number. SwiftApi is a simple Lambda function that triggers from an HTTP API.
[Code](./swift-custom-runtime/README.md)

### Running Go as a custom runtime on Amazon Linux 2
This project demonstrates running Go on al2 with the new **provided.al2** custom runtime.
[Code](./go-al2/README.md)

### HTTP APIs service integration blog example
This template builds an HTTP APIs service integration to SQS with a Lambda function for testing.
[Code](./http-api-integrations-blog-example/README.md) | [Blog](https://aws.amazon.com/blogs/compute/building-storage-first-applications-with-http-apis-service-integrations/)

### API Gateway enhanced observability variables
This example demonstrates using the new API Gateway enhanced observability variables to get the full story of an API Gateway request and response.
[Code](./api-enhanced-observability-variables/README.md)

### EventBridge DLQ and retry policy config
This template creates an HTTP API with a direct integration to the EventBridge default bus. It also creates an EventBridge rule with a Lambda function as a trigger. The template also configures a DLQ and a retry policy for the EventBridge rule.
[Code](./eventbridge-dlq-retry/README.md)

### Using AWS AppConfig with AWS Lambda Extensions - Gunnar Grosch
This is an example of how [AWS AppConfig](https://docs.aws.amazon.com/appconfig/latest/userguide/what-is-appconfig.html) can be used with [AWS Lambda](https://aws.amazon.com/lambda/) and [Lambda Extensions](https://aws.amazon.com/blogs/compute/introducing-aws-lambda-extensions-in-preview/). Using AppConfig to separate your application configuration from your application code is good practice. By using that, you are able to deploy configuration changes independently from your code. AWS AppConfig helps us achieve that.This example will deploy a sample serverless applications with AWS AppConfig and the AppConfig Lambda layer needed for AWS Lambda Extensions using AWS SAM.
[Code](./appconfig-lambda-extensions/README.md)
- - - - - - - - - - - - - - - - - - - - - - - -

*See the full YouTube playlist [https://slip.link/sws-vids](https://slip.link/sws-vids)*

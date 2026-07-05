---
repo: neovasili/serverless-cloudfront-api-route
url: 'https://github.com/neovasili/serverless-cloudfront-api-route'
homepage: ''
starredAt: '2021-10-26T16:53:49Z'
createdAt: '2021-10-22T10:27:13Z'
updatedAt: '2023-06-21T07:45:20Z'
language: JavaScript
license: MIT
branch: main
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:41.601Z'
description: >-
  Serverless framework plugin to create specific service API routes in an
  existing CloudFront distribution
tags:
  - api-gateway
  - aws
  - cloudfront
  - serverless
  - serverless-framework
---

# Serverless CloudFront API Route

[![Test and linters](https://github.com/neovasili/serverless-cloudfront-api-route/actions/workflows/test-lint.yml/badge.svg)](https://github.com/neovasili/serverless-cloudfront-api-route/actions/workflows/test-lint.yml) [![npm version](https://badge.fury.io/js/serverless-cloudfront-api-route.svg)](https://badge.fury.io/js/serverless-cloudfront-api-route)

This repository contains a serverless framework plugin to create specific service API routes in an existing CloudFront distribution. That way you can easily have multiple services created with serverless framework using the same domain on top of the CloudFront distribution and letting CloudFront route each API to the proper service.

## Motivation

There is already a great serverless plugin ([serverless-domain-manager](https://github.com/amplify-education/serverless-domain-manager)) with the same purpose, but it's using API Gateway Custom Domains feature, which couldn't be enough for your use cases; e.g. you want multi-level base paths.

This plugin gives you the flexibility of configuring your own CloudFront distribution and after, the plugin will create the proper routes for each service you deploy using it.

## Description

There are some **important assumptions** to consider before using this plugin:

- CloudFront distribution should exists before using it.
- Plugin updates CloudFront distribution using AWS API, not CloudFormation, so, if your CloudFront distribution is defined with code (which should be) and you are specifying non default origins and behaviours on it, **you can be overriding** the ones created by the plugin. CloudFormation can detect a drift after plugin actions, but if you are not specifying non default origins or behaviours in your CloudFormation template, if you apply it again you will not override the routes created by the plugin.
- When you hace multiple routes, they will be ordered prioritizing the ones with more levels first.
- Routes creation, update or delete can take several minutes depending on the price class of your distribution.

The plugin does not introduce any new command, it's executed when you run `serverless deploy` and/or `serverless remove` commands.

### Serverless deploy

Let's assume that you are starting to use it, so, in order to properly route your service in the CloudFront distribution, the plugin will do the following:

- Create a new distribution origin with the service name as origin ID and using your service stage as origin path.
- Create a new distribution behaviour pointing to the previously created origin using the base path specified in the parameters.

Once those changes are fully deployed, you should be able to do something like this:

```shell
curl -i -X GET https://xxxxxx.execute-api.eu-west-1.amazonaws.com/dev/api/v1/hello

HTTP/2 200
content-type: application/json
content-length: 2498
date: Fri, 22 Oct 2021 08:29:21 GMT
x-amzn-requestid: xxxxxxxx
x-amz-apigw-id: xxxxxxx
x-amzn-trace-id: Root=xxxxxxx;Sampled=0
x-cache: Miss from cloudfront
via: 1.1 xxxxxx.cloudfront.net (CloudFront)
x-amz-cf-pop: MAD50-C1
x-amz-cf-id: xxxx

{"message": "Hello world!"}
```

And also:

```shell
curl -i -X GET https://xxxxx.cloudfront.net/api/v1/hello

HTTP/2 200
content-type: application/json
content-length: 2642
date: Fri, 22 Oct 2021 08:33:39 GMT
x-amzn-requestid: xxxxxxx
x-amz-apigw-id: xxxxxxx
x-amzn-trace-id: Root=1-xxxxxxx;Sampled=0
via: 1.1 xxxxxx.cloudfront.net (CloudFront), 1.1 xxxxxx.cloudfront.net (CloudFront)
x-amz-cf-pop: LHR62-C4
vary: Accept-Encoding
x-cache: Miss from cloudfront
x-amz-cf-pop: MAD50-C1
x-amz-cf-id: xxxx

{"message": "Hello world!"}
```

If you change any value from the plugin parameters configuration, it will update or create a new route if necessary whenever you run again `serverless deploy`.

### Serverless remove

The plugin also automatically deletes current API route configuration from the CloudFront distribution when you run `serverless remove` command.

## Use guide

Since the plugin is a npm pacakge, you can easily install it:

```shell
npm install serverless-cloudfront-api-route --save
```

And don't forget to add it into your serverless configuration plugins block:

```yaml
...

plugins:
  - serverless-cloudfront-api-route

functions:
  hello:
    handler: handler.hello
...
```

### Parameters

All parameters will be passed as nested values of `cloudFrontAPIRoute` inside the custom block of your serverless configuration. There are only two mandatory parameters you need to specify to use the plugin:

|Name|Description|
|:--:|:--:|
|`cloudFrontDistributionID`|Which should contain your CloudFront distrbution ID where you are going to create the routes.|
|`basePath`|Which is going to be used by the plugin to create the route (e.g. `/api/v1` -> `/api/v1/*`).|

So, considering this, the minimal working serverless configuration could be something like this:

```yaml
service: serverless-plugin

frameworkVersion: '2'

provider:
  name: aws
  runtime: python3.8
  stage: dev
  region: eu-west-1

custom:
  apiVersion: v1
  cloudFrontAPIRoute:
    cloudFrontDistributionID: XXXXXXXXX
    basePath: /api/${self:custom.apiVersion}

package:
  individually: true
  patterns:
    - "!**/*"
    - "handler.py"

plugins:
  - serverless-cloudfront-api-route

functions:
  hello:
    handler: handler.hello
    events:
      - http:
          path: ${self:custom.cloudFrontAPIRoute.basePath}/hello
          method: get
```

Then we also have the following optional parameters:

|Name|default|Description|
|:--:|:--:|:--:|
|`originConnectionAttempts`|3|This will setup the number of origin connection attempts.|
|`originConnectionTimeout`|10|This will setup the origin connection timeout in seconds.|
|`originKeepaliveTimeout`|5|This will setup the origin keep alive timeout in seconds.|
|`originReadTimeout`|30|This will setup the origin read timeout in seconds.|
|`minTTL`|0|This will setup the caching minimum TTL in seconds.|
|`maxTTL`|31536000|This will setup the caching maximum TTL in seconds.|
|`defaultTTL`|1|This will setup the caching default TTL in seconds.|

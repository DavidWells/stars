---
repo: purple-technology/serverless-monitoring-plugin
url: 'https://github.com/purple-technology/serverless-monitoring-plugin'
homepage: null
starredAt: '2024-09-30T21:27:43Z'
createdAt: '2021-04-28T10:17:23Z'
updatedAt: '2024-09-30T21:27:44Z'
language: JavaScript
license: MIT
branch: master
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:19.665Z'
description: >-
  Plugin for Serverless Framework which generates dashboards for different
  resources
tags: []
---

# serverless-monitoring-plugin
[![CI Status Badge](https://circleci.com/gh/purple-technology/serverless-monitoring-plugin.svg?style=svg)](https://github.com/purple-technology/serverless-monitoring-plugin)


This generates a CloudWatch dashboard for AWS resources. 

## Install

```sh
$ npm install --save-dev @purple/serverless-monitoring-plugin
```

Add the plugin to your `serverless.yml` file
```yml
plugins:
  - '@purple/serverless-monitoring-plugin'
```

## Supported resources


- `AWS::DynamoDB::Table`
- `AWS::ApiGateway::RestApi`
- `AWS::AppSync::GraphQLApi`
- `AWS::Cognito::UserPoolClient`
- `AWS::StepFunctions::StateMachine`
- `AWS::SQS::Queue`
- `AWS::SNS::Topic`
- `AWS::S3::Bucket`
- `AWS::Lambda::Function`
- `AWS::Logs::MetricFilter`

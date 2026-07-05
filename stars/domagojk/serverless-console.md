---
repo: domagojk/serverless-console
url: 'https://github.com/domagojk/serverless-console'
homepage: null
starredAt: '2025-02-05T06:16:48Z'
createdAt: '2019-10-04T14:36:36Z'
updatedAt: '2025-02-05T06:16:48Z'
language: TypeScript
license: NA
branch: master
stars: 35
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:08.340Z'
description: null
tags: []
---

# Serverless Console

Serverless Console is an alternative UI for AWS Cloudwatch. Its focus is on "serverless functions" but it can also be used for any kind of log group.

## Cloudwatch Logs

![App Preview](./gifs/lambda-logs.gif)

- Log groups are grouped per project and correspond to a single Serverless service
- Stages are shown per function on its own tab
- Times are shown relative to current timestamp (like "2 minutes ago")
- Logs can be grouped per request
- Log stream can be searched

## Log Search (Cloudwatch Insights)

![App Preview](./gifs/search-logs.gif)

- [Cloudwatch Insights query](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_QuerySyntax.html) for simple search is used by default (but it can be modified)
- Preserves search history (while the tab is opened)

## DynamoDB Console

![App Preview](./gifs/dynamodb.gif)

## Supported Services

- **Serverless Framework** - data is retrieved by parsing `serverless.yml` definition
- **CloudFormation stack** - data is retrieved using AWS API (especially useful if you are using **AWS SAM**)
- **Custom Logs** - exact Log Group name is defined in settings

## Extension Settings

This extension contributes the following settings:

- `serverlessConsole.groupPerRequest`: determines a default option on whether logs should be grouped per request.
- `serverlessConsole.services`: a list of services from which data is retrieved.


---
repo: blackflux/lambda-monitor
url: 'https://github.com/blackflux/lambda-monitor'
homepage: ''
starredAt: '2017-12-29T20:53:43Z'
createdAt: '2017-11-20T01:50:25Z'
updatedAt: '2025-01-29T19:54:20Z'
language: JavaScript
license: MIT
branch: master
stars: 14
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:32.432Z'
description: Lambda log monitoring and streaming to external services.
tags: []
---

# Lambda Monitoring

[![Build Status](https://circleci.com/gh/blackflux/lambda-monitor.png?style=shield)](https://circleci.com/gh/blackflux/lambda-monitor)
[![Test Coverage](https://img.shields.io/coveralls/blackflux/lambda-monitor/master.svg)](https://coveralls.io/github/blackflux/lambda-monitor?branch=master)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=blackflux/lambda-monitor)](https://dependabot.com)
[![Dependencies](https://david-dm.org/blackflux/lambda-monitor/status.svg)](https://david-dm.org/blackflux/lambda-monitor)
[![NPM](https://img.shields.io/npm/v/lambda-monitor.svg)](https://www.npmjs.com/package/lambda-monitor)
[![Downloads](https://img.shields.io/npm/dt/lambda-monitor.svg)](https://www.npmjs.com/package/lambda-monitor)
[![Semantic-Release](https://github.com/blackflux/js-gardener/blob/master/assets/icons/semver.svg)](https://github.com/semantic-release/semantic-release)
[![Gardener](https://github.com/blackflux/js-gardener/blob/master/assets/badge.svg)](https://github.com/blackflux/js-gardener)

Lambda log monitoring and streaming to external services.

## What it does

- Parsing and analysis of AWS Lambda CloudWatch Logs
- Pipes AWS Lambda Logs to external logging services (i.e. [Loggly](https://loggly.com), [Logz](https://logz.io) or [Datadog](https://www.datadoghq.com))
- Detects and sends AWS Lambda anomalies to external monitoring service (i.e. [Rollbar](https://rollbar.com))
- Fully transparent, no changes to existing Lambda functions required

![Cloudwatch To Loggly](/docs/assets/cloudwatch_to_loggly.png)

## Setup

### 1. Create New Github Project

- Install dev dependencies with `yarn add -DE js-gardener @blackflux/robo-config-plugin eslint object-hash` and
- Dependencies with `yarn add -E lambda-monitor`
- Add `gardener.js` containing
```js
// eslint-disable-next-line import/no-extraneous-dependencies
import gardener from 'js-gardener';

if (require.main === module) {
  gardener().catch(() => process.exit(1));
}
```
- Add `.roboconfig.json` containing (adjust as necessary!)
```json
{
  "lambda-monitor": {
    "tasks": [
      "assorted/@default"
    ],
    "variables": {
      "enableCloudTrail": "FILL_IN",
      "awsRegion": "AWS_REGION"
    }
  },
  "@blackflux/robo-config-plugin": {
    "tasks": [
      "assorted/@sls-closedsource"
    ],
    "variables": {
      "repoKey": "ORG_NAME/REPO_NAME",
      "circleCiReadToken": "CIRCLE_CI_TOKEN",
      "projectName": "PROJECT_NAME",
      "owner": "GH_USER_NAME",
      "ownerName": "ORG_NAME",
      "mergeBot": "MERGE_BOT_NAME",
      "awsRegion": "AWS_REGION",
      "namespace": "com.sls.ORG_NAME"
    }
  }
}
```
- Run `node gardener.js`
- Then run `yarn install && yarn u`
- Then enter docker container with `. manage.sh`
- Then run `yarn install && u && t`
- Create `.depunusedignore`
```
@blackflux/robo-config-plugin
@blackflux/eslint-plugin-rules
object-hash
```
- Follow instructions of generated file `HOWTO.md` (and generated `CONFDOCS.md`)

## Disable Logging for a Lambda Function

To exclude a lambda function from being monitored simply add the tag `"MONITORED": "0"`. Note that you need to manually unsubscribe if `process-log` has already been subscribed to the CloudWatch stream.

## How it works

While deploying this project is straight forward, there is a lot of complexity going on behind the scenes to ensure:

- All Lambda functions are subscribed on initial deploy
- Newly created Lambda function are immediately subscribed
- Periodic checks for Lambda functions not subscribed (self healing)

There are four lambda function created per stage. All operations are only performed on lambda functions tagged with the corresponding stage.

**batcher-handler** - Listens to SQS messages to group them before writing to S3

**bundler-handler** - Listens to SQS messages to group them before writing to json logging service

**process-logs** - This lambda function is subscribed to CloudWatch and processes the logs. Anomalies are submitted to rollbar and all detected log events are sent to the configured logging services. Tagged with `"MONITOR": "1"` and `"MONITORED": "0"`.

**subscribe** - Subscribes the *process-logs* lambda function (detected using the `MONITOR` tag) to all relevant CloudWatch Groups, excluding those functions that have the `MONITORED` tag set to `0`.

**empty-bucket** - Empty CloudTrail bucket when stage is removed from AWS.

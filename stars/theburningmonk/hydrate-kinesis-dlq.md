---
repo: theburningmonk/hydrate-kinesis-dlq
url: 'https://github.com/theburningmonk/hydrate-kinesis-dlq'
homepage: null
starredAt: '2023-12-29T01:38:43Z'
createdAt: '2023-12-10T21:35:14Z'
updatedAt: '2025-01-24T01:51:32Z'
language: JavaScript
license: MIT
branch: main
stars: 14
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:41.372Z'
description: How to hydrate Kinesis DLQs records
tags: []
---

# hydrate-kinesis-dlq

How to hydrate Kinesis DLQs records

## Getting started

1. run `npm ci` in the project root to restore dependencies.

2. run `npx sls deploy` to deploy the project to `us-east-1` region. This should create a CloudFormation stack called `hydrate-kinesis-dlq` in the `us-east-1` region.

3. Inspect the CloudFormation stack to find the names of Kinesis stream (logical id `KinesisStream`) and SQS DLQ (logical id `KinesisStreamDLQ`).

4. To send test to the stream, run `STREAM_NAME=<insert stream name> node send-data-to-stream` in the project root. This script sends a message to the stream every 10 seconds.

The Kinesis function would fail 100% of the time. So all the messages you send would end up in the SQS DLQ.

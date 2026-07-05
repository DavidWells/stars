---
repo: trek10inc/serverless-aws-lambda-fanout
url: 'https://github.com/trek10inc/serverless-aws-lambda-fanout'
homepage: null
starredAt: '2017-08-24T00:48:33Z'
createdAt: '2017-06-13T15:55:30Z'
updatedAt: '2023-04-14T09:13:04Z'
language: JavaScript
license: Apache-2.0
branch: master
stars: 8
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:42.194Z'
description: Quickly add a fanout lambda with targets to a serverless project
tags: []
---

# Serverless AWS Lambda Fanout

For the most part, this is a simple repackaging with some tweaks of the fanastic https://github.com/awslabs/aws-lambda-fanout library. For details of operation please check that repository.

The biggest changed is that we have edited the configuration to using environment variables instead of depending on the dynamodb table. This means that all of your targets (and changes too them) are tracked in code and not arbitrarily added. You can also helpfully use things like sub syntax and other goodes to dynamically configure your targets. See below for an in-depth usage example.

# Getting Started

**NOTE: Only DDB streams and Kinesis Streams are currently supported as incoming events**

Configuration and setup is simple, just add the package and add a function (or multiple) pointing to the `node_modules/serverless-aws-lambda-fanout/index.handler` and add your targets as a JSON string environment variables with `FANOUT_` being prepended.

`npm install serverless-aws-lambda-fanout --save`

```yaml
# In serverless.yml

### KINESIS -> EVERYTHING ELSE
### No entry to other parts of the system without passing through fanout first
  fanout:
    environment:
      handler: node_modules/serverless-aws-lambda-fanout/index.handler

      # Normal ENV Vars
      ARCHIVE_DELIVERY_STREAM: {"Ref": S3ArchiveFirehose}
      
      # Fanout Targets
      FANOUT_ARCHIVE_FIREHOSE:
        Fn::Sub: '{
            "id":"archive-firehose",
            "sourceArn":"${MonitorEventStream.Arn}",
            "type": "firehose",
            "active": true,
            "collapse": "JSON",
            "destination": "${S3ArchiveFirehose}"
          }'
      FANOUT_CLOUDWATCH_PUBLISHER:
        Fn::Sub: '{
            "id":"cloudwatch-publisher",
            "sourceArn":"${MonitorEventStream.Arn}",
            "type": "lambda",
            "active": true,
            "collapse": "JSON",
            "destination": "${CloudwatchPublisherLambdaFunction}"
          }'
    events:
      - stream:
          type: kinesis
          batchSize: 500
          enabled: true
          arn:
            Fn::GetAtt:
              - MonitorEventStream
              - Arn

```

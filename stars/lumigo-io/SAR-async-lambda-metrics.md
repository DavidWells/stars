---
repo: lumigo-io/SAR-async-lambda-metrics
url: 'https://github.com/lumigo-io/SAR-async-lambda-metrics'
homepage: null
starredAt: '2019-10-02T20:21:47Z'
createdAt: '2019-07-22T19:59:44Z'
updatedAt: '2023-10-09T15:21:40Z'
language: JavaScript
license: Apache-2.0
branch: master
stars: 25
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:22.313Z'
description: >-
  A Serverless application that parses custom metrics from CloudWatch Logs and
  sends them to CloudWatch as custom metrics
tags: []
---

# SAR-async-lambda-metrics

[![Version](https://img.shields.io/badge/semver-1.7.0-blue)](template.yml)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![CircleCI](https://circleci.com/gh/lumigo/SAR-async-lambda-metrics.svg?style=svg)](https://circleci.com/gh/theburningmonk/SAR-async-lambda-metrics)
[![Greenkeeper badge](https://badges.greenkeeper.io/lumigo/SAR-async-lambda-metrics.svg)](https://greenkeeper.io/)

A Serverless application that parses custom metrics from CloudWatch Logs and sends them to CloudWatch as custom metrics.

This application deploys a single Lambda function with a name prefixed with `serverlessrepo-async-custom-metrics`. This function supports both `CloudWatch Logs` as well as `Kinesis` as event source.

You can subscribe the function to CloudWatch log groups directly. But since you can only have one subscription filter per log group and you probably want to ship your logs elsewhere (maybe to an ELK stack?), most likely you'll subscribe log groups to a Kinesis stream first, then subscribe this `serverlessrepo-async-custom-metrics` function to the Kinesis stream.

To help you manage the subscription of your logs, consider using [this Serverless application](https://serverlessrepo.aws.amazon.com/applications/arn:aws:serverlessrepo:us-east-1:374852340823:applications~auto-subscribe-log-group-to-arn).

Once subscribed, you can record custom metrics by writing to `stdout`. The function would parse the custom metrics out of your logs and send them to CloudWatch as metrics.

The format of the custom metric needs to follow the convention:

```MONITORING|<metric_value>|<metric_unit>|<metric_name>|<namespace>|<dimensions>```

where:

* `metric_value`: `float`
* `metric_unit`: any of the [allowed CloudWatch metric units](https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_MetricDatum.html)
* `metric_name`: `string`, what you want to call your metric
* `namespace`: `string`, your custom metrics would appear under this namespace
* `dimensions`: `comma separated key value pairs`, e.g. `service=content-item,region=eu-west-1`

e.g.

`MONITORING|1|Count|request_count|theburningmonk.com|service=content-item,region=eu-west-1`
`MONITORING|42.7|Milliseconds|latency|theburningmonk.com|service=content-item,region=eu-west-1`

## Deploying to your account (via the console)

Go to this [page](https://serverlessrepo.aws.amazon.com/applications/arn:aws:serverlessrepo:us-east-1:374852340823:applications~async-custom-metrics) and click the `Deploy` button.

## Deploying via SAM/Serverless framework/CloudFormation

To deploy this via SAM, you need something like this in the CloudFormation template:

```yml
AutoDeployMyAwesomeLambdaLayer:
  Type: AWS::Serverless::Application
  Properties:
    Location:
      ApplicationId: arn:aws:serverlessrepo:us-east-1:374852340823:applications/async-custom-metrics
      SemanticVersion: <enter latest version>
    Parameters:
      EventSourceType: <Lambda or Kinesis>
      TimeoutSeconds: <defaults to 300>
      KinesisStreamArn: <ARN for the Kinesis stream if EventSourceType is Kinesis>
      KinesisStreamBatchSize: <defaults to 100>
      RecordLambdaUsageMetrics: <"true" or "false">
      RecordLambdaCostMetric: <"true" or "false">
      RecordLambdaColdStartMetric: <"true" or "false">
```

To do the same via CloudFormation or the Serverless framework, you need to first add the following `Transform`:

```yml
Transform: AWS::Serverless-2016-10-31
```

For more details, read this [post](https://theburningmonk.com/2019/05/how-to-include-serverless-repository-apps-in-serverless-yml/).

## Parameters

`EventSourceType`: What's the event source you will intend to use? If logs are pushed from CloudWatch Logs to Lambda directly, then use `Lambda`. If logs are pushed to a Kinesis Stream first, then use `Kinesis`. Other event sources are not supported (yet).

`TimeoutSeconds`: (optional) Timeout for the Lambda function that would ship metrics to CloudWatch. Defaults to 30s.

`KinesisStreamArn`: (optional) Only relevant to the Kinesis event source type. The ARN to the Kinesis stream to subscribe the function to.

`KinesisStreamBatchSize`: (optional) Only relevant to the Kinesis event source type. The batch size to use for the subscription.

`RecordLambdaUsageMetrics`: (optional) Whether to collect Lambda usage metrics (i.e. billed duration, memory size and max memory used) from the logs and turn them into metrics. Allowed values are `"true"` or `"false"`.

`RecordLambdaCostMetric`: (optional) Whether to report estimated cost for Lambda functions as metrics. Allowed values are `"true"` or `"false"`.

`RecordLambdaColdStartMetric`: (optional) Whether to report init duration for Lambda functions as metrics. Allowed values are `"true"` or `"false"`.

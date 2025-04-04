---
repo: aidansteele/centralized-logs
url: 'https://github.com/aidansteele/centralized-logs'
homepage: ''
starredAt: '2023-02-13T00:15:39Z'
createdAt: '2023-02-12T02:08:24Z'
updatedAt: '2024-02-09T07:44:19Z'
language: null
license: NA
branch: main
stars: 49
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:56.730Z'
description: Centralizing AWS CloudWatch log forwarding via EventBridge and Step Functions
tags: []
---

# Centralized AWS CloudWatch Logs aggregation

This repo provides a code-less solution to aggregating AWS CloudWatch log 
subscriptions across multiple AWS accounts and regions. It uses Kinesis Firehose
(for aggregation and forwarding), EventBridge (for notifications about new log 
group creation) and Step Functions (for assuming roles cross-account and calling
the AWS SDK).

![architecture diagram](/diagram.png)

First, you can create a Kinesis Firehose delivery stream (an example is 
available in [`firehose.yml`](/firehose.yml)) or a Kinesis data stream - this 
will be the destination that all your logs are forwarded to. You only need to 
deploy one of these, there doesn't have to be one in each region.

Next, you deploy resources into your logs collection AWS account. This is the
[`logs-account.yml`](/logs-account.yml) template. You should deploy a stack from
this template into every AWS region that you want to collect logs from. It has
a few parameters: `OrganizationId` is the string you get by running `aws organizations describe-organization --query 'Organization.Id'`
and `FirehoseArn` should be the ARN of the Firehose delivery stream deployed 
earlier.

Finally, you deploy the [`every-account.yml`](/every-account.yml) template into
all the AWS accounts and regions that you want to collect logs from. This stack
has a parameter `CentralBusAccountId`, which is the account ID of the logs
collection account hosting the stacks deployed in the previous step.

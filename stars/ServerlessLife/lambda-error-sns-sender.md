---
repo: ServerlessLife/lambda-error-sns-sender
url: 'https://github.com/ServerlessLife/lambda-error-sns-sender'
homepage: null
starredAt: '2023-10-05T18:41:29Z'
createdAt: '2023-05-29T11:21:05Z'
updatedAt: '2024-02-07T00:07:45Z'
language: TypeScript
license: Apache-2.0
branch: main
stars: 4
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:46.761Z'
description: Send Lambda detail errors to AWS SNS Topic
tags: []
---

# Lambda Error SNS Sender

## A simple solution to improve the CloudWatch alarm to receive Lambda error details by email. Available as CDK construct or as CloudFormation.

How does it work?

1. **Lambda is subscribed to the SNS topic where you receive your alarms.** There is a message body subscription filter that limits errors based on the Lambda error metric. You must change the filter if you defied your metric in some other way, not the default one.
1. **Lambda analyzes the message**, finds a log of the failed Lambda, and queries the log group for the period that the metric was configured, plus some additional safety time, so we do not miss that error message. It extracts just a number of errors that can fit in one SNS message.
1. **Lambda sends errors to the same SNS** that you use for alerts. So, apart from the Alarm message for changing the error state, you will receive an additional one with detailed error messages.

![lambda-error-sns-sender](lambda-error-sns-sender.png)

The solution is in two forms:
- **[CDK construct](https://constructs.dev/packages/lambda-error-sns-sender)**
  If you are building your system with CDK (or [SST](https://sst.dev/)). Available for TypeScript, Java, C#, Python, and Go.
- **[CloudFormation](https://lambda-error-sns-sender.s3.eu-west-1.amazonaws.com/lambda-error-sns-sender.yaml)**
  For existing solutions, so you do not have to modify them. You deploy and point to the existing SNS used for CloudWatch alarms.

**If you are interested how to use it and how was build see the [blog post](https://www.serverlesslife.com/Improving_CloudWatch_Alarms_for_Lambda_Errors.html).**

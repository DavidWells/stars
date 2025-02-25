---
repo: kurtismash/aws-serverless-unique-event-aggregator
url: 'https://github.com/kurtismash/aws-serverless-unique-event-aggregator'
homepage: >-
  https://medium.com/@nooptech/serverless-event-aggregation-with-aws-lambda-and-dynamodb-96fe1a742a81?source=friends_link&sk=2fe63f9d246458fa173231b7d506c6e8
starredAt: '2024-06-11T17:43:49Z'
createdAt: '2024-03-04T20:19:51Z'
updatedAt: '2024-06-11T17:43:50Z'
language: JavaScript
license: NA
branch: main
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:29.426Z'
description: A design pattern to aggregate unique events without a time-based trigger.
tags:
  - aws-lambda
  - dynamodb
  - event-driven-architecture
  - serverless-architectures
---

# AWS Serverless Unique Event Aggregator

This repository contains a proof of concept application to aggregate events using AWS Lambda and DynamoDB. The batches of events created through this application do not contain duplicates, enabling the batches to be used for processing in non-idempotent situations.

![An AWS architecture diagram. Starts on the left with an SQS queue, named "input-queue", follows an arrow to the right to the "aggregator-lambda". The flow continues right from the "aggregator-lambda" into a DynamoDB table, "lock-table", and another SQS queue, "batch-queue". Both the table and the second queue have an arrow into the final element, the "batch-processor-lambda".](docs/images/architecture.png)

The aggregation uses Lambda's [built-in batching](https://aws.amazon.com/about-aws/whats-new/2020/11/aws-lambda-now-supports-batch-windows-of-up-to-5-minutes-for-functions/) functionality and in-memory caching to group events into batches of a specified size. DynamoDB is used to prevent the same message being included in multiple batches due to SQS's at-least-once delivery guarantee. The application is designed to handle a failure of the aggregation-lambda, ensuring that events do not become stuck within the DynamoDB table and preventing re-processing.

## How it works
> TLDR; We use Lambda's built-in batching function and in-memory caching to aggregate our events into DynamoDB, then read back the full batch with a query.

### aggregator-lambda
The aggregator-lambda is configured to receive messages from our input-queue. The Event Source Mapping for this is configured with the highest possible `BatchSize` and `MaximumBatchingWindowInSeconds`; the Lambda won't be invoked until the payload size is 6MB or 300 seconds has elapsed since the first message was received.

On the surface, the processing this Lambda completes is relatively simple. It creates a new UUID to be used as the batchId, sends this UUID to our batch-queue with a delay, attempts to write the message to our lock-table, and returns a partial batch response so that only messages that were successfully written our lock-table are deleted from the input-queue. We send the `batchId` first to ensure that the batch is processed even if the Lambda times out before it finishes processing. And use a `ConditionExpression` when writing to DynamoDB to prevent the same message from being processed in multiple batches simultaneously.

However, due to Lambda's 6MB invocation payload limit and the large amount of non-optional SQS metadata included in each received message, we need to make this function smarter if it is to handle batches of more than a few thousand items. We do this by caching the current batchId outside of the handler function. To encourage Lambda to handle messages within the same function containers, we specify a `MaximumConcurrency` on the Event Source Mapping which prevents Lambda from scaling up with additional SQS pollers. As we now want multiple invocations of the Lambda function to complete before we begin processing the batch, we implement a `MAX_SECONDARY_BATCHING_WINDOW` variable into our code to specify how long we should wait before starting to process a batch.

### lock-table
Our DynamoDB lock-table is relatively simple. The partition key is set as the messageId attribute. A Global Secondary Index (GSI) has been added using the batchId attribute.

| messageId | batchId | message |
| - | - | -|
| | | |
| | | |
| | | |

### batch-processor-lambda
The final piece of our aggregator is our batch-processor-lambda. This Lambda is triggered by our batch-queue but only has a `BatchSize` of 1 configured - it'll receive 1 message per batch.

This function's primary job is to query our lock-table using the `batchId` GSI to retrieve all the messages within the batch and process them as a single entity. The processing of the batch could be completed within this function or in a downstream component.

All we need to remember is that once we've finished processing the batch we need to delete all the items from our lock-table to allow duplicate messages to be processed, now without a race condition.

### Caveats
- As this pattern relies heavily on DynamoDB it is prone to write throttling. It is recommended to prewarm the lock-table when first created.
- Similarly, the Global Secondary Index on `batchId` can become hot for both reads and writes. As GSIs are updated asynchronously, using an eventually consistent model, the batch-processor could read a batch before the GSI is fully populated. It is recommended to clear the lock-table synchronously after processing, then query again for remaining items and reprocess these as necessary.
- Depending on your expected throughout this model could incur high costs due to the required Write Request Units on DynamoDB. This pattern has been designed for use in a system with a bursty workload, expected to sit dormant for long periods.
- As Lambda Event Source Mappings have a minimum MaximumConcurrency of 2, is it expected that bursts smaller than the configured MAX_BATCH_SIZE will be processed in at least 2 batches.

## Deployment

The application is written and deployed using AWS CDK. From the root of this repository, with AWS CDK installed, run the following to deploy to your AWS environment.

```sh
(cd src/aggregator-lambda && npm i)
(cd src/batch-processor-lambda && npm i)
(cd infrastructure/ && npm i && cdk deploy --all)
```

It is recommended that you manually replace the DynamoDB table once the stack has been deployed with a [pre-warmed table](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/pre-warming-on-demand-capacity-mode.html). To do this, delete the lock-table via the AWS Console and recreate it manually with a provisioned throughput of 40,000 RCUs and 40,000 WCUs on the base table and GSIs. Wait 5 minutes, then change the table to on-demand billing.

## Testing

The included script `send_messages.py` can be used to send messages to the `input-queue`. The logs from the batch-processor-lambda should show the size of the batches being created.
```
python send_messages.py <queue_url> <number_of_messages> <colision_percentage>
```

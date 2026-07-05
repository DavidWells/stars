---
repo: aurbac/serverless-dynamodb-item-logs
url: 'https://github.com/aurbac/serverless-dynamodb-item-logs'
homepage: null
starredAt: '2020-11-12T19:18:36Z'
createdAt: '2019-07-15T14:22:41Z'
updatedAt: '2020-11-12T19:18:36Z'
language: Python
license: NA
branch: master
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:24.088Z'
description: null
tags: []
---

# Capturing table activity with DynamoDB Streams

Work inside your AWS Cloud9 or local environment to deploy the following Serverless project that creates a flow to deliver changes in items from your DynamoDB table to an Amazon S3 bucket to be query in Amazon Athena.

![serverless-dynamodb-item-logs](images/serverless-dynamodb-item-logs.png)

## Configure your environment

- Cloud9: Use the default configuration.
- In your local environment [configure the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html#cli-quick-configuration) with your own IAM credentials.

## Install dependencies

Install Serverless CLI tool https://serverless.com/framework/docs/providers/aws/guide/installation/

``` bash
npm install -g serverless
```

## Create a Serverless project

``` bash
git clone https://github.com/aurbac/serverless-dynamodb-item-logs.git
cd serverless-dynamodb-item-logs
```

## Deploy your Serverless project

``` bash
serverless deploy
```

## Testing

``` bash
export ANSWERS_TABLE=serverless_dynamodb_item_logs_dev_answers
python batch_writing.py
```

!!! info
    Wait about 5 minutes until the records are processed by AWS Firehose and delivered to Amazon S3.

Go to the Amazon Athena console https://us-east-1.console.aws.amazon.com/athena.

Select your **serverless_dynamodb_item_logs_dev** database and choose the **...** next to your table and choose **Load Partitions**.

![Athena Load Partitions](images/athena-load-partitions.png)

Choose the **...** next to your table and choose **Preview table**.

![Athena Preview Table](images/athena-preview-table.png)

Example of query result.

![Athena Preview Table Results](images/athena-preview-table-results.png)

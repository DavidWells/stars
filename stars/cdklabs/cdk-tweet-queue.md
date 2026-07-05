---
repo: cdklabs/cdk-tweet-queue
url: 'https://github.com/cdklabs/cdk-tweet-queue'
homepage: null
starredAt: '2020-06-30T02:01:23Z'
createdAt: '2018-10-31T09:56:52Z'
updatedAt: '2025-02-25T00:23:08Z'
language: TypeScript
license: Apache-2.0
branch: main
stars: 30
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:46.432Z'
description: SQS queue fed with a stream of tweets from a Twitter search
tags: []
---

# Tweet Queue for AWS CDK

This is an [AWS CDK](https://github.com/awslabs/aws-cdk) construct library which
allows you to get a feed of Twitter search results into an SQS queue. It works
by periodically polling the freely available [Twitter Standard Search
API](https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets.html) and
sending all new tweets to an SQS queue.

Inspired by
[@jlhood](https://github.com/awslabs/aws-serverless-twitter-event-source/commits?author=jlhood)'s
[aws-serverless-twitter-event-source](https://github.com/awslabs/aws-serverless-twitter-event-source)

## Architecture

![](https://github.com/eladb/cdk-tweet-queue/raw/main/images/architecture.png)

1. A CloudWatch Event Rule triggers the poller AWS Lambda function periodically
2. The poller reads the last checkpoint from a DynamoDB table (if exists)
3. The poller issues a Twitter search query for all new tweets
4. The poller enqueues all tweets to an SQS queue
5. The poller stores the ID of the last tweet into the DynamoDB checkpoint table.
6. Rinse & repeat.

## Twitter API Keys

To issue a Twitter search request, you will need to
[apply](https://developer.twitter.com/en/apply-for-access.html) for a Twitter
developer account, and obtain API keys through by defining a [new
application](http://twitter.com/oauth_clients/new).

The Twitter API keys are read by the poller from an [AWS Secrets
Manager](https://aws.amazon.com/secrets-manager/) entry. The entry must contain
the following attributes: `consumer_key`, `consumer_secret`, `access_token_key`
and `access_token_secret` (exact names).

1. Create a new AWS Secrets Manager entry for your API keys
2. Fill in the key values as shown below:
    ![](https://github.com/eladb/cdk-tweet-queue/raw/main/images/secretsmanager.png)
3. Store the key
4. Obtain the ARN of the secret (you will need it soon).

## Usage

Use `npm` to install the module in your CDK project. This will also add it to
your `package.json` file.

```console
$ npm install cdk-tweet-queue
```

Add a `TweetQueue` to your CDK stack:

```ts
import { TweetQueue } from 'cdk-tweet-queue';

const queue = new TweetQueue(this, 'TweetStream', {
  // this is the ARN of the secret you stored
  secretArn: 'arn:aws:secretsmanager:us-east-1:1234567891234:secret:xxxxxxxxx'

  // twitter search query
  // see https://developer.twitter.com/en/docs/tweets/search/guides/standard-operators
  query: '#awscdk',

  // optional properties
  intervalMin: 60,          // optional: polling interval in minutes
  retentionPeriodSec: 60,   // optional: queue retention period
  visibilityTimeoutSec: 60, // optional: queue visilibity timeout
});
```

Now, `queue` is an `sqs.Queue` object and can be used anywhere a queue is
accepted. For example, you could process the queue messages using an AWS Lambda
function by setting up an SQS event source mapping.

## Development

The project is managed by [projen](https://github.com/projen/projen) and offers the following commands:

- `yarn projen` - Synthesize the project configuration.
- `yarn compile` - Compile all source code.
- `yarn test` - Run all tests.
- `yarn build` - Complie, test, and package the module.

## Integration test

There is also an integration test that can be executed by running the following commands. You will need to set the `TWEET_QUEUE_SECRET_ARN` environment variable in order for the test to be able to use your Twitter API keys.

```console
$ yarn integ:deploy
```

Don't forget to destroy:

```console
$ yarn integ:destroy
```

You can also run any cdk command on the integration test application by running:

```console
yarn integ <command>
```

## License

Apache-2.0

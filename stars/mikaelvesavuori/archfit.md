---
repo: mikaelvesavuori/archfit
url: 'https://github.com/mikaelvesavuori/archfit'
homepage: ''
starredAt: '2025-01-14T08:08:06Z'
createdAt: '2023-08-16T20:22:37Z'
updatedAt: '2025-01-14T08:08:06Z'
language: TypeScript
license: MIT
branch: main
stars: 14
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:15.267Z'
description: 'Validate the fitness of your AWS solutions, without the heavy lifting!'
tags:
  - architecture
  - architecture-tests
  - aws
  - evolutionary-architecture
  - fitness-functions
  - software-architecture
  - testing
---

# ArchFit 📐🏋️‍♀️

![Build Status](https://github.com/mikaelvesavuori/archfit/workflows/main/badge.svg) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=mikaelvesavuori_archfit&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=mikaelvesavuori_archfit)  [![codecov](https://codecov.io/gh/mikaelvesavuori/archfit/branch/main/graph/badge.svg?token=LDZV8XOA4X)](https://codecov.io/gh/mikaelvesavuori/archfit) [![Maintainability](https://api.codeclimate.com/v1/badges/58d01463d845567aae9b/maintainability)](https://codeclimate.com/github/mikaelvesavuori/archfit/maintainability)

## Validate the fitness of your AWS solutions — without the heavy lifting!

Currently, ArchFit enables you to check:

- API Gateway error rate
- API Gateway request validation presence
- Custom tagged resources
- DynamoDB on-demand mode
- DynamoDB provisioned throughput rightsizing
- Lambda ARM architecture use
- Lambda dead-letter queue use
- Lambda memory cap
- Lambda recent runtime use
- Lambda timeout ratios
- Lambda versioning
- Public exposure of S3 buckets and RDS instances
- Ratio of servers to serverless
- Spend trend

_For more details on the fitness functions ("tests") themselves, see below._

## Example

You can use ArchFit as a CLI tool. Just make sure you have an `archfit.json` configuration file in the directory! It's really easy, just a simple:

```zsh
archfit
```

Or use it as a library! Here's a complete set of fitness functions.

```ts
import { ArchFitConfiguration, createNewArchFit } from 'archfit';

async function run() {
  const config: ArchFitConfiguration = {
    region: 'eu-north-1',    // AWS region
    currency: 'EUR',         // AWS currency
    period: 30,              // period in days to cover
    writeReport: true,       // writes a report to `archfit.results.json`
    tests: [
      { name: 'APIGatewayErrorRate', threshold: 0 },
      { name: 'APIGatewayRequestValidation', threshold: 0 },
      {
        name: 'CustomTaggedResources',
        threshold: 50,
        required: ['STAGE', 'Usage']
      },
      { name: 'DynamoDBOnDemandMode', threshold: 100 },
      { name: 'DynamoDBProvisionedThroughput', threshold: 5 },
      { name: 'LambdaArchitecture', threshold: 100 },
      { name: 'LambdaDeadLetterQueueUsage', threshold: 100 },
      { name: 'LambdaMemoryCap', threshold: 512 },
      { name: 'LambdaRuntimes', threshold: 100 },
      { name: 'LambdaTimeouts', threshold: 0 },
      { name: 'LambdaVersioning', threshold: 0 },
      { name: 'PublicExposure', threshold: 0 },
      { name: 'RatioServersToServerless', threshold: 0 },
      {
        name: 'SpendTrend',
        threshold: 0
      }
    ]
  };

  const archfit = await createNewArchFit(config);
  const results = archfit.runTests();

  console.log(results);
}

run();
```

Because ArchFit bundles a lot of AWS SDKs, it probably won't be an ideal fit in, for example, serverless functions that run _a lot_.

---

## Usage

### Prerequisites

You'll of course need an AWS account and appropriate credentials to run the various AWS SDKs and make calls to AWS' APIs.

Note that ArchFit runs on a _single_ region. If you need results for multiple regions, you'll need to run ArchFit multiple times (once for each region).

### Installation

#### Global install

For a global install, run `npm install -g archfit` or your equivalent command.

#### Local install

For a local install, step into your desired root diretory and run `npm install -D archfit` (you'll probably want to use it as a dev dependency) or your equivalent command.

### Configuration

You'll need to provide a configuration in one of two ways:

- For library use, pass the configuration object to `createNewArchFit()` (see the example above)
- For CLI use, ArchFit will attempt to read `archfit.json` from the directory in which it's run from

#### Required values

`region`: The AWS region you want to run the fitness functions in.

#### Optional values

`currency`: An [AWS-supported currency](https://repost.aws/knowledge-center/supported-aws-currencies), defaults to `USD`.

`period`: A number of days which many of the data collection calls will use when getting data, defaults to `30`.

`writeReport`: Writes a test/run report to `archfit.results.json`, defaults to `false`.

### Running it

#### Global use

Just run `archfit` in your CLI of choice.

#### Local use

The recommended way is to run `npx archfit`.

## Fitness functions

### API Gateway error rate

Measures the daily server error rate of all API Gateway instances.

The threshold refers to the maximum daily average error rate for any given API Gateway.

```ts
{ name: 'APIGatewayErrorRate', threshold: 0 }
```

### API Gateway request validation presence

Measures if the number of API Gateway request validators is above the threshold.

```ts
{ name: 'APIGatewayRequestValidation', threshold: 0 }
```

### Custom tagged resources

Checks if the number of resources with the given tags is greater than or equal to the given threshold.

This is calculated as a percentage of all tagged resources.

Note that tags are case-sensitive.

```ts
{
  name: 'CustomTaggedResources',
  threshold: 50,
  required: ['STAGE', 'Usage']
}
```

### DynamoDB on-demand mode

Check if DynamoDB tables are using on-demand mode.

Success is calculated as the percentage of tables that are using on-demand mode vs those which aren't.

```ts
{ name: 'DynamoDBOnDemandMode', threshold: 100 }
```

### DynamoDB provisioned throughput rightsizing

Checks if the provisioned throughput of DynamoDB tables are within the specified threshold.

The threshold adds a "tolerance"/variance as a number of percent on top of the capacity utilization.

```ts
{ name: 'DynamoDBProvisionedThroughput', threshold: 5 }
```

### Lambda ARM architecture use

Check if Lambda functions are using ARM architecture.

The threshold represents the minimum percentage of functions that should be using ARM architecture.

```ts
{ name: 'LambdaArchitecture', threshold: 100 }
```

### Lambda dead-letter queue use

Check if Lambda functions have dead letter queues.

The threshold represents the minimum percentage of Lambda functions that should have dead letter queues.

```ts
{ name: 'LambdaDeadLetterQueueUsage', threshold: 100 }
```

### Lambda memory cap

Check that the memory cap of all Lambda functions is not greater than the threshold.

```ts
{ name: 'LambdaMemoryCap', threshold: 512 }
```

### Lambda recent runtime use

Checks if Lambda functions are using [recent runtimes](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html).

The threshold represents the minimum percentage of Lambda functions that need to use recent runtimes.

```ts
{ name: 'LambdaRuntimes', threshold: 100 }
```

### Lambda timeout ratios

Fitness function to measure if there are acceptable timeout ratios for Lambda functions.

The threshold represents the number of percent of timeouts vs invocations that a Lambda function must have.

```ts
{ name: 'LambdaTimeouts', threshold: 0 }
```

### Lambda versioning

Checks if Lambda functions have versioning enabled.

The threshold represents the number of percent of Lambda functions that must be versioned.
The threshold is a "less or equal" check, meaning that:

- If the threshold is 100%, then all Lambda functions must be versioned.
- If the threshold is 0%, then no Lambda functions must be versioned.

```ts
{ name: 'LambdaVersioning', threshold: 0 }
```

### Public exposure of S3 buckets and RDS instances

Fitness function to evaluate if there are too many public resources.

The threshold represents an absolute number.

```ts
{ name: 'PublicExposure', threshold: 0 }
```

### Ratio of servers to serverless

Calculates the ratio of servers to serverless functions/containers (well, to be frank, a percentage).

```ts
{ name: 'RatioServersToServerless', threshold: 0 }
```

### Spend trend

Checks if predicted spend is less than or equal to the threshold. The threshold is calculated as a percentage on top of the last month's spend.

```ts
{
  name: 'SpendTrend',
  threshold: 0
}
```

## Known limitations and behaviors

- This won't do any looping/pagination calls. If you have a very big set of resources, ArchFit will currently only get the first page of results for calls to the AWS APIs.

---

## Ideas

- Lambda Throttles, DestinationDeliveryFailures, DeadLetterErrors, Duration (e.g. "p95")
- Ephemeral disk use
- Full queues?
- Time in queue?
- Dropped messages
- Cold starts
- Concurrency
- Data transfer costs trend
- Security vulnerabilities?
- Compliance?
- Event source integration/failure?

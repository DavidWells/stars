---
repo: PauloGoncalvesBH/running-playwright-on-aws-lambda
url: 'https://github.com/PauloGoncalvesBH/running-playwright-on-aws-lambda'
homepage: ''
starredAt: '2021-08-25T02:47:06Z'
createdAt: '2021-08-20T02:01:35Z'
updatedAt: '2025-02-25T07:24:24Z'
language: JavaScript
license: GPL-3.0
branch: main
stars: 397
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:47.310Z'
description: Running hundreds of Playwright E2E tests in a few seconds with AWS Lambda
tags:
  - lambda-functions
  - playwright
  - serverless
---

# Running hundreds of Playwright tests in a few seconds with AWS Lambda

<div align="center">
<b><i>Give the <a href="https://github.com/PauloGoncalvesBH/running-playwright-on-aws-lambda">repository</a> a star ⭐, it encourages me to create advanced software quality content 100% free</i></b>
</div>
<br>

This project has a playwright implementation so that it is consumed via AWS Lambda, allowing to parallelize the execution of all files and making the execution much faster.

The success of this implementation demonstrates that, in scenarios where E2E testing is needed to validate critical behaviors that are not possible in another type of test, it is possible to use AWS Lambda to run this same test on all Pull Requests, not just a few times in day.

> _**Note:** This project was created as a result of study. Identify whether the parallelism presented here suits your case._

## Result

With playwright on serverless it was possible to run 110 files parallelized, with 221 tests, in less than 25 seconds.
This same test running without parallelization would take 23 minutes. 

> To see the execution in detail, you can access the [pipeline log by clicking here](https://github.com/PauloGoncalvesBH/running-playwright-on-aws-lambda/actions/workflows/test-serverless.yml).

The gif below demonstrates the execution:

<p align="center">
 <img alt="Gif showing playwright execution" src="./.github/running-playwright-serverless.gif">
</p>

## Pricing

Running hundreds of Lambda functions that last a few seconds has little impact on the final cost. To implement this parallelism in your project, perform the price calculation.

AWS Lambda Price:

> The AWS Lambda free usage tier includes 1M free requests per month and 400,000 GB-seconds of compute time per month.

Source: https://aws.amazon.com/lambda/pricing/

## Application diagram

<p align="center">
 <img alt="Diagram" src="./.github/Playwright-serverless.png">
</p>

## CloudWatch metrics

Below are some important CloudWatch metrics.

110 lambda functions were invoked, however my account has a limit of 50 parallel executions, which made the total execution double in time. 

The average time that a lambda function takes to run is 7 seconds, which is less than the total of 23 seconds that takes to run the test.

**However 23 seconds is a quiet time to wait when running an E2E test in a pipeline. I think we both agree that it's better than 23 minutes.**

### Parallel executions

Limited to 50.

<p align="center">
 <img alt="Parallel runs limited to 50" src="./.github/concurrent-executions-lambda.png">
</p>

### Invocations

1 invocation per test file in [./tests/E2E](./tests/E2E).

<p align="center">
 <img alt="Number of calls equal to 110, 1 per test file" src="./.github/invocations-lambda.png">
</p>

### Duration

The longest running lambda function was 10.2 seconds, less than half of the total execution time of all functions.

With a higher concurrent execution we would have better results in total time.

<p align="center">
 <img alt="Duration showing the longest lambda was 10.2 seconds" src="./.github/duration-lambda.png">
</p>

## More information

> To understand how tests are run and AWS Lambda is built I recommend accessing the pipelines in [./.github/workflows/](./.github/workflows/) and the [Makefile](./Makefile).

### Deploying at AWS Lambda

1. Install serverless globally:

```sh
npm install --global serverless@3.X
```

2. Create AWS Acess keys: https://www.serverless.com/framework/docs/providers/aws/guide/credentials/#creating-aws-access-keys

3. Configure the Serverless Framework CLI to use AWS access keys

```sh
serverless config credentials \
  --provider aws \
  --key <AWS_ACCESS_KEY_ID> \
  --secret <AWS_SECRET_ACCESS_KEY>
```

> More at: https://www.serverless.com/framework/docs/providers/aws/cli-reference/config-credentials#configure-the-default-profile

4. And, finally, deploy the application at AWS Lambda:

```sh
make deploy
```

### Run tests at AWS Lambda

After deploying run the tests using the following command:

```sh
make test-serverless
```

### Run locally (without using AWS Lambda)

Acess the directory [./tests](./tests) and execute:

```sh
npm ci
```

Run the test with:

```sh
npm test
```

___

[LICENSE GNU General Public License v3.0](./LICENSE)

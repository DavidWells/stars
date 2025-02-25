---
repo: nak2k/node-init-stage
url: 'https://github.com/nak2k/node-init-stage'
homepage: ''
starredAt: '2024-12-27T20:24:56Z'
createdAt: '2019-12-11T23:02:37Z'
updatedAt: '2024-12-27T20:24:56Z'
language: TypeScript
license: NA
branch: master
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:53:35.495Z'
description: Run async functions in the init stage of AWS Lambda
tags: []
---

# init-stage

Run async functions in the init stage of AWS Lambda.

If you don't know the init stage, please read the following awesome post first.

- [Shave 99.93% off your Lambda bill with this one weird trick](https://medium.com/@hichaelmart/shave-99-93-off-your-lambda-bill-with-this-one-weird-trick-33c0acebb2ea)

This package provides functions to run async functions in the init stage.

The following screenshot is the timeline when async functions have run in the init stage.

![Screenshot of the CloudWatch ServiceLens console](/images/tracing-example.png?raw=true)

## Installation

```
npm i init-stage
```

If you will use with AWS X-Ray, run the following step:

```
npm i aws-xray-sdk-core
```

## Usage

``` javascript
const { initStage } = require('init-stage');

const done = initStage(async () => {
  // This function is called in the init stage.
});

exports.handler = async (event, context) => {
  const result = await done;
};
```

## API

### initStage<T>(fn: () => T): T

This function calls a specified function in the init stage. If the function is async function, the Lambda handler is not called until the async task is completed.
In case this function is called multiple times, the Lambda handler is not called until all async tasks are completed.

All async tasks is executed in parallel, and they must be completed in 10 seconds.

#### arguments

- `fn`: () => T
  - A function or an async function that is called in the init stage.

#### return

Result that `fn` returns. If `fn` is an async function, it is a promise.

### initStageWithTracing<T>(name: string, fn: (subsegment: Subsegment) => Promise<T>): Promise<T>

This function is equivalent to the `initStage` except tracing by AWS X-Ray.

If this function is used, you have to install [aws-xray-sdk-core](https://www.npmjs.com/package/aws-xray-sdk-core).

#### arguments

- `name`: string
  - A name of a subsegment that records informations of an async task with X-Ray.
- `fn`: (subsegment: Subsegment) => Promise<T>
  - An async function that is called in the init stage.

#### return

Result that `fn` returns.

## How it works

When your Lambda function is invoked, official Node.js runtime of Lambda executes following steps:

1. Initialize the execution environment.
2. Load your module that defines a handler.
3. Get a first event.
4. Set environment variables for X-Ray.
5. Call your handler.
6. Get a second event.

Lambda calls `setImmediate()` once between step 2 and 3 and between 5 and 6.

`initStage()` and `initStageWithTracing()` replace `setImmediate()` for following purposes:

1. Waiting completions of all async tasks before getting a first event.
2. Sending tracing data for async tasks to X-Ray after environment variables for X-Ray is set.

## TODO

- [ ] Support AWSXRay.captureAWS().

## License

MIT

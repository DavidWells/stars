---
repo: benkehoe/heaviside
url: 'https://github.com/benkehoe/heaviside'
homepage: null
starredAt: '2018-10-29T01:23:24Z'
createdAt: '2017-10-28T20:47:41Z'
updatedAt: '2023-06-07T05:39:16Z'
language: Python
license: Apache-2.0
branch: master
stars: 25
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:08.871Z'
description: AWS Step Functions but (almost) all done inline in Lambda
tags: []
---

# heaviside: fast and loose state machines with Step Function syntax

[AWS Step Functions](https://aws.amazon.com/step-functions/) is a great service, but [it doesn't quite fit all the use cases it could](https://serverless.zone/faas-is-stateless-and-aws-step-functions-provides-state-as-a-service-2499d4a6e412). In particular, it's tuned towards being durable and auditable, at the expense of latency, invocation rate, and cost. Heaviside is an experiment to combine the [States language](https://states-language.net/spec.html) that Step Functions uses to define state machines with AWS Lambda's client context functionality to make these fast and loose orchestrations possible.

## Design

A state machine definition in the States language consists of a defined number of "control" states, like Choice for conditional logic, Parallel for concurrency, and Succeed or Fail for terminal states, as well as a Task state for implementing the user's logic. In Step Functions, all the orchestration happens within the Step Functions service, executing the flow and invoking the relevant Lambda functions when a Task needs to be executed. In heaviside, the Task Lambdas take on the work of executing the control flow.

**Execution model**: In any given Lambda, there is an instance of the Executor class managing the state machine execution. At the *end* of a Lambda execution, the executor runs the state machine until it hits another Task state, at which point it asynchronously invokes the relevant Lambda. The executor puts the state machine data into the client context in the Lambda invocation, allowing it to be picked up by the executor in that Lambda.

**Entry point**: the Invoker Lambda is the starting point. It is given a state machine definition and an input (in theory, there could be named definitions stored somewhere as well). It creates an executor and runs it until it has either completed or dispatched a Task Lambda.

**Task lambdas**: a Task Lambda is any (Python) Lambda function whose handler has been wrapped by using the heaviside decorator. The wrapping function rehydrates the executor from the client context, runs the actual handler, deals with success or failure, and then runs the remaining control flow in the state machine until it has either completed or dispatched a Task Lambda.

## Implementation

**State machine execution**: each execution gets a UUID identifier.

**Definition**: the definition for an execution gets stored in an S3 bucket under that execution's id. In theory it could be passed around, but the client context is limited to about 3KB. Instead, heaviside keeps a cache of the definitions in the Lambda container, so repeated invocations of the same flow don't have to hit S3.

**Retries**: Currently relying on Lambda's retry logic, which is not configurable.

**Need for a DynamoDB table**: Ideally there isn't a central coordination point in linear flows. Through the client context, we are sort of transferring that storage burden to Lambda. However, there is a definite need for a DynamoDB table to coordinate parallel executions. The output of each substate in a parallel state needs to be collected and once they're all done, collated and dispatched to the next Task Lambda. I'd like to stay away from needing to store the current state of the state machine in the table, but some per-state information may be required for things like timeouts.

## Status

- Implemented Succeed, Fail, and Task states
- Haven't tested catchers yet
- Tested locally using threads for async dispatch
- Tested Lambda tasks from local script using synchronous invocation
- ClientContext not processed for async Lambda invocation :-(
  - until this is fixed, this design is not feasible without modifying Lambda payloads
 
 ### TODO
 - test catchers
 - implement Pass and Choice states
 - honor InputPath, OutputPath, ResultPath
 - implement timeouts
   - use DDB to remember across retries
   - could actually abort Lambda tasks
 - implement Wait state using SQS
 - implement Parallel state
 - 

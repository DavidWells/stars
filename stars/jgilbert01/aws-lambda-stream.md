---
repo: jgilbert01/aws-lambda-stream
url: 'https://github.com/jgilbert01/aws-lambda-stream'
homepage: ''
starredAt: '2020-04-27T16:15:17Z'
createdAt: '2019-11-24T16:25:05Z'
updatedAt: '2025-01-27T17:51:18Z'
language: JavaScript
license: MIT
branch: master
stars: 106
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:55.604Z'
description: Create stream processors with AWS Lambda functions
tags: []
---

# aws-lambda-stream

**_Create stream processors with AWS Lambda functions._**

The event signature for many Lambda functions is an array containing a micro-batch of `event.Records`. Functional Reactive Programming (FRP) is the cleanest approach for processing these streams. This library provides a light-weight framework for creating these stream processors. The underlying streaming library is [Highland.js](https://caolan.github.io/highland), replete with features like filter, map, reduce, backpressure, batching, parallel processing and more.

Support is provided for AWS EventBridge, Kinesis, DynamoDB Streams and more.

## Install

`npm install aws-lambda-stream --save`

#### Using AWS SDK v2?
aws-lambda-stream@v1 is using AWS SDK v3. If you are using AWS SDK v2, please use aws-lambda-stream@v0.51.0.

## Typical Scenario
The following diagram depicts a typical scenario for using this library to implement event sourcing and cqrs patterns. State changes in the database of Service X trigger the publication of domain events and Service Y consumes the events and caches the desired data in materialized views to support its requirements.

<img src="overview.png" width="700">

## Basic Usage
The following examples show how to implement basic handler functions for consuming events from a Kinesis stream and a DynamoDB Stream. A key thing to note is that the code you see here is responsible for assembling the steps in the stream pipeline. The final step, `toPromise` returns a Promise from the handler function. Then the promise starts consuming from the stream and the data starts flowing through the steps. The data is pulled through the steps, which provides natural _backpressure (see blow)_. The promise will resolve once all the data has passed through all the stream steps or reject when an unhandled error is encountered.

### Example: Trigger Function
This example processes a DynamoDB Stream and publishes domain events to an EventBridge bus, which routes the events to the likes of a Kinesis stream. The details are explained below.

```javascript
import { fromDynamodb, publishToEventBridge as publish, toPromise } from 'aws-lambda-stream';

export const handler = async (event) =>
  fromDynamodb(event)
    .map(toEvent)
    .through(publish({ batchSize: 25 }))
    .through(toPromise);
```

### Example: Listener Function
This example processes a Kinesis stream and materializes the data in a single DynamoDB table. The details are explained below.

```javascript
import { fromKinesis, update, toPromise } from 'aws-lambda-stream';

export const handler = async (event) =>
  fromKinesis(event)
    .filter(onEventType)
    .map(toUpdateRequest)
    .through(update({ parallel: 4 }))
    .through(toPromise);
```

## Creating a stream from a lambda event
The first step of a stream processor transforms the incoming Records into a [stream](https://caolan.github.io/highland/#_(source)), like such: `_(event.Records)`. The various `from` functions, such as `fromKinesis`, `fromDynamodb` and `fromEventBridge`, normialize the records into a standard `Event` format. The output is a stream of `UnitOfWork` objects.

## UnitOfWork Type (aka uow)
Think of a `uow` as an _immutable_ object that represents the `scope` of a set of `variables` passing through the stream. More so than ever, we should not use global variables in stream processors. Your processor steps will add new variables to the `uow` for use by downstream steps _(see _Mapping_ below)_. This _scoping_ is crucial when we leverage the _parallel processing_ and _pipeline_ features discussed below.

```javascript
interface UnitOfWork {
  record: any;
  event?: Event;
  batch?: UnitOfWork[];
}
```

* `record` - the original record
* `event` - the standardized event
* `batch` - an array of uow that should succeed or fail together (see _Batching_ and _Grouping_ below)

## Event Type
The various streaming and messaging channels each have their own formats. We want to decouple the processoring logic from the choice of these technologies. Thus all published events conform to the following `Event` format. This also provides for polymorphic-like processing. This standard format is also leveraged in the _event-lake_ and _micro-event-store_ features.

```javascript
interface Event {
  id: string;
  type: string;
  timestamp: number;
  partitionKey?: string;
  tags: { [key: string]: string | number };
  <entity>: any;
  raw?: any;
  eem?: any;
  s3?: { bucket: string, key: string };  
}
```

* `id` - a unique deterministic value
* `type` - generally the namespace, domain entity and action performed
* `timestamp` - epoch value when the action was performed
* `partitionKey` - generally the entity id or correlation id to ensure related events can be processed together
* `tags` - a generic place for routing information. A standard set of values is always included, such as `account`, `region`, `stage`, `source`, `functionname` and `pipeline`.
* `<entity>` - a canonical entity that is specific to the event type. This is the _contract_ that must be held backwards compatible. The name of this field is usually the lowerCamelCase name of the entity type, such as `thing` for `Thing`.
* `raw` - this is the raw data and format produced by the source of the event. This is included so that the _event-lake_ can form a complete audit with no lost information. This is not guaranteed to be backwards compatible, so use at your own risk.
* `eem` - envelope encryption metadata _(see _Encryption_ below)_
* `s3` - supports the claim-check pattern for large events

## Filters
For a variety of reasons, we generally multiplex many event types through the same stream. I discuss this in detail in the following post: [Stream Inversion & Topology](https://medium.com/@jgilbert001/stream-inversion-topology-ad773627a435?source=friends_link&sk=a3639a9f8d459dd60266569380fb5c71). Thus, we use `filter` steps with functions like `onEventType` to focus in on the event types of interest and perform content based routing in general.

```javascript
// all event types starting with `thing-`
const onEventType = uow =>
  uow.event.type.match(/thing-*/);
```

## Mapping
Many stream processor steps map the incoming data to the format needed downstream. The results of the mapping are adorned to the `uow` as a new variable. The `uow` must be immutable, so we return a new `uow` by cloning the original `uow` with the _spread_ operator and adorning the additional variable. There are various utils provided to assist _(see below)_.

```javascript
.map((uow) => ({
  ...uow,
  variableName: {
    // mapping logic here
  }
}))
```

This is the function used in the _Listener Function_ example above.

```javascript
import { updateExpression, timestampCondition } from 'aws-lambda-stream';

const toUpdateRequest = (uow) => ({
  ...uow,
  updateRequest: { // variable expected by `update` util
    Key: {
      pk: uow.event.thing.id,
      sk: 'thing',
    },
    ...updateExpression({
      ...uow.event.thing,
      discriminator: 'thing',
      timestamp: uow.event.timestamp,
    }),
    ...timestampCondition(),
  }
});
```

This is the function used in the _Trigger Function_ example above.

```javascript
const toEvent = (uow) => ({
  ...uow,
  event: { // variable expected by the `publish` util
    ...event,
    thing: uow.event.raw.new, // canonical
  }
});
```

> Note: It is best to perform mapping in a separate upstream step from the step that will perform the async-non-blocking-io to help maximize the potential for concurrent processing. (aka cooperative programming)

## Connectors and Sinks
At the end of a stream processor there is usually a _sink_ step that persists the results to a datastore or another stream. These external calls are wrapped in thin `Connector` classes so that they can be easily _mocked_ for unit testing.

These connectors are then wrapped with _sink_ functions, such as `update` and `publish`, to integrate them into the streaming framework. For example, the promise returned from the connector is normalized to a [stream](https://caolan.github.io/highland/#_(source)), fault handling is provided and features such as [parallel](https://caolan.github.io/highland/#parallel) and [batch](https://caolan.github.io/highland/#batch) are utilized.

These _sink_ functions leverage _currying_ to override default configuration settings, such as the _batchSize_ and the number of _parallel_ asyn-non-blocking-io executions.

Here is the example of using the `update` function.

```javascript
import { update, toPromise } from 'aws-lambda-stream';

...
  .through(update({ parallel: 4 }))
  .through(toPromise);
```

Here is the example of using the `publish` function.

```javascript
import { publishToEventBridge as publish, toPromise } from 'aws-lambda-stream';
  ...
  .through(publish({ batchSize: 25 }))
  .through(toPromise);
```

## Faults
When there is an unhandled error in a Kinesis or DynamoDB stream processor, Lambda will continuously retry the function until the problem is either resolved or the event(s) in question expire(s). For transient errors, such as throttling, this may be the best course of action, because the problem may self-heal. However, if there is a poison event then we want to set it aside, by publishing a `fault` event, so that the other events can be processed. I refer to this as the _Stream Circuit Breaker_ pattern.

Here is the definition of a `fault` event.

```javascript
export const FAULT_EVENT_TYPE: string = 'fault';

interface FaultEvent extends Event {
  err: {
    name: string;
    message: string;
    stack: string;
  };
  uow: UnitOfWork;
}
```

* `err` - contains the error information
* `uow` - contains the state of the variables in the `uow` when the error happened

When an error is thrown in a _Highland.js_ stream, the error will skip over all the remaining steps until it is either caught by an [errors](https://caolan.github.io/highland/#errors) step or it reaches the end of the stream and all processing stops with the error.

When you want to handle a poison event and raise a `fault` event then simply catch the error, adorn the current `uow` to the error and rethrow the error. Several utilities are provided to assist: `throwFault` for standard try/catch, `rejectWithFault` for promises, and `faulty` and `faultyAsyncStream` are function wrappers.

Here is an example of using `throwFault`.

```javascript
try {
  ...
} catch (err) {
  throwFault(err);
}

export const throwFault = (uow) => (err) => {
  // adorn the troubled uow
  // for processing in the errors handler
  err.uow = uow;
  throw err;
};
```

Then we need to setup the `faults` errors function and the `flushFaults` stream. _Fault handling is already included when using the `pipelines` feature (see below)._

```javascript
import { faults, flushFaults, toPromise } from 'aws-lambda-stream';
  ...
  .errors(faults)
  .through(flushFaults(opt))
  .through(toPromise);
```

The `faults` function tests to see if the `err` has a `uow` adorned. If so then it buffers a `fault` event. The `flushFaults` stream will published all the buffered `fault` events once all events in the batch have been processed. This ensures that the `fault` events are not prematurely published in case an unhandled error occurs later in the batch.

## Pipelines
As mentioned above, we are multiplexing many event types through a single stream for a variety of good reasons. Therefore, we want to maximize the utilization of each function invocation by acting on as many events as possible. However, we also want to maintain good clean separation of the processing logic for these different event types.

The _Highland.js_ library allows us to [fork](https://caolan.github.io/highland/#observe) streams, passing each fork/observer through a [pipeline](https://caolan.github.io/highland/#pipeline) and [merge](https://caolan.github.io/highland/#merge) the streams back together where they can share common tail logic like `fault` handling.

Each pipeline is implemented and tested separately. Each is usually defined in its own module/file.

Here is an example of a pipeline. They are _curried_ functions that first receive options during `initialize` and then the forked stream during `assemble` _(see below)_. During `assemble` they add the desired steps to the stream. Pipelines typically start with one or more `filter` steps to indicate which events the steps apply to.

```javascript
const pipeline1 = (options) => (stream) => stream
  .filter(onEventType)
  .tap(uow => options.debug('%j', uow))
  .map(toUpdateRequest)
  .through(update({ parallel: 4 }));

export default pipeline1;
```

Here is an example of a handler function that uses pipelines.

```javascript
import { initialize, defaultOptions, fromKinesis, toPromise } from 'aws-lambda-stream';

import pipeline1 from './pipeline1';
import pipeline2 from './pipeline2';

const PIPELINES = {
  pipeline1,
  pipeline2,
};

const OPTIONS = { ...defaultOptions, ... };

export const handler = async (event) =>
  initialize(PIPELINES, OPTIONS)
    .assemble(fromKinesis(event))
    .through(toPromise);
```

1. First we `initialize` the pipelines with any options.
2. Then we `assemble` all pipelines into a forked stream.
3. And finally the processing of the events through the pipelines is started by `toPromise`.
4. The data fans out through all the pipelines and the processing concludes when all the units of work have flowed through and merged back together.

But take care to assemble a cohesive set of pipelines into a single function. For example, a _listener_ function in a BFF service will typically consume events from Kinesis and the various pipelines will `materialize` different entities from the events into a DynamoDB table to implement the _CQRS_ pattern. Then the _trigger_ function of the BFF service will consume events from the DynamoDB table, as `mutations` are invoked in the `graphql` function, and these pipelines will `publish` events to the Kinesis stream to implement the _Event Sourcing_ pattern. _(see Flavors below)_

>Pipelines also help optimize utilization by giving a function more things to do while it waits on async-non-blocking-io calls _(see Parallel below)_. Run `test/unit/pipelines/coop.test.js` to see an example of _cooperative programming_ in action.

## Flavors
Many of the pipelines we write follow the exact same steps and only the filters and data mapping details are different. We can package these pipeline _flavors_ into reusable pipelines that can be configured with `rules`.

The following _flavors_ are included and you can package your own into libaries.
* `materialize` - used in `listener` functions to materialize an `entity` from an `event` into a DynamoDB single table
* `cdc` - used in `trigger` functions to `publish` events to Kinesis as entities are maintained in a DynamoDB single table
* `collect` - used in `listener` functions to collect events in a micro event store for complex event processing
* `correlate` - used in `trigger` functions to correlate related events for complex event processing
* `evaluate` - used in `trigger` functions to run rules against correlated events and produce higher-order events
* `expire` - used in `trigger` functions to emit `expired` events when a TTL is reacted
* more to be ported soon

Here is an example of initializing pipelines from rules. Note that you can initialize one-off pipelines along side rule-driven pipelines.

```javascript
import { initializeFrom } from 'aws-lambda-stream';

const PIPELINES = {
  pipeline1,
  pipeline2,
  ...initializeFrom(RULES),
};
```

Here are some example rules. The `id`, `flavor`, and `eventType` fields are required. The remaining fields are defined by the specified pipeline flavor. You can define functions inline, but it is best to implement and unit test them separately.

```javascript
import { materialize } from 'aws-lambda-stream';

const RULES = [
  {
    id: 'p1',
    flavor: materialize,
    eventType: /thing-(created|updated)/,
    toUpdateRequest,
  },
  {
    id: 'p2',
    flavor: materialize,
    eventType: 'thing-deleted',
    toUpdateRequest: toSoftDeleteUpdateRequest,
  },
  {
    id: 'p3',
    flavor: materialize,
    eventType: ['something-created', 'something-updated'],
    toUpdateRequest: (uow) => ({ ... }),
  },
];
```
* `id` - is a unqiue string
* `flavor` - the function that implements the pipeline flavor
* `eventType` - a regex, string or array of strings used to filter on event type
* `toUpdateRequest` - is a mapping function expected by the `materialize` pipeline flavor

## Logging
The [debug](https://www.npmjs.com/package/debug) library is used for logging. When using pipelines, each pipeline is given its own instance and it is passed in with the pipeline configuration options and it is attached to the `uow` for easy access. They are named after the pipelines with a `pl:` prefix.

This turns on debug for all pipelines.

`cli> DEBUG=pl:*`

This turns on debug for a specific pipeline.

`cli> DEBUG=pl:pipeline2`

Various print utilities are provided, such as: `printStartPipeline` and `printEndPipeline`.

## Utilities
Here are some highlights of utiltities that are available in this library or Highland.js.

### Backpressure
Unlike imperative programming, functional reactive programming with streams provides natural backpressure because it is pull oriented. In other words, a slow downstream step will not pull the next upstream record until it is finished processing the current record. This helps us avoid overwhelming downstream services and systems.

However, this does not hold true for services, like DynamoDB, that return throttling errors. In these cases we can use the Highland.js [rateLimit](https://caolan.github.io/highland/#ratelimit) feature to provide explicit backpressure.

```javascript
  ...
  .rateLimit(2, 100) // 2 per 100ms
  .through(update)
  ...
```

### Parallel
Asynchronous Non Blocking IO is probably the most important feature for optimizing throughput. The Highland.js [parallel](https://caolan.github.io/highland/#parallel) feature allows us to take full control. When using this feature, upstream steps will continue to be executed while up to N asyc requests are waiting for responses. This feature along with `pipelines` allows us to optimize the utilization of every lambda invocation.

```javascript
  ...
  .map(makeSomeAsyncCall)
  .parallel(8)
  ...
```

This is usually the first parameter I tweak when tuning a function. Environment variables, such as `UPDATE_PARALLEL` and `PARALLEL` are used for experimenting with different settings.

>Here is a post on _queuing theory_ that helps put this in perspective: [What happens when you add another teller?](https://www.johndcook.com/blog/2008/10/21/what-happens-when-you-add-a-new-teller)

This feature is baked into the DynamoDB `update` and Kinesis `publish` utilities.

### Batching
Many `aws-sdk` operations support batching multiple requests into a single call. This can help increase throughput by reducing aggregate network latency.

The Highland.js [batch](https://caolan.github.io/highland/#batch) feature allows us to easily collect a batch of requests. The `toBatchUow` utility provided by this library formats these into a batch unit of work so that we can easily raise a `fault` for a batch and `resubmit` the batch.

```javascript
  ...
  .batch(10)
  .map(toBatchUow)
  .map(makeSomeAsyncCall)
  ...
```

However, be aware that most of the aws-sdk batch apis do not succeed or fail as a unit. Therefore you either have to selectively retry the failed requests and/or ensure that these calls are idempotent. Therefore I usually try to first optimize using the `parellel` feature and then move onto `batch` if needs be.

### Grouping / Reducing
Another way to increase throughput is by grouping related events and thereby reducing the number external calls you will need to make. The Highland.js [group](https://caolan.github.io/highland/#group) feature allows us to easily group related records.  The `toGroupUows` utility provided by this library formats these into batched units of work so that we can easily raise a `fault` for a group and `resubmit` the group.

```javascript
  ...
  .group(uow => uow.event.partitionKey)
  .flatMap(toGroupUows)
  ...
```

## Other
There are various other utilities in the utils folder.
* `now` - wraps `Date.now()` so that it can be easily mocked in unit tests
* `ttl` - calculates `ttl` based on a start epoch and a number of days

## EventBridge Support
* `fromEventBridge` - creates a stream from an EventBridge record
  * `toEventBridgeRecord` - is a test helper for creating an EventBridge record from a test event
* `Connector` - connector for the EventBridge SDK
* `publishToEventBridge` - stream steps for publishing events to EventBridge

>Note: The default configuration, as defined in `utils/opt`, is to publisher to an AWS EventBridge custom bus and route the events to one or more streams or other targets. This approach, referred to as the _Event Hub_, provides maximum flexibility. The bus also routes all events to an _Event Lake_ via AWS Firehose to create a perpetual audit of all events.

## Kinesis Support
* `fromKinesis` - creates a stream from Kinesis records
  * `toKinesisRecords` - is a test helper for creating Kinesis records from test events
* `Connector` - connector for the Kinesis SDK
* `publishToKinesis` - stream steps for publishing events to Kinesis

## DynamoDB Support
* `fromDynamodb` - creates a stream from DynamoDB Stream records
  * `toDynamodbRecords` - is a test helper for creating DynamoDB Stream records from test events
* `Connector` - connector for the DynamoDB SDK
* `update` - stream steps for updating rows in a single DynamoDB table
* `updateExpression` - creates an expression from a plain old json object
  * see _Mapping_ above
* `timestampCondition` - creates an expression for performing _inverse oplocks_

In addition:
* `single table` support is provided in `fromDynamodb` based on the `discriminator` field
* `latching` support is provided in `fromDynamodb` based on the `latched` field
* `soft delete` support is provided in `fromDynamodb` based on the `deleted` field
* `global table` support is provided in `fromDynamodb` based on the `aws:rep:updateregion` field
  * _note this may not be needed in the latest version of global tables_

> Look for future blog posts on `dynamodb single tables`, `latching`, `soft-deletes` and `oplock-based-joins`.

## S3 Support
These features are intended for implementing intra-service logic.
* `fromS3` - creates a stream from an S3 notification
  * `toS3Records` - is a test helper for creating S3 records from test messages
* `Connector` - connector for the S3 SDK
* `putObjectToS3` - stream steps to put an object in a bucket


## SNS Support
These features are intended for implementing intra-service logic.
* `fromSns` - creates a stream from an SNS topic
  * `toSnsRecords` - is a test helper for creating SNS records from test messages
* `Connector` - connector for the SNS SDK
* `publishToSns` - stream steps to publish a message to a topic

## SQS Support
These features are intended for implementing intra-service logic. They are frequently combined with the SNS and S3 support. See the unit tests for an example of S3 wrapped in SNS wrapped in SQS.
* `fromSqs` - creates a stream from an SQS queue
  * `toSqsRecords` - is a test helper for creating SQS records from test messages
* `Connector` - connector for the SQS SDK
* `sendToSqs` - stream steps to send a message to a queue

## Encryption Support
* https://github.com/jgilbert01/aws-lambda-stream/issues/20

## Metrics Support
AWS Lambda provides various metrics that help us gauge the performance of our stream processor functions. For example, `Iterator Age` tells us if we have an unhandled error or if we are not processing events fast enough. However, to tune our pipelines we need more fine-grained metrics. This is where the metrics feature comes into play.

> Note: It will be counter intuitive at first, but your biggest performance gains will most likely come from minimizing wait time. So play close attention the `channel.wait` and `io.wait` metrics.

To enable and control the metrics feature we use the `process.env.METRICS` environment variable.

```
environment:
  METRICS: true or any value
```

This will enable the essential metrics:
* `stream.batch.utilization` is the incoming batch size divided by the possible `process.env.BATCH_SIZE`. If the average is consistently above 70% you may be falling behind. see [Little's Law](https://en.wikipedia.org/wiki/Little%27s_law) and [Chapter 4](https://www.amazon.com/Software-Architecture-Patterns-Serverless-Systems/dp/1803235446)
* `stream.uow.count` is the number of Units of Work (uow) flowing through the function per invocation
* `stream.pipeline.utilization` is the percentage of work performed by a pipeline verses others
* `stream.channel.wait.time` is a pipeline specific version of `Iterator Age`. High wait time may indicate a need for more `shards` or `parallelization`.
* `stream.pipeline.time` is the total time it takes a uow to flow through a pipeline. NOTE: this value includes the `stream.channel.wait.time` to highlight the true processing latency

```
environment:
  METRICS: emf,xray
```
* `emf` enables logging of the metrics using the [CloudWatch Embedded Mertric Format](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Embedded_Metric_Format_Specification.html)
  * future enhancements may include similar support for `datadog` and other tools
* `xray` enables AWS Xray support

```
environment:
  METRICS: emf,xray,metrics:*
```
Including `*` enables all detailed metrics. Or individual detailed metrics can be enabled:

```
  METRICS: emf,xray,metrics:step
```
This will enable metrics for the IO steps within the pipelines:
* `stream.pipeline.io.wait.time` is the amount of time an IO step waits for parallel capacity. Consistently high wait times may indicate that the `parallel` setting is too low or the function needs more IO capacity (aka higher function `memorySize`)
* `stream.pipeline.io.time` is the amount of time an IO step took once it finsihed waiting

```
  METRICS: emf,xray,metrics:compact,metrics:step
```
This will add the metrics for the `compact` feature if you are using it:
* `stream.pipeline.compact.count` is the number of uow that were compacted into one uow by partition key

```
  METRICS: emf,xray,metrics:size
```
This will add detailed metrics regarding the publishing of events:
* `stream.pipeline.batchSize.count` is the number of events sent to the bus per batch request
* `stream.pipeline.eventSize.bytes` is the size of the events sent to the bus

### Namespace
Use `process.env.NAMESPACE` to set the namespace for CloudWatch metrics

### Tags/Dimensions
All metrics include the following tags:
* `account` is the name of your account, such as subsys1-nonprd, subsys3-prd
* `region` is self explanatory, such as us-east-1, us-west-2, etc
* `stage` is the environment, such dev, qa, prd
* `source` is the service name
* `functionname` is self explanatory

The `pipeline` and `step` specific metrics covered above include these tags as well:
* `pipeline` is the pipeline/rule id
* `step` is the step name within a pipeline, such as save, query, get, publish

## Validation
* https://github.com/jgilbert01/aws-lambda-stream/issues/22

## Links
The following links contain additional information:
* [Highland.js](https://caolan.github.io/highland) documentation
* My [Blog](https://medium.com/@jgilbert001) covers many topics such as _System Wide Event Sourcing & CQRS_

## Project Templates
The following project templates are provided to help get your event platform up and running: https://github.com/jgilbert01/templates

* event-hub
* event-lake-s3
* event-fault-monitor
* and more...

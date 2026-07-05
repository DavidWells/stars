---
repo: sensedeep/custom-metrics
url: 'https://github.com/sensedeep/custom-metrics'
homepage: null
starredAt: '2024-12-27T05:20:41Z'
createdAt: '2023-08-18T03:44:02Z'
updatedAt: '2025-01-28T04:46:38Z'
language: TypeScript
license: MIT
branch: main
stars: 9
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:53:37.335Z'
description: CustomMetrics for AWS without the cost
tags: []
---

# CustomMetrics

![CustomMetrics](https://www.sensedeep.com/images/metrics.png)

## Low cost, fast, simple, scalable metrics for AWS

<!--
[![Build Status](https://img.shields.io/github/actions/workflow/status/sensedeep/custom-metrics/build.yml?branch=main)](https://img.shields.io/github/actions/workflow/status/sensedeep/custom-metrics/build.yml?branch=main)
[![npm](https://img.shields.io/npm/v/custom-metrics.svg)](https://www.npmjs.com/package/custom-metrics)
[![npm](https://img.shields.io/npm/l/custom-metrics.svg)](https://www.npmjs.com/package/custom-metrics)
[![Coverage Status](https://coveralls.io/repos/github/sensedeep/custom-metrics/badge.svg?branch=main)](https://coveralls.io/github/sensedeep/custom-metrics?branch=main)
-->

CustomMetrics is a NodeJS library to emit and query custom metrics for AWS apps. 

It provides more efficient, scalable metrics that are dramatically less expensive and faster than standard AWS CloudWatch metrics. 

## Background

AWS CloudWatch offers metrics to monitor AWS services and your apps. Unfortunately, custom AWS CloudWatch metrics can be very expensive. If updated or queried regularly, each each custom AWS CloudWatch metric may cost up to $3.60 per metric per year with additional costs for querying. If you have many metrics or high dimensionality on your metrics, this can lead to a very large CloudWatch Metrics bill. This high cost prevents using metrics liberally in your app at scale.

**CustomMetrics** provides lower cost metrics that are dramatically less expensive and faster than standard AWS CloudWatch metrics.  
 
> CustomMetrics is up to 1000x times less expensive per metric than CloudWatch. 

CustomMetrics achieves these savings by supporting **latest** period metrics. i.e. last day, last month, last hour, last 5 minutes etc. This enables each metric to be saved in a single DynamoDB item, and can be stored and queried fast, with minimal cost.

CustomMetrics stores metrics to a DynamoDB table of your choosing that can coexist with existing application data.

![Dashboard](./doc/dashboard.avif)

## CustomMetrics Features

-   Simple one line API to emit metrics from any NodeJS TypeScript or JavaScript app.
-   Similar metric model to AWS CloudWatch metrics supporting namespaces, metrics, dimensions, statistics and intervals.
-   Computes statistics for: average, min, max, count and sum.
-   Computes P value statistics with configurable P value resolution.
-   Supports default metric intervals of: last 5 mins, hour, day, week, month and year.
-   Supports querying from arbitrary start dates for most recent period.
-   Configurable custom intervals for higher or different metric intervals.
-   Fast and flexible metric query API.
-   Query API can return data points or aggregate metric data to a single statistic.
-   Scalable and supports many simultaneous clients emitting metrics.
-   Stores data in any existing DynamoDB table and coexists with existing app data.
-   Supports multiple services, apps, namespaces and metrics in a single DynamoDB table.
-   Extremely fast initialization time.
-   Written in TypeScript with full TypeScript support.
-   Clean, readable, small, TypeScript code base (~1.4K lines).
-   No external dependencies.
-   [DynamoDB Onetable](https://www.npmjs.com/package/dynamodb-onetable) uses CustomMetrics for detailed single table metrics. [EmbedThis Ioto](https://www.embedthis.com/) uses CustomMetrics for IoT metrics.

![Custom Metrics](./doc/dashboard-dark.avif)

## Quick Tour

Install the library using npm:

    npm i custom-metrics

Import the CustomMetrics library. If you are not using ES modules or TypeScript, use `require` to import the library.

```javascript
import {CustomMetrics} from 'CustomMetrics'
```

Next create and configure the CustomMetrics instance by nominating the DynamoDB table and key structure to hold your metrics. 

```javascript
const metrics = new CustomMetrics({
    table: 'MyTable',
    region: 'us-east-1',
    primaryKey: 'pk',
    sortKey: 'sk',
})
```

Metrics are stored in the DynamoDB database referenced by the **table** name in the desired region. This table can be your existing application DynamoDB table and metrics can safely coexist with your data.

The **primaryKey** and **sortKey** are the primary and sort keys for the main table index. These default to 'pk' and 'sk' respectively. CustomMetrics does not support tables without a sort key.

If you have an existing AWS SDK V3 DynamoDB client instance, you can use that with the CustomMetrics constructor. This will have slightly faster initialization time than simply providing the table name.

```javascript
import {DynamoDBClient} from '@aws-sdk/client-dynamodb'
const dynamoDbClient = new DynamoDBClient()
```

```javascript
const metrics = new CustomMetrics({
    client: myDynamoDbClient,
    table: 'MyTable',
    region: 'us-east-1',
    primaryKey: 'pk',
    sortKey: 'sk',
})
```

## Emitting Metric Data

You can emit metrics via the `emit` API:

```javascript
await metrics.emit('Acme/Metrics', 'launches', 10)
```

This will emit the `launches` metric in the `Acme/Metrics` namespace with the value of **10**. 

A metric can have dimensions that are unique metric values for specific instances. For example, we may want to count the number of launches for a specific rocket.

```javascript
await metrics.emit('Acme/Metrics', 'launches', 10, [
    {rocket: 'saturnV'}
])
```

The metric will be emitted for each dimension provided. A dimension may have one or more properties. A metric can also be emitted for multiple dimensions. 

If you want to emit a metric over all dimensions, you can add {}. For example:

```javascript
await metrics.emit('Acme/Metrics', 'launches', 10, [
    {}, 
    {rocket: 'saturnV'}
])
await metrics.emit('Acme/Metrics', 'launches', 10, [
    {}, 
    {rocket: 'falcon9'}
])
```

This will emit a metric that is a total of all launches for all rocket types.

## Query Metrics

To query a metric, use the `query` method:

```javascript
let results = await metrics.query('Acme/Metrics', 'speed', {
    rocket: 'saturnV'
}, 86400, 'max')
```

This will retrieve the `speed` metric from the `Acme/Metrics` namespace for the `{rocket == 'saturnV'}` dimension. The data points returned will be the maximum speed measured over the day's launches (86400 seconds). Intervals that have no data will have points set to {count: 0, value: 0, timestamp}. Use {} for the all-dimensions value.

This will return data like this:

```json
{
    "namespace": "Acme/Metrics",
    "metric": "launches",
    "dimensions": {"rocket": "saturnV"},
    "period": 300,
    "points": [{
        "period": 3600,
        "samples": 10,
        "points": [
            { "value": 24000, "count": 19, "timestamp": 1715298000 },
            ...
        ]
    }]
}
```

If you want to query the results as a single value over the entire period (instead of as a set of data points), set the `accumulate` options to true.

```javascript
let results = await metrics.query('Acme/Metrics', 'speed', {
    rocket: 'saturnV'
}, 86400, 'max', {accumulate: true})
```

This will return a single maximum speed over the last day.

The following will do the same but from a specific start date.

```javascript
let results = await metrics.query('Acme/Metrics', 'speed', {
    rocket: 'saturnV'
}, 28 * 86400, 'max', {accumulate: true, start: new Date(2000, 0, 1).getTime()})
```

To query multiple metrics, use the `queryMetrics` method. This will query all dimensions for a metric and 
return a list of metric results for all dimensions. Note: this will not flush buffered metric values before computing the results.

```javascript
let results = await metrics.queryMetrics('Acme/Metrics', 'speed', 86400, 'avg')
```


To obtain a list of metrics, use the `getMetricList` method:

```typescript
let list: MetricList = await metrics.getMetricList()
```

This will return an array of available namespaces in **list.namespaces**.

To get a list of the metrics available for a given namespace, pass the namespace as the first argument.

```typescript
let list: MetricList = await metrics.getMetricList('Acme/Metrics')
```

This will return a list of metrics in **list.metrics**. Note: this will return the namespaces and metrics for any namespace that begins with the given namespace. Consequently, all namespaces should be unique and not be substrings of another namespace.

To get a list of the dimensions available for a metric, pass in a namespace and metric.

```typescript
let list: MetricList = await metrics.getMetricList('Acme/Metrics', 'speed')
```

This will also return a list of dimensions in **list.dimensions**.

## Metrics Scoping

You can scope metrics by chosing unique namespaces for different applications or services, or by using various dimensions for applications/services. This is the preferred design pattern.

You can also scope metrics by selecting a unique `owner` property via the CustomMetrics constructor. This property is used, in the primary key of metric items. This owner defaults to **'default'**.

```javascript
const cartMetrics = new CustomMetrics({
    owner: 'cart',
    table: 'MyTable',
    primaryKey: 'pk',
    sortKey: 'sk',
})
```

## Limitations

If you are updating metrics extremely frequently, CustomMetrics can impose a meaningful DynamoDB write load as each metric update will result in one database write. If you have very high frequency metric updates, consider using [Metric Buffering](#buffering) to buffer and coalesce metric updates.

### CustomMetrics Class API

The CustomMetrics class provides the public API for CustomMetrics and public properties.

### CustomMetrics Constructor

```javascript
const metrics = new CustomMetrics({
    owner: 'my-service',
    primaryKey: 'pk',
    region: 'us-east-1',
    sortKey: 'sk',
    table: 'MyTable',
})
```

The CustomMetrics constructor takes an options parameter and an optional context property.

The `options` parameter is of type `object` with the following properties:

| Property | Type | Description | 
| -------- | :--: |------------ |
| buffer | `object` | Buffer metric emits. Has properties: {count, elapsed, sum}
| client | `object` | AWS DynamoDB client instance. Optional. If not specified, a client is created using the `table`, `creds` and `region` options.
| consistent | `boolean` | Use DynamoDB consistent reads. Default false.
| creds | `object` | AWS credentials to use when accessing the table. Not required if client supplied.
| expires | `string` | Name of the DynamoDB TTL expiry attributes. Defaults to 'expires'.
| log | `boolean | object` | Set to true for default logging or provide a logging object with methods for 'info', 'error' and 'trace'. Default to null.
| owner | `string` | Unique owner of the metrics. This is used to compute the primary key for the metric data item.
| prefix | `string` | Primary and sort key prefix to use. Defaults to 'metric#'.
| pResolution | `number` | Number of values to store to compute P value statistics. Defaults to zero.
| primaryKey | `string` | Name of the DynamoDB table primary key attribute. Defaults to 'pk'.
| region | `string` | AWS region containing the table. Required if not the current region. Defaults to null.
| sortKey | `string` | Name of the DynamoDB table sort key attribute. Defaults to 'sk'.
| source | `string` | Reserved.
| spans | `array` | Array of span definitions. See below.
| table | `string` | Name of the DynamoDB table to use. (Required)
| ttl | `number` | Maximum lifespan of the metrics in seconds.
| type | `{[type]: "Model"}` | Define a type field in metric items for single table designs. Defaults to {_type: 'Metric'}.

For example:

```javascript
const metrics = new CustomMetrics({
    table: 'MyTable',
    region: 'us-east-1',
    primaryKey: 'pk',
    sortKey: 'sk',
    owner: 'my-service',
    pResolution: 100,
    ttl: 6 * 24 * 86400,
    log: true,
})
```

CustomMetric spans define how each metric is processed and aged. The spans are an ordered list of metric interval periods. 

The default spans will store statistics for the periods: 5 minutes, 1 hour, 1 day, 1 week, 1 month and 1 year. 

Via the `spans` CustomMetrics constructor you can provide an alternate list of spans for higher, lower or more granular resolution.

The default CustomMetrics spans are:

```typescript
const DefaultSpans: SpanDef[] = [
    {period: 5 * 60, samples: 10}, //  5 mins, interval: 30 secs
    {period: 60 * 60, samples: 12}, //  1 hr, interval: 5 mins
    {period: 24 * 60 * 60, samples: 12}, //  24 hrs, interval: 2 hrs
    {period: 7 * 24 * 60 * 60, samples: 14}, //  7 days, interval: 1/2 day
    {period: 28 * 24 * 60 * 60, samples: 14}, //  28 days, interval: 2 days
    {period: 365 * 24 * 60 * 60, samples: 12}, //  1 year, interval: 1 month
]
```

The span `period` property is the number of seconds in that span. The `samples` property specifies the number of data points to be captured. If you call emit() more frequently than the `period/samples` interval, CustomMetrics will agregate the extra values into the relevant span point value.

Here is an example of a higher resolution set of spans that keep metric values for 1 minute, 5 minutes, 1 hour and 1 day.

```typescript
const metrics = new CustomMetrics({
    table: 'mytable',
    spans: [
        {period: 1 * 60, samples: 5}, //  interval: 5 secs
        {period: 5 * 60, samples: 10}, //  interval: 30 secs
        {period: 60 * 60, samples: 12}, //  interval: 5 mins
        {period: 24 * 60 * 60, samples: 12}, //  interval: 2 hrs
    ]
})
```

#### Upgrading Metric Spans

If you want to change your spans in the future, you can upgrade your metric data with new spans. To do this, you can use the `upgrade` method. This will apportion data points from the old spans to the new spans based on the point's timestamp. The **upgrade** call takes the namespace, metric name and specific dimensions to upgrade. 

You can also upgrade metrics by providing an **upgrade: true** parameter to the emit calls.

If you define new spans via the constructor and do not call upgrade, your new metrics will use the new spans and the old metrics will utilize the old spans. Query will still work, and CustomMetrics will return metrics according to the spans in use when the metric was first created. 

The **upgrade** API and emit **upgrade** option are idempotent in that there is no ill effects from upgrading a metric that is already upgraded. The emit call will only upgrade if an upgrade is required.

If you do use custom span definitions, ensure you supply the custom span definition to all your constructor calls going forward. Otherwise, the default spans will be used for any new metrics.

```typescript
const metrics = new CustomMetrics({
    table: 'mytable',
    //  New spans
    spans: [
        {period: 24 * 60 * 60, samples: 24},
        {period: 7 * 24 * 60 * 60, samples: 28},
        {period: 28 * 24 * 60 * 60, samples: 28},
        {period: 365 * 24 * 60 * 60, samples: 48},
    ]
})
await metrics.upgrade('Acme/Metrics', 'launches', 
    [{}, {rocket: 'saturnV'}, {mission: 'ISS-service'}])

// or
await metrics.emit('Acme/Metrics', 'launches', 5,
    [{}, {rocket: 'saturnV'}, {mission: 'ISS-service'}])

```

## Logging

If the `log` constructor option is set to true, CustomMetrics will log errors to the console. If set to "verbose", CustomMetrics will also trace metric database accesses to the console.

Alternatively, the `log` constructor can be set to a logging object such as [SenseLogs](https://www.npmjs.com/package/senselogs) that provides `info`, `error` and `trace` methods.

## Buffering

If your app emits metrics at a very high frequency, you may wish to optimize metrics by aggregating metric database updates. CustomMetrics can optimize metric updates by buffering emit calls. These are then persisted according to a buffering policy.

For example:

```javascript
await metrics.emit('Acme/Metrics', 'DataSent', 123, [], {
    buffer: {sum: 1024, count: 20, elapsed: 60}
})
```

This example will buffer metric updates in-memory until the sum of buffered `DataSent` is greater than 1024, or there have been 20 calls to emit, or 60 seconds has elapsed, whichever is reached first. If the `elapsed` property is not provided, the default elapsed period is the data point interval of the lowest span (default 30 seconds).  CustomMetrics will regularly flush metrics as required.

You can also flush metrics manually by calling `flush` to flush metrics for an instance or `flushAll` which flushes metrics for all CustomMetrics instances.

```javascript
await metrics.flush()
await CustomMetrics.flushAll()
```

If you configure a Lambda layer (any layer will do), CustomMetrics will save buffered metrics upon Lambda instance termination. Unfortunately, Lambda will only send a termination signal to lambdas that utilize a Lambda layer.

Buffered metrics may be less accurate than non-buffered metrics. Metrics may be retained in-memory for a period of time (as specified by the emit option.buffer parameter) before being flushed to DynamoDB. If a Lambda instance is not required to service a request, any buffered metrics will remain in-memory until the next request or when AWS terminates the Lambda -- whereupon the buffered values will be saved. This may mean a temporary loss of accuracy to querying entities.

Furthermore, if you have a very large number of metrics in one Lambda instance, it is possible that the Lambda instance may not be able to save all buffered metrics during Lambda termination. This can be somewhat mitigated by using shorter buffering criteria.

For these reasons, don't use buffered metrics if you require absolute precision. But if you do have metrics where less than perfect accuracy is acceptable, then buffered metrics can give very large performance gains with minimal loss of precision.

## Methods

### emit

Emit one or more metrics.

```typescript
async emit(namespace: string, 
    metric: string, 
    value: number, 
    dimensions: MetricDimensionsList = [{}],
    options?: {
        buffer: {
            sum: number, 
            count: number, 
            elapsed: number,
        },
        log: boolean,
    }): Promise<Metric>
```

This call will emit metrics for each of the specified dimensions using the supplied namespace and metric name. These will be combined with the CustomMetrics owner supplied via the constructor to scope the metric. 

For example:

```typescript
await metrics.emit('Acme/Metrics', 'launches', 10, 
    [{}, {rocket: 'saturnV'}, {mission: 'ISS-service'}])
```

This will create three metrics:
|Namespace|Metric|Dimensions|
|-|-|-|
|Acme/Metrics|launches|All|
|Acme/Metrics|launches|rocket == saturnV|
|Acme/Metrics|launches|mission == ISS-service|

The `buffer` option can be provided to optimize metric load by aggregating calls to emit(). See [Buffering](#buffering) for details.

The `log` option if set to true, will emit debug trace to the console.

### query

Query a metric value.

```typescript
async query(namespace: string, 
    metricName: string, 
    dimensions: MetricDimensions, 
    period: number, 
    statistic: string, 
    options: MetricQueryOptions,
    Promise<MetricQueryResult>
```

This will retrieve a metric value for a given namespace, metric name and set of dimensions.

The `period` argument selects the best metric span to query. For example: 3600 for one hour. The period will be used by query to find the span that has the same or closest (and greater) period.

The `statistic` can be `avg`, `current`, `max`, `min`, `sum`, `count` or a P-value of the form `pNN` where NN is the P-value. 

The returned data will contain the `namespace`, `metric`, `dimensions` and data `points` for the query. The data points array will contain data with `value`, `count`, `timestamp` properties.

The `avg`, `max` and `min` statistics compute the average, maximum and minimum value for each span data point. The `current` statistic uses the most recent value for each span data point and is useful when used with the `accumulate` option to return the most recent value of a metric.

The `sum` statistic returns the summation of the values for each span data point and the `count` statistic returns the number of values for a span data point. 

For a P-value metric example: p95 would return the P-95 value. To get meaningful P-value statistics you must set the CustomMetrics pResolution parameter to the number of data points to keep for computing P-values. By default this resolution is zero, which means P-values are not computed. To enable, you should set this to at least 100.

The `options` map can modify the query. If `options.accumulate` is true, all points will be aggregated and a single data point will be returned that will represent the desired statistic for the requested period.

If `options.owner` is provided, it overrides the default owner or the `owner` given to the CustomMetrics constructor. 

If `options.id` is provided, the ID will be returned in the corresponding result items. This can help to correlate parallel queries with results.

If `options.log` is set to true, this will emit debug trace to the console.

If `options.start` is set to a date, the query will return data starting at that date for the requested period.

To optimize performance and data resolution, query point data has timestamps aligned on span boundaries. This means that your point timestamps, including the last point's timestamp will not generally align with the current time, but will be advanced to align with stored span's boundaries. 

The timestamp for the last data point will not be greater than the current time and so the last data point may be shorter duration than previous points.

### getMetricList

Return a list of supported namespaces, metrics and dimensions.

```typescript
async getMetricList(
    namespace: string | undefined, 
    metric: string | undefined, 
    options = {fields, limit}): Promise<MetricList>
```

This call will return a MetricList of the form:

```typescript
type MetricList = {
    namespaces: string[]
    metrics?: string[]
    dimensions?: MetricDimensions[]
}
```

If a namespace argument is provided, the list of metrics in that namespace will be returned. If a metric argument is provided, the list of dimensions for that metric will be returned.


## Metric Schema

CustomMetrics are stored in a DynamoDB table using the following single-table schema. Metrics are stored as a single, compressed DynamoDB item. 

The metric namespace, metric name and dimensions are encoded in the sort key to minimize space. The primary key encodes the metric owner to support multi-tenant security of items.

| Field | Attribute | Encoding | Notes |
| - | - | - | - |
| primaryKey | primaryKey | ${prefix}#${version}#${owner} |
| sortKey | primaryKey | ${prefix}#${namespace}#${metric}#${dimensions} |
| expires | expires | number | Time in seconds when for DynamoDB auto removal |
| spans | spans | string | Array of time spans |


The metric spans are encoded as:

| Field | Attribute | Encoding | Notes |
| - | - | - | - |
end | se | number | Time in seconds of the end of the last point in the span
period | sp | number | Span period in seconds
samples | ss | number | Number of data points in the span
points | pt | array | Data points 

The span points are encoded as:

| Field | Attribute | Encoding | Notes |
| - | - | - | - |
count | c | number | Count of the values in sum
sum | s | number | Sum of values
max | x | number | Maximum value seen
min | m | number | Minimum value seen
pvalues | v | array | P values

Here is what a metric item looks like:

```javascript
{
    pk: `metric#${version}#${owner}`,
    sk: `metric#${namespace}#${metric}#${dimensions}`,
    expires: Number,        // Time in seconds since Jan 1, 1970 when the item expires
    spans: [
        {
            se: Number,     // Span End -- Time in seconds for the end of this span
            sp: Number,     // Span Period -- Time span period in seconds
            ss: Number,     // Span Samples -- Number of points in this span
            pt: [
                c: Number,  // Count of data measurments in this data point
                x: Number,  // Maximum value in this point
                m: Number,  // Minimum value in this point
                s: Number,  // Sum of values in this point (Divide by c for average)
            ]
        }, ...
    ],
    seq: Number,            // Update sequence number for update collision detection
    _type: "Metric"         // Item type for Single Table design patterns
}
```

Data from shorter spans are propagated lazily to longer spans when the span points become full. This is done during emit and flush only. Queries will flush buffered metrics for the matching query to disk. Queries will propagate earlier span data points in-memory and will not otherwise update the on-disk representation.

The span.end marks the time of the end of the point bucket and is updated whenever a new data point is added to the span. Spans may have zero or more data points. The span.end values for the various spans are not ordered, correlated or coordinated between spans. 

### References

-   [DynamoDB OneTable](https://www.npmjs.com/package/dynamodb-onetable)
-   [SenseDeep Blog](https://www.sensedeep.com/blog/)
-   [SenseDeep Web Site](https://www.sensedeep.com/)
-   [SenseDeep Developer Studio](https://app.sensedeep.com/)

### Participate

All feedback, discussion, contributions and bug reports are very welcome.

-   [Discussions](https://github.com/sensedeep/custom-metrics/discussions)
-   [Issues](https://github.com/sensedeep/custom-metrics/issues)

### Blog Articles

Here is a collection of articles that can help you on your way with Custom Metrics

Topic|Link
-|-
Intro to Custom Metrics | [https://www.sensedeep.com/blog/posts/stories/custom-metrics.html](https://www.sensedeep.com/blog/posts/stories/custom-metrics.html)
Custom Metrics with IoT | [https://www.embedthis.com/blog/ioto/ioto-metrics.html](https://www.embedthis.com/blog/ioto/ioto-metrics.html).


### Contact

You can contact me (Michael O'Brien) on Twitter at: [@mobstream](https://twitter.com/mobstream), and read my [Blog](https://www.sensedeep.com/blog).


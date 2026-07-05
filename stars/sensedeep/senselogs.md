---
repo: sensedeep/senselogs
url: 'https://github.com/sensedeep/senselogs'
homepage: null
starredAt: '2022-03-25T22:57:41Z'
createdAt: '2021-07-16T04:09:47Z'
updatedAt: '2025-02-07T01:39:35Z'
language: TypeScript
license: MIT
branch: main
stars: 19
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:53.507Z'
description: 'Simple, flexible, dynamic, blazing fast logs designed for serverless.'
tags: []
---

![SenseLogs](https://www.sensedeep.com/images/senselogs.png)

*Observability without the crushing performance cost (6.5 times faster than Pino)*

<!--
[![Build Status](https://img.shields.io/github/actions/workflow/status/sensedeep/senselogs/build.yml?branch=main)](https://img.shields.io/github/actions/workflow/status/sensedeep/senselogs/build.yml?branch=main)
[![npm](https://img.shields.io/npm/v/senselogs.svg)](https://www.npmjs.com/package/senselogs)
[![npm](https://img.shields.io/npm/l/senselogs.svg)](https://www.npmjs.com/package/senselogs)
[![Coverage Status](https://coveralls.io/repos/github/sensedeep/senselogs/badge.svg?branch=main)](https://coveralls.io/github/sensedeep/senselogs?branch=main)
-->

**Extremely fast, dynamically controllable logging for serverless.**

SenseLogs is a simple, flexible, dynamic, blazing fast log library designed exclusively for serverless apps using NodeJS.

While there are many other good logging libraries that claim to be fast, they were not designed `for` serverless and so are bigger and slower than necessary.

Furthermore, serverless apps have special requirements like minimizing cold-start time, dynamic log filtering control without redeploying and being able to capture detailed context and request information without modifying your functions.

SenseLogs is designed to do this, simply and elegantly. SenseLogs makes it easy to instrument your code for maximum Observability without a crushing performance penalty.

## SenseLogs Features

* Emit log data with rich context for maximum Observability.
* Flexible log channels and filters.
* Dynamic log control to change log filters without redeploying.
* Emits logs in JSON with full context.
* Extremely fast initialization time to shorten cold-starts.
* Up to 7 times faster than the nearest alternative.
* Log sampling to emit increased logs for a percentage of requests.
* For local debugging, emits in human readable formats.
* Inheriting child log instances for per-module logging.
* Stack capture for uncaught exceptions.
* Easily emit CloudWatch custom metrics using EMF.
* Integrates with [SenseDeep](https://www.sensedeep.com) developer studio.
* Full TypeScript support.
* Clean, readable small code base (<500 lines).
* No dependencies.


## Quick Tour

Install the library using npm or yarn.

    npm i senselogs

Import the SenseLogs library. If you are not using ES modules or TypeScript, use `require` to import the library.

```javascript
import SenseLogs from 'senselogs'
```

Create and configure a logger.

```javascript
const log = new SenseLogs()
```

Then log with a message:

```javascript
log.info('Simple messsage')
log.error(`Request error for user: ${user.email}`)
```

You can also supply addition message context:

```javascript
log.error('Another log error message with context', {
    requestId: 1234,
    userId: '58b23f29-3f84-43ff-a767-18d83500dbd3'
})
```

This will emit

```json
{
    "message": "Another log error message with context",
    "requestId": 1234,
    "userId": "58b23f29-3f84-43ff-a767-18d83500dbd3"
}
```

SenseLogs organizes and filters log messages via channels which are names given to classify log message types.
Unlike other logging products, channels are not ordered like log levels. You can enable or disable any level at any time.

SenseLogs provides standard channels like: debug, error, warn and info. For example:

```javascript
log.error('Bad things happen sometimes')
log.error(new Error('Invalid request state'), {request})

log.debug('The queue was empty')
log.trace('Database request', {request})
```

You can extend upon this basic set of channels and use your own custom channels via the `emit` API. For example:

```javascript
log.emit('custom-channel', 'My custom channel')
log.emit('messaging-backend', 'Network error')
```

These channels are "zero-config" which means you do not need to pre-declare or define channels. Simply use them as you wish. Such custom channels are an ideal way to build "observability" into your app by defining latent logging commands that will only emit data when you enable those channels at runtime.

SenseLogs integrates with the [SenseDeep](https://www.sensedeep.com) serverless developer studio which can manage custom channels to enable and disable output at runtime without redeploying your serverless apps.


### Benchmarks

Because SenseLogs was designed exclusively for serverless, it does not carry unnecessary enterprise logging burdens and is blazing fast for serverless logging tasks.

Here are the results of benchmarks against the self-claimed fastest logger [Pino](https://github.com/pinojs/pino).

SenseLogs 6.5 times faster than the best alternative.

| Logger | Time | Code Size |
| -------- | :--: | ----------- |
| SenseLogs | 477 ms | 450 lines |
| Pino | 3,269 ms | 1281 lines |


### Output Format

By default, SenseLogs will emit log messages in JSON format. However, you can configure the logger to emit human readable output by setting the format to `human`. Tab-delimited format can be specified by setting the format to `tsv`. Key/Value format is specified via `keyvalue`

```javascript
const log = new SenseLogs({format: 'tsv'})
```

A custom formatting function can be specified via the `format` option which will be invoked and passed the combined log message context. The function should return the message to output without a trailing new line.

```javascript
format(context): string
```

By default, SenseLogs messages do not include a timestamp because Lambda and other services typically add their own timestamps. If you need a timestamp, set the `params.timestamp` to true in the SenseLogs constructor.


### Custom Destinations

You can supply additional destinations at any time via the `addDestination`. This is useful to ship your logs to other destinations or to transform and format the output as you please. Each destination may configure a log output format to use for that destination.

```javascript
log.addDestination({
    write: (logger, context, message) => message
}, 'human')
```

The addDestination APi takes a format option as its 2nd parameter. This is set to 'json' by default, but you can set to `human`, `tsv` or `keyvalue`. A destination write function may choose to write the pre-formatted `message` argument or it can perform custom formatting and use the raw context to create its own message to write.

Use the `setDestination` API to replace all destinations with a new single destination.

### Log Channels

SenseLogs defines the following default log channels: `assert`, `data`, `debug`, `error`, `fatal`, `info`, `metrics`, `trace`, `warn` and `silent`. These have corresponding log methods of the same name.

Log messages will be emitted when you call a log channel method AND that channel is enabled in the filter set. See filters below.

You can also use custom channels for modules or services in your application, or you can use channels for horizontal traits like `testing`. You don't need to pre-create the channel, simply use it with the `emit` method.

For example:

```javascript
//  Enable output for the auth channel
log.addFilter('auth')

//  Use the 'auth' channel
log.emit('auth', 'User Login', {user})
```

Here are some tips about when to use various channels:

* Assert - Code assertions via the `assert` method. This channel be enabled in dev builds.
* Data - Request response data. This channel is not enabled by default.
* Trace - Detailed information of a request or code module. This channel is not enabled by default. Consider using custom channels to better manage trace.
* Debug - Logging only during debugging. This channel is not enabled by default.
* Info - Generally useful information that will always be available in the logs.
* Metrics - Used to emit EMF custom metrics. Enabled by default.
* Warn - Conditions that may or may not qualify as errors and should be logged.
* Error - Any error which prevents the operation completing. These errors typically require user intervention to be recoverable.
* Fatal - Any critical error that cannot be recovered and requires immediate attention.
* Silent - A placeholder channel that is never emitted.

### Filtering

Log messages are emitted if the log channel is enabled in the current log filter.

The default log filter will emit messages for the `fatal`, `error`, `metrics`, `info` and `warn`, channels. The `data`, `debug` and `trace` channels will be hidden by default. However, you can change the channel filter via `addFilter` or `setFilter` at any time.

```javascript
log.addFilter(['data', 'debug'])
```

This will enable the output of log messages for the `data` and `debug` channels.


### Contexts

For true observability of your apps, it is recommended that you log full information regarding request state in anticipation of future monitoring needs.

Additional context information can be supplied when logging via the second parameter.

```javascript
log.info('Basic message', {
    //  Extra context
    event: lambda.event,
    context: lambda.context,
    requestId: apiGateway.requestId,
})
```

This per-API context is merged with the global logger context. When you create the logger, you can specify global context.

```javascript
const log = new SenseLogs({params}, {
    //  Global context properties
    weather: 'sunny',
    temp: 99.9,
})
```

Per-API context takes precedence over the global context if both contexts define the same value.

You can extend or clear the global context at anytime via `addContext` and `clearContext`:

```javascript
log.addContext({params})
log.clearContext()
```

SenseLogs accumlates all the context information into a single context that is passed to the log destinations for writing.

When coupled with custom channels, you can add detailed log messages to your serverless app that are ready to be enabled when you need them. Such latent log messages do not incurr any significant runtime CPU or I/O overhead.


### Child Instances

If you have modules or subsystems, it is often useful for them to derive their own child log instances which inherit context and channels from their parent instance. Then the child can modify the context and channels to suit.

```javascript
const child = log.child({
    module: 'authentication',
})

child.info('Start request')
```

This will log the given message with the child context and the context of all its parents.

Child instances can be created to any desired depth. i.e. a child can be created from a child instance.


### Correlation Trace IDs

If you are using AWS Lambda, SenseLogs supports the propagation of trace IDs by simply passing in the lambda `event` and `context` parameters. SenseLogs will extract the API Gateway requestId, Lambda requestId and X-Ray trace ID.

```
log.addTraceIds(event, context)
```

SenseLogs will map these IDs to a uniform x-correlation-NAME SenseLogs context variables. The following variables are supported:

x-correlation-api &mdash; API Gateway requestId
x-correlation-lambda &mdash; Lambda requestId
x-correlation-trace &mdash; X-Ray X-Amzn-Trace-Id header
x-correlation-extended &mdash; AWS extended request ID

SenseLogs will define a special variable 'x-correlation-id' that can be used as a stable request ID. It will be initialized to the value of the X-Correlation-ID header or if not defined, SenseLogs will use (in order) API Gateway request or X-Ray trace ID.

### Dynamic Logging

SenseLogs filtering can be dynamically controlled by calling `addFilter` or by setting environment variables for Lambda functions.

SenseLogs keeps three log filter sets:

* The default filter
* The override filter
* The sample filter

The default filter defines the base set of log channels that are enabled for output. The override set is added to the default set for a limited time duration. The sample set is added to the default set for a percentage of log requests.

The APIs to modifiy the filter sets are:

* setFilter
* setOverride
* setSample

The environment variables to configure the filter sets are:

* LOG_FILTER
* LOG_OVERRIDE
* LOG_SAMPLE

If you change these environment variables, the next time your Lambda function is invoked, it will be automatically loaded by AWS with the new environment variable values. In this manner, you can dynamically and immediately control your logging channels without modifying code or redeploying.

The [SenseDeep serverless studio](https://www.sensedeep.com) manages these filter settings and will update these environment variables on your Lambdas.


#### LOG_FILTER

The LOG_FILTER is read by the SenseLogs constructor to invoke `setFilter` to define the default log filter. Set it to a comma separated list of log channels. For example:

```shell
LOG_FILTER=fatal,error,info
```

#### LOG_OVERRIDE

The LOG_OVERRIDE is read by SenseLogs to invoke `setOverride` to define an override log filter that will apply for a limited duration of time. Set it to a comma separated list of log channels that is prefixed by an expiry time as a Unix epoch (seconds since Jan 1 1970). For example:

```shell
LOG_OVERRIDE=1626409530045:data,trace
```

### LOG_SAMPLE

The LOG_SAMPLE is used to invoke `setSample` to define an additional log filter that will apply for percentage of requests. Set it to a comma separated list of log channels that is prefixed by a percentage. For example:

```shell
LOG_SAMPLE=1%:trace
```

This will cause 1% of log requests to the given log channels to be logged. This is useful to ensure you have a complete trace of some requests at all times without needing to redeploy or reconfigure.


### CloudWatch Metrics and EMF

SenseLogs has integrated support to emit custom metrics to CloudWatch.

AWS CloudWatch understands the [Embedded Metric Format](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Embedded_Metric_Format_Specification.html) (EMF) where you can easily emit custom metrics to CloudWatch.

CloudWatch receives EMF metrics and dynamically creates and tracks metrics without prior configuration.

EMF is one of the hidden gems in CloudWatch.

```javascript
log.metrics('metrics', 'Acme Metrics', 'Acme/Rockets', {Launches: 1})
```

The metrics API take the log channel as the first parameter. This is typically set to `metrics` but can be any channel.
A custom CloudWatch metrics namespace as the next parameter and after that, the metric values and optionally metric dimensions.


### Exceptions and Error Handling

You can provide an Error() object to SenseLogs as the message, context or context.err property. For example:

```javascript
//  As a message
log.error(new Error('Boom'))

//  As a context
log.error('An error', new Error('Boom'))

try { throw new Error() }
catch (err) {
    //  As context.err
    log.error('Caught error', {err})
}
```

When SenseLogs receives an exception Error object, it will capture the stack trace and include that in the logged JSON as a '@stack' property.

You can request a stack backtrace be included in any log message by setting the `@stack: true` in the context.

```javascript
log.debug('Should never get here', {'@stack': true})
```

### Flagging Errors

If you are using an alerting platform like the [SenseDeep Serverless Studio](https://www.sensedeep.com/) to automatically detect your app errors, it can be helpful to add a searchable property for errors and other important application events. The flag option will nominate a property value that will be emitted in your log events for error channels.

For example:

```javascript
new SenseLogs({flag: 'FLAG_ERROR'})
log.error('Boom')
```

This will emit an 'FLAG_ERROR: true' property value for the `error` and `fatal` log message channels.

```json
{
    "message": "Boom",
    "FLAG_ERROR": true
}
```

Your alerting platform can then easily trigger alerts for messages that include the property `FLAG_ERROR`.

If the flag option is set to an map of channels, then the nominated channels will be flagged with the associated value string. For example:

```javavscript
new SenseLogs({flag: {warn: 'FLAG_WARN', error: 'FLAG_ERROR', custom: 'FLAG_CUSTOM'})
log.warn('Storm front coming')
```

This will emit:

```json
{
    "message": "Storm front coming",
    "FLAG_WARN": true
}
```

### Redacting Sensitive Information

You can modify log data to remove sensitive information before it is emitted by supplying your own redact function to the SenseLogs constructor.

```javascript
const log = new SenseLogs({redact: (context) => {
    if (context.password) {
        context.password = '[REDACTED]'
    }
}})
```

If you are using the [SenseDeep Serverless Developer Studio](https://www.sensedeep.com), you don't need to worry about redacting sensitive information as your log data never leaves your account.

But for all others, you can connect the redact function to any one of the NPM redaction modules. For example: [fast-redact](https://www.npmjs.com/package/fast-redact).


### SenseLogs Class API

The SenseLogs class provides the public API for SenseLogs and public properties.

### SenseLogs Constructor

```javascript
new SenseLogs(options, context = {})
```

The SenseLogs constructor takes an options parameter and an optional context property.

The `options` parameter is of type `object` with the following properties:

| Property | Type | Description |
| -------- | :--: | ----------- |
| destination | `string\|function` | Set to `json`, `console` or an instance of an object with a `write` function to be invoked as write(logger, context). Default to 'json'|
| filter | `string\|array` | Set to a comma separated list or array of log channels that are enabled. |
| flag | `string\|object` | Flag channel messages with a string for alert matching. If set to a string, error and fatal channel messages will get a property of that string name set to true. May be set to an object map of channel names and property values to set for those channel names. Default to null.|
| format | `string\|function` | Set to `json`, `human`, `tsv` or `keyvalue` for JSON, human-readable, tab-delimited or key-value formats. Set to a function for custom formats. Default to 'json'. |
| name | `string` | Name for your app or service. The context.@module is set to this value by default. |
| redact | `function` | Callback function invoked prior to passing the context data to the logger. Invoked as `callback(context)`|
| timestamp | `boolean` | Set to true to add a context.timestamp to the log context message.|

The `context` property is a map of context information that is included in all log messages.

For example:

```javascript
const log = new SenseLogs({
    destination: 'console',
    filter: 'fatal, error',
    format: 'json',
    name: 'MyApp',
    redact: (context) => {
        context.password = null
        return context
    },
    timestamp: true,
}, {context})
```


### Properties

SenseLogs creates some reserved properties on the log message context. These properties are prefixed with `@` to avoid clashing with your properties.

* @chan &mdash; Set to the log channel for the current log message (info, error, ...).
* @exception &mdash; Set if an `Error` object is passed to SenseLogs.
* @message &mdash; If a context.message is supplied in addition to the API message, the context message will be saved as `@message`.
* @module &mdash; Set to the `name` given to the SenseLogs constructor or the `@module` context property on a child instance.
* @stack &mdash; Set to a captured stack backtrace.

#### Channel Methods

The standard channels and method signatures are:

```typescript
    data(message: string, context: {}): void;
    debug(message: string, context: {}): void;
    error(message: string, context: {}): void;
    fatal(message: string, context: {}): void;
    info(message: string, context: {}): void;
    silent(message: string, context: {}): void;
    trace(message: string, context: {}): void;
    warn(message: string, context: {}): void;
    emit(channel: string, message: string, context: {}): void;
```

There is also an `assert` channel

```typescript
log.assert(truthy: boolean, message: string, context: {}): void;
```

You can use this as:

```javascript
log.assert(someValue == 'good value')
log.assert(someValue == 'good value', 'Should never get here', {request})
```

### Methods

#### addContext(contexts: object | array)

Blend the given context properites or array of contexts into the log context.

#### addDestination(dest, format: string)

Add the given destination function to the set of destinations. The destination is an object with a write method that will be invoked as:

```javascript
dest(logger: SenseLogs, context: object, message: string)
```

The format may be set to 'json', 'human' or 'tsv' for JSON, human-readable or tab delimited output formats. When the destination function is invoked, the `message` argument will be formatted according to the specified format. Alternatively, the destination may choose to create its own message from the raw context.


#### addFilter(filter: string | array)

Enable the log channels described by the given filter in the current filter set. The current filter specifies the log channels that are enabled to emit log data.

The filter may be a comma separated string or an array of channels. Set `filter` to "default" to revert to the default filter set.


#### child(context: {}): SenseLogs

Create a child log instance derived from the parent log. The child context has its own context inherited from the parent log instance.

Children and parent instances share a single, common filter of enabled log channels.

```javascript
const child = log.child({brush: 'green'})
child.emit('color', 'Favorite color')
```

#### clearContext(): void

This will clear the context for the log instance.

#### enabled(chan: string): boolean

Return true if the channel is enabled for output.


#### getFilter(): []

Return an array of the current filter channels.


#### getOverride(): {}

Return a map containing the current override definition.

#### getSample(): {}

Return a map containing the current sample definition.


#### emit(channel: string, message: string, context: {})

Convenience method that takes the channel as the first argument.


#### metrics(channel: string, message: string, namespace: string, values: {}, dimensions = [], units = null, properties = {})

Emit metrics in [CloudWatch EMF](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Embedded_Metric_Format_Specification.html) format.

This is an easy way to define custom CloudWatch metrics from your log data.

You can use any channel to emit metrics and the `metrics` channel is an ideal choice. By using channel filters, you can dynamically control which metrics are emitted (See [Dynamic Logging](#dynamic-logging).

The log format for metric messages will always be unformatted which is required by the EMF specification.

The namespace is your unique custom namespace and usually consists of your name with service name. For example: 'MyCorp/App'.

The `values` is a map of metric values to submit. Dimensions are the optional CloudWatch Metrics array of dimensions. Units are the optional map of metric unit types. The `units` map may contain a `default` property that contains the default unit type to use.

The `properties` are additional properties that are emitted, but not as metrics. They can be searched using SenseDeep or insights. These are useful for high-cardinality items that if emitted as metrics would incur significant CloudWatch metric costs.

#### setFilter(filter: string | array)

Set the filter channels described by the given filter parameter. The current filter set specifies the channels that enabled to emit log data.

The filter may be a comma separated string or an array of channels. If filter is null, this call will remove all filter channels. If filter is set to 'default', the filter channels will be restored to the default defined via the constructor.


#### setOverride(filter: string | array, expires: number)

Set the override filter channels described by the given filter. The override filter will augment the default filter with additional channels until the `expire` time has been reached. When override channels are defined, the enabled channels are those defined by the union of the filter channels and the override channels.

The filter may be a comma separated string or an array of channels. If the filter is null, this call will clear all overrides.

Expire is a Unix epoch date (seconds since Jan 1 1970).


#### setSample(filter: string | array, percentage: number)

Set the sampling filter channels described by the given filter. The filter may be a comma separated string or an array of channels.

The sample filter will augment the filter and override filter for the given percentage of requests. Set percentage to a positive percentage (may be fractional). When sample channels are defined, the enabled channels are those defined by the union of the filter channels, the override channels and the sample channels.

If the filter is null, this call will remove all samples.


### References

- [SenseLogs Tests](https://github.com/sensedeep/senselogs/tree/main/test)
- [SenseDeep Blog](https://www.sensedeep.com/blog/)
- [SenseDeep Web Site](https://www.sensedeep.com/)
- [SenseDeep Developer Studio](https://app.sensedeep.com/)

### Participate

All feedback, discussion, contributions and bug reports are very welcome.

* [discussions](https://github.com/sensedeep/senselogs/discussions)
* [issues](https://github.com/sensedeep/senselogs/issues)

### Contact

You can contact me (Michael O'Brien) on Twitter at: [@mobstream](https://twitter.com/mobstream), or [email](mob-pub-18@sensedeep.com) and ready my [Blog](https://www.sensedeep.com/blog).

### SenseDeep

Please try the best way to create serverless apps using the Serverless Developer Studio [SenseDeep](https://www.sensedeep.com/). It is integrated with SenseLogs and will control your filter channels for Lambdas without needing to redeploy.

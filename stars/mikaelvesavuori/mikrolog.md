---
repo: mikaelvesavuori/mikrolog
url: 'https://github.com/mikaelvesavuori/mikrolog'
homepage: 'https://mikrolog.pages.dev'
starredAt: '2022-07-26T18:17:13Z'
createdAt: '2022-07-10T15:07:12Z'
updatedAt: '2025-01-17T15:43:34Z'
language: TypeScript
license: MIT
branch: main
stars: 14
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:38.287Z'
description: The JSON logger you always wanted for Lambda.
tags:
  - aws-logger
  - javascript
  - json-logger
  - lambda
  - lambda-logger
  - logger
  - minimal
  - minimal-logger
  - node
  - node-logger
  - serverless
  - serverless-logger
  - typescript
---

# MikroLog

**The JSON logger you always wanted for Lambda**.

_MikroLog is like serverless: There is still a logger ("server"), but you get to think a lot less about it and you get the full "It Just Works"™ experience._

![Build Status](https://github.com/mikaelvesavuori/mikrolog/workflows/main/badge.svg)

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fmikaelvesavuori%2Fmikrolog.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fmikaelvesavuori%2Fmikrolog?ref=badge_shield)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=mikaelvesavuori_mikrolog&metric=alert_status)](https://sonarcloud.io/dashboard?id=mikaelvesavuori_mikrolog)

[![codecov](https://codecov.io/gh/mikaelvesavuori/mikrolog/branch/main/graph/badge.svg?token=S7D3RM9TO7)](https://codecov.io/gh/mikaelvesavuori/mikrolog)

[![Maintainability](https://api.codeclimate.com/v1/badges/d960f299a99a79f781d3/maintainability)](https://codeclimate.com/github/mikaelvesavuori/mikrolog/maintainability)

---

Loggers have become too opinionated, bloated and complicated. MikroLog provides an option that is:

- Adapted out-of-the box for serverless Lambda environments (no requirement though!)
- Gives you multi-level, clean and structured logs
- Easiest to grok logger that isn't pure `console.log()`
- Familiar syntax using `log()`, `info()`, `debug()`, `warn()` and `error()`
- Zero config and opinionated enough to still be awesome without any magic tricks
- Cuts out all the stuff you won't need in cloud/serverless like storing logs or creating file output
- None of the `pid` and other garbage fields you get from many other solutions
- Flexible for most needs by loading your own static metadata that gets used in all logs
- Outside of AWS itself, logs carry across perfectly to observability solutions like Datadog, New Relic, Honeycomb...
- Has transport support
- Easy to redact or mask sensitive data
- Uses `process.stdout.write()` rather than `console.log()` so you can safely use it in Lambda
- Tiny (~2.4 KB gzipped)
- Has only one dependency, [`aws-metadata-utils`](https://github.com/mikaelvesavuori/aws-metadata-utils) (for picking out metadata)
- Has 100% test coverage

## Behavior

MikroLog version 2.0 and later is implemented using a singleton pattern, meaning the instance is reused rather than necessitating that you spawn new instances of it everywhere you need it. This makes it easier for you to use, but also means the API is not exactly like it was in version 1.0. In the context of Lambda, where things in the global execution context (like imports and singletons) are reused across calls, you should be aware that the logger context may be reused. Read more in the `Security notes` section further down.

Logs will be sorted alphabetically by key.

MikroLog will throw away any fields that are undefined, null or empty.

You may pass either strings or objects into each logging method. Messages will show up in the `message` field.

MikroLog accepts certain static metadata from you (user input) and will infer dynamic metadata if you are in an AWS Lambda environment. See more in the [Metadata](#metadata) section.

## Usage

### Basic importing and usage

```typescript
// ES5 format
const { MikroLog } = require('mikrolog');
// ES6 format
import { MikroLog } from 'mikrolog';

const logger = MikroLog.start();

// String message
logger.log('Hello World!');

// Object message
logger.log({
  Hello: 'World!',
  statement: 'Objects work just as well!'
});
```

### Logging

#### Informational logs

Output an informational-level log:

```typescript
logger.log('My message!');
```

This log type is also aliased under the `info()` method if you prefer that syntax:

```typescript
logger.info('My message!');
```

#### Warning logs

Output a warning-level log:

```typescript
logger.warn('My message!');
```

#### Error logs

Output an error-level log:

```typescript
logger.error('My message!');
```

#### Debug logs

Output a debug log:

```typescript
logger.debug('My message!');
```

#### Setting a custom HTTP status code

By default you get status `200` for all logs except errors, which have status `400`.

If you wish to set a custom HTTP status code you can do like in the following example:

```typescript
logger.info('My message was created!', 201);
```

The second parameter can be passed in for all log types.

### Configuration

You may also optionally instantiate MikroLog using a custom metadata object. You can do this either when starting (setting up) a local logger or enriching it after the fact.

```typescript
const metadata = { service: 'MyService' };
const logger = MikroLog.start({ metadataConfig: metadata });
```

To use the full set of features, including deriving dynamic metadata from AWS Lambda, you would add the `event` and `context` objects like so:

```typescript
// Your Lambda handler doing whatever it does
export async function handler(event: any, context: any) {
  // {...}
  const metadata = { service: 'MyService' };
  const logger = MikroLog.start();
  MikroLog.enrich({ metadataConfig: metadata, event, context });
  // {...}
}
```

By default, unless you manually provide a correlation ID, if there is a value stored at `process.env.CORRELATION_ID`, then MikroLog will automatically use it.

You can set the correlation ID _manually_ as part of the `enrich()` call:

```typescript
MikroLog.enrich({ correlationId: 'abc123' });
```

Note how MikroLog, in this case, was enriched _after_ its initial start.

See more in the [Metadata](#metadata) section.

### Setting the correlation ID manually after initialization

Setting the correlation ID manually makes sense for example during cross-boundary calls where you want to propagate this value:

```typescript
const logger = MikroLog.start();
logger.setCorrelationId('abc123');
```

### Setting the `DEBUG` sampling rate

You can set the sampling rate either manually or using an environment variable.

A "sampled" log means it is a log that gets written. An "unsampled" log is therefore one that is not written.

The sample rate uses the `0-100` scale. The default value is `100`, meaning you get _all_ `DEBUG` logs if you don't set this to something else.

You may use integers or floating point numbers.

#### Setting it with an environment variable

Set `MIKROLOG_SAMPLE_RATE` to a numeric or numerically-convertible value and it will be set when initializing MikroLog.

#### Setting it manually

You can also call MikroLog manually like so:

```typescript
const logger = MikroLog.start();
logger.setDebugSamplingRate(0.5); // 0.5% of all DEBUG logs will now be sampled.
logger.setDebugSamplingRate(25); // 25% of all DEBUG logs will now be sampled.
```

#### Checking if last `DEBUG` log was sampled

You can check if the last `DEBUG` log was sampled.

The true value of this will only exist _after_ having used the `debug()` method, as it gets recalculated every time that the method is run.

```typescript
logger.isDebugLogSampled();
```

If you want to "persist" the decision you can handle this manually after the first `DEBUG` log call:

```typescript
// If we get 'TRUE' here we can crank the sampling rate all the way up, else turn it off completely
logger.isDebugLogSampled(); ? logger.setDebugSamplingRate(100) : logger.setDebugSamplingRate(0);
```

#### Passing debug logging decision to other services

This is useful if you want to do more complex, cross-boundary debug logging on a call chain, as written about by [Yan Cui (The Burning Monk)](https://theburningmonk.com/2018/04/you-need-to-sample-debug-logs-in-production/).

For example you could make a solution like the below, passing the sampling decision in a header to a downstream service:

```typescript
const logger = MikroLog.start();
logger.setDebugSamplingRate(100); // Make sure you absolutely get all debug logs; remember that the default is that all DEBUG logs are preserved

logger.debug('This is some issue!');

await fetch('https://www.some-site.xyz', {
  headers: {
    'X-Log-Sampled': logger.isDebugLogSampled()
  }
});
```

Then, on their end they could simply do:

```typescript
const { headers } = incomingPayload; // Do whatever you need here
const logger = MikroLog.start();

// If we get 'TRUE' here we can crank the sampling rate all the way up, else turn it off completely
headers['X-Log-Sampled'] ? logger.setDebugSamplingRate(100) : logger.setDebugSamplingRate(0);

// Rest of code...
```

## Transports

A transport is a configuration that allows MikroLog to flush (i.e. send) logs to another service.

As of version `2.2.0`, MikroLog supports [Axiom](https://axiom.co).

Transport support is based on a "log buffer" that keeps all logs in-memory. They are sent and removed from the buffer when flushed, which is done manually by you.

It's recommended to flush logs only in your clean-up phase, such as at the end of your handler, to avoid adding more latency and volatility than necessary.

### Using the Axiom transport

An example of using the Axiom transport could look like this:

```ts
const logger = MikroLog.start({ metadataConfig });
const transport = new AxiomTransport({
  auth: process.env.AXIOM_API_KEY,
  dataset: 'my_dataset'
});
logger.setTransport(transport);

logger.log('Hello');
logger.log('World');

await logger.flushLogs(); // Send the logs
```

## Metadata

### One-time root-level enrichment

If you want a one-time root-level enrichment, you can do:

```typescript
const logger = MikroLog.start();
logger.enrichNext({ someId: '123456789abcdefghi' });
logger.info('Ping!'); // Enrichment is present on log
logger.info('Ping!'); // Enrichment is no longer present
```

This works just as well on nested objects:

```typescript
const logger = MikroLog.start();
logger.enrichNext({ myObject: { myValue: 'Something here', otherValue: 'Something else' } });
logger.info('Ping!'); // Enrichment is present on log
logger.info('Ping!'); // Enrichment is no longer present
```

Note that only object input is allowed for this method.

### Static metadata

_Static metadata_ is the metadata that you may provide at the time of instantiation. These fields will then be used automatically in all subsequent logs.

Under the hood, MikroLog is built and tested around practically the same metadata format as seen in [catalogist](https://github.com/mikaelvesavuori/catalogist) which might look like:

```typescript
const metadataConfig = {
  version: 1,
  owner: 'MyCompany',
  hostPlatform: 'aws',
  domain: 'CustomerAcquisition',
  system: 'ShowroomActivities',
  service: 'UserSignUp',
  team: 'MyDemoTeam',
  tags: ['typescript', 'backend'],
  dataSensitivity: 'public'
};

const logger = MikroLog.start({ metadataConfig });
```

_However, you are free to use whatever static metadata you want._

Ideally you store this static metadata configuration in its own file and have unique ones for each service.

### Dynamic metadata

_MikroLog uses [`aws-metadata-utils`](https://github.com/mikaelvesavuori/aws-metadata-utils) to pick out metadata._

The dynamic metadata fields are picked up automatically if you pass them in during instantiation. Most of those metadata fields will relate to unique value types available in AWS Lambda.

If these values are not available, they will be dropped at the time of log output. In effect, this means you won't have to deal with them (being empty or otherwise) if you use MikroLog in another type of context.

| Field                | Type    | Description                                               |
| -------------------- | ------- | --------------------------------------------------------- |
| `accountId`          | string  | The AWS account ID that the system is running in.         |
| `correlationId`      | string  | Correlation ID for this function call.                    |
| `functionMemorySize` | string  | Memory size of the current function.                      |
| `functionName`       | string  | The name of the function.                                 |
| `functionVersion`    | string  | The version of the function.                              |
| `id`                 | string  | ID of the log.                                            |
| `isColdStart`        | boolean | Is this a Lambda cold start?                              |
| `region`             | string  | The region of the responding function/system.             |
| `resource`           | string  | The resource (channel, URL path...) that is responding.   |
| `runtime`            | string  | What runtime is used?                                     |
| `stage`              | string  | What AWS stage are we in?                                 |
| `timestamp`          | string  | Timestamp of this message in ISO 8601 (RFC 3339) format.  |
| `timestampEpoch`     | string  | Timestamp of this message in Unix epoch.                  |
| `timestampRequest`   | string  | Request time in Unix epoch of the incoming request.       |
| `user`               | string  | The user in this log context.                             |
| `viewerCountry`      | string  | Which country did AWS CloudFront infer the user to be in? |

## Redacting keys or masking values

In your static metadata you can add some extra security measures with two different string arrays:

- `redactedKeys`: Any items in this array will be completely removed from log output.
- `maskedValues`: Any items in this array will have `MASKED` as their value. Their keys will however remain untampered.

You can redact or mask nested values by using dot syntax, for example `user.auth.token`.

**Note**: These "meta" items will not themselves show up in your logs.

Example usage:

```typescript
const metadataConfig = {
  userId: 'Sam Person',
  secretValue: 'sj02jd-m3982',
  redactedKeys: ['userId'],
  maskedValues: ['secretValue']
};
const logger = MikroLog.start({ metadataConfig });
const log = logger.log('Checking...');

/**
 * The log will look something like:
{
  message: 'Checking...',
  secretValue: 'MASKED',
  { ...any other values }
}
*/
```

## Security notes

MikroLog version 1.0 used `process.env` to store values in order to make usage of the logger easier without having to pass around the same logger instance. This could be a security concern (albeit far-fetched) since the environment variables might leak across function calls. From a developer perspective, it was also a workable but not ideal implementation.

MikroLog version 2.0 and later is instead implemented using a singleton pattern, meaning the instance is reused rather than necessitating that you spawn new instances of it everywhere you need it. This makes it easier for you to use, but also means the API is not exactly like it was in version 1.0. In the context of Lambda, where things in the global execution context (like imports and singletons) are reused across calls, you should be aware that the logger context may be reused.

This should not be a significant problem since Lambda is reused in the same _function scope_, which means that for example static metadata that is reused will most likely be the same anyway. This can be validated with a simple experiment:

- Build a basic Lambda function that uses MikroLog and can take in input via POST
- Call the Lambda with a payload that sets some static field (say `service`) to a custom value
- Run it a few times
- Call it again with an _empty_ payload (i.e. effectively not using any custom value)
- It should respond with the previous value for the service, even if you called it this time without any value

For dynamic metadata (which may be more sensitive than static metadata), such metadata is **always** recalculated and will therefore not leak between calls.

### Resetting the logger between calls

See below code for an example on how to wrap your implementation to always call `reset()` before closing and returning from the Lambda.

_**There are no promises that this type of reset will be effective!**_

```typescript
import { MikroLog } from 'mikrolog';

import { metadataConfig } from './config/metadata';

export async function handler(event: any, awsContext: any): Promise<any> {
  const result = await wrappedHandler(event, awsContext);
  MikroLog.reset();
  return result;
}

async function wrappedHandler(event: any, awsContext: any) {
  const body = event.body && typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
  if (body && body.service) metadataConfig.service = body.service;

  const logger = MikroLog.start({ metadataConfig, event, context: awsContext });
  const message = logger.info('info message');

  return {
    statusCode: 200,
    body: JSON.stringify(message)
  };
}
```

---

At the end of the day you might wonder if this solution (v2 vs v1) is better? I would say overall it is more standardized in its approach as well as (now) documented better. Just keep this in mind when you work with MikroLog or any other logger.

## License

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fmikaelvesavuori%2Fmikrolog.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fmikaelvesavuori%2Fmikrolog?ref=badge_large)

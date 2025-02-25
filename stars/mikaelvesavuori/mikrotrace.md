---
repo: mikaelvesavuori/mikrotrace
url: 'https://github.com/mikaelvesavuori/mikrotrace'
homepage: 'https://mikrotrace.pages.dev'
starredAt: '2022-07-26T17:43:41Z'
createdAt: '2022-07-13T16:40:54Z'
updatedAt: '2024-04-27T16:13:24Z'
language: TypeScript
license: MIT
branch: main
stars: 12
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:38.531Z'
description: Tracing the easy way using JSON.
tags:
  - aws
  - honeycomb
  - honeycombio
  - json-tracer
  - lambda
  - serverless-tracer
  - tracer
  - tracing
---

# MikroTrace

**Tracing the easy way using JSON**.

![Build Status](https://github.com/mikaelvesavuori/mikrotrace/workflows/main/badge.svg)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=mikaelvesavuori_mikrotrace&metric=alert_status)](https://sonarcloud.io/dashboard?id=mikaelvesavuori_mikrotrace)

[![codecov](https://codecov.io/gh/mikaelvesavuori/mikrotrace/branch/main/graph/badge.svg?token=S7D3RM9TO7)](https://codecov.io/gh/mikaelvesavuori/mikrotrace)

[![Maintainability](https://api.codeclimate.com/v1/badges/15a30d2b3f679507fdd0/maintainability)](https://codeclimate.com/github/mikaelvesavuori/mikrotrace/maintainability)

---

_JSON tracer that mildly emulates [OpenTelemetry](https://opentelemetry.io) semantics and behavior. Built as a ligher-weight way to handle spans in technical contexts like AWS Lambda to Honeycomb_.

My rationale to build and distribute this is because setting up OpenTelemetry (OTel) was harder than I would have wanted and expected. Also, while some of the semantics are nice, my feeling was that generally it was not the DX that I was hoping for. I can see a lot of developers fall through on their tracing journey going this route... MikroTrace attempts to simplify and minimize how traces are created. It is specially built for those cases in which you can use JSON logs and have your observability tool translate these into traces in that system.

So what do you get with MikroTrace?

- Tracing that just works!
- Familiar OTel-type semantics
- Works perfectly with AWS and Honeycomb
- It removes the need to pass in complete instances into the span functions, instead use plain strings to refer to spans
- Uses `process.stdout.write()` rather than `console.log()` so you can safely use it in Lambda
- Tiny (~2.6 KB gzipped)
- Has only one dependency, [`aws-metadata-utils`](https://github.com/mikaelvesavuori/aws-metadata-utils) (for picking out metadata)
- Has 100% test coverage

## Behavior

When you run `MikroTrace.start({ ...your input })` with input, this will override any previously set configuration. When run without input, i.e. `MikroTrace.start()`, you can reuse the same instance again, making it easier to use across an application without having to pass the instance around. Make sure to end any spans before doing this.

MikroTrace will set the parent context automatically but you can override this. See the below `Usage` section for more on this.

MikroTrace only supports a single tracing context. Use the `MikroTrace.start()` functionality to get a new clean slate if needed.

## Usage

### Basic importing and usage

```typescript
// ES5 format
const { MikroTrace } = require('mikrotrace');
// ES6 format
import { MikroTrace } from 'mikrotrace';

const tracer = MikroTrace.start({ serviceName: 'My service' });
```

### Reusing the same instance without affecting or resetting state

```typescript
import { MikroTrace } from 'mikrotrace';

const tracer = MikroTrace.continue();
```

### Adding metadata from AWS

```typescript
import { MikroTrace } from 'mikrotrace';

// Add AWS event and context objects
const tracer = MikroTrace.start({ serviceName: 'My service', event, context });

/*
EXAMPLE OUTPUT BELOW

{
  accountId: '123412341234',
  correlationId: '',
  functionMemorySize: '1024',
  functionName: 'somestack-FunctionName',
  functionVersion: '$LATEST',
  region: 'eu-north-1',
  resource: '/functionName',
  runtime: 'AWS_Lambda_nodejs20.x',
  stage: 'shared',
  timestampRequest: '1657389598171',
  user: 'some user',
  viewerCountry: 'SE',
  timestamp: '2022-11-14T12:28:46.842Z',
  timestampEpoch: '1668428926842',
  startTime: '1668428926842',
  durationMs: 0,
  spanName: 'My span',
  spanParent: undefined,
  spanParentId: '',
  spanId: '3e9de004-c484-4776-8a97-a9267133194e',
  traceId: '07c30259-d6c3-4269-b615-d176eff86a3f',
  attributes: {},
  service: 'My service',
  isEnded: false
}
*/
```

### Adding custom static metadata

```typescript
import { MikroTrace } from 'mikrotrace';

// Add custom metadata
const metadataConfig = {
  version: 1,
  hostPlatform: 'aws',
  owner: 'MyCompany',
  domain: 'MyDomain',
  system: 'MySystem',
  team: 'MyTeam',
  tags: ['backend', 'typescript', 'api', 'serverless', 'my-service'],
  dataSensitivity: 'proprietary'
};

const tracer = MikroTrace.start({ serviceName: 'My service', metadataConfig });
```

### Create nested span

```typescript
const tracer = MikroTrace.start({ serviceName: 'My service' });

const span = tracer.start('My span');
const innerSpan = tracer.start('My inner span');
innerSpan.end();
span.end();
```

### End all spans at once

```typescript
const tracer = MikroTrace.start({ serviceName: 'My service' });

tracer.start('My span');
tracer.start('My extra span');
tracer.endAll();
```

### Set a single attribute

```typescript
const tracer = MikroTrace.start({ serviceName: 'My service' });

const span = tracer.start('My span');
span.setAttribute('key', 'some value');
```

### Set multiple attributes

```typescript
const tracer = MikroTrace.start({ serviceName: 'My service' });

const span = tracer.start('My span');
span.setAttributes({ something: 'my thing here', abc: 123 });
```

### Get the configuration of a span

```typescript
const tracer = MikroTrace.start({ serviceName: 'My service' });

const span = tracer.start('My span');
const config = span.getConfiguration();
```

### Configuration

#### Set the correlation ID for the tracer at start

```typescript
const tracer = MikroTrace.start({ correlationId: 'abc-123', serviceName: 'My service' });
```

#### Set the correlation ID for the tracer after instantiation

```typescript
const tracer = MikroTrace.start({ serviceName: 'My service' });
tracer.setCorrelationId('abc-123');
```

#### Reset the tracer completely

```typescript
const tracer = MikroTrace.reset();
```

#### Set the parent context manually

```typescript
const tracer = MikroTrace.start({ serviceName: 'My service' });

const span = tracer.start('My span');
tracer.setParentContext('Some other context');
span.end();
```

#### Enrich the tracer with correlation ID, service name, or parent context without creating a new instance

```typescript
const tracer = MikroTrace.enrich({
  serviceName: 'My new service',
  correlationId: 'qwerty-137',
  parentContext: 'some-other-parent'
});
```

#### Output the tracer configuration, for example for debugging purposes

```typescript
const tracer = MikroTrace.start({ serviceName: 'My service' });
const tracerConfig = tracer.getConfiguration();
```

#### Get W3C `traceheader`

```typescript
const tracer = MikroTrace.start({ serviceName: 'My service' });
const span = tracer.start('My span');
const header = tracer.getTraceHeader(span.getConfiguration());
span.end();
```

### Setting the sampling rate

You can set the sampling rate either manually or using an environment variable.

A "sampled" trace means it is a span that gets stored in memory and written. An "unsampled" trace is therefore one that is not written.

The sample rate uses the `0-100` scale. The default value is `100`, meaning you get _all_ traces if you don't set this to something else.

You may use integers or floating point numbers.

#### Setting it with an environment variable

Set `MIKROTRACE_SAMPLE_RATE` to a numeric or numerically-convertible value and it will be set when initializing MikroTrace.

#### Setting it manually

You can also call MikroTrace manually like so:

```typescript
const logger = MikroTrace.start();
logger.setSamplingRate(0.5); // 0.5% of all traces will now be sampled.
logger.setSamplingRate(25); // 25% of all traces will now be sampled.
```

#### Checking if last trace was sampled

You can check if the last trace was sampled.

The true value of this will only exist _after_ having used the `start()` method, as it gets recalculated every time that the method is run.

```typescript
tracer.isTraceSampled();
```

If you want to "persist" the decision you can handle this manually after the first `DEBUG` log call:

```typescript
// If we get 'TRUE' here we can crank the sampling rate all the way up, else turn it off completely
tracer.isTraceSampled(); ? tracer.setSamplingRate(100) : tracer.setSamplingRate(0);
```

#### Passing the sampling decision to other services

This is useful if you want to do more complex, cross-boundary debug logging on a call chain. In MikroTrace, the easiest way to pass this decision is simply by using the `getTraceHeader()` method—as it will produce the content of a W3C `traceheader` that will store the sampling decision in the last part of the string—and sending this in your call to the next service.

## Demo

```typescript
// Import
import { MikroTrace } from './src/entities/MikroTrace';

/**
 * Ideally have a configuration object or file that contains all
 * needed span names to make it easier to reference them.
 */
const spanNames = {
  outerSpan: 'I am the outer span',
  innerSpan: 'I am inside of the outer span',
  nestedInnerSpan: 'I am hidden deep inside'
};

/**
 * The tracer instance that you will reuse in your application.
 * The correlation ID is not required but is _highly_ recommended.
 */
const tracer = MikroTrace.start({ serviceName: 'MyService', correlationId: 'your-correlation-id' });
/**
 * You may also set the correlation ID after instantiation:
 * @example tracer.setCorrelationId('your-correlation-id');
 */

/**
 * Each time you call `tracer.start()` a new span is created.
 * All it takes is a unique span name.
 */
const span = tracer.start(spanNames['outerSpan']);

/**
 * Here we are creating an inner span. No magic: The tracer will
 * assume that the first trace is the parent.
 */
const innerSpan = tracer.start(spanNames['innerSpan']);

/**
 * If this is not the case and you need to assign another parent span,
 * they you can do it by adding the parent span in the second argument:
 */
const innermostSpan = tracer.start(spanNames['nestedInnerSpan'], spanNames['innerSpan']);

/**
 * We call `span.end()` to close the span(s) and print the log(s) for each trace.
 */
innermostSpan.end();
innerSpan.end();
span.end();

/*
EXAMPLE OUTPUT BELOW

const outputInnerSpan = {
  attributes: {},
  correlationId: 'your-correlation-id',
  durationMs: 0,
  isEnded: true,
  service: 'MyService',
  spanId: 'd3a06fab-8f81-45c9-bcd8-e458e62a3ef9',
  spanName: 'Call the User service and fetch a response',
  spanParentId: '5dec9b5a-acda-4cdf-924f-f8cf6df236c2',
  timestamp: '2022-06-26T16:11:41.977Z',
  timestampEpoch: '1656252701000',
  traceId: 'db62951b-d9a5-4fb6-adf0-10c360e6535f'
};

const outputOuterSpan = {
  attributes: {},
  correlationId: 'your-correlation-id',
  durationMs: 1,
  isEnded: true,
  service: 'MyService',
  spanId: '5dec9b5a-acda-4cdf-924f-f8cf6df236c2',
  spanName: 'Greet a user',
  timestamp: '2022-06-26T16:11:41.977Z',
  timestampEpoch: '1656252701000',
  traceId: 'db62951b-d9a5-4fb6-adf0-10c360e6535f'
};
*/
```

## Improvements

- The handling of child spans and actual references ("IDs") isn't very smart right now. Expect that cases where you use a single parent span will work just fine, but that nested parents probably work perfectly just yet.

---
repo: mikaelvesavuori/mikrometric
url: 'https://github.com/mikaelvesavuori/mikrometric'
homepage: 'https://mikrometric.pages.dev'
starredAt: '2025-01-14T06:56:11Z'
createdAt: '2022-10-23T17:47:02Z'
updatedAt: '2025-01-14T06:56:11Z'
language: TypeScript
license: MIT
branch: main
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:16.156Z'
description: >-
  MikroMetric is a Lambda-oriented lightweight wrapper for producing AWS
  CloudWatch Embedded Metric Format-compatible metric logs.
tags:
  - aws
  - aws-emf
  - embedded-metric-format
  - metric-logger
  - metrics
  - minimal
  - serverless
---

# mikrometric

**MikroMetric is a Lambda-oriented lightweight wrapper for producing AWS CloudWatch Embedded Metric Format-compatible metric logs**.

![Build Status](https://github.com/mikaelvesavuori/mikrometric/workflows/main/badge.svg)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=mikaelvesavuori_mikrometric&metric=alert_status)](https://sonarcloud.io/dashboard?id=mikaelvesavuori_mikrometric)

[![codecov](https://codecov.io/gh/mikaelvesavuori/mikrometric/branch/main/graph/badge.svg?token=S7D3RM9TO7)](https://codecov.io/gh/mikaelvesavuori/mikrometric)

[![Maintainability](https://api.codeclimate.com/v1/badges/d960f299a99a79f781d3/maintainability)](https://codeclimate.com/github/mikaelvesavuori/mikrometric/maintainability)

---

MikroMetric is the quickest way to get going with AWS metrics (CloudWatch Embedded Metric Format):

- Adapted out-of-the box for serverless Lambda environments
- Zero config besides setting a namespace and service name
- Familiar syntax using methods like `putDimension()`, `putMetric()`, `setProperty()`, and `flush()`
- Easier to understand than raw EMF and less chance of breaking it (or your computer, trying to get it right!)
- Less bloated than the other major libraries
- Cuts out all the stuff you won't need in cloud/serverless
- Tiny (~2.2 KB gzipped)
- Has only one dependency, [`aws-metadata-utils`](https://github.com/mikaelvesavuori/aws-metadata-utils) (for picking out metadata)
- Has 100% test coverage

## Usage

### Basic importing and usage

```typescript
// ES5 format
const { MikroMetric } = require('mikrometric');
// ES6 format
import { MikroMetric } from 'mikrometric';

// Minimal usage
const mikroMetric = MikroMetric.start({ namespace: 'MyNamespace', serviceName: 'MyServiceName' });

// Using the AWS `event` and `context` objects
const mikroMetric = MikroMetric.start({
  namespace: 'MyNamespace',
  serviceName: 'MyServiceName',
  event,
  context
});

mikroMetric.putDimension('user', 'Sam Person');
mikroMetric.putMetric('duration', 83, 'Milliseconds');
mikroMetric.setProperty('correlationId', '8d5a0ba6-05e0-4c9b-bc7c-9164ea1bdedd');

mikroMetric.flush();
```

Provided full `event` and `context` objects, your metric log will look something like this in CloudWatch Logs:

```json
{
  "_aws": {
    "Timestamp": 1668191447669,
    "CloudWatchMetrics": [
      { "Namespace": "MyNamespace", "Dimensions": [["service"]], "Metrics": [] }
    ]
  },
  "accountId": "123412341234",
  "correlationId": "6c933bd2-9535-45a8-b09c-84d00b4f50cc",
  "functionMemorySize": "1024",
  "functionName": "somestack-FunctionName",
  "functionVersion": "$LATEST",
  "id": "3be48135-927a-4f71-ac7e-94bcd30723ba",
  "region": "eu-north-1",
  "resource": "/functionName",
  "runtime": "AWS_Lambda_nodejs16.x",
  "service": "MyService",
  "stage": "shared",
  "timestamp": "2022-11-11T18:30:47.669Z",
  "timestampEpoch": "1668191447669",
  "timestampRequest": "1657389598171",
  "user": "some user",
  "viewerCountry": "SE"
}
```

MikroMetric will grab as many values as it can from the `event` and `context` objects. You will of course get fewer (or none) of the dynamic metadata values if these objects are not provided.

The `namespace` and `serviceName` may be passed in either manually at init-time (as above), or be inferred via environment variables (see below). When initializing, some representation of these values **must** exist or an error will be thrown.

You can now use [CloudWatch Logs Insights](https://console.aws.amazon.com/cloudwatch/home?#logsV2:logs-insights) and [CloudWatch Metrics](<https://console.aws.amazon.com/cloudwatch/home?#metricsV2:graph=~()>) to either search your logs or visualize your metrics.

**For more learning resources regarding AWS observability solutions, see the [One Observability Workshop](https://catalog.workshops.aws/observability/en-US), especially the page on [EMF](https://catalog.workshops.aws/observability/en-US/emf/clientlibrary)**.

### Setting custom static metadata

```typescript
import { MikroMetric } from 'mikrometric';

// Use custom metadata
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

const mikroMetric = MikroMetric.start({
  namespace: 'MyNamespace',
  serviceName: 'MyServiceName',
  metadataConfig
});
```

### Creating metric logs

#### Put a dimension

```typescript
mikroMetric.putDimension('user', 'Sam Person');
```

#### Put a metric

```typescript
mikroMetric.putMetric('duration', 83, 'Milliseconds');
```

#### Set a property

```typescript
mikroMetric.setProperty('correlationId', '8d5a0ba6-05e0-4c9b-bc7c-9164ea1bdedd');
```

#### Flush

"Flushing", or _sending_, logs is easy:

```typescript
mikroMetric.flush();
```

Because this is assumed to be within an AWS Lambda context, then flushing is simply a case of logging out the metric data.

Flushing will reset the MikroMetric instance. See `Reset` below.

### Other features

#### Set the correlation ID manually

```typescript
mikroMetric.setCorrelationId('abc123');
```

#### Set the namespace manually

```typescript
mikroMetric.setNamespace('MyNewNamespace');
```

#### Get namespace

```typescript
mikroMetric.getNamespace();
```

#### Get service name

```typescript
mikroMetric.getServiceName();
```

#### Reset

This resets the metric log context and therefore erases any dimensions, metrics, and properties.

```typescript
mikroMetric.reset();
```

## Configuration

### Setting the namespace and/or service name with environment variables

You can set `MIKROMETRIC_NAMESPACE` and/or `MIKROMETRIC_SERVICE_NAME` respectively as environment variables to use these at init time.

**Any values manually passed in will always take precedence**.

## Behavior of output

Output fields will be spread (and potentially deduplicating same-named properties) in the following order:

1. Dynamic metadata (AWS)
2. Custom static metadata
3. Properties

A higher number means that fields in that category will persist if any fields have same names in lower-numbered categories.

## License

MIT. See `LICENSE` file.

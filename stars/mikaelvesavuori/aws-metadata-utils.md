---
repo: mikaelvesavuori/aws-metadata-utils
url: 'https://github.com/mikaelvesavuori/aws-metadata-utils'
homepage: ''
starredAt: '2025-01-14T18:03:33Z'
createdAt: '2022-11-11T13:18:40Z'
updatedAt: '2025-01-14T18:03:34Z'
language: TypeScript
license: MIT
branch: main
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:14.954Z'
description: >-
  Small utility library that helps you extract helpful metadata from your AWS
  event and context objects
tags:
  - aws
  - metadata
  - serverless
---

# aws-metadata-utils

**`aws-metadata-utils` is a small utility library that helps you extract helpful metadata from your AWS `event` and `context` objects.**

![Build Status](https://github.com/mikaelvesavuori/aws-metadata-utils/workflows/main/badge.svg)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=mikaelvesavuori_aws-metadata-utils&metric=alert_status)](https://sonarcloud.io/dashboard?id=mikaelvesavuori_aws-metadata-utils)

[![codecov](https://codecov.io/gh/mikaelvesavuori/aws-metadata-utils/branch/main/graph/badge.svg?token=S7D3RM9TO7)](https://codecov.io/gh/mikaelvesavuori/aws-metadata-utils)

[![Maintainability](https://api.codeclimate.com/v1/badges/2393e9aaabf3fc2022ce/maintainability)](https://codeclimate.com/github/mikaelvesavuori/aws-metadata-utils/maintainability)

---

This library is what drives the majority of contextual metadata generated in [aws-metadata-utils](https://github.com/mikaelvesavuori/aws-metadata-utils), [MikroLog](https://github.com/mikaelvesavuori/mikrolog), [MikroTrace](https://github.com/mikaelvesavuori/mikrotrace), and [MikroMetric](https://github.com/mikaelvesavuori/mikrometric) outputs.

## Usage

Here's an example of running `aws-metadata-utils` in AWS Lambda and just returning back the metadata.

```ts
import { getMetadata } from 'aws-metadata-utils';

export async function handler(event: any, context: any) {
  // Pass in your AWS event and context objects, such as from API Gateway
  const metadata = getMetadata(event, context);

  return {
    statusCode: 200,
    body: JSON.stringify(metadata)
  };
}
```

`aws-metadata-utils` will attempt to pick out various interesting details for you from the event and context objects, such as the function name, region, account ID, correlation ID (AWS request ID) and the stage that is used.

The result of the above example could result in an object with the following shape:

```json
{
  "accountId": "123412341234",
  "correlationId": "6c933bd2-9535-45a8-b09c-84d00b4f50cc",
  "functionMemorySize": "1024",
  "functionName": "somestack-FunctionName",
  "functionVersion": "$LATEST",
  "region": "eu-north-1",
  "resource": "/functionName",
  "runtime": "AWS_Lambda_node16.x",
  "stage": "shared",
  "timestampRequest": "1657389598171",
  "user": "some user",
  "viewerCountry": "SE"
}
```

## Usage: Getting the correlation ID

You can also use `aws-metadata-utils` to _only_ get a correlation ID.

```ts
import { getCorrelationId } from 'aws-metadata-utils';

export async function handler(event: any, context: any) {
  // Pass in your AWS event and context objects, such as from API Gateway
  const correlationId = getCorrelationId(event, context);

  return {
    statusCode: 200,
    body: JSON.stringify(correlationId)
  };
}
```

To get the correlation ID it first checks if an appropriate ID is passed:

1. Via an event — EventBridge: `event.detail.metadata.correlationId`
2. Via a header — API Gateway: `event.headers.x-correlation-id`
3. Set new one from AWS request ID (`context.awsRequestId`)

If none of the above match, set it as empty.

## Dynamic metadata

The dynamic metadata fields are picked up automatically if you pass them in during instantiation. Most of those metadata fields will relate to unique value types available in AWS, primarily Lambda.

If these values are not available, they will be dropped at the time of log output. In effect, this means you won't have to deal with them (being empty or otherwise) if you use aws-metadata-utils in another type of context.

| Field                | Type   | Description                                               |
| -------------------- | ------ | --------------------------------------------------------- |
| `accountId`          | string | The AWS account ID that the system is running in.         |
| `correlationId`      | string | Correlation ID (AWS request ID) for this function call.   |
| `functionMemorySize` | string | Memory size of the current function.                      |
| `functionName`       | string | The name of the function.                                 |
| `functionVersion`    | string | The version of the function.                              |
| `region`             | string | The region of the responding function/system.             |
| `resource`           | string | The resource (channel, URL path...) that is responding.   |
| `runtime`            | string | What runtime is used?                                     |
| `stage`              | string | What AWS stage are we in?                                 |
| `timestampRequest`   | string | Request time in Unix epoch of the incoming request.       |
| `user`               | string | The user in this context.                                 |
| `viewerCountry`      | string | Which country did AWS CloudFront infer the user to be in? |

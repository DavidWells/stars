---
repo: peak-ai/ais-service-discovery-js
url: 'https://github.com/peak-ai/ais-service-discovery-js'
homepage: null
starredAt: '2020-03-21T19:31:19Z'
createdAt: '2019-07-12T10:55:33Z'
updatedAt: '2025-02-14T11:44:39Z'
language: JavaScript
license: GPL-3.0
branch: master
stars: 38
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:02.902Z'
description: null
tags: []
---

# Cloud Application Framework

## Description
This repository interfaces Service Discovery, in this instance CloudMap, in order to locate and communicate with different services. As opposed to storing ARN's in environment variables, this library will interface CloudMap to find a service by a user friendly naming convention, and will understand what 'type' of service you've requested, and use the correct code to communicate/call that service.

## Services supported

- Lambda (`request`|`call`).
- SNS (`publish`). // subscribe not supported by SNS.
- SQS (`queue`|`listen`),
- Automation//SSM task (`automate` | `script`).
- Step function (`state-machine`).

## Examples:

### Import

```javascript
const ServiceDiscovery = require('@peak-ai/ais-service-discovery');
```

### Call a function

```javascript
await ServiceDiscovery.request('namespace.service->handler',  body);
```

### Publish an SNS event

```javascript
await ServiceDiscovery.publish('namspace.service-name->topic', event, {
  ...opts,
  attributes: { // Matches params.MessageAttributes from aws-sdk
    tenant: {
      DataType: 'String',
      StringValue: 'foo',
    },
  },
});
```

### Add message to queue
```javascript
await ServiceDiscovery.queue('namespace.service-name->queue-name', message, opts // optional);
```

### List to queue
```javascript
const messages = await ServiceDiscovery.listen('namespace.service-name->queue-name', opts // optional);
messages.on('message', (message) => {

});
```

### Register a service (Cloudformation)
```yaml
CloudMapService:
  Type: AWS::ServiceDiscovery::Service
  Properties:
    Description: discover handlers for ais-service-segment-explorer
    Name: segment-explorer
    NamespaceId: ${cf:ais-${opt:stage}-service-discovery.NamespaceId}

CreateRefreshSegmentInstance:
  Type: "AWS::ServiceDiscovery::Instance"
  Properties:
    InstanceAttributes:
      arn: ${self:service}-${opt:stage}-refresh-segment
      type: function
    InstanceId: refresh-segment
    ServiceId:
      Ref: CloudMapService
```


## Upcoming Beta version

We're releasing an update which allows you to configure and write modular 'backends' for the core service discovery library.

In this new version we're also introducing Typescript.

For example (previous):
```typescript
const ServiceDiscovery = require('@peak-ai/ais-service-discovery-js');
ServiceDiscovery.request('latest.service->instance', request);
```

The above example only deals with AWS, and there's no way to reconfigure this behaviour. 

This is fairly limiting, especially for testing locally. We came up with the idea of being able to 'mock' or 'stub' these requests locally, for a faster development process.

New example:
```typescript
import { WithMockedBackend, WithAWSBackend } from "@peak-ai/ais-service-discovery-js";

// Config to decide what to do locally
const config = {
  "latest.service->instance": {
    resolver: { mockedResponse: { message: 'Hello World' } },
  },
};

// Responds with mocked responses
const local = WithMockedBackend(config);
const res = await local.request('latest.service->instance', request);

// Communicates via SQS
const prod = WithAWSBackend();
await prod.queue('latest.service->instance', request);
```

### Integration Tests

#### Prerequisites
1. AWS Account Access
2. Run the infrastructure CDK plan, found in ./examples/infrastructure (follow the instructions in the README there).
3. Ensure you have your AWS_PROFILE, and AWS_REGION env vars set correctly.


#### Run integration tests
```bash
$ yarn run test:integration
```

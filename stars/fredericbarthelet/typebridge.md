---
repo: fredericbarthelet/typebridge
url: 'https://github.com/fredericbarthelet/typebridge'
homepage: ''
starredAt: '2021-12-01T05:15:14Z'
createdAt: '2020-11-10T12:39:10Z'
updatedAt: '2024-12-13T04:11:23Z'
language: TypeScript
license: NA
branch: master
stars: 77
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:32.926Z'
description: Typescript toolbox for AWS EventBridge
tags:
  - aws
  - eventbridge
  - hacktoberfest
  - serverless
  - typescript
---

# TypeBridge

Typescript toolbox for AWS EventBridge

## Advantages

- Programmatical definition of your application events
- Typed publish and consume APIs
- Automatically batches `putEvents` call when publishing more than 10 events at a time
- Check for event payload size before publishing

## Quick install

### Add typebridge dependency

`npm i typebridge --save`

> Typebridge `v1` and above is meant to be used with [AWS SDK v3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-eventbridge/index.html). If you want  to use Typebridge with AWS SDK v2, you should install `v0` versions of this package `npm i typebridge@^0`

### Define your bus and events

```ts
import { EventBridgeClient } from '@aws-sdk/client-eventbridge';
import { Bus, Event } from 'typebridge';

export const MyBus = new Bus({
  name: 'applicationBus',
  EventBridge: new EventBridgeClient({}),
});

export const MyEventPayloadSchema = {
  type: 'object',
  properties: {
    stringAttribute: { type: 'string' },
    numberAttribute: { type: 'integer' },
  },
  required: ['stringAttribute'],
  additionalProperties: false
} as const;

export const MyEvent = new Event({
  name: 'MyEvent',
  bus: MyBus,
  schema: MyEventPayloadSchema,
  source: 'mySource'
});
```

### Use the Event class to publish

```ts
import { MyEvent } from './events.ts';

export const handler = async (event) => {
  await MyEvent.publish({
    stringAttribute: 'string',
    numberAttribute: 12,
  })

  return 'Event published !'
};
```

Typechecking is automatically enabled:

```ts
  await MyEvent.publish({
    stringAttribute: 'string',
    numberAttribute: 12,
    // the following line will trigger a Typescript error
    anotherAttribute: 'wrong'
  })
```
### Use the Event class to create an event

```ts
import { MyBus, MyEvent } from './events.ts';

export const handler = async (event) => {
  const events = event.details.map(detail => MyEvent.create({
    stringAttribute: detail.stringAttribute,
    numberAttribute: detail.numberAttribute,
  })
  await MyBus.put(events);

  return 'Event published !'
};
```

### Use the Event class to generate trigger rules

Using the serverless framework with `serverless.ts` service file:


```ts
import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: 'typebridge-test',
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
  },
  functions: {
    hello: {
      handler: 'MyEventHandler.handler',
      events: [
        {
          eventBridge: {
            eventBus: 'applicationBus',
            pattern: NewUserConnectedEvent.pattern,
          },
        },
      ],
    }
  }
}

module.exports = serverlessConfiguration;
```

### Use the Event class to type input event

```ts
import { PublishedEvent } from 'typebridge';
import { MyEvent } from './events.ts';

export const handler = (event: PublishedEvent<typeof MyEvent>) => {
  // Typed as string
  return event.detail.stringAttribute;
}
```

### Use the Event class to validate the input event

Using [middy](https://github.com/middyjs/middy) middleware stack in your lambda's handler, you can throw an error before your handler's code being executed if the input event `source` or `detail-type` were not expected, or if the `detail` property does not satisfy the JSON-schema used in `MyEvent` constructor.

```ts
import middy from '@middy/core';
import jsonValidator from '@middy/validator';
import { MyEvent } from './events.ts';

const handler = (event) => {
  return 'Validation succeeded';
};

// If event.detail does not match the JSON-schema supplied to MyEvent constructor, the middleware will throw an error
export const main = middy(handler).use(
  jsonValidator({ inputSchema: MyEvent.publishedEventSchema }),
);
```

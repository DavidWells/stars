---
repo: rpinheiroalmeida/aws-event-stream
url: 'https://github.com/rpinheiroalmeida/aws-event-stream'
homepage: null
starredAt: '2024-12-29T00:45:42Z'
createdAt: '2020-04-30T23:29:11Z'
updatedAt: '2024-12-29T00:45:43Z'
language: TypeScript
license: NA
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:53:34.890Z'
description: An event stream application for AWS in typescript.
tags: []
---


# aws-event-stream

**This library is based on https://github.com/thiagobustamante/node-eventstore

It is an open source library to create Event Stores that works with AWS using DynamoDB as Provider and SNS to publish messages.

[![npm version](https://badge.fury.io/js/aws-event-stream.svg)](https://badge.fury.io/js/aws-event-stream)
![Master Workflow](https://github.com/rpinheiroalmeida/aws-event-stream/workflows/Master%20Workflow/badge.svg) ![Mutation Tests Workflow](https://github.com/rpinheiroalmeida/aws-event-stream/workflows/Mutation%20Tests%20Workflow/badge.svg) ![Publish Workflow](https://github.com/rpinheiroalmeida/aws-event-stream/workflows/Publish%20Workflow/badge.svg)


## Motivation

This is an open source library to create Event Stores that works with **DynamoDB** as persistence providers and **SNS** notification systems.

The Event Store is a database accompanied by a publication and subscription system. The database stores all the events related to an event stream. The pub / sub system allows other systems or microservices to react to changes in event streams. It is a core component in any event sourcing + CQRS architectures.

## Installing

```sh
npm install --save aws-event-stream
```

## Usage

### Create EventStore
To Create an EventStore you must provide two implementations:

   -  A DynamoDBProvider: Responsible for events persistence in the store.
   -  A SNSPublisher (Optional): Responsible for notify any process interested in modifications on the store streams.

If there is no publisher provided, the event store will not send any notification.

```javascript
const awsConfig = { region: 'us-east-1' };

const dynamodbConfig = {
    awsConfig: awsConfig,
    dynamodb: {
        tableName: 'events'
    }
} as Config;

const eventStore = new EventStore(
    new DynamodbProvider(dynamodbConfig),
    new SNSPublisher('arn:sns', awsConfig),
);

```

#### DynamodbConfig

The object DynamodbConfig is related to Dynamodb configuration, the possible parameters are:

| Parameter  | Description |


| Parameter         |                              Description                               |
| ----------------- | :--------------------------------------------------------------------: |
| tableName         |                         The name of the table.                         |
| createTable       |    True: create the table, False assume that table alreaday exists.    |
| readCapacityUnit  |   The total number of read capacity units consumed by the operation.   |
| writeCapacityUnit |  The total number of write capacity units consumed by the operation.   |
| endpointUrl       | An Endpoint object representing the endpoint URL for service requests. |
| maxRetries        |        The maximum amount of retries to attempt with a request.        |
| httpOptions       |        A set of options to pass to the low-level HTTP request.         |
| ttl               |         Time to Live (TTL) in seconds on the specified table.          |


### Adding Events

To add Events you need to ask to EventStore a reference to an EventStream. You can add Events passing anything you want as a payload. 

```javascript
const orderStream = eventStore.getEventStream('orders', '123');
await orderStream.addEvent({ data: 'any data', eventType: 'PLACED' });
```


### Reading Events

To read Events you need to ask to EventStore a reference to an EventStream. You can read a stream to receive an ordered list containing all the events in the store. 

#### getEvents()

Returns an array with all events published in the Stream specified.

```javascript
const orderStream = eventStore.getEventStream('orders', '123');
const events = await orderStream.getEvents();
```
Example of event from **getEvents** method:

```javascript
[
    { 
        'commitTimestamp': 1611206813, 
        'eventType': 'SENT', 
        'payload': {'text': 'EVENT PAYLOAD', 'sequence': 1 }
    },
    { 
        'commitTimestamp': 1611206823, 
        'eventType': 'PLACED', 
        'payload': {'text': 'EVENT PAYLOAD', 'sequence': 2 }
    }
]
```

Or

Returns an Object with all data from events happened in a Stream. What happens is a merge in all fields from all events, keeping the eventTypes as an array.

The fields which have conflicts will always be considered the last event.

```javascript
const orderStream = eventStore.getEventStream('orders', '123');
await orderStream.loadFromHistory();
```

Example of event from **loadFromHistory** method:

```javascript
    { 
        'commitTimestamp': 1611206823, 
        'eventTypes': ['SENT', 'PLACED'], 
        'payload': {'text': "EVENT PAYLOAD", 'eventType': 'PLACED'}, 'sequence': 2 
    }
```



## Integration Test
Steps:
- TMPDIR=/private$TMPDIR docker-compose up
- npm run test:integration:jest
- aws dynamodb  --endpoint-url=http://localhost:4566 scan --table-name events-now
- aws sns --endpoint-url=http://localhost:4566 list-topics

---
repo: mikaelvesavuori/aws-serverless-outbox-demo
url: 'https://github.com/mikaelvesavuori/aws-serverless-outbox-demo'
homepage: ''
starredAt: '2025-01-14T08:12:01Z'
createdAt: '2023-06-16T07:23:23Z'
updatedAt: '2025-01-14T08:12:02Z'
language: TypeScript
license: NA
branch: main
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:15.118Z'
description: 'Demonstration of the outbox pattern with Lambda, DynamoDB, and EventBridge.'
tags:
  - architecture-patterns
  - aws
  - demo
  - demonstration
  - dynamodb-outbox
  - eventbridge
  - lambda
  - outbox
  - serverless
---

# AWS outbox pattern and deduplication demo using DynamoDB, EventBridge (Pipes), and Lambda

This repository primarily demonstrates the serverless [outbox pattern](https://d1.awsstatic.com/architecture-diagrams/ArchitectureDiagrams/aws-reference-architecture-hybrid-domain-consistency-ra.pdf?did=wp_card&trk=wp_card) as applied to a serverless architecture in AWS. An easier execution than many traditional similar solutions, here we can use DynamoDB and its [Streams](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.html) capability to solve the messaging/queuing otherwise required.

The outbox pattern allows us to dissociate the processes involved in performing an operation and emitting a resulting event of that operation happening. By making another party, in our case the database, responsible for triggering the event emission, we have a better decoupling of our responsibilities.

While this system is practically idempotent by nature, I've also added a basic implementation of a deduplication mechanism in the `BookAdded` Lambda function: It uses DynamoDB to first check if an event exists in the local table. If it does, it means we've already operated on the event and can safely skip doing anything. If it doesn't exist, we can run our business logic.

The key infrastructural components are [Lambda](https://aws.amazon.com/lambda/), [DynamoDB](https://aws.amazon.com/dynamodb/), and [EventBridge](https://aws.amazon.com/eventbridge/).

## Explanation

For our demonstration we will have a system in which books can be added or removed.

There are two implementations, as seen in `serverless.yml` and `serverless.cdc.yml`, respectively. **The `cdc` (change data capture) version is the first we'll look at.**

For the "book added" usecase, the flow is:

```mermaid
graph LR;
    APIGateway-->Lambda_AddBook;
    Lambda_AddBook-->DynamoDB;
    DynamoDB-->DynamoDB_Stream;
    DynamoDB_Stream-->Lambda_ChangeProcessor;
    Lambda_ChangeProcessor-->EventBridge_OutboxDemo.BookAdded;
    EventBridge_OutboxDemo.BookAdded-->Lambda_BookAdded;
```

Incoming calls run the appropriate function to add or remove a book. The function runs an operation on the database table to do this. Whenever a change happens in DynamoDB, it will stream the change to an intermediary Lambda, called `ChangeProcessor`. This function will inspect the list of changes and consequently emit the corresponding events which other functions respond to.

### Limitations and a more elaborate solution

**For this next section the corresponding definition file is `serverless.yml`.**

You've seen that the first solution uses a **single** table to bring the overall point across. It offers a relatively basic solution to the problem but is also potentially more limited in flexibility. In this type of solution, we are limited to the context of the data that is persisted (optimized, of course, for such use) and an event name based on the database operation, i.e. `INSERT` and `REMOVE`. It may be hard to granularly emit (integration) events to the rest of your landscape based on rich context, if you're doing it this way.

Separate tables for the data and the events brings additional freedom in allowing more information and context which downstream receivers can work with.

#### Multiple tables

We'll address a few more improvements here, the first one being using multiple tables: Two for the implied "producer" and one for the implicit "consumer" of things happening in the system.

The three tables are:

- `BooksTable` (producer): Where books are added and removed from
- `EventsTable` (producer): Every event that happens gets stored in this table
- `PresentationTable` (consumer): Contains a short-living list of incoming "book added" events to ensure we don't act on the same event more than once

Next, you will see how these improve our flow.

#### EventBridge Pipes and configuration-driven systems

W'll be using [EventBridge Pipes](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-pipes.html) to allow for configuration over (regular) code to control our system.

The overall flow ends up being:

```mermaid
graph LR;
    APIGateway-->Lambda_AddBook;
    Lambda_AddBook-->DynamoDB_BooksTable;
    Lambda_AddBook-->DynamoDB_EventsTable;
    DynamoDB_EventsTable-->DynamoDB_Stream;
    DynamoDB_Stream-->EventBridgePipe;
    EventBridgePipe-->Lambda_BookAdded;
    Lambda_BookAdded-->DynamoDB_PresentationTable;
```

You'll note the definition is longer, but no longer contains the `ChangeProcessor`—this is, as expected, because we now use the Pipe to pass the data as events, instead of running a Lambda with somewhat complicated code to process the change data and emitting the events. An extra bonus is we use [input transformers](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-transform-target-input.html) to simplify the payloads that are used by receiving functions. More importantly, we've now also gained the capability to more easily express what filters we want to use on the data before it ends up as an event. See `BookAddedPipe` and `BookRemovedPipe` in the definition for more details.

---

## Prerequisites

- Recent [Node.js](https://nodejs.org/en/) (ideally 18+) installed.
- Amazon Web Services (AWS) account with sufficient permissions so that you can deploy infrastructure.
- Ideally some experience with [Serverless Framework](https://www.serverless.com) as that's what we will use to deploy the service and infrastructure.

## Required configuration

Make sure you enter your AWS account number in the respective `serverless.yml` file(s) under `custom.config.awsAccountNumber`.

## Installation

Clone, fork, or download the repo as you normally would. Run `npm install`.

## Commands

- `npm start`: Run application locally
- `npm test`: Test the business/application logic with Jest
- `npm run build`: Package application with Serverless Framework
- `npm run deploy`: Deploy application to AWS with Serverless Framework
- `npm run deploy:cdc`: Deploy CDC application to AWS with Serverless Framework
- `npm run teardown`: Remove stack from AWS
- `npm run teardown:cdc`: Remove CDC stack from AWS

## Running locally

Using `npm start` you can start using the local endpoint with `http://localhost:3000/{FUNCTION}` to call the service. See example calls below.

## API calls

### Adding a book

```bash
curl -X POST -d @input.json -H 'Content-Type: application/json' http://localhost:3000/book
```

Which should respond back with a `201` status.

### Removing a book

```bash
curl -X DELETE -d '{"name": "Team Topologies"}' http://localhost:3000/book
```

Which should respond back with a `204` status.

---

## References

- [Decoupling event publishing with Amazon EventBridge Pipes](https://aws.amazon.com/blogs/compute/decoupling-event-publishing-with-amazon-eventbridge-pipes/)
- [Publishing EventBridge events with DynamoDB Streams](https://www.boyney.io/blog/2022-11-03-eventbridge-events-with-dynamodb)
- [Outbox pattern with DynamoDB and EventBridge](https://serverlessland.com/patterns/dynamodb-streams-to-eventbridge-outbox-pattern)
- [Change data capture events into multiple EventBridge pipes](https://serverlessland.com/patterns/eventbridge-pipes-ddbstream-with-filters-to-eventbridge)
- [Implementing a Transactional Outbox Pattern with DynamoDB Streams to Avoid 2-phase Commits](https://medium.com/ssense-tech/implementing-a-transactional-outbox-pattern-with-dynamodb-streams-to-avoid-2-phase-commits-ed0f91e69e9)
- [Your Lambda function might execute twice. Be prepared!](https://cloudonaut.io/your-lambda-function-might-execute-twice-deal-with-it/)

A more elaborate version I was inspired by is outlined at:

- [Implementing the Transactional Outbox Pattern With EventBridge Pipes](https://betterprogramming.pub/implementing-the-transactional-outbox-pattern-with-eventbridge-pipes-125cb3f51f32)

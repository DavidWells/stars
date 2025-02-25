---
repo: pmilliotte/dynamodb-toolbox-integrations
url: 'https://github.com/pmilliotte/dynamodb-toolbox-integrations'
homepage: null
starredAt: '2024-12-21T21:11:22Z'
createdAt: '2022-10-07T08:40:53Z'
updatedAt: '2024-12-21T21:11:22Z'
language: TypeScript
license: NA
branch: main
stars: 4
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:16.829Z'
description: >-
  A set of CDK constructs enabling the use of dynamodb-toolbox in AWS direct
  integrations between Step Functions and Dynamodb
tags: []
---

# Step Functions <> Dynamodb integrations with dynamodb-toolbox features

A set of constructs to leverage [dynamodb-toolbox](https://github.com/jeremydaly/dynamodb-toolbox) features in a Step Functions <> Dynamodb direct integration.

### Why ? 

AWS direct integrations are great for shipping less custom code, thus less bugs 🐞 in your CDK applications. They enable communication with Dynamodb inside a state machine, rather than using a lambda as a service integration task and use your favorite tool such as dynamodb-toolbox to communicate with Dynamodb for simple requests like GetItem, PutItem, UpdateItem or Query.

However, functionless is not always an option and you may already be relying on dynamodb-toolbox in some of your lambdas. In this case, implementing a Step Functions <> Dynamodb direct integration turns out to be painful because you would have to implement dynamodb-toolbox features yourself (e.g. generate created / modified / entity properties, or handle alias and maps).

### How ?

This library aims at getting the best developer experience :computer: while benefiting from dynamodb-toolbox features in Step Functions <> Dynamodb direct integrations. To query entity items inside a state machine, define your task with the Query construct at build time, and pass the partition key value at run time, just like you would do in a lambda with dynamodb-toolbox.

```typescript
import { StateMachine } from "aws-cdk-lib/aws-stepfunctions";
import { DynamodbToolboxQuery } from "sfn-dynamodb-toolbox-integrations";

// Define your query state
const queryTask = new DynamodbToolboxQuery(this, "QueryTask", {
  entity: DynamodbToolboxEntityToQuery,
  tableArn: "arn:aws:dynamodb:us-east-2:123456789012:table/myDynamoDBTable",
  // Attributes to retrieve should be entity aliases
  options: { attributes: ["id", "created"] },
});

// And use it in your step function
const stateMachine = new StateMachine(this, "QueryStateMachine", {
  definition: queryTask,
});
```

NB: This library is in alpha for its current limitations, however it's already being used in production in some projects. The main limitation being: :warning: dynamodb-entities must be flat (i.e. no object or array properties).

We have released the Query construct while PutItem, UpdateItem and GetItem constructs are under active development.

## Available DynamoDB-toolbox entity features

### Entity definition

These entity properties are currently handled:

| DDB-toolbox entity options    | GetItem    | UpdateItem | PutItem    | Query                                   |
| ----------------------------- | ---------- | ---------- | ---------- | --------------------------------------- |
| attributes                    | :computer: | :computer: | :computer: | :warning: see below                     |
| autoExecute                   | :computer: | :computer: | :computer: | :x: `true` (default)                    |
| autoParse                     | :computer: | :computer: | :computer: | :x: `true` (default)                    |
| created                       | :computer: | :computer: | :computer: | :white_check_mark:                      |
| createdAlias                  | :computer: | :computer: | :computer: | :white_check_mark:                      |
| modified                      | :computer: | :computer: | :computer: | :white_check_mark:                      |
| modifiedAlias                 | :computer: | :computer: | :computer: | :white_check_mark:                      |
| name                          | :computer: | :computer: | :computer: | :white_check_mark:                      |
| table                         | :computer: | :computer: | :computer: | :white_check_mark:                      |
| timestamps                    | :computer: | :computer: | :computer: | :white_check_mark:                      |
| typeAlias                     | :computer: | :computer: | :computer: | :white_check_mark:                      |
| typeHidden                    | :computer: | :computer: | :computer: | :x: `false` (default)                   |

:computer:: under development

### Entity attributes

These entity attribute properties are currently handled:

| DDB-toolbox attribute feature | GetItem    | UpdateItem | PutItem    | Query                                   |
| ----------------------------- | ---------- | ---------- | ---------- | --------------------------------------- |
| alias                         | :computer: | :computer: | :computer: | :white_check_mark:                      |
| coerce                        | :computer: | :computer: | :computer: | :x: (default)                           |
| default                       | :computer: | :computer: | :computer: | :white_check_mark:                      |
| delimiter                     | :computer: | :computer: | :computer: | :white_check_mark:                      |
| dependsOn                     | :computer: | :computer: | :computer: | :white_check_mark:                      |
| format                        | :computer: | :computer: | :computer: | :x:                                     |
| hidden                        | :computer: | :computer: | :computer: | :x: `false` (default)                   |
| map                           | :computer: | :computer: | :computer: | :white_check_mark:                      |
| onUpdate                      | :computer: | :computer: | :computer: | :white_check_mark:                      |
| prefix                        | :computer: | :computer: | :computer: | :x:                                     |
| suffix                        | :computer: | :computer: | :computer: | :x:                                     |
| partitionKey                  | :computer: | :computer: | :computer: | :white_check_mark:                      |
| sortKey                       | :computer: | :computer: | :computer: | :white_check_mark:                      |
| required                      | :computer: | :computer: | :computer: | :white_check_mark:                      |
| save                          | :computer: | :computer: | :computer: | :x: `true` (default)                    |
| setType                       | :computer: | :computer: | :computer: | :x:                                     |
| transform                     | :computer: | :computer: | :computer: | :x:                                     |
| type                          | :computer: | :computer: | :computer: | :warning: `string`, `number`, `boolean` |

:computer:: under development



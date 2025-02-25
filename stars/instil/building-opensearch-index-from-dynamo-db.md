---
repo: instil/building-opensearch-index-from-dynamo-db
url: 'https://github.com/instil/building-opensearch-index-from-dynamo-db'
homepage: ''
starredAt: '2021-12-01T00:03:40Z'
createdAt: '2021-11-04T14:35:45Z'
updatedAt: '2024-06-29T19:38:02Z'
language: TypeScript
license: NA
branch: master
stars: 17
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:33.269Z'
description: >-
  This contains TypeScript code for some lambdas to handle your OpenSearch
  indexes from DynamoDB
tags: []
---

## Lambdas for OpenSearch with a DynamoDb source

Check out the blog post explaining more about this setup here: https://instil.co/blog/opensearch-with-dynamodb/

This contains lambdas to help handle OpenSearch with DynamoDb

### Indexing from a DynamoDb Stream

Inside the `index-stream` directory you'll find the code for indexing remove/insert/modify stream events from DynamoDB.
If you are unsure on how to set up a dynamo stream then check this out
https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.html#Streams.Enabling

Or if you are using CDK, here is an example of a table with a stream event:

```
const userTable = new Table(this, "UserTable", {
  tableName: "user-table",
  billingMode: BillingMode.PAY_PER_REQUEST,
  partitionKey: {name: "partitionKey", type: AttributeType.STRING},
  sortKey: {name: "sortKey", type: AttributeType.STRING},
  pointInTimeRecovery: true,
  stream: StreamViewType.NEW_IMAGE // This is the important line!
});
```

Assuming you have set up your Lambda in CDK (`userTableStreamProcessorLambdaFunction`), you then just need to tell the stream to head off to that lambda:

```
  userTableStreamProcessorLambdaFunction.addEventSource(new DynamoEventSource(this.userTable, {
    startingPosition: StartingPosition.TRIM_HORIZON,
    batchSize: 1,
    retryAttempts: 3
  }));
```
PLEASE NOTE: you must give the correct privileges to this lambda:
```
    openSearchDomain.grantIndexReadWrite("user-index", userTableStreamProcessorLambdaFunction);
```

### Deleting an index

Inside the `delete-index` folder you will find another lambda. This one can be set up to have a trigger, however I would
recommend just manually triggering it from the console when you need to.

PLEASE NOTE: you must give the correct privileges to this lambda:
```
    openSearchDomain.grantIndexReadWrite("user-index", deleteIndexLambdaFunction);
```

### Indexing existing data

Inside the `index-data` folder you will find another lambda. This one can be set up to have a trigger, however I would
recommend just manually triggering it from the console when you need to. It has been set up to allow an optional date
range if you wish to only index data inside a that range (provided you have some field on your object like createdDate
or updatedOn etc). Otherwise the lambda will index all the data.

PLEASE NOTE: you must give the correct privileges to this lambda:
```
  openSearchDomain.grantIndexReadWrite("user-index", indexExistingDataLambdaFunction);
  userTable.grantReadData(indexExistingDataLambdaFunction);
```

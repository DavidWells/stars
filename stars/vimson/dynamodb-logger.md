---
repo: vimson/dynamodb-logger
url: 'https://github.com/vimson/dynamodb-logger'
homepage: null
starredAt: '2024-12-29T01:05:05Z'
createdAt: '2022-12-20T17:19:16Z'
updatedAt: '2024-12-29T01:05:05Z'
language: TypeScript
license: MIT
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:53:34.812Z'
description: >-
  A DynamoDB wrapper which logs all the entries to the table and an easy way to
  query the logs
tags: []
---

# DynamoDB wrapper for logging and scanning the logs in an easy manner

We all know the pain of finding the data from the logs especially when working with Lambda function in serverless environment. I agree cloudwatch is one of the great options for logging. But we need an easy solution to scan the logs without using the setup like Elasticsearch stack. That's why we developed this small library which is basically a DynamoDb wrapper, which easily do the basic insert and scan operation very easily.

## Table name: LambdaLogs

| Partition key | Sort key    |
| ------------- | ----------- |
| PK (String)   | SK (String) |

## Local secondary indexes

| Name        | Partition key | Sort key          | Projected attributes |
| ----------- | ------------- | ----------------- | -------------------- |
| LSI-1-index | PK (String)   | LSI-1-SK (String) | All                  |
| LSI-2-index | PK (String)   | LSI-2-SK (String) | All                  |
| LSI-3-index | PK (String)   | LSI-3-SK (String) | All                  |

The above is the default Table & Index convention. But it is totally configurable. Deafult configuration is

```typescript
const config: LoggerConfig = {
  region: 'eu-west-1',
  table: {
    name: 'LambdaLogs',
    partitionKey: 'PK',
    sortKey: 'SK',
    lsi1SortKey: 'LSI-1-SK',
    lsi2SortKey: 'LSI-2-SK',
    lsi1Index: 'LSI-1-index',
    lsi2Index: 'LSI-2-index',
  },
};
```

Type details are

```typescript
export type LoggerTableConfig = {
  name: string;
  partitionKey?: string;
  sortKey?: string;
  lsi1SortKey?: string;
  lsi2SortKey?: string;
  lsi1Index?: string;
  lsi2Index?: string;
};

export type LoggerConfig = {
  region: string;
  credentials?: Credentials; //import { Credentials } from '@aws-sdk/types';
  table?: LoggerTableConfig;
};
```

An example implementation if you follow the same table name and index names are

```typescript
import { logger, getLoggerConfig } from 'dynamodb-logger';
logger.initailize(getLoggerConfig()); // If you are using the same Table and index name conventions as above
```

An example if you are using diferent table name and index names are then

```typescript
import { logger, getLoggerConfig } from 'dynamodb-logger';
logger.initailize({
  region: 'eu-west-1',
  table: {
    name: 'LambdaLogs',
    partitionKey: 'PK',
    sortKey: 'SK',
    lsi1SortKey: 'LSI-1-SK',
    lsi2SortKey: 'LSI-2-SK',
    lsi1Index: 'LSI-1-index',
    lsi2Index: 'LSI-2-index',
  },
  credentials: {
    accessKeyId: 'XXXXXXX',
    secretAccessKey: 'YYYYYYYYY',
  },
}); // If you are using API keys and different table name and index names
```

It is better you can use a logger helper module to put this initialzation and can use in your project

Logging example is

```typescript
logger.log(LogModules.LambdaInvoker, LogLevels.Payload, JSON.stringify(logStack, null, 2)); // we added LogModules & LogLevels as fixed constants
```

Scanning the log table example is

```typescript
import { logger, getLoggerConfig } from 'dynamodb-logger';
logger.initailize(getLoggerConfig());

const searchOptions: LogSearchConfig = {
  module: LogModules.PushNotifier,
  level: LogLevel.ERROR,
  startTime: '2022-10-03T07:01:46.037Z',
  endTime: '2022-12-03T07:01:46.037Z',
  limit: 1,
  sort: 'asc',
};

let logResult: LogResult;
do {
  logResult = await logger.search(searchOptions);
  if (logResult.lastEvaluatedKey) {
    searchOptions.lastEvaluatedKey = logResult.lastEvaluatedKey;
  }
  console.log(logResult);
} while (logResult.lastEvaluatedKey);
```

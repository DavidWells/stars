---
repo: RossWilliams/dynamo-pipeline
url: 'https://github.com/RossWilliams/dynamo-pipeline'
homepage: null
starredAt: '2022-03-31T00:16:52Z'
createdAt: '2020-12-20T14:40:51Z'
updatedAt: '2022-03-31T00:16:53Z'
language: TypeScript
license: Apache-2.0
branch: main
stars: 11
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:52.912Z'
description: Alternative API for DynamoDB DocumentClient
tags: []
---

# dynamo-pipeline

Alternative API for DynamoDB DocumentClient (v2) to improve types, allow easy iteration and paging of data, and reduce developer mistakes. From "So complex there are no obvious mistakes" to "So simple there are obviously no mistakes".

5KB gzipped (excluding aws-sdk DocumentClient).

### Limitations

1. Partition Keys and Sort Keys only support string type
1. Limited transaction support
1. Some dynamodb request options are not available

## Example

Suppose you wish to find the first 5000 form items with sk > "0000" which are not deleted, and for each item, add 'gsi1pk' and 'gsi1sk' attributes to each item.

### Dynamo Pipeline

```typescript
import { Pipeline } from "dynamo-pipeline";

interface Item {
  id: string;
  sk: string;
  _isDeleted: boolean;
  data: {
    attr1: string;
    attr2: string;
  };
}

const privatePipeline = new Pipeline("PrivateTableName-xxx", {
  pk: "id",
  sk: "sk",
});

await privatePipeline
  .query<Item>(
    { pk: "FormId", sk: sortKey(">", "0000") },
    {
      limit: 5000,
      filters: {
        lhs: { property: "_isDeleted" },
        logical: "<>",
        rhs: false,
      },
    }
  )
  .forEach((item, _index, pipeline) => pipeline.update(item, { gsi1pk: data.attr1, gsi1sk: data.attr2 }));

privatePipeline.handleUnprocessed((item) => console.error(`Update Failed: id: ${item.id} , sk: ${item.sk}`));
```

### NoSQL Workbench Generated Code + Looping logic

```javascript
const AWS = require("aws-sdk");

const dynamoDbClient = createDynamoDbClient();
const queryInput = createQueryInput();
let isFirstQuery = true;
let itemsProcessed = 0;
const updateErrors = [];

while ((isFirstQuery || queryInput.LastEvaluatedKey) && itemsProcessed < 5000) {
  isFirstQuery = false;
  const result = await executeQuery(dynamoDbClient, queryInput);
  await Promise.all(
    result.Items.map((item) => {
      itemsProcessed += 1;
      if (itemsProcessed <= 5000) {
        return executeUpdateItem(
          dynamoDbClient,
          createUpdateItemInput(item.id, item.sk, item.data.attr1, item.data.attr2)
        );
      }
    })
  );

  if (result.LastEvaluatedKey) {
    queryInput.LastEvaluatedKey = result.LastEvaluatedKey;
  }
}

updateErrors.forEach((err) => console.error(`Update Failed: id: ${item.id} , sk: ${item.sk}`));

function createDynamoDbClient() {
  return new AWS.DynamoDB();
}

function createQueryInput() {
  return {
    TableName: "Private-xxx-xxx",
    ScanIndexForward: false,
    ConsistentRead: false,
    KeyConditionExpression: "#254c0 = :254c0 And #254c1 > :254c1",
    FilterExpression: "#254c2 <> :254c2",
    ExpressionAttributeValues: {
      ":254c0": {
        S: "FormId",
      },
      ":254c1": {
        S: "0000",
      },
      ":254c2": {
        BOOL: true,
      },
    },
    ExpressionAttributeNames: {
      "#254c0": "id",
      "#254c1": "sk",
      "#254c2": "_isDeleted",
    },
  };
}

function createUpdateItemInput(id, sk, gsi1pk, gsi1sk) {
  return {
    TableName: "Form-xxx-xxx",
    Key: {
      id: {
        S: id,
      },
      sk: {
        S: sk,
      },
    },
    UpdateExpression: "SET #4bd90 = :4bd90, #4bd91 = :4bd91",
    ExpressionAttributeValues: {
      ":4bd90": {
        S: gsi1pk,
      },
      ":4bd91": {
        S: gsi1sk,
      },
    },
    ExpressionAttributeNames: {
      "#4bd90": "gsi1pk",
      "#4bd91": "gsi1sk",
    },
  };
}

async function executeUpdateItem(dynamoDbClient, updateItemInput) {
  // Call DynamoDB's updateItem API
  try {
    const updateItemOutput = await dynamoDbClient.updateItem(updateItemInput).promise();
    return updateItemOutput;
  } catch (err) {
    handleUpdateItemError(err);
  }
}

async function executeQuery(dynamoDbClient, queryInput) {
  try {
    const queryOutput = await dynamoDbClient.query(queryInput).promise();
    return queryOutput;
  } catch (err) {
    // handleQueryError(err);
  }
}

function handleUpdateItemError(err) {
  updateErrors.push(err);
}
```

## Default Options

### Assumptions

Safe assumptions for lambda -> dynamodb round trip times to avoid excessive throttling

- Items are small, <= 2KB
- On-Demand billing
- default On-Demand max capacity of 12,000 RRUs and 4,000 WRUs.
- Batch Writes consume 50 WRUs and complete in 7ms
- Transact writes consume 100 WRUs and complete in 20ms
- Single item write operations consume 2 WRUs and complete in 5ms
- Queries and scans consume 125 RRUs and complete in 10ms
- Batch Get operations consume 50 RRUs and complete in 5ms

### Writes

- For all items, divide below by 1 + # of GSIs where the item will appear
- Assume other application traffic is consuming no more than 100 WRUs
- Batch writes should use a buffer size of 1, or 2 for small items. A buffer of 3 will result in throttles and retries. Reduce batch write size if desired buffer size is < 1.
- Query and Scan reads which result in 1:1 writes should be batched into sizes of 25, or 50 for small items. A (read) batch size of 75 will experience write throttling.

### Read

- Assume other application traffic is consuming no more than 500 RRUs
- Batch Gets should use a read buffer of 1 or reduce the batch size
- Queries and scans are usually not a bottleneck and read buffers can be set to high values except in memory constrained environments

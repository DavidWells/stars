---
repo: jeffreyyoung/single-table-dynamo
url: 'https://github.com/jeffreyyoung/single-table-dynamo'
homepage: ''
starredAt: '2020-07-24T05:34:36Z'
createdAt: '2019-11-07T06:38:26Z'
updatedAt: '2024-12-28T20:56:50Z'
language: TypeScript
license: NA
branch: master
stars: 45
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:42.734Z'
description: A typescript dynamodb client that stores items in one table
tags: []
---

# single-table-dynamo

A dynamodb client that stores all items in a single table

## Getting started

```
yarn add single-table-dynamo zod
```

## Example

```typescript
import { DynamoDBDocumentClient as DocumentClient } from "@aws-sdk/lib-dynamodb";
import { z } from "zod";
import { Repository, InferObjectType, InferIdType } from "single-table-dynamo";

const repo = new Repository({
  // a unique type name to distinguish this entity type from other types
  typeName: "Note",

  // create a schema for the entity
  schema: z.object({
    id: z.string().default(() => uuid()),
    owner: z.string(),
    text: z.string().min(0).max(1000).default(""),
  }),

  // primary index fields are required to get this object
  primaryIndex: {
    fields: ["id"],
  },

  // can be used query by other ids
  secondaryIndexes: {
    byOwner: {
      fields: ["owner"],
      indexName: "gsi1",
    },
  },

  tableConfig: TableConfig,

  documentClient: new DocumentClient(),
});

// write
const note = await repo.put({ owner: "harold" });
// { id: "123", owner: "harold", text: "" }

// read
const note = await repo.get({ id: "123" });
// { id: "123", owner: "harold", text: "" }

// update
const note = await repo.mutate({ id: "123", text: "this is my note" });
// { id: "123", owner: "harold", text: "this is my note" }

// query
const { Items } = await repo.query("byOwner").where({ owner: "harold" }).exec();
// [{ id: "123", owner: "harold", text: "this is my note" }]

// delete
await repo.delete({ id: "123" });

// infer object type from repo
type NoteObject = InferObjectType<typeof repo>;
// { id: string, owner: string, text: string }

type NoteId = InferIdType<typeof repo>;
// {id: string}

var TableConfig = {
  tableName: "GenericTable",
  primaryIndex: {
    pk: "pk1",
    sk: "sk0",
  },
  secondaryIndexes: [
    {
      indexName: "gsi1",
      pk: "pk1",
      sk: "sk1",
    },
    {
      indexName: "gsi2",
      pk: "pk2",
      sk: "sk2",
    },
  ],
};
```

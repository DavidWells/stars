---
repo: mikaelvesavuori/ddbitemsizer
url: 'https://github.com/mikaelvesavuori/ddbitemsizer'
homepage: ''
starredAt: '2025-01-14T07:55:22Z'
createdAt: '2023-12-10T19:17:49Z'
updatedAt: '2025-01-14T07:55:22Z'
language: TypeScript
license: MIT
branch: main
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:15.576Z'
description: Get the byte size of your DynamoDB input.
tags:
  - aws
  - ddb
  - dynamo
  - dynamodb
  - dynamodb-utils
---

# `ddbitemsizer`

## Get the byte size of your DynamoDB input.

A handy utility that tries to mimic the general behavior of this excellent [online tool](https://zaccharles.github.io/dynamodb-calculator/).

## Installation

For pulling the package into your project, run `npm install ddbitemsizer`.

For developing on this package, clone it and install dependencies with `npm install` or your equivalent command.

## Usage

It should work with any regular DynamoDB input.

```ts
import { DynamoDbItemSizer } from 'ddbitemsizer';

const itemSizer = new DynamoDbItemSizer();

const size = itemSizer.get({
  "itemType": { "S": "SLOT" },
  "id": { "S": "abc1231" },
  "hostName": { "S": "Harry Mason" },
  "timeSlot": { "S": "February 23, 1999" },
  "slotStatus": { "S": "OPEN" },
  "createdAt": { "S": "February 1, 1999" },
  "updatedAt": { "S": "February 1, 1999" },
  "expiresAt": { "N": "2099" }
});

console.log(`The size of this input is ${size} bytes.`); // "The size of this input is 141 bytes."
```

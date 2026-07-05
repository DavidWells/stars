---
repo: faceteer/expression-builder
url: 'https://github.com/faceteer/expression-builder'
homepage: null
starredAt: '2024-12-24T20:12:20Z'
createdAt: '2021-07-09T23:25:11Z'
updatedAt: '2024-12-24T20:12:21Z'
language: TypeScript
license: MIT
branch: main
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:53:37.580Z'
description: An expression builder for Dynamo DB
tags: []
---

# Faceteer Expression Builder

The Faceteer Expression Builder is a set of functions that can be used to create [filter expressions](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Query.html#Query.FilterExpression) for Dynamo DB queries, or [condition expressions](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.ConditionExpressions.html) for `PutItem`, `UpdateItem`, and `DeleteItem` operations.

## Installation

Install with npm:

```bash
npm i @faceteer/expression-builder --save
```

Install with yarn:

```
yarn add @faceteer/expression-builder
```

## Condition Expression

Condition expressions are used when you want to conditionally put, update, or delete an item from DynamoDB.

The condition expression builder will take in an array representing a condition expression and generate the expression with placeholders for the attribute names and values.

The following operands are supported for condition expressions:

### `=`, `<`, `<=`, `>`, `>=`, `<>`

```ts
// The status is active
["status", "=", "active"];
// Age is greater than or equal to 65
["age", ">=", 65];
// The last updated time was before Jan 5, 2020
["lastUpdated", "<", new Date("2020-01-05")];
```

### `between`

```ts
// Ids between 57242 and 99980
["id", "between", 57242, 99980];
// Last name starts with "m", "n", or "o"
["lastName", "between", "m", "O"];
```

### `begins_with`

```ts
// The industry begins with marketing
["industry", "begins_with", "marketing"];
// Zip code begins with 11
["zipCode", "begins_with", "11"];
```

### `exists`

```ts
// The attribute billingPlan exists
["billingPlan", "exists"];
```

### `not_exists`

```ts
// The attribute deletedAt does not exist
["deletedAt", "not_exists"];
```

### `contains`

```ts
// The company name contains the letters "LLC"
["companyName", "contains", "LLC"];
// The array of users contains the name "larry"
["users", "contains", "larry"];
```

### `size`

```ts
// Users where the first name is greater than 20 characters
["firstName", "size", ">=", 20];
// Images where the size is less than 2048 bytes
["image", "size", "<", 2048];
// Products where there is only one review
["reviews", "size", "=", 1];
```

### `in`

```ts
// Posts that have a status of draft or queued
["postStatus", "in", ["draft", "queued"]];
```

### `AND`, `OR`

```ts
// An active user with a billing plan
[["billingPlan", "exists"], "AND", ["status", "=", "active"]];
// Users with a first name longer than 20 characters or a missing first name
[["firstName", "size", ">=", 20], "OR", ["firstName", "not_exists"]];
```

## Filter Expression

Filter expressions are used when you want to query Dynamo DB, but only want a subset of the queried results.

The filter expression builder will take in an array representing a filter expression and generate the expression with placeholders for the attribute names and values.

The following operands are supported for filter expressions:

- `=`
- `<`
- `<=`
- `>=`
- `<>`
- `between`
- `begins_with`

For all operands besides `between` the structure of a filter expression array is `[{attribute}, {operand}, {value}]`.

```ts
// Users that signed during or after 2020
const newUsersFilter = expressionBuilder.filter(["signedUpDate", ">=", "2020"]);

// Active users
const activeUsersFilter = expressionBuilder.filter(["status", "=", "active"]);

// Users who's industry begins with marketing
const industryFilter = expressionBuilder.filter([
  "industry",
  "begins_with",
  "marketing",
]);
```

For `between` the structure of a filter expression array is `[{attribute}, "between", {start}, {end}]`.

```ts
// Users that signed up between 2015 and 2016
const signUpRangeFilter = expressionBuilder.filter([
  "signedUpDate",
  "between",
  "2015",
  "2016",
]);
```

You may also use the `AND` and `OR` operands to chain together multiple statements.

```ts
// Active users who signed up before 2010
const signUpFilter = builder.filter([
  ["signedUpDate", ">", "2010"],
  "AND",
  ["status", "=", "active"],
]);
```

## Usage

The compiled expression will return an object with three properties.

| Property     | Description                                                                              |
| ------------ | ---------------------------------------------------------------------------------------- |
| `names`      | A map containing attribute names indexed by their placeholders.                          |
| `values`     | A map containing attribute values in the Dynamo DB format indexed by their placeholders. |
| `expression` | The filter expression string.                                                            |

These can be used direct with the `DynamoDB` client in the `aws-sdk`

```ts
// Using a condition expression for a put
import * as builder from "./condition";
import { DynamoDB } from "aws-sdk";
import { Converter } from "@faceteer/converter";

const ddb = new DynamoDB();

const statusCondition = builder.condition([
  "postStatus",
  "in",
  ["Retry", "Pending"],
]);

ddb.putItem({
  TableName: "Posts",
  Item: Converter.marshall(post),
  ConditionExpression: statusCondition.expression,
  ExpressionAttributeNames: statusCondition.names,
  ExpressionAttributeValues: statusCondition.values,
});
```

```ts
// Using a filter expression for a query
import * as expressionBuilder from "@faceteer/expression-builder";
import { DynamoDB } from "aws-sdk";

const ddb = new DynamoDB();

// Filter for users that signed during or after 2020
const signUpFilter = expressionBuilder.filter(["signedUpDate", ">=", "2020"]);

// Query the Dynamo DB table and add the placeholder
// names, values, and the filter expression
ddb.query({
  TableName: "MyOrganizationTable",
  KeyConditionExpression: `#PK = :partition AND #SK begins_with (:sort)`,
  ExpressionAttributeNames: {
    // The expression builder will generate bindings for
    // expression attribute names
    ...signUpFilter.names,
    "#PK": "PK",
    "#SK": "SK",
  },
  ExpressionAttributeValues: {
    // The expression builder will generate bindings for
    // expression attribute values
    ...signUpFilter.values,
    ":partition": {
      S: "#ORG_5753732",
    },
    ":sort": {
      S: "#USER",
    },
  },
  FilterExpression: signUpFilter.expression,
});
```

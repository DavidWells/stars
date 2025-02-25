---
repo: ericallam/dynamodb-spec-generator
url: 'https://github.com/ericallam/dynamodb-spec-generator'
homepage: null
starredAt: '2020-03-29T01:27:11Z'
createdAt: '2019-01-17T17:35:25Z'
updatedAt: '2020-03-29T18:10:47Z'
language: JavaScript
license: NA
branch: master
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:00.345Z'
description: >-
  A command line tool to generate documentation for a DynamoDB table and its
  access patterns.
tags: []
---

# dynamodb-spec-generator ![Badge Version 0.0.1](https://img.shields.io/badge/version-v0.0.1-orange.svg)

A command line tool to generate documentation for a DynamoDB table and its access patterns, to assign in the design phase of a well-factored DynamoDB table

## Table of Contents

- [Purpose](#purpose)
- [Installaton](#installation)
- [Usage](#usage)
- [Examples](#examples)
  - [Relational Modeling](#relational-modeling)

## Purpose

Designing a DynamoDB table is very different than a SQL database because one must decide upfront what access patterns the table needs to support and pre-denormalize the data.

Additionally, a well-factored DynamoDB table, with overloading GSIs, sparse indexes, local secondary indexes, composite keys (etc.) can be quite hard to document and understand.

`dynamodb-spec-generator` was created to help alleviate this issue, to make it easier to design a DynamoDB according to the access patterns. All you have to do is provide it with a valid [DynamoDB spec](#dynamodb-spec) file and it will output a markdown document.

## Installation

`dynamodb-spec-generator` is packaged as an npm package and requires `node >= 8.0.0`:

```bash
# install the command globally
$ npm install dynamodb-spec-generator -g
```

Alternatively, if you are working inside a nodejs project, you can add it as a dependency:

```bash
# Install it as a development dependency
$ npm install dynamodb-spec-generator --save-dev
```

If you install it as a dependency, make sure to run it with `npx` like so:

```bash
$ npx dynamodb-spec-generator
```

## Usage

`dynamodb-spec-generator` takes a single argument, the path to the [spec file](#dynamodb-spec), and will output the markdown to `stdout`:

```bash
$ npx dynamodb-spec-generator spec.json
```

If you want to instead save it to a file, pass the `-o` flag:

```bash
$ npx dynamodb-spec-generator spec.json -o README.md
```

You can also have it watch for changes to the spec file and regenerate the markdown whenever you make a change by passing the `--watch` flag:

```bash
$ npx dynamodb-spec-generator spec.json -o README.md --watch
```

## Examples

### Relational Modeling

This example attempts to recreate the [DynamoDB docs](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-modeling-nosql-B.html) for converting a normalized SQL relational database into a single DynamoDB table with two Global Secondary Indexes.

<details>

<summary>The spec file relationalModeling.json</summary>

```json
{
  "service": "HR Api Backend",
  "version": "1.0.0",
  "description": "A recreation of the Relational Modeling example in the DynamoDB Docs",
  "author": "Eric Allam",
  "tableDefinition": {
    "TableName": "HR-Table",
    "KeySchema": [
      {
        "AttributeName": "PK",
        "KeyType": "HASH"
      },
      {
        "AttributeName": "SK",
        "KeyType": "RANGE"
      }
    ],
    "AttributeDefinitions": [
      {
        "AttributeName": "PK",
        "AttributeType": "S"
      },
      {
        "AttributeName": "SK",
        "AttributeType": "S"
      },
      {
        "AttributeName": "Data",
        "AttributeType": "S"
      }
    ],
    "ProvisionedThroughput": {
      "ReadCapacityUnits": 5,
      "WriteCapacityUnits": 5
    },
    "BillingMode": "PAY_PER_REQUEST",
    "GlobalSecondaryIndexes": [
      {
        "IndexName": "gsi1",
        "KeySchema": [
          {
            "AttributeName": "SK",
            "KeyType": "HASH"
          },
          {
            "AttributeName": "Data",
            "KeyType": "RANGE"
          }
        ],
        "Projection": {
          "ProjectionType": "ALL"
        },
        "ProvisionedThroughput": {
          "ReadCapacityUnits": 5,
          "WriteCapacityUnits": 5
        }
      },
      {
        "IndexName": "gsi2",
        "KeySchema": [
          {
            "AttributeName": "GSI-Bucket",
            "KeyType": "HASH"
          },
          {
            "AttributeName": "Data",
            "KeyType": "RANGE"
          }
        ],
        "Projection": {
          "ProjectionType": "ALL"
        },
        "ProvisionedThroughput": {
          "ReadCapacityUnits": 5,
          "WriteCapacityUnits": 5
        }
      }
    ]
  },
  "accessPatterns": [
    {
      "title": "Look up Employee Details by Employee ID",
      "type": "get",
      "index": "main",
      "params": {
        "partition": "HR-EMPLOYEE1",
        "sort": { "value": "EMPLOYEE1", "operator": "=" }
      }
    },
    {
      "title": "Query Employee Details by Employee Name",
      "type": "query",
      "index": "gsi1",
      "params": {
        "partition": { "value": "EMPLOYEE1" },
        "sort": { "value": "John", "operator": "begins_with" }
      }
    },
    {
      "title": "Get an employee's current job details only",
      "index": "main",
      "type": "query",
      "params": {
        "partition": { "value": "HR-EMPLOYEE1" },
        "sort": { "value": "v0", "operator": "begins_with" }
      }
    },
    {
      "title": "Get Open Orders for a customer for a date range",
      "type": "query",
      "index": "gsi1",
      "params": {
        "partition": { "value": "CUSTOMER1" },
        "sort": { "value": "OPEN#2019-01", "operator": "begins_with" }
      }
    },
    {
      "title": "Show all Orders in OPEN status for a date range across all customers",
      "description": "Query in parallel for the range [0..N] to get all shards",
      "type": "query",
      "index": "gsi2",
      "params": {
        "partition": "Bucket-6",
        "sort": {
          "operator": "between",
          "minValue": "OPEN#2019-01",
          "maxValue": "OPEN#2019-02"
        }
      }
    },
    {
      "title": "All Employees Hired Recently",
      "index": "gsi1",
      "type": "query",
      "params": {
        "partition": "HR-CONFIDENTIAL",
        "sort": { "value": "2019-01-01", "operator": ">" }
      }
    },
    {
      "title": "Find all employees in a certain warehouse",
      "index": "gsi1",
      "type": "query",
      "params": {
        "partition": "WAREHOUSE1"
      }
    },
    {
      "title": "Get all OrderItems for a Product including warehouse location inventories",
      "type": "query",
      "index": "gsi1",
      "params": {
        "partition": "PRODUCT1",
        "filters": [
          {
            "attribute": "Warehouse1",
            "operator": "attribute_exists"
          }
        ]
      }
    },
    {
      "title": "Get customers by Account Rep",
      "type": "query",
      "index": "gsi1",
      "params": {
        "partition": "EMPLOYEE1",
        "filters": [
          {
            "attribute": "Address",
            "operator": "attribute_exists"
          }
        ]
      }
    },
    {
      "title": "Get orders by Account Rep and date",
      "description": "Scatter/Gather to query all statuses (OPEN, PENDING, FULFILLED)",
      "type": "query",
      "index": "gsi1",
      "params": {
        "partition": "EMPLOYEE1",
        "sort": { "value": "OPEN#2019-01-12", "operator": "=" }
      }
    },
    {
      "title": "Get all employees with specific Job Title",
      "type": "query",
      "index": "gsi1",
      "params": {
        "partition": "v0"
      }
    },
    {
      "title": "Get inventory by Product and Warehouse",
      "type": "get",
      "index": "main",
      "params": {
        "partition": "OE-PRODUCT1",
        "sort": { "value": "PRODUCT1", "operator": "=" }
      }
    },
    {
      "title": "Get total product inventory",
      "type": "get",
      "index": "main",
      "params": {
        "partition": "OE-PRODUCT1",
        "sort": {
          "value": "PRODUCT1",
          "operator": "="
        }
      }
    },
    {
      "title": "Get Account Reps ranked by Order Total and Sales Period",
      "type": "query",
      "index": "gsi1",
      "params": {
        "partition": "2018-Q4",
        "order": "DESC"
      }
    }
  ],
  "records": [
    {
      "PK": "HR-EMPLOYEE1",
      "SK": "EMPLOYEE1",
      "Data": "John Smith",
      "StartDate": "01-12-2019"
    },
    { "PK": "HR-EMPLOYEE1", "SK": "v0", "Data": "Principle Account Manager" },
    {
      "PK": "HR-EMPLOYEE1",
      "SK": "HR-CONFIDENTIAL",
      "Data": "2019-02-12",
      "Employee": "John Smith",
      "Salary": 50000
    },
    {
      "PK": "HR-EMPLOYEE1",
      "SK": "WAREHOUSE1",
      "Data": "2019-02-15",
      "Employee Name": "John Smith"
    },
    {
      "PK": "HR-EMPLOYEE1",
      "SK": "2018-Q4",
      "Data": "5000",
      "Employee Name": "John Smith"
    },
    {
      "PK": "HR-EMPLOYEE2",
      "SK": "2018-Q4",
      "Data": "10000",
      "Employee Name": "John Smith"
    },
    {
      "PK": "OE-ORDER1",
      "SK": "CUSTOMER1",
      "Data": "OPEN#2019-01-18",
      "GSI-Bucket": "Bucket-6"
    },
    {
      "PK": "OE-ORDER1",
      "SK": "PRODUCT1",
      "Data": "OPEN#2019-01-18",
      "GSI-Bucket": "Bucket-4",
      "UnitPrice": "$89.99"
    },
    {
      "PK": "OE-ORDER1",
      "SK": "EMPLOYEE1",
      "Data": "OPEN#2019-01-12",
      "OrderTotal": 2500
    },
    {
      "PK": "OE-PRODUCT1",
      "SK": "PRODUCT1",
      "Data": "Quickcrete Cement - 50lb bag",
      "Warehouse1": 46,
      "Warehouse2": 12
    },
    {
      "PK": "OE-CUSTOMER1",
      "SK": "CUSTOMER1",
      "Data": "Ace Building Supplies",
      "Address": "1600 Penn"
    },
    {
      "PK": "OE-CUSTOMER1",
      "SK": "EMPLOYEE1",
      "Data": "Ace Building Supplies",
      "Address": "1600 Penn"
    }
  ]
}
```

</details>

<details>
<summary>Will generate this markdown:</summary>

<!-- Generated by solve-dynamo-spec.js. Update this documentation by updating the spec-v1.json file. -->

# HR Api Backend DynamoDB Spec ![](https://img.shields.io/badge/version-1.0.0-orange.svg "Version 1.0.0")

A recreation of the Relational Modeling example in the DynamoDB Docs

## Table of Contents

- [Table Spec](#table-spec)
- [Access Patterns](#access-patterns)
  - [Look up Employee Details by Employee ID](#look-up-employee-details-by-employee-id)
  - [Query Employee Details by Employee Name](#query-employee-details-by-employee-name)
  - [Get an employee's current job details only](#get-an-employees-current-job-details-only)
  - [Get Open Orders for a customer for a date range](#get-open-orders-for-a-customer-for-a-date-range)
  - [Show all Orders in OPEN status for a date range across all customers](#show-all-orders-in-open-status-for-a-date-range-across-all-customers)
  - [All Employees Hired Recently](#all-employees-hired-recently)
  - [Find all employees in a certain warehouse](#find-all-employees-in-a-certain-warehouse)
  - [Get all OrderItems for a Product including warehouse location inventories](#get-all-orderitems-for-a-product-including-warehouse-location-inventories)
  - [Get customers by Account Rep](#get-customers-by-account-rep)
  - [Get orders by Account Rep and date](#get-orders-by-account-rep-and-date)
  - [Get all employees with specific Job Title](#get-all-employees-with-specific-job-title)
  - [Get inventory by Product and Warehouse](#get-inventory-by-product-and-warehouse)
  - [Get total product inventory](#get-total-product-inventory)
  - [Get Account Reps ranked by Order Total and Sales Period](#get-account-reps-ranked-by-order-total-and-sales-period)
- [Indexes](#indexes)
  - [Main](#main)
  - [Gsi1](#gsi1)
  - [Gsi2](#gsi2)
- [Author](#author)

## Table Spec

<details>

<summary>Params to create the table using the CLI or the AWS SDK:</summary>

```json
{
  "TableName": "HR-Table",
  "KeySchema": [
    {
      "AttributeName": "PK",
      "KeyType": "HASH"
    },
    {
      "AttributeName": "SK",
      "KeyType": "RANGE"
    }
  ],
  "AttributeDefinitions": [
    {
      "AttributeName": "PK",
      "AttributeType": "S"
    },
    {
      "AttributeName": "SK",
      "AttributeType": "S"
    },
    {
      "AttributeName": "Data",
      "AttributeType": "S"
    }
  ],
  "ProvisionedThroughput": {
    "ReadCapacityUnits": 5,
    "WriteCapacityUnits": 5
  },
  "BillingMode": "PAY_PER_REQUEST",
  "GlobalSecondaryIndexes": [
    {
      "IndexName": "gsi1",
      "KeySchema": [
        {
          "AttributeName": "SK",
          "KeyType": "HASH"
        },
        {
          "AttributeName": "Data",
          "KeyType": "RANGE"
        }
      ],
      "Projection": {
        "ProjectionType": "ALL"
      },
      "ProvisionedThroughput": {
        "ReadCapacityUnits": 5,
        "WriteCapacityUnits": 5
      }
    },
    {
      "IndexName": "gsi2",
      "KeySchema": [
        {
          "AttributeName": "GSI-Bucket",
          "KeyType": "HASH"
        },
        {
          "AttributeName": "Data",
          "KeyType": "RANGE"
        }
      ],
      "Projection": {
        "ProjectionType": "ALL"
      },
      "ProvisionedThroughput": {
        "ReadCapacityUnits": 5,
        "WriteCapacityUnits": 5
      }
    }
  ]
}
```

</details>

`createTable` Using the CLI:

```bash
$ aws dynamodb create-table --table-name HR-Table --cli-input-json create-table.json
```

Using the AWS SDK:

```javascript
const DynamoDB = require("aws-sdk/clients/dynamodb");

const service = new DynamoDB({ region: process.env.AWS_REGION });

service.createTable(tableJson, (err, data) => {
  console.log(data);
});
```

## Access Patterns

### Look up Employee Details by Employee ID

Perform a [DocumentClient.get](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#get-property "DocumentClient.get") against the Main index:

```json
{
  "TableName": "HR-Table",
  "Key": {
    "PK": "HR-EMPLOYEE1",
    "SK": "EMPLOYEE1"
  }
}
```

#### Matching Records

| PK (HASH)    | SK (RANGE) |                      |                           |
| ------------ | ---------- | -------------------- | ------------------------- |
| HR-EMPLOYEE1 | EMPLOYEE1  | **Data:** John Smith | **StartDate:** 01-12-2019 |

### Query Employee Details by Employee Name

Perform a [DocumentClient.query](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#query-property "DocumentClient.query") against the Gsi1 index with a `begins_with(#Data, :Data)` condition on the sort key:

```json
{
  "TableName": "HR-Table",
  "KeyConditionExpression": "#SK = :SK and begins_with(#Data, :Data)",
  "ExpressionAttributeNames": {
    "#SK": "SK",
    "#Data": "Data"
  },
  "ExpressionAttributeValues": {
    ":SK": "EMPLOYEE1",
    ":Data": "John"
  },
  "IndexName": "gsi1"
}
```

#### Matching Records

| SK (HASH) | Data (RANGE) |                      |                           |
| --------- | ------------ | -------------------- | ------------------------- |
| EMPLOYEE1 | John Smith   | **PK:** HR-EMPLOYEE1 | **StartDate:** 01-12-2019 |

### Get an employee's current job details only

Perform a [DocumentClient.query](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#query-property "DocumentClient.query") against the Main index with a `begins_with(#SK, :SK)` condition on the sort key:

```json
{
  "TableName": "HR-Table",
  "KeyConditionExpression": "#PK = :PK and begins_with(#SK, :SK)",
  "ExpressionAttributeNames": {
    "#PK": "PK",
    "#SK": "SK"
  },
  "ExpressionAttributeValues": {
    ":PK": "HR-EMPLOYEE1",
    ":SK": "v0"
  }
}
```

#### Matching Records

| PK (HASH)    | SK (RANGE) |                                     |
| ------------ | ---------- | ----------------------------------- |
| HR-EMPLOYEE1 | v0         | **Data:** Principle Account Manager |

### Get Open Orders for a customer for a date range

Perform a [DocumentClient.query](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#query-property "DocumentClient.query") against the Gsi1 index with a `begins_with(#Data, :Data)` condition on the sort key:

```json
{
  "TableName": "HR-Table",
  "KeyConditionExpression": "#SK = :SK and begins_with(#Data, :Data)",
  "ExpressionAttributeNames": {
    "#SK": "SK",
    "#Data": "Data"
  },
  "ExpressionAttributeValues": {
    ":SK": "CUSTOMER1",
    ":Data": "OPEN#2019-01"
  },
  "IndexName": "gsi1"
}
```

#### Matching Records

| SK (HASH) | Data (RANGE)    |                   |                          |
| --------- | --------------- | ----------------- | ------------------------ |
| CUSTOMER1 | OPEN#2019-01-18 | **PK:** OE-ORDER1 | **GSI-Bucket:** Bucket-6 |

### Show all Orders in OPEN status for a date range across all customers

> Query in parallel for the range \[0..N] to get all shards

Perform a [DocumentClient.query](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#query-property "DocumentClient.query") against the Gsi2 index with a `#Data BETWEEN :DataMin AND :DataMax` condition on the sort key:

```json
{
  "TableName": "HR-Table",
  "KeyConditionExpression": "#GSI-Bucket = :GSI-Bucket and #Data BETWEEN :DataMin AND :DataMax",
  "ExpressionAttributeNames": {
    "#GSI-Bucket": "GSI-Bucket",
    "#Data": "Data"
  },
  "ExpressionAttributeValues": {
    ":GSI-Bucket": "Bucket-6",
    ":DataMin": "OPEN#2019-01",
    ":DataMax": "OPEN#2019-02"
  },
  "IndexName": "gsi2"
}
```

#### Matching Records

| GSI-Bucket (HASH) | Data (RANGE)    |                   |                   |
| ----------------- | --------------- | ----------------- | ----------------- |
| Bucket-6          | OPEN#2019-01-18 | **PK:** OE-ORDER1 | **SK:** CUSTOMER1 |

### All Employees Hired Recently

Perform a [DocumentClient.query](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#query-property "DocumentClient.query") against the Gsi1 index with a `#Data > :Data` condition on the sort key:

```json
{
  "TableName": "HR-Table",
  "KeyConditionExpression": "#SK = :SK and #Data > :Data",
  "ExpressionAttributeNames": {
    "#SK": "SK",
    "#Data": "Data"
  },
  "ExpressionAttributeValues": {
    ":SK": "HR-CONFIDENTIAL",
    ":Data": "2019-01-01"
  },
  "IndexName": "gsi1"
}
```

#### Matching Records

| SK (HASH)       | Data (RANGE) |                      |                          |                   |
| --------------- | ------------ | -------------------- | ------------------------ | ----------------- |
| HR-CONFIDENTIAL | 2019-02-12   | **PK:** HR-EMPLOYEE1 | **Employee:** John Smith | **Salary:** 50000 |

### Find all employees in a certain warehouse

Perform a [DocumentClient.query](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#query-property "DocumentClient.query") against the Gsi1 index:

```json
{
  "TableName": "HR-Table",
  "KeyConditionExpression": "#SK = :SK",
  "ExpressionAttributeNames": {
    "#SK": "SK"
  },
  "ExpressionAttributeValues": {
    ":SK": "WAREHOUSE1"
  },
  "IndexName": "gsi1"
}
```

#### Matching Records

| SK (HASH)  | Data (RANGE) |                      |                               |
| ---------- | ------------ | -------------------- | ----------------------------- |
| WAREHOUSE1 | 2019-02-15   | **PK:** HR-EMPLOYEE1 | **Employee Name:** John Smith |

### Get all OrderItems for a Product including warehouse location inventories

Perform a [DocumentClient.query](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#query-property "DocumentClient.query") against the Gsi1 index with filter params:

```json
{
  "TableName": "HR-Table",
  "KeyConditionExpression": "#SK = :SK",
  "ExpressionAttributeNames": {
    "#SK": "SK",
    "#Warehouse1": "Warehouse1"
  },
  "ExpressionAttributeValues": {
    ":SK": "PRODUCT1"
  },
  "IndexName": "gsi1",
  "FilterExpression": "attribute_exists(#Warehouse1)"
}
```

#### Matching Records

| SK (HASH) | Data (RANGE)                 |                     |                    |                    |
| --------- | ---------------------------- | ------------------- | ------------------ | ------------------ |
| PRODUCT1  | Quickcrete Cement - 50lb bag | **PK:** OE-PRODUCT1 | **Warehouse1:** 46 | **Warehouse2:** 12 |

### Get customers by Account Rep

Perform a [DocumentClient.query](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#query-property "DocumentClient.query") against the Gsi1 index with filter params:

```json
{
  "TableName": "HR-Table",
  "KeyConditionExpression": "#SK = :SK",
  "ExpressionAttributeNames": {
    "#SK": "SK",
    "#Address": "Address"
  },
  "ExpressionAttributeValues": {
    ":SK": "EMPLOYEE1"
  },
  "IndexName": "gsi1",
  "FilterExpression": "attribute_exists(#Address)"
}
```

#### Matching Records

| SK (HASH) | Data (RANGE)          |                      |                        |
| --------- | --------------------- | -------------------- | ---------------------- |
| EMPLOYEE1 | Ace Building Supplies | **PK:** OE-CUSTOMER1 | **Address:** 1600 Penn |

### Get orders by Account Rep and date

> Scatter/Gather to query all statuses (OPEN, PENDING, FULFILLED)

Perform a [DocumentClient.query](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#query-property "DocumentClient.query") against the Gsi1 index with a `#Data = :Data` condition on the sort key:

```json
{
  "TableName": "HR-Table",
  "KeyConditionExpression": "#SK = :SK and #Data = :Data",
  "ExpressionAttributeNames": {
    "#SK": "SK",
    "#Data": "Data"
  },
  "ExpressionAttributeValues": {
    ":SK": "EMPLOYEE1",
    ":Data": "OPEN#2019-01-12"
  },
  "IndexName": "gsi1"
}
```

#### Matching Records

| SK (HASH) | Data (RANGE)    |                   |                      |
| --------- | --------------- | ----------------- | -------------------- |
| EMPLOYEE1 | OPEN#2019-01-12 | **PK:** OE-ORDER1 | **OrderTotal:** 2500 |

### Get all employees with specific Job Title

Perform a [DocumentClient.query](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#query-property "DocumentClient.query") against the Gsi1 index:

```json
{
  "TableName": "HR-Table",
  "KeyConditionExpression": "#SK = :SK",
  "ExpressionAttributeNames": {
    "#SK": "SK"
  },
  "ExpressionAttributeValues": {
    ":SK": "v0"
  },
  "IndexName": "gsi1"
}
```

#### Matching Records

| SK (HASH) | Data (RANGE)              |                      |
| --------- | ------------------------- | -------------------- |
| v0        | Principle Account Manager | **PK:** HR-EMPLOYEE1 |

### Get inventory by Product and Warehouse

Perform a [DocumentClient.get](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#get-property "DocumentClient.get") against the Main index:

```json
{
  "TableName": "HR-Table",
  "Key": {
    "PK": "OE-PRODUCT1",
    "SK": "PRODUCT1"
  }
}
```

#### Matching Records

| PK (HASH)   | SK (RANGE) |                                        |                    |                    |
| ----------- | ---------- | -------------------------------------- | ------------------ | ------------------ |
| OE-PRODUCT1 | PRODUCT1   | **Data:** Quickcrete Cement - 50lb bag | **Warehouse1:** 46 | **Warehouse2:** 12 |

### Get total product inventory

Perform a [DocumentClient.get](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#get-property "DocumentClient.get") against the Main index:

```json
{
  "TableName": "HR-Table",
  "Key": {
    "PK": "OE-PRODUCT1",
    "SK": "PRODUCT1"
  }
}
```

#### Matching Records

| PK (HASH)   | SK (RANGE) |                                        |                    |                    |
| ----------- | ---------- | -------------------------------------- | ------------------ | ------------------ |
| OE-PRODUCT1 | PRODUCT1   | **Data:** Quickcrete Cement - 50lb bag | **Warehouse1:** 46 | **Warehouse2:** 12 |

### Get Account Reps ranked by Order Total and Sales Period

Perform a [DocumentClient.query](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#query-property "DocumentClient.query") against the Gsi1 index:

```json
{
  "TableName": "HR-Table",
  "KeyConditionExpression": "#SK = :SK",
  "ExpressionAttributeNames": {
    "#SK": "SK"
  },
  "ExpressionAttributeValues": {
    ":SK": "2018-Q4"
  },
  "ScanIndexFoward": false,
  "IndexName": "gsi1"
}
```

#### Matching Records

| SK (HASH) | Data (RANGE) |                      |                               |
| --------- | ------------ | -------------------- | ----------------------------- |
| 2018-Q4   | 10000        | **PK:** HR-EMPLOYEE2 | **Employee Name:** John Smith |
| 2018-Q4   | 5000         | **PK:** HR-EMPLOYEE1 | **Employee Name:** John Smith |

## Indexes

### Main

| PK (HASH)    | SK (RANGE)      |                                        |                               |                        |
| ------------ | --------------- | -------------------------------------- | ----------------------------- | ---------------------- |
| HR-EMPLOYEE1 | EMPLOYEE1       | **Data:** John Smith                   | **StartDate:** 01-12-2019     |                        |
| HR-EMPLOYEE1 | v0              | **Data:** Principle Account Manager    |                               |                        |
| HR-EMPLOYEE1 | HR-CONFIDENTIAL | **Data:** 2019-02-12                   | **Employee:** John Smith      | **Salary:** 50000      |
| HR-EMPLOYEE1 | WAREHOUSE1      | **Data:** 2019-02-15                   | **Employee Name:** John Smith |                        |
| HR-EMPLOYEE1 | 2018-Q4         | **Data:** 5000                         | **Employee Name:** John Smith |                        |
| HR-EMPLOYEE2 | 2018-Q4         | **Data:** 10000                        | **Employee Name:** John Smith |                        |
| OE-ORDER1    | CUSTOMER1       | **Data:** OPEN#2019-01-18              | **GSI-Bucket:** Bucket-6      |                        |
| OE-ORDER1    | PRODUCT1        | **Data:** OPEN#2019-01-18              | **GSI-Bucket:** Bucket-4      | **UnitPrice:** \$89.99 |
| OE-ORDER1    | EMPLOYEE1       | **Data:** OPEN#2019-01-12              | **OrderTotal:** 2500          |                        |
| OE-PRODUCT1  | PRODUCT1        | **Data:** Quickcrete Cement - 50lb bag | **Warehouse1:** 46            | **Warehouse2:** 12     |
| OE-CUSTOMER1 | CUSTOMER1       | **Data:** Ace Building Supplies        | **Address:** 1600 Penn        |                        |
| OE-CUSTOMER1 | EMPLOYEE1       | **Data:** Ace Building Supplies        | **Address:** 1600 Penn        |                        |

### Gsi1

| SK (HASH)       | Data (RANGE)                 |                      |                               |                        |
| --------------- | ---------------------------- | -------------------- | ----------------------------- | ---------------------- |
| EMPLOYEE1       | John Smith                   | **PK:** HR-EMPLOYEE1 | **StartDate:** 01-12-2019     |                        |
| v0              | Principle Account Manager    | **PK:** HR-EMPLOYEE1 |                               |                        |
| HR-CONFIDENTIAL | 2019-02-12                   | **PK:** HR-EMPLOYEE1 | **Employee:** John Smith      | **Salary:** 50000      |
| WAREHOUSE1      | 2019-02-15                   | **PK:** HR-EMPLOYEE1 | **Employee Name:** John Smith |                        |
| 2018-Q4         | 5000                         | **PK:** HR-EMPLOYEE1 | **Employee Name:** John Smith |                        |
| 2018-Q4         | 10000                        | **PK:** HR-EMPLOYEE2 | **Employee Name:** John Smith |                        |
| CUSTOMER1       | OPEN#2019-01-18              | **PK:** OE-ORDER1    | **GSI-Bucket:** Bucket-6      |                        |
| PRODUCT1        | OPEN#2019-01-18              | **PK:** OE-ORDER1    | **GSI-Bucket:** Bucket-4      | **UnitPrice:** \$89.99 |
| EMPLOYEE1       | OPEN#2019-01-12              | **PK:** OE-ORDER1    | **OrderTotal:** 2500          |                        |
| PRODUCT1        | Quickcrete Cement - 50lb bag | **PK:** OE-PRODUCT1  | **Warehouse1:** 46            | **Warehouse2:** 12     |
| CUSTOMER1       | Ace Building Supplies        | **PK:** OE-CUSTOMER1 | **Address:** 1600 Penn        |                        |
| EMPLOYEE1       | Ace Building Supplies        | **PK:** OE-CUSTOMER1 | **Address:** 1600 Penn        |                        |

### Gsi2

| GSI-Bucket (HASH) | Data (RANGE)    |                   |                   |                        |
| ----------------- | --------------- | ----------------- | ----------------- | ---------------------- |
| Bucket-6          | OPEN#2019-01-18 | **PK:** OE-ORDER1 | **SK:** CUSTOMER1 |                        |
| Bucket-4          | OPEN#2019-01-18 | **PK:** OE-ORDER1 | **SK:** PRODUCT1  | **UnitPrice:** \$89.99 |

## Author

Spec authored by Eric Allam and generated by [dynamodb-spec-generator](https://github.com/ericallam/dynamodb-spec-generator "DynamoDB Spec Generator")

</details>

## DynamoDB Spec

## TODO

- Ability to use a live table
- Code generation
- Link to the Indexes in the Access Pattern descriptions
- Query counts
- Query projection
- Query attributes to get
- Consistent reads
- Shards
- Scatter/Gather access patterns
- Pagination
- Local Secondary Indexes
- TTL attribute
- Updates/Puts
- Embed the spec json in the generated markdown as a comment
- Ability to group access patterns by section
- Add more information about each index instead of just showing records

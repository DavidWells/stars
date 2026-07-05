---
repo: keitakn/serverless-log-analysis
url: 'https://github.com/keitakn/serverless-log-analysis'
homepage: null
starredAt: '2018-11-21T04:55:59Z'
createdAt: '2018-08-04T16:48:16Z'
updatedAt: '2018-11-21T04:55:59Z'
language: TypeScript
license: MIT
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:02.097Z'
description: Analyze logs using "Amazon Kinesis Data Firehose" and "Amazon Athena"
tags:
  - amazon-kinesis
  - serverless
  - serverless-framework
  - typescript
---

# serverless-log-analysis

[![Build Status](https://travis-ci.org/keitakn/serverless-log-analysis.svg?branch=master)](https://travis-ci.org/keitakn/serverless-log-analysis)
[![Coverage Status](https://coveralls.io/repos/github/keitakn/serverless-log-analysis/badge.svg)](https://coveralls.io/github/keitakn/serverless-log-analysis)

Analyze logs using "Amazon Kinesis Data Firehose" and "Amazon Athena"

## Description of npm script

### athena:createDatabase

Create the specified database.

e.g. Create `web_api` in QA environment.

Please write the following to `event.json`.

```json
{
  "databaseName": "web_api"
}
```

```bash
yarn run athena:createDatabase:qa
```

### athena:createTable

Create the specified table.

e.g. Create `web_api.app_logs` in QA environment.

Please write the following to `event.json`.

```json
{
  "databaseName": "web_api",
  "tableName": "app_logs"
}
```

```bash
yarn run athena:createTable:qa
```

### athena:createAllDatabase

Create all the defined databases.

e.g. Run in QA environment.

```bash
yarn run athena:createAllDatabase:qa
```

### athena:createAllTable

Create all the defined tables.

e.g. Run in QA environment.

```bash
yarn run athena:createAllTable:qa
```

### athena:addPartition

Add Partition to the defined table.

e.g. Run in QA environment.

```json
{
  "databaseName": "web_api",
  "tableName": "app_logs",
  "fromDate": "2018-08-15",
  "toDate": "2018-08-15"
}
```

```bash
yarn run athena:addPartition:qa
```

For tables partitioned in Hive format, put the same values in `fromDate` and` toDate`.

Describe examples below.

```json
{
  "databaseName": "web_api",
  "tableName": "app_logs",
  "fromDate": "2018-08-15",
  "toDate": "2018-08-15"
}
```

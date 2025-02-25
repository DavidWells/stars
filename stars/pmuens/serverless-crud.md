---
repo: pmuens/serverless-crud
url: 'https://github.com/pmuens/serverless-crud'
homepage: 'http://serverless.com'
starredAt: '2016-10-18T07:34:27Z'
createdAt: '2016-10-06T20:55:47Z'
updatedAt: '2025-01-13T15:13:53Z'
language: JavaScript
license: NA
branch: master
stars: 128
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:18.308Z'
description: Serverless CRUD service
tags: []
---

# Serverless CRUD

Serverless service which provides a basic CRUD scaffold.

## Installation

Make sure that you use Serverless v1.

1. Run `serverless install --url https://github.com/pmuens/serverless-crud` to install the service in your current working directory
2. Next up cd into the service with `cd serverless-crud`
3. Run `npm install`
4. Deploy with `serverless deploy`

## How to use

Simply perform requests against the exposed endpoints:

### Create

```bash
curl -X POST https://XXXX.execute-api.region.amazonaws.com/dev/todos --data '{ "body" : "Learn Serverless" }'
```

### Read all


```bash
curl https://XXXX.execute-api.region.amazonaws.com/dev/todos
```

### Read one

```bash
curl https://XXXX.execute-api.region.amazonaws.com/dev/todos/<id>
```

### Update

```bash
curl -X PUT https://XXXX.execute-api.region.amazonaws.com/dev/todos/<id> --data '{ "body" : "Understand Serverless" }'
```

### DELETE

```bash
curl -X DELETE https://XXXX.execute-api.region.amazonaws.com/dev/todos/<id>
```

## AWS services used

- Lambda
- API Gateway
- DynamoDB

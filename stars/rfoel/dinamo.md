---
repo: rfoel/dinamo
url: 'https://github.com/rfoel/dinamo'
homepage: ''
starredAt: '2022-12-01T01:46:41Z'
createdAt: '2022-09-26T20:28:32Z'
updatedAt: '2023-07-02T14:48:59Z'
language: TypeScript
license: MIT
branch: main
stars: 6
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:00:08.949Z'
description: Amazon Dynamo (Amazon DynamoDB) opinionated utilities for Node.js.
tags:
  - aws-sdk
  - dynamo
  - dynamodb
  - hacktoberfest
  - node
  - nodejs
---

# Dinamo

[Amazon Dynamo (Amazon DynamoDB)](https://aws.amazon.com/dynamodb/) _opinionated_ utilities for Node.js.

[![NPM version](https://badge.fury.io/js/dinamo.svg)](http://badge.fury.io/js/dinamo)

[![npm](https://nodei.co/npm/dinamo.png)](https://www.npmjs.com/package/dinamo)

## Getting started

First install the library:

```sh
npm i dinamo @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb
```

> Note that `@aws-sdk/client-dynamodb` and `@aws-sdk/lib-dynamodb` are peer dependencies for this library, so instead of bundling it with the package you MUST install it separately.

Then create an instance in your code:

```js
import Dinamo from 'dinamo'

const dinamo = new Dinamo({ tableName: 'my-table' })
```

If you are using DynamoDB in a Docker container you can pass the endpoint as a parameter:

```js
const dinamo = new Dinamo({
  endpoint: 'http://localhost:8000',
  tableName: 'my-table',
})
```

You can also configure the AWS SDK client logger:

```js
const dinamo = new Dinamo({
  logger: console,
  tableName: 'my-table',
})
```

## Usage

### `batchGet`

Gets items in batch.

```js
await dinamo.batchGet({ keys: [{ id: 'a' }, { id: 'b' }, { id: 'c' }] })
```

### `decrement`

Decrements an item. Step is optional.

```js
await dinamo.decrement({ key: { id: 'a' }, field: 'count', step: 1 })
```

### `delete`

Soft deletes an item, i.e., adds a flag `deletedAt` with the timestamp of deletion. This is true by default and `query` and `scan` will filter out the deleted items by default too.

```js
await dinamo.delete({ key: { id: 'a' }, soft: true })
```

Deletes an item from the database.

```js
await dinamo.delete({ key: { id: 'a' }, soft: false })
```

### `get`

Gets a single item.

```js
await dinamo.get({ key: { id: 'a' } })
```

### `increment`

Increments an item. Step is optional.

```js
await dinamo.increment({ key: { id: 'a' }, field: 'count', step: 1 })
```

### `put`

Puts an item.

```js
await dinamo.put({ item: { id: 'a', foo: 'bar' } })
```

### `query`

Queries items from the database.

```js
await dinamo.query({ key: { id: 'a' } })
```

With `indexName`.

```js
await dinamo.query({ key: { id: 'a' }, indexName: 'dateIdIndex' })
```

Filtering items.

```js
await dinamo.query({ key: { id: 'a' }, query: { foo: 'bar' } })
```

Disable filtering soft deletes.

```js
await dinamo.query({ key: { id: 'a' }, filterDeleted: false })
```

Limiting items.

```js
await dinamo.query({ key: { id: 'a' }, limit: 10 })
```

Reverse ordering items based on range key.

```js
await dinamo.query({ key: { id: 'a' }, scanIndexForward: true })
```

### `scan`

Scans items from the database.

```js
await dinamo.scan({ query: { id: 'a' } })
```

Recursively scan items.

```js
await dinamo.scan({ query: { id: 'a' }, recursive: true })
```

Disable filtering soft deletes

```js
await dinamo.scan({ query: { id: 'a' }, filterDeleted: false })
```

### `update`

Updates an item.

```js
await dinamo.update({ key: { id: 'a' }, item: { foo: 'baz' } })
```

## Contributing

Issues and pull requests are welcome.

## License

[MIT](https://github.com/rfoell/dinamo/blob/main/LICENSE)

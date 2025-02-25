---
repo: simple-dev-tools/dynamodb-as-cache
url: 'https://github.com/simple-dev-tools/dynamodb-as-cache'
homepage: ''
starredAt: '2024-12-29T01:29:15Z'
createdAt: '2021-05-08T13:40:41Z'
updatedAt: '2024-12-29T09:56:28Z'
language: JavaScript
license: MIT
branch: main
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:53:34.623Z'
description: >-
  Use DynamoDB as cache service, providing Redis-like APIs and reducing the
  boilerplate of dealing low-level DynamoDB APIs.
tags: []
---

[![NPM](https://nodei.co/npm/dynamodb-as-cache.png)](https://www.npmjs.com/package/dynamodb-as-cache)

# DynamoDB as Cache

Use DynamoDB as cache service, providing Redis-like APIs and reducing the boilerplate of dealing low-level DynamoDB APIs. 

## Why

DynamoDB requires minimum maintenance overhead and has acceptable performance in caching data. Often we just need a simple centralized key-value storage for our distributed services. 

Where extreme performance is required, we can still easily migrate our code to use Redis. 


## Installation

```shell
npm i dynamodb-as-cache
```

## Example

```js
const { DCacheClient } = require('../index')
const { promisify } = require('util')

const sleep = promisify(setTimeout)

async function main() {
  try {
    const client = new DCacheClient({
      region: process.env.AWS_REGION,
      tableName: process.env.TABLE_NAME
    })

    await client.set('foo', { message: 'hello foo' }, 1)
    await client.set('bar', { message: 'hello bar' }, 10)
    await sleep(3000)
    const v1 = await client.get('foo')
    const v2 = await client.get('bar')

    v1? console.log('v1: cache hit =>', v1) : console.log('v1: cache miss')
    v2? console.log('v2: cache hit =>', v2) : console.log('v2: cache miss')

    const _v3 = await client.getset('foo', { message: 'hello foo again' }, 1)
    const _v4 = await client.getset('bar', { message: 'hello bar again' }, 10)
    const v3 = await client.get('foo')
    const v4 = await client.get('bar')
    console.log(`v3: old = ${_v3}  new= ${v3}`)    
    console.log(`v4: old = ${_v4}  new= ${v4}`)    

  } catch (e) {
    console.error('something went wrong', e)
  }
}

main().catch(console.error)

```

## API

### constructor(options)

#### Options
* `region` - _string_, required. AWS region, e.g. us-east-1
* `tableName` - _string_, required. DynamoDB table name
* `accessKeyId` - _string_, optional. AWS Access Key Id
* `secretAccessKey` - _string_, optional. AWS Secret Access Key
* `partionKey` - _string_, optional. (default: `pkey`)
* `sortKey` - _string_, optional. (default: `skey`)
* `ttlAttribute` - _string_, optional. (default: `ttl`)
* `consistentRead` - _boolean_, optional. (default: `false`)
* `defaultSortKeyValue` - _string_, optional. (default: `DCache`)

### set(pkey, value, ttl = null, options)

Returns Promise, which 
* __resovled__ with empty object
* __rejected__ when dynamodb throws error

Arguments: 
* `pkey` partition key
* `value` value to cache
* `ttl` time to live (in seconds), `default: null`
* `options` options, `default: {}`

### getset(pkey, value, ttl = null, options)

Returns Promise, which 
* __resovled__ with old cached value
* __rejected__ when dynamodb throws error

Arguments: 
* `pkey` partition key
* `value` value to cache
* `ttl` time to live (in seconds), `default: null`
* `options` options, `default: {}`

### get(pkey, options)

Returns Promise, which 
* __resovled__ with cached value
* __rejected__ when dynamodb throws error

Arguments: 
* `pkey` partition key
* `options` options, `default: {}`

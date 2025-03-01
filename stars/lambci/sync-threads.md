---
repo: lambci/sync-threads
url: 'https://github.com/lambci/sync-threads'
homepage: ''
starredAt: '2020-11-01T00:04:02Z'
createdAt: '2020-10-31T23:30:49Z'
updatedAt: '2023-12-19T05:30:11Z'
language: JavaScript
license: MIT
branch: master
stars: 39
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:24.665Z'
description: Perform async work synchronously in Node.js using worker threads
tags: []
---

# sync-threads

Make asynchronous calls in Node.js synchronously.

Behind the scenes it uses [worker threads](https://nodejs.org/api/worker_threads.html) and [Atomics semaphores](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics).

Especially useful when you need to resolve promises at require-time,
for example in an AWS Lambda function when using [provisioned concurrency](https://docs.aws.amazon.com/lambda/latest/dg/configuration-concurrency.html#configuration-concurrency-provisioned).

NOTE: you don't need this library if you're happy with the overhead of creating a Node.js subprocess,
see the [Appendix](#appendix) for details.

# Example

This example shows how we can synchronously retrieve secrets from [AWS SSM](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html)
at require-time – that is, before the init stage of Lambda has finished.

`index.js`:

```js
const { createSyncFn } = require('sync-threads')

// Create our synchronous function
const getSsmSecretSync = createSyncFn('./worker.js')

// Call it at init (require) time, no async needed!
const secret = getSsmSecretSync('/my-secret')

// Logged at init time
console.log({ secret, source: 'init' })

exports.handler = async () => {
  // This value can be used in our handler without needing to resolve anything async
  console.log({ secret, source: 'handler' })
}
```

`worker.js`:

```js
const SSM = require('aws-sdk/clients/ssm')
const { runAsWorker } = require('sync-threads')

const ssm = new SSM()

runAsWorker(async (ssmParamName) => {
  const {
    Parameter: { Value },
  } = await ssm.getParameter({ Name: ssmParamName, WithDecryption: true }).promise()
  return Value
})
```

You can see this example, as well as how you'd bundle it if you're using webpack or similar, in the [`examples`](./examples) directory.

# API

## `createSyncFn(filename[, bufferSize])`

Returns a synchronous function that will run the specified file as a worker, serialize and pass in the first argument you give it, and wait for the result.

By default uses a `bufferSize` of `64 * 1024` (64kb) to share with the worker process for the seralized result – you'll want to increase this if you're returning larger objects than this from your async function.

```js
const { createSyncFn } = require('sync-threads')
const mySyncFn = createSyncFn('./worker.js')

// Will serialize the input arg and pass it to the worker thread
const { whatever } = mySyncFn({ some: 'input', thing: 23 })
```

## `runAsWorker(workerAsyncFn)`

To be called from inside your worker code. It will run the given asynchronous function with the given arguments from the parent, serialize the result to the shared buffer and notify the parent.

```js
const { runAsWorker } = require('sync-threads')

// Takes the same arg as you pass to your sync function
runAsWorker(async ({ some, thing }) => {
  return { whatever: 'result' }
})
```

# Installation

With [npm](http://npmjs.org/) do:

```
npm install sync-threads
```

# Appendix

You can achieve something very similar to this library using the
`spawnSync`/`execSync` functions from the `child_process` module in Node.js.

Here's a simple example:

`index.js`:

```js
const { execSync } = require('child_process')

const { secret } = JSON.parse(execSync('node worker.js /my-secret', 'utf8').trim().split('\n').pop())

console.log({ secret, source: 'init' })

exports.handler = async () => {
  console.log({ secret, source: 'handler' })
}
```

`worker.js`:

```js
const SSM = require('aws-sdk/clients/ssm')

const ssm = new SSM()

;(async () => {
  const {
    Parameter: { Value },
  } = await ssm.getParameter({ Name: process.argv[2], WithDecryption: true }).promise()
  process.stdout.write('\n' + JSON.stringify({ secret: Value }))
})()
```

The main advantages this library brings over the above method are:

1. Less overhead because we don't exec a separate process
2. It uses faster v8 serialization instead of JSON parsing
3. It will catch async exceptions in the worker and rethrow them from the sync function

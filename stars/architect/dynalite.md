---
repo: architect/dynalite
url: 'https://github.com/architect/dynalite'
homepage: ''
starredAt: '2024-12-27T06:33:06Z'
createdAt: '2013-06-17T08:54:51Z'
updatedAt: '2025-02-17T05:01:56Z'
language: JavaScript
license: Apache-2.0
branch: main
stars: 1043
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:53:36.730Z'
description: An implementation of Amazon's DynamoDB built on LevelDB
tags: []
---

# dynalite

[![GitHub CI status](https://github.com/architect/dynalite/workflows/Node%20CI/badge.svg)](https://github.com/architect/dynalite/actions?query=workflow%3A%22Node+CI%22)

An implementation of Amazon's DynamoDB built on LevelDB
(well, [@rvagg](https://github.com/rvagg)'s awesome [LevelUP](https://github.com/Level/levelup) to be precise)
for fast in-memory or persistent usage.

This project aims to match the live DynamoDB instances as closely as possible
(and is tested against them in various regions), including all limits and error messages.

## What about Amazon's DynamoDB Local?

This project was created before DynamoDB Local existed, and when it did, it differed a lot from the live instances
in ways that caused my company issues. Since then it's had a lot more development and resources thrown at it,
and is probably more up-to-date than dynalite is. I'd recommend using it over dynalite if you don't mind the
overhead of starting the JVM (or docker) each time. If you need a fast in-memory option that you can start up in
milliseconds, then dynalite might be more suitable for you.

## Example

```sh
$ dynalite --help

Usage: dynalite [--port <port>] [--path <path>] [options]

A DynamoDB http server, optionally backed by LevelDB

Options:
--help, -h            Display this help message and exit
--host                Listen on a specific host address (default: all available)
--port <port>         The port to listen on (default: 4567)
--path <path>         The path to use for the LevelDB store (in-memory by default)
--ssl                 Enable SSL for the web server (default: false)
--createTableMs <ms>  Amount of time tables stay in CREATING state (default: 500)
--deleteTableMs <ms>  Amount of time tables stay in DELETING state (default: 500)
--updateTableMs <ms>  Amount of time tables stay in UPDATING state (default: 500)
--maxItemSizeKb <kb>  Maximum item size (default: 400)
--verbose, -v         Enable verbose logging
--debug, -d           Enable debug logging

Report bugs at github.com/architect/dynalite/issues
```

Or programmatically:

```js
// Returns a standard Node.js HTTP server
var dynalite = require('dynalite')
var dynaliteServer = dynalite({ path: './mydb', createTableMs: 50 })

// Listen on port 4567
dynaliteServer.listen(4567, function(err) {
  if (err) throw err
  console.log('Dynalite started on port 4567')
})
```

Once running, here's how you use the [AWS SDK](https://github.com/aws/aws-sdk-js) to connect
(after [configuring the SDK](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/configuring-the-jssdk.html)):

```js
var AWS = require('aws-sdk')

var dynamo = new AWS.DynamoDB({ endpoint: 'http://localhost:4567' })

dynamo.listTables(console.log.bind(console))
```

## Installation

With [npm](https://www.npmjs.com/), to install the CLI:

```sh
npm install -g dynalite
```

Or to install for development/testing in your project:

```sh
npm install -D dynalite
```

## TODO

- Implement [Transactions](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/transaction-apis.html)
- Implement DynamoDB Streams
- Implement `ReturnItemCollectionMetrics` on all remaining endpoints
- Implement size info for tables and indexes
- Add ProvisionedThroughput checking
- See [open issues on GitHub](https://github.com/architect/dynalite/issues) for any further TODOs

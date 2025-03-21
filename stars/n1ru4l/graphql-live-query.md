---
repo: n1ru4l/graphql-live-query
url: 'https://github.com/n1ru4l/graphql-live-query'
homepage: ''
starredAt: '2020-09-10T23:20:48Z'
createdAt: '2020-08-10T18:28:21Z'
updatedAt: '2025-01-15T11:57:40Z'
language: TypeScript
license: MIT
branch: main
stars: 438
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:34.899Z'
description: Realtime GraphQL Live Queries with JavaScript
tags:
  - concept
  - graphql
  - graphql-clients
  - graphql-schema
  - hacktoberfest
  - hacktoberfest-accepted
  - real-time
  - realtime
  - relay
  - relay-modern
  - socket
  - socket-io
  - subscription
  - the-guild
---

<p align="center">
  <img src="assets/logo.svg" width="250" alt="GraphQL Live Query" />
   <br />
  <p align="center">
  Real-Time with any schema or transport.
  </p>
  <p align="center">
    <a href="https://the-guild.dev/blog/subscriptions-and-live-queries-real-time-with-graphql">Why Live Queries?</a>
    - <a href="https://dev.to/n1ru4l/graphql-live-queries-with-socket-io-4mh6">Read the introduction Post</a>
    - <a href="https://dev.to/n1ru4l/collecting-graphql-live-query-resource-identifier-with-graphql-tools-5fm5">Learn how Live Query Tracking works</a>
  </p>
  <br />
  <br />
</p>

## Packages in this Repository

| Package                                                                                             | Description                                                                                                                                      | Stats                                                                                                                                                                                                                                                                                                                                                              |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`@n1ru4l/in-memory-live-query-store`](packages/in-memory-live-query-store)                         | Live query implementation.                                                                                                                       | [![npm version](https://img.shields.io/npm/v/@n1ru4l/in-memory-live-query-store.svg)](https://www.npmjs.com/package/@n1ru4l/in-memory-live-query-store) [![npm downloads](https://img.shields.io/npm/dm/@n1ru4l/in-memory-live-query-store.svg)](https://www.npmjs.com/package/@n1ru4l/in-memory-live-query-store)                                                 |
| [`@n1ru4l/graphql-live-query`](packages/graphql-live-query)                                         | Utilities for live query implementations.                                                                                                        | [![npm version](https://img.shields.io/npm/v/@n1ru4l/graphql-live-query.svg)](https://www.npmjs.com/package/@n1ru4l/graphql-live-query) [![npm downloads](https://img.shields.io/npm/dm/@n1ru4l/graphql-live-query.svg)](https://www.npmjs.com/package/@n1ru4l/graphql-live-query)                                                                                 |
| [`@n1ru4l/graphql-live-query-patch-json-patch`](packages/graphql-live-query-patch-json-patch)       | Reduce live query payload size with JSON patches                                                                                                 | [![npm version](https://img.shields.io/npm/v/@n1ru4l/graphql-live-query-patch-json-patch.svg)](https://www.npmjs.com/package/@n1ru4l/graphql-live-query-patch-json-patch) [![npm downloads](https://img.shields.io/npm/dm/@n1ru4l/graphql-live-query-patch-json-patch.svg)](https://www.npmjs.com/package/@n1ru4l/graphql-live-query-patch-json-patch)             |
| [`@n1ru4l/graphql-live-query-patch-jsondiffpatch`](packages/graphql-live-query-patch-jsondiffpatch) | Reduce live query payload size with [`@n1ru4l/json-patch-plus`](https://github.com/n1ru4l/graphql-live-query/blob/main/packages/json-patch-plus) | [![npm version](https://img.shields.io/npm/v/@n1ru4l/graphql-live-query-patch-jsondiffpatch.svg)](https://www.npmjs.com/package/@n1ru4l/graphql-live-query-patch-jsondiffpatch) [![npm downloads](https://img.shields.io/npm/dm/@n1ru4l/graphql-live-query-patch-jsondiffpatch.svg)](https://www.npmjs.com/package/@n1ru4l/graphql-live-query-patch-jsondiffpatch) |
| [`@n1ru4l/socket-io-graphql-server`](packages/socket-io-graphql-server)                             | GraphQL over Socket.io - Server Middleware                                                                                                       | [![npm version](https://img.shields.io/npm/v/@n1ru4l/socket-io-graphql-server.svg)](https://www.npmjs.com/package/@n1ru4l/socket-io-graphql-server) [![npm downloads](https://img.shields.io/npm/dm/@n1ru4l/socket-io-graphql-server.svg)](https://www.npmjs.com/package/@n1ru4l/socket-io-graphql-server)                                                         |
| [`@n1ru4l/socket-io-graphql-client`](packages/socket-io-graphql-client)                             | GraphQL over Socket.io - Client                                                                                                                  | [![npm version](https://img.shields.io/npm/v/@n1ru4l/socket-io-graphql-client.svg)](https://www.npmjs.com/package/@n1ru4l/socket-io-graphql-client) [![npm downloads](https://img.shields.io/npm/dm/@n1ru4l/socket-io-graphql-client.svg)](https://www.npmjs.com/package/@n1ru4l/socket-io-graphql-client)                                                         |
| [`todo-example-app`](packages/todo-example)                                                         | Todo App with state sync across clients.                                                                                                         | -                                                                                                                                                                                                                                                                                                                                                                  |

## Motivation

There is no mature live query implementation that is not tied to any specific database or SaaS product. This implementation should serve as an example for showcasing how live queries can be added to any GraphQL.js schema with (almost) any GraphQL transport.

GraphQL already has a solution for real-time: Subscriptions. Those are the right tool for responding to events. E.g. triggering a sound or showing a toast message because someone poked you on Facebook. Subscriptions are also often used for updating existing query results on a client that consumes data from the same GraphQL API. Depending on the complexity of that data, cache update code for applying the subscription result can eventually become pretty bloated (!!! especially, for adding and removing list items). Often for developers it is more straight-forward to simply refetch the query once a subscription event is received instead of doing cache voodoo magic.

In contrast to manual cache updates using subscriptions, live queries should feel magical and update the UI with the latest data from the server without having to write any cache update wizardry code on the client.

## Concept

A live query is a query operation that is annotated with a `@live` directive.

```gql
query users @live {
  users(first: 10) {
    id
    login
  }
}
```

A live query is sent to the server (via a transport that supports delivering partial execution results) and registered.
The client receives a immediate execution result and furthermore receives additional (partial) execution results once the live query operation was invalidated and therefore the client data became stale.

The client can inform the server that it is no longer interested in the query (unsubscribe the live query operation).

On the server we have a live query invalidation mechanism that is used for determining which queries have become stale, and thus need to be rescheduled for execution.

Instead of sending the whole execution result, the server can diff the previous and the current execution result and only send a delta instruction to the client instead of the whole operation, resulting in less network overhead!

In a future implementation the server might only need to re-execute partial subtrees of a query operation instead of the whole operation.

### How does the server know the underlying data of a query operation has changed?

The reference `InMemoryLiveQueryStore` implementation uses an [ad hoc resource tracker](https://github.com/n1ru4l/graphql-live-query/tree/main/packages/in-memory-live-query-store/src/ResourceTracker.ts#L10), where an operation subscribes to the specific topics computed out of the query and resolved resources during the latest query execution.

A resource (in terms of the reference implementation) is described by a root query field schema coordinate (such as `Query.viewer` or `Query.users`), a root query field with id argument (`Query.user(id:"1")`) or a resource identifier (such as `User:1`). The latter is by default composed out of the resource typename and the non nullable id field of the given GraphQL type.

For the following type:

```graphql
type User {
  id: ID!
  name: String!
}
```

Legitimate resource identifiers could be `User:1`, `User:2`, `User:dfsg12`. Where the string after the first colon describes the id of the resource.

In case a resource has become stale it can be invalidated using the `InMemoryLiveQueryStore.invalidate` method, which results in all operations that select a given resource to be scheduled for re-execution.

**Practical example:**

```js
// somewhere inside a userChangeLogin mutation resolver
user.login = "n1ru4l";
user.save();
liveQueryStore.invalidate([
  // Invalidate all operations whose latest execution result contains the given user
  `User:${user.id}`,
  // Invalidate query operations that select the Query,user field with the id argument
  `Query.user(id:"${user.id}")`,
  // invalidate a list of all users (redundant with previous invalidations)
  `Query.users`,
]);
```

Those invalidation calls could be done manually in the mutation resolvers or on more global reactive level e.g. as a listener on a database write log. The possibilities are infinite. 🤔

For scaling horizontally the independent `InMemoryLiveQueryStore` instances [can be wired together via a PubSub system such as Redis](./packages/example-redis).

### How are the updates sent/applied to the client?

The transport layer can be any transport that allows sending partial execution results to the client.

Most GraphQL clients (including GraphiQL, Apollo, Relay and Urql) have support for Observable or async iterable data structures which are perfect for describing both Subscription and Live Queries. Ideally a GraphQL Live Query implementation uses a AsyncIterable or Observable for pushing the latest query data to the client framework that consumes the data.

### List of compatible transports/servers

List of known and tested compatible transports/servers. The order is alphabetical. Please feel free to add additional compatible transports to the list!

| Package                                                                                                                          | Transport                                                                                   | Version                                                                                                                                                                         | Downloads                                                                                                                                                                          |
| -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@n1ru4l/socket-io-graphql-server`](https://github.com/n1ru4l/graphql-live-queries/blob/main/packages/socket-io-graphql-server) | GraphQL over Socket.io (WebSocket/HTTP Long Polling)                                        | [![npm version](https://badge.fury.io/js/%40n1ru4l%2Fsocket-io-graphql-server.svg)](https://github.com/n1ru4l/graphql-live-queries/blob/main/packages/socket-io-graphql-server) | [![npm downloads](https://img.shields.io/npm/dm/@n1ru4l/socket-io-graphql-server.svg)](https://github.com/n1ru4l/graphql-live-queries/blob/main/packages/socket-io-graphql-server) |
| [`graphql-helix`](https://github.com/danielrearden/graphql-helix)                                                                | [GraphQL over HTTP](https://github.com/graphql/graphql-over-http) (IncrementalDelivery/SSE) | [![npm version](https://badge.fury.io/js/graphql-helix.svg)](https://github.com/danielrearden/graphql-helix)                                                                    | [![npm downloads](https://img.shields.io/npm/dm/graphql-helix.svg)](https://github.com/danielrearden/graphql-helix)                                                                |
| [`graphql-ws`](https://github.com/enisdenjo/graphql-ws)                                                                          | [GraphQL over WebSocket](https://github.com/graphql/graphql-over-http/pull/140) (WebSocket) | [![npm version](https://badge.fury.io/js/graphql-ws.svg)](https://github.com/enisdenjo/graphql-ws)                                                                              | [![npm downloads](https://img.shields.io/npm/dm/graphql-ws.svg)](https://github.com/enisdenjo/graphql-ws)                                                                          |

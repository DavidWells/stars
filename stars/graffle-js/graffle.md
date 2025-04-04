---
repo: graffle-js/graffle
url: 'https://github.com/graffle-js/graffle'
homepage: 'http://graffle.js.org/'
starredAt: '2020-01-25T02:42:43Z'
createdAt: '2017-05-10T20:05:07Z'
updatedAt: '2025-02-25T06:52:09Z'
language: TypeScript
license: MIT
branch: main
stars: 5952
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:06.476Z'
description: >-
  Simple GraphQL Client for JavaScript. Minimal. Extensible. Type Safe. Runs
  everywhere.
tags:
  - graphql
  - graphql-client
  - graphql-request
  - lightweight
  - nodejs
  - typescript
---

> [!IMPORTANT]
> The next version (`8`) of `graphql-request` is being renamed to `graffle`. It has the same base simplicity but with many fixes, enhancements, and major new type safe features.
> It is not released yet but will be in the coming weeks/months and is already usable. Learn more about it [here](https://github.com/graffle-js/graffle/discussions/1026). You can see the in progress website at https://graffle.js.org.
>
> The following README is still for `graphql-request@7.x.x`

# graphql-request

Minimal GraphQL client supporting Node and browsers for scripts or simple apps.

![GitHub Action](https://github.com/graffle-js/graffle/workflows/trunk/badge.svg) [![npm version](https://badge.fury.io/js/graffle.svg)](https://badge.fury.io/js/graffle)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Highlights](#highlights)
- [Install](#install)
  - [TypeScript Setup](#typescript-setup)
- [Quick Start](#quick-start)
- [Examples](#examples)
- [Node Version Support](#node-version-support)
- [Reference](#reference)
  - [Configuration](#configuration)
    - [ErrorPolicy](#errorpolicy)
      - [None (default)](#none-default)
      - [Ignore](#ignore)
      - [All](#all)
  - [IgnoreOperationName](#ignoreoperationname)
- [Knowledge Base](#knowledge-base)
  - [Why was the file upload feature taken away? Will it return?](#why-was-the-file-upload-feature-taken-away-will-it-return)
  - [Why do I have to install `graphql`?](#why-do-i-have-to-install-graphql)
  - [Do I need to wrap my GraphQL documents inside the `gql` template exported by `graffle`?](#do-i-need-to-wrap-my-graphql-documents-inside-the-gql-template-exported-by-graffle)
  - [What sets `graffle` apart from other clients like Apollo, Relay, etc.?](#what-sets-graffle-apart-from-other-clients-like-apollo-relay-etc)
- [Project Stats](#project-stats)
  - [Package Installs](#package-installs)
  - [Repo Beats](#repo-beats)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Highlights

- Most **simple & lightweight** GraphQL client
- Promise-based API (works with `async` / `await`)
- [Pure ESM package](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c)
- First class TypeScript support
  - Including `TypedDocumentNode`
- Isomorphic (works in both Node and Browsers)

## Install

```sh
npm add graffle graphql
```

#### TypeScript Setup

This package uses [`package.exports`](https://www.typescriptlang.org/docs/handbook/modules/reference.html#packagejson-exports). Therefore if you are a TypeScript user you must:

1. have your `tsconfig.json` `moduleResolution` set to [`"bundler"`](https://www.typescriptlang.org/docs/handbook/modules/reference.html#bundler) or [`"node16"`/`"nodenext"`](https://www.typescriptlang.org/docs/handbook/modules/reference.html#node16-nodenext-1).
2. Have your `package.json` `type` set to `"module"`.

## Quick Start

Send a GraphQL document using a static request function:

```js
import { gql, request } from 'graffle'

const document = gql`
  {
    company {
      ceo
    }
  }
`
await request('https://api.spacex.land/graphql/', document)
```

The function can be passed a configuration object for more complex cases:

```ts
await request({
  url,
  document,
  variables,
  requestHeaders,
})
```

A class is available for constructing your own instances:

```js
import { gql, GraphQLClient } from 'graffle'

const document = gql`
  {
    company {
      ceo
    }
  }
`
const endpoint = 'https://api.spacex.land/graphql/'
const client = new GraphQLClient(endpoint)
await client.request(document)
```

## Examples

- Request:
  - [Authentication via HTTP header](https://github.com/graffle-js/graffle/tree/graphql-request/examples/request-authentication-via-http-header.ts)
  - [Method GET](https://github.com/graffle-js/graffle/tree/graphql-request/examples/request-method-get.ts)
  - [Cancellation](https://github.com/graffle-js/graffle/tree/graphql-request/examples/request-cancellation.ts)
  - [Headers Per Request (static)](https://github.com/graffle-js/graffle/tree/graphql-request/examples/request-headers-static-per-request.ts)
  - [Headers Per Request (dynamic)](https://github.com/graffle-js/graffle/tree/graphql-request/examples/request-headers-dynamic-per-request.ts)
  - [Handle Raw Response](https://github.com/graffle-js/graffle/tree/graphql-request/examples/request-handle-raw-response.ts)
- GraphQL:
  - [Document Variables](https://github.com/graffle-js/graffle/tree/graphql-request/examples/graphql-document-variables.ts)
  - [Mutation](https://github.com/graffle-js/graffle/tree/graphql-request/examples/graphql-mutations.ts)
  - [Batching Requests](https://github.com/graffle-js/graffle/tree/graphql-request/examples/graphql-batching-requests.ts)
- Configuration:
  - [Fetch: Passing Options](https://github.com/graffle-js/graffle/tree/graphql-request/examples/configuration-fetch-options.ts)
  - [Custom JSON Serializer](https://github.com/graffle-js/graffle/tree/graphql-request/examples/configuration-request-json-serializer.ts)
  - [Incremental: Set Endpoint](https://github.com/graffle-js/graffle/tree/graphql-request/examples/configuration-incremental-endpoint.ts)
  - [Incremental: Set Request Headers](https://github.com/graffle-js/graffle/tree/graphql-request/examples/configuration-incremental-request-headers.ts)
- TypeScript:
  - [Use `TypedDocumentNode`](https://github.com/graffle-js/graffle/tree/graphql-request/examples/typescript-typed-document-node.ts)
- Other:
  - [Middleware](https://github.com/graffle-js/graffle/tree/graphql-request/examples/other-middleware.ts)
  - [Error Handling](https://github.com/graffle-js/graffle/tree/graphql-request/examples/other-error-handling.ts)

## Node Version Support

We only (officially) support [versions of Nodejs](https://github.com/nodejs/Release#release-schedule) of the following status:

- Current
- LTS
- Maintenance _and end of life not yet reached_

So for example on Oct 24 2023 that would mean these versions: 18, 20, 21.

Any issue that exists solely for an unsupported version of Nodejs will be rejected (not worked on).

## Reference

⚠️ This reference is incomplete. Check out the [examples](https://github.com/graffle-js/graffle/tree/graphql-request/examples/) for more reference material.

### Configuration

#### ErrorPolicy

By default GraphQLClient will throw when an error is received. However, sometimes you still want to resolve the (partial) data you received.
You can define `errorPolicy` in the `GraphQLClient` constructor.

```ts
const client = new GraphQLClient(endpoint, { errorPolicy: 'all' })
```

##### None (default)

Allow no errors at all. If you receive a GraphQL error the client will throw.

##### Ignore

Ignore incoming errors and resolve like no errors occurred

##### All

Return both the errors and data, only works with `rawRequest`.

### IgnoreOperationName

OperationName has been introduced to address issues reported here [Support operation name](https://github.com/graffle-js/graffle/issues/64),
However, on certain occasions this information may not be needed in requests. In such cases, you might consider ignoring operationName to avoid the extraction steps currently performed by a parsing operation when the document is provided in string format.

By default the GraphQLClient tries to extract the operationName from the document.
You can define `excludeOperationName` in the constructor of GraphQLClient to avoid the extraction process if it is not needed. This can be useful if you don't use operationName and want to optimise queries by reducing the amount of computation as much as possible, especially if we are in a context where we are using documents in string format to reduce bundle size.

```ts
// example where the operation name is not ignored
const client = new GraphQLClient(endpoint, {
  method: 'POST',
})
// example in which the operation name is ignored
const client = new GraphQLClient(endpoint, {
  method: 'POST',
  excludeOperationName: true,
})
```

## Knowledge Base

#### Why was the file upload feature taken away? Will it return?

In [this issue](https://github.com/graffle-js/graffle/issues/500) we decided to make this library more stable and maintainable. In principal the feature is still in scope of this library and will make a return when we find time to do the feature right.

#### Why do I have to install `graphql`?

`graffle` uses methods exposed by the `graphql` package to handle some internal logic. On top of that, for TypeScript users, some types are used from the `graphql` package to provide better typings.

#### Do I need to wrap my GraphQL documents inside the `gql` template exported by `graffle`?

No. It is there for convenience so that you can get the tooling support like automatic formatting and syntax highlighting. You can use `gql` from `graphql-tag` if you need it for some reason too.

#### What sets `graffle` apart from other clients like Apollo, Relay, etc.?

`graffle` is the most minimal and simplest to use GraphQL client. It's perfect for small scripts or simple apps.

Compared to GraphQL clients like Apollo or Relay, `graffle` doesn't have a built-in cache and has no integrations for frontend frameworks. The goal is to keep the package and API as minimal as possible.

## Project Stats

### Package Installs

<a href="https://npm-compare.com/graphql-request#timeRange=FIVE_YEARS" target="_blank">
  <img src="https://npm-compare.com/img/npm-trend/FIVE_YEARS/graphql-request.png" width="100%" alt="NPM Usage Trend of graphql-request" />
</a>

### Repo Beats

![Alt](https://repobeats.axiom.co/api/embed/aeb7beaee43b190e90868357c5a2898f517fb63e.svg "Repobeats analytics image")

---
repo: zaiste/next-graphql-server
url: 'https://github.com/zaiste/next-graphql-server'
homepage: 'https://demo-graphql.vercel.app/'
starredAt: '2022-03-06T05:25:06Z'
createdAt: '2022-03-05T01:52:58Z'
updatedAt: '2024-09-03T01:01:24Z'
language: TypeScript
license: Apache-2.0
branch: main
stars: 88
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:02.959Z'
description: >-
  next-graphql-server is a library for building production-grade GraphQL servers
  using Next.js with API Routes
tags:
  - graphql
  - graphql-js
  - graphql-server
  - graphql-tools
  - nextjs
  - nextjs-plugin
  - nextjs-serverless
  - nextjs-typescript
  - typescript
---

# next-graphql-server

`next-graphql-server` is an easy to use Next.js library for creating performant GraphQL endpoints on top of [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction).

Start building GraphQL servers with Next.js.

## Features

* built using [Envelop](https://www.envelop.dev) and [Helix](https://graphql-helix.vercel.app) - stackable and easy to extend architecture
* supports Vercel Edge functions 

## Getting Started 

Create a Next.js project:

```
pnpm create next-app --typescript
```

Add `next-graphql-server` as a dependency to your Next.js project:

```
pnpm add next-graphql-server
```

**Note**: `pnpm` is preferred, but you can also use `npm` or `yarn`

```
npm install next-graphql-server
```

```
yarn add next-graphql-server
```

## Usage

`next-graphql-server` uses [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction). Create the `pages/api/graphql.ts` with the following content:

**Note**: The file in `pages/api` must be named `graphql`

### with `graphql`

Add `graphql` 

```
pnpm add graphql
```

```ts
import { createGraphQLHandler } from "next-graphql-server";
import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: () => ({
      hello: {
        type: GraphQLString,
        resolve: () => "world",
      },
    }),
  }),
});

const handler = createGraphQLHandler(schema);
export default handler;
```

### with `@graphql-tools` 

Add `@graphql-tools/schema`

```
pnpm add @graphql-tools/schema
```

In `pages/api/graphql.ts` define your handler as shown below:

```ts
import { createGraphQLHandler } from "next-graphql-server";
import { makeExecutableSchema } from "@graphql-tools/schema";

export const schema = makeExecutableSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      hello: String!
    }
  `,
  resolvers: {
    Query: {
      hello: () => 'World',
    },
  },
});

const handler = createGraphQLHandler(schema);
export default handler;
```

### with Pothos

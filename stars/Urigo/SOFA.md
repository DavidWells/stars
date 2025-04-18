---
repo: Urigo/SOFA
url: 'https://github.com/Urigo/SOFA'
homepage: 'https://www.the-guild.dev/graphql/sofa-api'
starredAt: '2022-02-28T20:58:52Z'
createdAt: '2018-12-05T15:53:57Z'
updatedAt: '2025-02-24T12:32:44Z'
language: JavaScript
license: MIT
branch: master
stars: 1084
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:04.024Z'
description: >-
  The best way to create REST APIs - Generate RESTful APIs from your GraphQL
  Server
tags:
  - api
  - graphql
  - openapi
  - rest
  - swagger
---

[![GraphQLConf 2024 Banner: September 10-12, San Francisco. Hosted by the GraphQL Foundation](https://github.com/user-attachments/assets/bdb8cd5d-5186-4ece-b06b-b00a499b7868)](https://graphql.org/conf/2024/?utm_source=github&utm_medium=sofa&utm_campaign=readme)

<!-- Uncomment when we remove GraphQL Conf banner -->
<!-- [![sofa](https://user-images.githubusercontent.com/25294569/63839869-bfac8300-c988-11e9-978e-6b6c16c350de.gif)](https://www.sofa-api.com) -->

[![npm version](https://badge.fury.io/js/sofa-api.svg)](https://npmjs.com/package/sofa-api)
[![Discord Chat](https://img.shields.io/discord/625400653321076807)](https://discord.gg/xud7bH9)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![renovate-app badge](https://img.shields.io/badge/renovate-app-blue.svg)](https://renovateapp.com/)

The best way to create REST APIs (is GraphQL).

## Installation

    yarn add sofa-api
    # or
    npm install sofa-api

## Getting Started

Here's complete example with no dependency on frameworks, but also integratable with any of them:

```js
import http from 'http';
import getStream from 'get-stream';
import { useSofa } from 'sofa-api';

const server = http.createServer(
  useSofa({
    basePath: '/api',
    schema,
  })
);
```

Another example with builtin express-like frameworks support

```js
import { useSofa } from 'sofa-api';
import express from 'express';

const app = express();

app.use(
  '/api',
  useSofa({
    basePath: '/api',
    schema,
  })
);

// GET /api/users
// GET /api/messages
```

## How it works

Sofa takes your GraphQL Schema, looks for available queries, mutations and subscriptions and turns all of that into REST API.

Given the following schema:

```graphql
type Chat {
  id: ID
  text: String
}

type Query {
  chat(id: ID): Chat
  chats: [Chat]
  me: Chat
  recentChats: [Chat]
}
```

Routes that are being generated:

```
GET /chat/:id
GET /chats
GET /me
GET /recent-chats
```

### Nested data and idea behind Models

Sofa treats some types differently than others, those are called Models.

The idea behind Models is to not expose full objects in every response, especially if it's a nested, not first-level data.

For example, when fetching a list of chats you don't want to include all messages in the response, you want them to be just IDs (or links). Those messages would have to have their own endpoint. We call this type of data, a Model. In REST you probably call them Resources.

In order to treat particular types as Models you need to provide two queries, one that exposes a list (with no non-optional arguments) and the other to fetch a single entity (id field as an argument). The model itself has to have an `id` field. Those are the only requirements.

```graphql
# Message is treated as a Model
type Query {
  messages: [Message]
  message(id: ID): Message
}

type Message {
  id: ID
  # other fields ...
}
```

### Provide a Context

In order for Sofa to resolve operations based on a Context, you need te be able to provide some. Here's how you do it:

```ts
api.use(
  '/api',
  useSofa({
    basePath: '/api',
    schema,
    async context({ req }) {
      return {
        req,
        ...yourContext,
      };
    },
  })
);
```

> You can pass a plain object or a function.

### Use full responses instead of IDs

There are some cases where sending a full object makes more sense than passing only the ID. Sofa allows you to easily define where to ignore the default behavior:

```ts
api.use(
  '/api',
  useSofa({
    basePath: '/api',
    schema,
    ignore: ['Message.author'],
  })
);
```

Whenever Sofa tries to resolve an author of a message, instead of exposing an ID it will pass whole data.

> Pattern is easy: `Type.field` or `Type`

### Customize endpoint's HTTP Method, path and response status code

Sofa allows you to cutomize the http method, path and response status. For example, in case you need `POST` instead of `GET` method in one of your query, you do the following:

```typescript
api.use(
  '/api',
  useSofa({
    schema,
    routes: {
      'Query.feed': { method: 'POST' },
    },
  })
);
```

When Sofa tries to define a route for `feed` of `Query`, instead of exposing it under `GET` (default for Query type) it will use `POST` method.

> Pattern is easy: `Type.field` where `Type` is your query or mutation type.

You can also specify `path` with dynamic params support (for example `/feed/:offset/:limit`) and `responseStatus`.

### Custom depth limit

Sofa prevents circular references by default, but only one level deep. In order to change it, set the `depthLimit` option to any number:

```ts
api.use(
  '/api',
  useSofa({
    basePath: '/api',
    schema,
    depthLimit: 2,
  })
);
```

### Custom execute phase

By default, Sofa uses `graphql` function from `graphql-js` to turn an operation into data but it's very straightforward to pass your own logic. Thanks to that you can even use a remote GraphQL Server (with Fetch or through Apollo Links).

```ts
api.use(
  '/api',
  useSofa({
    basePath: '/api',
    schema,
    async execute(args) {
      return yourOwnLogicHere(args);
    },
  })
);
```

### Subscriptions as webhooks

Sofa enables you to run GraphQL Subscriptions through WebHooks. It has a special API to start, update and stop a subscription.

- `POST /webhook` - starts a subscription
- `DELETE /webhook/:id` - stops it
- `POST /webhook/:id`- updates it

#### Starting a subscription

To start a new subscription you need to include following data in request's body:

- `subscription` - subscription's name, matches the name in GraphQL Schema
- `variables` - variables passed to run a subscription (optional)
- `url` - an url of your webhook receiving endpoint

After sending it to `POST /webhook` you're going to get in return a unique ID that is your started subscription's identifier.

```json
{
  "id": "SUBSCRIPTION-UNIQUE-ID"
}
```

#### Stoping a subscription

In order to stop a subscription, you need to pass its id and hit `DELETE /webhook/:id`.

#### Updating a subscription

Updating a subscription looks very similar to how you start one. Your request's body should contain:

- `variables` - variables passed to run a subscription (optional)

After sending it to `POST /webhook/:id` you're going to get in return a new ID:

```json
{
  "id": "SUBSCRIPTION-UNIQUE-ID"
}
```

#### Example

Given the following schema:

```graphql
type Subscription {
  onBook: Book
}
```

Let's start a subscription by sending that to `POST /webhook`:

```json
{
  "subscription": "onBook",
  "variables": {},
  "url": "https://app.com/new-book"
}
```

In return we get an `id` that we later on use to stop or update subscription:

    DELETE /webhook/:id

### OpenAPI and Swagger

Thanks to GraphQL's Type System Sofa is able to generate OpenAPI (Swagger) definitions out of it. Possibilities are endless here. You get all the information you need in order to write your own definitions or create a plugin that follows any specification.

```ts
import { useSofa, OpenAPI } from 'sofa-api';
import { writeFileSync } from 'fs';

const openApi = OpenAPI({
  schema,
  info: {
    title: 'Example API',
    version: '3.0.0',
  },
});

app.use(
  '/api',
  useSofa({
    basePath: '/api',
    schema,
    onRoute(info) {
      openApi.addRoute(info, {
        basePath: '/api',
      });
    },
  })
);

// writes every recorder route
writeFileSync('./swagger.json', JSON.stringify(openApi.get(), null, 2));
```

OpenAPI (Swagger) with Bearer Authentication

```ts
import { useSofa, OpenAPI } from 'sofa-api';
import { writeFileSync } from 'fs';

const openApi = OpenAPI({
  schema,
  info: {
    title: 'Example API',
    version: '3.0.0',
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
});

app.use(
  '/api',
  useSofa({
    basePath: '/api',
    schema,
    onRoute(info) {
      openApi.addRoute(info, {
        basePath: '/api',
      });
    },
  })
);

// writes every recorder route
writeFileSync('./swagger.json', JSON.stringify(openApi.get(), null, 2));
```

OpenAPI (Swagger) with custom tags, summary and description

```ts
const openApi = OpenAPI({
  schema,
  info: {
    title: 'Example API',
    version: '3.0.0',
  },
  tags: [
    {
      name: 'Book',
      description: 'Book related operations',
    },
    {
      name: 'Author',
      description: 'Author related operations',
    },
  ],
});
```

```ts
@Resolver(Book)
export class BookResolver {
  @Query(() => Book, { description: 'Get book by id' }) // custom summary tag
  getBookById(@Arg('id', () => Int) id: number) {
    return 'book';
  }
}
```

```ts
const routes: SofaConfig['routes'] = {
  'Query.getBookById': {
    method: 'POST',
    path: '/book/:id',
    tags: ['Book'],
    description: 'This is a custom detailed description for getBookById',
  },
};

const createSofaMiddleware = (
  schema: GraphQLSchema,
  openApi: ReturnType<typeof OpenAPI>,
  basePath = ''
): ReturnType<typeof useSofa> => {
  return useSofa({
    routes,
    basePath,
    schema,
    onRoute(info) {
      openApi.addRoute(info, { basePath });
    },
  });
};
// writes every recorder route
openApi.save('./swagger.yml');
```

## License

[MIT](https://github.com/Urigo/sofa/blob/master/LICENSE) © Uri Goldshtein

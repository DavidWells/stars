---
repo: CannerCMS/graphql-rbac
url: 'https://github.com/CannerCMS/graphql-rbac'
homepage: ''
starredAt: '2021-08-01T01:16:17Z'
createdAt: '2018-11-19T07:30:49Z'
updatedAt: '2025-01-22T10:22:21Z'
language: TypeScript
license: Apache-2.0
branch: master
stars: 38
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:49.128Z'
description: GraphQL Role-based access control (RBAC) middleware
tags:
  - graphql
  - graphql-rbac
  - graphql-role
  - graphql-shield
  - middleware
  - rbac
  - schema
---

# GraphQL Role-based access control (RBAC) middleware

[![CircleCI](https://circleci.com/gh/Canner/graphql-rbac/tree/master.svg?style=shield)](https://circleci.com/gh/Canner/graphql-rbac/tree/master)
[![npm version](https://badge.fury.io/js/graphql-rbac.svg)](https://badge.fury.io/js/graphql-rbac)


graphql-rbac provides you a simple way to use Role-based access control in GraphQL. This package integrates with [graphql-shield](https://github.com/maticzav/graphql-shield) which helps you create a permission layer for your application. Using a schema with array of role, graphql-rbac can help you generate rule functions in graphql-shield. So you can easily use RBAC in your application by providing a schema.

## Why graphql-rbac?

* Easy to specify rule permissions for each field in GraphQL.
* Don't need to write rule function by yourself.

## Installation

```bash
yarn add graphql-rbac
```

## How to use

```js
import { RBAC } from 'graphql-rbac'

const roles = ['ADMIN', 'DEVELOPER']

const schema = {
  Query: {
    users: ['ADMIN', 'DEVELOPER']
  },
  Mutation: {
    createUser: ['ADMIN', 'DEVELOPER'],
    updateUser: ['ADMIN', 'DEVELOPER'],
    deleteUser: ['ADMIN']
  },
  User: {
    password: ['ADMIN']
  }
}

const typeDefs = `
  type Query {
    users: [User!]!
  }

  type Mutation {
    createUser: User!
    updateUser: User!
    deleteUser: User
  }

  type User {
    username: String!
    password: String!
  }
`

const resolvers = {
  Query: {
    users: () => [
      { username: 'Tom', password: '****' },
      { username: 'John', password: '****' },
    ]
  },
  Mutation: {
    createUser: () => { username: 'Tom', password: '****' },
    updateUser: () => { username: 'John', password: '****' },
    deleteUser: () => null
  }
}

const users = {
  admin: { role: 'ADMIN' },
  developer: { role: 'DEVELOPER' }
}

const getUser = async (req) => {
  const auth = req.request.headers.authorization
  let user = {}
  if (users[auth]) {
    user = users[auth]
  }

  return user
}

const rbac = new RBAC({roles, schema, getUser})

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  middlewares: [rbac.middleware()],
  context: req => ({
    user: rbac.context(req)
  }),
})
```

## Run test

```
npm run test
```

## License

Apache-2.0

![footer banner](https://user-images.githubusercontent.com/26116324/37811196-a437d930-2e93-11e8-97d8-0653ace2a46d.png)

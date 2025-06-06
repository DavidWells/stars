---
repo: arackaf/micro-graphql-react
url: 'https://github.com/arackaf/micro-graphql-react'
homepage: ''
starredAt: '2018-01-29T05:13:26Z'
createdAt: '2018-01-27T19:38:35Z'
updatedAt: '2024-11-19T04:04:24Z'
language: JavaScript
license: NA
branch: master
stars: 530
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:29.186Z'
description: >-
  Light and simple GraphQL React client with extensible, composable cache
  invalidation. Works with Suspense.
tags: []
---

[![npm version](https://img.shields.io/npm/v/micro-graphql-react.svg?style=flat)](https://www.npmjs.com/package/micro-graphql-react)
[![codecov](https://codecov.io/gh/arackaf/micro-graphql-react/branch/master/graph/badge.svg?token=FVZDcYD7tp)](https://codecov.io/gh/arackaf/micro-graphql-react)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

# micro-graphql-react

---

The current version is 0.4.0-beta, but the beta is only because of the React Suspense stuff which itself is still in beta. The non-Suspense code in the latest version should be considered stable and safe.

---

A light (2.8K min+gzip) and simple solution for painlessly connecting your React components to a GraphQL endpoint.

Like any other GraphQL React client, there are simple hooks which query and mutate data from your GraphQL endpoint.  Where this project differs is how it approaches cache invalidation. Rather than adding metadata to queries and forming a normalized, automatically-managed cache, it instead provides simple, low-level building blocks to handle cache management yourself. The reason for this (ostensibly poor!) tradeoff is because of my experience with other GraphQL clients which attempted the normalized cache route. I consistently had difficulty getting the cache to behave exactly as I wanted, so decided to build a GraphQL client that gave me the low-level control I always wound up wanting. This project is the result.

Full docs are [here](https://arackaf.github.io/micro-graphql-react/docs)

The slides for the GraphQL Texas talk I gave are [here](https://arackaf.github.io/micro-graphql-react/slides)

The rest of this README describes in better detail the kind of cache management problems this project attempts to avoid.

## Common cache difficulties other GraphQL clients contend with

### Coordinating mutations with filtered result sets

A common problem with GraphQL clients is configuring when a certain mutation should not just update existing data results, but also, more importantly, clear all other cache results, since the completed mutations might affect other queries' filters. For example, let's say you run

```graphql
tasks(assignedTo: "Adam") {
  Tasks {
    id, description, assignedTo
  }
}
```

and get back

```javascript
[
  { id: 1, description: "Adam's Task 1", assignedTo: "Adam" },
  { id: 2, description: "Adam's Task 2", assignedTo: "Adam" }
];
```

Now, if you subsequently run something like

```graphql
mutation {
  updateTask(id: 1, assignedTo: "Bob", description: "Bob's Task")
}
```

the original query from above will update and now display

```json
[
  { "id": 1, "description": "Bob's Task", "assignedTo": "Bob" },
  { "id": 2, "description": "Adam's Task 2", "assignedTo": "Adam" }
];
```

which may or may not be what you want, but worse, if you browse to some other filter, say, `tasks(assignedTo: "Rich")`, and then return to `tasks(assignedTo: "Adam")`, those data above will still be returned, which is wrong, since task number 1 should no longer be in this result set at all. The `assignedTo` value has changed, and so no longer matches the filters of this query. 

---

This library solves this problem by allowing you to easily declare that a given mutation should clear all cache entries for a given query, and reload them from the network (hard reset), or just update the on-screen results, but otherwise clear the cache for a given query (soft reset).  See the [docs](https://arackaf.github.io/micro-graphql-react/docs) for more info.

### Properly processing empty result sets

An interesting approach that the first version of Urql took was to, after any mutation, invalidate any and all queries which dealt with the data type you just mutated. It did this by modifying queries to add `__typename` metadata, so it would know which types were in which queries, and therefore needed to be refreshed after relevant mutations. This is a lot closer in terms of correctness, but even here there are edge cases which GraphQL's limited type introspection make difficult. For example, let's say you run this query

```graphql
tasks(assignedTo: "Adam") {
  Tasks {
    id, description, assignedTo
  }
}
```

and get back

```json
{
  "data": {
    "tasks": {
      "__typename": "TaskQueryResults",
      "Tasks": []
    }
  }
}
```

It's more or less impossible to know what the underlying type of the empty `Tasks` array is, without a build step to introspect the entire endpoint's metadata. 

### Are these actual problems you're facing?

These are actual problems I ran into when evaluating GraphQL clients, which left me wanting a low-level, configurable caching solution. That's the value proposition of this project. If you're not facing these problems, for whatever reasons, you'll likely be better off with a more automated solution like Urql or Apollo. 

To be crystal clear, nothing in this readme should be misconstrued as claiming this project to be "better" than any other. The point is to articulate common problems with client-side GraphQL caching, and show how this project solves them. Keep these problems in mind when evaluating GraphQL clients, and pick the best solution for **your** app.



---
repo: bradleyboy/tuql
url: 'https://github.com/bradleyboy/tuql'
homepage: ''
starredAt: '2025-01-01T00:24:29Z'
createdAt: '2017-11-20T02:43:15Z'
updatedAt: '2025-02-14T18:03:41Z'
language: JavaScript
license: MIT
branch: master
stars: 1067
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:53:32.946Z'
description: Automatically create a GraphQL server from a SQLite database or a SQL file
tags:
  - automatic-api
  - foreign-keys
  - graphql
  - nodejs
  - schema
  - sequelize
  - sqlite
  - sqlite-database
  - sqlite3
---

# tuql ![build status](https://github.com/bradleyboy/tuql/actions/workflows/nodejs.yml/badge.svg) [![Coverage Status](https://coveralls.io/repos/github/bradleyboy/tuql/badge.svg?branch=master)](https://coveralls.io/github/bradleyboy/tuql?branch=master)

_Pronounced: Too cool_

**tuql** is a simple tool that turns a sanely formatted sqlite database into a graphql endpoint. It tries to infer relationships between objects, currently supporting `belongsTo`, `hasMany` and `belongsToMany`. It also forms the basic mutations necessary to create, update, and delete objects, as well as assoicate many-to-many relationships.

## Installing

`npm install -g tuql`

## Using

`tuql --db path/to/database.sqlite`

You can also optionally set the port and enable graphiql:

`tuql --db path/to/database.sqlite --port 8888 --graphiql`

Or, you can use a sql file with statements to build up an in-memory database:

`tuql --infile path/to/db_dump.sql --graphiql`

If you'd like to print out the schema itself, use:

`tuql --db path/to/database.sqlite --schema`

Or send it to a file:

`tuql --db path/to/database.sqlite --schema > schema.graphql`

## How it works

Imagine your sqlite schema looked something like this:

| posts | users | categories | category_post |
| :-: | :-: | :-: | :-: |
| id      | id | id | category_id |
| user_id | username | title | post_id |
| title   | | |
| body    | | |

**tuql** will automatically define models and associations, so that graphql queries like this will work right out of the box:

```graphql
{
  posts {
    title
    body
    user {
      username
    }
    categories {
      title
    }
  }
}
```

**tuql** works one of two ways. It prefers to map your schema based on the foreign key information in your tables. If foreign keys are not present, **tuql** assumes the following about your schema in order to map relationships:

1. The primary key column is named `id` or `thing_id` or `thingId`, where `thing` is the singular form of the table name. Example: For a table named **posts**, the primary key column should be named `id`, `post_id` or `postId`.
2. Similarly, foreign key columns should be `thing_id` or `thingId`, where `thing` is the singular form of the associated table.
3. For many-to-many associations, the table name should be in the form of `foo_bar` or `bar_foo` (ordering is not important). The columns should follow the same pattern as #2 above.

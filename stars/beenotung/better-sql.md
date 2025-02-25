---
repo: beenotung/better-sql
url: 'https://github.com/beenotung/better-sql'
homepage: 'https://better-sql.surge.sh'
starredAt: '2022-09-05T04:49:35Z'
createdAt: '2022-07-20T15:28:55Z'
updatedAt: '2024-07-27T22:10:46Z'
language: TypeScript
license: BSD-2-Clause
branch: master
stars: 26
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:33.685Z'
description: >-
  Generate sql query from a concise query syntax inspired from EdgeDB and
  GraphQL
tags:
  - code-generation
  - query-language
  - sql
  - syntax
---

# better-sql.ts

Generate sql query from a concise query syntax inspired from [EdgeDB](https://www.edgedb.com/blog/edgedb-1-0) and [GraphQL](https://graphql.org/).

[![npm Package Version](https://img.shields.io/npm/v/better-sql.ts)](https://www.npmjs.com/package/better-sql.ts)

Online Playground: https://better-sql.surge.sh

<!-- [![npm Package Downloads](https://img.shields.io/npm/dm/better-sql.ts)](https://www.npmtrends.com/better-sql-lang) -->

## Supported Features

- [x] output typical sql query, compatible with mysql, postgres, sqlite, e.t.c.
- [x] automatically add table name on columns if not specified
- [x] inner join with nested `table {fields}`
- [x] left join with nested `table [fields]`
- [x] nested `select` sub-query
- [x] `where` statement
- [x] `having` statement
- [x] `group by` statement
- [x] aggregate function, e.g. `sum(score)`
- [x] `order by` statement
- [x] `limit` and `offset` statement

## TypeScript Signature

```typescript
export function queryToSQL(query: string): string
```

## Usage

```typescript
import { queryToSQL } from 'better-sql.ts'
import { db } from './db'

let keyword = '%script%'
let query = 'select post [...] where title like :keyword'
let sql = queryToSQL(query)
let result = db.query(sql, { keyword })
```

## Example

<table>
<tbody>
<tr>
<td>
A query in better-sql:

```sql
select post [
  id as post_id
  title
  author_id
  user as author { nickname, avatar } where delete_time is null
  type_id
  post_type {
    name as type
    is_hidden
  } where is_hidden = 0 or user.is_admin = 1
] where created_at >= :since
    and delete_time is null
    and title like :keyword
  order by created_at desc
  limit 25







```

</td>
<td>
is converted into formatted sql as below:

```sql
select
  post.id as post_id
, post.title
, post.author_id
, author.nickname
, author.avatar
, post.type_id
, post_type.name as type
, post_type.is_hidden
from post
inner join user as author on author.id = post.author_id
inner join post_type on post_type.id = post.post_type_id
where author.delete_time is null
  and (post_type.is_hidden = 0
   or user.is_admin = 1)
  and post.created_at >= :since
  and post.delete_time is null
  and post.title like :keyword
order by
  post.created_at desc
limit 25
```

</td>
</tr>
</tbody>
</table>

Details refers to [sample.ts](./test/sample.ts) and [lang.spec.ts](./test/lang.spec.ts)

## License

This project is licensed with [BSD-2-Clause](./LICENSE)

This is free, libre, and open-source software. It comes down to four essential freedoms [[ref]](https://seirdy.one/2021/01/27/whatsapp-and-the-domestication-of-users.html#fnref:2):

- The freedom to run the program as you wish, for any purpose
- The freedom to study how the program works, and change it so it does your computing as you wish
- The freedom to redistribute copies so you can help others
- The freedom to distribute copies of your modified versions to others

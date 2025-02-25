---
repo: danvk/crudely-typed
url: 'https://github.com/danvk/crudely-typed'
homepage: null
starredAt: '2022-05-16T19:05:11Z'
createdAt: '2022-04-03T15:40:18Z'
updatedAt: '2024-12-06T20:39:33Z'
language: TypeScript
license: MIT
branch: main
stars: 36
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:46.266Z'
description: Simple "everyday CRUD" Postgres queries with perfect TypeScript types
tags: []
---

# Crudely Typed

[![codecov](https://codecov.io/gh/danvk/crudely-typed/branch/main/graph/badge.svg?token=2C0SU9X0EM)](https://codecov.io/gh/danvk/crudely-typed)

Simple "everyday CRUD" Postgres queries with perfect TypeScript types.
Zero dependencies. Designed to work with [pg-to-ts][] and [node-postgres][].

For more information and demos, check out:

- [TypeScript and SQL: Six Ways to Bridge the Divide][post] (2023 blog post)
- [TypeScript and the Database: Who Owns the Types?][video] (2022 TS Congress talk; 30 minutes)

## Quickstart

Install [pg-to-ts][] and this library, and generate a schema file:

    npm install -D pg-to-ts
    npm install crudely-typed
    pg-to-ts generate -c $POSTGRES_URL --output src/dbschema.ts

Then generate your queries using a `TypedSQL` instance:

```ts
// src/demo.ts
import {TypedSQL} from 'crudely-typed';
import {tables} from './dbschema';

const typedSql = new TypedSQL(tables);

const getDocById = typedSql.table('docs').selectByPrimaryKey();
//    ^? const getDocById: (db: Queryable, where: { id: string }) => Promise<Doc | null>
```

Crudely Typed supports the basic create / read / update / delete queries. See
[API](#api) for details. Crudely Typed is _not_ a full-fledged query builder,
nor does it aspire to be. See [FAQ](#faq) for more on this.

## API

### TypedSQL

Everything starts with a `TypedSQL` instance, which you construct from the
`tables` export of a [pg-to-ts][] DB schema. There are many schema generators
derived from the old SchemaTS project, but crudely-typed specifically requires
pg-to-ts schemas because they have just the type references it needs.

```ts
import {TypedSQL} from 'crudely-typed';
import {tables} from './dbschema';  // <-- output of pg-to-ts

const typedSql = new TypedSQL(tables);
```

### table

From a `TypedSQL` instance, you can produce a `TableBuilder` object for any of
your tables:

```ts
const usersTable = typedSql.table('users');
```

The remaining functions in crudely-typed are all defined on this table object.
Each of the functions comes in regular and `ByPrimaryKey` variants, e.g.
`table.select()` and `table.selectByPrimaryKey()`.

### table.select

```ts
table.select(): (db: Queryable) => Promise<Row[]>
```

with no parameters, this is select all in the order returned by the database.

```ts
table.select(options: {
    where?: (Column | SQLAny<Column>)[],
    columns?: Column[],
    orderBy?: [col: Column, order: 'ASC' | 'DESC'][];
    limitOne?: boolean;
    join?: {
        [resultingColumnName: string]: Column
    };
}): (db: Queryable, where: ...) => Promise<...>
```

Looking at each option individually:

- `where` adds a `WHERE` clause to the query:

```ts
const docsTable = typedSql.table('docs');
const getDocsByAuthor = docsTable.select({where: ['author']});
//    ^? const getDocsByAuthor: (db: Queryable, where: {author: string}) => Promise<Doc[]>
```

If you specify multiple where clauses, they'll be combined with `AND`.
You may also specify an `ANY` clause to match one of many values.
See [Where clasues](#where-clauses), below.

- `columns` restricts the set of columns that are retrieved (by default all
  columns are retrieved, i.e. `SELECT *`). You can use this to avoid fetching
  large, unneeded columns.

```ts
const docsTable = typedSql.table('docs');
const getTitles = docsTable.select({columns: ['title']});
//    ^? const getTitles: (db: Queryable) => Promise<{title: string}[]>
```

- `orderBy` sorts the output, i.e. it adds an `ORDER BY` clause to the query.
  Adding an `orderBy` clause does not affect the type of the `select`.

```ts
const docsTable = typedSql.table('docs');
const getDocs = docsTable.select({orderBy: [['author', 'ASC']]});
//    ^? const getTitles: (db: Queryable) => Promise<Doc[]>
```

- `limitOne` adds a `LIMIT 1` clause to the query, so that it always returns
  either zero or one row. This changes the return type from `T[]` to `T | null`.

```ts
const docsTable = typedSql.table('docs');
const getTitle = docsTable.select({where: ['title'], limitOne: true});
//    ^? const getTitle: (
//         db: Queryable,
//         where: {title: string}
//       ) => Promise<Doc | null>
```

- `join` adds 1-1 joins to the query for columns that are foreign keys into
  other tables. The row from the joined table comes back as an object under
  the property name that you specify. You may specify multiple joins, though
  they cannot be nested and they must all be 1-1.

```ts
const docsTable = typedSql.table('docs');
const getDocs = docsTable.select({
    join: {
        author: 'author_id',
        publisher: 'publisher_id',
    }
});
// ^? const getDocs: (
//      db: Queryable
//    ) => Promise<(Doc & {author: Author; publisher: Publisher })[]>
```

You don't need to specify the joined table or its type; crudely-typed has all
the information it needs from the dbschema. If you specify a set of columns to
select with `columns`, the foreign key need not be one of those columns.

### table.selectByPrimaryKey

There's a helper for the common case of selecting by primary key:

```ts
const docsTable = typedSql.table('docs');
const getDocById = docsTable.selectByPrimaryKey();
//    ^? const getDocById: (
//         db: Queryable,
//         where: { id: string }
//       ) => Promise<Doc | null>
```

This is exactly equivalent to `docsTable.select({where: ['id'], limitOne: true})`
but saves you some typing.

You may use the `columns` and `join` and with `selectByPrimaryKey`:

```ts
const getDocById = docsTable.selectByPrimaryKey({
    columns: ['title'],
    join: { author: 'author_id' }
});
const doc = await getDocById(db, {id: 'doc-id'});
//    ^? const doc: {title: string; author: Author} | null
```

### table.insert

```ts
table.insert(): (db: Queryable, row: RowInput) => Promise<Row>
```

This generates a dynamic `INSERT` query based on the properties of `row`.
The `RowInput` type models the required and optional columns in the table.
If an optional property is omitted from `row`, then it will be set to its
default value and observable in the returned `Row`. If a required property
is omitted, you'll get a type error.

```ts
const insertDoc = docsTable.insert();
const doc = await insertDoc({author: 'Mark Twain', title: 'Huckleberry Finn'});
//    ^? const doc: Doc
```

It's sometimes desirable to prevent certain columns from being set, e.g. the
primary key. This can be enforced with the `disallowColumns` option:

```ts
const insertDoc = docsTable.insert({ disallowColumns: ['id'] });
//    ^? const insertDoc: (db: Queryable, row: Omit<DocInput, 'id'>) => Promise<Doc>
insertDoc({id: 'some id'});
//         ~~ type error!
const doc = await insertDoc({author: 'Mark Twain', title: 'Huckleberry Finn'});
//    ^? const doc: Doc
```

### table.insertMultiple

This is indentical to `insert` but allows multiple rows to be inserted with a
single query.

```ts
const docsTable = typedSql.table('docs');
const insertDocs = docsTable.insertMultiple();
//    ^? const insertDocs: (
//         db: Queryable,
//         rows: readonly DocInput[]
//       ) => Promise<Row[]>
const docs = await insertDocs([
    {title: 'Huckleberry Finn', author: 'Mark Twain'},
    {title: 'Poor Richard', author: 'Ben Franklin'}
]);
```

`insertMultiple` also supports `disallowColumns`, just like `insert`.

### table.update

```ts
table.update({
    where?: (Column | SQLAny<Column>)[],
    set?: Column[],
    limitOne?: boolean,
}): (db: Queryable, where: ..., set: ...) => Promise<...>
```

With a `where` and a `set` clause, this updates specific columns on specific rows. All affected rows are returned:

```ts
const docsTable = typedSql.table('docs');
const setYear = docsTable.update({where: ['title'], set: ['year']});
//    ^? const setYear: (
//         db: Queryable,
//         where: {title: string},
//         set: {year: number}
//       ) => Promise<Doc[]>
const newDocs = setYear(db, {title: 'Huck Finn'}, {year: 1872});
//    ^? const newDocs: Promise<Doc[]>
```

Without a `set` clause, this performs a dynamic update based on the param:

```ts
const update = docsTable.update({where: ['title']});
//    ^? const update: (
//         db: Queryable,
//         where: {title: string},
//         set: Partial<Doc>
//       ) => Promise<Doc[]>
const newDocs = setYear(db, {title: 'Huck Finn'}, {year: 1872});
//    ^? const newDocs: Promise<Doc[]>
```

The `where` clause can include multiple columns, in which case it operates as
an `AND`, and can support `ANY` clauses.
See [Where clasues](#where-clauses), below.

Without a `where` clause, this updates all rows in the table.

If you pass `limitOne: true`, at most one row will be updated and the function
will return `T | null` instead of `T[]`:

```ts
const update = docsTable.update({where: ['title'], limitOne: true});
//    ^? const update: (
//         db: Queryable,
//         where: {title: string},
//         set: Partial<Doc>
//       ) => Promise<Doc | null>
const newDoc = setYear(db, {title: 'Huck Finn'}, {year: 1872});
//    ^? const newDocs: Promise<Doc>
```

### table.updateByPrimaryKey

This is a shortcut for updating a row by its table's primary key:

```ts
const update = docsTable.updateByPrimaryKey(set: ['year']);
//    ^? const update: (
//         db: Queryable,
//         where: {id: string},
//         set: {year: number}
//       ) => Promise<Doc | null>
const newDoc = setYear(db, {id: 'isbn-123'}, {year: 1872});
//    ^? const newDoc: Promise<Doc>
```

If you pass a `set` option, then this updates a fixed set of columns.
If you don't, it's dynamic based on its parameter, just like `update`.

### table.delete

```ts
table.delete(options: {
    where?: (Column | SQLAny<Column>)[];
    limitOne?: boolean;
}): (db: Queryable, where: ...) => Promise<...>
```

The `where` clause for `delete` works exactly as it does for `select`. It may
be set to an array of columns or `ANY` clauses. See
[Where clauses](#where-clauses), below.

```ts
const docsTable = typedDb.table('docs');
const deleteByTitle = docsTable.delete({ where: ['title'] });
//    ^? const deleteByTitle: (db: Queryable, where: {title: string}) => Promise<Doc[]>
```

The `delete` function returns the rows that it deletes (if any). As with
`select`, if you pass `limitOne: true` then it will return `T | null` instead
of `T[]`:

```ts
const docsTable = typedDb.table('docs');
const deleteByTitle = docsTable.delete({ where: ['title'], limitOne: true });
//    ^? const deleteByTitle: (db: Queryable, where: {title: string}) => Promise<Doc | null>
```

If you don't specify a `where` clause or `limitOne`, this acts as "delete all".

### table.deleteByPrimaryKey

This is a helper for the common case where you want to delete rows by their
primary key:

```ts
const docsTable = typedDb.table('docs');
const deleteDoc = docsTable.deleteByPrimaryKey();
//    ^? const deleteDoc: (db: Queryable, where: {id: string}) => Promise<Doc | null>
```

This is exactly equivalent to `docsTable.delete({ where: ['id'], limitOne: true })`.

## Queryable

All generated functions take a `Queryable` object as their first parameter:

```ts
interface Queryable {
  query(sql: string, ...args: any[]): Promise<Result>;
}
```

The `Client` and `Pool` classes from `pg` conform to this and can be used with
crudely-typed.

## Where clauses

TODO:

- Multiple columns are `AND`ed
- You can generate `ANY` matchers
- You can generate a mix

## Joins

TODO

## FAQ

- **Isn't this just a query builder?**

- **Why does crudely-typed generate functions instead of running them?**

- **Can you add support for X?**

Probably not! The goal of this library is to handle the simplest queries for
you with perfect types and a minimum of fuss. Supporting every SQL query is
absolutely not a goal. At some point you should just write SQL (see below).

- **What should I do for complex queries?**

- **Why not use PgTyped for all my queries?**

- **Why not use an ORM?**

- **What's with the name?**

CRUD is short for Create, Read, Update, Delete. I wanted something that had
"crud" in the name but didn't sound like "crud". "crudely" fit the bill. It's
also a play on [DefinitelyTyped][dt] and is a bit tongue in cheek since the
types in this library are anything but crude.

## How this works

The `tables` object that `pg-to-ts` outputs includes all the TypeScript types
and runtime values needed to generate well-typed queries. From there it's just
a bunch of TypeScript generics that should be entirely invisible to you, the
user. See [`index.ts`](/src/index.ts) for all the details. The following blog
posts may be helpful for understanding some of the techniques being used:

- intersect what you have
- unionize/objectify
- display of type
- currying and classes

[pg-to-ts]: https://github.com/danvk/pg-to-ts
[node-postgres]: https://github.com/brianc/node-postgres
[dt]: https://github.com/DefinitelyTyped/DefinitelyTyped
[post]: https://effectivetypescript.com/2023/08/29/sql/
[video]: https://portal.gitnation.org/contents/typescript-and-the-database-who-owns-the-types

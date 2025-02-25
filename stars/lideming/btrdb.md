---
repo: lideming/btrdb
url: 'https://github.com/lideming/btrdb'
homepage: ''
starredAt: '2022-02-17T21:52:01Z'
createdAt: '2020-10-13T15:50:24Z'
updatedAt: '2024-09-27T01:13:14Z'
language: TypeScript
license: MIT
branch: main
stars: 20
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:20.848Z'
description: A Copy-on-Write NoSQL database engine inspired by btrfs
tags:
  - copy-on-write
  - database
  - deno
  - javascript
  - nodejs
  - nosql
  - typescript
---

# btrdb - B-tree DataBase

btrdb is a NoSQL database engine with B-tree Copy-on-Write mechanism inspired by
btrfs.

[![CI](https://github.com/lideming/btrdb/actions/workflows/ci.yml/badge.svg)](https://github.com/lideming/btrdb/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/lideming/btrdb/branch/main/graph/badge.svg?token=EWISTK2KWU)](https://codecov.io/gh/lideming/btrdb)

- [x] [Deno runtime](https://deno.land/x/btrdb)
- [x] [Node.js runtime](https://www.npmjs.com/package/@yuuza/btrdb)
- [x] Single file
- [x] B-tree Copy-on-Write (reference
      [paper](https://btrfs.wiki.kernel.org/images-btrfs/6/68/Btree_TOS.pdf),
      [slides](https://btrfs.wiki.kernel.org/images-btrfs/6/63/LinuxFS_Workshop.pdf))
- [x] Good performance even written in pure TypeScript
  - [x] Set 100k key-value pairs in 1.2s
  - [x] Insert 100k documents in 2.3s
- [x] [Snapshots](#Use-snapshots)
  - [x] Named snapshots
- [x] [Key-Value sets](#Use-key-value-set)
- [x] [Document sets](#Use-document-set)
  - [x] [Indexes](#Indexes)
  - [x] [Query functions](#Query-(functions))
  - [x] [Query tagged template parser](#Query-(tagged-template))
  - [x] Serialize to ["binval" format](docs/dev_binval.md) on disk
  - [x] Binary data value support
- [x] ACID
  - [x] Readers/writer lock
  - [x] Isolation with concurrent reader on snapshots
- [x] Auto-commit
- [x] Space reclamation with refcount tree
- [ ] Client / Server (?)
- [ ] Replication (?)

## ⚠️ Warning ⚠️

This project is just started. It's under heavy development!

The on-disk format structure and the API are NOT stable yet.

Please do NOT use it in any serious production.

## btrdbfs

[btrdbfs](./btrdbfs/) is a project to run filesystem on btrdb using FUSE.

## Getting Started

### Import the module

**Deno:**

```ts
import { Database } from "https://deno.land/x/btrdb/mod.ts";
```

**Node.js:**

Install from [NPM registry](https://www.npmjs.com/package/@yuuza/btrdb):

```
npm i @yuuza/btrdb
```

Import from ES module:

```js
import { Database } from "@yuuza/btrdb";
```

Require from CommonJS module:

```js
const { Database } = require("@yuuza/btrdb");
```

### Create/open database file

```ts
const db = new Database();
await db.openFile("data.db");
// Will create new database if the file doesn't exist.
```

## Key-value set

```ts
const configSet = await db.createSet("config");
// Get the set or create if not exist.

await configSet.set("username", "yuuza");
console.info(await configSet.get("username")); // "yuuza"

await db.commit();
// Commit to persist the changes.
```

## Use document set

### Create set

```ts
interface User {
  id: number; // A property named "id" is required.
  username: string;
  status: "online" | "offline";
}

const userSet = await db.createSet<User>("users", "doc");
// Get the set or create if not exist.
```

### Insert

```ts
await userSet.insert({ username: "yuuza", status: "offline" });
// Insert a new document, auto id when it's not specified.

console.info(await userSet.get(1));
// { id: 1, username: "yuuza", status: "offline" }

await db.commit();
// Commit to persist the changes.
```

### Upsert

`upsert` will update the document with the same id, or insert a new document if
the id does not exist.

```ts
const user = await userSet.get(1);
user.status = "online";
// Get user and set its status

await userSet.upsert(user);
// Use upsert to apply the change.

console.info(await userSet.get(1));
// { id: 1, username: "yuuza", status: "online" }

await db.commit();
// Commit to persist the changes.
```

### Indexes

```ts
interface User {
  id: number;
  username: string;
  status: "online" | "offline";
  role: "admin" | "user";
}

const userSet = await db.createSet<User>("users", "doc");

// Define indexes on the set and update indexes if needed.
await userSet.useIndexes({
  status: (u) => u.status,
  // define "status" index, which indexing the value of user.status for each user in the set

  role: (user) => user.role,

  username: { unique: true, key: (u) => u.username },
  // define "username" unique index, which does not allow duplicated username.

  onlineAdmin: (u) => u.status == "online" && u.role == "admin",
  // define "onlineAdmin" index, the value is a computed boolean.
});

await userSet.insert({ username: "yuuza", status: "online", role: "user" });
await userSet.insert({ username: "foo", status: "offline", role: "admin" });
await userSet.insert({ username: "bar", status: "online", role: "admin" });
await db.commit();

// Get all online users
console.info(await userSet.findIndex("status", "online"));
// [
//   { username: "yuuza", status: "online", role: "user", id: 1 },
//   { username: "bar", status: "online", role: "admin", id: 3 }
// ]

// Get all users named 'yuuza'
console.info(await userSet.findIndex("username", "yuuza"));
// [ { username: "yuuza", status: "online", role: "user", id: 1 } ]

// Get all online admins
console.info(await userSet.findIndex("onlineAdmin", true));
// [ { username: "bar", status: "online", role: "admin", id: 3 } ]
```

### Query (tagged template)

Querying on indexes is supported.

Queries can be created from the `query` tagged template parser for better
readability.

Operators: `==`, `!=`, `>`, `<`, `<=`, `>=`, `AND`, `OR`, `NOT`, `SKIP`,
`LIMIT`, `(`, `)`

Always use `${}` to pass values.

```ts
// Get all offline admins
console.info(
  await userSet.query(query`
    status == ${"offline"}
    AND role == ${"admin"}
  `),
);
// [ { username: "foo", status: "offline", role: "admin", id: 2 } ]

// Get all online users, but exclude id 1.
console.info(
  await userSet.query(query`
    status == ${"online"}
    AND NOT id == ${1}
  `),
);
// [ { username: "bar", status: "online", role: "admin", id: 3 } ]
```

### Query (functions)

Query functions: `EQ` (==), `NE` (!=), `LT` (<), `GT` (>), `LE` (<=), `GE` (>=),
`AND`, `OR`, `NOT`, `SLICE`.

```ts
// Get all offline admins
console.info(
  await userSet.query(AND(EQ("status", "offline"), EQ("role", "admin"))),
);
// [ { username: "foo", status: "offline", role: "admin", id: 2 } ]

// Get all online users, but exclude id 1.
console.info(
  await userSet.query(
    AND(
      EQ("status", "online"),
      NOT(EQ("id", 1)), // "id" is a special "index" name
    ),
  ),
);
// [ { username: "bar", status: "online", role: "admin", id: 3 } ]
```

## Transactions

`Database.runTransaction(async () => { ... })` could be used for auto commiting
and rolling back.

It guarantees:

- The promise is resolved when it committed.
- Other transactions could be concurrently executed.
- Only commits when all transactions are completed.
- Rollback when any transaction is failed, and rerun other successful concurrent
  transactions.

The transaction function might be re-run in case of replaying.

## Snapshots

Since btrdb uses CoW mechanism and never overwrites data on-disk, creating
"snapshot" have almost no cost.

```ts
const dataSet = await db.createSet("data");
await dataSet.set("foo", "bar");

// Commit then create a "named snapshot"
await db.createSnapshot("backup");

await dataSet.set("someone", "messed up your data!");
await dataSet.set("foo", "no bar!");
await db.commit();

// Get a "named snapshot".
const snap = await db.getSnapshot("backup");

// Read data from the snapshot
console.info(await snap.getSet("data").get("foo"));
```

## More example in the test code

See [test.ts](./test.ts).

## Design

(Outdated. To be added: documents tree, indexes tree, data pages, named
snapshots)

![design.svg](./docs/design.svg)

## License

MIT License

---
repo: WebReflection/sql.js
url: 'https://github.com/WebReflection/sql.js'
homepage: null
starredAt: '2024-06-10T16:03:55Z'
createdAt: '2024-06-07T19:33:11Z'
updatedAt: '2025-02-05T21:12:03Z'
language: JavaScript
license: MIT
branch: main
stars: 24
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:29.549Z'
description: An easier to bootstrap sql.js
tags: []
---

# @webreflection/sql.js

An ESM re-packaged [sql.js](https://sql.js.org/) with embedded `sqlite.wasm` as buffer:

  * same `initSqlJs` API and functionalities
  * zero need to host the `sqlite-wasm.wasm` file a part
  * works already in both main or workers

```js
// works in both main and workers
import initSqlJs from 'https://esm.run/@webreflection/sql.js';

const SQL = await initSqlJs();

const db = new SQL.Database();

db.run(`
CREATE TABLE hello (a int, b char);
INSERT INTO hello VALUES (0, 'hello');
INSERT INTO hello VALUES (1, 'world');
`); // Run the query without returning anything

// Prepare an sql statement
const stmt = db.prepare("SELECT * FROM hello WHERE a=:aval AND b=:bval");

// Bind values to the parameters and fetch the results of the query
const result = stmt.getAsObject({':aval' : 1, ':bval' : 'world'});
console.log(result); // Will print {a:1, b:'world'}

db.close();
```

## @webreflection/sql.js/persistent

Based on [IndexedDB](https://github.com/WebReflection/idb-map?tab=readme-ov-file#idbmapsync-api),
this export provides an extend of the [SQL.Database](https://sql.js.org/documentation/Database.html)
class with an additional `delete()` and `save()` methods plus a *smart constructor* that does the following:

```js
import Database from 'https://esm.run/@webreflection/sql.js/persistent';

const db = new Database(
  // the persistent name of such db
  'data.db',
  // an optional buffer to use when
  // no such name exists in the storage
  someOptionalBufferToInit
);

// create a table only if not present
db.run('CREATE TABLE IF NOT EXISTS hello (a int, b char)');

// do anything you would do with an SQLite DB

// save it, optionally awaiting for it
await db.save();

// close it or keep going
db.close();
```

The constructor signature allows to create or reuse a previously stored DB, providing eventually a DB that existed already and that's exported as buffer or *Uint8Array*.

When previously stored, the next time that DB would be used instead of such provided initial DB, simplifying the orchestration between new user or freed cache VS some data to crawl anyway for such user.

It is also possible to `db.delete()` (optionally awaitable) some file ti be sure the storage is clean and to migrate from a version of a DB to another one.

Like it is for the default export of this module, `/persistent` works in both main thread and workers.

### Warnings ⚠️

The last `db.save()` operation will define the state of the database.

This export works if you are running it on a single Page (PWA, Electron, etc.) but if you are running the same thing in multiple tabs last `.save()` will last, not the others.

To solve this issue I've provided also the following `shared` variant.


## @webreflection/sql.js/shared

This export is an *async* version of the *persistent Database* that bootstraps a *SharedWorker* so that multiple tabs can read and/or write to the same *db* where `db.save()` invokes will be queue to avoid concurrent saves within the worker.

The **prepare statement** is currently missing due to the nature of the cursor and the needed orchestration behind but I am not excluding its availability in the future.

Almost all other methods are supported and provide an async version of the [official API](https://sql.js.org/documentation/Database.html).

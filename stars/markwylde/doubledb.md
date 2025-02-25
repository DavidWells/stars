---
repo: markwylde/doubledb
url: 'https://github.com/markwylde/doubledb'
homepage: ''
starredAt: '2022-11-18T03:32:12Z'
createdAt: '2020-12-29T14:17:17Z'
updatedAt: '2025-02-09T15:57:56Z'
language: TypeScript
license: MIT
branch: master
stars: 14
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:09.036Z'
description: An on disk database that indexes everything for fast querying.
tags: []
---

# doubledb

An on disk database that indexes everything for fast querying.

## Installation
```bash
npm install --save doubledb
```

## Usage
```javascript
import createDoubledb from 'doubledb';
const doubledb = await createDoubledb('./data');

// Insert a document
await doubledb.insert({
  id: undefined, // defaults to uuid, must be unique
  firstName: 'Joe',
  lastName: 'Bloggs',
  stats: {
    wins: 10,
    loses: 5
  },
  skills: ['cooking', 'running']
});

// Read operations
await doubledb.read(record.id);
await doubledb.find('firstName', 'Joe');
await doubledb.find('stats.wins', 10);
await doubledb.find('skills', 'cooking');
await doubledb.find('firstName', v => v.startsWith('J'), { skip: 20, gt: 'J', lt: 'K' });
await doubledb.filter('firstName', 'Joe');
await doubledb.filter('firstName', v => v.startsWith('J'));
await doubledb.filter('firstName', v => v.startsWith('J'), { limit: 10, skip: 20, gt: 'J', lt: 'K' });

// Update operations
await doubledb.upsert(record.id, { firstName: 'Joe', lastName: 'Bloggs' });
await doubledb.replace(record.id, { firstName: 'Joe', lastName: 'Bloggs' });
await doubledb.patch(record.id, { firstName: 'Bob' });

// Delete operation
await doubledb.remove(record.id);

// Batch operations
await doubledb.batchInsert([
  { firstName: 'Alice', lastName: 'Smith' },
  { firstName: 'Bob', lastName: 'Johnson' },
  { firstName: 'Charlie', lastName: 'Brown' }
]);

// Advanced querying
const users = await doubledb.query({
  status: 'active',
  age: { $gte: 18 }
}, {
  limit: 10,
  offset: 0,
  sort: { lastName: 1 }
});

// Count documents
const totalUsers = await doubledb.count({ status: 'active' });
```

## API Reference

### `.read(id)`
Get a single record by its `.id` property.

If a record is found, the whole record will be returned.
If no record is found, `undefined` will be returned.

### `.find(field, value, { skip })`
Quickly find a single record by any field (`use.dot.notation.for.nested.properties`) and its exact value.

If multiple records exist, a `skip` option can be provided to ignore the first `number` of finds.

If a record is found, the whole record will be returned.
If no record is found, `undefined` will be returned.

### `.find(field, matcherFunction: (value: string) => boolean), { limit, skip, gt, lt, gte, lte })`
Slow find a single record by any field and test against a `matcherFunction`.

If multiple records exist:
- a `skip` option can be provided to ignore the first `number` of finds.
- a `limit` option can be provided to stop after `number` of finds.

Find using a matcherFunction will work without a `gt` and `lt`, but the indexing will be pretty useless, as it will need to scan every single record.

You should provide a `gt` and/or `lt` to let the indexer know where to begin/end.

For example:
```javascript
// Will scan every record (slow)
doubledb.find('firstName', v => v.startsWith('Jo'))

// Better - starts from 'Jo'
doubledb.find('firstName', v => v.startsWith('Jo'), { gt: 'Jo' })

// Best - specify both start and end range
doubledb.find('firstName', v => v.startsWith('Jo'), { gt: 'Jo', lt: 'K' })

// More examples
doubledb.find('favouriteNumber', v => v > 5 && v < 10, { gt: 5, lt: 10 })
doubledb.find('firstName', v => ['Dave', 'Peter'].includes(v), { gt: 'Dave', lte: 'Peter' })
```

### `.filter(field, matcherFunction: (value: string) => boolean), { limit, skip, gt, lt, gte, lte })`
This works the exact same as `.find` but will return an array of all matching records instead of just the first match.

If records are found, an array will be returned containing every complete found record.
If no records are found, an empty array will be returned.

### `.replace(key, object)`
Completely replace a key with a new object, losing all previous fields in the record.

### `.patch(key, object)`
Merge the new object with the existing record.

Example:
```javascript
// Existing record
{
  "id": "1",
  "firstName": "Joe",
  "lastName": "Bloggs"
}

// After running:
await doubledb.patch('1', { fullName: 'Joe Bloggs' })

// Result:
{
  "id": "1",
  "firstName": "Joe",
  "lastName": "Bloggs",
  "fullName": "Joe Bloggs"
}
```

### `.remove(key)`
Remove a record by its id.

### `.query(queryObject, options)`
Query the database using a complex query object with support for multiple operators and conditions.

**Example:**
```javascript
const records = await doubledb.query({
  location: 'London',
  age: { $gte: 18 },
  $or: [
    { status: 'active' },
    { status: 'pending' }
  ]
}, {
  limit: 10,
  offset: 0,
  sort: { lastName: 1 },
  project: { firstName: 1, lastName: 1 }
});
```

#### Supported Operators:
- `$eq`: Equal to a value
- `$ne`: Not equal to a value
- `$gt`: Greater than a value
- `$gte`: Greater than or equal to a value
- `$lt`: Less than a value
- `$lte`: Less than or equal to a value
- `$in`: Value is in the provided array
- `$nin`: Value is not in the provided array
- `$all`: Array contains all the provided values
- `$exists`: Field exists or does not exist
- `$not`: Negates the condition
- `$sw`: String starts with value

### `.count(queryObject?)`
Count the number of documents matching the given query criteria. If no query object is provided, returns the total number of documents in the database.

**Example:**
```javascript
// Count total documents
const total = await doubledb.count();

// Count documents matching a simple field value
const londonCount = await doubledb.count({ location: 'London' });

// Count using operators
const activeUsersCount = await doubledb.count({
  status: 'active',
  age: { $gte: 18 }
});

// Count with $or conditions
const count = await doubledb.count({
  $or: [
    { category: 'A' },
    { category: 'B' }
  ]
});
```

The count method supports all the same operators as the query method. For optimal performance, it uses internal counters for simple queries, while complex queries may require scanning index entries.

### `.batchInsert(documents)`
Insert multiple documents at once for better performance.

**Example:**
```javascript
await doubledb.batchInsert([
  { firstName: 'Alice', lastName: 'Smith' },
  { firstName: 'Bob', lastName: 'Johnson' },
  { firstName: 'Charlie', lastName: 'Brown' }
]);
```

If the documents are successfully inserted, an array of the inserted documents will be returned.
If the documents array is empty, an error will be thrown.

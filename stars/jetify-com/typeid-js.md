---
repo: jetify-com/typeid-js
url: 'https://github.com/jetify-com/typeid-js'
homepage: ''
starredAt: '2023-07-14T22:54:26Z'
createdAt: '2023-06-29T15:44:41Z'
updatedAt: '2025-02-25T09:38:37Z'
language: TypeScript
license: Apache-2.0
branch: main
stars: 320
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:47.636Z'
description: >-
  TypeScript implementation of TypeIDs: type-safe, K-sortable, and globally
  unique identifiers inspired by Stripe IDs
tags:
  - guid
  - js
  - ts
  - typeid
  - typescript
  - uuid
  - uuidv7
---

# Official TypeID-JS Package
![License: Apache 2.0](https://img.shields.io/github/license/jetify-com/typeid) [![Built with Devbox](https://www.jetify.com/img/devbox/shield_galaxy.svg)](https://www.jetify.com/devbox)

### JavaScript implementation of [TypeIDs](https://github.com/jetify-com/typeid) using TypeScript.

TypeIDs are a modern, **type-safe**, globally unique identifier based on the upcoming
UUIDv7 standard. They provide a ton of nice properties that make them a great choice
as the primary identifiers for your data in a database, APIs, and distributed systems.
Read more about TypeIDs in their [spec](https://github.com/jetify-com/typeid).

This is the official JavaScript / TypeScript implementation of TypeID by the
[jetify](https://www.jetify.com) team. It provides an [npm package](https://www.npmjs.com/package/typeid-js) that can be used by
any JavaScript or TypeScript project.

#### **_ If you wish to use a string-based representation of typeid (instead of class-based), please follow the instructions [here](src/unboxed/README.md). _**

# Installation

Using npm:

```bash
npm install typeid-js
```

Using yarn:

```bash
yarn add typeid-js
```

Using pnpm:

```bash
pnpm add typeid-js
```

Note: this package requires Typescript > 5.0.0

# Usage

To create a random TypeID of a given type, use the `typeid()` function:

```typescript
import { typeid } from 'typeid-js';
const tid = typeid('prefix');
```

The prefix is optional, so if you need to create an id without a type prefix, you
can do that too:

```typescript
import { typeid } from 'typeid-js';
const tid = typeid();
```

The return type of `typeid("prefix")` is `TypeID<"prefix">`, which lets you use
TypeScript's type checking to ensure you are passing the correct type prefix to
functions that expect it.

For example, you can create a function that only accepts TypeIDs of type `user`:

```typescript
import { typeid, TypeID } from 'typeid-js';

function doSomethingWithUserID(id: TypeID<'user'>) {
    // ...
}
```

In addition to the `typeid()` function, the `TypeID` class has additional methods
to encode/decode from other formats.

For example, to parse an existing typeid from a string:

```typescript
import { TypeID } from 'typeid-js';

// The prefix is optional, but it enforces the prefix and returns a
// TypeID<"prefix"> instead of TypeID<string>
const tid = TypeID.fromString('prefix_00041061050r3gg28a1c60t3gf', 'prefix');
```

To encode an existing UUID as a TypeID:

```typescript
import { TypeID } from 'typeid-js';

// In this case TypeID<"prefix"> is inferred from the first argument
const tid = TypeID.fromUUID('prefix', '00000000-0000-0000-0000-000000000000');
```

The full list of methods includes:

-   `getType()`: Returns the type of the type prefix
-   `getSuffix()`: Returns uuid suffix in its base32 representation
-   `toString()`: Encodes the object as a string, using the canonical format
-   `toUUID()`: Decodes the TypeID into a UUID string in hex format. The type prefix is ignored
-   `toUUIDBytes()`: Decodes the TypeID into a UUID byte array. The type prefix is ignored
-   `fromString(str, prefix?)`: Parses a TypeID from a string, optionally checking the prefix
-   `fromUUID(prefix, uuid)`: Creates a TypeID from a prefix and a UUID in hex format
-   `fromUUIDBytes(prefix, bytes)`: Creates a TypeID from a prefix and a UUID in byte array format

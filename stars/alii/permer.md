---
repo: alii/permer
url: 'https://github.com/alii/permer'
homepage: 'https://npmjs.com/package/permer'
starredAt: '2021-11-22T06:07:03Z'
createdAt: '2020-11-19T15:30:19Z'
updatedAt: '2024-12-02T02:12:50Z'
language: TypeScript
license: MIT
branch: master
stars: 52
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:35.577Z'
description: "\U0001F511 A basic abstraction for handling flags using bitwise"
tags:
  - bitwise
  - permissions
---

# Permer

### A basic abstraction for handling flags and permissions using bitwise

#### Install

`yarn add permer` or, with npm `npm i --save permer`

#### Example

```ts
import {Permer} from 'permer';

const permer = new Permer(['read', 'write', 'admin', 'owner', 'staff']);

const user = {
	permissions: permer.calculate(['read', 'write', 'admin']),
	username: 'alii',
};

// Get individual permissions
const isAdmin = permer.test(user.permissions, 'admin');
const isOwner = permer.test(user.permissions, 'owner');
const isStaff = permer.test(user.permissions, 'staff');
const canRead = permer.test(user.permissions, 'read');
const canWrite = permer.test(user.permissions, 'write');

console.log(`${user.username}'s permissions:`, {
	isAdmin,
	isOwner,
	isStaff,
	canRead,
	canWrite,
});

// Get an array of all permissions
const availablePermissions = permer.list(user.permissions).join(', ');
console.log(`${user.username}'s permission list:`, availablePermissions);
```

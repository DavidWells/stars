---
repo: alanthai/remap-js
url: 'https://github.com/alanthai/remap-js'
homepage: ''
starredAt: '2021-02-22T07:38:41Z'
createdAt: '2017-04-01T19:31:45Z'
updatedAt: '2024-12-27T04:54:31Z'
language: TypeScript
license: MIT
branch: master
stars: 5
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:00.953Z'
description: Give your objects a different shape
tags: []
---

# Remap JS

Give your objects a different shape

## Basic usage

Remap an object by passing its structure as a mapping, and its values is a dot-notation string path, or a function.

```js

const remap = require('remap').remap;

const source = {
  id: 'abc123',
  fname: 'John',
  lname: 'Doe',
  age: 20,
  cellNumber: '555-5555',
  homeNumber: '555-5556',
  very: { deep: { path: 'foo' } },
};

remap({
  id: '', // no change
  firstName: 'fname', // change key from fname to firstName
  lastName: 'lname',
  ageDescription: (obj) => obj.age + ' years old',
  phone: {
    cell: 'cellNumber',
    home: 'homeNumber',
  },
  noSuchKey: 'bar',
  flattenedValue: 'very.deep.path',
}, source);

```

Output:

```js

{
  id: 'abc123',
  firstName: 'John',
  lastName: 'Doe',
  ageDescription: '20 years old',
  phone: {
    cell: '555-5555',
    home: '555-5556'
  },
  noSuchKey: undefined,
  flattenedValue: 'foo'
}

```

## Advanced Remapping

There are functions for common operations

```js

const remap = require('remap-js').remap;
const remapArray = require('remap-js').remapArray;
const remapFrom = require('remap-js').remapFrom;
const getOr = require('remap-js').getOr;

const source = {
  friend: {
    list: [
      { fname: 'Bob', lname: 'Builder' },
      { fname: 'Dora', lname: 'Explorer' },
    ],
  },
  myProfile: {
    profilePicture: 'picture.png',
    nickname: 'nicky',
  }
  myStatus: 'busy',
}

remap({
  friends: remapArray('friend.list', {
    id: (item, index) => `${item.firstName.toLowerCase()}-${index}`,
    firstName: 'fname',
    lastName: 'lname',
  }),
  profile: remapFrom('myProfile', {
    avatar: 'profilePicture',
    alias: 'nickname'
  }),
  status: getOr('myStatus', 'available'),
  messages: getOr('myMessages', [])
}, source);

```

Output

```js

{
  friends: [
    { id: 'bob-1', firstName: 'Bob', lastName: 'Builder' },
    { id: 'dora-2', firstName: 'Dora', lastName: 'Explorer' }
  ],
  profile: {
    avatar: 'picture.png',
    alias: 'nicky'
  },
  status: 'available',
  messages: []
}

```

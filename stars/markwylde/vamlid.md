---
repo: markwylde/vamlid
url: 'https://github.com/markwylde/vamlid'
homepage: ''
starredAt: '2022-11-12T19:34:48Z'
createdAt: '2021-01-17T09:40:56Z'
updatedAt: '2023-01-28T21:08:10Z'
language: JavaScript
license: MIT
branch: master
stars: 5
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:11.087Z'
description: A simple way to validate an object against a pure javascript schema.
tags:
  - parse
  - sanitisation
  - sanitise
  - sanitization
  - sanitize
  - schema
  - valid
  - validation
  - validator
---

# vamlid
A simple way to validate an object against a pure javascript schema.

## Installation
```bash
npm install --save vamlid
```

## Usage (sync)
```javascript
import { sync as vamlid } from 'vamlid';

function validateUser (data) {
  const schema = {
    email: [
      value => !value && 'is required',
      value => value && !value.includes('@') && 'should contain an @ symbol'
    ],

    password: [
      value => !value && 'is required',
      value => value && value.length < 5 && 'should be greater than 5 characters'
    ]
  };

  return vamlid(schema, data);
}

const result = validateUser({
  email: 'wrong',
  notHere: 'test'
});

console.log(result)
/*
{
  fields: {
    email: [
      'should contain an @ symbol'
    ],
    password: [
      'is required'
    ],
    notHere: [
      'is not a valid key'
    ]
  },
  messages: [
    'notHere is not a valid key'
  ]
}
*/
```

## Usage (async)
```javascript
import { async as vamlid } from 'vamlid';

function validateUser (data) {
  const schema = {
    email: [
      value => someDbProvider
        .findAll({ email: value })
        .then((results) => results.length > 0 && 'already taken')
      value => !value && 'is required',
      value => value && !value.includes('@') && 'should contain an @ symbol'
    ],

    password: [
      value => !value && 'is required',
      value => value && value.length < 5 && 'should be greater than 5 characters'
    ]
  };

  return vamlid(schema, data);
}

const result = await validateUser({
  email: 'wrong',
});

console.log(result)
/*
{
  fields: {
    email: [
      'already taken',
      'should contain an @ symbol'
    ],
    password: [
      'is required'
    ],
    notHere: [
      'is not a valid key'
    ]
  },
  messages: [
    'notHere is not a valid key'
  ]
}
*/
```

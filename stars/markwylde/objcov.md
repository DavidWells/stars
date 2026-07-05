---
repo: markwylde/objcov
url: 'https://github.com/markwylde/objcov'
homepage: ''
starredAt: '2022-11-12T19:36:43Z'
createdAt: '2021-02-18T11:42:51Z'
updatedAt: '2024-03-22T20:49:47Z'
language: JavaScript
license: MIT
branch: master
stars: 11
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:10.998Z'
description: >-
  Watch a javascript object and get statistics about how it has been used within
  your code.
tags:
  - coverage
  - coverage-status
  - coverage-testing
  - javascript
  - testing
  - testing-tools
---

# objcov
Watch a javascript object and get statistics about how it has been used within your code.

A great tool for code coverage checking a config/schema driven application.

## Installation
```bash
npm install --save-dev objcov
```

## Usage
```javascript
const objcov = require('objcov');

const config = {
  people: [{
    id: 1,
    firstName: 'Suzie',
    lastName: 'Bloggs'
  }, {
    id: 2,
    firstName: 'Joe',
    lastName: 'Bloggs'
  }],

  one: 1
}

const watchedConfig = objcov.watch(config);

if (watchedConfig.one === 1) {
  // Touch the first item
  JSON.stringify(watchedConfig.people[0]);
}

const coverageCheck = objcov.check(watchedConfig);

console.log(coverageCheck);

/*
{
  touched: [
    'one',
    'people.0.toJSON',
    'people.0.id',
    'people.0.firstName',
    'people.0.lastName'
  ],
  all: [
    'people.0.id',
    'people.0.firstName',
    'people.0.lastName',
    'people.1.id',
    'people.1.firstName',
    'people.1.lastName',
    'one'
  ],
  untouched: ['people.1.id', 'people.1.firstName', 'people.1.lastName'],
  percentTouched: 0.57
}
*/
```

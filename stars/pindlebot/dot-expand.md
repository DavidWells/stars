---
repo: pindlebot/dot-expand
url: 'https://github.com/pindlebot/dot-expand'
homepage: null
starredAt: '2018-12-15T08:56:36Z'
createdAt: '2018-03-02T18:59:59Z'
updatedAt: '2022-04-12T09:13:10Z'
language: JavaScript
license: NA
branch: master
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:54.376Z'
description: null
tags: []
---

# dot-expand

## Installation

Expand key-value pairs whose keys are in dot notation (.e.g, `users.name`) into objects.

```bash
npm i dot-expand --save

yarn add dot-expand
```

## Example

```js
import expand from 'dot-expand'

const pojo = expand({
  'users.df01d9e5.name': 'Tom',
  'users.df01d9e5.age': 37
})

// => { users: { df01d9e5: { name: 'Tom', age: 37 } } }
```

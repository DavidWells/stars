---
repo: NetanelBasal/paginate-array
url: 'https://github.com/NetanelBasal/paginate-array'
homepage: null
starredAt: '2021-01-15T23:15:38Z'
createdAt: '2016-09-22T07:53:43Z'
updatedAt: '2024-12-17T05:35:27Z'
language: JavaScript
license: MIT
branch: master
stars: 42
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:06.947Z'
description: Array pagination
tags: []
---

[![Build Status](https://semaphoreci.com/api/v1/netanel7799/paginate-array/branches/master/badge.svg)](https://semaphoreci.com/netanel7799/paginate-array)

# Array pagination

Simple pagination for arrays in javascript
## Installation
```js
npm install paginate-array
```

## Usage

```js

const paginate = require("paginate-array");
const collection = [...];

const paginateCollection = paginate(collection[,pageNumber, numItemsPerPage]);

console.log(paginateCollection)

{
    currentPage: 1,
    perPage: 10,
    total: 20,
    totalPages: 2,
    data: [...]
}
```

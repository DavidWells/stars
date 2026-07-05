---
repo: chris-armstrong/dynamodb-size-js
url: 'https://github.com/chris-armstrong/dynamodb-size-js'
homepage: null
starredAt: '2023-10-24T19:11:05Z'
createdAt: '2020-05-22T08:34:44Z'
updatedAt: '2024-10-01T00:10:01Z'
language: JavaScript
license: NA
branch: master
stars: 4
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:46.096Z'
description: Calculate DynamoDB object size
tags: []
---

# dynamodb-size

A DynamoDB size calculator, based on [this article](https://medium.com/@zaccharles/calculating-a-dynamodb-items-size-and-consumed-capacity-d1728942eb7c)

Works on your objects before DynamoDB object-structure conversion (i.e. those you'd pass to the `DocumentClient` interface, not the `DynamoDB` interface`).

You may find this useful for:
* Identifying objects that are too big to store in DynamoDB (such as when using BatchWriteItem)
* Estimating the storage cost of a large number of objects before a bulk-import or data migration
* Optimising the size of objects in a busy table

*No guarantees that this is accurate, correct, complete or fully tested - it should only be used for estimations.*

## Installation

```sh
npm install dynamodb-size
```

## Usage

```javascript
const calculateDynamoDBSize = require('dynamodb-size');

const myObject = {
  aString: {
    value1: 134,
    test: false,
  },
};

const sizeOfMyObject = calculateDynamoDBSize(myObject);
```

The size is given in estimated bytes.

## License

Copyright 2020 Chris Armstrong

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

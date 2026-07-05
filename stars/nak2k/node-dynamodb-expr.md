---
repo: nak2k/node-dynamodb-expr
url: 'https://github.com/nak2k/node-dynamodb-expr'
homepage: null
starredAt: '2024-12-27T20:33:24Z'
createdAt: '2018-03-28T22:39:36Z'
updatedAt: '2024-12-27T20:33:24Z'
language: JavaScript
license: NA
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:53:35.132Z'
description: null
tags: []
---

# dynamodb-expr

DynamoDB expression utility.

## Installation

```
npm i dynamodb-expr -S
```

## API

### buildProjectionExpression(attributes, ExpressionAttributeNames)

Build a projection expression.

- `attributes`
    - An array of names of attributes to be projected.
- `ExpressionAttributeNames`
    - An object that adds mappings of attributes that are replaced with placeholders during expression construction.

The return value is a string of the projection expression that reserved words in it are replaced with placeholders.

Example:

``` javascript
const { buildProjectionExpression } = require('dynamodb-expr');

const ExpressionAttributeNames = {};

const ProjectionExpression = buildProjectionExpression(['index', `foo'], ExpressionAttributeNames);

// Result:
//   ProjectionExpression: '#index,foo'
//   ExpressionAttributeNames: { '#index': 'index' }
```

### isReserved(word)

Return a boolean value that indicates whether the word is reserved.

## Constant

### RESERVED_KEYWORDS

An array of reserved keywords.

## License

MIT

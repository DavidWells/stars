---
repo: florajs/sql-parser
url: 'https://github.com/florajs/sql-parser'
homepage: null
starredAt: '2024-12-31T07:34:39Z'
createdAt: '2015-07-10T14:36:25Z'
updatedAt: '2025-02-11T21:57:20Z'
language: JavaScript
license: GPL-2.0
branch: main
stars: 289
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:53:34.201Z'
description: >-
  Parse SQL (select) statements into abstract syntax tree (AST) and convert ASTs
  back to SQL.
tags:
  - ast
  - parser
  - sql
---

# @florajs/sql-parser

![](https://github.com/florajs/sql-parser/workflows/ci/badge.svg)
[![NPM version](https://img.shields.io/npm/v/@florajs/sql-parser.svg?style=flat)](https://www.npmjs.com/package/@florajs/sql-parser)
[![NPM downloads](https://img.shields.io/npm/dm/@florajs/sql-parser.svg?style=flat)](https://www.npmjs.com/package/@florajs/sql-parser)

Parse simple SQL statements into an abstract syntax tree (AST) and convert it back to SQL.

## Usage

### Create AST for SQL statement

```javascript
const { Parser } = require('@florajs/sql-parser');
const parser = new Parser();
const ast = parser.parse('SELECT * FROM t');

console.log(ast);
```

### Convert AST back to SQL

```javascript
const { Parser } = require('@florajs/sql-parser');
const ast = (new Parser()).parse('SELECT * FROM t');
const toSQL = require('@florajs/sql-parser').util.astToSQL;

console.log(toSQL(ast));
```

The generated SQL is ANSI SQL compliant. To run those queries on MySQL, make sure you set correct SQL mode

```sql
SET SESSION sql_mode = 'ANSI';
```

before running any query.

## Acknowledgement

This project is based on the SQL parser extracted from Alibaba's [nquery](https://github.com/alibaba/nquery) module.  

## License

[GPL-2.0](LICENSE)

---
repo: rmp135/sql-ts
url: 'https://github.com/rmp135/sql-ts'
homepage: ''
starredAt: '2022-02-18T06:46:43Z'
createdAt: '2017-04-23T22:17:08Z'
updatedAt: '2025-02-24T12:13:19Z'
language: TypeScript
license: MIT
branch: master
stars: 549
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:18.578Z'
description: Generate TypeScript interfaces from a SQL database.
tags: []
---

<div align="center">

<h1>sql-ts</h1>

[![npm (scoped)](https://img.shields.io/npm/v/@rmp135/sql-ts)](https://www.npmjs.com/package/@rmp135/sql-ts)
[![npm](https://img.shields.io/npm/dw/@rmp135/sql-ts)](https://www.npmjs.com/package/@rmp135/sql-ts)
[![Run Tests](https://github.com/rmp135/sql-ts/actions/workflows/test.yml/badge.svg)](https://github.com/rmp135/sql-ts/actions/workflows/test.yml)

</div>

Generate TypeScript types for tables and views in a SQL database. 

Includes comments from tables, views and columns for [supported providers](https://rmp135.github.io/sql-ts/#/?id=comments).

Highly configurable: choose your own [naming](https://rmp135.github.io/sql-ts/#/?id=interfacenameformat) and [casing schemes](https://rmp135.github.io/sql-ts/#/?id=tablenamecasing), [add types](https://rmp135.github.io/sql-ts/#/?id=typemap), [extend base types](https://rmp135.github.io/sql-ts/#/?id=extends), and more.

Supports the following database providers: MySQL, Microsoft SQL Server, SQLite and Postgres.


```sql
CREATE TABLE [dbo].[Employees](
	[EmployeeID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](20) NOT NULL,
	[BirthDate] [datetime] NULL,
	[Photo] [image] NULL
)
```

```ts
export interface EmployeesEntity {
  'EmployeeID'?: number;
  'Name': string;
  'BirthDate'?: Date | null;
  'Photo'?: Buffer | null;
}
```
## Documentation

Full documentation with all configuration options and node APIs are available at https://rmp135.github.io/sql-ts/. 


## Installation

Install into your project using npm / yarn.

`npm install @rmp135/sql-ts`

Install your relevant SQL driver. Refer to the [knex documentation](http://knexjs.org/#Installation-node) to determine which driver you should install. For example `npm install mysql2`.

Create a configuration file, for example `mysql.json`. This will mirror connection details from knex. The `client` property will determine the SQL provider.

The most basic MySQL setup is below, modify as appropriate. Additional options can be applied by referring to the [Config](https://rmp135.github.io/sql-ts/#/?id=config).

```json
{
  "client": "mysql2",
  "connection": {
    "host": "localhost",
    "user": "user",
    "password": "password",
    "database" : "my_database"
  }
}
```

## Usage

### CLI

Run `npx @rmp135/sql-ts` with the path of the configuration file created above.

`npx @rmp135/sql-ts -c ./mysql.json`

The file will be exported with the filename `Database.ts` (or with the name specified via the [filename](https://rmp135.github.io/sql-ts/#/?id=filename) config option) at the current working directory. 

### Node Module

For finer grained control of the exported types, you can use the node API. See how in the [documentation](https://rmp135.github.io/sql-ts/#/?id=node-module).


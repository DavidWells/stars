---
repo: sigoden/sequelize-modelgen
url: 'https://github.com/sigoden/sequelize-modelgen'
homepage: null
starredAt: '2022-02-27T06:10:46Z'
createdAt: '2021-12-01T04:48:49Z'
updatedAt: '2025-02-21T15:54:27Z'
language: JavaScript
license: NA
branch: main
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:05.720Z'
description: Generate sequelize models from sql
tags: []
---

# sequelize-modelgen

Generate mode ts files from sql file


## Get Started

1. install tool

```
npm i -g sequelize-modelgen
```

2. write sql file
```sql
 CREATE TABLE `Table1` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(99) NOT NULL,
    `pass` VARCHAR(99) NOT NULL,
    `hobby` VARCHAR(99),
    `isForbid` TINYINT DEFAULT 0 COMMENT "Is forbidden user",
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY `uniqName` (`name`)
) COMMENT "table 1";

 CREATE TABLE `Table2` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(99) NOT NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) COMMENT "table 2";
```

3. run modelgen

```
modelgen db.sql models
```

genrate models/index.ts
```ts
import { Sequelize } from "sequelize";

// AutoGenImportBegin {
import Table1, { Table1Attributes } from "./Table1";
import Table2, { Table2Attributes } from "./Table2";
// } AutoGenImportEnd

export function load(sequelize: Sequelize) {
  // AutoGenBootstrapBegin {
  Table1.bootstrap(sequelize);
  Table2.bootstrap(sequelize);
  // } AutoGenBootstrapEnd
}

export {
  // AutoGenExportBegin {
  Table1,
  Table1Attributes,
  Table2,
  Table2Attributes,
  // } AutoGenExportEnd
};
```
genrate models/Table1.ts
```ts
import { Sequelize, Model, DataTypes, NOW } from "sequelize";

export interface Table1Attributes {
  // AutoGenIntefaceAttrBegin {
  id?: number;
  name: string;
  pass: string;
  hobby?: string;
  isForbid?: number;
  createdAt?: Date;
  // } AutoGenIntefaceAttrEnd
}

export default class Table1 extends Model<Table1Attributes, Partial<Table1Attributes>> {
  // AutoGenModelAttrsBegin {
  public id: number;
  public name!: string;
  public pass!: string;
  public hobby: string;
  public isForbid: number;
  public createdAt: Date;
  // } AutoGenModelAttrsEnd

  public static bootstrap(sequelize: Sequelize) {
    Table1.init(
      {
        // AutoGenColumnDefsBegin {
        id: {
          type: DataTypes.BIGINT().UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(99),
          allowNull: false,
        },
        pass: {
          type: DataTypes.STRING(99),
          allowNull: false,
        },
        hobby: {
          type: DataTypes.STRING(99),
        },
        isForbid: {
          type: DataTypes.TINYINT(),
          defaultValue: 0,
        },
        createdAt: {
          type: DataTypes.DATE(),
          allowNull: false,
          defaultValue: NOW,
        },
        // } AutoGenColumnDefsEnd
      },
      {
        sequelize,
        tableName: "Table1",
        timestamps: false,
      },
    );
  }
}
```

**AutoGen wrapped code will be replaced by modelgen, other parts will keep unchaning.**

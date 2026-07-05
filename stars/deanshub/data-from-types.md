---
repo: deanshub/data-from-types
url: 'https://github.com/deanshub/data-from-types'
homepage: null
starredAt: '2022-02-26T00:27:49Z'
createdAt: '2019-07-11T07:57:22Z'
updatedAt: '2023-08-13T19:00:58Z'
language: TypeScript
license: NA
branch: master
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:06.692Z'
description: null
tags: []
---

# Data From Types

This thing generates data from TypeScript types

## Install

`npm install --save-dev data-from-types`

## Usage

you have the file:

```ts
// test-file.ts

export interface Person {
  firstName: string;
  lastName: string;
  age: number;
}
```

you want to generate data based on the interfaces

```ts
// my.spec.ts

import * as DataFromTypes from "data-from-types";

const generatedData = DataFromTypes.getData("./test-file.ts");

// generatedData is now { Person: {firstName: 'igor', lastName: 'romanov', age: 12}}
expect(generatedData).toHaveProperty("Person");
expect(generatedData.Person).toHavePropertyOfType("firstName", "string");
expect(generatedData.Person).toHavePropertyOfType("lastName", "string");
expect(generatedData.Person).toHavePropertyOfType("age", "number");
```

## Reference

#### getData(filePath)

Generates fake data for all exported interfaces, based on the types.

- filePath - location of the typescript file.

#### getFileSchema(filePath)

Generates an object which describes the schema of the exported interfaces.

- filePath - location of the typescript file.

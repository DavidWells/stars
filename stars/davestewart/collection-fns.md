---
repo: davestewart/collection-fns
url: 'https://github.com/davestewart/collection-fns'
homepage: ''
starredAt: '2022-02-17T05:18:28Z'
createdAt: '2020-04-26T14:14:07Z'
updatedAt: '2022-02-17T05:18:28Z'
language: TypeScript
license: MIT
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:21.677Z'
description: 'A set of flexible, type-safe functions to manipulate arrays of models'
tags:
  - collections
  - functional
  - functional-programming
  - models
  - typescript
---

# Collection Fns

## Abstract

Collection Fns is a set of flexible, type-safe functions designed to manipulate collections of models:

- a **model** is defined as an object with a common identifier such as `id`, `guid` or `someId`
- a **collection** is defined as an `Array` of models sharing the same `id` key
- **flexible functions** is defined that any function can applied to any collection of arbitrary models

The project has the following goals:

- to provide a basic set of array collection / model manipulation functions
- to target models by arbitrary property (defaulting to `id`)
- to be expressive and flexible
- to be purely functional
- to be TypeScript native

The end result is you use simple, safe and robust helper functions to maniulate arrays of models without ever having to resort to writing repetitive, complex, fragile or error-prone array-centric code.


## Functions

Note the  "keyed" column below, for functions which take an optional `key` parameter, allowing you to target any model schema (defaults to `'id'`).

- an `x` means the model `id` is keyed
- an `o` means a different property is keyed

### Models

These functions manage single models within a collection:

| Function    | Keyed  | Description                                                  | Returns |
| ----------- | ------ | ------------------------------------------------------------ | ------- |
| first       | &nbsp; | Get the first model in a collection                          | model   |
| last        | &nbsp; | Get the last model in a collection                           | model   |
| has         | x      | Test if a collection has a model                             | boolean |
| get         | x      | Get a model from a collection                                | model   |
| getIndex    | x      | Get the index of a model in a collection                     | number  |
| getRandom   | &nbsp; | Get a random model from a collection                         | model   |
| add         | x      | Add a model to a collection, or if it already exists, update | model   |
| addOrMove   | x      | Add a model to a collection, or if it already exists, move it to an index | model   |
| update      | x      | Update a model if it exists in a collection                  | model   |
| move        | x      | Move a model in a collection to a specific index in the same or a different array | model   |
| moveToEnd   | x      | Move a model in a collection to the end of the same or a different array | model   |
| moveByIndex | &nbsp; | Move a model in a collection from one index to another in the same or a different array | model   |
| remove      | x      | Remove a model from a collection                             | model   |

### Collections

These functions manipulate collections, offering simple lodash-like functionality:

| Function | Keyed  | Description                                                  | Returns  |
| -------- | ------ | ------------------------------------------------------------ | -------- |
| forEach  | &nbsp; | Iterate over a collection of models and call a function on each model | array    |
| map      | &nbsp; | Iterate over a collection of models, call a function on each model, and return the updated array | array    |
| filter   | o      | Filter a collection of models by property, including matched values | array    |
| omit     | o      | Filter a collection of models by property, omitting matched values | array    |
| dedupe   | x      | Filter a collection of models, omitting those with duplicate ids | array    |
| merge    | x      | Given two arrays of models, add the models not found in the first array from the second array, and return the new array | array    |
| sort     | o      | Sort a collection of models by property                      | array    |
| sortBy   | &nbsp; | Utility function to return a sort() comparison function      | function |


## Installation

Add this line to your project's `.npmrc`:

```
@likelylogic:registry=https://npm.pkg.github.com
```

Install via the command line:

```bash
npm i @likelylogic/collection-fns
```

## Usage

Here are some basic examples showing the flexibility and functional nature of the library:

```js
// get the model identified by an id of 5
get(models, 5)
```

```js
// update the window identified by a windowId of 10 with new data 
update(windows, 10, data, 'windowId')
```

```js
// move a tab identified by a tabId 15 to the 5th index in another collection
move(left, 15, 5, right, 'tabId')
```

```js
// sort a collection of users by first name
sort(users, 'firstName')
```

Check the example files for full code:

- [Basic](./examples/basic.ts) – manage arrays of arbitrary models
- [Advanced](./examples/advanced.ts) – compose the functions into reusable collection classes
- [Generics](./examples/generics.ts) – example of using and overriding generic type-safety


## Generic type safety

The package's functions are [generic](https://www.typescriptlang.org/docs/handbook/generics.html#using-type-parameters-in-generic-constraints) meaning that the values you supply the function will enforce their own type checking.

Consider the following; the `people` array should not be able to be updated with the wrong information:

```ts
import { update } from '@likelylogic/collection-fns'

const people = [
  { id: 1, name: 'tom' },
  { id: 2, name: 'dick' },
  { id: 3, name: 'harry' },
]

update(people, 2, { age: 100 }) // error! Object literal may only specify known properties, and 'age' does not exist in type 'Partial<{ id: number; name: string; }>'.
```

To force an update, type the payload as `any`:

```ts
update(people, 2, { age: 100 } as any)
```

You can be sure that TypeScript's got your back when shuffling models within and between collections!

## Scripts

 - `npm run dev` - build and watch the package for changes

- `npm run build` - build the package for production
- `npm run prepare` - lint and fix, then build the package ready for publishing
- `npm run lint` - run linting
- `npm run lint:fix` - run linting and fix errors
- `npm run test` - run and watch unit tests

## Contributing

Adding new functionality:

- write code
- write tests
- run tests / check coverage
- update docs

Publishing:

- update package version (minor or patch)
- run scripts:

```
npm run prepare
npm publish
```

---
repo: jonschlinkert/expand-json-schema
url: 'https://github.com/jonschlinkert/expand-json-schema'
homepage: null
starredAt: '2024-11-12T01:29:56Z'
createdAt: '2024-11-10T13:09:31Z'
updatedAt: '2025-01-19T11:31:39Z'
language: TypeScript
license: NA
branch: main
stars: 7
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:18.615Z'
description: >-
  Light weight JSON Schema $ref resolver. Expands a JSON Schema by resolving
  `$ref` references from a mapping of definitions. Does not handle remote
  references. Has comprehensive unit tests and no dependencies.
tags: []
---

# expand-json-schema [![NPM version](https://img.shields.io/npm/v/expand-json-schema.svg?style=flat)](https://www.npmjs.com/package/expand-json-schema) [![NPM monthly downloads](https://img.shields.io/npm/dm/expand-json-schema.svg?style=flat)](https://npmjs.org/package/expand-json-schema) [![NPM total downloads](https://img.shields.io/npm/dt/expand-json-schema.svg?style=flat)](https://npmjs.org/package/expand-json-schema)

> Light weight JSON Schema $ref resolver. Expands a JSON Schema by resolving `$ref` references from a mapping of definitions. Does not handle remote references. Has comprehensive unit tests and no dependencies.

Please consider following this project's author, [Jon Schlinkert](https://github.com/jonschlinkert), and consider starring the project to show your :heart: and support.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save expand-json-schema
```

## Usage

```js
import { expandSchema } from 'expand-json-schema';
// or
import expandSchema from 'expand-json-schema';

const schema = {
  $ref: '#/definitions/User'
};

// Resolves $refs from a mapping of objects/definitions passed as the second argument
const expandedSchema = expandSchema(schema, definitions);
console.log(expandedSchema);
```

## API

### expandSchema(schema, definitions, options)

Expands a JSON Schema by resolving `$ref` references from a mapping of definitions, and applying basic transformations such as sorting keys and handling nullable fields.

**Params**

* `schema` **{Object}**: The schema to be expanded.
* `definitions` **{Object}**: An object containing schema definitions.
* `options` **{Object}**: Optional configuration settings.
  - `paths` **{Array}**: Custom paths to resolve `$ref` from.
  - `sortOrder` **{Array}**: Custom key sort order.

**Returns**

* **{Object}**: The expanded schema.

## Examples

### Example: Basic Schema Expansion

```js
const schema = {
  $ref: '#/definitions/User'
};
const definitions = {
  User: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      age: { type: 'integer' }
    }
  }
};

const result = expandSchema(schema, definitions);
console.log(result);
// Output: {
//   type: 'object',
//   properties: {
//     name: { type: 'string' },
//     age: { type: 'integer' }
//   }
// }
```

### Example: Handling Nullable Properties

```js
const schema = {
  type: 'string',
  nullable: true
};

const result = expandSchema(schema);
console.log(result);
// Output: {
//   type: ['string', 'null']
// }
```

### Example: Inlining Definitions

The second argument (`definitions`) is used along with the `paths` option to resolve `$refs`. Definitions are then inlined onto the schema. The combination of these two options not only allows for a more flexible way to resolve references, but it gives you an easy to prevent unwanted objects from being included in the search, when objects are dynamicaly resolved.

```js
const definitions = {
  models: {
    User: {
      type: 'object',
      properties: {
        id: { type: 'string' }
      }
    }
  },
  types: {
    Address: {
      type: 'object',
      properties: {
        street: { type: 'string' }
      }
    }
  }
};

const schema = {
  properties: {
    user: { $ref: '#/models/User' },
    address: { $ref: '#/types/Address' }
  }
};

const result = expandSchema(schema, definitions, {
  paths: ['models', 'types']
});

console.log(result);
// Output:
// {
//   definitions: {
//     User: {
//       type: 'object',
//       properties: {
//         id: { type: 'string' }
//       }
//     },
//     Address: {
//       type: 'object',
//       properties: {
//         street: { type: 'string' }
//       }
//     }
//   },
//   properties: {
//     user: { $ref: '#/definitions/User' },
//     address: { $ref: '#/definitions/Address' }
//   }
// }
```

### Example: Resolving Nested References

```js
const components = {
  definitions: {
    User: {
      type: 'object',
      properties: {
        name: { type: 'string' }
      }
    }
  }
};

const schema = {
  $ref: '#/definitions/User'
};

const result = expandSchema(schema, components);
console.log(result);
// Output: {
//   type: 'object',
//   properties: {
//     name: { type: 'string' }
//   }
// }
```

### Example: Handling Custom Paths

```js
const components = {
  custom: {
    path: {
      UserType: {
        type: 'object',
        properties: {
          name: { type: 'string' }
        }
      }
    }
  }
};

const schema = {
  $ref: '#/custom/path/UserType'
};

const result = expandSchema(schema, components, {
  paths: ['custom/path']
});
console.log(result);
// Output: {
//   type: 'object',
//   properties: {
//     name: { type: 'string' }
//   }
// }
```

## About

<details>
<summary><strong>Contributing</strong></summary>

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

</details>

<details>
<summary><strong>Running Tests</strong></summary>

Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:

```sh
$ npm install && npm test
```

</details>

<details>
<summary><strong>Building docs</strong></summary>

_(This project's readme.md is generated by [verb](https://github.com/verbose/verb-generate-readme), please don't edit the readme directly. Any changes to the readme must be made in the [.verb.md](.verb.md) readme template.)_

To generate the readme, run the following command:

```sh
$ npm install -g verbose/verb#dev verb-generate-readme && verb
```

</details>

### Author

**Jon Schlinkert**

* [GitHub Profile](https://github.com/jonschlinkert)
* [Twitter Profile](https://twitter.com/jonschlinkert)
* [LinkedIn Profile](https://linkedin.com/in/jonschlinkert)

### License

Copyright © 2024, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the MIT License.

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.8.0, on November 10, 2024._

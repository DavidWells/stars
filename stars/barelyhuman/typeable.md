---
repo: barelyhuman/typeable
url: 'https://github.com/barelyhuman/typeable'
homepage: null
starredAt: '2023-12-29T02:09:38Z'
createdAt: '2023-01-20T15:33:39Z'
updatedAt: '2023-12-29T02:09:38Z'
language: JavaScript
license: MIT
branch: main
stars: 4
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:41.098Z'
description: a on-the-fly type generator for objects in node
tags: []
---

# typeable

> a on-the-fly type generator for objects in node

> **Warning**: This will not really work in a browser, it expects a filesystem

## Installation

Install `@barelyhuman/typeable` with npm

```bash
  npm install @barelyhuman/typeable
```

## What and Why

It's a generator for object interfaces. I have a project that I'm working on
which has a ton of shared objects being defined during development, this makes
it hard to keep track of what all was defined on the object.

Typescript has cross file inference but still doesn't help with dynamically
defined properties so this helps generate a declarations file that stores all
the properties added to the object. There's definite knick knacks that can be
fixed.

> **Note**: This is a subset requirement for one of my packages and **might
> not** be something you need for your day to day development. The generator's
> goal is to be able to generate types at runtime while in development.

> **Note**: If the `NODE_ENV` is set to `production`, the type generator will
> not run.

## Usage

```js
const { createTypeable } = require('@barelyhuman/typeable')

/**
 * @type {import("./typeable").App}
 */

const app = createTypeable(
  {}, // an empty object or reference to an object to be read
  {
    outfile: 'typeable.d.ts', // output path for the generated declaration file
    rootInterfaceName: 'App', // the interface name to be generated for the above object.
  }
)

// add in properties, functions, methods, etc to the new typeable object.
app.property = {}
app.property.method = function () {}
```

```ts
// typeable.d.ts
export interface App {
  property: property
}

interface property {
  // generated generic functions right now
  method: (...args: any[]) => any
}
```

## Caveats

- Cannot handle `kebab-case` or `spaced keys` and will ignore them altogether
- Cannot infer the type of arguments from a function

## License

[MIT](/LICENSE)

---
repo: dldc-packages/zenjson
url: 'https://github.com/dldc-packages/zenjson'
homepage: null
starredAt: '2022-02-17T04:43:44Z'
createdAt: '2021-11-09T18:58:26Z'
updatedAt: '2024-05-04T20:10:21Z'
language: TypeScript
license: MIT
branch: main
stars: 5
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:22.380Z'
description: Parse and serialize special types into JSON-compatible data.
tags: []
---

# 🏯 ZenJSON ![Travis (.com)](https://img.shields.io/travis/com/etienne-dldc/zenjson) ![npm bundle size](https://img.shields.io/bundlephobia/min/zenjson) ![Codecov](https://img.shields.io/codecov/c/gh/etienne-dldc/zenjson)

> Transform custom types into JSON-compatible data.

Have you ever tried to do something like this:

```js
JSON.stringify({ createdAt: new Date() });
```

This works but the date is converted into a string so when you `JSON.parse` the
result you don't get a `Date` back.

ZenJSON allow you to transform you data into a new one that can safely be
`stringify`ed. Of course you can also do the reverse operation to get back your
original data.

Here is a gist:

```ts
import { restore, sanitize } from "https://deno.land/x/zenjson/mod.ts";

const data = {
  createdAt: new Date(),
  nested: {
    array: [Infinity, undefined, NaN],
  },
};

// sanitize your data before calling JSON.stringify
const str = JSON.stringify(sanitize(data));

// restore afer calling JSON.parse to get back the original data
const parsed = restore(JSON.parse(str));

assert(parsed.createdAt instanceof Date);
assert(parsed.nested.array[0] === Infinity);
```

## Installation

```bash
# npm
npm install zenjson
# yarb
yarn add zenjson
```

You can also use this package in Deno / Recent Browser using ESM import like
this:

```js
import { restore, sanitize } from "https://deno.land/x/zenjson/mod.ts";

// don't forget to fix the version, for example https://deno.land/x/zenjson@v1.0.0/mod.ts
// open https://deno.land/x/zenjson/mod.ts to find the latest one
```

## Suported data type

By default ZenJSON supports the following types:

- Any data normally suported in JSON (string, number, boolean, null, object,
  array)
- `Date`
- Special numbers: `Infinity`, `-Infinity` and `NaN`
- `undefined`

## How does it works

When you call `sanitize`, ZenJSON will traverse your data and match it against a
list of custom types. When a value matches a type, it will replace the value
into a tuple of two elements (the first element is the name of the type, the
second is the sanitized value).

For example if you call `sanitize(NaN)` it will produce the following result:
`['number', 'NaN']`.

If you then call the `restore` function with this tuple:
`restore(['number', 'NaN'])` it will return `NaN`.

**Note**: Both `sanitize` and `restore` create a shallow copy, even if no change
is made.

## Custom types

You can provide your own custom types and even replace the default ones using
the `createSanitize` and `createRestore` functions.

These functions take one argument: the list of supported types. The defaults
supported types are exposed as `defaultTypes`.

- The `sanitize` function correspond to `createSanitize(defaultTypes)`
- The `restore` function correspond to `createRestore(defaultTypes)`

If you use one of the `create` function you probably want to add your own custom
type:

```ts
import {
  createSanitize,
  defaultTypes,
} from "https://deno.land/x/zenjson/mod.ts";

const sanitize = createSanitize([
  // copy the default types
  ...defaultTypes,
  // add your own type (keep reading to find out how to create this)
  myCustomType,
]);
```

## Defining a custom type

**Note**: If you use TypeScript you can use the `ICustomType` export to defined
you types.

A custom type is an object with the following properties:

- `name`: This identify your type. It must be unique. The defaults types uses
  the following names: `undefined`, `number`, `array`, `date`.
- `check`: A function that receive a value and return `true` if it has the
  correct type.
- `sanitize`: A function that receive the value and must return a
  JSON-compatible version of it (for example `(date) => date.toISOString()`).
- `restore`: A function that receive the sanitized value and must return the
  restored value (for example `(dateStr) => parseISO(dateStr)`).

Here is an example of a custom type that handles
[BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt):

```ts
import {
  createRestore,
  createSanitize,
  defaultTypes,
} from "https://deno.land/x/zenjson/mod.ts";

const bigintType = {
  name: "bigint",
  check: (val) => typeof val === "bigint",
  sanitize: (val) => val.toString(),
  restore: (val) => BigInt(val),
};

const sanitize = createSanitize([...defaultTypes, bigintType]);
const restore = createRestore([...defaultTypes, bigintType]);

const data = { num: 123456789123456789123456n };
const sanitized = sanitize(data); // { num: ['bigint', '123456789123456789123456'] }
const restored = restore(sanitized); // { num: 123456789123456789123456n }
```

**Note**: The `check`, `sanitize` and `restore` also receive a second parameter:
`ctx`. This is an object that contains some usefull data and functions.

Take a look a the
[`types.ts` file](https://github.com/etienne-dldc/zenjson/blob/main/src/types.ts)
to see how the defaults types are implemented.

By the way, each one of the default types are exported and can be used
indivdually. They are four types:

- `dateType` (name: `date`) handles `Date` objects
- `undefinedType` (name: `undefined`) handles `undefined` values
- `specialNumberType` (name: `number`) handles `NaN`, `Infinity` and `-Infinity`
- `arrayType` (name: `array`) handles special cases (see below)

## The `arrayType` custom type

You might be wonderring what happens if your data looks like one of the
sanitized tuple, for example you might have something like this:

```js
const data = {
  keys: ["date", "time"],
};
```

This object might cause an error because the `restore` function will interpret
the `['date', 'time']` as a sanitized value and will try to transform it into a
date.

To solve this ZenJSON include the `arrayType` in the list of default types. This
type will tranform any array that looks like a sanitized tuple into a tuple
`['array', __THE_ARRAY__]`.

In the example above the result of `sanitize(data)` is:

```js
const result = {
  keys: ["array", ["date", "time"]],
};
```

Which is correctly `restore`d into the original object.

**Important**: When you define your own types you should always include the
`arrayType` to avoid the problem desribed above.

## Handling nested data

ZenJSON handles nested array and object but it will stop as soon as a custom
type matches. If you want to sanitize data inside f your custom type, you can
use the `ctx.sanitize` and `ctx.restore`.

Here is an example of a custom type for
[`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set):

```ts
const setType = {
  name: "set",
  check: (val) => val && val instanceof Set,
  sanitize: (val, ctx) => {
    // extract list of values
    const setValues = Array.from(set.values());
    // use ctx.sanitize to sanitize items inside the set
    return setValues.map((item) => ctx.sanitize(item));
  },
  restore: (val, ctx) => {
    const restoredValues = val.map((item) => ctx.restore(item));
    return new Set(restoredValues);
  },
};
```

## Using `ctx.state`

For more advanced use case you can use the `ctx.state` to store data outside of
the sanitized / restored data. This object is a `ITypedMap` (a `WeakMap` that
use a special key to enforce type safety).

When you call `sanitize` or `restore` you can pass a second argument that will
be used as the initial state of the `ctx.state`.

```ts
const sanitize = createSanitize([
  ...defaultTypes,
  someSpecialTypeThatUsesCtxState,
]);
const state = createTypedMap();
const sanitized = sanitize(data, state);
// do something with the state
state.get(someKey);
```

Take a look at [this test file]('./tests/files.test.ts) for an example.

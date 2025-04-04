---
repo: lukeed/tschema
url: 'https://github.com/lukeed/tschema'
homepage: ''
starredAt: '2024-08-06T16:53:42Z'
createdAt: '2024-07-22T16:03:32Z'
updatedAt: '2025-02-24T11:16:34Z'
language: TypeScript
license: MIT
branch: main
stars: 721
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:26.830Z'
description: A tiny (500b) utility to build JSON schema types.
tags: []
---

# tschema [![CI](https://github.com/lukeed/tschema/workflows/CI/badge.svg)](https://github.com/lukeed/tschema/actions?query=workflow%3ACI) [![licenses](https://licenses.dev/b/npm/tschema)](https://licenses.dev/npm/tschema)

> A tiny (500b) utility to build [JSON schema](https://json-schema.org/understanding-json-schema/reference) types.

## Install

This package is compatible with all JavaScript runtimes and is available on multiple registries:

- **npm** &mdash; available as [`tschema`](https://www.npmjs.com/package/tschema)
- **JSR** &mdash; available as [`@lukeed/tschema`](https://jsr.io/@lukeed/tschema)

## Usage

```ts
import * as t from 'tschema';

// Define JSON object schema
let User = t.object({
  uid: t.integer(),
  name: t.string({
    description: 'full name',
    examples: ['Alex Johnson'],
  }),
  isActive: t.boolean(),
  avatar: t.optional(
    t.string({ format: 'uri' }),
  ),
  achievements: t.tuple([
    t.number({ minimum: 0 }), // points
    t.enum(['novice', 'pro', 'expert', 'master']),
  ]),
  interests: t.array(
    t.string({
      minLength: 4,
      maxLength: 36,
    }),
  ),
  last_updated: t.integer({
    minimum: 0,
    examples: [1722642982],
    description: 'unix seconds',
  }),
}, {
  description: 'a User record',
});

// Infer its TypeScript definition:
// NOTE: names do not have to match~!
type User = t.Infer<typeof User>;
//-> {
//->   uid: number;
//->   name: string;
//->   isActive: boolean;
//->   avatar?: string | undefined;
//->   achievements: [number, "novice" | "pro" | "expert" | "master"];
//->   interests: string[];
//->   last_updated: number;
//-> }

console.log(User);
//-> {
//->   type: "object",
//->   description: "a User record",
//->   additionalProperties: false,
//->   properties: {
//->     uid: {
//->       type: "integer"
//->     },
//->     name: {
//->       type: "string",
//->       description: "full name",
//->       examples: ["Alex Johnson"]
//->     },
//->     isActive: {
//->       type: "boolean"
//->     },
//->     avatar: {
//->       type: "string",
//->       format: "uri"
//->     },
//->     achievements: {
//->       type: "array",
//->       prefixItems: [{
//->         type: "number",
//->         minimum: 0
//->       }, {
//->         enum: ["novice", "pro", "expert", "master"]
//->       }],
//->       minItems: 2,
//->       maxItems: 2
//->     },
//->     interests: {
//->       type: "array",
//->       items: {
//->         type: "string",
//->         minLength: 4,
//->         maxLength: 36
//->       }
//->     },
//->     last_updated: {
//->       type: "integer",
//->       minimum: 0,
//->       examples: [1722642982],
//->       description: "unix seconds"
//->     }
//->   },
//->   required: [
//->     "uid",
//->     "name",
//->     "isActive",
//->     "achievements",
//->     "interests",
//->     "last_updated"
//->   ]
//-> }
```

## API

Please refer to the [generated API documentation](https://jsr.io/@lukeed/tschema/doc), as it's
always kept up-to-date.

> **Note:** The API is the same across all JavaScript runtimes, regardless of [installation](#install) source. Only the package's name changes.

## Benchmarks

> Run on Deno 1.45.5 `(release, aarch64-apple-darwin)` with v8 `12.7.224.13`

```
file: tschema/scripts/bench.ts
runtime: deno 1.45.5 (aarch64-apple-darwin)

# Builders
  tschema              5,328,603.3 iter/sec     187.67 ns/iter
  sinclair/typebox       130,480.2 iter/sec       7.66 µs/iter
  zod-to-json-schema      46,928.5 iter/sec      21.31 µs/iter

# Summary
  tschema
    40.84x faster than sinclair/typebox
   113.55x faster than zod-to-json-schema
```

## License

MIT © [Luke Edwards](https://lukeed.com)

---
repo: marijnh/getdocs-ts
url: 'https://github.com/marijnh/getdocs-ts'
homepage: null
starredAt: '2022-03-16T02:32:50Z'
createdAt: '2021-01-08T15:06:05Z'
updatedAt: '2024-08-04T16:40:32Z'
language: TypeScript
license: NOASSERTION
branch: main
stars: 19
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:58.450Z'
description: Extract builddocs-style info from typescript sources
tags: []
---

# getdocs-ts

This is a tool for extracting documentation and typing information
from TypeScript sources. The output is intended for further processing
with [builddocs](https://github.com/marijnh/builddocs).

## Usage

```console
$ bin/getdocs-ts.js some-source.ts > some-symbols.json
```

Or via the API:

```javascript
const {gather} = require("getdocs-ts")

let items = gather({filename: "/path/to/mainfile.ts"})
```

You can also pass a `basedir` option to `gather`, which provides
the directory inside which imported files should be considered
internal to the module. This defaults to the parent directory of the
main filename.

A second function `gatherMany`, takes an array of configurations and
extracts them all at once. Because this avoids duplicate startup,
typechecking, and module loading work, this can be a _lot_ faster when
generating docs for a bunch of modules at once.

The tool will omit declarations with a doc comment that includes
`@internal` or `@hide` from its output.

## Output format

These declarations summarize the structore of the returned values.
`gather` returns a `{[name: string]: Item}` object, listing all the
top-level exported items.

```typescript
export type BindingKind = "class" | "enum" | "enummember" | "interface" |
  "variable" | "property" | "method" | "typealias" | "typeparam" |
  "constructor" | "function" | "parameter" | "reexport"

export type Loc = {file: string, line: number, column: number}

export type Binding = {
  kind: BindingKind,
  id: string,
  description?: string,
  loc?: Loc,
  abstract?: boolean,
  readonly?: boolean,
  optional?: boolean
}

export type BindingType = {
  type: string,
  typeSource?: string, // missing means this is a built-in type
  typeParamSource?: string,
  properties?: {[name: string]: Item},
  instanceProperties?: {[name: string]: Item},
  typeArgs?: readonly BindingType[],
  typeParams?: readonly Param[],
  // Used by mapped types
  key?: Param,
  signatures?: readonly CallSignature[],
  extends?: BindingType,
  construct?: Item,
  implements?: readonly BindingType[]
}

export type CallSignature = {
  type: "function" | "constructor",
  params: readonly Param[],
  returns?: BindingType,
  typeParams?: readonly Param[]
}

export type Param = BindingType & {
  name?: string,
  id: string,
  kind: "parameter" | "typeparam",
  description?: string,
  loc?: Loc,
  optional?: boolean,
  rest?: boolean,
  default?: string
}

export type Item = Binding & BindingType
```

## License

This program is free software: you can redistribute it and/or modify
it under the terms of the MIT license. See `LICENSE` for a copy of the
license.

---
repo: egoist/typed-search
url: 'https://github.com/egoist/typed-search'
homepage: ''
starredAt: '2025-01-11T18:31:26Z'
createdAt: '2025-01-11T12:06:00Z'
updatedAt: '2025-02-05T02:26:25Z'
language: TypeScript
license: MIT
branch: main
stars: 61
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:17.040Z'
description: Super simple type-safe URLSearchParams parser.
tags: []
---

# typed-search

Super simple type-safe URLSearchParams parser.

```bash
npm i typed-search
```

## Usage

```ts
import { typedSearch } from "typed-search"

const query = typedSearch("a=1&b=2&c=3&arr=1&arr=2", {
  a: "string",
  b: "number",
  c: "boolean",
  arr: "number[]",
})

console.log(query)
// { a: "1", b: 2, c: true, arr: [1, 2] }
```

### Supported types

- `string`
- `number`
- `boolean`
- `string[]`
- `number[]`

### Does it support object?

i.e. Can you parse `?a.b.c=1` into `{ a: { b: { c: 1 } } }`?

Not yet, maybe not ever.

## License

MIT.

---
repo: harrysolovay/standard-json-schema
url: 'https://github.com/harrysolovay/standard-json-schema'
homepage: null
starredAt: '2025-03-19T19:42:41Z'
createdAt: '2025-03-19T16:59:04Z'
updatedAt: '2025-03-19T19:42:42Z'
language: TypeScript
license: Apache-2.0
branch: main
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-03-19T19:43:55.960Z'
description: Turn standard types into JSON schemas
tags: []
---

# Standard JSON Schema

> Turn standard types into JSON schemas

```ts
import { toJSONSchema } from "standard-json-schema"

await toJSONSchema(YourStandardType)
```

## Supported Standard Types

- [x] [zod](https://github.com/colinhacks/zod?tab=readme-ov-file)
- [x] [arktype](https://github.com/arktypeio/arktype)
- [x] [Effect Schema](https://github.com/Effect-TS/effect)
- [x] [typebox](https://github.com/sinclairzx81/typebox)
- [ ] [**request another library**](http://github.com/harrysolovay/standard-json-schema/issues/new)

## How?

Under the hood, `toJSONSchema` determines the standard type's vendor and
delegates to vendor-specific producers.

---

## **License**

Standard JSON Schema is [Apache-licensed](LICENSE).

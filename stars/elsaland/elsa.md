---
repo: elsaland/elsa
url: 'https://github.com/elsaland/elsa'
homepage: ''
starredAt: '2020-11-29T03:16:08Z'
createdAt: '2020-09-18T09:17:12Z'
updatedAt: '2025-02-17T18:57:56Z'
language: TypeScript
license: MIT
branch: master
stars: 2798
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:20.337Z'
description: ❄️ Elsa is a minimal runtime for JavaScript and TypeScript written in Go
tags:
  - elsa
  - go
  - javascript
  - quickjs
  - runtime
  - typescript
---

## Elsa

[![Discord invite][]][discord invite link]

<img align="right" src=assets/logo.svg height="120px">

Elsa is a _minimal_ JavaScript and TypeScript runtime written in Go. Built on top of quickjs and heavily inspired by Deno.

### Features

- URL imports.
- useful Web APIs.
- compiles TypeScript out of the box.
- bundling. `elsa bundle`
- compiling to native distributable binaries. `elsa compile`

```typescript
// hello.ts
import { hello } from "https://x.nest.land/arweave-hello@0.0.2/mod.ts";

hello("Elsa");
```

```shell
> elsa run hello.ts
Hello, Elsa
```

[build status - badge]: https://github.com/elsaland/elsa/workflows/Build/badge.svg
[build status]: https://github.com/elsaland/elsa/actions
[discord invite]: https://img.shields.io/discord/757562931725467709?color=697EC4&label=Discord&logo=discord&logoColor=FDFEFE&style=flat-square
[discord invite link]: https://discord.gg/Dw534ZY

---
repo: natemoo-re/goldmark
url: 'https://github.com/natemoo-re/goldmark'
homepage: 'https://deno.land/x/goldmark'
starredAt: '2022-02-21T23:56:20Z'
createdAt: '2021-09-18T15:08:18Z'
updatedAt: '2023-09-06T16:31:39Z'
language: JavaScript
license: NA
branch: main
stars: 19
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:16.141Z'
description: null
tags: []
---

# Goldmark

A very fast Markdown compiler for Deno 🦕

Powered by Go's [Goldmark](https://github.com/yuin/goldmark) compiled to WASM.

## Usage

### Basic Example

```ts
import { init, transform } from "https://deno.land/x/goldmark/mod.ts";

await init();
const markdown = await Deno.readTextFile(new URL('./content.md', import.meta.url));
const { frontmatter, content } = await transform(markdown, {
    render: {
        unsafeHTML: true
    },
    extensions: {
        GFM: true,
        typographer: true,
    }
})

console.log(frontmatter);
console.log(content);
```

## Configuration

Goldmark comes with many built-in extensions. See the [`types.ts`](https://github.com/natemoo-re/goldmark/blob/main/deno/types.ts) file for complete options.

## Performance

Runs come in well under `1ms` on average. See [`bench/mod.ts`](https://github.com/natemoo-re/goldmark/blob/main/bench/mod.ts).

Sampling **100,000** runs completed in `58s` with an average run of `0.57ms`.


---
repo: egoist/sitefetch
url: 'https://github.com/egoist/sitefetch'
homepage: null
starredAt: '2025-01-07T21:04:45Z'
createdAt: '2025-01-07T08:43:01Z'
updatedAt: '2025-02-25T15:43:15Z'
language: TypeScript
license: MIT
branch: main
stars: 1143
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:19.106Z'
description: Fetch an entire site and save it as a text file (to be used with AI models).
tags: []
---

# sitefetch

Fetch an entire site and save it as a text file (to be used with AI models).

![image](https://github.com/user-attachments/assets/e6877428-0e1c-444a-b7af-2fb21ded8814)

## Install

One-off usage (choose one of the followings):

```bash
bunx sitefetch
npx sitefetch
pnpx sitefetch
```

Install globally (choose one of the followings):

```bash
bun i -g sitefetch
npm i -g sitefetch
pnpm i -g sitefetch
```

## Usage

```bash
sitefetch https://egoist.dev -o site.txt

# or better concurrency
sitefetch https://egoist.dev -o site.txt --concurrency 10
```

### Match specific pages

Use the `-m, --match` flag to specify the pages you want to fetch:

```bash
sitefetch https://vite.dev -m "/blog/**" -m "/guide/**"
```

The match pattern is tested against the pathname of target pages, powered by micromatch, you can check out all the supported [matching features](https://github.com/micromatch/micromatch#matching-features).

### Content selector

We use [mozilla/readability](https://github.com/mozilla/readability) to extract readable content from the web page, but on some pages it might return irrelevant contents, in this case you can specify a CSS selector so we know where to find the readable content:

```sitefetch
sitefetch https://vite.dev --content-selector ".content"
```

## Plug

If you like this, please check out my LLM chat app: https://chatwise.app

## API

```ts
import { fetchSite } from "sitefetch"

await fetchSite("https://egoist.dev", {
  //...options
})
```

Check out options in [types.ts](./src/types.ts).

## License

MIT.

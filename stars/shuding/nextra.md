---
repo: shuding/nextra
url: 'https://github.com/shuding/nextra'
homepage: 'https://nextra.site'
starredAt: '2021-05-04T23:42:18Z'
createdAt: '2020-06-15T16:39:34Z'
updatedAt: '2025-02-25T14:17:09Z'
language: TypeScript
license: MIT
branch: main
stars: 12382
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:44.234Z'
description: >-
  Simple, powerful and flexible site generation framework with everything you
  love from Next.js.
tags:
  - markdown
  - mdx
  - nextjs
  - nextra
  - react
  - static-site-generator
---

# Nextra

Simple, powerful and flexible site generation framework with everything you love
from Next.js.

## Documentation

https://nextra.site

## Development

### Installation

The Nextra repository uses [PNPM Workspaces](https://pnpm.io/workspaces) and
[Turborepo](https://github.com/vercel/turborepo). To install dependencies, run
`pnpm install` in the project root directory.

### Build `nextra`

```bash
pnpm --filter nextra build
```

Watch mode: `pnpm --filter nextra dev`

### Build `nextra-theme-docs`

```bash
pnpm --filter nextra-theme-docs build
```

### Development

You can also debug them together with a website locally. For instance, to start
`examples/docs` locally, run

```bash
pnpm --filter example-docs dev
```

Any change to `example/docs` will be re-rendered instantly.

If you update the core or theme packages, a rebuild is required. Or you can use
the watch mode for both Nextra and the theme in separated terminals.

## Sponsors

<div>
 <a href="https://the-guild.dev/graphql/hive?utm_source=github&utm_campaign=nextra&utm_content=logolink">
   <img src="/docs/app/showcase/_logos/graphql-hive.png" alt="GraphQL Hive preview" width="256">
 </a>
 <a href="https://speakeasyapi.dev/docs?utm_source=github&utm_campaign=nextra&utm_content=logolink">
   <img src="/docs/app/showcase/_logos/speakeasy.png" alt="Speakeasy preview" width="256">
 </a>
 <a href="https://xyflow.com?utm_source=github&utm_campaign=nextra&utm_content=logolink">
   <img src="/docs/app/showcase/_logos/xyflow.jpg" alt="xyflow preview" width="256">
 </a>
</div>

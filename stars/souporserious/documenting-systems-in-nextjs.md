---
repo: souporserious/documenting-systems-in-nextjs
url: 'https://github.com/souporserious/documenting-systems-in-nextjs'
homepage: 'https://documenting-systems.vercel.app/'
starredAt: '2022-10-16T04:53:33Z'
createdAt: '2021-10-02T00:54:53Z'
updatedAt: '2024-12-25T11:44:00Z'
language: TypeScript
license: NA
branch: main
stars: 53
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:23.677Z'
description: Case study of how to build a documentation system in Next.js using TS Morph.
tags: []
---

# Documenting Systems In Next.js

This repo is an example of how to document a system of components, hooks, utilities, and themes in [Next.js](https://nextjs.org/) using [TS Morph](https://ts-morph.com/).

## Features

♻️ Fast Refresh for everything

📝 MDX for mixing Markdown and JSX

🤖 Component, hook, and utility doc generation

🎨 Theme and design token doc generation (Not implemented)

🖼 Server rendered live code examples

🕹 Playground powered by Monaco Editor with Go to Definition

🐇 Quick links to source code in development and production

🌈 CLI for easily adding new features

🔀 Theme, component, hook, and utility relationships (Not implemented)

📸 Screenshot diffing (Not implemented)

## Development

```bash
pnpm install
pnpm dev
```

This will start the development servers. One server handles gathering and caching the data while the other is a NextJS server that serves the site.

When debugging data gathering, you can use the `pnpm dev:data --debug` command to start the data server in debug mode.

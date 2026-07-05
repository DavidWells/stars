---
repo: lmammino/rental-station-static-api-demo
url: 'https://github.com/lmammino/rental-station-static-api-demo'
homepage: 'https://lmammino.github.io/rental-station-static-api-demo/'
starredAt: '2025-04-04T17:22:02Z'
createdAt: '2025-01-22T11:18:26Z'
updatedAt: '2025-04-04T17:22:03Z'
language: TypeScript
license: MIT
branch: main
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-04-12T22:30:06.936Z'
description: A simple demo to showcase the concept of static APIs (with full-text search!)
tags:
  - api
  - demo
  - static
  - static-ap
  - static-site
---

# rental-station-static-api-demo

This repo implements a simple demo that showcases how you can build a simple
static API which also supports full-text search.

It was designed as a companion demo for the presentation
[Static APIs, the Unsung Heroes](https://loige.link/static-a​) presented first at
[Coderful](https://www.coderful.io/) in 2025

You are recommended to have a look at [the slides](https://loige.link/static-a)
to get more context.

The demo is available live at
[lmammino.github.io/rental-station-static-api-demo](https://lmammino.github.io/rental-station-static-api-demo/)

## Run in to locally

You'll need a recent version of Node.js (e.g. 22) and `pnpm`

1. Clone this repo
2. Run `pnpm install`

### Run in dev mode

You can run the development server (with hot module reload on file change) with:

```bash
pnpm dev
```

### Run in prod mode

If you want to run in prod mode, you need to build the project first:

```bash
pnpm build
```

Then you can start a local preview web server with:

```bash
pnpm preview
```

> [!NOTE] If you are planning to deploy this project to GitHub pages (or some
> other environment that requires a _base path_), you need to specify the base
> path using the `BASE` environment variable during the build phase. For example
> with:
>
> ```bash
> BASE="/some-base-url/" pnpm build
> ```

## Contributing

Everyone is very welcome to contribute to this project. You can contribute just
by submitting bugs or suggesting improvements by
[opening an issue on GitHub](https://github.com/lmammino/financial/issues).

PRs are also welcome!

## License

Licensed under [MIT License](LICENSE). © Luciano Mammino.

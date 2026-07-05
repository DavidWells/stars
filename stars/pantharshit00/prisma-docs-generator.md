---
repo: pantharshit00/prisma-docs-generator
url: 'https://github.com/pantharshit00/prisma-docs-generator'
homepage: ''
starredAt: '2024-12-22T00:14:10Z'
createdAt: '2020-07-10T19:49:10Z'
updatedAt: '2025-02-21T01:00:58Z'
language: TypeScript
license: MIT
branch: master
stars: 598
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:53:37.919Z'
description: >-
  Prisma generator for automatically generating documentation reference from the
  Prisma schema.
tags:
  - code-generation
  - hacktoberfest
  - html
  - prisma
  - prisma-generator
  - prisma2
---

## Prisma Documentation Generator

Automatically generate a reference from your Prisma Schema. This package contains a prisma generator so reference will automatically update everytime you will run `prisma generate`

![screenshot](https://user-images.githubusercontent.com/22195362/89097596-edeadc00-d3fd-11ea-91ea-86d5d8076da0.png)

## Getting Started

1. Install this package using:

```shell
npm install -D prisma-docs-generator
```

2. Add the generator to the schema

```prisma
generator docs {
  provider = "node node_modules/prisma-docs-generator"
}
```

3. Run `npx prisma generate` to trigger the generator. This will create a `docs` folder in `prisma/docs`
4. Serve the docs using `npx prisma-docs-generator serve`

## Options

### Specifying Output

You can specify the out of the docs using the output property

```prisma
generator docs {
  provider = "node node_modules/prisma-docs-generator"
  output = "../../docs"
}
```

### includeRelationFields

You can specify whether relation fields are shown or not.
Default value is `true`.

```prisma
generator docs {
  provider = "node node_modules/prisma-docs-generator"
  includeRelationFields = false
}
```

## CLI

This package also ships with a CLI which is used to serve the docs right now. It has the following subcommands:

### `serve`

Serves the static html which the generator generated. It reads the output path from the prisma schema or it will use the default.
Use `--port` or `-p` to change the port the express server uses.

---

### License

MIT Harshit Pant

(This is not an official Prisma project. It is personally maintained by [me](https://github.com/pantharshit00) )

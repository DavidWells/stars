---
repo: HiDeoo/zod-matter
url: 'https://github.com/HiDeoo/zod-matter'
homepage: ''
starredAt: '2023-01-24T20:38:40Z'
createdAt: '2023-01-03T10:25:20Z'
updatedAt: '2024-09-02T20:09:50Z'
language: TypeScript
license: MIT
branch: main
stars: 23
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:57.398Z'
description: Typesafe front matter
tags:
  - front-matter
  - frontmatter
  - gray-matter
  - markdown
  - matter
  - mdx
  - runtime-validation
  - schema-validation
  - type-inference
  - typesafe
  - typescript
  - yaml
  - zod
---

<div align="center">
  <h1>zod-matter 🏷️</h1>
  <p>Typesafe front matter</p>
</div>

<div align="center">
  <a href="https://github.com/HiDeoo/zod-matter/actions/workflows/integration.yml">
    <img alt="Integration Status" src="https://github.com/HiDeoo/zod-matter/actions/workflows/integration.yml/badge.svg" />
  </a>
  <a href="https://github.com/HiDeoo/zod-matter/blob/main/LICENSE">
    <img alt="License" src="https://badgen.net/github/license/HiDeoo/zod-matter" />
  </a>
  <br />
</div>

## Features

zod-matter is a tiny wrapper for [gray-matter](https://github.com/jonschlinkert/gray-matter/) and [Zod](https://github.com/colinhacks/zod) to parse and validate front matter with [static type inference](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzmAhlAzgUzgXzgMyghDgCIAvCAEwFoQUYZMpSAoUSWROc3AokhWptWAYwgA7dPGASwAV3gBeOAAMaG1ikUALaAC44ACWAARTBAisqDTIYBMABnsBmGo4CM7gKysNNVlYAYmNMABswiDgAd2gwqgBCVlVA8Sl4QkkYAFkGJig4FVQMTAAKVjg4WQUYABoKngA6CAAjACtMURhShAbK7Rg9KENyRukoWQBzUoBKesrKmyYRxqWyub64UVtJ6ABPFfGp2eawGGBJFDDZ+dwZ1nvWTIkcvOZVhhRGgaGnohfcox3ksvms-llAfkPjAvtsmLsoHtAs9XkCoNCvlAUBIqMRWEA).

gray-matter is a great package to parse front matter but provides [no validation or type safety](https://github.com/jonschlinkert/gray-matter/issues/69#issuecomment-454978951). This package exposes an API adding a `schema` parameter to validate front matter data using Zod. This can be particularly useful to parse & validate front matter for user generated Markdown or MDX files for example.

## Installation

Install `zod-matter` and its peer dependencies with your favorite package manager, e.g.:

```shell
pnpm add zod-matter zod gray-matter
```

## Usage

### `parse`

Extracts and parses front matter according to the given Zod schema.

```ts
import { parse } from 'zod-matter'
import { z } from 'zod'

const { data } = parse('---\nauthor: HiDeoo\n---\n# Hello world!', z.object({ author: z.string() }))
//       ^? { author: string }
```

#### Parameters

- `input`: The string, buffer or object with a `content` property to parse.
- `schema`: The Zod schema to use to parse the front matter.
- `options`: Optionally, the [gray-matter options](https://github.com/jonschlinkert/gray-matter/tree/a5726b04f3167fadc764241deb545518c454eb82#options) to use.

#### Return value

A file object with the same properties of a [gray-matter file object](https://github.com/jonschlinkert/gray-matter/tree/a5726b04f3167fadc764241deb545518c454eb82#returned-object) but with a `data` property of the type inferred from the given Zod schema.

If the front matter data is invalid, a [`ZodError`](https://github.com/colinhacks/zod/tree/master#error-handling) will be thrown.

### `read`

Extracts and parses front matter from a file according to the given Zod schema.

```ts
import { read } from 'zod-matter'
import { z } from 'zod'

const { data } = read('./data/post.md', z.object({ author: z.string(), date: z.date() }))
//       ^? { author: string; date: Date }
```

#### Parameters

- `path`: The path to the file to read and parse.
- `schema`: The Zod schema to use to parse the front matter.
- `options`: Optionally, the [gray-matter options](https://github.com/jonschlinkert/gray-matter/tree/a5726b04f3167fadc764241deb545518c454eb82#options) to use.

#### Return value

A file object with the same properties of a [gray-matter file object](https://github.com/jonschlinkert/gray-matter/tree/a5726b04f3167fadc764241deb545518c454eb82#returned-object) but with a `data` property of the type inferred from the given Zod schema.

If the front matter data is invalid, a [`ZodError`](https://github.com/colinhacks/zod/tree/master#error-handling) will be thrown.

### `stringify`

Stringify an object to YAML or a specified language, and append it to the given string.

```ts
import { stringify } from 'zod-matter'
import { z } from 'zod'

const content = stringify('# Hello world!', { author: 'HiDeoo' })
//       ^? ---
//          author: HiDeoo
//          ---
//          # Hello world!
```

This function is [re-exported](https://github.com/jonschlinkert/gray-matter/tree/a5726b04f3167fadc764241deb545518c454eb82#stringify) for convenience from gray-matter with the same signature.

### `test`

Checks if the given string contains a front matter.

```ts
import { test } from 'zod-matter'
import { z } from 'zod'

const containsFrontMatter = test('---\nauthor: HiDeoo\n---\n# Hello world!')
//            ^? true
```

This function is [re-exported](https://github.com/jonschlinkert/gray-matter/tree/a5726b04f3167fadc764241deb545518c454eb82#test) for convenience from gray-matter with the same signature.

## License

Licensed under the MIT License, Copyright © HiDeoo.

See [LICENSE](https://github.com/HiDeoo/zod-matter/blob/main/LICENSE) for more information.

---
repo: remcohaszing/remark-mdx-frontmatter
url: 'https://github.com/remcohaszing/remark-mdx-frontmatter'
homepage: ''
starredAt: '2021-07-09T22:45:16Z'
createdAt: '2021-03-07T11:27:07Z'
updatedAt: '2025-02-25T12:26:24Z'
language: TypeScript
license: MIT
branch: main
stars: 110
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:51.292Z'
description: A remark plugin for converting frontmatter metadata into MDX exports
tags:
  - frontmatter
  - markdown
  - markdown-frontmatter
  - mdast
  - mdx
  - remark
  - remark-plugin
  - toml
  - unified
  - yaml
---

# remark-mdx-frontmatter

[![github actions](https://github.com/remcohaszing/remark-mdx-frontmatter/actions/workflows/ci.yaml/badge.svg)](https://github.com/remcohaszing/remark-mdx-frontmatter/actions/workflows/ci.yaml)
[![codecov](https://codecov.io/gh/remcohaszing/remark-mdx-frontmatter/branch/main/graph/badge.svg)](https://codecov.io/gh/remcohaszing/remark-mdx-frontmatter)
[![npm version](https://img.shields.io/npm/v/remark-mdx-frontmatter)](https://www.npmjs.com/package/remark-mdx-frontmatter)
[![npm downloads](https://img.shields.io/npm/dm/remark-mdx-frontmatter)](https://www.npmjs.com/package/remark-mdx-frontmatter)

A [remark](https://remark.js.org) plugin for converting frontmatter metadata into MDX exports

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
  - [Options](#options)
- [Compatibility](#compatibility)
- [License](#license)

## Installation

This package depends on the AST output by
[remark-frontmatter](https://github.com/remarkjs/remark-frontmatter)

```sh
npm install remark-frontmatter remark-mdx-frontmatter
```

## Usage

This remark plugin takes frontmatter content, and outputs it as JavaScript exports. Both YAML and
TOML frontmatter data are supported.

For example, given a file named `example.mdx` with the following contents:

```mdx
---
hello: frontmatter
---

Rest of document
```

The following script:

```js
import { readFile } from 'node:fs/promises'

import { compile } from '@mdx-js/mdx'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'

const { value } = await compile(await readFile('example.mdx'), {
  jsx: true,
  remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter]
})
console.log(value)
```

Roughly yields:

```jsx
export const frontmatter = {
  hello: 'frontmatter'
}

export default function MDXContent() {
  return <p>Rest of document</p>
}
```

## API

The default export is a [remark](https://remark.js.org) plugin.

### Options

- `name`: The identifier name of the variable the frontmatter data is assigned to. (Default:
  `frontmatter`).
- `parsers`: A mapping A mapping of node types to parsers. Each key represents a frontmatter node
  type. The value is a function that accepts the frontmatter data as a string, and returns the
  parsed data. By default `yaml` nodes will be parsed using [`yaml`](https://github.com/eemeli/yaml)
  and `toml` nodes using [`toml`](https://github.com/BinaryMuse/toml-node).

## Compatibility

This project is compatible with Node.js 18 or greater.

## License

[MIT](LICENSE.md) © [Remco Haszing](https://github.com/remcohaszing)

---
repo: souporserious/mdx-to-md
url: 'https://github.com/souporserious/mdx-to-md'
homepage: null
starredAt: '2022-04-23T16:30:27Z'
createdAt: '2022-04-22T03:50:44Z'
updatedAt: '2024-12-15T19:00:58Z'
language: TypeScript
license: NA
branch: main
stars: 54
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:47.682Z'
description: Convert MDX to Markdown.
tags: []
---

<!--- This markdown file was auto-generated from "src/README.mdx" -->

# mdx-to-md

Convert MDX to Markdown. 

## Why?

This library is most useful for generating README.md files [like the one you're reading](/packages/mdx-to-md/src/README.mdx).

# Install

```bash
yarn add mdx-to-md
```

```bash
npm install mdx-to-md
```

## CLI

```bash
mdx-to-md [sourcePath] [outPath]

```

In the simplest use case, you can run the CLI and it will output the converted Markdown relative to the current working directory the script was run in:

```bash
yarn mdx-to-md README.mdx

```

## Node

Start with MDX:

```mdx
import { name, description } from "./package.json"

# {name}

{description}

# Install

<pre>
  <code className="language-bash">yarn add {name}</code>
</pre>

```

And convert it to Markdown:

```ts
import { writeFile } from "fs/promises"
import { mdxToMd } from "mdx-to-md"

const markdown = await mdxToMd("README.mdx")
const banner = `This README was auto-generated using "yarn build:readme"`
const readme = `<!--- ${banner} --> \n\n ${markdown}`

await writeFile("README.md", readme)

console.log("📝 Converted README.mdx -> README.md")

```

Which outputs:

```md
# mdx-to-md

Convert MDX to Markdown.

# Install

yarn add mdx-to-md

```

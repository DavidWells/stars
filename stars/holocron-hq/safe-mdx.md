---
repo: holocron-hq/safe-mdx
url: 'https://github.com/holocron-hq/safe-mdx'
homepage: null
starredAt: '2023-11-29T02:35:42Z'
createdAt: '2023-11-27T15:46:25Z'
updatedAt: '2024-12-29T13:38:57Z'
language: TypeScript
license: NA
branch: main
stars: 61
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:42.833Z'
description: >-
  Safe MDX React renderer, does not evaluate javascript to render. Works in
  Cloudflare Workers & Vercel Edge.
tags: []
---

<div align='center'>
    <br/>
    <br/>
    <br/>
    <h3>safe-mdx</h3>
    <p>Render MDX in React without eval</p>
    <br/>
    <br/>
</div>

## Features

-   Render MDX without `eval` on the server, so you can render MDX in Cloudflare Workers and Vercel Edge
-   Works with React Server Components
-   Supports custom MDX components

## Why

The default MDX renderer uses `eval` (or `new Function(code)`) to render MDX components in the server. This is a security risk if the MdX code comes from untrusted sources and it's not allowed in some environments like Cloudflare Workers.

For example in an hypothetical platform similar to Notion, where users can write Markdown and publish it as a website, an user could be able to write MDX code that extracts secrets from the server in the SSR pass, using this library that is not possible. This is what happened with Mintlify platform in 2024.

Some use cases for this package are:

-   Render MDX in Cloudflare Workers and Vercel Edge
-   Safely render dynamically generated MDX code, like inside a ChatGPT like interface
-   Render user generated MDX, like in a multi-tenant SaaS app

<br>

## Install

```
npm i safe-mdx
```

## Usage

```tsx
import { SafeMdxRenderer } from 'safe-mdx'

const code = `
# Hello world

This is a paragraph

<Heading>Custom component</Heading>
`

export function Page() {
    return (
        <SafeMdxRenderer
            code={code}
            components={{
                // You can pass your own components here
                Heading({ children }) {
                    return <h1>{children}</h1>
                },
                p({ children }) {
                    return <p style={{ color: 'black' }}>{children}</p>
                },
                blockquote({ children }) {
                    return (
                        <blockquote style={{ color: 'black' }}>
                            {children}
                        </blockquote>
                    )
                },
            }}
        />
    )
}
```

## Change default MDX parser

If you want to use custom MDX plugins, you can pass your own MDX processed ast.

By default `safe-mdx` already has support for

-   frontmatter
-   gfm

```tsx
import { SafeMdxRenderer } from 'safe-mdx'
import { remark } from 'remark'
import remarkMdx from 'remark-mdx'

const code = `
# Hello world

This is a paragraph

<Heading>Custom component</Heading>
`

const parser = remark().use(remarkMdx)

const mdast = parser.parse(code)

export function Page() {
    return <SafeMdxRenderer code={code} mdast={mdast} />
}
```

## Reading the frontmatter

safe-mdx renderer ignores the frontmatter, to get its values you wil have to parse the MDX to mdast and read it there.

```tsx
import { SafeMdxRenderer } from 'safe-mdx'
import { remark } from 'remark'
import remarkFrontmatter from 'remark-frontmatter'
import { Yaml } from 'mdast'
import yaml from 'js-yaml'
import remarkMdx from 'remark-mdx'

const code = `
---
hello: 5
---

# Hello world
`

export function Page() {
    const parser = remark().use(remarkFrontmatter, ['yaml']).use(remarkMdx)

    const mdast = parser.parse(code)

    const yamlFrontmatter = mdast.children.find(
        (node) => node.type === 'yaml',
    ) as Yaml

    const parsedFrontmatter = yaml.load(yamlFrontmatter.value || '')

    console.log(parsedFrontmatter)
    return <SafeMdxRenderer code={code} mdast={mdast} />
}
```

## Handling errors

`safe-mdx` ignores missing components or expressions, to show a message to the user in case of these errors you can use `MdastToJsx` directly

```tsx
import { MdastToJsx } from 'safe-mdx'

export function Page() {
    const visitor = new MdastToJsx({ code, mdast, components })
    const jsx = visitor.run()

    if (visitor.errors.length) {
        // handle errors here, like showing a message to the user for missing components
    }

    return jsx
}
```

## Security

safe-mdx is designed to avoid server-side evaluation of untrusted MDX input.

However, it's important to note that safe-mdx does not provide protection against client-side vulnerabilities, such as Cross-Site Scripting (XSS) or script injection attacks. While safe-mdx itself does not perform any evaluation or rendering of user-provided content, the rendering library or components used in conjunction with safe-mdx may introduce security risks if not properly configured or sanitized.

This is ok if you render your MDX in isolation from each tenant, for example on different subdomains, this way an XSS attack cannot affect all tenants. If instead you render the MDX from different tenants on the same domain, one tenant could steal cookies set from other customers.

## Limitations

These features are not supported yet:

-   expressions with dynamic values or values defined with `export`
-   importing components or data from other files

To overcome these limitations you can define custom logic in your components and pass them to `SafeMdxRenderer`. This will also make your MDX files cleaner and easier to read.

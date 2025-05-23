---
repo: jxnblk/ok-mdx
url: 'https://github.com/jxnblk/ok-mdx'
homepage: 'https://jxnblk.com/ok-mdx/'
starredAt: '2018-12-17T23:55:50Z'
createdAt: '2018-07-17T18:04:31Z'
updatedAt: '2024-12-18T03:49:26Z'
language: JavaScript
license: NA
branch: master
stars: 765
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:52.719Z'
description: Browser-based MDX editor
tags:
  - cli
  - development
  - jsx
  - markdown
  - mdx
  - prototyping
  - react
---


# ok-mdx

<img src='docs/ok-mdx.gif' />

Browser-based [MDX][] editor

```sh
npm i -g ok-mdx
```

```sh
mkdir docs
touch docs/hello.mdx
mdx docs --open
```

- Quickly prototype with React components
- Zero configuration
- Mix markdown with JSX
- Live edit and autosave

## What is this for?

MDX is great for documentation, building demos, or quickly prototyping with React components,
without the need to set up a full-blown React application.
Similar to [Compositor x0][x0], ok-mdx is meant to be installed as a global command line utility
that you can use alongside your application setup or in isolated sandbox environments.
ok-mdx works well as a local alternative to tools like [CodeSandbox][] when working with React components.

## Getting Started

ok-mdx needs a directory of `.mdx` or `.md` files to work.

After installing ok-mdx, create a folder and an empty `.mdx` file with the following command:

```sh
mkdir docs && touch docs/hello.mdx
```

Start the ok-mdx app:

```sh
mdx docs --open
```

This will open the application in your default browser, showing a list of the MDX files.
Click on a filename to open the editor view.
In the right panel, add some text to see the preview on the left.

### MDX Format

MDX is a superset of [markdown][], which can also render [JSX][] instead of HTML.

```mdx
# Markdown Heading

<button className='blue'>JSX button</button>
```

### Importing Components

In order to import components, be sure they're installed locally.
This requires a `package.json` file in your current directory.

To create a `package.json` file, run `npm init -y`.

To install a component, use `npm install`. The following will install [grid-styled][] and [styled-components][] as a local dependency.

```sh
npm i grid-styled styled-components
```

To use components, import them at the top of your MDX file:

```mdx
import { Flex, Box } from 'grid-styled'

# Hello

<Flex alignItems='center'>
  <Box p={3} width={1/2} bg='blue'>
    Flex
  </Box>
  <Box p={3} width={1/2}>
    Box
  </Box>
</Flex>
```

## Options

```
-o --open     Opens development server in default browser
-p --port     Port for development server
--vim         Enable editor Vim mode
```

### Exporting

ok-mdx is only meant to be used for development. To export your MDX files, consider one of the following tools:

- [Compositor x0][x0]: great for creating documentation, blogs, static sites, or other small demos
- [Next.js][next.js]: great for creating production-ready, server-side rendered React applications

## Related

- [mdx-go][]
- [mdx-deck][]
- [Compositor x0][x0]
- [Compositor Iso][iso]
- [MDX][]
- [CodeSandbox][]

[mdx-go]: https://github.com/jxnblk/mdx-go
[mdx-deck]: https://github.com/jxnblk/mdx-deck
[x0]: https://github.com/c8r/x0
[iso]: https://compositor.io/iso
[MDX]: https://github.com/mdx-js/mdx
[CodeSandbox]: https://codesandbox.io
[markdown]: https://daringfireball.net/projects/markdown/syntax
[JSX]: https://facebook.github.io/jsx/
[grid-styled]: https://github.com/jxnblk/grid-styled
[styled-components]: https://github.com/styled-components/styled-components
[next.js]: https://github.com/zeit/next.js

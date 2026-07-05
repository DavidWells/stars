---
repo: remorses/mini-graphiql-playground
url: 'https://github.com/remorses/mini-graphiql-playground'
homepage: ''
starredAt: '2021-11-21T06:44:28Z'
createdAt: '2020-03-25T22:02:34Z'
updatedAt: '2024-12-20T03:35:25Z'
language: JavaScript
license: NA
branch: master
stars: 37
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:37.516Z'
description: Graphiql playground for documentation websites
tags: []
---

<div align='center'>
    <br/>
    <h1>mini graphiql</h1>
    <br/>
    <br/>
    <img src='https://media.giphy.com/media/Ih0HNPjRlo8OosdzGl/source.gif'>
    <br/>
</div>

## Install

```
yarn add mini-graphiql
```

## Usage in mdx

```mdx
---
route: /docs/pagination
title: pagination
---
import { MiniGraphiQL } from 'mini-graphiql'
import 'mini-graphiql/dist/style.css'
export const query1 = `
{
    continents {
      code
      name
    }
}
`
## Paging forward

You page forward using forst and after arguments.

<MiniGraphiQL url='https://countries.trevorblades.com' query={query1} />

```

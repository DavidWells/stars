---
repo: mmuller88/alps-unified-ts
url: 'https://github.com/mmuller88/alps-unified-ts'
homepage: null
starredAt: '2021-08-08T23:41:39Z'
createdAt: '2020-12-04T09:02:59Z'
updatedAt: '2021-08-09T03:18:39Z'
language: TypeScript
license: Apache-2.0
branch: master
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:48.422Z'
description: null
tags: []
---

[![NPM version](https://badge.fury.io/js/alps-unified-ts.svg)](https://badge.fury.io/js/alps-unified-ts)
[![PyPI version](https://badge.fury.io/py/alps-unified-ts.svg)](https://badge.fury.io/py/alps-unified-ts)
[![Maven Central](https://maven-badges.herokuapp.com/maven-central/com.github.mmuller88/alps-unified-ts/badge.svg)](https://maven-badges.herokuapp.com/maven-central/com.github.mmuller88/alps-unified-ts)
[![.NET version](https://img.shields.io/nuget/v/com.github.mmuller88.AlpsUnifiedTs.svg?style=flat-square)](https://www.nuget.org/packages/com.github.mmuller88.AlpsUnifiedTs/)
![Release](https://github.com/mmuller88/alps-unified-ts/workflows/Release/badge.svg)

# alps-unified-ts

That is an enhanced TypeScript library of [alps-unified](https://github.com/mamund/alps-unified). With it you can convert an ALPS API spec to other API spec like openApi, Graph QL Schema.

Very useful to understand the idea of ALPS API is this video on YT: https://www.youtube.com/watch?v=oG6-r3UdenE

Want to know more about ALPS? --> please visit:

- http://alps.io/
- https://github.com/alps-io/
- https://github.com/mamund/alps-unified

# Features

- generating and publishing alps unified libraries for JavaScript, TypeScript, Python, Java and .NET
- Type support for ALPS specs (see example 'Create from Spec' down below)

# Examples

## Load from YAML file

You can load the ALPS spec directly from a YAML file. JSON ist atm not supported.

### Convert to OpenApi

```ts
Alps.unified(Alps.loadYaml('test/todo-alps.yaml'), {
  formatType: FormatType.OPENAPI,
});
```

### Convert to GraphQL Schema

```ts
Alps.unified(Alps.loadYaml('test/todo-alps.yaml'), {
  formatType: FormatType.SDL,
});
```

## Create from Spec

Creating the API specification from the spec is very powerful. As it gives you much support in an idea like VS as it is typed and documented. So you alway produce valid API specs.

```ts
Alps.unified(
  Alps.spec({
    alps: {
      version: '1.0',
      doc: {
        value: 'Simple Todo list example',
      },
      ext: [
        {
          type: 'metadata',
          name: 'title',
          value: 'simpleTodo',
          tags: 'oas',
        },
        {
          type: 'metadata',
          name: 'root',
          value: 'http://api.example.org/todo',
          tags: 'oas',
        },
      ],
      descriptor: [
        {
          id: 'id',
          type: 'semantic',
          text: 'storage id of todo item',
        },
      ],
    },
  }),
);
```

For Python to benefit from the types better do this:

```python
import alps_unified_ts as alps

alps_def = alps.AlpsDef(
    version='1.0',
    descriptor=[alps.DescriptorDef(id="id", type="semantic", text="sotrage id of todo item")],
    doc=alps.DocDef(
        value="Simple Todo list example"),
        ext=[
            alps.ExtDef(
                name="root",
                tags="oas",
                type="metadata",
                value="http://api.example.org/todo"),
            alps.ExtDef(
                name="title",
                tags="oas",
                type="metadata",
                value="simpleTodo")])

alps.Alps.unified(alps_document=alps.Alps.spec(alps=alps_def), format_type=alps.FormatType.OPENAPI)
```

# Thanks to

- The AWS CDK Community for the repo tool [projen](https://github.com/projen/projen) which I use for this repo.

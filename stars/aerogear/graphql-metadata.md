---
repo: aerogear/graphql-metadata
url: 'https://github.com/aerogear/graphql-metadata'
homepage: ''
starredAt: '2020-08-28T14:56:20Z'
createdAt: '2020-01-17T12:23:08Z'
updatedAt: '2023-04-17T15:12:53Z'
language: TypeScript
license: MIT
branch: master
stars: 28
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:37.820Z'
description: Annotate your graphql schema with lightweight directives
tags:
  - annotations
  - graphql
  - graphql-schema
  - hacktoberfest
---

# graphql-metadata

Attach metadata to your GraphQL schema using directive like syntax. 

Library supoports following formats:

- (**DEPRECATED**) Annotations: Group of elements with common namespace. For example `@db.length: 200`
- Marker: Single instance (key) with multiple values. For example `@db length:200`
- Metadata: Directive-like config. For example `@db(length: 200, columns: ['id', 'name'])`

## Installation

```bash
npm i graphql-metadata
```

## Usage

### Marker parsing

Markers using different syntax for elements that do not support grouping.
For example `@marker true` etc.

Usage: 
```js
const result = parseMarker('db', `
  This is a description
  @db length:200, unique: true 
`)
```

No value usage:

```js
const result = parseMarker('db', `
  This is a description
  @db
`)
```

### Metadata parsing

Metadata uses the same syntax as GraphQL directives.

Usage: 

```js
const field: GraphQLField<any,any> = {
  ...,
  description: `@db(length:200, 
      unique: true, 
      columns: ['id', 'name']
      description: 'Some description'
    )`
}
const result = parseMetadata('db', field)

// Returns:
{
  length:200, 
  unique: true, 
  columns: ['id', 'name']
  description: 'Some description'
}
```

No value usage:

```js
const field: GraphQLField<any,any> = {
  ...,
  description: '@db',
}
const result = parseMetadata('db', field)

// Returns true
```

Or with a string:

```js
const result = parseMetadata('db', '@db(name: "users")')
```

### [DEPRECATED] Annotations parsing

Here is a very basic example with a `namespace` (here `'db'`) and a `description` that needs to be parsed:

```js
const { parseAnnotations } = require('graphql-metadata')

const result = parseAnnotations('db', `
  This is a description
  @db.length: 200
  @db.foo: 'bar'
  @db.unique
  @db.index: { name: 'foo', type: 'string' }
`)

console.log(result)
```

This will output an object containing the annotations:

```js
{
  length: 200,
  foo: 'bar',
  unique: true,
  index: { name: 'foo', type: 'string' }
}
```

In a GraphQL schema, you can use the `description` property on `GraphQLObjectType`, `GraphQLField`...

```js
const { parseAnnotations } = require('graphql-metadata')
const { buildSchema, isObjectType } = require('graphql')

const schema = buildSchema(`
  """
  @db.table: 'users'
  """
  type User {
    """
    @db.primary
    """
    id: ID!
  }
`)

const typeMap = schema.getTypeMap()
for (const key in typeMap) {
  const type = typeMap[key]
  // Tables
  if (isObjectType(type)) {
    const typeAnnotations = parseAnnotations('db', type.description)
    console.log(type.name, typeAnnotations)
    const fields = type.getFields()
    for (const key in fields) {
      const field = fields[key]
      const fieldAnnotations = parseAnnotations('db', field.description)
      console.log(field.name, fieldAnnotations)
    }
  }
}
```

Which will output:

```js
User { table: 'users' }
id { primary: true }
```


### Strip annotations

Sometimes it will be helpful to strip the annotations from the description. For example, you may not want to display them in a GraphQL schema explorer.

```js
const { stripAnnotations } = require('graphql-metadata')

const result = stripAnnotations('db', `
  This is a description
  @db.length: 200
  @db.foo: 'bar'
  @db.unique
  @db.index: { name: 'foo', type: 'string' }
`)

console.log(result)
```

The result will be:

```js
`
  This is a description
`
```

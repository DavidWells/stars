---
repo: n3ps/json-schema-to-jsdoc
url: 'https://github.com/n3ps/json-schema-to-jsdoc'
homepage: 'https://francisn.com/json-schema-to-jsdoc/'
starredAt: '2021-11-12T20:03:21Z'
createdAt: '2017-04-05T23:24:51Z'
updatedAt: '2024-07-05T08:58:30Z'
language: JavaScript
license: ISC
branch: master
stars: 30
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:39.330Z'
description: Generate JSDoc from JSON Schema
tags:
  - jsdoc
  - json-schema
---

[![npm version](https://img.shields.io/npm/v/json-schema-to-jsdoc.svg)](https://www.npmjs.com/package/json-schema-to-jsdoc)
[![Build Status](https://github.com/n3ps/json-schema-to-jsdoc/actions/workflows/node.js.yml/badge.svg)](github.com/n3ps/json-schema-to-jsdoc/actions/workflows/node.js.yml/badge.svg)

[![Known Vulnerabilities](https://snyk.io/test/github/n3ps/json-schema-to-jsdoc/badge.svg)](https://snyk.io/test/github/n3ps/json-schema-to-jsdoc)
[![Total Alerts](https://img.shields.io/lgtm/alerts/g/n3ps/json-schema-to-jsdoc.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/n3ps/json-schema-to-jsdoc/alerts)
[![Code Quality: Javascript](https://img.shields.io/lgtm/grade/javascript/g/n3ps/json-schema-to-jsdoc.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/n3ps/json-schema-to-jsdoc/context:javascript)

# JSON Schema to JSDoc

Useful when you already have a JSON Schema and want to document the types you want to validate. Works with subschema definitions.

## Usage

```js
const jsdoc = require('json-schema-to-jsdoc')

const schema = {
  "title": "Person",
  "type": "object",
  "properties": {
    "name": {"type": "string", "description": "A person's name"},
    "age": {"type": "integer", "description": "A person's age"}
  },
  "required": ["name"]
}

jsdoc(schema /* , optionsObject */)
```

### Output

```js
/**
 * @typedef {object} Person
 * @property {string} name A person's name
 * @property {integer} [age] A person's age
 */
```

## Examples

#### `hyphenatedDescriptions`

```js
jsdoc(schema, {
    hyphenatedDescriptions: true
})
```

```js
/**
 * @typedef {object} Person
 * @property {string} name - A person's name
 * @property {integer} [age] - A person's age
 */
```

#### `autoDescribe`

```js
jsdoc(schema, {
    autoDescribe: true
})
```

```js
/**
 * Represents a Person object
 * @typedef {object} Person
 * @property {string} name A person's name
 * @property {integer} [age] A person's age
 */
```

#### `types`

```js
jsdoc(schema, {
    types: {
      object: 'PlainObject'
    }
})
```

```js
/**
 * @typedef {PlainObject} Person
 * @property {string} name A person's name
 * @property {integer} [age] A person's age
 */
```

#### `formats`

```js
const schema = {
  title: 'Info',
  type: 'object',
  properties: {
    code: {
      type: 'string', format: 'html', description: 'The HTML source'
    }
  },
  required: ['code']
}

jsdoc(schema, {
    formats: {
      html: {
        string: 'HTML'
      }
    }
})
```

```js
/**
 * @typedef {object} Info
 * @property {HTML} code The HTML source
 */
```

## Options

`addDescriptionLineBreak`: boolean  
Inserts an empty line when `autoDescribe` is `false` and the schema 
`description` is empty. Defaults to `false`.

`autoDescribe`: boolean  
Adds a description (`"Represents a/n [<title> ]<type>"`) when the 
schema has no `description`. Defaults to `false`.

`capitalizeProperty`: boolean  
When `propertyNameAsType` is `true`, capitalizes the property-as-type, 
i.e., `MyTitle` in `@property {MyTitle} myTitle`. Defaults to `false.`

`capitalizeTitle`: boolean  
If a schema `title` is present, capitalizes the schema's `title` in the 
output of `@typedef {myType} title`. Defaults to `false`.

`defaultPropertyType`: null | string  
Used when no schema type is present. Defaults to `"*"`.
  - `string`: If set to a string, that string will be used (e.g., 
    "any", "JSON", "external:JSON"). Note that jsdoc recommends `*` for 
    any, while TypeScript uses "any". If one defines one's own "JSON" 
    type, one could use that to clarify that only JSON types are used. 
  - `null`: Will avoid any type brackets or type being added. 

`descriptionPlaceholder`: boolean  
If `false` and there is no `description` for the object `@property`, 
this will avoid a hyphen or even a space for `{description}` within 
`@property {name}{description}`. Defaults to `false`.

`hyphenatedDescriptions`: boolean  
Inserts a hyphen + space in the `{description}` portion of 
`@property {name}{description}` (will add a space, however, unless 
`descriptionPlaceholder` is `false`). Defaults to `false`.

`ignore`: string[]  
Property names to ignore adding to output. Defaults to empty array.

`indent`: number  
How many of `indentChar` to precede each line. Defaults to `0` (no 
indent). Note that a single space will be added in addition to the 
indent for every line of the document block after the first.

`indentChar`: string  
Character to use when `indent` is set (e.g., a tab or space). 
Defaults to a space.

`maxLength`: number | boolean  
  - `number`: Enforce a maximum length in `@typedef` and `@property` 
    descriptions (taking into account `indent`/`indentChar`). 
  - `false`: Prevent wrapping entirely. Defaults to `false`.

`objectTagName`: string  
Tag name to use for objects. Defaults to `typedef`.

`propertyNameAsType`: boolean   
Indicates that the property name (for objects) should be used as the 
type name (optionally capitalized with `capitalizeProperty`). Defaults 
to `false`.

`types`: null | {[schemaType: string]: string}  
Used to determine output of curly-bracketed type content within 
`@typedef {...}`. 
If `null` no curly brackets or type content will be shown with the 
`@typedef` at all. If the schema `type` matches a property in the object map, and it maps to the empty string, an empty `{}` will result. Otherwise, if there is a `type` match, that string will be used as the curly bracketed type, or if there is no match, the schema's `type` will be used for the bracketed content. Defaults to an empty object map (will always just use the schema's `type`). This property may be used to change the likes of `@typedef {object}` to `@typedef {PlainObject}`.

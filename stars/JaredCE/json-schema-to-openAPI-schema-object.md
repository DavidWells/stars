---
repo: JaredCE/json-schema-to-openAPI-schema-object
url: 'https://github.com/JaredCE/json-schema-to-openAPI-schema-object'
homepage: null
starredAt: '2025-05-17T21:27:15Z'
createdAt: '2022-05-21T11:27:17Z'
updatedAt: '2025-05-17T21:27:16Z'
language: JavaScript
license: Apache-2.0
branch: main
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-05-17T22:30:16.196Z'
description: Converts a standard JSON Schema to a compatible Open API v3 Schema Object
tags: []
---

<p>
  <a href="https://www.npmjs.com/package/json-schema-for-openapi">
    <img src="https://img.shields.io/npm/v/json-schema-for-openapi.svg?style=flat-square">
  </a>
  <a href="https://github.com/JaredCE/json-schema-to-openAPI-schema-object/actions/workflows/node.js.yml">
    <img src="https://github.com/JaredCE/json-schema-to-openAPI-schema-object/actions/workflows/node.js.yml/badge.svg">
  </a>
</p>

# json-schema-for-openapi

Converts a standard [JSON Schema](https://json-schema.org/understanding-json-schema/index.html) to a compatible [OpenAPI v3.0.X Schema Object](https://spec.openapis.org/oas/v3.0.3#schema-object).

As of version 0.3.0, it is now advised to run a schema through a de-referencer like: https://apitools.dev/json-schema-ref-parser/ to properly deal with `$ref`. I have removed my own poor implementation of de-referencing JSON schemas since there are libraries that can do it better than I can.

It should be noted, that de-referencing libraries have their own issues and might not be able to properly parse your JSON/output a schema you might expect. Due to the way OpenAPI v3.0.X Schema Object's are handled, should the referencing not be 100% correct you might face issues using this library and its output to be used with OpenAPI 3.0.X.

## Conversions

This attempts to massage the standard JSON Schema to a compatible OpenAPI v3.0.X Schema Object. There are many properties that are not supported by OpenAPI v3.0.X Schema Object, though have now been supported by [OpenAPI v3.1.X](https://spec.openapis.org/oas/v3.1.0#schema-object). This library should only be used if working with OpenAPI v3.0.X.

### Items as an Array to Object

This will convert a schema of:

```json
{
  "type": "object",
  "properties": {
    "example": {
      "type": "array",
      "items": [
        {
          "type": "string"
        }
      ]
    }
  }
}
```

To:

```json
{
  "type": "object",
  "properties": {
    "example": {
      "type": "array",
      "items": {
        "type": "string"
      }
    }
  }
}
```

At the moment, this library cannot handle more than one item in the array, and so will default to using the first item only.

### Types in an array to OneOf

This will convert a schema of:

```json
{
  "type": "object",
  "properties": {
    "example": {
      "type": ["string", "number"]
    }
  }
}
```

To:

```json
{
  "type": "object",
  "properties": {
    "example": {
      "oneOf": [
        {
          "type": "string"
        },
        {
          "type": "number"
        }
      ]
    }
  }
}
```

Where an array contains `null`, it will now set `nullable` against all types:

```json
{
  "type": "object",
  "properties": {
    "example": {
      "type": ["string", "number", "null"]
    }
  }
}
```

To:

```json
{
  "type": "object",
  "properties": {
    "example": {
      "oneOf": [
        {
          "type": "string",
          "nullable": true
        },
        {
          "type": "number",
          "nullable": true
        }
      ]
    }
  }
}
```

### Const to enum

This will convert a schema of:

```json
{
  "type": "object",
  "properties": {
    "example": {
      "type": "string",
      "const": "Surburbia"
    }
  }
}
```

To:

```json
{
  "type": "object",
  "properties": {
    "example": {
      "type": "string",
      "enum": ["Surburbia"]
    }
  }
}
```

### null types

OpenAPI 3.0.X does not allow for null as a type, so will convert a schema of:

```json
{
  "type": "object",
  "properties": {
    "example": {
      "type": "null"
    }
  }
}
```

To:

```json
{
  "type": "object",
  "properties": {
    "example": {
      "nullable": true
    }
  }
}
```

### Default to their type

This will convert the `"default":` value to the relevant type. A String to a String, a Number/Integer to a number/Integer, a Boolean to a Boolean and try to manipulate an Object or an Array to either an Object or an Array

### Dependencies, DependentRequired, DependentSchemas

This will try to convert `"dependencies":`, `"dependentRequired":` and `"dependentSchemas":` to a valid `"allOf"` in the case of a `"dependentSchemas"` or an `"anyOf":` schema in the case of a `"dependentRequired"`.

### If/Then/Else

It will try to convert an If/Then/Else schema statement to a valid `"OneOf"` schema.

## Installation and Usage:

Install via npm: `npm install json-schema-for-openapi`.

And use as a Factory like:

```js
const ConvertorFactory = require("json-schema-for-openapi");
const jsonSchema = {
  $schema: "http://json-schema.org/draft-04/schema#",
  title: "JSON API Schema",
  description:
    "This is a schema for responses in the JSON API format. For more, see http://jsonapi.org",
  type: "object",
  properties: {
    errors: {
      type: "object",
    },
  },
};
const convertedSchema = ConvertorFactory.convert(jsonSchema, "main");
```

which will output:

```json
{
  "schemas": {
    "main": {
      "title": "JSON API Schema",
      "description": "This is a schema for responses in the JSON API format. For more, see http://jsonapi.org",
      "type": "object",
      "properties": {
        "errors": {
          "type": "object"
        }
      }
    }
  }
}
```

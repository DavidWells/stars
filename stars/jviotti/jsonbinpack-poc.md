---
repo: jviotti/jsonbinpack-poc
url: 'https://github.com/jviotti/jsonbinpack-poc'
homepage: 'https://www.jsonbinpack.org'
starredAt: '2025-01-25T06:10:35Z'
createdAt: '2021-02-19T15:08:34Z'
updatedAt: '2025-01-25T06:10:35Z'
language: TypeScript
license: Apache-2.0
branch: main
stars: 23
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:10.212Z'
description: >-
  This is a PoC. See https://github.com/sourcemeta/jsonbinpack for the
  production implementation.
tags:
  - binary
  - deserialization
  - json
  - json-schema
  - jsonschema
  - serialization
  - space-efficiency
---

[![GitHub Actions](https://github.com/jviotti/jsonbinpack/actions/workflows/nodejs.yml/badge.svg?branch=main)](https://github.com/jviotti/jsonbinpack/actions/workflows/nodejs.yml)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

JSON BinPack
============

JSON BinPack is an open-source binary [JSON](https://www.json.org)
serialization format with a strong focus on space efficiency. It can run in
schema-driven and schema-less mode to encode any JSON document given a matching
[JSON Schema 2020-12](http://json-schema.org) definition.

***

**NOTE! This is a prototype pre-production JavaScript-based implementation to prove the
feasability of the approach. See https://github.com/sourcemeta/jsonbinpack for the work-in-progress C++
implementation.**

***

Documentation
-------------

### Installation

```sh
npm install --save jsonbinpack
```

### Example

```javascript
const jsonbinpack = require('jsonbinpack')

// Declare a JSON Schema definition
const schema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    foo: { type: 'string' }
  }
}

// (1) Compile the JSON Schema definition into an Encoding schema
const encodingSchema = await jsonbinpack.compileSchema(schema)

// (2) Serialize a matching JSON document using the Encoding schema
const buffer = jsonbinpack.serialize(encodingSchema, {
  foo: 'bar'
})

// (3) Deserialize the buffer into the original JSON document
const result = jsonbinpack.deserialize(encodingSchema, buffer)

console.log(result)
> { foo: 'bar' }
```

### Reference

#### `jsonbinpack.compileSchema(JSON Schema): Promise<Encoding>`

Convert a JSON Schema definition into an Encoding schema for use with the
`.serialize()` and `.deserialize()` functions.

#### `jsonbinpack.serialize(Encoding, JSON): Buffer`

Serialize a JSON value according to an Encoding schema.

#### `jsonbinpack.deserialize(Encoding, Buffer): JSON`

Deserialize a buffer according to an Encoding schema.

Building from source
--------------------

Requirements:

- Node.js
- `npm`
- GNU Make

Installing dependencies:

```sh
npm install
```

Compiling the project:

```sh
make
# Run tests
make test
# Run linter
make lint
```

License
-------

This project is released under the terms specified in the
[license](https://github.com/jviotti/jsonbinpack/blob/main/LICENSE).

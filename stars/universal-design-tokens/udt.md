---
repo: universal-design-tokens/udt
url: 'https://github.com/universal-design-tokens/udt'
homepage: 'https://udt.design/'
starredAt: '2020-09-02T02:08:39Z'
createdAt: '2018-01-05T10:12:07Z'
updatedAt: '2025-02-22T00:55:37Z'
language: TypeScript
license: ISC
branch: main
stars: 158
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:37.196Z'
description: >-
  Universal Design Tokens (UDT) is a collection of libraries and utilities for
  working with DTCG design tokens files.
tags:
  - design-systems
  - design-tokens
  - dtcg
  - parser
  - serializer
---

![UDT logo](http://udt.design/udt-logo.svg)

# Universal Design Tokens (UDT)

Universal Design Tokens (UDT) is a collection of libraries and utilities for working with [DTCG design tokens files](https://tr.designtokens.org/format/).

<!-- TOC updateonsave:true depthfrom:2 -->

- [Packages](#packages)
  - [Core](#core)
  - [CLI tools](#cli-tools)
  - [Other](#other)
- [Development](#development)
  - [Pre-requisites](#pre-requisites)
  - [Initial setup](#initial-setup)
  - [Build](#build)
  - [Testing](#testing)

<!-- /TOC -->

## Packages

This is a monorepo containing the source code for several UDT packages

### Core

- [**`@udt/tom`**](./packages/tom): A Token Object Model (TOM) library for creating and manipulating design tokens which is aligned to the DTCG file format.
- [**`@udt/dtcg-parser`**](./packages/dtcg-parser): A library for parsing DTCG design token files to a Token Object Model (TOM) representation.
- [**`@udt/dtcg-serializer`**](./packages/dtcg-serializer): A library for serializing Token Object Models (TOM) to DTCG design token files.
- [**`@udt/parser-utils`**](./packages/parser-utils): Low-level logic and utilities for parsing DTCG and DTCG-like files.

### CLI tools

- [**@udt/dtcg2csv**](./packages/dtcg2csv/): A CLI tool that can parse DTCG design token files and output information about the design tokens as a CSV file.

### Other

- [**UDT Demos**](./packages/demos): Demo scripts to showcase how the core UDT libraries can be used.

## Development

### Pre-requisites

- Node >= 16
- NPM >= 8

### Initial setup

After cloning the repo or if package dependencies have been changed since you last did this, you need to run the following from the root of the monorepo:

```
npm install
npm run bootstrap
```

### Build

To build all the packages, run the following from the root of the monorepo:

```
npm run build
```

After an initial build, you can run the following to watch for changes to the code and automatically rebuild modules and packages as needed:

```
npm run watch
```

### Testing

Run:

```
npm run test
```

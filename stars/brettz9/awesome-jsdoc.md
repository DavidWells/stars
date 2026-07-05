---
repo: brettz9/awesome-jsdoc
url: 'https://github.com/brettz9/awesome-jsdoc'
homepage: ''
starredAt: '2021-11-12T20:00:36Z'
createdAt: '2020-05-29T02:36:24Z'
updatedAt: '2025-02-25T08:50:49Z'
language: null
license: MIT
branch: main
stars: 28
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:39.372Z'
description: 'A list of awesome jsdoc tools, resources, etc.'
tags:
  - awesome
  - awesome-list
  - jsdoc
---

# Awesome JSDoc [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

A list of awesome JSDoc <sub><sup>([GitHub](https://github.com/jsdoc/jsdoc))</sup></sub> plugins, resources, etc.

## Contents

- [Formatting](#formatting)
- [Learning](#learning)
- [Documentation](#documentation)
- [Articles](#articles)
- [Linting](#linting)
- [Markdown](#markdown)
- [Parsing and Stringifying](#parsing-and-stringifying)
  - [Type parsing](#type-parsing)
- [Schema usage](#schema-usage)
- [Type checking](#type-checking)
- [Visualizations](#visualizations)

## Formatting

- [eslint-plugin-isaacscript](https://github.com/IsaacScript/isaacscript/blob/main/packages/eslint-plugin-isaacscript/docs/rules/format-jsdoc-comments.md) - Format JSDoc comments

## Learning

- [jsdoc](https://jsdoc.app/) - Site creating original standard and a documentation tool.
- [TypeScript docs on jsdoc](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html) - Supported JSDoc in TypeScript (TypeScript-flavor JSDoc); note especially the need for parentheses around casts!
- [TypeScript docs for working with JavaScript files](https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html) - Reference on working with plain JavaScript files to convert to declaration files (*.d.ts).
- [Closure on tags](https://github.com/google/closure-compiler/wiki/Annotating-JavaScript-for-the-Closure-Compiler#define-type-description) - Closure's reference on its JSDoc tag usage.
- [Closure on types](https://github.com/google/closure-compiler/wiki/Annotating-Types) - Closure's reference on its JSDoc type usage.

## Documentation

- [typedoc](https://typedoc.org/) - Create documentation using the TypeScript flavor of JSDoc (including documentation of plain JavaScript)
- [typedoc-plugin-missing-exports](https://github.com/Gerrit0/typedoc-plugin-missing-exports) - Ensure typedoc gets referenced, non-exported items documented in addition to exported items.

## Articles

- [TypeScript is not worth it](https://devclass.com/2023/05/11/typescript-is-not-worth-it-for-developing-libraries-says-svelte-author-as-team-switches-to-javascript-and-jsdoc/)
- [TypeScript without TypeScript](https://fettblog.eu/typescript-jsdoc-superpowers/)

## Linting

- [eslint-plugin-jsdoc](https://github.com/gajus/eslint-plugin-jsdoc) - ESLint rules for JSDoc blocks.

## Markdown

- [Official Markdown plugin](https://jsdoc.app/plugins-markdown.html) (converting Markdown syntax within jsdoc when building jsdoc)
- [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown) (Generating Markdown docs from JSDoc)
- [jsdoc-md](https://github.com/jaydenseric/jsdoc-md) (Generating Markdown docs from JSDoc)

## Parsing and Stringifying

- [comment-parser](https://github.com/syavorsky/comment-parser) - JSDoc-*like*
  parsing and stringifying (to be semantically aware of jsdoc's tags, you will
  need to supply a custom parser like [in eslint-plugin-jsdoc](https://github.com/gajus/eslint-plugin-jsdoc/blob/master/src/iterateJsdoc.js#L28-L85)).
- [@es-joy/jsdoccomment](https://github.com/es-joy/jsdoccomment) - Allows
  JSDoc-aware tag semantics on top of `comment-parser`. Also has a number of
  utilities, e.g., converting parser AST to ESLint AST and VisitorKeys.
- [@es-joy/jsdoc-eslint-parser](https://github.com/es-joy/jsdoc-eslint-parser) - A
  proof-of-concept ESLint parser integrating `@babel/eslint-parser`,
  `comment-parser` (via `@es-joy/jsdoccomment`), and `jsdocttypeparser`.

### Type parsing

- [jsdoc-type-pratt-parser](https://github.com/simonseyock/jsdoc-type-pratt-parser)
- [jsdoctypeparser](https://github.com/jsdoctypeparser/jsdoctypeparser) - JSDoc type
  parser/stringifier/traverser used in `eslint-plugin-jsdoc` which also supports
  some TypeScript.
- [catharsis](https://github.com/hegemonic/catharsis) - JSDoc type parser used
  within jsdoc itself.

## Schema usage

- [json-schema-to-jsdoc](https://github.com/n3ps/json-schema-to-jsdoc) - Converts
  from [JSON Schema](http://json-schema.org/) to JSDoc.
- [jsdoc-jsonschema](https://github.com/brettz9/jsdoc-jsonschema) - Converts from
  jsdoc to JSON Schema (early in project, but aims to
  use standard `@typedef`).

## Type checking

- [typescript](https://github.com/microsoft/TypeScript) - Check plain JavaScript with
    TypeScript by using `allowJs` and `checkJs` in `tsconfig.json`.
- [bycontract](https://github.com/dsheiko/bycontract/) - Validate structures with
  jsdoc expressions.
- [eslint-plugin-typelint](https://github.com/yarax/eslint-plugin-typelint) - Allows
  JSON Schema (or Redux reducer) to be pointed to by jsdoc types with
  usage type-checked.
- [tern](https://github.com/ternjs/tern) - Checking type usage against jsdoc.
  (Also interesting for notion of implicit typing--might there be a static
  but implicitly typed, ESLint-enforced subset of JavaScript (like `asm.js`)
  which can compile to more performant code without need to pollute code with
  types everywhere?.)

## Visualizations

- [jsdoc2diagram](https://github.com/amcmillan01/jsdoc2diagram) - Create (D3)
  diagram from your project's jsdoc.

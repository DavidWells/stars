---
repo: thomasheyenbrock/graphql-print
url: 'https://github.com/thomasheyenbrock/graphql-print'
homepage: null
starredAt: '2023-02-20T08:38:12Z'
createdAt: '2023-02-11T19:33:44Z'
updatedAt: '2023-05-17T19:40:44Z'
language: TypeScript
license: MIT
branch: main
stars: 15
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:55.733Z'
description: graphql-print
tags: []
---

# `graphql-print`

The printer that GraphQL always deserved.

✅ Pretty and minified printing

✅ Print comments

✅ Configure line length

✅ Choose custom indentation

## Install

Note that `graphql` is a peer dependency of this package and needs to be installed as well.

```sh
npm i graphql graphql-print
```

## Usage

This package supports printing any valid GraphQL AST node, as well as printing a list of nodes.

By default, the printer outputs a pretty-printed version of the given AST nodes, but it can be configured in different ways. The following table shows the supported options.

| Option             | Type      | Default | Description                                                                                                                                                                                                                                                                                                                                               |
| ------------------ | --------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `minified`         | `boolean` | `false` | Returns a minified version of the AST, optimizing for shortest string length                                                                                                                                                                                                                                                                              |
| `preserveComments` | `boolean` | `false` | All comments are stripped from the AST by default but can be perserved using this option                                                                                                                                                                                                                                                                  |
| `maxLineLength`    | `number`  | `80`    | The printer tries to output lists of nodes in a single line where possible and only breaks lists items into individual lines when they become too long. This option controls the threshold for when a line should be broken up into multiple ones.                                                                                                        |
| `indentationStep`  | `string`  | `"  "`  | By default the printer uses two spaces for indentation, this option allows you to configure that. (Note that passing any characters other than [ignored tokens](http://spec.graphql.org/October2021/#sec-Language.Source-Text.Ignored-Tokens) will result in a string that does not represent the original AST anymore and might potentially be invalid.) |

### Example

```js
import { parse } from "graphql";
import { print } from "graphql-print";

const ast = parse(`
  query MyQuery { 
    # select a field
    myField(myArg: 42, myOtherArg: null)
  }
`);

console.log(print(ast));
/**
 * Will print the following:
 *
 * query MyQuery {
 *   myField(myArg: 42, myOtherArg: null)
 * }
 */

console.log(print(ast, { minified: true }));
/**
 * Will print the following:
 *
 * query MyQuery{myField(myArg:42,myOtherArg:null)}
 */

console.log(print(ast, { preserveComments: true }));
/**
 * Will print the following:
 *
 * query MyQuery {
 *   # select a field
 *   myField(myArg: 42, myOtherArg: null)
 * }
 */

console.log(print(ast, { maxLineLength: 20 }));
/**
 * Will print the following:
 *
 * query MyQuery {
 *   myField(
 *     myArg: 42
 *     myOtherArg: null
 *   )
 * }
 */
```

---
repo: yuanqing/generate-ts-docs
url: 'https://github.com/yuanqing/generate-ts-docs'
homepage: ''
starredAt: '2022-10-16T07:42:18Z'
createdAt: '2020-11-22T09:31:02Z'
updatedAt: '2024-03-22T02:35:28Z'
language: TypeScript
license: MIT
branch: main
stars: 12
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:21.498Z'
description: >-
  :blue_book: Utilities to parse type information and JSDoc annotations from
  TypeScript source files, and render Markdown documentation
tags: []
---

# generate-ts-docs [![npm Version](https://img.shields.io/npm/v/generate-ts-docs?cacheSeconds=1800)](https://www.npmjs.com/package/generate-ts-docs) [![build](https://github.com/yuanqing/generate-ts-docs/workflows/build/badge.svg)](https://github.com/yuanqing/generate-ts-docs/actions?query=workflow%3Abuild)

> Utilities to parse type information and [JSDoc annotations](https://jsdoc.app/about-getting-started.html#adding-documentation-comments-to-your-code) from TypeScript source files, and render Markdown documentation

## Usage

First:

```
$ npm install --save-dev generate-ts-docs
```

Suppose that we have the following (highly contrived) toy [`example.ts`](/example/example.ts) source file:

<!-- ```ts markdown-interpolate: cat ./example/example.ts -->
```ts
/**
 * Adds two numbers.
 *
 * @param x  First number to add.
 * @param y  Second number to add.
 * @return The sum of `x` and `y`.
 */
export function add(x: number, y: number): number {
  return x + y
}
```
<!-- ``` end -->

…and the following [`generate-ts-docs.ts`](/example/generate-ts-docs.ts) script:

<!-- ```ts markdown-interpolate: sed 's/\.\.\/src\/index\.js/generate-ts-docs/' ./example/generate-ts-docs.ts -->
```ts
import {
  parseExportedFunctionsAsync,
  renderFunctionDataToMarkdown
} from 'generate-ts-docs'

async function main(): Promise<void> {
  const functionsData = await parseExportedFunctionsAsync(['./example.ts'])
  for (const functionData of functionsData) {
    console.log(renderFunctionDataToMarkdown(functionData))
  }
}
main()
```
<!-- ``` end -->

`parseExportedFunctionsAsync` receives an array of globs of TypeScript source files, and parses the functions in these files that have the [`export`](https://www.typescriptlang.org/docs/handbook/modules.html#export) keyword. It returns an array of `FunctionData` objects with the following shape:

<!-- ```ts markdown-interpolate: node --loader ts-node/esm ./scripts/print-example-function-data.ts -->
```ts
[
  {
    description: 'Adds two numbers.',
    jsDocTags: null,
    name: 'add',
    parameters: [
      {
        description: 'First number to add.',
        name: 'x',
        optional: false,
        rest: false,
        type: 'number'
      },
      {
        description: 'Second number to add.',
        name: 'y',
        optional: false,
        rest: false,
        type: 'number'
      }
    ],
    returnType: { description: 'The sum of `x` and `y`.', type: 'number' },
    type: 'function',
    typeParameters: []
  }
]
```
<!-- ``` end -->

`renderFunctionDataToMarkdown` renders the given array of `FunctionData` objects to a Markdown string.

Now, let’s run the `generate-ts-docs.ts` script, piping its output to a file:

````
$ npm install --dev ts-node
$ node --loader ts-node/esm generate-ts-docs.ts > README.md
````

The output [`README.md`](/example/README.md) will be as follows:

<!-- ````md markdown-interpolate: cat example/README.md -->
````md
# add(x, y)

Adds two numbers.

***Parameters***

- **`x`** (`number`) – First number to add.
- **`y`** (`number`) – Second number to add.

***Return type***

The sum of `x` and `y`.

```
number
```

````
<!-- ```` end -->

## API

<!-- ```ts markdown-interpolate: sed 's/export //' ./src/types.ts -->
```ts
type FunctionData = {
  description: null | string
  name: string
  parameters: null | Array<ParameterData>
  returnType: null | ReturnTypeData
  jsDocTags: null | JsDocTagsData
  type: string
  typeParameters: null | Array<TypeParameterData>
}

type JsDocTagsData = Record<string, null | string>

type ObjectData = {
  keys: Array<ParameterData>
  type: 'object'
}

type ParameterData = {
  description: null | string
  name: string
  optional: boolean
  rest: boolean
  type: string | ObjectData
}

type ReturnTypeData = {
  description: null | string
  type: string
}

type TypeParameterData = {
  name: string
  defaultType: null | string
  type: null | string
}
```
<!-- ``` end -->

<!-- markdown-interpolate: node --loader ts-node/esm ./scripts/generate-ts-docs.ts -->
- [**Functions data**](#functions-data)
  - [parseExportedFunctionsAsync(globs [, options])](#parseexportedfunctionsasyncglobs--options)
  - [createCategories(functionsData)](#createcategoriesfunctionsdata)
- [**Markdown**](#markdown)
  - [renderCategoryToMarkdown(category [, options])](#rendercategorytomarkdowncategory--options)
  - [renderFunctionDataToMarkdown(functionData [, options])](#renderfunctiondatatomarkdownfunctiondata--options)
- [**Markdown table of contents**](#markdown-table-of-contents)
  - [renderCategoriesToMarkdownToc(categories)](#rendercategoriestomarkdowntoccategories)
  - [renderFunctionsDataToMarkdownToc(functionsData)](#renderfunctionsdatatomarkdowntocfunctionsdata)

### Functions data

#### parseExportedFunctionsAsync(globs [, options])

Parses the exported functions defined in the given `globs` of TypeScript
files.

- Functions with the `@ignore` JSDoc tag will be skipped.
- Functions will be sorted in *ascending* order of their `@weight` JSDoc
tag. A function with the `@weight` tag will be ranked *before* a function
without the `@weight` tag.

***Parameters***

- **`globs`** (`Array<string>`) – One or more globs of TypeScript files.
- **`options`** (`object`) – *Optional.*
  - **`tsconfigFilePath`** (`string`) – Path to a TypeScript configuration file.
Defaults to `./tsconfig.json`.

***Return type***

```
Promise<Array<FunctionData>>
```

#### createCategories(functionsData)

Groups each object in `functionsData` by the value of each function’s
`tags.category` key.

***Parameters***

- **`functionsData`** (`Array<FunctionData>`)

***Return type***

```
Array<{
  name: string;
  functionsData: Array<FunctionData>;
}>
```

### Markdown

#### renderCategoryToMarkdown(category [, options])

***Parameters***

- **`category`** (`object`)
  - **`name`** (`string`)
  - **`functionsData`** (`Array<FunctionData>`)
- **`options`** (`object`) – *Optional.*
  - **`headerLevel`** (`number`) – Header level to be used for rendering the
category name. Defaults to `1` (ie. `#`).

***Return type***

```
string
```

#### renderFunctionDataToMarkdown(functionData [, options])

***Parameters***

- **`functionData`** (`FunctionData`)
- **`options`** (`object`) – *Optional.*
  - **`headerLevel`** (`number`) – Header level to be used for rendering the
function name. Defaults to `1` (ie. `#`).

***Return type***

```
string
```

### Markdown table of contents

#### renderCategoriesToMarkdownToc(categories)

Generate a Markdown table of contents for the given `categories`.

***Parameters***

- **`categories`** (`Array<{ name: string; functionsData: Array<FunctionData>; }>`)

***Return type***

```
string
```

#### renderFunctionsDataToMarkdownToc(functionsData)

Generate a Markdown table of contents for the given `functionsData`.

***Parameters***

- **`functionsData`** (`Array<FunctionData>`)

***Return type***

```
string
```

<!-- end -->

## Installation

```
$ npm install --save-dev generate-ts-docs
```

## Implementation details

The [`parseExportedFunctionsAsync`](/src/parse-exported-functions-async.ts) function works via the following two-step process:

1. Generate [type declarations](https://www.typescriptlang.org/docs/handbook/declaration-files/by-example.html) for the given TypeScript source files.
2. Traverse and extract relevant information from the [AST](https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API) of the generated type declarations.

(The [TypeScript AST Viewer](https://ts-ast-viewer.com/) tool is useful for figuring out how nodes should be parsed.)

## See also

- [markdown-interpolate](https://github.com/yuanqing/markdown-interpolate)
- [ts-node](https://github.com/TypeStrong/ts-node)

## License

[MIT](/LICENSE.md)

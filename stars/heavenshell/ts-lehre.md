---
repo: heavenshell/ts-lehre
url: 'https://github.com/heavenshell/ts-lehre'
homepage: ''
starredAt: '2021-11-13T05:57:29Z'
createdAt: '2020-03-22T15:03:05Z'
updatedAt: '2025-02-23T21:43:08Z'
language: TypeScript
license: MIT
branch: master
stars: 16
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:39.012Z'
description: 'Generate document block(JsDoc, EsDoc, TsDoc) from source code'
tags:
  - esco
  - esdoc
  - generator
  - jsdoc
  - tsdoc
  - typescript
---

# Lehre

![build](https://github.com/heavenshell/ts-lehre/workflows/build/badge.svg)

Lehre is document block generator.

Generate JsDoc style document from source code.

## Install

```console
yarn add -D lehre
```

## Usage

```console
cat src/app.ts | lehre --stdin
```

Specify directory and ignore patterns.

```console
lehre --target-dir=./src --ignore-patterns="spec.ts"
```

Specify file.

```console
lehre --target-file=./src/app.ts
```

Use babel parser(default parser is TypeScript compiler api and recommend to use)

```console
lehre --target-file=./src/app.ts --parser=babel
```

```console
$ ./lehre --help
Usage: lehre [options]

Options:
  -v, --version                 output the version number
  -t, --target-file [path]      Path to target file.
  -d, --target-dir [path]       Path to target directory.
  --stdin                       Force reading input from STDIN
  --write                       Edit files in-place
  --template-path [path]        Custom formatter path
  --ignores [path]              Ignore directory names
  --ignore-patterns [patterns]  Ignore patterns
  --parser [target]             Parser (default: "ts")
  --style [style]               Output style(string | json) (default: "string")
  --nest                        Enable to generate inner document(only
                                parser=ts available)
  --scriptTarget [target]       [ES3 | ES5 | ES2015 | ES2016 | ES2017 | ES2018
                                | ES2019 | ESNext] (default: "ESNext")
  --scriptKind [kind]           [JS | JSX | TS | TSX] (default: "TS")
  --formatter [formatter]       Document formatter(jsdoc | esdoc | tsdoc)
                                (default: "jsdoc")
  -h, --help                    display help for command
```

## Formatters

You can choose document block formatter from [JsDoc](https://jsdoc.app/), [ESDoc](https://github.com/esdoc/esdoc), [TSDoc](https://github.com/microsoft/tsdoc) and your custom formatter.

### JsDoc(default)

```console
cat src/app.ts | lehre --stdin
```

### EsDoc

```console
cat src/app.ts | lehre --stdin --formatter=esdoc
```

### TsDoc

```console
cat src/app.ts | lehre --stdin --formatter=tsdoc
```

### Coustom formatter

```console
cat src/app/ts | lehre --stdin --template-path=./examples/template.js
```

## Custom formatter

You can create your own cutom document block formatter.

Return string value and it insert above to signature automatically.

`examples/template.js` is sample formatter.

### Formatter api

#### generateClassDoc

```typescript
generateClassDoc: (
  name: string,
  type: string,
  start: { line: number, charactor: number },
  end: { line: number, charactor: number },
  methods: [
    name: string,
    type: string,
    start: { line: number, charactor: number },
    end: { line: number, charactor: number },
    params: ParamProps[
      name: string,
      type: string,
      default: string,
      alias: string,
    ],
    returnType: string,
  ],
  heritageClauses: [{ type: string, value: string }],
) => string
```

#### generateInterfaceDoc

```typescript
generateInterfaceDoc: ({
  name: string,
  type: string,
  start: { line: number, charactor: number },
  end: { line: number, charactor: number },
  methods: [
    name: string,
    type: string,
    start: { line: number, charactor: number },
    end: { line: number, charactor: number },
    params: ParamProps[
      name: string,
      type: string,
      default: string,
      alias: string,
    ],
    returnType: string,
  ],
  heritageClauses: [{ type: string, value: string }],
}) => string
```

#### generatePropertyDoc

```typescript
generatePropertyDoc: ({
  name: string,
  type: string,
  start: { line: number, charactor: number },
  end: { line: number, charactor: number },
  params: ParamProps[
    name: string,
    type: string,
    default: string,
    alias: string,
  ],
  returnType: string,
}) => string
```

#### generateFunctionDoc

```typescript
generateFunctionDoc: ({
  name: string,
  type: string,
  start: { line: number, charactor: number },
  end: { line: number, charactor: number },
  params: ParamProps[
    name: string,
    type: string,
    default: string,
    alias: string,
  ],
  returnType: string,
}) => string
```

## LICENSE

MIT

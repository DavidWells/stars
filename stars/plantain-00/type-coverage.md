---
repo: plantain-00/type-coverage
url: 'https://github.com/plantain-00/type-coverage'
homepage: null
starredAt: '2022-01-25T01:31:31Z'
createdAt: '2018-01-13T11:31:43Z'
updatedAt: '2025-02-24T06:39:11Z'
language: TypeScript
license: MIT
branch: master
stars: 1278
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:18.140Z'
description: A CLI tool to check type coverage for typescript code
tags: []
---

# type-coverage

A CLI tool to check type coverage for typescript code

This tool will check type of all identifiers, `the type coverage rate` = `the count of identifiers whose type is not any` / `the total count of identifiers`, the higher, the better.

[![Dependency Status](https://david-dm.org/plantain-00/type-coverage.svg)](https://david-dm.org/plantain-00/type-coverage)
[![devDependency Status](https://david-dm.org/plantain-00/type-coverage/dev-status.svg)](https://david-dm.org/plantain-00/type-coverage#info=devDependencies)
[![Build Status: Windows](https://ci.appveyor.com/api/projects/status/github/plantain-00/type-coverage?branch=master&svg=true)](https://ci.appveyor.com/project/plantain-00/type-coverage/branch/master)
![Github CI](https://github.com/plantain-00/type-coverage/workflows/Github%20CI/badge.svg)
[![npm version](https://badge.fury.io/js/type-coverage.svg)](https://badge.fury.io/js/type-coverage)
[![Downloads](https://img.shields.io/npm/dm/type-coverage.svg)](https://www.npmjs.com/package/type-coverage)
[![type-coverage](https://img.shields.io/badge/dynamic/json.svg?label=type-coverage&prefix=%E2%89%A5&suffix=%&query=$.typeCoverage.atLeast&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fplantain-00%2Ftype-coverage%2Fmaster%2Fpackage.json)](https://github.com/plantain-00/type-coverage)
[![Codechecks](https://raw.githubusercontent.com/codechecks/docs/master/images/badges/badge-default.svg?sanitize=true)](https://codechecks.io)

## use cases

+ Show progress of long-term progressive migration from existing js code to typescript code.
+ Avoid introducing accidental `any` by running in CI.
+ Show progress of long-term progressive migration from existing looser typescript code to stricter typescript code.[migrate to stricter typescript](#migrate-to-stricter-typescript)

## install

`yarn global add type-coverage typescript`

## usage

run `type-coverage`

## arguments

name | type | description
--- | --- | ---
`-p`, `--project` | string? | tell the CLI where is the `tsconfig.json`(Added in `v1.0`)
`--detail` | boolean? | show detail(Added in `v1.0`)
`--at-least` | number? | fail if coverage rate < this value(Added in `v1.0`)
`--debug` | boolean? | show debug info(Added in `v1.0`)
`--suppressError` | boolean? | process exit 0 even failed or errored
`--strict` | boolean? | [strict mode](#strict-mode)(Added in `v1.7`)
`--ignore-catch` | boolean? | [ignore catch](#ignore-catch)(Added in `v1.13`)
`--cache` | boolean? | [enable cache](#enable-cache)(Added in `v1.10`)
`--ignore-files` | string[]? | [ignore files](#ignore-files)(Added in `v1.14`)
`-h`, `--help` | boolean? | show help(Added in `v2.5`)
`--is` | number? | fail if coverage rate !== this value(Added in `v2.6`)
`--update` | boolean? | if "typeCoverage" section in package.json is present update its "atLeast" or "is" value (Added in `v2.6`)
`--update-if-higher` | boolean? | update "typeCoverage" in package.json to current result if new type coverage is higher(Added in `v2.20`)
`--ignore-unread` | boolean? | allow writes to variables with implicit any types(Added in `v2.14`)
`--ignore-nested` | boolean? | ignore any in type arguments, eg: `Promise<any>`(Added in `v2.16`)
`--ignore-as-assertion` | boolean? | ignore as assertion, eg: `foo as string`(Added in `v2.16`)
`--ignore-type-assertion` | boolean? | ignore type assertion, eg: `<string>foo`(Added in `v2.16`)
`--ignore-non-null-assertion` | boolean? | ignore non-null assertion, eg: `foo!`(Added in `v2.16`)
`--ignore-object` | boolean? | `Object` type not counted as any, eg: `foo: Object`(Added in `v2.21`)
`--ignore-empty-type` | boolean? | empty type not counted as any, eg: `foo: {}`(Added in `v2.21`)
`--show-relative-path` | boolean? | show relative path in detail message(Added in `v2.17`)
`--history-file` | string? | file name where history is saved(Added in `v2.18`)
`--no-detail-when-failed` | boolean? | not show detail message when the CLI failed(Added in `v2.19`)(Use `--no-detail-when-failed=true` to enable it <https://github.com/plantain-00/type-coverage/issues/113>)
`--report-semantic-error` | boolean? | report typescript semantic error(Added in `v2.22`)
`-- file1.ts file2.ts ...` | string[]? | only checks these files, useful for usage with tools like `lint-staged`(Added in `v2.23`)
`--cache-directory` | string? | [set cache directory](#enable-cache)(Added in `v2.24`)
`--not-only-in-cwd` | boolean? | include results outside current working directory(Added in `v2.26`)
`--json-output` | boolean? | output results as JSON(Added in `v2.27`)
`--report-unused-ignore` | boolean? | report unused [ignore line](#ignore-line) directives, enabled if `--strict`(Added in `v2.28`)

### strict mode

If the identifiers' type arguments exist and contain at least one `any`, like `any[]`, `ReadonlyArray<any>`, `Promise<any>`, `Foo<number, any>`, it will be considered as `any` too(Added in `v1.7`)

Type assertion, like `foo as string`, `foo!`, `<string>foo` will be considered as uncovered, exclude `foo as const`, `<const>foo`, `foo as unknown`(Added in `v2.8`), and other safe type assertion powered by `isTypeAssignableTo`(Added in `v2.9`)

Object type(like `foo: Object`) and empty type(like `foo: {}`) will be considered as any(Added in `v2.21`)

Strict mode enables [`--report-unused-ignore`](#ignore-line) by default.

Also, future minor release may introduce stricter type check in this mode, which may lower the type coverage rate

### enable cache

save and reuse type check result of files that is unchanged and independent of changed files in `.type-coverage` directory(or set by `--cache-directory`), to improve speed

### ignore catch

If you want to get 100% type coverage then `try {} catch {}` is
the largest blocked towards that.

This can be fixed in typescript with [Allow type annotation on catch clause variable](https://github.com/Microsoft/TypeScript/issues/20024)
but until then you can turn on `--ignore-catch --at-least 100`.

Your catch blocks should look like

```ts
try {
  await ...
} catch (anyErr) {
  const err = <Error> anyErr
}
```

To have the highest type coverage.

### ignore files

This tool will ignore the files, eg: `--ignore-files "demo1/*.ts" --ignore-files "demo2/foo.ts"`

## config in package.json

```json5
  "typeCoverage": {
    "atLeast": 99, // same as --at-least (Added in `v1.4`)
    "is": 99, // same as --is (Added in `v2.6`)
    "cache": true, // same as --cache (Added in `v2.11`)
    "debug": true, // same as --debug (Added in `v2.11`)
    "detail": true, // same as --detail (Added in `v2.11`)
    "ignoreCatch": true, // same as --ignore-catch (Added in `v2.11`)
    "ignoreFiles": ["demo1/*.ts", "demo2/foo.ts"], // same as --ignore-files "demo1/*.ts" --ignore-files "demo2/foo.ts" (Added in `v2.11`)
    "project": "tsconfig.json", // same as --project tsconfig.json or -p tsconfig.json (Added in `v2.11`)
    "strict": true, // same as --strict (Added in `v2.11`)
    "suppressError": true, // same as --suppressError (Added in `v2.11`)
    "update": true, // same as --update (Added in `v2.11`)
    "updateIfHigher": true, // same as --update-if-higher (Added in `v2.20`)
    "ignoreUnread": true, // same as --ignore-unread (Added in `v2.14`)
    "ignoreNested": true, // same as --ignore-nested (Added in `v2.16`)
    "ignoreAsAssertion": true, // same as --ignore-as-assertion (Added in `v2.16`)
    "ignoreTypeAssertion": true, // same as --ignore-type-assertion (Added in `v2.16`)
    "ignoreNonNullAssertion": true, // same as --ignore-non-null-assertion (Added in `v2.16`)
    "ignoreObject": true, // same as --ignore-object(Added in `v2.21`)
    "ignoreEmptyType": true, // same as --ignore-empty-type(Added in `v2.21`)
    "showRelativePath": true, // same as --show-relative-path (Added in `v2.17`)
    "historyFile": "typecoverage.json", // same as --history-file (Added in `v2.18`)
    "noDetailWhenFailed": true, // same as --no-detail-when-failed (Added in `v2.19`)
    "reportSemanticError": true, // same as --report-semantic-error (Added in `v2.22`)
    "cacheDirectory": "custom-directory", // same as --cache-directory (Added in `v2.24`)
    "notOnlyInCWD": true, // same as --not-only-in-cwd (Added in `v2.26`)
    "jsonOutput": true, // same as --json-output (Added in `v2.27`)
    "reportUnusedIgnore": true, // same as --report-unused-ignore (Added in `v2.28`)
  },
```

## ignore line

Use `type-coverage:ignore-next-line` or `type-coverage:ignore-line` in comment(`//` or `/*  */`) to ignore `any` in a line.(Added in `v1.9`)

```ts
try {
  // type-coverage:ignore-next-line
} catch (error) { // type-coverage:ignore-line
}
```

The `--report-unused-ignore` or `--strict` can report unused ignore line directives.(Added in `v2.28`)

```ts
// type-coverage:ignore-next-line
const a = 1 // <- this line is marked to ignore `any`, but there is no `any` here now. 
```

## migrate to stricter typescript

Create a new tsconfig file(eg: `tconfig.type-coverage.json`) with stricter config, that extends from `tsc`'s `tsconfig.json`

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "strict": true
  }
}
```

Run `type-coverage -p ./tconfig.type-coverage.json --report-semantic-error`, tsc semantic errors will be reported by `type-coverage`.

When all tsc semantic errors are resolved, merge the two `tsconfig`s.

## add dynamic badges of type coverage rate

Use your own project url:

```md
[![type-coverage](https://img.shields.io/badge/dynamic/json.svg?label=type-coverage&prefix=%E2%89%A5&suffix=%&query=$.typeCoverage.atLeast&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fplantain-00%2Ftype-coverage%2Fmaster%2Fpackage.json)](https://github.com/plantain-00/type-coverage)
```

## integrating with PRs

Using [codechecks](https://codechecks.io) you can integrate `type-coverage` with GitHub's Pull Requests. See [type-coverage-watcher](https://github.com/codechecks/type-coverage-watcher).

[![type-coverage-watcher](https://github.com/codechecks/type-coverage-watcher/raw/master/meta/check.png "type-coverage-watcher")](https://github.com/codechecks/type-coverage-watcher)

## typescript coverage report

Using [typescript-coverage-report](https://github.com/alexcanessa/typescript-coverage-report) you can generate typescript coverage report.

[![typescript-coverage-report](https://raw.githubusercontent.com/alexcanessa/typescript-coverage-report/master/images/screenshot-table.png "typescript-coverage-report")](https://github.com/alexcanessa/typescript-coverage-report)

## API(Added in `v1.3`)

```ts
import { lint } from 'type-coverage-core'

const result = await lint('.', { strict: true })
```

```ts
export function lint(project: string, options?: Partial<LintOptions>): Promise<FileTypeCheckResult & { program: ts.Program }>
export function lintSync(compilerOptions: ts.CompilerOptions, rootNames: string[], options?: Partial<LintOptions>): FileTypeCheckResult & { program: ts.Program } // Added in `v2.12`

export interface LintOptions {
  debug: boolean,
  files?: string[],
  oldProgram?: ts.Program,
  strict: boolean, // Added in v1.7
  enableCache: boolean, // Added in v1.10
  ignoreCatch: boolean, // Added in v1.13
  ignoreFiles?: string | string[], // Added in v1.14
  fileCounts: boolean, // Added in v2.3
  absolutePath?: boolean, // Added in v2.4
  processAny?: ProccessAny, // Added in v2.7
  ignoreUnreadAnys: boolean, // Added in v2.14
  ignoreNested: boolean // Added in v2.16
  ignoreAsAssertion: boolean // Added in v2.16
  ignoreTypeAssertion: boolean // Added in v2.16
  ignoreNonNullAssertion: boolean // Added in v2.16
  ignoreObject: boolean // Added in v2.21
  ignoreEmptyType: boolean // Added in v2.21
  reportSemanticError: boolean // Added in v2.22
  cacheDirectory: string // Added in v2.24
  notOnlyInCWD?: boolean, // Added in v2.26
  reportUnusedIgnore: boolean, // Added in v2.28
}

export interface FileTypeCheckResult {
  correctCount: number
  totalCount: number
  anys: FileAnyInfo[]
  fileCounts: { // Added in v2.3
    correctCount: number,
    totalCount: number,
  }[]
}

export interface FileAnyInfo {
  line: number
  character: number
  text: string
  kind: FileAnyInfoKind //  Added in v2.13
}

export const enum FileAnyInfoKind {
  any = 1, // any
  containsAny = 2, // Promise<any>
  unsafeAs = 3, // foo as string
  unsafeTypeAssertion = 4, // <string>foo
  unsafeNonNull = 5, // foo!
}

export type ProccessAny = (node: ts.Node, context: FileContext) => boolean
```

## The typescript language service plugin of type-coverage(Added in `v2.12`)

![ts-plugin demo](./demo/ts-plugin.png)

`yarn add ts-plugin-type-coverage -D`

```json5
{
  "compilerOptions": {
    "plugins": [
      {
        "name": "ts-plugin-type-coverage",
        "strict": true, // for all configurations, see LintOptions above
        "ignoreCatch": true,
      }
    ]
  }
}
```

For VSCode users, choose "Use Workspace Version", See <https://github.com/microsoft/TypeScript/wiki/Writing-a-Language-Service-Plugin#testing-locally>, or just use the wrapped plugin below.

## VSCode plugin(Added in `v2.13`)

<https://marketplace.visualstudio.com/items?itemName=york-yao.vscode-type-coverage>

Configuration is in `Preferences` - `Settings` - `Extensions` - `Type Coverage`

If the result from the vscode plugin is different from the result from the CLI, maybe your project root directory's `tsconfig.json` is different from your CLI `tsconfig.json`

If the plugin does not work, you may see some workarounds:

+ <https://github.com/plantain-00/type-coverage/issues/86#issuecomment-907814000>

## FAQ

> Q: Does this count JavaScript files?

Yes, This package calls Typescript API, Typescript can parse Javascript file(with `allowJs`), then this package can too.

> Q: How to disable color in output?

Set the environment variable `FORCE_COLOR=0` or use `--no-color` option, see [chalk documentation](https://github.com/chalk/chalk?tab=readme-ov-file#supportscolor) for details.

## Changelogs

[CHANGELOG for minor and patch release](./CHANGELOG.md)

### v2

1. Move `typescript` from `dependencies` to `peerDependencies`
2. Move API from package `type-coverage` to package `type-coverage-core`

```ts
// v1
import { lint } from 'type-coverage'
lint('.', false, false, undefined, undefined, true)

// v2
import { lint } from 'type-coverage-core'
lint('.', { strict: true })
```

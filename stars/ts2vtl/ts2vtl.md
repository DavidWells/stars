---
repo: ts2vtl/ts2vtl
url: 'https://github.com/ts2vtl/ts2vtl'
homepage: ''
starredAt: '2024-12-27T19:50:47Z'
createdAt: '2021-07-22T09:26:51Z'
updatedAt: '2024-12-27T19:50:47Z'
language: TypeScript
license: NA
branch: master
stars: 7
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:53:36.397Z'
description: TypeScript to VTL
tags:
  - aws
  - typescript
  - vtl
---

# ts2vtl

Generate VTL templates from TypeScript sources.

## Usage

```
npx ts2vtl -p path/to/tsconfig.json --outDir path/to/dir src/template.ts
```

## Options

```
Options:
      --outDir   Output templates to the directory                      [string]
      --outFile  Output to single file                                  [string]
  -p, --project  The path of tsconfig.json                              [string]
  -v, --verbose  Verbose mode                         [boolean] [default: false]
      --version  Show version number                                   [boolean]
      --help     Show help                                             [boolean]
```

## Packages

- [@ts2vtl/aws-appsync](packages/@ts2vtl/aws-appsync)
- [@ts2vtl/core](packages/@ts2vtl/core)
- [@ts2vtl/java-types](packages/@ts2vtl/java-types)
- [@ts2vtl/vtl](packages/@ts2vtl/vtl)
- [ts2vtl](packages/ts2vtl)

## License

MIT

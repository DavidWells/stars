---
repo: boneskull/sync-monorepo-packages
url: 'https://github.com/boneskull/sync-monorepo-packages'
homepage: ''
starredAt: '2022-10-19T06:27:47Z'
createdAt: '2019-10-21T21:40:51Z'
updatedAt: '2023-11-05T10:44:57Z'
language: JavaScript
license: Apache-2.0
branch: main
stars: 12
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:20.399Z'
description: Synchronizes one or more fields between package.json files in a monorepo
tags:
  - copy
  - lerna
  - manifest
  - metadata
  - monorepo
  - monorepo-packages
  - npm
  - package-json
  - package-management
  - packages
  - sync
  - synchronize
  - workflow
---

# sync-monorepo-packages

> Synchronizes `package.json` fields and arbitrary files in a monorepo

## Features

- Auto-discovery of packages via `package.json` workspaces and/or `lerna.json`
- Optional manual control of destination packages
- Helpful defaults
- Detailed "dry run" mode
- Summary of operations
- Sync arbitrary files (e.g. `README.md`)

## Install

**Requires Node.js `^14.17.0 || ^16.13.0 || >=18.0.0`**

```shell
npm install sync-monorepo-packages --save-dev
```

_or_

```shell
$ npx sync-monorepo-packages --help
```

## Usage

Here, I have pasted the output of `--help` because I am lazy:

```plain
sync-monorepo-packages [file..]

Synchronize files and metadata across packages in a monorepo

Positionals:
  file  One or more source files to sync                                [string]

Options:
      --help             Show help                                     [boolean]
      --version          Show version number                           [boolean]
  -D, --dry-run          Do not sync; print what would have changed (implies
                         --verbose)                                    [boolean]
  -f, --field, --fields  Fields in source package.json to sync [array] [default:
         ["keywords","author","repository","license","engines","publishConfig"]]
      --force            Overwrite destination file(s)                 [boolean]
  -p, --packages         Dirs/globs containing destination packages
                           [array] [default: (use workspaces and/or lerna.json)]
      --package-json     Sync package.json             [boolean] [default: true]
  -s, --source           Path to source package.json
                                      [string] [default: (closest package.json)]
  -v, --verbose          Print change details                          [boolean]
      --summary          Print summary                 [boolean] [default: true]
  -l, --lerna            Path to lerna.json, if any
                                 [string] [default: (lerna.json in current dir)]

Examples:
  sync-monorepo-packages --field keywords   Sync "keywords" and "author" from
  --field author -s ./foo/package.json      ./foo/package.json to packages found
                                            in lerna.json
  sync-monorepo-packages --packages ./foo   Using default fields, show what
  --dry-run --no-summary                    would have synced from package.json
                                            in current dir to packages in ./foo;
                                            hide summary
  sync-monorepo-packages --no-package-json  Sync ./README.md to each package
  ./README.md                               found in lerna.json. Do not sync
                                            anything in package.json

Found a bug? Report it at https://github.com/boneskull/sync-monorepo-packages
```

## Notes

- If there are other fields which would make sense to copy as a default, please suggest!
- Use at your own risk! `--dry-run` is your friend
- When copying files, directories may be created relative to the dirpath of `lerna.json` or `package.json`. For example, if you want to sync `foo/bar.md` to each package, `packages/*/foo/bar.md` will be the result. This may not work properly with explicitly-specified package directories! Use from project root to be sure.
- There is an API that you can use. Go for it!

## License

Copyright © 2019 Christopher Hiller. Licensed Apache-2.0

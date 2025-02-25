---
repo: jameslnewell/run-if-diff
url: 'https://github.com/jameslnewell/run-if-diff'
homepage: ''
starredAt: '2019-08-05T22:07:21Z'
createdAt: '2018-11-16T09:05:48Z'
updatedAt: '2021-02-05T18:38:22Z'
language: JavaScript
license: NA
branch: master
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:28.689Z'
description: Run a command if files have changed.
tags:
  - cli
  - diff
  - exec
  - git
  - run
  - since
---

# run-if-diff

[![run-if-diff](https://img.shields.io/npm/v/run-if-diff.svg)](https://www.npmjs.com/package/run-if-diff)
![run-if-diff](https://github.com/jameslnewell/run-if-diff/workflows/Package/badge.svg)

Run a command if files are different.

## Installation

```bash
# npm
npm i -S run-if-diff

# yarn
yarn add --dev run-if-diff
```

## Usage

### `exit-if-diff`

Exit with an exit code of `128` if matching files have changed, Exit with an exit code of `0` if no matching files have changed.

```bash
exit-if-diff [--since <ref>] [--file-path <glob>] [--file-status
<status>] [--exit-code-when-changed <number>] [--exit-code-when-unchanged <number>]
```

Example:

```bash
set +e
exit-if-diff --since v1.3.1 --file-path my-app.yml
set -e
if [ $? -eq 128 ]
  aws cfn deploy --stack-name my-app --template-file my-app.yml
fi
```

### `list-if-diff`

List matching files that have changed.

```bash
list-if-diff [--since <ref>] [--file-path <glob>] [--file-status <status>]
```

Example:

```bash
list-if-diff --since v1.3.1 --file-path my-app.yml | xargs eslint
```

### `run-if-diff`

Run a command and passthru it's output if matching files have changed.

```bash
run-if-diff [--since <ref>] [--file-path <glob>] [--file-status <status>] -- <cmd>
```

Example:

```bash
run-if-diff --since v1.3.1 --file-path my-app.yml -- aws cfn deploy --stack-name my-app --template-file my-app.yml
```

### Github action

Check whether files have changed in a pipeline.

```yml
steps:
  - uses: actions/checkout@v2

  - id: run-if-diff
    uses: jameslnewell/run-if-diff@master
    with:
      cwd: .
      since: previous-tag
      file-path: |
        apps/**/*.tsx
        packages/**/*.tsx
      file-status: |
        A
        M

  - name: Get the ref
    run: 'echo "ref: ${{ steps.run-if-diff.outputs.ref }}"'

  - name: Get the file count
    run: 'echo "count: ${{ steps.run-if-diff.outputs.count }}"'

  - name: Get the file paths
    run: 'echo -e "paths: \n${{ steps.run-if-diff.outputs.paths }}"'

  - name: Conditional command
    if: ${{ steps.run-if-diff.outputs.count > 0 }}
    run: echo "Expensive command..."
```

## Credits

Inspired by `lerna`'s `--since` filter.

## License

Copyright 2018 James Newell

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

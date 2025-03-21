---
repo: fregante/ghat
url: 'https://github.com/fregante/ghat'
homepage: 'https://npm.im/ghat'
starredAt: '2020-11-18T23:45:53Z'
createdAt: '2020-11-07T22:31:46Z'
updatedAt: '2024-11-06T23:52:38Z'
language: TypeScript
license: MIT
branch: main
stars: 265
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:22.871Z'
description: "\U0001F6D5 Reuse GitHub Actions workflows across repositories"
tags: []
---

# 🛕 ghat

> Reuse GitHub Actions workflows across repositories

On first run, `ghat` will copy a workflow from another GitHub repo. Successive runs will update the existing workflows and preserve the `env` variables.

1. Write workflows once, use them in any repository
2. Update your workflows without copy-pasting YAML
3. Preserve [local `env` variables](#env-object)
4. [Customize workflows](#exclude-properties) before importing them

The good parts:

- `ghat` does not run every time on your CI
- `ghat` doesn't have to be a dependency of your project
- `ghat` is node-based, but can install any type of workflows
- Workflow changes need to be committed by the user, so you don't have to worry about it suddenly breaking "because of a dependency"

Requirements:

- git
- npm or yarn (you can use [`npx ghat ...`](https://www.npmjs.com/package/npx) or [`yarn dlx ghat ...`](https://yarnpkg.com/cli/dlx) to run it without installing it)
- a writable `~/.degit` cache folder as required by [degit](https://github.com/Rich-Harris/degit)

## Usage

`ghat` uses [degit](https://github.com/Rich-Harris/degit#basics) to fetch any repository or specific YAML file/folder within it. Below you can find some examples using the workflows in [fregante/ghatemplates](https://github.com/fregante/ghatemplates).

```sh
$ ghat --help

  Description
    Reuse GitHub Actions workflows across repositories

  Usage
    $ ghat <source> [options]

  Options
    --exclude        Any part of the YAML file to be removed (can be repeated)
    --set            Value to add (can be repeated). The value is interpreted as YAML/JSON. Writing JSON on the CLI is tricky, so you might want to wrap the whole flag value
    -v, --version    Displays current version
    -h, --help       Displays this message

  Examples
    $ ghat fregante/ghatemplates/node
    $ ghat fregante/ghatemplates/node --exclude jobs.Build --exclude jobs.Test
    $ ghat fregante/ghatemplates/node --set on=push
    $ ghat fregante/ghatemplates/node --set 'jobs.Test.container=node:12.15'
    $ ghat fregante/ghatemplates/node-multi --set jobs.build.strategy.matrix.node-version=\[8.x,10.x\]
    $ ghat fregante/ghatemplates/node/build.yml
```

### Fetch repo

If you provide a `user/repo` address, `ghat` will fetch the repository and look for `*.yml`/`*.yaml` files at the top level. If none are found, it will assume you want to copy the repo’s active workflows from `.github/workflows`

```sh
npx ghat fregante/ghat
# Copies *.yml OR .github/workflows/*.yml
```

### Fetch whole folder

```sh
npx ghat fregante/ghatemplates/node
# Copies node/*.yml into the local .github/workflows. It's NOT recursive
```

### Fetch specific file

```sh
npx ghat fregante/ghatemplates/node/ci.yml
# Copies node/ci.yml into the local .github/workflows/ci.yml
```

## Customization

### Exclude properties

You can exclude any property from the template by using the `--exclude <path>` flag, multiple times.

- `path` is parsed by [dot-prop](https://github.com/sindresorhus/dot-prop), so refer to its documentation.

```sh
--exclude on.schedule
```

### Set properties

You can set/overwrite any value with the `--set <path>=<value>` flag, multiple times.

- `path` is parsed by [dot-prop](https://github.com/sindresorhus/dot-prop), so refer to its documentation.
- `value` is a YAML/JSON value passed directly to the YAML parser.

Note: writing JSON on the command line is a little tricky, so if you're running into errors, try wrapping the whole flag value into a string, for example:

```sh
--set 'on.schedule=[{"cron": "42 17 * * 4"}]'
```

### `env` object

When you fetch a workflow that already exists locally, the local file will be overridden, except for the top-level `env` object. For example:

#### Local file

```yml
env:
  ADJECTIVE: cool

# DO NOT EDIT BELOW - use `npx ghat fregante/workflows/demo`

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - run: echo My workflow is $ADJECTIVE
```

#### Template file

```yml
env:
  ADJECTIVE: the default

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - run: echo This new workflow is "$ADJECTIVE" since it was updated
```

#### Updated local file

Only the top-level `env` will be preserved, the rest will be updated.

```yml
env:
  ADJECTIVE: cool

# DO NOT EDIT BELOW - use `npx ghat fregante/workflows/demo`

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - run: echo This new workflow is "$ADJECTIVE" since it was updated
```

## What’s ghat?

**G**it**H**ub
**A**ctions
**T**emplating

I won’t pretend to know exactly what a **_Ghat_** is, but you should know [check them out,](https://en.wikipedia.org/wiki/Ghat) they’re [beautiful. 🇮🇳](https://www.gettyimages.com/global-location?requested_location=USA&requested_language=en-US&destination_url=%2Ffotos%2Fghat)

## License

MIT © [Federico Brigante](https://fregante.com)

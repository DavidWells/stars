---
repo: lirantal/gh-cp
url: 'https://github.com/lirantal/gh-cp'
homepage: null
starredAt: '2026-06-18T16:46:33Z'
createdAt: '2026-03-26T09:10:42Z'
updatedAt: '2026-07-01T22:50:50Z'
language: TypeScript
license: Apache-2.0
branch: main
stars: 7
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2026-07-05T01:53:40.119Z'
description: >-
  A CLI that copies files and directories from GitHub repo paths and downloads
  them to a local path
tags: []
---

<!-- markdownlint-disable -->

<p align="center">
  <h1 align="center">
    gh-cp
  </h1>
</p>

<p align="center">
  Copy files or directories from a GitHub repository path into a local folder — no full clone, no git history.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/gh-cp"><img src="https://badgen.net/npm/v/gh-cp" alt="npm version"/></a>
  <a href="https://www.npmjs.com/package/gh-cp"><img src="https://badgen.net/npm/license/gh-cp" alt="license"/></a>
  <a href="https://www.npmjs.com/package/gh-cp"><img src="https://badgen.net/npm/dt/gh-cp" alt="downloads"/></a>
  <a href="https://github.com/lirantal/gh-cp/actions/workflows/ci.yml"><img src="https://github.com/lirantal/gh-cp/actions/workflows/ci.yml/badge.svg?branch=main" alt="build"/></a>
  <a href="https://app.codecov.io/gh/lirantal/gh-cp"><img src="https://badgen.net/codecov/c/github/lirantal/gh-cp" alt="codecov"/></a>
  <a href="./SECURITY.md"><img src="https://img.shields.io/badge/Security-Responsible%20Disclosure-yellow.svg" alt="Responsible Disclosure Policy" /></a>
</p>

## Example Usage

Execute with `npx` Node.js package manager quick package executable and copy over from a source user or organization
repository to the local directory

```sh
npx gh-cp user/repo/.github/workflows .
```

Note: you can also execute with `pnpm` via: `pnpm dlx gh-cp `

## Install

Install globally with `pnpm` or with `npm`:

```sh
# install with pnpm globally
pnpm add -g gh-cp

# or install with npm globally
npm install -g gh-cp
```

**Requirements:** Node.js **24+**. Optional but recommended: [GitHub CLI](https://cli.github.com/) (`gh`) and/or `git` on your `PATH` for auth and fewer HTTPS rate limits.

## Usage

```sh
# Copy a repo subtree into the current directory (like cp -r repo/.devcontainer .)
npx gh-cp lirantal/npq/.devcontainer .

# Explicit destination and branch
npx gh-cp cli/cli --path ./upstream --ref trunk

# Preview and machine-readable summary
npx gh-cp cli/cli/README.md --dry-run --verbose
npx gh-cp cli/cli/README.md --json .

# Save a reusable source and install from it later
npx gh-cp alias devcontainer github.com/lirantal/create-node-lib/tree/main/template/.devcontainer/
npx gh-cp alias list
npx gh-cp install devcontainer .
npx gh-cp install
```

On success, gh-cp prints a short **stdout** summary (for example `✔︎ copied …`) unless you pass **`--json`** (then only JSON is printed). Errors go to **stderr** with the version and a clear reason when the repo path or ref is wrong. See [CLI output & errors](./docs/features/cli-output-and-errors.md).

### Flags

| Flag | Description |
|------|-------------|
| `-h`, `--help` | Usage |
| `-V`, `--version` | Version |
| `-v`, `--verbose` | Log strategy and progress to stderr |
| `--path DIR` | Output directory (overrides optional second positional) |
| `--ref REF` | Branch, tag, or SHA (overrides `#ref` in the source spec) |
| `-f`, `--force` | Overwrite existing files |
| `--dry-run` | Show planned writes without writing |
| `--json` | Print JSON output for copy summaries and alias listings |

Source syntax: `owner/repo[/path][#ref]` (also supports GitHub web path forms like `owner/repo/blob/ref/path`). Details: [docs/features/source-spec.md](./docs/features/source-spec.md).

### Aliases and install

Save frequently used sources as aliases:

```sh
npx gh-cp alias devcontainer github.com/lirantal/create-node-lib/tree/main/template/.devcontainer/
```

List saved aliases:

```sh
npx gh-cp alias list
```

Install directly from an alias:

```sh
npx gh-cp install devcontainer .
```

Run `npx gh-cp install` without an alias name to choose from saved aliases in a built-in interactive menu. The menu uses Node.js TTY APIs, so it only runs in an interactive terminal; pass an alias name when scripting or using `--json`. See [Aliases and install](./docs/features/aliases-and-install.md).

## Documentation

- [docs/README.md](./docs/README.md) — overview and feature index
- [Aliases and install](./docs/features/aliases-and-install.md) — save reusable sources and choose them interactively
- [CLI output & errors](./docs/features/cli-output-and-errors.md) — success line, stderr errors, exit codes
- [Authentication & strategies](./docs/features/authentication-and-strategies.md) — `gh` → `git` → HTTPS order

## Contributing

Please consult [CONTRIBUTING](./CONTRIBUTING.md) for guidelines on contributing to this project.

## Author

**gh-cp** © [Liran Tal](https://github.com/lirantal), Released under the [Apache-2.0](./LICENSE) License.

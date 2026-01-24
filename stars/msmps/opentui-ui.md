---
repo: msmps/opentui-ui
url: 'https://github.com/msmps/opentui-ui'
homepage: null
starredAt: '2025-12-28T21:31:09Z'
createdAt: '2025-12-26T11:44:18Z'
updatedAt: '2026-01-23T10:36:49Z'
language: TypeScript
license: NA
branch: main
stars: 114
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2026-01-24T22:32:32.883Z'
description: UI component library for terminal applications built on @opentui/*
tags: []
---

# @opentui-ui

UI component library for terminal applications built on [@opentui/core](https://github.com/sst/opentui).

## Packages

| Package                                 | Description                         | npm                                                                                                         |
| --------------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| [@opentui-ui/dialog](./packages/dialog) | Dialogs made easy                   | [![npm](https://img.shields.io/npm/v/@opentui-ui/dialog)](https://www.npmjs.com/package/@opentui-ui/dialog) |
| [@opentui-ui/toast](./packages/toast)   | Sonner-inspired toast notifications | [![npm](https://img.shields.io/npm/v/@opentui-ui/toast)](https://www.npmjs.com/package/@opentui-ui/toast)   |

## Installation

```bash
# Install a specific package
bun add @opentui-ui/toast
```

## Development

```bash
# Install dependencies
bun install

# Build all packages
bun run build

# Lint & format
bun run lint
bun run format

# Clean build artifacts
bun run clean
```

### Release workflow

1. Push changes to `main` with changeset files
2. GitHub Actions creates a "Version Packages" PR
3. Review the PR (it updates versions and changelogs)
4. Merge the PR to publish to npm with provenance

## License

MIT

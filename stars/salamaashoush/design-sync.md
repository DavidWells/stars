---
repo: salamaashoush/design-sync
url: 'https://github.com/salamaashoush/design-sync'
homepage: ''
starredAt: '2024-05-16T16:01:17Z'
createdAt: '2023-02-15T16:09:08Z'
updatedAt: '2024-06-06T11:23:11Z'
language: TypeScript
license: MIT
branch: main
stars: 14
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:30.214Z'
description: Set of tools to help you sync your design tokens across platforms.
tags: []
---

<p align="center">
 <img style="display:block;" align="center" src="./assets/logo.png" width="200" />
</p>
<h1 align="center">DesignSync</h1>
<h4 align="center">Set of tools to help you sync your design tokens across platforms.</h3>
<p align="center">🚧 In early development. 🚧</p>

## Packages

- [@design-sync/cli](./apps/cli/README.md)
- [@design-sync/manager](./apps/manager/README.md)
- [@design-sync/css-plugin](./packages/css-plugin/README.md)
- [@design-sync/json-plugin](./packages/json-plugin/README.md)
- [@design-sync/vanilla-extract-plugin](./packages/vanilla-extract-plugin/README.md)
- [@design-sync/utils](./packages/utils/README.md)
- [@design-sync/w3c-dtfm](./packages/w3c-dtfm/README.md)

## Figma plugin

- [Figma plugin](./apps/figma-plugin/README.md)

## Development

### Install dependencies

```bash
pnpm install
```

### Running tasks across packages

```bash
pnpm run test|lint|build
```

### Changeset
  
```bash
pnpm run changeset
```

### Publish

Github Actions version packages based on changeset commits and create a PR to changes versions once merged to main it will publish the packages to npm.

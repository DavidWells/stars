---
repo: devbookhq/ui
url: 'https://github.com/devbookhq/ui'
homepage: 'https://usedevbook.com'
starredAt: '2022-09-01T19:09:03Z'
createdAt: '2022-01-25T09:22:16Z'
updatedAt: '2024-02-12T02:40:37Z'
language: TypeScript
license: NOASSERTION
branch: master
stars: 10
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:35.261Z'
description: Monorepo with Devbook's webapps and packages
tags:
  - code
  - component-library
  - devbook
  - docs
  - documentation
  - editor
  - javascript
  - playground
  - react
  - sandbox
  - typescript
  - ui
  - vm
---

# Devbook UI
Monorepo for all Devbook's webapps and packages.

## Development

This whole repo is a pnpm **workspace** that has multiple **packages** in the [`apps/`](./apps/) and [`packages/`](./packages) subdirectories.

### Initial installation
In the top directory run `pnpm install` to install deps in all packages.

### Installing dependencies
Run `pnpm install <deps>` in any subdirectory to install the dependencies there.

Run `pnpm install <deps> --filter <package-name-or-regex>` to install dependencies in specified packages.

> https://turbo.build/repo/docs/core-concepts/monorepos/filtering

### Developing
Run `pnpm dev` to start watching and compiling all changes in this monorepo.

### Commands overview
- `pnpm install` - Install dependencies for all packages and app
- `pnpm build` - Build all packages and apps
- `pnpm dev` - Develop all packages and apps
- `pnpm lint` - Lint all packages
- `pnpm changeset` - Generate a changeset (it will guide you)
- `pnpm version-packages` - Create changelog from the changeset and increment packages' versions accordingly
- `pnpm clean` - Clean up all `node_modules` and `dist` folders (runs each package's clean script)

## Deployment
Run `pnpm changeset` to mark packages you want to release then run `pnpm version-packages` and commit the resulting changes. Marked packages will be published when you push to `master`.

**If the deployment fails don't run the previous commands again, just fix the error and push to `master`.**

## Improvement
Check how to handle internal packages
https://github.com/formbricks/formbricks/blob/main/packages/react/package.json
 

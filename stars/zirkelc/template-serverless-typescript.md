---
repo: zirkelc/template-serverless-typescript
url: 'https://github.com/zirkelc/template-serverless-typescript'
homepage: ''
starredAt: '2025-07-04T19:38:14Z'
createdAt: '2025-04-07T12:03:59Z'
updatedAt: '2025-07-04T19:38:14Z'
language: TypeScript
license: MIT
branch: main
stars: 1
isPublic: true
isTemplate: true
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-07-12T22:31:52.892Z'
description: Template for a Serverless TypeScript project
tags: []
---

# Serverless TypeScript Template

This template provides an opinionated setup for a Serverless TypeScript project.

## Serverless Framework

This template uses the Serverless Framework fork [osls](https://github.com/oss-serverless/serverless) to deploy the service. It comes with built-in TypeScript types and supports Lambda functions written in ESM and TypeScript.

See [`serverless.ts`](./serverless.ts) for the service configuration and the [docs](https://github.com/oss-serverless/serverless/tree/main/docs) for more information.

## Getting Started

### 1. Create a new repository

Create a new repository [using this template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template)

### 2. Replace placeholders

Replace all occurences of the following placeholders with the correct values:

| Placeholder | File | Description |
| --- | --- | --- |
| `<SERVICE>` | `serverless.ts` | Your service name |
| `<PACKAGE>` | `package.json` | Your package name |
| `<DESCRIPTION>` | `package.json` | Your package description |
| `<USERNAME>` | `package.json` | Your GitHub username |
| `<REPO>` | `package.json` | Your repository name |
| `<AUTHOR>` | `package.json` | Your name |
| `<LICENSE>` | `package.json` | Your license |

### 3. Install, Build, Test, Deploy

Verify your project is working by running `install`, `build`, `test`, and `deploy`:

```sh
pnpm install
pnpm build
pnpm test
pnpm deploy
```

Happy coding! 🎉


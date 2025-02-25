---
repo: tajo/ladle
url: 'https://github.com/tajo/ladle'
homepage: 'https://www.ladle.dev'
starredAt: '2022-03-21T01:28:04Z'
createdAt: '2020-07-14T06:56:46Z'
updatedAt: '2025-02-25T12:10:45Z'
language: TypeScript
license: MIT
branch: main
stars: 2680
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:56.721Z'
description: "\U0001F944 Develop, test and document your React story components faster."
tags:
  - components
  - documentation
  - esbuild
  - javascript
  - playground
  - react
  - stories
  - styleguide
  - testing
  - typescript
  - ui
  - vitejs
---

<p align="center">
  <a href="https://ladle.dev" target="_blank" rel="noopener noreferrer">
    <img width="180" src="https://raw.githubusercontent.com/tajo/ladle/main/packages/website/static/img/logo-gray.svg" alt="Ladle logo">
  </a>
</p>
<br/>

<p align="center">
  <a href="https://npmjs.com/package/@ladle/react"><img src="https://img.shields.io/npm/v/@ladle/react.svg" alt="npm package"></a>
  <a href="https://github.com/tajo/ladle/actions/workflows/ci.yml"><img src="https://github.com/tajo/ladle/actions/workflows/ci.yml/badge.svg?branch=main" alt="build status"></a>
  <a href="https://discord.gg/H6FSHjyW7e"><img src="https://img.shields.io/badge/chat-discord-blue?style=flat&logo=discord" alt="discord chat"></a>
  <a href="https://twitter.com/ladlejs"><img src="https://img.shields.io/twitter/follow/ladlejs?style=social" alt="twitter profile"></a>
  <a href="https://ladle.dev"><img src="https://img.shields.io/website?url=https%3A%2F%2Fladle.dev" alt="homepage"></a>
  <a href="https://ladle.dev/new"><img src="https://img.shields.io/badge/stackblitz-sandbox-orange" alt="stackblitz"></a>
</p>
<br/>

![Ladle BaseWeb](https://raw.githubusercontent.com/tajo/ladle/main/packages/website/static/img/ladle-baseweb.png)

Ladle is an environment to develop, test, and share your React components faster.

- [Documentation](https://www.ladle.dev)
- [Demo](https://react-movable.pages.dev)
- [Twitter](https://twitter.com/ladlejs)
- [StackBlitz](https://ladle.dev/new)
- [Discord](https://discord.gg/H6FSHjyW7e)

## Quick start

```bash
mkdir my-ladle
cd my-ladle
pnpm init
pnpm add @ladle/react react react-dom
mkdir src
echo "export const World = () => <p>Hey</p>;" > src/hello.stories.tsx
pnpm ladle serve
```

with yarn

```bash
mkdir my-ladle
cd my-ladle
yarn init --yes
yarn add @ladle/react react react-dom
mkdir src
echo "export const World = () => <p>Hey</p>;" > src/hello.stories.tsx
yarn ladle serve
```

with npm

```bash
mkdir my-ladle
cd my-ladle
npm init --yes
npm install @ladle/react react react-dom
mkdir src
echo "export const World = () => <p>Hey</p>;" > src/hello.stories.tsx
npx ladle serve
```

---
repo: jherr/create-mf-app
url: 'https://github.com/jherr/create-mf-app'
homepage: null
starredAt: '2021-11-13T19:54:56Z'
createdAt: '2021-10-08T01:57:49Z'
updatedAt: '2025-02-24T12:43:47Z'
language: TypeScript
license: MIT
branch: main
stars: 764
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:38.735Z'
description: CLI app to create Module Federation applications
tags: []
---

# create-mf-app

[![npm version](https://badge.fury.io/js/create-mf-app.svg)](https://badge.fury.io/js/create-mf-app) [![npm version](https://img.shields.io/npm/dm/create-mf-app.svg)](https://badge.fury.io/js/create-mf-app)

Creates a Module Federation application, API server, or library based on one of multiple different templates.

## Usage

```shell
npx create-mf-app
```

These projects are not production complete. They are designed as lightweight projects that can be used to quickly prototype a new feature or library.

## CLI Usage

Without any arguments, the CLI will prompt you for the information required to create the project.

```shell
npx create-mf-app@latest
```

You can also get help for the CLI for the options available.

```shell
npx create-mf-app@latest --help
```

You can create an application using CLI options:

```shell
npx create-mf-app@latest --name my-remote --port 8080 --css Tailwind --template react-19
```

Shorthand versions of each option are also available:

```shell
npx create-mf-app@latest -n my-remote -p 8080 -c Tailwind -t react-19
```

## Programmatic Usage

```js
const { buildProject } = require("create-mf-app");

buildProject({
  type: "Application",
  name: "my-remote",
  port: "8080",
  framework: "react-19",
  css: "Tailwind",
});
```

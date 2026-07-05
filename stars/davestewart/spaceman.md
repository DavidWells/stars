---
repo: davestewart/spaceman
url: 'https://github.com/davestewart/spaceman'
homepage: ''
starredAt: '2022-12-09T23:32:45Z'
createdAt: '2022-10-09T02:04:52Z'
updatedAt: '2024-12-14T10:39:34Z'
language: JavaScript
license: NA
branch: main
stars: 31
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:00:04.844Z'
description: Manage monorepo workspaces with a prompt-based CLI
tags:
  - monorepo
  - npm
  - npm-workspaces
  - pnpm
  - turborepo
  - workspace-management
  - workspace-manager
  - yarn-workspaces
---

# Spaceman

> Manage monorepo workspaces with a prompt-based CLI

<p align="center">
  <img src="https://raw.githubusercontent.com/davestewart/spaceman/master/res/splash.png" alt="Spaceman">
</p>

## Abstract

[Monorepos](https://turbo.build/repo/docs/handbook/what-is-a-monorepo) provide a way to manage multiple self-contained applications and packages within a single codebase:

```
+- my-awesome-app
    +- apps
    |   +- backend
    |   |   +- package.json
    |   +- frontend
    |   |   +- package.json
    +- packages
    |   +- tools
    |   |   +- package.json
    |   +- utils
    |       +- package.json
    + package.json
```

[Workspaces](https://turbo.build/repo/docs/handbook/workspaces) are the building blocks of monorepos, but require a certain amount of knowledge, configuration and terminal-fu for everyday tasks.

Spaceman simplifies complex or multistep workspace tasks by presenting them as prompts, and batching commands on confirmation:

<p align="center">
  <img src="https://raw.githubusercontent.com/davestewart/spaceman/master/res/spaceman.gif" alt="Spaceman CLI">
</p>

Why read the docs when you can just answer questions?

Spaceman supports [NPM](https://docs.npmjs.com/cli/v8/using-npm/workspaces) and [Yarn](https://classic.yarnpkg.com/lang/en/docs/workspaces/) with support for [PNPM](https://pnpm.io/workspaces) coming in the next release. It also plays nice with monorepo tools such as [Turborepo](https://turborepo.org/), [Lerna](https://lerna.js.org/) and [Rush](https://rushjs.io/). 

## Overview

The following tasks are available:

**Scripts**

- [Run](#run)<br>
  Run any root or package script

**Packages**

- [Install](#install)<br>
  Install one or more packages to a workspace
- [Uninstall](#uninstall)<br>
  Uninstall one or more packages from a workspace
- [Update](#update)<br>
  Update one or more packages in a workspace
- [Reset](#reset)<br>
  Remove all Node modules-related files in the root and all workspaces, and reinstall

**Workspaces**

- [Share](#share)<br>
  Make a workspace available for use within another workspace
- [Group](#group)<br>
  Add a new top-level workspace group
- [Add](#add)<br>
  Add a new workspace
- [Remove](#remove)<br>
  Remove an existing workspace

## Setup

Install the library via NPM:

```bash
npm i spaceman --save-dev
```

## Usage

Run the library by typing its name:

```bash
spaceman
```

You should immediately see set of navigable tasks:

```
? 🚀 Task … 
  Scripts
  ❯ run
  Packages
    install
    uninstall
    update
    reset
  Workspaces
    share
    group
    add
    remove
```

To run a specific task, pass the task name as a second argument:

```
spaceman install
```

Choose a task to run it and view further options:

```
✔ 🚀 Task · install
? Workspace … 
  apps
  ❯ docs
    web
  packages
    eslint-config-custom
    tsconfig
    ui
```

The choices should be self-explanatory, but check the documentation below for more detail.

# Tasks

## Scripts

### Run

Run any root or package script:

```
Script              - type to filter scripts (use spaces for partial matching)
```

Confirming will run the selected script.

See [Configuration](#configuration) for additional options.

## Packages

### Install

Install one or more packages to a workspace:

```
Workspace           - pick the target workspace to install to
Packages            - type a space-separated list of packages to install
Dependency type     - pick one of normal, development, peer
```

Confirming will install the new packages.

### Uninstall

Uninstall one or more packages from a workspace:

```
Workspace           - pick the target workspace to uninstall from
Packages            - pick one or more packages to uninstall
```

Confirming will remove the selected packages.

### Update

Update one or more packages in a workspace:

```
Workspace           - pick the target workspace to update
Packages            - type a space-separated list of packages to install
```

Confirming will update the selected packages.

### Reset

Remove all Node modules-related files in the root and all workspaces, and reinstall:

```
Confirm reset?      - confirm to reset root and workspaces
```

Confirming will:

- remove all `lock` files
- remove all `node_modules` folders
- re-run `npm|pnpm|yarn install`

Running `reset` can get you out of tricky situations where workspace installs [fail](https://github.com/npm/cli/issues/3847) or your IDE reports that seemingly-installed workspaces aren't. 

## Workspaces

### Share

Make a workspace available for use within another workspace:

```
Source workspace    - pick the source workspace to share
Target workspace(s)  - pick the target workspace(s) to update
```

Confirming will:

- set the source workspace as a dependency of the target workspace
- run `npm|pnpm|yarn install`

### Group

Add a new workspace group:

```
Group name          - type a name for the new group
```

Confirming will:

- create a new top-level folder
- add it to the list of workspaces in `package.json`
- ask if the user wants to [add](#add) a new workspace

### Add

Add a new workspace:

```
Workspace group     - pick the target workspace group
Workspace info
 - Workspace        - add name, optional description and `main` file
 - Dependencies     - add optional dependencies
 - Scripts          - add optional scripts
```

Confirming will:

- create a new workspace folder
- create a private package file
- create a stub `"main": "index.ts/js"` file with named export
- optionally install dependencies

### Remove

Remove an existing workspace:

```
Workspace           - pick the target workspace
Type to confirm     - type the name of the workspace to confirm deletion
```

Confirming will:

- remove the dependency from other workspaces
- uninstall workspace dependencies 
- remove the workspace folder
- optionally update the `workspaces` list


## Configuration

Some of Spaceman's tasks can be configured.

To do this, add a `spaceman` section to your `package.json` and include the relevant sections:

```json5
{
  "spaceman": {
    "scripts": {
      // regexp to exclude scripts from `run` list, e.g. scripts that start with ~
      "exclude": "^~",
      
      // autocomplete match algorithm; choose between "tight" (default) or "loose" 
      "match": "loose",
    }
  }
}
```

Some information on the `script.match` types:

- `tight`: matches on sequential characters, use spaces to start new match groups, i.e. `cli dev`
- `loose`: matches on any character, i.e. `clde`

## Finally...

If you like the package, a [tweet](https://twitter.com/intent/tweet?text=🧑‍🚀%20Spaceman%20is%20a%20new%20package%20by%20%40dave_stewart%20to%20easily%20manage%20NPM%20and%20Yarn%20monorepo%20tasks%20via%20a%20prompt-based%20CLI%20🚀%0A%0Ahttps%3A//github.com/davestewart/spaceman%0A%0A%23javascript%20%23node%20%23monorepo) is always helpful; be sure to let me know via [@dave_stewart](https://twitter.com/dave_stewart).

Thanks!

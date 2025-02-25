---
repo: avegancafe/regen-cli
url: 'https://github.com/avegancafe/regen-cli'
homepage: null
starredAt: '2020-05-26T03:50:39Z'
createdAt: '2016-11-13T03:20:43Z'
updatedAt: '2020-05-27T22:05:56Z'
language: JavaScript
license: MIT
branch: master
stars: 4
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:51.037Z'
description: An opinionated React CLI
tags:
  - react
  - react-boilerplate
  - redux
  - regen
  - regen-cli
  - webpack
---

# regen-cli
An opinionated React CLI

## Installation

```bash
npm install --global regen-cli
```

## Usage

There are four commands:

```bash
regen project <project name>
regen component <component name>
regen reducer <reducer name>
regen config <option name> <option value>
```

### `regen project <project name>`
Generate a new React project with the name `<project name>`

To set up your project after generating all of the source and config files,
you will need to go into your new directory and run `yarn install` to install
all of your node modules. To start development, use `npm start` to spin up a
webpack dev server.

#### Caveats
- Expects there to be no folder with name `<project name>`
in the current folder.

### `regen component <component name>`
Generate a new React component with the name `<component name>`
- Will put a React component with the name `<component name>`
in `<project root>/src/javascripts/components/` if it can find a project root.
If not, it'll say that it cannot find a `package.json`.
- Passing the `-f` flag to `regen component <component name>` will create a stateless
functional component instead.

### `regen reducer <reducer name> [<action name>]`
Generate a new Redux reducer with the name `<reducer name>` and a new set of base
actions with the name `<reducer name>`.
- Will put a Redux reducer with the name `<reducer name>` in
`<project root>/src/javascripts/reducers/` if it can find a project root.
If not, it'll say that it cannot find a `package.json`.
- Will put a set of default action constants with the names `CREATE_<reducer name>`
and `DELETE_<reducer name>` in
`<project root>/src/javascripts/actions/`.
- If you pass the optional `<action name>`, it will name the actions constants file with this name.
This is particularly useful if you are saving your actions and reducers in the same folder.
If you do not pass an action name, it will use the reducer name for the actions constants file.

### `regen config <option name> <option value>`
Save configuration for regen in `.regenrc.json`

Possible options that can be set are:

| Option         | Description             |
| ---------------| ------------------------|
| `actionPath`   | Path where all actions constants will be saved |
| `reducerPath`  | Path where all reducers will be saved|


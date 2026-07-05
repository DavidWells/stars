---
repo: fabiospampinato/autogit
url: 'https://github.com/fabiospampinato/autogit'
homepage: 'http://fabiospampinato.com/autogit'
starredAt: '2018-10-31T20:19:33Z'
createdAt: '2018-10-08T04:03:34Z'
updatedAt: '2024-11-02T08:23:02Z'
language: TypeScript
license: MIT
branch: master
stars: 472
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:08.273Z'
description: 'Define commands, using plugins, to execute across all your repositories.'
tags:
  - autogit
  - automator
  - bulk
  - git
  - plugins
---


# Autogit

Define commands, using plugins, to execute across all your repositories.

## Features

Autogit allows you to automate many tedious tasks, here are some practical tasks that can you can configure it to do:

- Pull/push to/from origin, across all your repositories, with one command.
- Edit multiple readmes and have autogit make the commits and pushing them, maybe even bumping the projects' versions and publishing them.
- Synchronize all your repositories' descriptions and keywords with GitHub.
- ...basically anything you want, across all, or some, of your repositories.

## Install

```sh
npm install -g autogit
```

## Usage

#### Wizard

<p align="center">
  <img src="docs/resources/demo/wizard.gif" alt="Wizard" width="816">
</p>

#### Command

<p align="center">
  <img src="docs/resources/demo/github_sync.gif" alt="GitHub Sync" width="816">
</p>

#### Custom Commands

You can define custom commands via the [configuration](/docs/configuration.md).

You can find most of the commands and plugins made by the community in the [awesome-autogit](https://github.com/fabiospampinato/awesome-autogit) repository.

## License

MIT © Fabio Spampinato

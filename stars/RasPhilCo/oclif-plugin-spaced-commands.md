---
repo: RasPhilCo/oclif-plugin-spaced-commands
url: 'https://github.com/RasPhilCo/oclif-plugin-spaced-commands'
homepage: null
starredAt: '2020-09-29T16:41:12Z'
createdAt: '2018-11-17T01:01:25Z'
updatedAt: '2023-07-25T14:21:29Z'
language: TypeScript
license: NA
branch: master
stars: 5
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:28.952Z'
description: null
tags: []
---

@oclif/plugin-spaced-commands
======

**WARNING: this is an experimental plugin**

convert an oclif CLI to use spaced commands

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-plugin-spaced-commands.svg)](https://npmjs.org/package/oclif-plugin-spaced-commands)

[![CircleCI](https://circleci.com/gh/RasPhilCo/oclif-plugin-spaced-commands/tree/master.svg?style=shield)](https://circleci.com/gh/RasPhilCo/oclif-plugin-spaced-commands/tree/master)

[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/RasPhilCo/oclif-plugin-spaced-commands?branch=master&svg=true)](https://ci.appveyor.com/project/RasPhilCo/oclif-plugin-spaced-commands/branch/master)
[![Codecov](https://codecov.io/gh/RasPhilCo/oclif-plugin-spaced-commands/branch/master/graph/badge.svg)](https://codecov.io/gh/RasPhilCo/oclif-plugin-spaced-commands)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-plugin-spaced-commands.svg)](https://npmjs.org/package/oclif-plugin-spaced-commands)
[![License](https://img.shields.io/npm/l/oclif-plugin-spaced-commands.svg)](https://github.com/RasPhilCo/oclif-plugin-spaced-commands/blob/master/package.json)

Instead of oclif's standard colon-seperated commands:

```
$ mycli foo:bar:baz qux
```

this plugin converts oclif's command ID parsing to use spaced commands:

```
$ mycli foo bar baz qux
```

> Note: topic index commands (topic-commands) are therefore ignored

# Install

Add `@oclif/plugin-spaced-commands` as a package dependency and to oclif's plugins list in package.json

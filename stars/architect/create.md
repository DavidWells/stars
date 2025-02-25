---
repo: architect/create
url: 'https://github.com/architect/create'
homepage: 'https://arc.codes'
starredAt: '2021-04-14T16:59:12Z'
createdAt: '2019-08-30T15:33:44Z'
updatedAt: '2024-09-28T23:01:13Z'
language: JavaScript
license: Apache-2.0
branch: main
stars: 7
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:51.358Z'
description: >-
  Module to bootstrap Architect projects, and idempotently create new project
  resources
tags: []
---

[<img src="https://assets.arc.codes/architect-logo-500b@2x.png" width=500>](https://www.npmjs.com/package/@architect/create)

## [`@architect/create`](https://www.npmjs.com/package/@architect/create)

> Architect Create: Bootstrap new Architect projects, and idempotently create new project resources

[![GitHub CI status](https://github.com/architect/create/workflows/Node%20CI/badge.svg)](https://github.com/architect/create/actions?query=workflow%3A%22Node+CI%22)


## Create a new Architect project

```
npm init @architect [--runtime [node, deno, ruby, python]] [project name and/or path]
```

Example:

> `npm init @architect` ......... create project named for current dir in current dir

> `npm init @architect ./` ...... create project named for current dir in current dir

> `npm init @architect foo` ..... create project named `foo` in current dir

> `npm init @architect ./foo` ... create `./foo` dir and project named `foo` that dir

> `npm init @architect ../foo` .. create `../foo` dir and project named `foo` that dir

> `npm init @architect /foo` .... create `/foo` dir, creates project named `foo` that dir

> `npm init @architect ../` ..... create project in .. for named for whatever .. is named

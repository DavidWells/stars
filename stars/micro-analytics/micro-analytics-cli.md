---
repo: micro-analytics/micro-analytics-cli
url: 'https://github.com/micro-analytics/micro-analytics-cli'
homepage: ''
starredAt: '2017-01-10T19:59:14Z'
createdAt: '2017-01-07T12:12:28Z'
updatedAt: '2024-11-19T08:22:56Z'
language: JavaScript
license: MIT
branch: master
stars: 733
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:49.358Z'
description: "Public analytics as a Node.js microservice. No sysadmin experience required! \U0001F4C8"
tags:
  - analytics
  - analytics-server
  - micro
  - microservice
  - node-microservice
  - nodejs
---

# `micro-analytics` 📈

Public analytics as a Node.js microservice, no sysadmin experience required.

[![Build Status](https://travis-ci.org/micro-analytics/micro-analytics-cli.svg?branch=master)](https://travis-ci.org/micro-analytics/micro-analytics-cli) [![codecov](https://codecov.io/gh/micro-analytics/micro-analytics-cli/branch/master/graph/badge.svg)](https://codecov.io/gh/micro-analytics/micro-analytics-cli) [![node](https://img.shields.io/node/v/micro-analytics-cli.svg)]()


A tiny analytics server, easy to run and hack around on. It does one thing, and it does it
well: count the views of something and making the views publicly accessible via an API.
It supports custom database adapters so you can use your storage engine of choice.

(there is currently no frontend to display pretty graphs, feel free to build one yourself!)

This is a lerna repo with several packages in the same repository. There is more
info in on each package in their subfolder:

#### [micro-analytics-cli](packages/micro-analytics-cli) [![micro-analytics-cli](https://img.shields.io/npm/v/micro-analytics-cli.svg)]()

The main package used to run micro-analytics.

```shell
npm install -g micro-analytics-cli
micro-analytics --help
```

#### [micro-analytics-adapter-utils](packages/adapter-utils) [![micro-analytics-adapter-utils](https://img.shields.io/npm/v/micro-analytics-adapter-utils.svg)]()

A package that contains several useful utilities and tests that will make it easier
to create storage adapters.

#### [micro-analytics-adapter-flat-file-db](packages/adapter-flat-file-db) [![micro-analytics-adapter-flat-file-db](https://img.shields.io/npm/v/micro-analytics-adapter-flat-file-db.svg)]()

The default storage adapter. It stores the data in a single file. This adapter is
automatically installed by micro-analytics-cli.

#### [micro-analytics-adapter-memory](packages/adapter-memory) [![micro-analytics-adapter-memory](https://img.shields.io/npm/v/micro-analytics-adapter-memory.svg)]()

A storage adapter that keeps everything in memory, when using this all data will be lost
when the app restarts.

## Community adapters

- [`micro-analytics-adapter-redis`](https://github.com/micro-analytics/micro-analytics-adapter-redis)
- [`micro-analytics-adapter-mongodb`](https://github.com/esakkiraj/adapter-mongodb)
- [`micro-analytics-adapter-postgres`](https://github.com/toddheslin/micro-analytics-adapter-postgres)

## Demo

We have a demo instance on [demo.micro-analytics.io](https://demo.micro-analytics.io/visited)
automatically deploys the master branch from this repository. Feel free to use it to test
your clients.

## License

Copyright ©️ 2017 Maximilian Stoiber & Rolf Erik Lekang, licensed under the MIT License. See [`license.md`](./license.md) for more information.

---
repo: threadheap/serviceless
url: 'https://github.com/threadheap/serviceless'
homepage: ''
starredAt: '2018-01-08T07:26:57Z'
createdAt: '2017-12-20T10:35:55Z'
updatedAt: '2023-04-14T09:13:10Z'
language: JavaScript
license: MIT
branch: master
stars: 23
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:31.621Z'
description: '[DEPRECATED] Cli tool on top of Serverless framework'
tags:
  - aws
  - aws-lambda
  - cli
  - devops
  - serverless
  - serverless-framework
---

# [DEPRECATED]
[serverless-components](https://github.com/serverless/components) solve the problem

# serviceless

**Serviceless** - cli tool on top of Serverless framework, that simplifies workflow with multiple services.

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![Build Status](http://circleci-badges-max.herokuapp.com/img/threadheap/serviceless?token=4482e2625fab30eeca954eec94a73091532f7883)](https://circleci.com/gh/8bites/serviceless) [![codecov](https://codecov.io/gh/8bites/serviceless/branch/master/graph/badge.svg)](https://codecov.io/gh/8bites/serviceless)
[![npm version](https://badge.fury.io/js/serviceless.svg)](https://badge.fury.io/js/serviceless)
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)

# Quick start

<img align="right" width="400" src="./assets/deploy_all.gif" />

1. Install serverless framework

```sh
npm install serverless -g
```

2. Install serviceless cli

```sh
npm install serviceless -g
```

3. Deploy

```sh
slx deploy all
```

# How to

## Deploy

#### Deploy all services in a folder

```sh
slx deploy all
```

#### Deploy service with command line prompt

```sh
slx deploy
```

then select service or folder from the list.

#### Deploy service, matching string

```sh
slx deploy <query>
```

### Deploy with cli options

Every serverless option that you set will be propagated to the `sls deploy` command accordingly:

```sh
slx deploy all --stage prod --region eu-central-1
```

will deploy to `prod` stage and `eu-central-1` region.

### Deploy with environment variables

slx will share all enviroment variables with serverless process, so

```sh
MY_SECRET=foo slx deploy all
```

will be injected into serverless config.

### Deploy Flags

<img align="right" width="400" src="./assets/deploy_all_verbose.gif" />

`-b`, `--runInBand` - deploy services one by one (parallel by default)

`-e`, `--exitOnFailure` - stop deployment of other services on failure

`-r`, `--rollbackOnFailure` - rollback services on deployment failure
Makes sense to spar with `--exitOnFailure` flag to stop on failure and rollback.

`-v`, `--verbose` - show serverless output

## Help

```sh
slx --help
slx deploy --help
```

# What's next

* [x] add option to rollback to previous state on fail
* [ ] aggregate logs for multiple services
* [ ] add configuration file to deploy in band services that rely on each other
* [ ] save and restore `.serverless` folders to use as deployment artifacts for CI/CD tools

# Contributions

Yes, please!

Clone repo, then

```sh
npm install
npm test
```

# LICENCE

MIT @ [Pavel Vlasov](https://github.com/pavelvlasov)

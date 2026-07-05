---
repo: zotoio/serverless-central
url: 'https://github.com/zotoio/serverless-central'
homepage: null
starredAt: '2020-03-23T00:39:01Z'
createdAt: '2018-04-23T02:56:34Z'
updatedAt: '2024-02-07T22:52:39Z'
language: TypeScript
license: NA
branch: master
stars: 37
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:02.406Z'
description: sample lambda mono repo
tags: []
---

# serverless-central

This is a monorepo of serverless functions built using yeoman.io generator https://github.com/zotoio/generator-mono-serverless

## install
Clone this repo.  And perform setup listed at https://github.com/zotoio/generator-mono-serverless

## structure
All functions are in directories under /packages

Each function has a standalone serverless.yml for independent deployment, while also sharing global libraries and build/test/linting frameworks.

## extending
You can add new function packages by running the yeoman sub-generator:
```
yo mono-serverless:package
```
..and following prompts.  This will give you the scaffolding for a new serverless function.

## deploy
To deploy a given function, go to the `packages/[function]` dir and run: 
```
yarn run sls-deploy
```
This script will assemble inherited env vars, lint, test and compile the Lambda function, and deploy it to AWS.



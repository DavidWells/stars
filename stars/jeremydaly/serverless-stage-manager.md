---
repo: jeremydaly/serverless-stage-manager
url: 'https://github.com/jeremydaly/serverless-stage-manager'
homepage: ''
starredAt: '2018-09-22T22:08:15Z'
createdAt: '2017-10-20T02:15:53Z'
updatedAt: '2024-06-28T14:35:33Z'
language: JavaScript
license: NA
branch: master
stars: 43
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:13.765Z'
description: Super simple serverless plugin for validating stage names before deployment
tags:
  - aws-lambda
  - nodejs
  - serverless
  - serverless-deployments
  - serverless-framework
---

# serverless-stage-manager
Super simple [serverless](http://www.serverless.com) plugin for validating stage names before deployment.

[![Serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![npm](https://img.shields.io/npm/v/serverless-stage-manager.svg)](https://www.npmjs.com/package/serverless-stage-manager)
[![npm](https://img.shields.io/npm/l/serverless-stage-manager.svg)](https://www.npmjs.com/package/serverless-stage-manager)

## Installation

#### Install using Serverless plugin manager
```bash
serverless plugin install --name serverless-stage-manager
```

#### Install using npm

Install the module using npm:
```bash
npm install serverless-stage-manager --save-dev
```

Add `serverless-stage-manager` to the plugin list of your `serverless.yml` file:

```yaml
plugins:
  - serverless-stage-manager
```

## Configuration

Add a `stages` value in the `custom` section of your `serverless.yml` file and specify an array of valid stage names.

```yaml
custom:
  stages:
    - dev
    - staging
    - prod
```

## Usage

When running `serverless deploy` or `serverless deploy function`, it will check to make sure it is a valid stage name before continuing. For example:

```bash
# Given the above configuration of dev, staging & prod

# These will work
serverless deploy -s prod
serverless deploy -s staging
serverless deploy function -f funcName -s dev
serverless deploy # assuming default stage is in custom.stages config

# These will fail
serverless deploy -s foo
serverless deploy function -f funcName -s bar
```

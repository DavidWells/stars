---
repo: mikesouza/serverless-associate-waf
url: 'https://github.com/mikesouza/serverless-associate-waf'
homepage: null
starredAt: '2021-10-31T21:57:59Z'
createdAt: '2019-02-16T19:27:30Z'
updatedAt: '2024-11-21T07:24:45Z'
language: JavaScript
license: MIT
branch: master
stars: 29
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:40.692Z'
description: >-
  Associate a regional WAF with the AWS API Gateway used by your Serverless
  stack.
tags: []
---

# serverless-associate-waf

[![NPM Downloads](https://img.shields.io/npm/dt/serverless-associate-waf)](https://www.npmjs.com/package/serverless-associate-waf) [![Build Status](https://travis-ci.org/MikeSouza/serverless-associate-waf.svg?branch=master)](https://travis-ci.org/MikeSouza/serverless-associate-waf)
[![Coverage Status](https://coveralls.io/repos/github/MikeSouza/serverless-associate-waf/badge.svg?branch=master)](https://coveralls.io/github/MikeSouza/serverless-associate-waf?branch=master)

Associate a regional WAF with the AWS API Gateway used by your Serverless stack.

## Install

`npm install serverless-associate-waf --save-dev`

## Configuration

Add the plugin to your `serverless.yml`:

```yaml
plugins:
  - serverless-associate-waf
```

### Associating a Regional WAF with the API Gateway

Add your custom configuration:

```yaml
custom:
  associateWaf:
    name: myRegionalWaf
    version: Regional #(optional) Regional | V2
```

| Property | Required | Type     | Default | Description                                                    |
|----------|----------|----------|---------|----------------------------------------------------------------|
| `name`   |  `true`  | `string` |         | The name of the regional WAF to associate the API Gateway with |
| `version`|  `false` | `string` | `Regional`| The AWS WAF version to be used|

### Disassociating a Regional WAF from the API Gateway

Remove the `name` property from your custom configuration but keep the `version` if specified, and then deploy the application. The plugin must stay in the plugins list of `serverless.yml` in order for the WAF to be disassociated.

## Usage

Configuration of your `serverless.yml` is all you need.

There are no custom commands, just run: `sls deploy`

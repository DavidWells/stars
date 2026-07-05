---
repo: CruGlobal/serverless-merge-config
url: 'https://github.com/CruGlobal/serverless-merge-config'
homepage: null
starredAt: '2018-12-09T07:24:30Z'
createdAt: '2018-03-11T17:53:21Z'
updatedAt: '2023-05-29T15:01:37Z'
language: JavaScript
license: MIT
branch: master
stars: 23
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:58.706Z'
description: >-
  Serverless plugin that implements configuration merge after variable expansion
  has occurred.
tags: []
---

# Serverless Merge Config
[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![Build Status](https://travis-ci.org/CruGlobal/serverless-merge-config.svg?branch=master)](https://travis-ci.org/CruGlobal/serverless-merge-config)
[![Coverage Status](https://coveralls.io/repos/github/CruGlobal/serverless-merge-config/badge.svg?branch=master)](https://coveralls.io/github/CruGlobal/serverless-merge-config?branch=master)
[![npm version](https://badge.fury.io/js/%40cruglobal%2Fserverless-merge-config.svg)](https://badge.fury.io/js/%40cruglobal%2Fserverless-merge-config)

Serverless merge config adds the ability to merge configuration after serverless variables have been evaluated.

# Installation
Run:
```
# From npm (recommended)
npm install --save-dev @cruglobal/serverless-merge-config

# From github
npm install --save-dev https://github.com/CruGlobal/serverless-merge-config.git
```
Then make the following edits to your serverless.yml file:
```yaml
plugins:
  - '@cruglobal/serverless-merge-config'
  - other-plugins
```
Including serverless-merge-config first will give other plugins access to the merged configuration.

# How it Works

Serverless merge config works similarly to YAML merge except that it merges after serverless has completed variable substitution.

Use `$<<` property to merge:
```yaml
provider:
    name: aws
    $<<: ${file:path/to/other.yml}
```
This will merge everything in `path/to/other.yml` to provider. Duplicate properties will be overridden by the merged value.

It is possible to use array if you want to merge variables from multiple sources:
```yaml
provider:
    name: aws
    $<<:
      - ${file:path/to/other.yml}
      - ${file:path/to/another.yml}
```
This will merge everything in `path/to/other.yml`, then in `file:path/to/another.yml` to provider. Duplicate properties will be overridden by the merged value.

**caveat**: `serverless print` will not show the merged configuration. This command reloads and parses serverless.yml a second time with no hooks for plugins to tie into.

# Contributing
We welcome pull requests!
1. For any sizable change, first open a GitHub issue to discuss your idea.
2. Create a pull request.  Explain why you want to make the change and what it’s for.

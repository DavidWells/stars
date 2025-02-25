---
repo: andrewcurioso/raml-serverless
url: 'https://github.com/andrewcurioso/raml-serverless'
homepage: 'https://www.npmjs.com/package/raml-serverless'
starredAt: '2016-12-06T18:11:18Z'
createdAt: '2016-12-05T22:50:46Z'
updatedAt: '2019-10-15T20:01:37Z'
language: JavaScript
license: MIT
branch: master
stars: 21
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:52.424Z'
description: Work with RAML documentation for Serverless v1.0 projects
tags: []
---

# RAML-Serverless Plugin

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![npm version](https://badge.fury.io/js/raml-serverless.svg)](https://badge.fury.io/js/raml-serverless)
[![Build Status](https://travis-ci.org/andrewcurioso/raml-serverless.svg?branch=master)](https://travis-ci.org/andrewcurioso/raml-serverless)

Work with [RAML](http://raml.org/) documentation for [Serverless v1.0](https://serverless.com/) projects.

Currently it can be used to generate RAML documentation. Future versions will be able to deploy RAML documentents, stub API endpoints based on the RAML and even generate/update serverless.yml files from RAML specifications. For more information, take a look at the [Feature Roadmap](https://github.com/andrewcurioso/raml-serverless/milestones).

## Installation
1. Open a terminal to your Serverless project
2. `npm install --save raml-serverless`
3. Add `raml-serverless` to your `serverless.yml` file (see [Serverless docs](https://serverless.com/framework/docs/providers/aws/guide/plugins/#installing-plugins))

## Usage

Example usage:

```bash
sls raml > docs.raml
```

RAML-Serverless will automatically create a section of the documentation for each HTTP endpoint you have in your `serverless.yml` file.

You can put global documentation in the `custom:` object in your Yaml file and it will be copied as is into the output RAML. Anything that can go into a RAML file can go here. For example:

```yaml
custom:
  documentation:
    raml:
      title: My Awesome API
      version: v1.0
```

Which will result in a RAML file that starts with:

```yaml
#%RAML 1.0
title: My Awsome API
version: v1.0
```

You can also put RAML on individual HTTP event endpoints and they will be included in the output. For example:

```yaml
functions:
  index:
    handler: handlers.index
    events:
      - http:
          path: /hello/world
          method: get
          cors: true
          documentation:
             raml:
               description: Say hello to the world
```

Will produce this output in your RAML file:
```yaml
/hello:
  /world:
    get:
      description: Say hello to the world
```

You can also include your RAML in a seperate file and import it into your `serverless.yml` using variables:

```yaml
custom:
  documentation:
    raml: ${file(raml-base.yml)}
```

## Contributing

This plugin is a work in progress. If you would like to contribute, go to Github issues ([/andrewcurioso/raml-serverless/issues](https://github.com/andrewcurioso/raml-serverless/issues)) and pick an issue to work on or create a new issue.

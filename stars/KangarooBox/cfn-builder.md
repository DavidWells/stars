---
repo: KangarooBox/cfn-builder
url: 'https://github.com/KangarooBox/cfn-builder'
homepage: 'https://kangaroobox.com/software'
starredAt: '2019-11-21T07:14:08Z'
createdAt: '2016-08-26T12:37:19Z'
updatedAt: '2025-02-05T07:02:40Z'
language: Handlebars
license: GPL-2.0
branch: master
stars: 4
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:11.868Z'
description: >-
  A NodeJS command line application that builds AWS CloudFormation templates
  from simple JSON 'blueprints'.
tags:
  - aws
  - aws-cloudformation
  - blueprint
  - cfn-builder
  - cloudformation
  - cloudformation-template
  - json
  - nodejs-command
---

# cfn-builder

cfn-builder is a NodeJS command line application that will convert your JSON "blueprints" to an
AWS CloudFormation template.

## Introduction

The idea behind this project is to create a small number of JSON & Handlebars (.hbs) files (aka Blueprints) that
can be compiled into a larger number of CF templates.  Each project has multiple JSON files describing a particular
environment (i.e. Prod, QA, Dev) which is then compiled against a general blueprint which results in a CloudFormation
template that can be executed.

Visit the [Wiki pages](https://github.com/KangarooBox/cfn-builder/wiki) to get a more detailed rundown on how to use
cfn-builder.

## Dependencies

* Node.js
* npm

## Installing

Install cfn-builder from NPM using the following command line:

    npm -g install cfn-builder

## Testing

N/A (so far)

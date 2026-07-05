---
repo: manwaring/serverless-plugin-iam-checker
url: 'https://github.com/manwaring/serverless-plugin-iam-checker'
homepage: ''
starredAt: '2018-12-09T18:50:51Z'
createdAt: '2018-08-20T20:43:38Z'
updatedAt: '2022-07-06T21:41:03Z'
language: TypeScript
license: MIT
branch: main
stars: 6
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:58.358Z'
description: >-
  A Serverless Framework plugin which automates security checks by preventing
  overly broad IAM configurations (disallowing the use of * resources and
  actions, for example)
tags:
  - iam
  - security
  - serverless
  - serverless-framework
  - serverless-plugin
---

<p align="center">
  <img height="150" src="https://d1wzvcwrgjaybe.cloudfront.net/repos/manwaring/serverless-plugin-iam-checker/readme-category-icon.png">
  <img height="150" src="https://d1wzvcwrgjaybe.cloudfront.net/repos/manwaring/serverless-plugin-iam-checker/readme-repo-icon.png">
</p>

<p align="center">
  <a href="https://npmjs.com/package/serverless-plugin-iam-checker">
    <img src="https://flat.badgen.net/npm/v/serverless-plugin-iam-checker?icon=npm&label=npm@latest"></a>
  <a href="https://www.npmjs.com/package/serverless-plugin-iam-checker">
    <img src="https://flat.badgen.net/npm/dt/serverless-plugin-iam-checker?icon=npm"></a>
  <a href="https://codecov.io/gh/manwaring/serverless-plugin-iam-checker">
    <img src="https://flat.badgen.net/codecov/c/github/manwaring/serverless-plugin-iam-checker/?icon=codecov"></a>
  <a href="https://packagephobia.now.sh/result?p=serverless-plugin-iam-checker">
    <img src="https://flat.badgen.net/packagephobia/install/serverless-plugin-iam-checker"></a>
  <a href="https://www.npmjs.com/package/serverless-plugin-iam-checker">
    <img src="https://flat.badgen.net/npm/license/serverless-plugin-iam-checker"></a>
</p>

<p align="center">
  <a href="https://circleci.com/gh/manwaring/serverless-plugin-iam-checker">
    <img src="https://flat.badgen.net/circleci/github/manwaring/serverless-plugin-iam-checker/master?icon=circleci"></a>
  <a href="https://flat.badgen.net/dependabot/manwaring/serverless-plugin-iam-checker">
    <img src="https://flat.badgen.net/dependabot/manwaring/serverless-plugin-iam-checker/?icon=dependabot&label=dependabot"></a>
  <a href="https://david-dm.org/manwaring/serverless-plugin-iam-checker">
    <img src="https://flat.badgen.net/david/dep/manwaring/serverless-plugin-iam-checker"></a>
  <a href="https://david-dm.org/manwaring/serverless-plugin-iam-checker?type=dev">
    <img src="https://flat.badgen.net/david/dev/manwaring/serverless-plugin-iam-checker/?label=dev+dependencies"></a>
</p>

# Serverless plugin IAM checker

1. [Overview](#overview)
1. [Installation and setup](#installation-and-setup)
1. [Rule configuration](#rule-configuration)
   1. [Default rule configuration](#default-rule-configuration)
   1. [Action rules](#action-rules)
   1. [Resource rules](#resource-rules)
   1. [Setting rules via serverless.yml](#setting-rules-via-serverless.yml)
   1. [Setting rules via environment variables](#setting-rules-via-environment-variables)
1. [Detailed validation logging](#detailed-validation-logging)
1. [Examples](#examples)

_Feedback appreciated! If you have an idea for how this plugin can be improved [please open an issue](https://github.com/manwaring/serverless-plugin-iam-checker/issues/new)._

# Overview

This [Serverless Framework](https://github.com/serverless/serverless) plugin checks all generated IAM resources in a serverless project and validates their permission configurations for overly-permissive actions and/or resource references. If IAM resources are invalid per the configured rules then the `sls` command will fail after the `package` step, preventing the generated CloudFormation Stack from being deployed to AWS.

# Installation and setup

Install and save the package to `package.json` as a dev dependency:

`npm i --save-dev serverless-plugin-iam-checker`

Add the package to the `serverless.yml` plugins section:

```yml
plugins:
  - serverless-plugin-iam-checker
```

By default the plugin uses a [restrictive set of rules for action and resource configuration](#default-rule-configuration). These rules can be modified using either [serverless.yml custom configuration](#setting-rules-via-serverless.yml) or [environment variables](#setting-rules-via-environment-variables).

# Rule configuration

Rules are configured separately for actions and resources due to resources generally having a greater need for dynamic references, while actions can almost always be constrained explicitly. If any of the action or resource rules aren't found in environment variables or the `serverless.yml` custom config section then this plugin will use the default configurations specified in the tables below.

If rule values are found in both environment variables and `serverless.yml` the plugin will use the environment variable values - this is done to help ensure security compliance in build/test/deploy pipelines where developers generally don't have access to underlying environoment variables (as opposed to `serverless.yml`, which they typically have unlimited access to modify).

## Default rule configuration

```yml
actions:
  allowWildcards: false
  allowWildcardOnly: false
  allowedPatterns: []

resources:
  allowWildcards: true
  allowWildcardOnly: false
  allowedPatterns: []
  allowedReferences: []
```

## Action rules

| Property            | Description                                                                                      | Example                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| Allow wildcards     | **Type**: boolean<br/>**Effect**: can actions include wildcards<br/>**Default**: `false`         | **Config**: `false`<br/>**Passes**: `dynamodb:PutItem`<br/>**Fails**: `dynamodb:*`           |
| Allow wildcard only | **Type**: boolean<br/>**Effect**: can actions be only wildcards<br/>**Default**: `false`         | **Config**: `true`<br/>**Passes**: `*`<br/>**Fails**: `dynamodb:*`                           |
| Allowed patterns    | **Type**: string array<br/>**Effect**: actions must match a listed pattern<br/>**Default**: `[]` | **Config**: `['dynamodb:']`<br/>**Passes**: `dynamodb:PutItem`<br/>**Fails**: `s3:PutObject` |

## Resource rules

| Property            | Description                                                                                                  | Example                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| Allow wildcards     | **Type**: boolean<br/>**Effect**: can resources include wildcards<br/>**Default**: `true`                    | **Config**: `false`<br/>**Passes**: `arn:whatever`<br/>**Fails**: `arn:*`                                |
| Allow wildcard only | **Type**: boolean<br/>**Effect**: can resources be only wildcards<br/>**Default**: `false`                   | **Config**: `true`<br/>**Passes**: `*`<br/>**Fails**: `arn:*`                                            |
| Allowed patterns    | **Type**: string array<br/>**Effect**: resources must match a listed pattern<br/>**Default**: `[]`           | **Config**: `['arn:']`<br/>**Passes**: `arn:whatever`<br/>**Fails**: `whatever`                          |
| Allowed references  | **Type**: string array<br/>**Effect**: resource references must match a listed pattern<br/>**Default**: `[]` | **Config**: `['Ref']`<br/>**Passes**: `{ 'Ref': 'whatever' }`<br/>**Fails**: `{ 'Fn::Sub': 'whatever' }` |

## Setting rules via serverless.yml

```yml
custom:
  iamChecker: # This key is used by the plugin to pull in the optional rule configuration
    actions:
      allowWildcards: false
      allowWildcardOnly: false
      allowedPatterns:
        - 'dynamodb:'
    resources:
      allowWildcards: true
      allowWildcardOnly: false
      allowedPatterns:
        - 'arn:'
      allowedReferences:
        - 'Ref'
        - 'Fn::Join'
        - 'Fn::Sub'
```

## Setting rules via environment variables

```bash
# Actions
IAM_CHECKER_ACTIONS_ALLOW_WILDCARDS=false
IAM_CHECKER_ACTIONS_ALLOW_WILDCARDONLY=false
IAM_CHECKER_ACTIONS_ALLOWED_PATTERNS=['dynamodb:']

# Resources
IAM_CHECKER_RESOURCES_ALLOW_WILDCARDS=true
IAM_CHECKER_RESOURCES_ALLOW_WILDCARDONLY=false
IAM_CHECKER_RESOURCES_ALLOWED_PATTERNS=['arn:']
IAM_CHECKER_RESOURCES_ALLOWED_REFERENCES=['Ref', 'Fn::Join', 'Fn::Sub']
```

# Detailed validation logging

For detailed logs about which rules have caused resources to fail validation rerun your commands with `SLS_DEBUG=*`. Output similar to this will be logged:

```
Serverless: Packaging service...
Serverless: Checking IAM permissions...
  IamRoleLambdaExecution has the following validation errors:
    Wildcard-only actions are not allowed
    Wildcards in actions are not allowed
    Actions must match the following patterns: [":"]
    Wildcard-only resources are not allowed
    Resources must match the following patterns: ["arn:"]
```

# Examples

There is [one working example](examples) of how this package can be used in a simple 'hello world' serverless application:

1. [Plugin with default configuration](examples/default)

<img height="0" src="https://b7z7o7y5fi.execute-api.us-east-1.amazonaws.com/v1/readme/visits/github/manwaring/serverless-plugin-iam-checker?style=flat-square">


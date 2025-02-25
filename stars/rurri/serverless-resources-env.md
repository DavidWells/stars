---
repo: rurri/serverless-resources-env
url: 'https://github.com/rurri/serverless-resources-env'
homepage: ''
starredAt: '2016-11-27T09:24:27Z'
createdAt: '2016-11-20T14:47:13Z'
updatedAt: '2021-07-15T20:23:21Z'
language: JavaScript
license: MIT
branch: master
stars: 20
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:14.318Z'
description: >-
  Serverlss framework plugin, which after a deploy, fetches cloudformation
  resource identifiers and sets them on AWS lambdas, and creates local
  ./.serverless-resources-env/.<region>_<stage>_<function-name> file
tags: []
---

[![Build Status](https://travis-ci.org/rurri/serverless-resources-env.svg?branch=master)](https://travis-ci.org/rurri/serverless-resources-env)
[![Coverage Status](https://coveralls.io/repos/github/rurri/serverless-resources-env/badge.svg?branch=master)](https://coveralls.io/github/rurri/serverless-resources-env?branch=master)
[![bitHound Overall Score](https://www.bithound.io/github/rurri/serverless-resources-env/badges/score.svg)](https://www.bithound.io/github/rurri/serverless-resources-env)

A serverless framework plugin so that your functions know how to use resources created by cloudformation.

In short, whether you are running your function as a lambda, or  locally on your machine,
the physical name or ARN of each resource that was part of your CloudFormation template will be available as an environment
variable keyed to its logical name prefixed with `CF_`.

For lambdas running on AWS, this plugin will set environment variables on your functions within lambda using the [Lambda environment variable support](https://aws.amazon.com/about-aws/whats-new/2016/11/aws-lambda-supports-environment-variables/).

For running functions locally, it will also create a local env file for use in reading in environment variables for a specific region-stage-function while running functions locally. These are by default stored in a directory named: `.serverless-resources-env` in files named `.<region>_<stage>_<function-name>`. Ex: `./.serverless-resources-env/.us-east-1_dev_hello`.
These environment variables are set automatically by the plugin when running `serverless invoke local -f ...`.

**Breaking Changes in 0.3.0:** *See below*

## Why?

You have a CloudFormation template all set, and you are writing your functions. Now you are ready to use the
resources created as part of your CF template. Well, you need to know about them! You could deploy and then try and manage
configuration for these resources, or you can use this module which will automatically set environmet variables that map the
logical resource name to the physical resource name for resources within the CloudFormation file.

## Example:

You have defined resources in your serverless.yml called `mySQS` and `myTable`, and you want to actually use these in
your function so you need their ARN or the actual table name that was created.

```
const sqs_arn = process.env.CF_mySQS;
const my_dynamo_table_name = process.env.CF_myTable;
```

## How it works
This plugin attaches to the deploy post-deploy hook. After the stack is deployed to AWS, the plugin determines the name of the cloud formation stack, and queries AWS for all resources in this stack.

After deployment, this plugin, will fetch all the CF resources for the current stack (stage i.e. 'dev'). It will then use the AWS
SDK to set as environment variables the physical id's of each resource as an environment variable prefixed with `CF_`.

It will also create a file with these values in a .properties file format named `./serverless-resources-env/.<region>_<stage>_<function-name>`.
These are then pulled in during a local invocation (`serverless invoke local -f...`) Each region, stage, and function will get its own file.
When invoking locally the module will automatically select the correct .env information based on which region and stage is set.

This means no code changes, or config changes no matter how many regions, and stages you deploy to.

The lambdas always know exactly where to find their resources, whether that resource is a DynamoDB, SQS, SNS, or anything else.

## Install / Setup

`npm install serverless-resources-env --save`

Add the plugin to the serverless.yml.

```
plugins:
  - serverless-resources-env
```

Set your resources as normal:

```
resources:
  Resources:
    testTopic1:
      Type: AWS::SNS::Topic
    testTopic2:
      Type: AWS::SNS::Topic

```

Set which resources you want exported on each function.

```
functions:
  hello:
    handler: handler.hello
    custom:
      env-resources:
        - testTopic1
        - testTopic2
```

## Breaking Changes since 0.2.0

At version 0.2.0 and before, all resources were exported to both the local .env file and to each function automatically.

This caused issues with AWS limits on the amount of information that could be exported as env variables onto lambdas deployed within AWS. This also exposed resources
as env variables that were not needed by functions, as it was setting *all* resources, not just the ones the function needed.

Starting at version 0.3.0 a list of which resources are to be exported to each function are required to be a part of the
function definition in the .yml file, if the function needs any of these environment variables. (See current install instructions above)

This also means that specific env files are needed per region / stage / function. This can potentially be a lot of files
and therefore these files were also moved to a sub-folder. `.serverless-resources-env` by default.

## Common Errors

`Unexpected key 'Environment' found in params`. Your aws-sdk is out of date. Setting environment variables on lambdas is new. See the Important note above.

You may need to upgrade the version of the package `aws-sdk` being used by the serverless framework.

In the 1.1.0 serverless framework, the `aws-sdk` is pegged at version 2.6.8 in the `npm-shrinkwrap.json` of serverless.

If you have installed serverless locally as part of your project you can just upgrade the sdk. `npm upgrade aws-sdk`.

If you have installed serverless globally, you will need to change to the serverless directory and run `npm upgrade aws-sdk` from there.

The following commands should get it done:

```
cd `npm list serverless -g | head -n 1`/node_modules/serverless
npm upgrade aws-sdk
```


## Config

By default, the mapping is written to a .env file located at `./.serverless-resources-env/.<region>_<stage-name>_env`.
This can be overridden by setting an option in serverless.yml.

```
custom:
  resource-output-dir: .alt-resource-dir
```

```
functions:
  hello:
    custom:
      resource-output-file: .alt-file-name
```

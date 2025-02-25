---
repo: washingtonpost/serverless-plugin-nametag
url: 'https://github.com/washingtonpost/serverless-plugin-nametag'
homepage: null
starredAt: '2018-12-09T07:14:48Z'
createdAt: '2018-10-24T22:23:10Z'
updatedAt: '2021-12-01T00:13:16Z'
language: JavaScript
license: MIT
branch: master
stars: 4
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:58.832Z'
description: >-
  Serverless framework plugin for applying a standard identification tag to AWS
  Lambda functions
tags:
  - aws
  - aws-lambda
  - serverless
  - serverless-framework
  - serverless-plugin
---

# serverless-plugin-nametag

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)

A Serverless framework plugin for tagging AWS Lambda functions with the logical ID of the Lambda function resource.


## Usage


### Installation

[Install via NPM](https://npmjs.com/package/serverless-plugin-nametag)


### A Basic Example

The following Serverless configuration will apply a `Name` tag to the `MyFunction` Lambda function 
resource that evaluates to its configured `FunctionName` (physical ID):

```yaml
service: my-service

plugins:
  - serverless-plugin-nametag

provider:
  name: aws
  stage: dev
  region: us-east-1
  runtime: python3.6

custom:
  nametag:
  tag: true

functions:
  MyFunction:
    handler: handlers.my_function
```

In the case of most normal setups, the resulting function will be tagged with `Name: my-service-dev-MyFunction`.


### Advanced Configuration

```yaml
service: my-service

plugins:
  - serverless-plugin-nametag

provider:
  name: aws
  stage: dev
  region: us-east-1
  runtime: python3.6

custom:
  nametag:
    tag: true
    tagName: FunctionName

functions:
  MyFunction:
    handler: handlers.my_function
  SpecialFunction:
    handler: handlers.special_function
    tags:
      Foo: bar
    nametag:
      tagName: Special
  UntaggedFunction:
    handler: handlers.untagged_function
    nametag:
      tag: false
```

In the case of most normal setups, the resulting functions will be tagged as-follows:

* `MyFunction`:
    * `FunctionName: my-service-dev-MyFunction`
* `SpecialFunction`:
    * `Foo: bar`
    * `Special: my-service-dev-SpecialFunction`
* `UntaggedFunction`:
    * Nothing!


## Configuration Options

The following properties can be set on a `nametag` object within `custom` and/or each function described in your
Serverless configuration. Options set in `custom` define the default behavior for each function; options set
at the function level override `custom` options for that function.

| Option        | Type    | Default  | Description                                                        |
| ------------- | ------- | -------- | ------------------------------------------------------------------ |
| `custom.nametag.tag`         | boolean | `false`  | Whether all function(s) should be tagged by default | 
| `custom.nametag.tagName`     | string  | `"Name"` | The name of the tag that will be created on all functions by default |
| `functions[].nametag.tag` | boolean | (set by `custom.nametag.tag`) | Whether this function should be tagged |
| `functions[].nametag.tagName` | string | (set by `custom.nametag.tagName`) | The name of the tag that will be created on this function | 

Note that the `tagName` option is for setting the name of the _tag_, not its value! 


## How It Works

This plugin is executed during the Serverless framework's `before:package:compileFunctions` hook event.
It copies the value that Serverless plans to use as the `FunctionName` property for each function's resulting
CloudFormation configuration object and applies it as the value of a tag (called `Name` by default, but can be
customized to whatever you like) on the same function.


## Contributing

- Have an idea or a problem? Create an issue! It's usually best to start by doing this.
- Fork this repository and submit a pull request if you have a fix or feature you want to be considered.

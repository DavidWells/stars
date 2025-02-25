---
repo: teddy-gustiaux/serverless-confirm-command
url: 'https://github.com/teddy-gustiaux/serverless-confirm-command'
homepage: ''
starredAt: '2018-10-10T02:35:31Z'
createdAt: '2018-09-18T23:49:55Z'
updatedAt: '2023-03-09T03:03:11Z'
language: JavaScript
license: MIT
branch: master
stars: 10
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:11.668Z'
description: >-
  Serverless plugin to make commands (and provider-specific options) requiring
  confirmation before execution.
tags:
  - command
  - confirm
  - serverless
  - stage
---

# Serverless Confirm Command

[![serverless](http://public.serverless.com/badges/v3.svg)](https://www.serverless.com)
[![npm package](https://badge.fury.io/js/serverless-confirm-command.svg)](https://badge.fury.io/js/serverless-confirm-command)
[![Build Status](https://travis-ci.com/teddy-gustiaux/serverless-confirm-command.svg?branch=master)](https://travis-ci.com/teddy-gustiaux/serverless-confirm-command)
[![Code Coverage](https://img.shields.io/codecov/c/github/teddy-gustiaux/serverless-confirm-command.svg)](https://codecov.io/gh/teddy-gustiaux/serverless-confirm-command)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/teddy-gustiaux/serverless-confirm-command.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/teddy-gustiaux/serverless-confirm-command/context:javascript)
[![Known Vulnerabilities](https://snyk.io//test/github/teddy-gustiaux/serverless-confirm-command/badge.svg?targetFile=package.json)](https://snyk.io//test/github/teddy-gustiaux/serverless-confirm-command?targetFile=package.json)
[![License](https://img.shields.io/badge/License-MIT-lightrey.svg)](https://opensource.org/licenses/MIT)

This [Serverless Framework](https://github.com/serverless/serverless) plugin allows you to define commands (as well as provider-specific options) that will require confirmation before being executed.

## Features

- Works with all cloud providers (and all runtimes)
- Supports all CLI commands
- Supports AWS stages and command/stage pairs

You can find a list of all serverless infrastructure providers (as well as their associated documentation) [here](https://serverless.com/framework/docs/providers/).

## Changelog

You can find the changelog [here](https://github.com/teddy-gustiaux/serverless-confirm-command/blob/master/CHANGELOG.md) or in the [releases](https://github.com/teddy-gustiaux/serverless-confirm-command/releases) section.

## Disclaimer

One of the intentions of this plugin is to make it more difficult to accidentally deploy or remove a serverless application when it should not.
Although it provides another layer of protection, it does *not* replace deployment and security policies for your applications.
Please do not forget to set up and protect your deployments appropriately (especially your production environment).

## Demonstration

[![GIF demo](https://raw.githubusercontent.com/teddy-gustiaux/serverless-confirm-command/master/demo/demo.gif)](https://raw.githubusercontent.com/teddy-gustiaux/serverless-confirm-command/master/demo/demo.gif)

## Documentation

- [Serverless Confirm Command](#serverless-confirm-command)
  - [Features](#features)
  - [Changelog](#changelog)
  - [Disclaimer](#disclaimer)
  - [Demonstration](#demonstration)
  - [Documentation](#documentation)
  - [Prerequistes](#prerequistes)
  - [Installation](#installation)
  - [Configuration](#configuration)
    - [Commands (provider-agnostic)](#commands-provider-agnostic)
      - [List of commands](#list-of-commands)
    - [AWS options](#aws-options)
  - [Usage](#usage)
  - [Example](#example)
  - [License](#license)

## Prerequistes

- Serverless Framework `1.0.0` or more recent
- Node.js `6.4.0` or more recent

## Installation

Install the plugin by running:

`npm install serverless-confirm-command --save-dev`

Alternatively, if you are using Yarn:

`yarn add serverless-confirm-command --dev`

Then add the plugin to your `serverless.yml` file plugin section:

```YAML
plugins:
  - serverless-confirm-command
```

## Configuration

You must configure the plugin in the custom section of your `serverless.yml` file, in a dedicated `confirm` section.
All options (provider-agnostic or not) can be used at the same time.

### Commands (provider-agnostic)

List the commands you want to confirm in a sub-section of the same name.

```YAML
custom:
  confirm:
    commands:
      - 'deploy'
      - 'remove'
```

For instance, the configuration above will require both the `deploy` and `remove` commands to be confirmed.

#### List of commands

Please refer to the CLI reference of each provider for a complete list of available commands.

Additionally, it is important to note that each command possessing its own section in the documentation is considered a separate command.
For instance, if you are using AWS as your cloud provider, `deploy` and `deploy function` are considered to be [two different commands](https://serverless.com/framework/docs/providers/aws/cli-reference/).

### AWS options

In you are using AWS as your cloud provider, you can set up any stage and/or command/stage pair to require confirmation.

```YAML
custom:
  confirm:
    aws:
      stages:
        - 'release'
      commandsForStages: # Must be listed as 'command:stage'
        - 'remove:prod'
```

For instance, the configuration above will require the following cases to be confirmed:

- Any command using the stage `release`
- The `remove` command used in combination with the `prod` stage

You can list as many stages and command/stage pairs as you want (as long as the command is supported by the plugin).

## Usage

Once you have configured the plugin, you can continue to use the Serverless Framework exactly as you were before.
The commands (and potentially the other options) you have configured will now need to be confirmed.

To confirm a command (or any option), you must provide the CLI option `--confirm` when using Serverless.

## Example

Let us assume you want to configure the `remove` command to require confirmation to prevent accidental deletion of your application.

Configuration of the plugin:

```YAML
custom:
  confirm:
    commands:
      - 'remove'
```

Using the command `serverless remove` will produce an error:

```YAML
  Serverless Confirm Command Error ---------------------------------------

  Command not confirmed. Use [--confirm] or change the configuration of the plugin.
```

Using the command `serverless remove --confirm` will succeed!

## License

Distributed under the [MIT license](http://opensource.org/licenses/MIT).

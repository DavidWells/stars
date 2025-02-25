---
repo: nascit/sts-broker-cli
url: 'https://github.com/nascit/sts-broker-cli'
homepage: null
starredAt: '2021-05-15T22:22:31Z'
createdAt: '2020-03-20T17:35:18Z'
updatedAt: '2021-05-15T22:22:31Z'
language: TypeScript
license: NA
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:40.790Z'
description: CLI to configure and interact with your own AWS STS Broker.
tags: []
---

stsbroker CLI
=========

CLI to configure and interact with your own AWS STS Broker.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/stsbroker.svg)](https://npmjs.org/package/stsbroker)
[![Downloads/week](https://img.shields.io/npm/dw/stsbroker.svg)](https://npmjs.org/package/stsbroker)
[![License](https://img.shields.io/npm/l/stsbroker.svg)](https://github.com/nascit/sts-broker-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g stsbroker
$ stsbroker COMMAND
running command...
$ stsbroker (-v|--version|version)
stsbroker/0.0.7 darwin-x64 node-v13.10.1
$ stsbroker --help [COMMAND]
USAGE
  $ stsbroker COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`stsbroker access`](#stsbroker-access)
* [`stsbroker configure`](#stsbroker-configure)
* [`stsbroker help [COMMAND]`](#stsbroker-help-command)
* [`stsbroker policies`](#stsbroker-policies)
* [`stsbroker request`](#stsbroker-request)

## `stsbroker access`

Assume the temporary session

```
USAGE
  $ stsbroker access

OPTIONS
  -c, --console      Open AWS Console
  -h, --help         show CLI help
  --profile=profile  (required) AWS Profile
```

_See code: [src/commands/access.ts](https://github.com/nascit/sts-broker-cli/blob/v0.0.7/src/commands/access.ts)_

## `stsbroker configure`

Configure your STS Broker

```
USAGE
  $ stsbroker configure

CONFIGURATION VARIABLES
       The following configuration variables are supported in the config file:

       o STS Broker region

       o STS Broker endpoint - STS Broker API endpoint. 
         Can be a API Gateway stage endpoint (""xxxxx.execute-api.us-east-2.amazonaws.com/Prod"")
         or a custom domain.

       o Cognito User Pool ID

       o Cognito User Pool App Client ID

       o Cognito domain
```
![](configure.gif)

_See code: [src/commands/configure.ts](https://github.com/nascit/sts-broker-cli/blob/v0.0.7/src/commands/configure.ts)_

## `stsbroker help [COMMAND]`

display help for stsbroker

```
USAGE
  $ stsbroker help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_

## `stsbroker policies`

Get STS Broker policies available

```
USAGE
  $ stsbroker policies

OPTIONS
  -x, --extended          show extra columns
  --columns=columns       only show provided columns (comma-separated)
  --csv                   output is csv format [alias: --output=csv]
  --filter=filter         filter property by partial string matching, ex: name=foo
  --no-header             hide table header from output
  --no-truncate           do not truncate output to fit screen
  --output=csv|json|yaml  output in a more machine friendly format
  --reset                 Reset Cognito credentials
  --sort=sort             property to sort by (prepend '-' for descending)
```

_See code: [src/commands/policies.ts](https://github.com/nascit/sts-broker-cli/blob/v0.0.7/src/commands/policies.ts)_

## `stsbroker request`

Make a permission request to the STS Broker

```
USAGE
  $ stsbroker request

OPTIONS
  --reset  Reset Cognito credentials
```

_See code: [src/commands/request.ts](https://github.com/nascit/sts-broker-cli/blob/v0.0.7/src/commands/request.ts)_
<!-- commandsstop -->

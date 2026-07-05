---
repo: xhiroga/cognito-cli
url: 'https://github.com/xhiroga/cognito-cli'
homepage: null
starredAt: '2020-03-23T21:42:50Z'
createdAt: '2019-05-10T11:17:02Z'
updatedAt: '2023-01-28T03:47:59Z'
language: TypeScript
license: NA
branch: master
stars: 6
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:01.269Z'
description: 'cli tool for Cognito UserPool (ex. signin, forgotPasswordSubmit, etc...)'
tags: []
---

@hiroga/cognito-cli
============================

cli tool for Cognito UserPool (ex. signin, forgotPasswordSubmit, etc...)

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@hiroga/cognito-cli.svg)](https://npmjs.org/package/@hiroga/cognito-cli)
[![Downloads/week](https://img.shields.io/npm/dw/@hiroga/cognito-cli.svg)](https://npmjs.org/package/@hiroga/cognito-cli)
[![License](https://img.shields.io/npm/l/@hiroga/cognito-cli.svg)](https://github.com/hiroga-cc/cognito-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @hiroga/cognito-cli
$ cognito-cli COMMAND
running command...
$ cognito-cli (-v|--version|version)
@hiroga/cognito-cli/0.2.5 darwin-x64 node-v10.5.0
$ cognito-cli --help [COMMAND]
USAGE
  $ cognito-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`cognito-cli configure`](#cognito-cli-configure)
* [`cognito-cli forgot-password`](#cognito-cli-forgot-password)
* [`cognito-cli get-credentials-for-identity`](#cognito-cli-get-credentials-for-identity)
* [`cognito-cli get-id`](#cognito-cli-get-id)
* [`cognito-cli get-open-id-token`](#cognito-cli-get-open-id-token)
* [`cognito-cli help [COMMAND]`](#cognito-cli-help-command)
* [`cognito-cli signin`](#cognito-cli-signin)

## `cognito-cli configure`

describe the command here

```
USAGE
  $ cognito-cli configure

OPTIONS
  -a, --authenticationFlowType=authenticationFlowType  authentication flow type
  -c, --client=client                                  userpool client id
  -f, --federatedIdentity=federatedIdentity            federated identity id
  -h, --help                                           show CLI help
  -r, --region=region                                  region
  -u, --userpool=userpool                              userpool id
  --profile=profile                                    configure name
```

_See code: [src/commands/configure.ts](https://github.com/hiroga-cc/cognito-cli/blob/v0.2.5/src/commands/configure.ts)_

## `cognito-cli forgot-password`

describe the command here

```
USAGE
  $ cognito-cli forgot-password

OPTIONS
  -c, --code=code          confirmation code
  -p, --password=password  newpassword
  -u, --user=user          username to reset password
  --profile=profile        configure name
```

_See code: [src/commands/forgot-password.ts](https://github.com/hiroga-cc/cognito-cli/blob/v0.2.5/src/commands/forgot-password.ts)_

## `cognito-cli get-credentials-for-identity`

describe the command here

```
USAGE
  $ cognito-cli get-credentials-for-identity

OPTIONS
  -h, --help         show CLI help
  -i, --id=id        This known Cognito ID is returned by GetId.
  -t, --token=token  token
  --profile=profile  configure name
```

_See code: [src/commands/get-credentials-for-identity.ts](https://github.com/hiroga-cc/cognito-cli/blob/v0.2.5/src/commands/get-credentials-for-identity.ts)_

## `cognito-cli get-id`

describe the command here

```
USAGE
  $ cognito-cli get-id

OPTIONS
  -h, --help         show CLI help
  -t, --token=token  token
  --profile=profile  configure name
```

_See code: [src/commands/get-id.ts](https://github.com/hiroga-cc/cognito-cli/blob/v0.2.5/src/commands/get-id.ts)_

## `cognito-cli get-open-id-token`

describe the command here

```
USAGE
  $ cognito-cli get-open-id-token

OPTIONS
  -h, --help         show CLI help
  -i, --id=id        This known Cognito ID is returned by GetId.
  -t, --token=token  token
  --profile=profile  configure name
```

_See code: [src/commands/get-open-id-token.ts](https://github.com/hiroga-cc/cognito-cli/blob/v0.2.5/src/commands/get-open-id-token.ts)_

## `cognito-cli help [COMMAND]`

display help for cognito-cli

```
USAGE
  $ cognito-cli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.6/src/commands/help.ts)_

## `cognito-cli signin`

describe the command here

```
USAGE
  $ cognito-cli signin

OPTIONS
  -h, --help                     show CLI help
  -n, --newPassword=newPassword  new-password
  -p, --password=password        password
  -u, --user=user                user
  --profile=profile              configure name
```

_See code: [src/commands/signin.ts](https://github.com/hiroga-cc/cognito-cli/blob/v0.2.5/src/commands/signin.ts)_
<!-- commandsstop -->

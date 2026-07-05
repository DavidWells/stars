---
repo: keisuke6065/cognito-tools
url: 'https://github.com/keisuke6065/cognito-tools'
homepage: ''
starredAt: '2020-03-23T18:17:54Z'
createdAt: '2018-11-25T02:09:22Z'
updatedAt: '2021-12-29T12:47:04Z'
language: TypeScript
license: MIT
branch: master
stars: 7
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:01.759Z'
description: cognito cli utils(backup restore ...)
tags:
  - aws
  - backup
  - cli
  - cognito
  - node
  - restore
  - typescript
---

cognito-tools
=============

cognito tools

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/cognito-tools.svg)](https://npmjs.org/package/cognito-tools)
[![Downloads/week](https://img.shields.io/npm/dw/cognito-tools.svg)](https://npmjs.org/package/cognito-tools)
[![License](https://img.shields.io/npm/l/cognito-tools.svg)](https://github.com/keisuke6065/cognito-tools/blob/master/package.json)
[![codecov](https://codecov.io/gh/keisuke6065/cognito-tools/branch/master/graph/badge.svg)](https://codecov.io/gh/keisuke6065/cognito-tools)
<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g cognito-tools
$ cognito-tools COMMAND
running command...
$ cognito-tools (-v|--version|version)
cognito-tools/0.0.13 darwin-x64 node-v10.15.1
$ cognito-tools --help [COMMAND]
USAGE
  $ cognito-tools COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`cognito-tools backup`](#cognito-tools-backup)
* [`cognito-tools delete`](#cognito-tools-delete)
* [`cognito-tools delete-all`](#cognito-tools-delete-all)
* [`cognito-tools force-registration`](#cognito-tools-force-registration)
* [`cognito-tools help [COMMAND]`](#cognito-tools-help-command)
* [`cognito-tools restore`](#cognito-tools-restore)

## `cognito-tools backup`

cognito-tools backup -u [USER_POOL_ID] -r [REGION] -o [OUTPUT_TARGET_DIR]

```
USAGE
  $ cognito-tools backup

OPTIONS
  -o, --output=output          [default: ./output] output target dir
  -r, --region=region          [default: ap-northeast-1] region name
  -u, --userPoolId=userPoolId  (required) userPool Id

DESCRIPTION
  cognito-tools backup -u [USER_POOL_ID] -r [REGION] -o [OUTPUT_TARGET_DIR]

  output file example
  [{"Username":"","Attributes":[{"Name":"sub","Value":"7f1f8d94-5c2d-430f-97a7-e2d5d0bb14f1"},{"Name":"email_verified","
  Value":"false"},{"Name":"email","Value":"sample@example.com"}],"UserCreateDate":"2019-01-18T00:48:59.572Z","UserLastMo
  difiedDate":"2019-01-18T00:48:59.572Z","Enabled":true,"UserStatus":"UNCONFIRMED"}]
```

_See code: [src/commands/backup.ts](https://github.com/keisuke6065/cognito-tools/blob/v0.0.13/src/commands/backup.ts)_

## `cognito-tools delete`

cognito-tools delete -u [USER_POOL_ID] -r [REGION] -i [INPUT_JSON_FILE]

```
USAGE
  $ cognito-tools delete

OPTIONS
  -i, --input=input            (required) input target path
  -r, --region=region          (required) [default: ap-northeast-1] region name
  -u, --userPoolId=userPoolId  (required) userPool Id

DESCRIPTION
  cognito-tools delete -u [USER_POOL_ID] -r [REGION] -i [INPUT_JSON_FILE]

  cognito admin delete user
  input json file example
  [{"Username":"","Attributes":[{"Name":"sub","Value":"039bf366-7942-4888-a772-41dadacb2ea9"},{"Name":"email","Value":"s
  ample@example.com"}]}]
```

_See code: [src/commands/delete.ts](https://github.com/keisuke6065/cognito-tools/blob/v0.0.13/src/commands/delete.ts)_

## `cognito-tools delete-all`

cognito-tools delete -u [USER_POOL_ID] -r [REGION]

```
USAGE
  $ cognito-tools delete-all

OPTIONS
  -r, --region=region          (required) [default: ap-northeast-1] region name
  -u, --userPoolId=userPoolId  (required) userPool Id

DESCRIPTION
  cognito-tools delete -u [USER_POOL_ID] -r [REGION]

  fetch delete command
```

_See code: [src/commands/delete-all.ts](https://github.com/keisuke6065/cognito-tools/blob/v0.0.13/src/commands/delete-all.ts)_

## `cognito-tools force-registration`

cognito-tools force-registration -u [USER_POOL_ID] -c [CLIENT_ID] -r [REGION] -i [INPUT_CSV_FILE] -o [OUTPUT_TARGET_DIR]

```
USAGE
  $ cognito-tools force-registration

OPTIONS
  -c, --clientId=clientId      (required) client Id
  -i, --input=input            (required) input target csv file
  -l, --limit=limit            [default: 5] request limit (AdminCreateUser or signUp or linkFacebookProvider)
  -o, --output=output          [default: ./output] output target dir
  -r, --region=region          [default: ap-northeast-1] region name
  -u, --userPoolId=userPoolId  (required) userPool Id

DESCRIPTION
  cognito-tools force-registration -u [USER_POOL_ID] -c [CLIENT_ID] -r [REGION] -i [INPUT_CSV_FILE] -o 
  [OUTPUT_TARGET_DIR]

  force create user

  input file example
  email,password,custom:customAttributeName,facebookId
  6059028c-2d13-11e9-8d87-4f75dd5bbbcf@exmaple.com,,1,00000000000
  605986da-2d13-11e9-a4e7-ef206b70e234@exmaple.com,password,2,00000000001
  605a07ea-2d13-11e9-97b7-13fb3194c166@exmaple.com,password,3,

  password none      -> admin create user
  password exists    -> sign up user
  facebook id exists -> admin create user or sign up user and link provider

  output file example
  userName,email,password,custom:customAttributeName,facebookId
  66ef45ad-86a1-4377-aa86-2d3356933b36,6059028c-2d13-11e9-8d87-4f75dd5bbbcf@exmaple.com,,1,00000000000
  b9225937-9578-4b31-9efe-3a00bebc4ccd,605986da-2d13-11e9-a4e7-ef206b70e234@exmaple.com,password,2,00000000001
  ffb029f0-2b2c-4b1d-a927-1845990707fd,605a07ea-2d13-11e9-97b7-13fb3194c166@exmaple.com,password,3,
```

_See code: [src/commands/force-registration.ts](https://github.com/keisuke6065/cognito-tools/blob/v0.0.13/src/commands/force-registration.ts)_

## `cognito-tools help [COMMAND]`

display help for cognito-tools

```
USAGE
  $ cognito-tools help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_

## `cognito-tools restore`

cognito-tools restore -u [USER_POOL_ID] -r [REGION] -i [INPUT_JSON_FILE]

```
USAGE
  $ cognito-tools restore

OPTIONS
  -i, --input=input            (required) input target file
  -l, --limit=limit            [default: 5] request limit (AdminCreateUser)
  -r, --region=region          [default: ap-northeast-1] region name
  -u, --userPoolId=userPoolId  (required) userPool Id

DESCRIPTION
  cognito-tools restore -u [USER_POOL_ID] -r [REGION] -i [INPUT_JSON_FILE]

  cognito admin create user
  input json file example
  [{"Username":"","Attributes":[{"Name":"sub","Value":"039bf366-7942-4888-a772-41dadacb2ea9"},{"Name":"email","Value":"s
  ample@example.com"}]}]

  admin create use options
  Username = email
  MessageAction = SUPPRESS
  DesiredDeliveryMediums = none
  ForceAliasCreation = false
```

_See code: [src/commands/restore.ts](https://github.com/keisuke6065/cognito-tools/blob/v0.0.13/src/commands/restore.ts)_
<!-- commandsstop -->

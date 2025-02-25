---
repo: ACloudGuru/oprah
url: 'https://github.com/ACloudGuru/oprah'
homepage: ''
starredAt: '2021-10-02T17:14:00Z'
createdAt: '2018-11-26T23:52:09Z'
updatedAt: '2023-10-13T05:44:28Z'
language: JavaScript
license: MIT
branch: master
stars: 14
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:44.055Z'
description: Package to deploy parameters to AWS
tags:
  - amazon-web-services
  - aws
  - aws-dynamodb
  - aws-parameter-store
  - configuration-management
---

[![Build Status][github-actions-image]][github-actions-url]
[![codecov](https://codecov.io/gh/ACloudGuru/oprah/branch/master/graph/badge.svg)](https://codecov.io/gh/ACloudGuru/oprah)
[![Codacy Badge][codacy-image]][codacy-url]
[![NPM Status][npm-image]][npm-url]
[![dependencies Status][dependencies-image]][dependencies-url]

# 🐝 Oprah

Node module to push configuration and encrypted secrets to AWS.

## Installation

```
# Via yarn
$ yarn add oprah

# Via npm
$ npm install oprah
```

## Usage

1. At the root of your application add configuration file called `oprah.yml`.

```
service: oprah-service
provider: ssm

config:
  path: /${stage}/oprah/config
  defaults:
    DB_NAME: my-database
    DB_HOST: 3200
  required:
    DB_TABLE: "some database table name for ${stage}"

secret:
  path: /${stage}/oprah/secret
  required:
    DB_PASSWORD: "secret database password"
```

2. Use `oprah` CLI tool to push your keys to AWS parameter store.

```
$ oprah run --stage <stage> --interactive
```

### Config File

Following is the configuration file will all possible options:

```
service: oprah-service
provider: ssm                                 # Only supports ssm for now.

stacks:                                       # Outputs from cloudformation stacks that needs to be interpolated.
  - some-cloudformation-stack

config:
  path: /${stage}/oprah/config                # Base path for params to be added to
  defaults:                                   # Default parameters. Can be overwritten in different environments.
    DB_NAME: my-database
    DB_HOST: 3200
  production:                                 # If keys are deployed to production stage, its value will be overwritten by following
    DB_NAME: my-production-database
  required:                                   # Keys mentioned below will be prompted to be entered.
    DB_TABLE: "some database table name for ${stage}"

secret:
  keyId: some-arn-of-kms-key-to-use .         # If not specified, default key will be used to encrypt variables.
  path: /${stage}/oprah/secret                # Base path for params to be added to
  required:
    DB_PASSWORD: "secret database password" . # Parameter to encrypt and add to. Will be encrypted using KMS.
                                              # Above key will be added to /${stage}/oprah/secret/DB_PASSWORD
                                              # Value in quote will be displayed as explanation in prompt during interactive run.
```

### CLI

Following is all options available in `oprah` CLI.

```
Usage: oprah [options] [command]

Options:
  -V, --version          output the version number
  -s, --stage [stage]    Specify stage to run on. (required)
  -c, --config [config]  Path to oprah configuration (default: "oprah.yml")
  -i, --interactive      specify values through command line
  -h, --help             display help for command

Commands:
  run [options]          Verify or populate all remote configurations and
                         secrets.
  init                   Initialize oprah. Only required to run once.
  export [options]       Export of all of the configuration from the provider
                         to a text json file
  import [options]       Import all of the configuration from the json from to
                         a provider
  list                   List all remote configurations and secrets.
  fetch [options]        Fetch config or secret
  help [command]         display help for command
```

### Push configuration

```
Usage: oprah run [options]

Verify or populate all remote configurations and secrets.

Options:
  -v, --variables [variables]  Variables used for config interpolation.
  -i, --interactive            Run on interactive mode
  -m, --missing                Only prompt missing values in interactive mode
  -r, --removing               Removing orphan configs or secrets
  -h, --help                   display help for command
```

### List pushed configurations

```
Usage: oprah list [options]

List all remote configurations and secrets.

Options:
  -h, --help  display help for command
```

### Fetch individual configuration

```
Usage: oprah fetch [options]

Fetch config or secret

Options:
  -k, --keys [keys]  Comma seperated configs to fetch (example:
                     "SOME_CONFIG,ANOTHER_CONFIG")
  -h, --help         display help for command
```

Fetch configuration can be used in automation scripts. Example:

```bash
PARAMS=$(./node_modules/.bin/cm fetch -k "CALLBACK_URL,LOGOUT_URL" -s $STAGE)

CALLBACK_URL=$(echo $PARAMS | jq -er ".CALLBACK_URL")
LOGOUT_URL=$(echo $PARAMS | jq -er ".LOGOUT_URL")

# do something with the values
```

### Import

```
Usage: oprah import [options]

Import all of the configuration from the json from to a provider

Options:
  -p, --path [path]  The location of the secrets and configuration file
                     (default: "/tmp/oprah-exports.json")
  -h, --help         display help for command
```

### Export

```
Usage: oprah export [options]

Export of all of the configuration from the provider to a text json file

Options:
  -p, --path [path]      The location for the output secrets & configuration file
                         (default: "/tmp/oprah-exports.json" or ".env_oprah")
  -t, --target [target]  The output target, available options are json|env
                         (default:json)

  -C, --config-only [configOnly] Only export `config` section

  -h, --help             display help for command
```

### Clean up

```
Usage: oprah clean-up [options]

Clean up orphan configurations and secrets from provider

Options:
  -d, --dry-run [dryRun]  Execute a dry run to display all orphan configurations and secrets

  -h, --help              display help for command
```

### License

Feel free to use the code, it's released using the MIT license.

[github-actions-image]: https://github.com/acloudguru/oprah/actions/workflows/publish.yml/badge.svg
[github-actions-url]: https://github.com/ACloudGuru/oprah/actions/workflows/publish.yml
[dependencies-image]: https://david-dm.org/ACloudGuru/oprah/status.svg
[dependencies-url]: https://david-dm.org/ACloudGuru/oprah
[npm-image]: https://img.shields.io/npm/v/oprah.svg
[npm-url]: https://www.npmjs.com/package/oprah
[codacy-image]: https://api.codacy.com/project/badge/Grade/6464d14b26214357ba838d2cdbdfcb8e
[codacy-url]: https://www.codacy.com/app/subash.adhikari/oprah?utm_source=github.com&utm_medium=referral&utm_content=ACloudGuru/oprah&utm_campaign=Badge_Grade

---
repo: claygregory/serverless-prune-plugin
url: 'https://github.com/claygregory/serverless-prune-plugin'
homepage: ''
starredAt: '2018-11-22T18:55:36Z'
createdAt: '2017-01-14T02:05:36Z'
updatedAt: '2025-01-21T00:28:34Z'
language: JavaScript
license: MIT
branch: master
stars: 366
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:01.648Z'
description: >-
  Serverless Framework plugin to reap unused versions of deployed functions from
  AWS
tags:
  - aws-lambda
  - serverless
  - serverless-framework
---


# Serverless Prune Plugin

Following deployment, the Serverless Framework does not purge previous versions of functions from AWS, so the number of deployed versions can grow out of hand rather quickly. This plugin allows pruning of all but the most recent version(s) of managed functions from AWS. This plugin is compatible with Serverless 1.x and higher.

[![Serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![Coverage Status](https://coveralls.io/repos/github/claygregory/serverless-prune-plugin/badge.svg?branch=master)](https://coveralls.io/github/claygregory/serverless-prune-plugin?branch=master)

## Installation

Install with **npm**:
```sh
npm install --save-dev serverless-prune-plugin
```

And then add the plugin to your `serverless.yml` file:
```yaml
plugins:
  - serverless-prune-plugin
```

Alternatively, install with the Serverless **plugin command** (Serverless Framework 1.22 or higher):
```sh
sls plugin install -n serverless-prune-plugin
```

## Usage

In the project root, run:
```sh
sls prune -n <number of version to keep>
```

This will delete all but the `n`-most recent versions of each function deployed. Versions referenced by an alias are automatically preserved.

### Single Function

A single function can be targeted for cleanup:
```sh
sls prune -n <number of version to keep> -f helloWorld
```

### Region/Stage

The previous usage examples prune the default stage in the default region. Use `--stage` and `--region` to specify: 
```sh
sls prune -n <number of version to keep> --stage production --region eu-central-1
```

### Automatic Pruning

This plugin can also be configured to run automatically, following a deployment. Configuration of automatic pruning is within the `custom` property of `serverless.yml`. For example:

```yaml
custom:
  prune:
    automatic: true
    number: 3
```

To run automatically, the `automatic` property of `prune` must be set to `true` and the `number` of versions to keep must be specified.
It is possible to set `number` to `0`. In this case, the plugin will delete all the function versions (except $LATEST); this is useful when disabling function versioning for an already-deployed stack.

### Layers

This plugin can also prune Lambda Layers in the same manner that it prunes functions. You can specify a Lambda Layer, or add the flag, `includeLayers`:

```yaml
custom:
  prune:
    automatic: true
    includeLayers: true
    number: 3
```

### Dry Run

A dry-run will preview the deletion candidates, without actually performing the pruning operations:
```sh
sls prune -n <number of version to keep> --dryRun
```

### Additional Help

See:
```sh
sls prune --help
```

## Permissions Required

To run this plugin, the user will need to be allowed the following permissions in AWS:
- `lambda:listAliases`
- `lambda:listVersionsByFunction`
- `lambda:deleteFunction`
- `lambda:listLayerVersions`
- `lambda:deleteLayerVersion`

## Common Questions

**How do I set up different pruning configurations per region/stage?**

Several suggestions are available in [this thread](https://github.com/claygregory/serverless-prune-plugin/issues/21#issuecomment-622651886).

**Can I just disable versioning entirely?**

Absolutely. While Serverless Framework has it enabled by default, [versioning can be disabled](https://www.serverless.com/framework/docs/providers/aws/guide/functions/#versioning-deployed-functions).

## License

Copyright (c) 2017 [Clay Gregory](https://claygregory.com). See the included [LICENSE](LICENSE.md) for rights and limitations under the terms of the MIT license.

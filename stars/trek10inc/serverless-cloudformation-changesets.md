---
repo: trek10inc/serverless-cloudformation-changesets
url: 'https://github.com/trek10inc/serverless-cloudformation-changesets'
homepage: ''
starredAt: '2018-01-16T23:03:08Z'
createdAt: '2017-11-09T18:55:06Z'
updatedAt: '2024-06-24T07:25:52Z'
language: JavaScript
license: MIT
branch: master
stars: 52
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:29.936Z'
description: >-
  Natively deploy to CloudFormation via Change sets, instead of directly.
  Allowing you to queue changes, and safely require escalated roles for final
  deployment.
tags: []
---

# serverless-cloudformation-changesets
[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)


Serverless framework plugin to create CloudFormation ChangeSets.

## Installation

Install the plugin from npm

```bash
$ npm install --save serverless-cloudformation-changesets
```

Add the plugin to your `serverless.yml` file:

```yaml
plugins:
  - serverless-cloudformation-changesets
```

## Usage
#### CLI options
Add `--changeset` option to the sls deployment command, e.g.:
```bash
$ sls deploy --changeset --stage dev --region us-east-1
```
`--changeset` by default uses a timestamp for ChangeSet name, otherwise you can provide optional `--changeset` value:
```bash
$ sls deploy --changeset your-changeset-name --stage dev --region us-east-1
```

#### YAML settings
```yaml
custom:
  cf-changesets:
    changeSetName: whatever # optional
    requireChangeSet: boolean # optional defaults to false
```
`requireChangeSet` - if true, ChangeSets will be created without providing `--changeset` option to the `sls deploy` command.

## Notice
If CloudFormation Stack doesn't exist and custom `provider.deploymentBucket` was specified, this plugin will create a new stack without template, resources. The stack will be in the `REVIEW_IN_PROGRESS` state.

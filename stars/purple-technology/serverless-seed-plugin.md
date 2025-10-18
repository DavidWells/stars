---
repo: purple-technology/serverless-seed-plugin
url: 'https://github.com/purple-technology/serverless-seed-plugin'
homepage: ''
starredAt: '2025-09-09T21:30:36Z'
createdAt: '2021-05-31T07:29:43Z'
updatedAt: '2025-09-09T21:30:37Z'
language: JavaScript
license: MIT
branch: master
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-10-18T22:29:47.922Z'
description: This plugin seeds the data for AWS resources.
tags:
  - aws
  - cognito
  - dynamodb
  - plugin
  - plugin-seeds
  - s3
  - seed
  - serverless
---

# serverless-seed-plugin

This plugin is still in WIP and non-stable.

[![CI Status Badge](https://circleci.com/gh/purple-technology/serverless-seed-plugin.svg?style=svg)](https://github.com/purple-technology/serverless-seed-plugin)

This plugin seeds the data for AWS resources.

## Supported resources

- `AWS::DynamoDB::Table`
- `AWS::Cognito::UserPool`
- `AWS::S3::Bucket`

## Install

```sh
$ npm install --save-dev serverless-seed-plugin
```

Add the plugin to your `serverless.yml` file.

```yml
plugins:
  - serverless-seed-plugin
```

## Usage

Set up `custom.seed.<resource>.<options>` in your `serverless.yml` file. You can also follow the code in [./example/](./example) dir.

Then run `serverless seed`.

### DynamoDB

```yml
custom:
  seed:
    dynamodb:
      TableId:
        emptyOnly: true # default false - seed only if target is empty
        truncate: true # default false
        clone:
          table: source-table-name # Clone data from table
          recreate: true # default false
          config: # empty by default, for more options see https://github.com/enGMzizo/copy-dynamodb-table#aws-config-for-each-table--cross-region--
            accessKeyId: AKID
            secretAccessKey: SECRET
            region: eu-west-1
        data:
          - id: 'abc1'
            name: 'myRecordName1'
          - id: 'abc2'
            name: 'myRecordName2'
```

### Cognito

- [x] immutable attributes are set only first time, otherwise update of these attributes is skipped
- [x] `custom:` prefix for custom attributes is required
- [x] every created user has confirmed account status and no confirmation e-mail is sent
- [x] only attributes and password is updated if user exists

```yml
custom:
  seed:
    cognito:
      TodosUserPool:
        emptyOnly: true # default false - seed only if target is empty
        data:
          - username: abc1
            password: passw1
            attributes:
              - Name: custom:mutableClientData
                Value: mutableClientData_val
              - Name: custom:immutableClientData
                Value: immutableClientData_val
          - username: abc2
            password: passw2
            attributes: []
```

### S3

Do not forget to clear all objects from bucket, before `serverless remove` command called or use [our plugin](https://github.com/purple-technology/serverless-s3-remover)

- [x] all nested dirs and files will be uploaded
- [x] existing files will be overwritten

```yml
custom:
  seed:
    s3:
      TodosBucket:
        emptyOnly: true # default false - seed only if target is empty
        data:
          - ./somedir/
```

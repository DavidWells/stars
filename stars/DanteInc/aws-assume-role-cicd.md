---
repo: DanteInc/aws-assume-role-cicd
url: 'https://github.com/DanteInc/aws-assume-role-cicd'
homepage: null
starredAt: '2024-05-15T19:36:30Z'
createdAt: '2019-01-24T04:42:34Z'
updatedAt: '2025-02-21T15:49:29Z'
language: JavaScript
license: NA
branch: master
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:30.240Z'
description: CLI for assuming an AWS role in a CI/CD pipeline
tags: []
---

# aws-assume-role-cicd

CLI for assuming an AWS role in a CI/CD pipeline

When using hosted CI/CD tools, such as bitbucket-pipelines or gitlab-ci, we need to source credentials from secure environment variables instead of the `~/.aws/credentials` file. This CLI is specifically designed for these CI/CD requirements. When performing a dev deployment from a developer's machine use [aws-get-session-token](https://github.com/DanteInc/aws-get-session-token) instead.

## Installation

`npm i aws-assume-role-cicd --save-dev`

## Usage

#### Pipeline YAML
```
export AWS_ACCESS_KEY_ID=$PROD_AWS_ACCESS_KEY_ID
export AWS_SECRET_ACCESS_KEY=$PROD_AWS_SECRET_ACCESS_KEY
export AWS_ROLE=$PROD_AWS_ROLE
npm run dp:prd:e
```

Alternatively, provide two roles separated by a `|`, such as a jump role and an execution role.
```
export AWS_ROLE=$PROD_AWS_ROLE_JUMP|$PROD_AWS_ROLE_EXEC
```

#### package.json
```
  "scripts": {
    "dp:prd:e": "eval \"$(assume-role) sls deploy -v -r us-east-1 -s prd --acct prod\""
  },
```

## Help

```
$ assume --help
```


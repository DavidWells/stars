---
repo: sashee/watch-lambda-logs
url: 'https://github.com/sashee/watch-lambda-logs'
homepage: ''
starredAt: '2022-09-29T17:39:43Z'
createdAt: '2020-10-19T09:37:57Z'
updatedAt: '2024-12-05T01:03:46Z'
language: JavaScript
license: NA
branch: main
stars: 4
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:27.935Z'
description: Continuously query logs for a Lambda function
tags:
  - aws
  - aws-lambda
  - cli
---

# Lambda logs watcher

Watch logs from the terminal.

Supports:

* Terraform-managed functions
* function name argument
* function Arn argument

## Usage

```npx watch-lambda-logs [name|arn]```

If no argument is provided it tries to use Terraform to find managed functions. If there are multiple, it offers a choice which one to watch.

Both function name (in the current region, defined in the ```AWS_REGION``` environment variable) or function Arn is supported.

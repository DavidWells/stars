---
repo: common-fate/cedar-validate-action
url: 'https://github.com/common-fate/cedar-validate-action'
homepage: null
starredAt: '2026-04-29T20:38:16Z'
createdAt: '2024-04-05T10:42:25Z'
updatedAt: '2026-04-29T20:38:17Z'
language: TypeScript
license: MIT
branch: main
stars: 9
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2026-07-05T01:53:42.655Z'
description: A GitHub Action to validate Cedar policies
tags: []
---

# cedar-validate-action

[![GitHub Super-Linter](https://github.com/actions/typescript-action/actions/workflows/linter.yml/badge.svg)](https://github.com/super-linter/super-linter)
![CI](https://github.com/actions/typescript-action/actions/workflows/ci.yml/badge.svg)
[![Check dist/](https://github.com/actions/typescript-action/actions/workflows/check-dist.yml/badge.svg)](https://github.com/actions/typescript-action/actions/workflows/check-dist.yml)
[![CodeQL](https://github.com/actions/typescript-action/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/actions/typescript-action/actions/workflows/codeql-analysis.yml)
[![Coverage](./badges/coverage.svg)](./badges/coverage.svg)

A GitHub Action to validate [Cedar](https://www.cedarpolicy.com) authorization
policies.

This action creates annotations showing the location of any issues in your
policy source code.

![A screenshot showing annotations on a pull request file](./docs/annotation-screenshot.png)

You can see an example implementation of this Action here:
https://github.com/common-fate/cedar-github-actions-testing-example.

## Usage

```yaml
name: 'Test'

on: [push]

jobs:
  cedar:
    name: Cedar
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Validate Policies
        uses: common-fate/cedar-validate-action@v1
        with:
          schema-file: ./example.cedarschema.json
          policy-files: '**/*.cedar'
```

## Limitations

This action currently supports Cedar v3 and supports the
[JSON schema format](https://docs.cedarpolicy.com/schema/json-schema.html).

[Let us know](https://github.com/common-fate/cedar-validate-action/issues/new)
if you'd like to see support for Cedar v2 or the human-readable schema format.

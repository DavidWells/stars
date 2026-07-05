---
repo: stratiformdigital/serverless-s3-security-helper
url: 'https://github.com/stratiformdigital/serverless-s3-security-helper'
homepage: 'https://www.npmjs.com/package/@stratiformdigital/serverless-s3-security-helper'
starredAt: '2024-02-16T00:07:16Z'
createdAt: '2022-01-12T17:36:10Z'
updatedAt: '2024-02-16T00:07:17Z'
language: JavaScript
license: MIT
branch: main
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:36.132Z'
description: 'Sets security minded settings on s3 buckets, including sls deployment buckets'
tags:
  - aws
  - s3
  - serverless
  - serverless-plugin
---

<h1 align="center" style="border-bottom: none;"> serverless-s3-security-helper</h1>
<h3 align="center">Sets security related settings on s3 buckets.</h3>
<p align="center">
  <a href="https://github.com/stratiformdigital/serverless-s3-security-helper/releases/latest">
    <img alt="latest release" src="https://img.shields.io/github/release/stratiformdigital/serverless-s3-security-helper.svg">
  </a>
  <a href="https://www.npmjs.com/package/@stratiformdigital/serverless-s3-security-helper">
    <img alt="npm latest version" src="https://img.shields.io/npm/v/@stratiformdigital/serverless-s3-security-helper/latest.svg">
  </a>
  <a href="https://codeclimate.com/github/stratiformdigital/serverless-s3-security-helper/maintainability">
    <img alt="Maintainability" src="https://api.codeclimate.com/v1/badges/3a3eb55e2dc93c7e0174/maintainability">
  </a>
  <a href="https://github.com/semantic-release/semantic-release">
    <img alt="semantic-release: angular" src="https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release">
  </a>
  <a href="https://dependabot.com/">
    <img alt="Dependabot" src="https://badgen.net/badge/Dependabot/enabled/green?icon=dependabot">
  </a>
  <a href="https://github.com/prettier/prettier">
    <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square">
  </a>
</p>

## Usage

```
...

plugins:
  - serverless-s3-security-helper

...

```

## Background

This plugin set settings on all S3 buckets. These are settings that are commonly required for security compliance. It handles severless deployment buckets as well as buckets created by a service.

Currently, the plugin:

- enables versioning for objects
- blocks all public access on the bucket, by default

This plugin has two hooks:

- package:createDeploymentArtifacts
- package:compileEvents

At each step, the buckets are set to be configured properly. This ensures the serverless deployment bucket is configured properly throughout its entire lifecycle.

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

See [LICENSE](LICENSE) for full details.

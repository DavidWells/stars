---
repo: 3p3r/cdk-web
url: 'https://github.com/3p3r/cdk-web'
homepage: 'https://3p3r.github.io/cdk-web'
starredAt: '2022-02-08T04:03:37Z'
createdAt: '2022-02-04T02:09:10Z'
updatedAt: '2023-05-20T20:01:38Z'
language: JavaScript
license: MIT
branch: main
stars: 46
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:15.556Z'
description: AWS CDK compiled for web (and Node!)
tags:
  - aws
  - aws-cdk
  - cdk
  - cloudformation
  - constructs
  - javascript
  - npm-package
  - typescript
  - wasm
  - webpack
---

# cdk-web :rocket: [**DEMO**](https://3p3r.github.io/cdk-web)

:muscle: &nbsp;AWS CDK compiled for web (and Node!)

[![npm](https://img.shields.io/npm/v/cdk-web.svg)](https://www.npmjs.com/package/cdk-web)&nbsp;
[![vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/cdk-web)](https://security.snyk.io/vuln/npm/?search=cdk-web)&nbsp;
[![continuos integration](https://github.com/3p3r/cdk-web/actions/workflows/ci.yml/badge.svg)](https://github.com/3p3r/cdk-web/actions)&nbsp;
[![downloads](https://img.shields.io/npm/dt/cdk-web.svg?label=cdk-web)](https://www.npmjs.com/package/cdk-web)&nbsp;![+](https://img.shields.io/badge/-%2B-blueviolet)&nbsp;[![downloads](https://img.shields.io/npm/dt/aws-cdk-web.svg?label=aws-cdk-web)](https://www.npmjs.com/package/aws-cdk-web)&nbsp;
[![types](https://img.shields.io/npm/types/cdk-web)](https://github.com/3p3r/cdk-web/blob/main/docs/types.md)&nbsp;

> [cdk-web](https://www.npmjs.com/package/cdk-web) and [aws-cdk-web](https://www.npmjs.com/package/aws-cdk-web) are functionally identical packages on `npm`. read about the differences [below](#cdk-web-vs-aws-cdk-web).

## index

| [usage](#usage) | [docs](#documentation) | [tests](#testing) | [types](#types) | [docs](docs/README.md) |
| --------------- | ---------------------- | ----------------- | --------------- | ---------------------- |

## usage

### via `npm`

```bash
npm install --save cdk-web aws-sdk
```

### via `unpkg`

```HTML
<script src="https://sdk.amazonaws.com/js/aws-sdk-2.1000.0.min.js"></script>
<script src="https://unpkg.com/cdk-web"></script>
```

## sample app

```JS
const CDK = require("cdk-web");
const cdk = CDK.require("aws-cdk-lib");
const ec2 = CDK.require("aws-cdk-lib/aws-ec2");
const sqs = CDK.require("aws-cdk-lib/aws-sqs");
const sns = CDK.require("aws-cdk-lib/aws-sns");
const s3 = CDK.require("aws-cdk-lib/aws-s3");
const app = new cdk.App();
const stack = new cdk.Stack(app, "BrowserStack");
const vpc = new ec2.Vpc(stack, "VPC");
const queue = new sqs.Queue(stack, "Queue");
const topic = new sns.Topic(stack, "Topic");
const bucket = new s3.Bucket(stack, "Bucket");
const assembly = await app.synth();
console.log(assembly);
```

## `cdk-web` vs `cdk`

- `cdk-web` does not have a dependency on any NPM packages
- `cdk-web` is and will always be compatible with "strict" mode
- `cdk-web` core framework weighs a whopping 200MB less than native CDK
- `cdk-web` runs much faster than CDK thanks to it being entirely in-memory
- `cdk-web` is a symmetrical package that works both in Node and web browsers
- `cdk-web` is compressed and goes through the Closure Compiler on each release
- `cdk-web` is arguably securer than CDK, again thanks to it being entirely in-memory
- `cdk-web` allows you to Bring Your Own AWS SDK bundle ([details here](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/building-sdk-for-browsers.html#using-the-sdk-builder))

## building

`npm run build` builds cdk-web. everything is bundled in `dist/cdk-web.js`.
you may open up `dist/index.html` in your browser if you want to just play with the compiled bundle.
you can build a dev bundle verbosely with `DEBUG='CdkWeb*'` and `CDK_WEB_DEBUG=1` environment variables set.

## testing

testing is done by Puppeteer. the actual generated bundle is loaded into Puppeteer and tests are executed against it.
run `npm test` to execute them. tests are executed twice: once in Puppeteer vs. native CDK as ground truth, and once in
NodeJS to make sure the final bundle is also usable and sane in NodeJS-like environments. Coverage is also collected in
NodeJS mode solely due to the fact that currently the toolchain does not have sufficient support to collect coverage in
Puppeteer (which would be ideal). Although, NodeJS coverage is a good estimate of where everything is at.

## types

`cdk-web` ships with a single `.d.ts` file that gives you the same typings as the native cdk. to get it to work, check
out [docs/types.md](docs/types.md). typings for `aws-cdk-lib` and `constructs` are bundled as well.

## `cdk-web` vs `aws-cdk-web`

The two packages are identical, mirrored, and released to at the same time.
You may use [the other mirror](https://www.npmjs.com/package/aws-cdk-web) if you are behind a corporate proxy and your
NPM packages go through a third-party repository such as Artifactory. The mirror does not list any packages as
devDependencies in its package.json. This prevents `cdk-web` to be incorrectly flagged as vulnerable due to its outdated
devDependencies. `cdk-web` is a compiled project. Its compiler and toolchain being outdated does not impact its runtime.
It's all client side JavaScript anyway. The mirror is only provided for your convenience.

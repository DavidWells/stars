---
repo: evilkiwi/lamware
url: 'https://github.com/evilkiwi/lamware'
homepage: 'https://docs.evil.kiwi/lamware/'
starredAt: '2022-06-07T19:48:33Z'
createdAt: '2022-03-22T01:54:12Z'
updatedAt: '2024-08-06T18:47:23Z'
language: TypeScript
license: GPL-3.0
branch: master
stars: 14
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:42.823Z'
description: AWS Lambda Middleware design pattern
tags:
  - async
  - aws
  - framework
  - lambda
  - middleware
  - typescript
---

<div align="center">
  <a href="https://www.npmjs.com/package/@lamware/core" target="_blank">
    <img src="https://img.shields.io/npm/v/@lamware/core?style=flat-square" alt="NPM" />
  </a>
  <a href="https://discord.gg/3S6AKZ2GR9" target="_blank">
    <img src="https://img.shields.io/discord/1000565079789535324?color=7289DA&label=discord&logo=discord&logoColor=FFFFFF&style=flat-square" alt="Discord" />
  </a>
  <img src="https://img.shields.io/npm/l/@lamware/core?style=flat-square" alt="GPL-3.0-only" />
  <h3>AWS Lambda Middleware Pattern (NodeJS)</h3>
</div>

[Lamware](https://github.com/evilkiwi/lamware) is a simple design pattern based on middleware for AWS Lambda. Lambda, like other Cloud Function platforms, is executed by a request - which could be from anything like a queue (SQS) to a HTTP request. Since Lambda focusses on business logic, setting things up before-hand can be quite tedious.

Using a middleware pattern means your function is slightly delayed in recieving the event whilst Lamware runs various logic to set things up (in parallel, where possible). For example, you could have middleware set up to do things like:

- Pull Secrets from Secrets Manager/external service
- Fetch JSON config from AppConfig
- Exit early if this was a Warming event from CloudWatch
- Automate some Tracing bootstrap
- Set-up some best practises (Like `callbackWaitsForEmptyEventLoop`)

## Installation

This package is available via NPM:

```bash
yarn add @lamware/core

# or

npm install @lamware/core
```

We maintain and ship various middlewares for public use - you can [install them too](https://github.com/evilkiwi/lamware/tree/master/packages)!

## Usage

We have [Documentation available here](https://docs.evil.kiwi/lamware), and you can check out the [`example` folder](https://github.com/evilkiwi/lamware/tree/master/example) for a fully-featured example with the AWS CDK stack to deploy it.

```typescript
import { powertoolsTracing } from '@lamware/powertools-tracing';
import { powertoolsLogger } from '@lamware/powertools-logger';
import type { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { doNotWait } from '@lamware/do-not-wait';
import { appconfig } from '@lamware/appconfig';
import { sentry } from '@lamware/sentry';
import { warmer } from '@lamware/warmer';
import { lamware } from '@lamware/core';

const { handler } = lamware<APIGatewayProxyHandlerV2<any>>()
  .use(doNotWait())
  .use(powertoolsTracing({
    serviceName: 'lamware-example',
  }))
  .use(powertoolsLogger({
    serviceName: 'lamware-example',
    logLevel: 'DEBUG',
  }))
  .use(appconfig<{ hello: string }>({
    app: 'evilkiwi-lamware-example',
    env: 'production',
    config: 'production',
  }))
  .use(sentry({
    config: {
      dsn: 'https://d99b0b438475869385706e70157c5e05@o1080839.ingest.sentry.io/6270000',
    },
  }))
  .use(warmer())
  .execute(async ({ state }) => {
    return {
      statusCode: 200,
      body: JSON.stringify({
        hello: 'world',
        appconfig: state.config,
      }),
    };
  });

export { handler };
```

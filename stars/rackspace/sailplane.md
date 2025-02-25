---
repo: rackspace/sailplane
url: 'https://github.com/rackspace/sailplane'
homepage: ''
starredAt: '2019-10-05T04:22:18Z'
createdAt: '2019-01-17T23:53:44Z'
updatedAt: '2025-02-08T00:34:20Z'
language: TypeScript
license: NA
branch: master
stars: 27
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:22.008Z'
description: Utilities for AWS Serverless development in Javascript and Typescript
tags: []
---

# Sailplane - AWS Serverless Node.js Utilities in Javascript and Typescript

![](docs/sailplane.png)

## What is this?

While developing serverless applications at Onica (now part of [Rackspace Technology](https://www.rackspace.com)),
we found certain patterns being used repeatedly, and code being copied from one project to the next.
These commonalities have been extracted, matured, and gathered into a reusable collection.

Sailplane is the result: a collection of useful packages for use in developing code that runs in AWS.
They are primarily designed for use in Lambda functions, but most are useful in other environments
that use the Node.js 20+ runtime as well. `ExpiringValue` is even useful in web browsers.

The Typescript source is compiled to ES2020 Javascript and distributed with both ESModule and CommonJS
modules for portability, along with Typescript type definition files and map files.
While the typing provides the expected benefit, these utilities may be used in plain
Javascript as well.

Every tool is the genesis of real world needs, and they continue to evolve.
This collection is part of Rackspace Technology's commitment to give back to the open source community.
Find this and other Rackspace open source repositories on [GitHub](https://github.com/rackspace).

## Content

Each utility is described on its own page:

- [AwsHttps - HTTPS client with AWS Signature v4](docs/aws_https.md)
- [ElasticsearchClient - Communicate with AWS Elasticsearch](docs/elasticsearch_client.md)
- [ExpiringValue - Value that is instantiated on-demand and cached for a limited time](docs/expiring_value.md)
- [Injector - Light-weight and type-safe Dependency Injection](docs/injector.md)
- [LambdaUtils - AWS Lambda handler middleware](docs/lambda_utils.md)
- [Logger - CloudWatch and serverless-offline friendly logger](docs/logger.md)
- [StateStorage - Serverless state and configuration storage](docs/state_storage.md)
- [More Examples](docs/examples.md)
- [License](docs/license.md)

## Why "Sailplane"?

Onica's early OSS releases have had aviation themed names;
this may or may not have something to do with the CTO being a pilot. Nobody really knows.

Sailplane was selected for this _serverless_ toolset by considering that
serverless is to computing without the complexities of a server,
as a sailplane is to flight without the complexities of an airplane.

And that's it. Also, the NPM scope was available.

## Development

This is a monorepo with shared development tools at the root level. Each subdirectory is a
project. Use the `npm run` scripts in each package, or from the root workspace to run the
script on all packages.

### Making Changes

1. Create an [issue in Github](https://github.com/rackspace/sailplane/issues). Get approval from the community.
2. Create a branch off of `main`. The branch name should be like `issue/<num>-brief-summary`
3. Make your change and test it thoroughly with unit tests and a project using it.
4. Run `npm run analyze` from the root workspace and resolve all errors.
5. Commit to your git branch and open a [pull request](https://github.com/rackspace/sailplane/pulls).
   - Do not change the version in `package.json`.

### Publish a Release

This is managed from each library package, as they are individually released to NPM.

1. Run `npm run clean && npm run analyze` to confirm that all code builds and tests pass.
2. Use `npm version <major | minor | patch>` to bump the version and tag it in git. ([docs](https://docs.npmjs.com/cli/v10/commands/npm-version))
3. Use `npm publish` to publish the change to NPM. You must have credentials. ([docs](https://docs.npmjs.com/cli/v10/commands/npm-publish))
4. Commit & Push updates to git.

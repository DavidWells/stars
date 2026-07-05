---
repo: orangejellyfish/serverless-starter
url: 'https://github.com/orangejellyfish/serverless-starter'
homepage: ''
starredAt: '2018-09-22T22:52:43Z'
createdAt: '2018-08-13T13:35:10Z'
updatedAt: '2024-09-09T13:57:21Z'
language: JavaScript
license: MIT
branch: master
stars: 26
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:13.736Z'
description: "\U0001F3AC A production-ready Serverless Framework starter kit for Node.js on AWS Lambda"
tags:
  - aws
  - aws-lambda
  - javascript
  - serverless
  - serverless-framework
---

# serverless-starter

An opinionated starter kit by [orangejellyfish][oj] for
[Serverless framework][sls] apps running in [AWS][aws]. Built to be future-proof.
Inspired by and adapted from the excellent [serverless-babel-starter][sbs]
project by [Postlight][pl].

## Features

- Lambdas run Node 18 by default making your functions faster and giving you the
  ability to use more recent ECMAScript features including async/await, optional
  chaining and nullish coalescing.

- Lambda code is bundled with Webpack 5 via the [serverless-webpack][sw] plugin,
  reducing the amount of code deployed to AWS. Source maps are generated and
  included in the bundle for easier debugging.

- Lambda code is compiled with [Babel 7][b7] and [babel-preset-env][bpe],
  meaning you can use even more cutting-edge ECMAScript features if you need to,
  without unnecessarily compiling code that would be supported by Node 16.

- Lambda config is located alongside the function code and referenced from the
  top-level Serverless configuration file, offering greater separation of
  concerns and keeping the configuration file readable.

- IAM roles are configured per-Lambda via the
  [serverless-iam-roles-per-function][sirpf] plugin, meaning functions better
  follow the [principle of least privilege][plp] and are therefore more secure.

- API Gateway request logging into CloudWatch is enabled by default, meaning
  it will be easier to trace requests through the system, leading to more
  convenient debugging.

- AWS X-Ray tracing is enabled for API Gateway and Lambda by default, giving
  greater visibility of the whole stack and making it easier to track down
  bottlenecks.

- Opt-in to upcoming Serverless Framework features and changes to avoid seeing
  deprecation warnings on deployment.

- CloudFormation stacks are split into nested stacks per Lambda function via the
  [split-stacks][spss] plugin, helping to avoid the [limit of 200 resources][lim]
  per stack.

- A "run warm" utility  which can be used as a higher order function by any
  Lambda function handler to keep the container alive, avoiding the
  [cold start][cs] performance problem.

- [Jest][jest] support for unit testing, gathering coverage information by
  default.

- ESLint, Husky and lint-staged config for [greater code consistency][cc].

- Local AWS Lambda and API Gateway emulation via the [serverless-offline][so]
  plugin.

## Usage

You can use the Serverless CLI to scaffold a new project from this starter kit:

```sh
serverless create --template-url https://github.com/orangejellyfish/serverless-starter --path your/local/path
```

## Known issues

> WARNING: More than one matching handlers found for 'src/functions/hello/index'.
> Using 'src/functions/hello/index.js'.

This warning is logged by [serverless-webpack][sw] when bundling the Lambda
function code. It happens because the plugin detects another file in the same
directory with a similar name. The other file is the unit test file. The warning
can be safely ignored. See [this issue][swi] for more information.

[oj]: https://www.orangejellyfish.com/
[sls]: https://serverless.com/framework/
[aws]: https://aws.amazon.com/
[sbs]: https://github.com/postlight/serverless-babel-starter
[pl]: https://github.com/postlight
[sw]: https://github.com/serverless-heaven/serverless-webpack
[b7]: https://babeljs.io/docs/en/next/index.html
[bpe]: https://babeljs.io/docs/en/next/babel-preset-env.html
[sirpf]: https://github.com/functionalone/serverless-iam-roles-per-function
[plp]: https://www.orangejellyfish.com/blog/serverless-and-the-principle-of-least-privilege/
[spss]: https://github.com/dougmoscrop/serverless-plugin-split-stacks
[lim]: https://www.orangejellyfish.com/blog/avoiding-cloudformation-stack-200-resource-limit-serverless/
[cs]: https://serverless.com/blog/keep-your-lambdas-warm/
[jest]: https://jestjs.io/
[cc]: https://www.orangejellyfish.com/blog/code-consistency-with-eslint-and-husky/
[so]: https://github.com/dherault/serverless-offline
[swi]: https://github.com/serverless-heaven/serverless-webpack/issues/405

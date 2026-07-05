---
repo: tschoffelen/serverless-starter
url: 'https://github.com/tschoffelen/serverless-starter'
homepage: 'https://includable.com'
starredAt: '2024-09-16T21:52:52Z'
createdAt: '2021-06-19T11:15:52Z'
updatedAt: '2025-02-07T21:07:31Z'
language: JavaScript
license: NA
branch: main
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:21.755Z'
description: Starter boilerplate for a serverless API.
tags:
  - aws-lambda
  - nodejs
  - serverless
---

# Boilerplate for Serverless APIs

A quick way to get started building a serverless API.

## Tech stack

- [Serverless](https://www.serverless.com/framework/docs/providers/aws/guide/intro/) framework
- [AWS API Gateway HTTP APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api.html)
- [JWT authorizer](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-jwt-authorizer.html)
  using [AWS Cognito](https://aws.amazon.com/cognito/)
- [AWS DynamoDB](https://www.youtube.com/watch?v=6yqfmXiZTlM) database
- [Jest](https://jestjs.io) for testing
- [Github Actions](https://github.com/actions) for CI/CD

## Getting started

### 1. Name your service

Rename package name and service names:

- [`serverless.yml` line 1](serverless.yml)
- [`package.json` line 2](package.json)

### 2. Dependencies

Install dependencies:

```shell
yarn
```

### 3. Custom domain (optional)

Uncomment the `serverless-domain-manager` plugin line and `custom.customDomain` lines in `serverless.yml`,
and set the correct `custom.baseDomain` to set up a custom domain for your API.

---

## Running locally

Start serverless-offline:

```shell
yarn start
```

This will start a local HTTP server on [localhost:3000](http://localhost:3000/).

### Authentication

When using `yarn start`, we're using serverless-offline with the `--noAuth` flag, which means that API endpoints that
have an Authorizer set up will not check the JWT token in the `Authorization` header to authorize users as usual.

Instead, it will read from the file [`tests/local-auth.txt`](tests/local-auth.txt) to
[simulate an authentication context](https://github.com/dherault/serverless-offline#remote-authorizers). This will
simulate a user with user ID `c2dddd0e-fcb1-47ea-b232-cd24d05d8442`.

### Database access

There are packages available to set up DynamoDB testing environments locally
(see [`serverless-dynalite`](https://github.com/nearst/serverless-dynalite)
for example).

What often seems easier, however, is to run a separate DynamoDB table in the cloud to test with during development. This
provides an environment that is the closest to production.

**That's also the default mode for this service:**

- When you run `yarn start`, serverless-offline is started, using the serverless stage 'local' by default. That means
  that it will attempt to connect to a DDB table called `{service}-local` for any database interactions
  (this happens by setting the `TABLE_NAME` env var in `serverless.yml`).
- That does mean that you need AWS access. The AWS SDK will automatically try to use the credentials set up via the AWS
  CLI (and stored in `~/.aws/credentails`).

**A few tips:**

- Default [stage](https://serverless-stack.com/chapters/stages-in-serverless-framework.html)
  is `local` for both the `yarn start` and `yarn deploy` commands. You can supply a `--stage`
  parameter to customize this (other values we use: `staging`, `production`).
- Like everywhere with the AWS CLI, if you have
  multiple [AWS profiles](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html), you can use the
  env var AWS_PROFILE to set the credentials set to be used:
  `AWS_PROFILE=myprofile yarn start`

### Invoke serverless function locally

To run a serverless function locally you can run the command `serverless invoke local -f users-get -p data.json`
where `data.json` is the file containing the data for that request.

You can also use `serverless invoke local -f users-get --data '{ "pathParameters":{"userId":"my-user-id"} }'` to pass
the data inline.

Have a look at the blog
post ["Local development with Serverless"](https://tschoffelen.medium.com/local-development-with-serverless-46a219876a67#6bd7)
for more information.

## Testing

We use Jest to do simple unit tests per function.

Writing a test involves creating a file named `test.js`, calling the app function in your handler, and seeing if the
output and called features is what we expect given a certain input object.

You can run the tests using `yarn test`.

## Deployment

You can deploy manually using the `yarn deploy` command. By default, this will deploy to the `local` stage, but it is
possible to override this to manually deploy to production:

```shell
yarn deploy --stage production
```

<!-- End of readme template -->

<br /><br />

---

<div align="center">
	<b>
		<a href="https://schof.co/consulting/?utm_source=includable/serverless-starter">Get professional support for this package →</a>
	</b>
	<br>
	<sub>
		Custom consulting sessions availabe for implementation support and feature development.
	</sub>
</div>

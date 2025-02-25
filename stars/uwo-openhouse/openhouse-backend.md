---
repo: uwo-openhouse/openhouse-backend
url: 'https://github.com/uwo-openhouse/openhouse-backend'
homepage: ''
starredAt: '2020-03-26T04:35:51Z'
createdAt: '2020-01-09T15:29:52Z'
updatedAt: '2020-04-25T04:37:48Z'
language: JavaScript
license: MIT
branch: develop
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:00.762Z'
description: Backend & Infrastructure for the UWO Open House App
tags:
  - aws
  - dynamodb
  - github-actions
  - sam
  - serverless-functions
---

# openhouse-backend | [![Deploy to Prod](https://github.com/uwo-openhouse/openhouse-backend/workflows/Deploy%20to%20Prod/badge.svg?branch=master)](https://github.com/uwo-openhouse/openhouse-backend/actions?query=workflow%3A%22Deploy+to+Prod%22) [![Deploy to Test](https://github.com/uwo-openhouse/openhouse-backend/workflows/Deploy%20to%20Test/badge.svg?branch=develop)](https://github.com/uwo-openhouse/openhouse-backend/actions?query=workflow%3A%22Deploy+to+Test%22)

This repository contains all the code for the serverless backend using a SAM template. It defines any additional 
infrastructure in the CloudFormation stack to support the project (e.g. databases).

## Documentation

For full documentation see the repository [wiki](https://github.com/uwo-openhouse/openhouse-backend/wiki).

## Initializing

### Local requirements

- Node.js & [Yarn](https://yarnpkg.com/en/docs/install)
- [SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
- [Docker](https://www.docker.com/products/docker-desktop)

```
$ yarn install
```

## Running API Locally

Ensure the docker engine is running and perform the following steps:

```
$ yarn run dynamo
```
This will run DynamoDB in memory in a docker container.

In another terminal run the setup script to configure necessary DynamoDB tables:
```
$ yarn run setup-dynamo
```
This must be re-run anytime the `yarn run dynamo` is restarted.
(Note: Your AWS CLI credentials must be configured for this to work. They do not need to be valid however, dummy values
will work.)

Finally, run the one of following to build and run the API based on your own OS (& restart this whenever you make a change):

```
$ yarn run start:win    // Windows
$ yarn run start:mac    // Mac
$ yarn run start:linux  // Linux
```

## Running tests

Run from the root of the project or lambda function directories:
`yarn test`

## Deployment

This application is continuously deployed on the `develop` to the test environment & `master` to the production
environment.

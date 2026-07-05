---
repo: eddmann/mince-pie-challenge-api-serverless
url: 'https://github.com/eddmann/mince-pie-challenge-api-serverless'
homepage: ''
starredAt: '2018-11-06T22:01:07Z'
createdAt: '2017-12-01T11:12:41Z'
updatedAt: '2018-11-07T02:05:32Z'
language: HTML
license: NA
branch: master
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:06.383Z'
description: 'Serverless HAL API, using Webpack, Flow, Jest, DynamoDB, Cognito and Docker'
tags: []
---

# Mince Pie Challenge API

[![Build Status](https://travis-ci.org/eddmann/mince-pie-challenge-api-serverless.svg?branch=master)](https://travis-ci.org/eddmann/mince-pie-challenge-api-serverless)

🖥️ [Client](https://github.com/eddmann/mince-pie-challenge-client) - 🏗️ [Client Infrastructure](https://github.com/eddmann/mince-pie-challenge-client-terraform)

This API demonstrates the use of:

- [HAL](http://stateless.co/hal_specification.html) is used to represent the API.
- The API is documented using [RAML](https://raml.org/).
- [Serverless Framework](https://serverless.com/) is used to manage the [AWS Lambda](https://aws.amazon.com/lambda/) application and accompanying resources.
- Containerising the Serverless Framework dependency using [Docker](https://www.docker.com/community-edition) and [Docker Compose](https://docs.docker.com/compose/).
- ES6 JavaScript is used with [Webpack](https://webpack.js.org/), [Babel](https://babeljs.io/) and [Flow](https://flow.org/).
- Testing is achieved using [Jest](https://facebook.github.io/jest/).
- Authentication is handled by [Amazon Cognito](https://aws.amazon.com/cognito/) using JWT.
- Persistent state is stored using [Amazon DynamoDB](https://aws.amazon.com/dynamodb/).
- Signed [Amazon S3](https://aws.amazon.com/s3/) URLs are used to upload and store photos.
- Thumbnails are created using an asynchronous S3 upload trigger and AWS Lambda (inc. ImageMagick).
- The custom [Amazon API Gateway](https://aws.amazon.com/api-gateway/) domain is managed using [serverless-domain-manager](https://github.com/amplify-education/serverless-domain-manager).

## Usage

You are able to easily interact with the Docker container using the provided `Makefile`.

Note: ensure that you have provided the necessary AWS credentials within a `.env` file, based on `.env.template`.

```
$ make build
$ make test
$ make deploy
```

---
repo: Foursball/foosball-backend
url: 'https://github.com/Foursball/foosball-backend'
homepage: null
starredAt: '2016-11-27T10:29:04Z'
createdAt: '2016-06-05T15:29:23Z'
updatedAt: '2016-11-27T10:29:04Z'
language: JavaScript
license: NA
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:13.359Z'
description: 'Backend functions for https://github.com/SirZach/foosball'
tags: []
---

# Foosball Lambda Functions
This folder contains a [Serverless](https://github.com/serverless/serverless) framework application.

To install serverless run `npm i -g serverless`. Afterwards run `serverless project init` and follow the steps to create your own AWS environment.

## Local Testing
A function can be locally tested by running `serverless function run [function-name]` from this directory. This will ingest the `event.json` payload and output the result of the function. This emulates a request through the AWS API Gateway and a REST response.

There is also `example.config.json` file which needs to be copied to `dev-config.json` (make one for each environment) and updated to contain real values. You can generate a Slack API token at https://api.slack.com/docs/oauth-test-tokens.

**NOTE:** Before deploying make sure to copy the appropriate config to `config.json` before deploying to an environment.

To test commands which use your user ID make sure to update the **user_id** section in `event.json` with your user ID which can be retrieved from a test method such as https://api.slack.com/methods/auth.test/test.

## Deploying
Both the function endpoints and Lambda functions need to be deployed separately. To deploy the endpoints to API Gateway run `serverless endpoint deploy`. The URLs for each endpoint will be output during the deploy.

To deploy a function run `serverless function deploy [function-name]` or deploy all functions with `serverless function deploy -a`.

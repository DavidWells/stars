---
repo: lemoncloud-io/lemon-hello-api
url: 'https://github.com/lemoncloud-io/lemon-hello-api'
homepage: ''
starredAt: '2022-10-22T19:27:28Z'
createdAt: '2019-01-10T07:40:22Z'
updatedAt: '2025-01-01T11:34:54Z'
language: TypeScript
license: MIT
branch: develop
stars: 8
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:17.925Z'
description: Simple Serverless API to send message to Slack
tags:
  - cloudwatch-alarms
  - lambda
  - microservice
  - nodejs
  - serverless
  - slack-webhook
  - sns-notifications
---

[![travis](https://travis-ci.org/lemoncloud-io/lemon-hello-api.svg?branch=master)](https://travis-ci.org/lemoncloud-io/lemon-hello-api)
[![codecov](https://codecov.io/gh/lemoncloud-io/lemon-hello-api/branch/master/graph/badge.svg)](https://codecov.io/gh/lemoncloud-io/lemon-hello-api)
[![npm version](https://badge.fury.io/js/lemon-hello-api.svg)](https://badge.fury.io/js/lemon-hello-api)
[![GitHub version](https://badge.fury.io/gh/lemoncloud-io%2Flemon-hello-api.svg)](https://badge.fury.io/gh/lemoncloud-io%2Flemon-hello-api)

# lemon-hello-api

Simple Serverless MicroService API with `Lambda` + `API Gateway` + `Web Socket` + `SNS` + `SQS` + `KMS`, and `DynamoDB`.

- Sample DevOps with `babel` + `eslint` + `jest` + `supertest` + `codecov` + `travis`

- Sample Integrated with `Slack` + `CloudWatch Alarm`


## Description

- Standard devops by lemon based on `Nodejs` + `Typescript`
- Support sending message to `Slack` from AWS CloudWatch. (see `lemon-hello-sns` AWS SNS after deploying)
- Save slack message to `S3` bucket as json object
- Use `DynamoDB` to manage the route-rules per each channels.


## Usage

- Fork and Customize the code, and run `npm install`

    ```bash
    # STEP.1 install packages. (using ci)
    $ npm ci
    # STEP.2 customize profile in env/<profile>.yml
    # STEP.3 add profile infor to env/config.js
    # STEP.4 deploy into your AWS account.
    $ npm run deploy
    ```


- **Example** Screenshot of `slack` when receiving message.

    ![SlackError](assets/sns.report-error.png)


## Installation

**[Overrall]**

1. Copy and customise the main config files: `env/lemon.yml`, `env/config.js`
1. Change `SLACK_PUBLIC` address by slack webhook.
1. Encrypt `slack` webhook url with `KMS`, and update `SLACK_PUBLIC`
1. Deploy to AWS cloud `$ npm run deploy`
1. Enjoy~


### STEP.1 How to encrypt string by KMS

- Create master kms-id for 1st time (at first time).

    ```bash
    # create initial master-key in KMS (example)
    $ aws kms create-key --profile <profile> --description 'hello master key'
    {
        "KeyMetadata": {
            "KeyId": "0039d20d-112233445566-387b887b4783",
        }
    }
    # create Alias as `lemon-hello-api`
    $ aws kms create-alias --profile <profile> --alias-name alias/lemon-hello-api --target-key-id 0039d20d-112233445566-387b887b4783
    ```

- Test encryptioin with KMS

    ```sh
    # run encrypt
    $ aws kms encrypt --profile <profile> --key-id alias/lemon-hello-api --cli-binary-format raw-in-base64-out --plaintext "hello lemon" --query CiphertextBlob --output text
    ```

### STEP.2 Deploy to AWS Cloud

- Make AWS Lambda, and API Endpoint with `serverless`

    ```bash
    # run npm command (if profile is `lemon`, or make your own script)
    $ npm run deploy.lemon
    ```

## Development

- Run for local development.

    ```bash
    # run express service in local (if profile is `lemon`, or make your own script)
    $ npm run express.lemon

    # test encrypt via api
    $ http ':8888/hello/0/test-encrypt'    
    ```

## Support Auto-Build with Travis

- Get NPM Token via [tokens](https://www.npmjs.com/settings/stevelemon/tokens)

```bash
# install travis-cli (MacOS)
$ brew install travis

# encrypt npm token
$ travis encrypt <NPM Token> --add deploy.api_key
```

## How to Contribute

- request via `PR`, or use `Issue`.


## LICENSE

[MIT](http://opensource.org/licenses/MIT)


----------------
# TODO #

- [ ] support dummy restfull api w/ dummy-storage.


----------------
# VERSION INFO #

Version History

| Version   | Description
|--         |--
| 2.4.3     | optimized with `lemon-core#3.2.5`, and cleanup.
| 2.4.2     | optimized with `lemon-core#3.2.4`, and cleanup.
| 2.4.0     | use `DynamoDB` to manage route-rules.
| 2.3.2     | optimized with `lemon-core#3.1.2`, and `nodejs16` runtime.
| 2.3.1     | optimized with `lemon-core#3.1.1`.
| 2.2.3     | optimized `notification` message.
| 2.2.2     | use `direct` to post slack hook directly.
| 2.1.4     | optimized with `lemon-core#2.1.4`.
| 1.3.1     | refactoring with [lemon-core](/lemoncloud-io/lemon-core).
| 1.2.3     | fix: iota of `NS` in sns-service.
| 1.1.0     | Release version with `npm run release`.
| 1.0.3     | support `SQS` with handling SQS message.
| 1.0.2     | support `WSS` with API Gateway + WebSocket.
| 1.0.1     | support `SNS` with CloudWatch Event, and post to `Slack`
| 1.0.0     | initial version with full deploy by profile+stage


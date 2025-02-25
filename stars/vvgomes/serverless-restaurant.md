---
repo: vvgomes/serverless-restaurant
url: 'https://github.com/vvgomes/serverless-restaurant'
homepage: ''
starredAt: '2019-02-14T04:09:05Z'
createdAt: '2018-04-16T00:22:56Z'
updatedAt: '2022-06-11T17:26:21Z'
language: JavaScript
license: Apache-2.0
branch: master
stars: 21
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:45.853Z'
description: Simple CQRS example using AWS Lambda and the Serverless framework.
tags: []
---

# serverless-restaurant
Sample CQRS example using AWS Lambda and the Serverless framework.

## Building & Deploying
```bash
brew bundle
npm install -g serverless
sls login
open https://serverless.com/framework/docs/providers/aws/guide/credentials/
aws configure
aws ssm put-parameter --name accountId --type String --value <your-12-digit-account-id> --region us-east-1
cd menu
npm install
sls dynamodb install
sls deploy
cd ../customers
npm install
sls dynamodb install
sls deploy
cd ../orders
npm install
sls dynamodb install
sls deploy
```

Every deploy (`sls deploy`) will create a Serverless instance that can be managed through a [dashboard](https://platform.serverless.com/). Find sample command/query requests in the `smoke.sh` file in each service directory. To see the database, access the [DynamoDB console](https://console.aws.amazon.com/dynamodb/).

To run the services locally, start the Serverless offline server:
```bash
SLS_DEBUG=* sls offline start
```

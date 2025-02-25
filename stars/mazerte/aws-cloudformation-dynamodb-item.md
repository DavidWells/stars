---
repo: mazerte/aws-cloudformation-dynamodb-item
url: 'https://github.com/mazerte/aws-cloudformation-dynamodb-item'
homepage: null
starredAt: '2018-11-15T03:59:57Z'
createdAt: '2016-09-07T13:00:59Z'
updatedAt: '2018-11-15T03:59:57Z'
language: JavaScript
license: NA
branch: master
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:05.133Z'
description: AWS CloudFormation Custom Resource for AWS DynamoDB Item
tags: []
---

# AWS CloudFormation Custom Resource for AWS DynamoDB Item

This custom resource is based on [cfn-lambda](https://github.com/andrew-templeton/cfn-lambda), you can see this project for more advanced configuration.

## Install

Clone the repository on laptop. Inside the root folder:

```
$ npm install
$ npm run cfn-lambda-deploy
```
This command deploy the lambda helper on your default AWS region and `us-east-1`, `us-west-2`, `eu-west-1`, `ap-northeast-1`. To change this configuration you can follow this [link](https://github.com/andrew-templeton/cfn-lambda#deployment-of-lambdas)

## Example

You can test the custom resource by running `example/preset.cform`. This only parameter is the name of the lambda function created during the installation.

## Docs

All parameters usable is the same of the parameters use by aws-sdk to [put a item](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#putItem-property)

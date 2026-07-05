---
repo: binoculars/aws-cloudformation-cognito-identity-pool
url: 'https://github.com/binoculars/aws-cloudformation-cognito-identity-pool'
homepage: null
starredAt: '2018-02-15T21:35:39Z'
createdAt: '2016-06-07T14:36:17Z'
updatedAt: '2023-01-28T21:22:40Z'
language: JavaScript
license: Unlicense
branch: master
stars: 35
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:28.142Z'
description: A Lambda-backed Custom Resource for a Cognito Identity Pool in CloudFormation
tags:
  - aws
  - cloudformation
  - cloudformation-template
  - cognito
  - cognito-identity-pool
  - lambda
---

❗️**DEPRECATED as of 2017-04-28. Please use [AWS::Cognito::IdentityPool](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-identitypool.html)**

# AWS CloudFormation Cognito Identity Pool

> An [AWS Lambda-backed Custom Resource](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-custom-resources-lambda.html) for CRUD operations on Cognito Identity Pools

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/5149b6ed184b4775b3d0ef04c6a4e27f)](https://www.codacy.com/app/barrett-harber/aws-cloudformation-cognito-identity-pool?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=binoculars/aws-cloudformation-cognito-identity-pool&amp;utm_campaign=Badge_Grade)
[![Dependency Status](https://david-dm.org/binoculars/aws-cloudformation-cognito-identity-pool.svg)](https://david-dm.org/binoculars/aws-cloudformation-cognito-identity-pool)
[![devDependency Status](https://david-dm.org/binoculars/aws-cloudformation-cognito-identity-pool/dev-status.svg)](https://david-dm.org/binoculars/aws-cloudformation-cognito-identity-pool#info=devDependencies)
[![Code Climate](https://codeclimate.com/github/binoculars/aws-cloudformation-cognito-identity-pool/badges/gpa.svg)](https://codeclimate.com/github/binoculars/aws-cloudformation-cognito-identity-pool)
[![Test Coverage](https://codeclimate.com/github/binoculars/aws-cloudformation-cognito-identity-pool/badges/coverage.svg)](https://codeclimate.com/github/binoculars/aws-cloudformation-cognito-identity-pool/coverage)
[![Issue Count](https://codeclimate.com/github/binoculars/aws-cloudformation-cognito-identity-pool/badges/issue_count.svg)](https://codeclimate.com/github/binoculars/aws-cloudformation-cognito-identity-pool)
[![Known Vulnerabilities](https://snyk.io/test/github/binoculars/aws-cloudformation-cognito-identity-pool/badge.svg)](https://snyk.io/test/github/binoculars/aws-cloudformation-cognito-identity-pool)
[![Greenkeeper badge](https://badges.greenkeeper.io/binoculars/aws-cloudformation-cognito-identity-pool.svg)](https://greenkeeper.io/)
[![bitHound Code](https://www.bithound.io/github/binoculars/aws-cloudformation-cognito-identity-pool/badges/code.svg)](https://www.bithound.io/github/binoculars/aws-cloudformation-cognito-identity-pool)

- Master: [![CircleCI](https://circleci.com/gh/binoculars/aws-cloudformation-cognito-identity-pool/tree/master.svg?style=svg)](https://circleci.com/gh/binoculars/aws-cloudformation-cognito-identity-pool/tree/master)
- Develop: [![CircleCI](https://circleci.com/gh/binoculars/aws-cloudformation-cognito-identity-pool/tree/develop.svg?style=svg)](https://circleci.com/gh/binoculars/aws-cloudformation-cognito-identity-pool/tree/develop)

### Background
Cognito Identity Pools are not currently supported within CloudFormation templates. However, CloudFormation provides extensibility via Custom Resources, which enable Create/Update/Delete operations. This is meant to replace having to manually create Cognito Identity Pools manually via the CLI or web console.

> See the related [blog post](https://medium.com/@barrettharber/polyfilling-aws-cloudformation-with-a-lambda-backed-custom-resource-a907f65144d5#.fnl9giwg1) for more information.

### Quick Start
1. Ensure you have node.js >= 6 installed (preferably via nvm)
1. Install gulp globally (`yarn global add gulp`)
1. Clone this repository
1. Run `yarn`
1. Create an S3 bucket to hold your Lambda Function (skip this if you already have one)
1. Create `config.json` (see below)
1. Ensure you have the [AWS SDK for Node.js configured](https://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html) correctly. Also, set the `AWS_REGION` environment variable.
1. Run `gulp` this will:
  1. Build the Lambda function and place it in dist.zip
  1. Upload the function to S3
  1. Create the CloudFormation Stack
1. Create your IAM Role Policy(ies). Examples are provided in [cloudformation-role-policies-example.json](cloudformation-role-policies-example.json), which provides managed policies that are attached to the IAM roles. This is necessary for your users to be able to use their credentials to do anything.

### Example `config.json`
Create a `config.json` file. See [The AWS-SDK for JavaScript docs on CognitoIdentity](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentity.html#createIdentityPool-property) for options, or run `aws cloudformation get-template-summary --template-body file:///path/to/cloudformation.json`

```JSON
{
	"IdentityPoolName": "IdentityPoolName",
	"AllowUnauthenticatedIdentities": false,
	"LambdaS3Bucket": "bucket-name",
	"LambdaS3Key": "CloudFormation-CustomResource-CognitoIdentityPool.zip",
	"DeveloperProviderName": "com.site"
}
```

All non-string values will be stringified for the CloudFormation template. If you're going to use the template directly (instead of using gulp), keep this in mind.

### Testing
1. Configure your environment
  - Run yarn install (`yarn`)
  - Create your Lambda S3 Bucket
  - Configure the AWS SDK for Node.js (or just set the `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, and `AWS_REGION` environment variables)
  - Create your `config.json`
1. Run `yarn test`

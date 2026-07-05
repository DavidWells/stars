---
repo: jenseickmeyer/github-commit-status-bot
url: 'https://github.com/jenseickmeyer/github-commit-status-bot'
homepage: >-
  https://scratchpad.blog/devops/howto/send-commit-status-from-codepipeline-to-github/
starredAt: '2019-07-10T00:37:18Z'
createdAt: '2018-08-25T19:31:43Z'
updatedAt: '2024-11-29T15:18:13Z'
language: JavaScript
license: MIT
branch: master
stars: 33
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:29.831Z'
description: >-
  Lambda function for updating the commit status on GitHub based on CodePipeline
  execution state changes.
tags:
  - aws
  - cloudwatch-events
  - codepipeline
  - lambda
  - nodejs
  - serverless
  - serverlessapplicationmodel
---

# GitHub Commit Status Bot

This serverless application provides a solution for integrating AWS CodePipeline with the GitHub Commit Status API. This way the success or failure of a build pipeline can be shown in the GitHub Commit history.

The application is based on the *Serverless Application Model* (SAM) provided by AWS. Basically, it simply consists of a Lambda function which subscribes to CloudWatch Events to get notified once states for CodePipeline pipelines change.

## Install
Installing the application is pretty straight-forward. As a pre-requiste, the AWS CLI needs to be installed on the machine from which the deployment should be performed.

First, you need to create a *Personal Access Token* in GitHub and store it to the Parameter Store of the AWS Systems Manager. You need to do this in the AWS region into which you want to deploy the application. This can either be done via the AWS Console or the following AWS CLI command:

```bash
aws ssm put-parameter --name /github/personal_access_token --value TOKEN --type String
```

It's important to use the key `/github/personal_access_token` since this is used in the SAM template.

Next, the deployment script deploy.sh must be changed slightly. The variable `S3_BUCKET` must be set to the name of the S3 bucket into which deployment artifacts should be stored. If in doubt it makes sense to create a new bucket for this purpose. Other things can be changed, too, like the name of the CloudFormation stack that will be created for this application.

Finally, the deployment script can just be executed

```bash
bash deploy
```

---
repo: eleva/serverless-textract-ocr-skeleton
url: 'https://github.com/eleva/serverless-textract-ocr-skeleton'
homepage: null
starredAt: '2025-04-22T22:10:05Z'
createdAt: '2024-05-28T12:19:17Z'
updatedAt: '2025-04-22T22:10:06Z'
language: JavaScript
license: NA
branch: main
stars: 1
isPublic: true
isTemplate: true
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-04-25T21:49:13.188Z'
description: >-
  This repo contains a serverless EU-Driving Licences OCR micro-service, based
  on Amazon Textract.
tags: []
---

# serverless-textract-ocr-skeleton
This repo contains a serverless EU-Driving Licences OCR micro-service, based on Amazon Textract as described [here](https://dev.to/ddesio/build-a-serverless-eu-driving-licences-ocr-with-amazon-textract-on-aws-5ckm).

## ⚡ [Setup serverless](https://www.serverless.com)
To start working locally and deploy this project you'll need to install and configure serverless following those steps:

- Install [Serverless](https://www.serverless.com/framework/docs/getting-started)

```
npm install -g serverless@3.38.0
```

- Install [serverless offline plugin](https://www.serverless.com/plugins/serverless-offline)
```bash
sls plugin install -n serverless-offline
```

## ⚡ Serverless.yml
Serverless architecture is defined in root file ```serverless.yml```.<br>
This file is made up of very important sections:
- service: name of your deployed service
- frameworkVersion: to define serverless version
- useDotEnv: to load .env files
- provider: global definitions for AWS provider, loaded with a ```config/serverless-provider.yml``` file
- plugins: serverless plugin list which are used by this project, loaded with a ```config/serverless-plugins.yml``` file
- functions: definition for each function, loaded by specific file for each function (```src/**/serverless-provider.yml```)
- custom: custom definitions

## 🧪 Tests - Run Locally
Sample tests are implemented using [jest](https://jestjs.io/) and [jest-openapi](https://github.com/openapi-library/OpenAPIValidators/tree/master/packages/jest-openapi)
Copy ```.env.dist``` to ```.env.test```, and customize your env vars.

Tests under ```_tests_/document/ocr``` folder is useful to test this OCR. 
It simulates an S3 trigger event of ```test\TEST_FILE``` in ```TEST_BUCKET```, invoking the function which calls Amazon Textract.

Please create your bucket and upload some test files with ```test``` prefix before execute it.
Then, be sure to update your ```.env.test``` with at least those parameters

```dotenv
#AWS CONFIG
AWS_REGION=eu-west-1 #AWS REGION
AWS_ACCESS_KEY_ID=xxx ##This key will be used to configure textract
AWS_SECRET_ACCESS_KEY=xxx ##This key will be used to configure textract
#TEST
TEST_FILE=xxx #DEFINES THE TEST FILE NAME
TEST_BUCKET=xxx #DEFINES THE TEST BUCKET
```

Your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY should be mapped to a user with permission to invoke Textract and S3.

Run your test with

```bash
npm run test
```

This command will run for you jest defining ```.env.test``` as dotenv file to be used as follow
```bash
DOTENV_CONFIG_PATH=.env.test jest --coverage
```

You'll find your test coverage under ```coverage``` folder.<br>

## ☁️ Deploy API on AWS Cloud

### Deploy from your local environment

Before proceed:
- Create AWS access key or ask one to your team
- Configure local serverless profiles for dev, staging, prod environments with
```
sls config credentials --provider aws --key <key> --secret <secret> --profile dev
sls config credentials --provider aws --key <key> --secret <secret> --profile staging
sls config credentials --provider aws --key <key> --secret <secret> --profile prod
```
<b>
⚠️ Please store securely your dev, staging, prod keys and secret<br>
⚠️ You should never commit those keys and secret into this repo.<br>
⚠️ You should never set those keys and secret into .env.dist configuration file.️<br>
</b>

Please be sure to update those variables in your ```.env.* files```.
You should have at least three files: ```.env.dev```, ```.env.staging``` and ```.env.prod```.
Those will be used to deploy respectively ``` dev```, ```staging``` and ```prod``` stages.

```dotenv
#APP CONFIG
SERVICE_NAME=textract-ocr
APP_ENV=dev
STAGE_NAME=dev
#AWS CONFIG
AWS_REGION=eu-west-1 #AWS REGION
SG1=xxx #LAMBDA SECURITY GROUP FOR PROD
SUBNET1=xxx #VPC SUBNET1
SUBNET2=xxx #VPC SUBNET1
SUBNET3=xxx #VPC SUBNET1
```

Be aware to update SG and SUBNETS variables depending on the stage (dev/staging/prod).

Run this choosing a stage (dev/staging/prod) and relative profile (dev/staging/prod) when deploying
```bash
sls deploy --aws-profile $PROFILE --stage $STAGE_NAME 
```

### Deploy with AWS CodePipeline and AWS CodeBuild
You will find a preconfigured ```buildspec.yml``` which install, build, deploy and generate docs on AWS cloud (with serverless on AWS Lambda + API Gateway).<br>
You can use it as build specification for AWS CodeBuild project triggered by AWS CodePipeline.<br>
We suggest you to have a specific pipeline per stage dev/staging/v1 connected to specific branches on git (using gitflow).


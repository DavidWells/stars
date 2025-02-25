---
repo: donkersgoed/serverless-messaging-latency-compared
url: 'https://github.com/donkersgoed/serverless-messaging-latency-compared'
homepage: null
starredAt: '2022-09-05T22:56:07Z'
createdAt: '2022-09-04T12:56:42Z'
updatedAt: '2024-07-15T20:09:20Z'
language: Python
license: NA
branch: main
stars: 18
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:33.177Z'
description: null
tags: []
---

# Bite-Sized Serverless: Serverless Messaging: Latency Compared

This project contains the infrastructure definition used in the article Serverless Messaging: Latency Compared on Bite-Sized Serverless: https://bitesizedserverless.com/bite/serverless-messaging-latency-compared/

The compiled CloudFormation files can be found in the `cdk.out` folder. The Python files for the Lambda functions are placed in `lambda/functions`.

To compile the CloudFormation templates, follow these steps:

1. First create a `virtualenv` with `python3 -m venv .venv`.
2. Then activate the `virtualenv` with `source .venv/bin/activate`.
3. Next, install the required Python packages by running `pip install -r requirements.txt`
4. Then compile CloudFormation by running `cdk synth`. The output will be stored in `cdk.out`.

To deploy the templates to your AWS account, run `cdk deploy`.

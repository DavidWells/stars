---
repo: rgrhodesdev/serverless-event-example
url: 'https://github.com/rgrhodesdev/serverless-event-example'
homepage: null
starredAt: '2021-12-01T00:05:41Z'
createdAt: '2021-11-28T22:44:37Z'
updatedAt: '2021-12-01T00:05:41Z'
language: Python
license: NA
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:33.275Z'
description: null
tags: []
---

**Introduction**

Create a service to produce, route and consume an AddToBasket event in AWS. Defined and deployed using the Serverless Framework using serverless technologies and event driven architecture.

**Pre Requisites**

Before you can deploy the service you will need the following configured in your development environment:

An active AWS account (Free tier if possible, though any costs will be minimal)
An IAM User with Administrative programmatic access
AWS CLI installed
Git installed
Serverless Framework installed

If you do need to get this setup please refer to the links below to get you started:

- AWS Account - https://aws.amazon.com
- AWS CLI - https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
- AWS Programmatic Access - https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys
- Git - https://git-scm.com/
- Serverless Framework - https://github.com/serverless/serverless

**Implementation**

The service can be installed to your environment directly from the github repo using the command below:

serverless install --url https://github.com/rgrhodesdev/serverless-event-example

In your terminal cd to the serverless-event-example folder (if required)

To deploy the service run the following command:

serverless deploy --bucketname [outputbucket]

The [outputbucket] parameter must be specified and on the command line, and will be the name of the s3 bucket created in your AWS account as part of the service deployment.

When successfully deployed to your AWS account the service consists of the following event driven, serverless infrastructure:

- A Lambda function, acting as an event producer that when invoked creates a custom AddToBasket event 
- Two Event Bridge rules to route events based on the action and state (Success or Failed) of the event.
- A second lambda function, acting as an event consumer that will output a time stamped key to S3, based on the action and state of the event.

In addition the following serverless AWS infrastructure is deployed to support service execution:

- S3 Bucket - Where the event consumer output is written
- Parameter Store - Consumer output bucket name is written to a parameter during deployment. This value is read by the Event Consumer.

All infrastructure is defined in the serverless.yml file. The format and statements are based on standard AWS Cloudformation template (yaml) syntax.

Code for the Event Producer and Event Consumer Lambda functions are written in python.

- producer.py
- consumer.py

**Invoke the Event Producer**

Using the serverless command invoke we can execute the event producer lambda function from the command line as follows:

serverless invoke --function producer-event

On Successful invocation a new key will be added to the S3 bucket you specified when deploying the service from the command line

**Remove Deployed Infrastructure**

To delete any provisioned infrastructure, delete any files created in the [outputbucket] and run the following command

serverless remove

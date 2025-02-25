---
repo: allenheltondev/aws-cross-account-lambda-authorizer
url: 'https://github.com/allenheltondev/aws-cross-account-lambda-authorizer'
homepage: null
starredAt: '2025-01-19T22:51:05Z'
createdAt: '2021-02-09T12:29:08Z'
updatedAt: '2025-01-19T22:51:06Z'
language: null
license: MIT
branch: main
stars: 11
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:11.438Z'
description: Example repository for how to implement a cross account lambda authorizer
tags: []
---

# AWS Cross-Account Lambda Authorizer 
Example repository for how to implement a cross account lambda authorizer

## Contents
This repository contains three [SAM templates](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-specification.html) to illustrate how to configure a lambda authorizer to use across multiple AWS accounts for your serverless ecosystem.

* *prerequisites*
  * This folder contains a stack that should be deployed in all consuming AWS Accounts. It creates a [CloudFormation macro](https://www.readysetcloud.io/blog/allen.helton/automate-your-automation-with-cloudformation-macros/) to get around a defect in SAM. 
  * Deploy this stack first!
* *authorizer*
  * Contains the lambda authorizer itself and permissions to allow consumption by other AWS accounts
  * Deploy this stack in your parent/host account!
* *consumers*
  * This folder shows how to consume the lambda authorizer on a serverless API defined with an [Open API Spec](https://www.openapis.org)
  * Deploy this stack last and in each of your consuming accounts

## Usage
This repository is an example of how to set up the permissions via a SAM template. For a real implementation, you must write the authorizer code itself. [Alex Debrie](https://twitter.com/alexbdebrie) has a [great post](https://www.alexdebrie.com/posts/lambda-custom-authorizers/) on how to build one.

After writing the authorizer, you must get the account ids for your ecosystem and [override the SAM parameters](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-deploy.html) with the `--parameter-overrides` flag. 

**Example Authorizer Deployment Script**
```
sam build --parallel
sam package --output-template-file packaged.yaml --s3-bucket {{MY_S3_BUCKET}
sam deploy --template-file packaged.yaml --s3-bucket {{MY_S3_BUCKET}} --stack-name {{MY_STACK_NAME}} --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM --parameter-overrides ConsumerOneAccountId={{CONSUMER_ONE_ACCOUNT_ID} ConsumerTwoAccountId={{CONSUMER_TWO_ACCOUNT_ID}
```
*Note - You must use CAPABILITY_NAMED_IAM when deploying the lambda authorizer because you are explicitly giving the function a name.*

**Example Consumer Deployment Script**
```
sam build --parallel
sam package --output-template-file packaged.yaml --s3-bucket {{MY_S3_BUCKET}
sam deploy --template-file packaged.yaml --s3-bucket {{MY_S3_BUCKET}} --stack-name {{MY_STACK_NAME}} --capabilities CAPABILITY_IAM --parameter-overrides AuthorizerAccountId={{AUTHORIZER_ACCOUNT_ID}
```

## Contact
If you have any questions, feel free to reach out or check out my blog for more information.

[![Twitter][1.1]][1] [![GitHub][2.1]][2] [![LinkedIn][3.1]][3] [![Ready, Set, Cloud!][4.1]][4]

[1.1]: http://i.imgur.com/tXSoThF.png
[2.1]: http://i.imgur.com/0o48UoR.png
[3.1]: http://i.imgur.com/lGwB1Hk.png
[4.1]: https://readysetcloud.s3.amazonaws.com/logo.png

[1]: http://www.twitter.com/allenheltondev
[2]: http://www.github.com/allenheltondev
[3]: https://www.linkedin.com/in/allen-helton-85aa9650/
[4]: https://readysetcloud.io

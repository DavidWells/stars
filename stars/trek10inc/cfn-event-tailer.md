---
repo: trek10inc/cfn-event-tailer
url: 'https://github.com/trek10inc/cfn-event-tailer'
homepage: null
starredAt: '2025-01-08T05:53:53Z'
createdAt: '2022-07-07T13:55:09Z'
updatedAt: '2025-01-08T05:53:54Z'
language: JavaScript
license: NA
branch: main
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:19.268Z'
description: A CloudFormation event tailer that includes nested stacks
tags: []
---

# cfn-event-tailer

This CLI will tail the events of a CloudFormation stack with a running operation, including events from any nested stack being updated.

## Usage

```txt
cfn-event-tailer <stack-name>
Usage:
  <stack-name> the name of the stack to tail
```

## Display

A table will be printed to stdout, scaling to fit the width of your terminal. From left to right are the following:

- Stack name that the event took place in
- Timestamp of the event
- LogicalId of the event's resource
- Type of the event's resource
- Status of the event
- StatusReason of the event

## Example

```sh
$ npx cfn-event-tailer sam-app
sam-app    2022-07-07T14:20:46.252Z  sam-app                               AWS::CloudFormation::Stack   REVIEW_IN_PROGRESS    User Initiated
sam-app    2022-07-07T14:22:14.659Z  sam-app                               AWS::CloudFormation::Stack   CREATE_IN_PROGRESS    User Initiated
sam-app    2022-07-07T14:22:20.281Z  HelloWorldFunctionRole                AWS::IAM::Role               CREATE_IN_PROGRESS
sam-app    2022-07-07T14:22:20.662Z  HelloWorldFunctionRole                AWS::IAM::Role               CREATE_IN_PROGRESS    Resource creation Initiated
sam-app    2022-07-07T14:22:37.723Z  HelloWorldFunctionRole                AWS::IAM::Role               CREATE_COMPLETE
sam-app    2022-07-07T14:22:39.990Z  HelloWorldFunction                    AWS::Lambda::Function        CREATE_IN_PROGRESS
sam-app    2022-07-07T14:22:42.101Z  HelloWorldFunction                    AWS::Lambda::Function        CREATE_IN_PROGRESS    Resource creation Initiated
sam-app    2022-07-07T14:22:49.110Z  HelloWorldFunction                    AWS::Lambda::Function        CREATE_COMPLETE
sam-app    2022-07-07T14:22:51.047Z  ServerlessRestApi                     AWS::ApiGateway::RestApi     CREATE_IN_PROGRESS
sam-app    2022-07-07T14:22:51.927Z  ServerlessRestApi                     AWS::ApiGateway::RestApi     CREATE_IN_PROGRESS    Resource creation Initiated
sam-app    2022-07-07T14:22:52.454Z  ServerlessRestApi                     AWS::ApiGateway::RestApi     CREATE_COMPLETE
sam-app    2022-07-07T14:22:54.325Z  ServerlessRestApiDeployment47fc2d5f9  AWS::ApiGateway::Deployment  CREATE_IN_PROGRESS
                                     d
sam-app    2022-07-07T14:22:54.965Z  HelloWorldFunctionHelloWorldPermissi  AWS::Lambda::Permission      CREATE_IN_PROGRESS
                                     onProd
sam-app    2022-07-07T14:22:55.430Z  HelloWorldFunctionHelloWorldPermissi  AWS::Lambda::Permission      CREATE_IN_PROGRESS    Resource creation Initiated
                                     onProd
sam-app    2022-07-07T14:22:56.676Z  ServerlessRestApiDeployment47fc2d5f9  AWS::ApiGateway::Deployment  CREATE_IN_PROGRESS    Resource creation Initiated
                                     d
sam-app    2022-07-07T14:22:57.300Z  ServerlessRestApiDeployment47fc2d5f9  AWS::ApiGateway::Deployment  CREATE_COMPLETE
                                     d
sam-app    2022-07-07T14:22:59.259Z  ServerlessRestApiProdStage            AWS::ApiGateway::Stage       CREATE_IN_PROGRESS
sam-app    2022-07-07T14:23:01.951Z  ServerlessRestApiProdStage            AWS::ApiGateway::Stage       CREATE_IN_PROGRESS    Resource creation Initiated
sam-app    2022-07-07T14:23:02.996Z  ServerlessRestApiProdStage            AWS::ApiGateway::Stage       CREATE_COMPLETE
sam-app    2022-07-07T14:23:06.214Z  HelloWorldFunctionHelloWorldPermissi  AWS::Lambda::Permission      CREATE_COMPLETE
                                     onProd
sam-app    2022-07-07T14:23:07.905Z  sam-app                               AWS::CloudFormation::Stack   CREATE_COMPLETE
```

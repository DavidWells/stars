---
repo: steveperkins/serverless-find-resource
url: 'https://github.com/steveperkins/serverless-find-resource'
homepage: null
starredAt: '2021-05-15T21:11:50Z'
createdAt: '2020-10-09T15:19:12Z'
updatedAt: '2022-03-30T22:26:55Z'
language: JavaScript
license: MIT
branch: master
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:41.007Z'
description: >-
  Serverless plugin to find the appropriate AWS ARN for a given resource by type
  or name and type
tags: []
---

# serverless-find-resource

This Serverless plugin replaces AWS resource names with their ARNs or IDs in your Serverless template.

Some Serverless resource references have to be hardcoded if they're created outside of the current Serverless template - even if they're created by another Serverless template in the same project. In multi-template projects, this results in hardcoding resource IDs or creating lots of exports just to reference AWS resource ARNs/IDs. As a result, your Serverless templates lose flexibility and require a bunch of changes when just one resource changes. For example, if you expect your system's Cognito User Pool to be manually created but still want to attach a pre-token-generation trigger to it, you have to update your template in every environment to point to the correct Cognito User Pool ID. If you need to switch between dev/QA/prod accounts, you have to update any account-specific IDs.

This Serverless plugin fixes that. Instead of hardcoding resource ARNs and IDs, you can use your resource _names_ in your Serverless templates, and this plugin will replace it with the appropriate resource ARN/ID by inspecting the resources in your AWS account (via the CLI). Even better, if there's only one resource of the given type, Serverless Find Resource can assume that you need that resource's ARN/ID unless you specify a name.

That means that a simple Serverless template could reference zero AWS resource identifiers, making it far more flexible and portable across environments.

## Installation

`serverless-find-resource` is available on npm: [https://www.npmjs.com/package/serverless-find-resource](https://www.npmjs.com/package/serverless-find-resource).

1. Run `npm i serverless-find-resource --save-dev`. Of course you also need Serverless to be installed because this is a Serverless plugin.
2. In your Serverless template add `serverless-find-resource` to your `plugins` section:

```
plugins:
  - serverless-find-resource
```

### Early Access

If you don't want to wait for releases, you can get bleeding-edge updates by adding `"serverless-find-resource": "https://github.com/steveperkins/serverless-find-resource#master"` to your `package.json`'s `dependencies` or `devDependencies`.

## Usage

Replace your hardcoded IDs with `find:` variables anywhere in your Serverless template except region, stage, and credentials.

For example, this:

```
provider:
  name: aws
  stage: ${self:custom.stage}
  region: ${self:custom.region}
  environment:
    USER_POOL_ID: us-east-1_D93eA2
```

becomes this:

```
provider:
  name: aws
  stage: ${self:custom.stage}
  region: ${self:custom.region}
  environment:
    USER_POOL_ID: ${find:CognitoUserPoolId:yourUserPoolName}
```

Serverless Find Resource will now replace `${find:CognitoUserPoolId}` with the ID of your AWS account's user pool named `yourUserPoolName`.

A more complex example is for finding an API Gateway Trigger authorizer lambda ID:
```
XXXApigatewayTrigger:
      Type: AWS::Lambda::Permission
      Properties:
        Action: lambda:InvokeFunction
        FunctionName: !GetAtt AuthorizeLambdaFunction.Arn
        Principal: apigateway.amazonaws.com
        SourceArn: arn:aws:execute-api:${self:config.region}:${self:config.accountNo}:${find:ApiGatewayId:ApiGatewayName}/authorizers/${find:ApiGatewayAuthorizerId:ApiGatewayName/lambdaAuthorizerName}
```

### Spaces
Some AWS resource names can have spaces. For example, a VPC subnet could be named something like "Private Subnet". Serverless removes all spaces before passing the value to the variable resolver, so in such cases you have to enclose the value in single quotes in order to preserve the spaces:

```
${find:SubnetId:'Private Subnet'}
```

## Finding Resources by Default

If you have only one of a resource type in your AWS account, you don't even have to provide a name - Serverless Find Resource will just use that resource. The syntax is very straightforward - you just don't include the name:

```
${find:CognitoUserPoolId}
```

That makes your Serverless template very clean for shared resources like Cognito User Pools, RDS databases, API Gateways, etc in smaller infrastructures. Be aware that AWS might create unexpected resources on your behalf when working via the AWS UI.

# Supported Resource Types

| Type                   | Key                      | Returns                   | Example                                                            |
| ---------------------- | ------------------------ | ------------------------- | ------------------------------------------------------------------ |
| Cognito User Pool      | `CognitoUserPoolId`      | Cognito User Pool's ID    | `${find:CognitoUserPoolId:yourUserPoolName}`                       |
| Cognito User Pool      | `CognitoUserPoolArn`     | Cognito User Pool's Arn   | `${find:CognitoUserPoolArn:yourUserPoolName}`                      |
| Cognito App Client     | `CognitoAppClientId`     | Cognito App Client's ID   | `${find:CognitoAppClientId:yourUserPoolName.yourAppClientName}`    |
| IAM Role               | `RoleArn`                | Role's ARN                | `${find:RoleArn:yourRoleName}`                                     |
| IAM Role               | `RoleId`                 | Role's ID                 | `${find:RoleId:yourRoleName}`                                      |
| Lambda Layer           | `LambdaLayerArn`         | Latest layer ARN          | `${find:LambdaLayerArn:yourLayerName}`                             |
| Security Group         | `SecurityGroupId`        | Group's ID                | `${find:SecurityGroupId:yourGroupName}`                            |
| Subnet                 | `SubnetId`               | Subnet's ID               | `${find:SubnetId:yourSubnetName}`                                  |
| API Gateway            | `ApiGatewayId`           | API Gateway's ID          | `${find:ApiGatewayId:yourApiGatewayName}`                          |
| API Gateway Authorizer | `ApiGatewayAuthorizerId` | API Gateway Authorizer ID | `${find:ApiGatewayAuthorizerId:yourApiGatewayName.yourAuthorizerName}` |

# A note about API Gateway
Until now Mike Souza's [import-api-gateway plugin](https://github.com/MikeSouza/serverless-import-apigateway) did a great job of working around the CloudFormation constraint that prevents you from attaching lambda HTTP event handlers to an API Gateway NOT created in the same Serverless file (what a weird and limiting requirement, CloudFormation team). On October 20, 2020 Mike deprecated his plugin citing [Serverless' new support for attaching to existing API Gateways](https://www.serverless.com/framework/docs/providers/aws/events/apigateway/#easiest-and-cicd-friendly-example-of-using-shared-api-gateway-and-api-resources). However, Serverless' support does NOT work for REST API Gateways - only for HTTP API Gateways (API Gateway V2). Mike's plugin is still needed. Since it's been deprecated, I've rolled Mike's plugin with [Jason Maldonis' contribution](https://github.com/jjmaldonis) into the ${find:ApiGatewayId} functionality - because if you're trying to access the API Gateway ID, it's almost certain that you're trying to attach resources to an existing API Gateway. Therefore, when you use ${find:ApiGatewayId}, serverless-find-resource will automatically attach your Serverless template's HTTP endpoints to your API Gateway.

An easy way to leverage this functionality in your Serverless template is to add an `apiGateway.restApiId` to your `provider` element:

```
provider:
  apiGateway:
    restApiId: ${find:ApiGatewayId}
```

# A note about Serverless v1, v2, and v3 variable resolvers

Serverless v3 introduced a new, backwards-incompatible plugin variable resolver in v3. `serverless-find-resource` supports v1 (now deprecated), v2, and v3. Make sure to put `frameworkVersion: '3'` at the top of your .serverless file if you want to use v3 plugin variable resolution. Thank you @wktk for raising a PR for this.

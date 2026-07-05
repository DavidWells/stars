---
repo: tobilg/cfn-cognito-resource-server
url: 'https://github.com/tobilg/cfn-cognito-resource-server'
homepage: null
starredAt: '2020-04-28T06:27:44Z'
createdAt: '2020-01-12T09:50:28Z'
updatedAt: '2022-11-15T04:19:01Z'
language: JavaScript
license: MIT
branch: master
stars: 4
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:55.599Z'
description: A custom CloudFormation resource for Cognito Resource Servers
tags:
  - aws
  - cloudformation
  - cognito
  - customresource
  - resourceserver
---

# cfn-cognito-resource-server
A custom CloudFormation resource for Cognito Resource Servers for the usage with CloudFormation stacks, as well as the Serverless framework.

## Usage

### CloudFormation

If you just want to use the custom resource, copy the [dist/cfn-cognito-resource-server.yml](dist/cfn-cognito-resource-server.yml) file to your CloudFormation project.

Additionally, you need to add another resource to the stack in whcih you configure the Cognito Resource Server (this assumes you have a Cognito UserPool resource named `CognitoUserPool` in your stack):

```yaml
Resources:
  CognitoResourceServer:
    Type: 'Custom::CognitoResourceServer'
    Properties:
      Name: 'example.com API Cognito Resource Server'
      Identifier: 'https://api.example.com'
      UserPoolId: !Ref CognitoUserPool
      Scopes:
        - Name: 'myscope:read'
          Description: 'Read permissions'
        - Name: 'myscope:write'
          Description: 'Write permissions'
      ServiceToken: !GetAtt CustomResourceServerLambda.Arn
```

You should configure the `Name`, `Identifier` and `Scopes` with your desired values. After that, the custom resource should be usable.

### Serverless

For an example configuration with the Serverless framework, you can have a look in the [test](test/) subfolder. This contains a valid [serverless.yml](test/serverless.yml) file with a configuration that can be customized.

You basically need three resources:

* A Cognito UserPool
* The custom resource for the Cognito Resource Server (see [dist/sls-cognito-resource-server.yml](dist/sls-cognito-resource-server.yml))
* A resource which configures/uses the custom resource for the Cognito Resource Server

It could look like the following once you created the above named resources as files in the `resources` subfolder of your Serverless project:

```yaml
service:
    name: 'test-custom-cognito-resource-server'

provider:
  name: aws
  runtime: nodejs10.x
  region: ${opt:region, 'us-east-1'}
  stage: ${opt:stage, 'dev'}
  
resources:
  - ${file(resources/cognito.yml)}
  - ${file(resources/sls-cognito-resource-server.yml)}
  - ${file(resources/cognito-resource-server.yml)}
```

The `resources/cognito-resource-server.yml` could for example look like this:

```yaml
Resources:
  CognitoResourceServer:
    Type: 'Custom::CognitoResourceServer'
    Properties:
      Name: 'example.com API Cognito Resource Server'
      Identifier: 'https://api.example.com'
      UserPoolId: 
        Ref: CognitoUserPool
      Scopes:
        - Name: 'myscope:read'
          Description: 'Read permissions'
        - Name: 'myscope:write'
          Description: 'Write permissions'
      ServiceToken: 
        'Fn::GetAtt': [CustomResourceServerLambda, Arn]
```

You should configure the `Name`, `Identifier` and `Scopes` with your desired values. After that, the custom resource should be usable.

## Building
After cloning the repo, and running `npm i` in the project's path, you can run the build of the custom CloudFormation resources by running `npm run build`.

This will created/update the following files in the `dist` subfolder:

* `cfn-cognito-resource-server.yml`: The basic custom CloudFormation resource for the creation of Cognito Resource Servers
* `sls-cognito-resource-server.yml`: The same resource, but ready for the usage with the Serverless framework

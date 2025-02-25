---
repo: GaaraZhu/serverless-app-client-credentials-to-ssm
url: 'https://github.com/GaaraZhu/serverless-app-client-credentials-to-ssm'
homepage: null
starredAt: '2022-03-19T18:03:28Z'
createdAt: '2022-03-18T20:20:37Z'
updatedAt: '2024-10-24T03:30:16Z'
language: JavaScript
license: MIT
branch: main
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:57.196Z'
description: Export Cognito app client credentials to SSM Parameter store
tags: []
---

# serverless-app-client-credentials-to-ssm

<p>
  <a href="https://www.serverless.com">
    <img src="http://public.serverless.com/badges/v3.svg">
  </a>
  <img src="https://img.shields.io/npm/l/serverless-offline.svg?style=flat-square">
  <a href="?tab=readme-ov-file#contribute">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square">
  </a>
</p>

A [Serverless plugin](https://www.serverless.com/plugins/serverless-app-client-credentials-to-ssm) to export Cognito app client credentials to SSM Parameter store for µservice

## Background
[Amazon Cognito](https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html) is a powerful service for application authentication, authorization, and user management. When working with µservice applications, we can use AWS Cognito user pool authentication to implement a [fine-grained service-to-service access control](https://gaarazhu.github.io/fine-grained-authorization/) where each service has a dedicated resource server with pre-defined scopes for its resources(API Gateway, Lambda etc), and a dedicated app client with limited scopes it needs to access external resources.<br/><br/>
This service-to-service interaction normally starts with a user pool sign-in with the app client credentials where a JWT token will be returned from Cognito to the initiator for external resource access. We used to copy the app client credentials from AWS console and put to the configuration for each µservice manually. With the increasing number of µservices, we need a tool to do this securely and automatically for us.

## How it works
A [Serverless "hook"](https://www.serverless.com/framework/docs/guides/plugins/creating-plugins#lifecycle-events) will be triggered after the deployment to pull the app client credentials includes **url**, **clientId**, and **clientSecret** which will be merged as part of the application configuration(`auth.cognito`) stored in the configured SSM parameter.<br/><br/>
**Note:**
* Only when there are changes for any of these three fields will this plugin update the SSM parameter.
* For security reason, `SecurityString` parameter with the default AWS account key is used here.


## Installation
```
npm install serverless-app-client-credentials-to-ssm --save-dev
```

## Configuration
### plugin registration ###
Inside your project's serverless.yml file add following entry to the plugins section:
```YAML
plugins:
  - serverless-app-client-credentials-to-ssm
```
### plugin configuration ###
Then you need to add the plugin configuration to the custom section:
```YAML
custom:
  serverless-app-client-credentials-to-ssm:
    userPoolId: ${ssm:/layered-apis/userPoolId}
    appClientName: ${self:custom.appClientName}
    parameterName: /config/${self:service}-${self:provider.stage}
```

## Sample parameter
```JSON
{
  "auth": {
	"cognito": {
	  "url": "https://asdfafdsa-systems-idp-nonprod.auth.ap-southeast-2.amazoncognito.com/oauth2/token",
	  "clientId": "h3p4a1sr9pu",
	  "clientSecret": "s1oglveco0hsfraoag90ebr107rmvo9g7u36h"
	}
  },
  "database": {
	...
  }
}
```

## License
MIT

## Contribute
Yes, highly appreciate for any PRs. Thank you!

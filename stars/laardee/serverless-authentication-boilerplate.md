---
repo: laardee/serverless-authentication-boilerplate
url: 'https://github.com/laardee/serverless-authentication-boilerplate'
homepage: 'http://laardee.github.io/serverless-authentication-gh-pages'
starredAt: '2016-05-05T22:55:39Z'
createdAt: '2016-03-17T20:49:36Z'
updatedAt: '2025-02-17T06:46:10Z'
language: JavaScript
license: MIT
branch: master
stars: 567
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:26.500Z'
description: Generic authentication boilerplate for Serverless framework
tags:
  - boilerplate
  - oauth-provider
  - oauth2
  - serverless
  - serverless-framework
---

# Serverless Authentication

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)

[![Build Status](https://travis-ci.org/laardee/serverless-authentication-boilerplate.svg?branch=master)](https://travis-ci.org/laardee/serverless-authentication-boilerplate)

This project is aimed to be a generic authentication boilerplate for the [Serverless framework](http://www.serverless.com).

This boilerplate is compatible with the Serverless v.1.30.3+, to install Serverless framework run `npm install -g serverless`.

Web app demo that uses this boilerplate: http://laardee.github.io/serverless-authentication-gh-pages

If you are using Serverless framework v.0.5, see branch https://github.com/laardee/serverless-authentication-boilerplate/tree/serverless-0.5

## Installation

The installation will create one DynamoDB table for OAuth state and refresh tokens.

1. Run `serverless install --url https://github.com/laardee/serverless-authentication-boilerplate`, clone or download the repository
2. Change directory to `authentication` and rename _example.env.yml_ in _authentication_ to _env.yml_ and set [environmental variables](#env-vars).
3. Run `npm install`.
4. Run `serverless deploy` on the authentication folder to deploy authentication service to AWS.
5. (optional) Change directory to `../test-token` and run `serverless deploy` to deploy test-token service.

If you wish to change the cache db name, change `CACHE_DB_NAME ` in _.env_ file and `TableName` in _serverless.yml_ in Dynamo resource.

## Set up Authentication Provider Application Settings

The redirect URI that needs to be defined in OAuth provider's application settings is the callback endpoint of the API. For example, if you use facebook login, the redirect URI is **https://API-ID.execute-api.us-east-1.amazonaws.com/dev/authentication/callback/facebook** and for google **https://API-ID.execute-api.us-east-1.amazonaws.com/dev/authentication/callback/google**.

If you have a domain that you can use, the configuration is explained in the [custom domain name](#custom-domain) section.

## Services

In this example project authentication and authorization services are separated from the content API (test-token).

### Authentication

Authentication service and authorization function for content API. These can also be separated if needed.

Functions:

* authentication/signin
  * endpoint: /authentication/signin/{provider}, redirects to oauth provider login page
  * handler: signin function creates redirect url to oauth provider and saves `state` to DynamoDB
* authentication/callback
  * endpoint: /authentication/callback/{provider}, redirects back to client webapp with token url parameter
  * handler: function is called by oauth provider with `code` and `state` parameters and it creates authorization and refresh tokens
* authentication/refresh
  * endpoint: /authentication/refresh/{refresh_token}, returns new authentication token and refresh token
  * handler: function revokes refresh token
* authentication/authorize
  * endpoint: no endpoint
  * handler: is used by Api Gateway custom authorizer

### Test-token

Simulates content API.

Functions:

* test-token/test-token
  * endpoint: /test-token
  * handler: test-token function can be used to test custom authorizer, it returns principalId of custom authorizer policy. It is mapped as the username in request template.

## <a id="env-vars"></a>Environmental Variables

Open `authentication/env.yml`, fill in what you use and other ones can be deleted.

```yaml
dev:
# General
  SERVICE: ${self:service}
  STAGE: ${opt:stage, self:provider.stage}
  REGION: ${opt:region, self:provider.region}
  REDIRECT_CLIENT_URI: http://127.0.0.1:3000/
# Custom Redirect Domain
# REDIRECT_DOMAIN_NAME: ${opt:stage, self:provider.stage}.my-custom-domain-for-callback.com
# REDIRECT_CERTIFICATE_ARN: arn:aws:acm:us-east-1:111122223333:certificate/fb1b9770-a305-495d-aefb-27e5e101ff3
# REDIRECT_URI: https://${self:provider.environment.REDIRECT_DOMAIN_NAME}/authentication/callback/{provider}
# REDIRECT_HOSTED_ZONE_ID: XXXXXXXX
  TOKEN_SECRET: token-secret-123
# Database
  FAUNADB_SECRET: SERVER_SECRET_FOR_YOUR_FAUNADB_DATABASE
  CACHE_DB_NAME: ${self:service}-cache-${opt:stage, self:provider.stage}
  USERS_DB_NAME: ${self:service}-users-${opt:stage, self:provider.stage}
# Cognito
  USER_POOL_ID: user-pool-id
# Providers
  PROVIDER_FACEBOOK_ID: "fb-mock-id"
  PROVIDER_FACEBOOK_SECRET: "fb-mock-secret"
  PROVIDER_GOOGLE_ID: "g-mock-id"
  PROVIDER_GOOGLE_SECRET: "cg-mock-secret"
  PROVIDER_MICROSOFT_ID: "ms-mock-id"
  PROVIDER_MICROSOFT_SECRET: "ms-mock-secret"
  PROVIDER_CUSTOM_GOOGLE_ID: "cg-mock-id"
  PROVIDER_CUSTOM_GOOGLE_SECRET: "cg-mock-secret"
```

## Example Provider Packages

* facebook [serverless-authentication-facebook](https://www.npmjs.com/package/serverless-authentication-facebook)
* google [serverless-authentication-google](https://www.npmjs.com/package/serverless-authentication-google)
* windows live [serverless-authentication-microsoft](https://www.npmjs.com/package/serverless-authentication-microsoft)
* more to come

## <a id="custom-provider"></a>Custom Provider

Package contains example [/authentication/lib/custom-google.js](https://github.com/laardee/serverless-authentication-boilerplate/blob/master/authentication/lib/custom-google.js) how to implement a custom authentication provider using generic Provider class. To test custom provider go to http://laardee.github.io/serverless-authentication-gh-pages and click 'custom-google' button.

## User database

To use FaunaDB to save user data. First [create a database here](https://fauna.com/serverless-cloud-sign-up), then:

1. configure `FAUNADB_SECRET` in `authentication/env.yml` with a server secret for your database
2. uncomment `return faunaUser.saveUser(profile);` from `authentication/lib/storage/usersStorage.js`
3. change the last line of  `authentication/lib/storage/cacheStorage.js` to `module.exports = faunaCache;`
4. Run `STAGE=dev npm run setup:fauna`

To use DynamoBD to save user data:

1. uncomment `UsersTable` block from `authentication/serverless.yml` resources
2. uncomment `return dynamoUser.saveUser(profile);` from `authentication/lib/storage/usersStorage.js`

To use Cognito User Pool as user database:

1. create new user pool (http://docs.aws.amazon.com/cognito/latest/developerguide/setting-up-cognito-user-identity-pools.html)
2. copy user pool id to `authentication/env.yml`
3. uncomment `return saveCognito(profile);` from `authentication/lib/storage/usersStorage.js`

## <a id="custom-domain"></a>API Gateway Custom Domain Name

If you have a domain, a hosted zone, and a certificate for the domain defined in your AWS account, you may use API Gateway Custom Domain Name in your setup.

Your domain name goes to the `REDIRECT_DOMAIN_NAME` environment variable, if this is set, CloudFormation will create a custom domain name to API Gateway and recordset to the Route 53
```yaml
REDIRECT_DOMAIN_NAME: "authentication.my-domain.com"
```

Certificate ARN for your domain,
```yaml
REDIRECT_CERTIFICATE_ARN: "arn:aws:acm:us-east-1:111122223333:certificate/fb1b9770-a305-495d-aefb-27e5e101ff3"
```

Callback path, leave this like it is
```yaml
REDIRECT_URI: "https://${self:provider.environment.REDIRECT_DOMAIN_NAME}/authentication/callback/{provider}"
```

Route 53 hosted zone id, go to Route 53 and get the id from there or with CLI `aws route53 list-hosted-zones --query 'HostedZones[*].[Name,Id]' --output text`. The CLI will output something like this `authentication.my-domain.com.     /hostedzone/Z10QEETUEETUAO` copy the `Z10QEETUEETUAO` part to the `REDIRECT_HOSTED_ZONE_ID` environment variable.

```yaml
REDIRECT_HOSTED_ZONE_ID: "Z10QEETUEETUAO"
````

## Running Tests

* Run `npm install` in project root directory
* Run `npm test`

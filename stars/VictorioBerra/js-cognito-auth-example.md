---
repo: VictorioBerra/js-cognito-auth-example
url: 'https://github.com/VictorioBerra/js-cognito-auth-example'
homepage: null
starredAt: '2018-10-08T02:52:18Z'
createdAt: '2017-08-23T21:25:52Z'
updatedAt: '2023-08-24T02:35:34Z'
language: JavaScript
license: NA
branch: master
stars: 6
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:13.052Z'
description: Javascript Cognito Identity/Pool Authenticator Example
tags: []
---

## Build serverless applications using AWS API Gateway AWS_IAM Authentication via Cognito Federated Identities using Cognito User Pool logins with this sample code for the web.

![AWS Stack](AWSStack.png)

Tie together Cognito Federated Identities with Cognito User Pools to hit a Lambda integrated APIG secured via AWS_IAM temporary credentials.

#### How it works

I noticed there is a lot of confusion for developers trying to link together all these concepts. Understandably because the easiest route to obtaining the JWT from user pools has to be done with front-end scripts [identity](https://github.com/aws/amazon-cognito-identity-js)/[auth](https://github.com/aws/amazon-cognito-auth-js) which are lacking in documentation with outdated code examples.

We use the [amazon-cognito-identity.js library](https://github.com/aws/amazon-cognito-identity-js) to get our JWT from Cognito User Pools. With the JWT we can use `CognitoIdentityCredentials()` to auth and get an `accessKeyId`, `secretAccessKey` and a `sessionToken` from [Cognito Federated Identities](https://console.aws.amazon.com/cognito).

### Install and run

You will need to set the variables in /src/config.js. There is nothing insecure about exposing any of these values to the end user.

```javascript
export default {
  region: 'us-east-1',
  IdentityPoolId: 'us-east-1:XXXXXXXXXXXXXX',
  UserPoolId: 'us-east-1_XXXXXXXXXXXXXX',
  UserPoolAppClientId: 'XXXXXXXXXXXXXX'
}
```

You will need to create a Lambda function, the APIG and integrate it, and all needed IAM Roles/Perms, and the Cognito Federated Identities and Pools). To do this a little more quickly check out the [node-serverless](https://serverless.com/) project There are some samples that can get you up and running with CRUD applications, although you may still have to do the Cognito Identity stuff yourself. Blogpost coming soon.

```bash
npm install
npm run dev
```

See `src/main.js` for the code and make sure to carefully read the comments in the code. If you want the apigClient to work go to your APIG and snag the generated SDK for Javascript and dump all the files in dist.

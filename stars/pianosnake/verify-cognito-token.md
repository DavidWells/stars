---
repo: pianosnake/verify-cognito-token
url: 'https://github.com/pianosnake/verify-cognito-token'
homepage: null
starredAt: '2019-11-10T22:41:36Z'
createdAt: '2018-04-22T22:31:17Z'
updatedAt: '2025-02-02T04:04:09Z'
language: JavaScript
license: NA
branch: master
stars: 7
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:13.743Z'
description: null
tags:
  - aws
  - aws-cognito
  - cognito
  - cognito-user-pool
---

# This lib has been archived! No longer maintained!

# Verify Cognito Token

Verify either the ID token or the access token provided by AWS Cognito.

This is a Node friendly refactor of AWS labs' [decode-verify-jwt](https://github.com/awslabs/aws-support-tools/blob/master/Cognito/decode-verify-jwt/decode-verify-jwt.js). The process is explained in the section __Using ID Tokens and Access Tokens in your Web APIs__ from this [AWS Document](https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-with-identity-providers.html).

Install with `npm install verify-cognito-token -S`

## Usage

```javascript
// params
const params = {
  region: '<your-aws-region>',  // required
  userPoolId: '<your-user-pool-id>', // required
  debug: true // optional parameter to show console logs
}

//optional claims examples
const claims = {
  aud: '<your-app-client-id>',
  email_verified: true,
  auth_time: time => time <= 1524588564,
  'cognito:groups': groups => groups.includes('Admins')
}

const Verifier = require('verify-cognito-token');
const verifier = new Verifier(params, claims);

verifier.verify(token)
.then(result =>{
  //result will be `true` if token is valid, non-expired, and has matching claims
  //result will be `false` if token is invalid, expired or fails the claims check
})

```

The `userPoolId` parameter is available from Cognito/Manage Your User Pools/Your-Pool-Name/General Settings. 

The `claims` parameter is an optional parameter used to match against the token's claims. Its keys are claim names and its values can be any of [string, number, boolean, function]. If the value is any of [string, number, boolean] it is checked for strict equality against the token's claim with a matching name. If it is a function, the function is run against the claim. Do not try to match against an object or an array; rather use a function to test for a particular property.

## License

MIT

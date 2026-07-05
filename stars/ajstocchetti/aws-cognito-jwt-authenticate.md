---
repo: ajstocchetti/aws-cognito-jwt-authenticate
url: 'https://github.com/ajstocchetti/aws-cognito-jwt-authenticate'
homepage: null
starredAt: '2021-05-15T20:32:42Z'
createdAt: '2020-04-22T01:19:56Z'
updatedAt: '2023-01-27T08:55:37Z'
language: JavaScript
license: NA
branch: master
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:41.213Z'
description: null
tags: []
---

# AWS Cognito User Pool JWT Authenticator

Easily verify that a Cognito JWT is valid for use and was signed by AWS.

## Installation

```bash
npm i aws-cognito-jwt-authenticate
```

## Usage

```javascript
const authenticator = require('aws-cognito-jwt-authenticate');
try {
  const cognitoDetails = { userPoolId: 'your-pool-id', region: 'us-east-1' };
  const payload = await authenticator.validateJwt(jwt, cognitoDetails); // the decoded JWT payload
} catch(err) {
  // invalid JWT
  console.error(err);
}
```


## Api
**validateJwt(jwt, cognitoDetails)**

- jwt: the JSON Web Token to authenticate
- cognitoDetails: an object with keys `userPoolId` and `region` specifying the details of the Cognito User pool.

Note: `cognitoDetails` can also be an array of allowed user pool details. In the example below, a JWT from any of the 3 user pools will authenticate
```javascript
const details = [
  { userPoolId: 'us-east-1_0xxxxxxxx', region: 'us-east-1' },
  { userPoolId: 'us-west-1_0yyyyyyyy', region: 'us-west-1' },
  { userPoolId: 'eu-west-3_0zzzzzzzz', region: 'eu-west-3' },
];
const payload = await authenticator.validateJwt(jwt, details);
```

Response: the decoded JWT payload (payload only, not the header or signature). If the JWT is invalid, an error will be thrown.

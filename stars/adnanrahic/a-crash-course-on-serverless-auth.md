---
repo: adnanrahic/a-crash-course-on-serverless-auth
url: 'https://github.com/adnanrahic/a-crash-course-on-serverless-auth'
homepage: ''
starredAt: '2018-08-21T01:14:28Z'
createdAt: '2018-01-14T22:41:14Z'
updatedAt: '2024-05-03T00:32:44Z'
language: JavaScript
license: NA
branch: master
stars: 160
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:15.711Z'
description: >-
  A short and easy boilerplate showcasing JWT auth with Nodejs, the Serverless
  framework, MongoDB and AWS Lambda.
tags:
  - aws-lambda
  - mongodb
  - mongoose
  - nodejs
  - serverless
  - serverless-framework
---

# A crash course on Serverless Authentication/Authorization
A short and easy boilerplate showcasing JWT auth with Nodejs, the Serverless framework, MongoDB and AWS Lambda.

- The `auth` folder has a `VerifyToken.js` file which is the base of the **authorizer** function.
- The `VerifyToken.auth` method is added to the **authorizer** field in the `serverless.yml` for API Gateway routes you wish to keep private. See the `me` function. `AuthHandler.me` uses `event.requestContext.authorizer.principalId` to access the `userId` of the user accessing the resource if the JWT is valid. Otherwise returns `'Unauthorized'`.

*Note: The concept of middlewares can be applied to this for understanding it easily.*

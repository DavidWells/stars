---
repo: serverlessbuch/jwtAuthorizr
url: 'https://github.com/serverlessbuch/jwtAuthorizr'
homepage: ''
starredAt: '2018-10-09T03:41:22Z'
createdAt: '2016-11-15T12:47:02Z'
updatedAt: '2024-07-22T21:08:55Z'
language: JavaScript
license: MIT
branch: master
stars: 43
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:12.528Z'
description: >-
  Custom JSON-Web-Token AWS Lambda Authorizer function for Amazon API Gateway
  with Bearer JWT
tags: []
---

# jwtAuthorizer - Custom JWT AWS Lambda Authorizer for Amazon API Gateway

A _Custom Authorizer_ [AWS Lambda](https://aws.amazon.com/lambda) function for [Amazon API Gateway](https://aws.amazon.com/api-gateway) which takes a [JSON Web Token (JWT)](https://jwt.io) in `Bearer` format from `Authorization` HTTP header.

[Read more about Custom Authorizers at AWS Docs.](http://docs.aws.amazon.com/de_de/apigateway/latest/developerguide/use-custom-authorizer.html)

The JWT is verified against a secret (in case of HSA encryption) and some other claims (should be at least `audience` and `issuer`).

The **jwtAuthorizr** lambda function makes use of the aweseome [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) package at NPM.

Secret and claims can be different for every used stage environment.
In this example, **jwtAuthorizr** lambda function reads them from environment variables which should be baked into the function deployment for each stage.
But Lambda could also load them from e.g. S3 or DynamoDB or something completely different.

The token in the test event in `test.json` uses these secrets and claims:
- `iss`: dasniko
- `aud`: demo
- `secret`: secret

---
repo: aws-samples/amazon-cognito-passwordless-email-auth
url: 'https://github.com/aws-samples/amazon-cognito-passwordless-email-auth'
homepage: null
starredAt: '2020-05-08T03:01:26Z'
createdAt: '2018-12-24T19:27:59Z'
updatedAt: '2024-08-22T12:20:10Z'
language: TypeScript
license: MIT-0
branch: master
stars: 236
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:54.377Z'
description: A sample implementation of Passwordless E-Mail Auth in Amazon Cognito
tags: []
---

## UPDATE 2023, July 10th

We have published a new Passwordless sample solution that includes WebAuthn (FIDO2, Passkeys) and e-mail Magic Links: https://github.com/aws-samples/amazon-cognito-passwordless-auth

The repository here, the one you're looking at now, is still a good reference for implementing e-mail OTP (One Time Password). **_Be aware though_**: we haven't updated this repository in a while, so e.g. dependencies are outdated! Only use the repository here to get an idea on "how to do it".

---

## Amazon Cognito Passwordless Email Auth

This is the _**sample**_ code that comes together with [the blog post on passwordless e-mail auth in Amazon Cognito](https://aws.amazon.com/blogs/mobile/implementing-passwordless-email-authentication-with-amazon-cognito/).

The purpose of this sample code is to demonstrate how Amazon Cognito Custom Authentication Flows can be used to implement passwordless e-mail auth. Please treat the code as an _**illustration**_––thoroughly review it and adapt it to your needs, if you want to use it for serious things.

The sample code is contained in these folders. Please visit these and run the sample solution:

- [./cognito](./cognito): a Serverless Application that includes a Cognito user pool with the necessary setup
- [./client](./client): a Web Client that authenticates with the Cognito user pool

## License Summary

This sample code is made available under a modified MIT license. See the LICENSE file.

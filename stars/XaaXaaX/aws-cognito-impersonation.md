---
repo: XaaXaaX/aws-cognito-impersonation
url: 'https://github.com/XaaXaaX/aws-cognito-impersonation'
homepage: null
starredAt: '2024-09-17T18:11:38Z'
createdAt: '2024-04-20T12:28:19Z'
updatedAt: '2024-11-14T01:28:15Z'
language: TypeScript
license: NA
branch: master
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:20.810Z'
description: null
tags: []
---

# Amazon Cognito Impersonation

The project represents a sample project to demonstrate the impersonation and behalf of a user authorization to access its resources.

## Deploying solution

Use the following commands to synthesize, Deploy and destroy the project.

* `npm run cdk:app synth` emits the synthesized CloudFormation template
* `npm run cdk:app deploy` deploy this stack to your default AWS account/region
* `npm run cdk:app synth` destroy the solution


## The App diagram

![App Diagram](./assets/App-diagram.png)


##Postam Collection and Environment

Import the Postman [collection](./assets/postman/Cognito%20Impersonation.postman_collection.json) and [Environment](./assets/postman/Cognito%20Impersonation.postman_environment.json) in your local Postman application.

Follow the following steps for testing

- Run SignUp request to create a user providing your email
- Find the provided password in your email inbox and use it in SignIn request body
- Run the Impersonation request, this will generate an impersonation token
- Run the downstream request to test the Authorization, and downstream tenant validation

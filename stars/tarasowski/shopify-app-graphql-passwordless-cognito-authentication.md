---
repo: tarasowski/shopify-app-graphql-passwordless-cognito-authentication
url: >-
  https://github.com/tarasowski/shopify-app-graphql-passwordless-cognito-authentication
homepage: null
starredAt: '2020-03-23T17:23:50Z'
createdAt: '2018-10-01T06:13:05Z'
updatedAt: '2025-02-06T04:53:58Z'
language: JavaScript
license: MIT
branch: master
stars: 10
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:01.880Z'
description: >-
  Authentication Flow for a Shopify App with GraphQL and Passwordless Cognito
  authentication.
tags: []
---

# Shopify App Basic Auth Flow
Authentication Flow for a Shopify App with GraphQL and Passwordless Cognito authentication.

The app consists of 3 Cloudformation templates that you need to run in the specific order:

1. Create the `cognito` stack
2. Create the `appsync` stack
3. Create the `shopify` stack
4. Open `client` and change `config.js` and `aws-config.js`
5. Run `npm start`

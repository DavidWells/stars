---
repo: twils0/finance-sls-lambda-node-stripe
url: 'https://github.com/twils0/finance-sls-lambda-node-stripe'
homepage: null
starredAt: '2020-03-23T16:23:37Z'
createdAt: '2018-10-24T22:08:12Z'
updatedAt: '2020-03-23T16:23:37Z'
language: JavaScript
license: NA
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:01.985Z'
description: null
tags: []
---

# finance-sls-lambda-node-stripe

This project works in conjunction with [finance-client]() and [finance-sls-lambda-node-db](https://github.com/twils0/finance-sls-lambda-node-db).

The overall project allows users to search for equities, by ticker, name, sector/category, or exchange, using PostgreSQL's full text search. Users can subscribe to view an equity's current price and description, provided by IEX, and to receive research emails, relevant to that equity, formatted and forwarded using AWS SES, SNS, and S3. The project includes custom login and sign up forms, using AWS Cogntio under the hood and including MFA and a custom email verification process that sends styled (template) emails with links, through a combination of AWS Lambda functions (Node), RDS, and SES. The sign up process uses a credit card input component from Stripe's React library and AWS Lambda functions (Node) to register the user as a customer with Stripe and to setup a recurring quarterly payment schedule, prorated for the first quarter.

finance-sls-lambda-node-stripe is a collection of AWS Lambda functions, running Node and managed by Serverless, that handle API calls from a client and then interact with Stripe's Node API library.

Each Lambda function handles API calls from AWS API Gateway. API Gateway authenticates certain functions using AWS Cognito, verifying the 'id' token provided by the client. These functions are then authenticated with AWS Cognito a second time, verifying the 'access' token provided by the client, which is updated much more frequently than the 'id' token.

- /customers

  - DELETE: (authenticated) deletes the user's Stripe information;

  - GET: (authenticated) retreives the user's Stripe information (name on credit card, promo code, and a boolean to indicate if the promo code is valid);

  - POST: adds a new customer to Stripe, creates a new subscription for that customer, and applies a promo code to that subscription, if provided;

  - PUT: (authenticated) updates the user's Stripe information (name on card, email, credit card, promo code, etc.);

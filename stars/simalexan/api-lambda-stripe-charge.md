---
repo: simalexan/api-lambda-stripe-charge
url: 'https://github.com/simalexan/api-lambda-stripe-charge'
homepage: ''
starredAt: '2019-02-11T23:26:19Z'
createdAt: '2018-05-29T15:27:53Z'
updatedAt: '2025-01-17T21:48:23Z'
language: JavaScript
license: NA
branch: master
stars: 90
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:46.030Z'
description: AWS Serverless Application Repository Stripe Charge Serverless Component
tags:
  - api-gateway
  - lambda
  - serverless
  - stripe
---


# API Gateway -> Lambda -> Stripe Charge Payment (Checkout)

## Description

This is a serverless component consisting of an API and Lambda functions that charge / capture / refund a Stripe account based on the API Gateway request data. Supports CORS. Written in Node.js.

## Requirements (Setup)

1. Create a Stripe account
2. Get your Stripe API Keys (both public and secret)
3. Store your Stripe Secret Key into AWS SSM as a SecureString by running the following, but be sure to replace the `lambda-stripe-charge/stripe-secret-key` with your preferred SSM Parameter Path (though it can be just `lambda-stripe-charge/stripe-secret-key`):

```ssh
aws ssm put-parameter --name /lambda-stripe-charge/stripe-secret-key --value YOUR_STRIPE_SECURE_KEY --type SecureString --overwrite
```

4. Want to use Stripe's Checkout ? - [https://stripe.com/docs/checkout](https://stripe.com/docs/checkout)
 (most likely others are supported too, but can't guarantee, need to check)
5. Set your frontend part as specified in the [https://stripe.com/docs/checkout#integration](https://stripe.com/docs/checkout#integration)
6. Extend your form with hidden input HTML elements for **amount** and **currency**. Those fields you will need to populate with the values chosen by the user. If not familiar with that approach I recommend this StackOverflow post - [https://stackoverflow.com/questions/37798593/stripe-checkout-how-to-pass-a-value-through-to-webhook](https://stackoverflow.com/questions/37798593/stripe-checkout-how-to-pass-a-value-through-to-webhook)

Will provide a video link on YouTube soon, as I will stream using this AWS App Repo template.

### Latest Release - 4.4.1

Changing to Node.js 10.x Runtime For Lambda

#### Previous Release 4.4.0

- Added Active X-Ray Tracing

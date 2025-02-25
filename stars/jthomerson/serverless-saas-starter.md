---
repo: jthomerson/serverless-saas-starter
url: 'https://github.com/jthomerson/serverless-saas-starter'
homepage: null
starredAt: '2018-12-15T06:18:20Z'
createdAt: '2016-12-14T19:26:41Z'
updatedAt: '2022-05-21T15:21:54Z'
language: JavaScript
license: NA
branch: master
stars: 8
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:56.029Z'
description: null
tags: []
---

# Serverless SaaS Starter Kit

Provides a starter kit with the basics of a modern Software-as-a-Service (SaaS)
software stack, including:

   * RESTful API - using serverless technology
   * SPAs (Single Page Applications) - for both:
      * the external (pre-login), and
      * internal (business guts) part of your SaaS app
   * Authentication - handled by third parties, currently:
      * Google
      * GitHub
   * Payment processing - subscription-based, handled by Stripe


## Authentication

The starter kit allows a user to sign in to your SaaS application using their
preferred third-party identity provider. It uses Google and GitHub, but you
could add others as needed.

There are no server-side redirects since this kit is built with a design of a
SPA and RESTful API. A good explanation of the flow implemented in this kit can
be found in [Matthew Beale's excellent blog post][madhatted-oauth].


## Payment Processing

Payment processing will be handled via [Stripe].


## Code Organization

The code is organized into a collection of small codebases (some would say
microservices), each with its distinct responsibility:

   * [Public SPA](./public-spa/README.md) - for the pre-login portion of your app
   * [Application SPA](./app-client/README.md) - the logged-in actual business portion of your app
   * [Authentication API](./auth-api/README.md) - a serverless API that handles authentication for your app
   * [Business API](./business-api/README.md) - a serverless API that handles your actual business service
   * [Payments](./payments/README.md) - a serverless API and related services for payment processing


### Serverless Microservices

The serverless microservices are built using [the Serverless framework][SLS] on
top of [AWS] services, including [AWS API Gateway][APIGW].


[madhatted-oauth]: https://madhatted.com/2014/6/17/authentication-for-single-page-apps
[Stripe]: https://stripe.com
[SLS]: https://serverless.com
[AWS]: https://aws.amazon.com
[APIGW]: https://aws.amazon.com/api-gateway

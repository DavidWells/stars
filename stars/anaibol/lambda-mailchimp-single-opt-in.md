---
repo: anaibol/lambda-mailchimp-single-opt-in
url: 'https://github.com/anaibol/lambda-mailchimp-single-opt-in'
homepage: ''
starredAt: '2016-11-29T04:28:22Z'
createdAt: '2016-06-16T09:20:32Z'
updatedAt: '2021-10-08T16:26:17Z'
language: JavaScript
license: MIT
branch: master
stars: 6
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:49:14.594Z'
description: ':cloud: Mailchimp single opt-in Amazon Lambda function'
tags: []
---

# :cloud: Mailchimp single opt-in Lambda
An Amazon Lambda function for creating MailChimp subscriptions with single opt-in.
Based on [Mailchimp Lambda](https://github.com/TaylorBriggs/mailchimp-lambda) and [Node Lambda](https://github.com/motdotla/node-lambda).

## Authentication

Set your API key and list ID in the .env file. Copy the sample to get started:

```
$ cp .env.sample .env

API_KEY=YOUR_API_KEY
LIST_ID=YOUR_LIST_ID

```

## Deployment

There's a handy script included to create your zip archive:

```
$ npm start
```

## Build (Babel ⇒ ES5)

```
$ npm run build
```

## Deploy

```
$ npm run deploy
```

```
$ curl -X POST -H "Content-Type: application/json" \
-d '{ "email": "hey@gmail.com", "first_name": "Anibal" }' \
YOUR_API_GATEWAY_URL
```

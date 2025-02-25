---
repo: santiagovazquez/lambda-mailer
url: 'https://github.com/santiagovazquez/lambda-mailer'
homepage: ''
starredAt: '2021-04-08T17:02:42Z'
createdAt: '2019-12-27T22:20:10Z'
updatedAt: '2022-09-20T07:14:38Z'
language: JavaScript
license: NA
branch: master
stars: 7
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:52.323Z'
description: Serverless project to send professional email templates with NodeJS
tags: []
---

# Lambda Mailer

Serverless project to send professional email templates with NodeJS.

We make use of AWS SNS, AWS Lambda functions, node-mailer and email-templates.

## Setup
```
# install serverless framework
npm install -g serverless
# setup AWS user access (IAM): note that you will need different permissions for each action. 
serverless config credentials --provider aws --key YOUR_KEY_HERE --secret YOUR_SECRET_HERE
```


## Development
```
# run the offline sns mailer daemon
npm start

# in another tab, run
npm run send-mail

```

## Production
```
# to deploy you must have AWS valid creds
npm run deploy
# to remove deploy
npm run remove
```



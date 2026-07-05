---
repo: didil/serverless-lambda-sns-example
url: 'https://github.com/didil/serverless-lambda-sns-example'
homepage: ''
starredAt: '2018-10-09T04:24:58Z'
createdAt: '2018-07-18T11:55:07Z'
updatedAt: '2024-03-01T18:28:48Z'
language: JavaScript
license: MIT
branch: master
stars: 36
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:12.414Z'
description: Serverless Lambda PubSub via SNS Example
tags: []
---

# Serverless Lambda SNS Example

Example illustrating the flow:

Lambda (publisher) => SNS => Lambda (consumer)

## Setup

- Install Node 8.10 (latest runtime supported by AWS Lambda)

- Install serverless (tested against serverless v1.28.0)
````
$ npm i -g serverless 
````
- Install node modules
````
$ npm i 
````
- Initialize env variables file
````
$ touch env.yml 
````
- Run tests
````
$ npm test
````

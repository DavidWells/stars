---
repo: yai333/CustomResourceExample
url: 'https://github.com/yai333/CustomResourceExample'
homepage: ''
starredAt: '2019-04-25T16:53:47Z'
createdAt: '2019-04-23T16:00:20Z'
updatedAt: '2020-05-16T21:07:21Z'
language: JavaScript
license: NA
branch: master
stars: 5
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:39.630Z'
description: >-
  Example of using AWS custom resource and CloudFormation macro with Serverless
  Framework
tags: []
---

This is an example of using AWS Lambda-backed custom resource to Invoke Lambda functions when you create, update, or delete a stack

https://medium.com/@yia333/using-aws-cloudformation-macros-and-custom-resources-with-the-serverless-framework-ab7bb121d13d

### File Structure

- macro - Lambda macro to return LastUpdatedTime of stack
- nodejs - Lambda to add default post immediately after deployment

### Install Serverless Framework

```
$ npm install -g serverless
```

### Deploy CloudFormation macro

```
$ cd macro
$ npm install
$ sls deploy
```

### Deploy CloudFormation custom resource

```
 $ cd nodejs
 $ npm install
 $ sls deploy
```

Default post will be added to empty DynamoDb Posts table immediately after deployment

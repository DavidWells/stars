---
repo: jasonumiker/serverless-multicloud-example
url: 'https://github.com/jasonumiker/serverless-multicloud-example'
homepage: ''
starredAt: '2019-06-22T18:08:56Z'
createdAt: '2019-06-18T12:11:32Z'
updatedAt: '2022-03-08T09:30:10Z'
language: JavaScript
license: NA
branch: master
stars: 20
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:34.936Z'
description: >-
  An example Node Express app that can be deployed in any major cloud by the
  Serverless framework
tags:
  - aws-lambda
  - azure-functions
  - express
  - google-cloud-functions
  - nodejs
  - serverless-framework
---

# serverless-multicloud-example

This is the example for my blog post - [Blog Post](blogpost.md)

An example Node Express app that can be deployed in any of the major clouds by the Serverless framework (https://serverless.com). The differences in handler for each serverless service is abstracted by the serverless-express plugin (https://www.npmjs.com/package/serverless-express) - which has been isolated in `handler.js` - leaving `app.js` for our cloud-agnostic business logic.

I intend for it to be a working example of the serverless without lock-in concepts discussed here - https://www.thoughtworks.com/insights/blog/mitigating-serverless-lock-fears

To use copy the relevant severless-xxx.yml file for the cloud you want (AWS, GCP or Azure) to serverless.yml and do a `sls deploy`.

You also need to provide an Internet-facing Mongo URL via environment variable in the serverless-xxx.yml file to use the Mongo CRUD functionality (all the /document APIs).

Note that for GCP some initial setup is required as described here - https://serverless.com/framework/docs/providers/google/guide/credentials/. The other clouds you just need valid login details and CLIs configured to proceed.

Note that for Azure the URIs have to start with `/api/app` and in Google they have to start with `/handler`. I am investigating how to have them start at the root like in AWS.

For the AWS side you can use the offline testing functionality by doing a `sls offline`.

The example app is a todo list application with a description and due date field for each task.

The APIs are:  
`GET` - `/` - App description and version  
`POST` - `/documents/new` - Create a task/document (takes two parameters - `description` and `duedate`)  
`GET` - `/documents/all` - Return all tasks/documents  
`GET` - `/documents/id` - Return a particular document by ID (via `id` parameter)  
`DELETE` - `/documents/id` - Delete a particular document by ID (via `id` parameter)  
`PATCH` - `/documents/id` - Update a particular document by ID (via `id` parameter and it takes `description` and/or `duedate` as the fields to update)

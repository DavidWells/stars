---
repo: diegozanon/serverless-notifications
url: 'https://github.com/diegozanon/serverless-notifications'
homepage: null
starredAt: '2016-11-11T00:20:36Z'
createdAt: '2016-11-04T12:43:49Z'
updatedAt: '2024-10-02T05:55:18Z'
language: JavaScript
license: MIT
branch: master
stars: 135
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:16.454Z'
description: Serverless Service for Serverless Notifications (AWS IoT)
tags:
  - aws-iot
  - notifications
  - serverless
---

# Serverless Notifications
Serverless Service for Serverless Notifications (AWS IoT)

## Tutorial

Blog post: [Serverless Notifications on AWS](https://web.archive.org/web/20200930220520/https://zanon.io/posts/serverless-notifications-on-aws) (Nov 5th 2016)

Note: at the time it was not an issue, but currently it is necessary to use the ATS IoT endpoint (use `iot.describeEndpoint({ endpointType: 'iot:Data-ATS' }`). The code was fixed in this repository, but not in the blog post.

Demo: https://serverless-notifications.zanon.dev

## Usage

1. With the Serverless Framework v1.x, run `serverless install --url https://github.com/diegozanon/serverless-notifications`

2. Inside the **create-role** folder, run `npm install` and `node index` to create an IoT role. I've named the role as **serverless-notifications-iot**. If you want to rename, modify this file and the **handler.js** file.

3. Deploy the Lambda function with `serverless deploy`

4. Edit the **index.html** file that is placed inside the **frontend** folder to use your Lambda endpoint

5. To modify the IoT client, follow these steps:  
    5.1 Browse the **iot** folder  
    5.2 Edit the **index.js** file   
    5.3 Install dependencies with `npm install`      
    5.4 Run `node make-bundle`  
    5.5 Replace the **bundle.js** inside the **frontend** folder by this new **bundle.js** file   

6. Deploy the frontend to S3  

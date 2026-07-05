---
repo: yai333/React-Chat-App-using-AWS-API-Gateway-Websocket-and-Serverless-Framework
url: >-
  https://github.com/yai333/React-Chat-App-using-AWS-API-Gateway-Websocket-and-Serverless-Framework
homepage: null
starredAt: '2019-04-28T21:07:03Z'
createdAt: '2018-12-28T11:35:33Z'
updatedAt: '2024-03-08T12:34:36Z'
language: JavaScript
license: NA
branch: master
stars: 87
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:38.549Z'
description: >-
  Realtime chat web app using React, AWS API Gateway Websockets, Dynamodb and
  custom Cognito authorizer.
tags: []
---

## This repo is deprecated, please check out new example repo https://github.com/yai333/QuestionAnswerChatbot

Realtime chat web app using React, AWS API Gateway Websockets, Dynamodb and custom Cognito authorizer.
https://medium.com/neami-apps/how-to-build-a-react-chat-app-with-aws-api-gateway-websockets-and-cognito-custom-authorizer-6f84f2da47ec

## Project Structure

```bash
── /backend/            # Api Gateway Websockets and Lambda functions
── /frontend/           # Frontend React web app
```

## Stack

- React 16.8+
- Serverless 1.38+
- Node.js 8.10

## Create AWS Cognito User Pool

https://docs.aws.amazon.com/cognito/latest/developerguide/tutorial-create-user-pool.html

Once User Pool created, Replace all <strong>APP_CLIENT_ID</strong> and <strong>USER_POOL_ID</strong> to your created IDs

## Deploy Backend

```
cd backend
sls deploy
cd ..
```

## Run React App

```
cd frontend
npm install
npm start
```

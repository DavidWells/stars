---
repo: elthrasher/planetstack
url: 'https://github.com/elthrasher/planetstack'
homepage: null
starredAt: '2024-12-21T20:30:48Z'
createdAt: '2021-06-17T13:33:10Z'
updatedAt: '2024-12-21T20:30:48Z'
language: TypeScript
license: MIT
branch: main
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:16.762Z'
description: null
tags: []
---

# Planetstack

Demo app for fullstack CDK / Websocket API.

## Useful Commands

* `npm install` do this first
* `npm run lint` check code style
* `npm t` run unit tests
* `npm start` run UI application on [localhost](http://localhost:3000)
* `npm run synth` synthesize the CloudFormation template
* `npx cdk bootstrap` prepare your environment
* `npm run deploy` build and deploy your app
* `npm run diff` diff your deployed stack

## Generated urls

This is a fullstack app that bundles and deploys a web app fronted by cloudfront and a websocket api. In order for the frontend to be able to find the backend, the deployment drops a `config.json` file in S3 that will be consumed by the UI application. The deploy process will also place this (gitignored) file on your local filesystem. After your first deployment, you'll be able to run the UI locally pointed at your hosted API.

---
repo: onanmco/virtual-assistant
url: 'https://github.com/onanmco/virtual-assistant'
homepage: null
starredAt: '2024-09-19T00:44:10Z'
createdAt: '2023-12-11T20:10:52Z'
updatedAt: '2024-09-19T00:44:10Z'
language: TypeScript
license: NA
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:20.168Z'
description: null
tags: []
---

## Prerequisites

Node.js, typescript, AWS CDK and esbuild (as a global NPM module) should be installed in your computer. 

## Configuration

Go to the config folder at the project's root directory and copy the .env.example and name this copy as .env.{your environment name} like .env.dev or .env.prod

Replace the sample values with your own environment name, application name, AWS account ID and region and save this .env file.


## Deployment

Set NODE_ENV environment variable as your target environment. For example if you want to start the deployment according to the parameters that are written in .env.**dev** file, then you need to run the following command:

    $ export NODE_ENV=dev

Run the following command to start the automated deployment:

    $ cdk deploy


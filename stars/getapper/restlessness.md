---
repo: getapper/restlessness
url: 'https://github.com/getapper/restlessness'
homepage: null
starredAt: '2021-05-15T20:54:49Z'
createdAt: '2020-01-30T16:55:09Z'
updatedAt: '2024-01-25T20:07:48Z'
language: TypeScript
license: MIT
branch: master
stars: 7
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:41.275Z'
description: A framework to easy develop and deploy serverless lambdas REST APIs
tags: []
---

<h1 align="center">Restlessness</h1>

<p align="center">
  <img src="restlessness_logo.png" alt="restlessness-logo" width="320px" height="auto"/>
  <br>
  <br>
  <i>A framework to easy <strong>develop, test and deploy serverless RESTFul APIs</strong> on AWS API Gateway + Lambda Functions services through <a href="www.serverless.com" target="_blank">serverless.com</a> framework.</i>
  <br>
</p>

## Why

[serverless.com](www.serverless.com) framework is great, because it allows you to easily deploy RESTFul APIs.

But the developer experience isn't 100% satisfying. These are some problems we have encountered:
- Compiling the configuration file (serverless.yml) by hand is tedious
- Creating an endpoint involves creating at least one handler file that must be manually linked in the configuration file
- A single serverless configuration file allows the creation of up to 200 resources on AWS (corresponding to about 20 APIs)
- There is no out of the box method to handle cold starts
- Project structure, unit testing, CD/CI configuration, is up to the developer

## What

Restlessness framework allows you to:
1. Create a brand new serverless.com project (based on Typescript) with a CLI command and a standard structure
2. Create models and endpoints through and easy Web interface running locally
3. Manage more serverless micro-services all connected to the same API Gateway through the Web interface
4. Develop locally your project with an out-of-the-box integration of [serverless-offline](https://github.com/dherault/serverless-offline) plugin
4. Test your endpoints with a custom TestHandler function and [jest](https://github.com/facebook/jest)
4. Deploy all your services with a single CLI command

For each endpoint created, Restlessness creates furthermore:
1. An index file automatically imported into the serverless.com configuration file
2. A Typescript interface file that allows you to define the endpoint parameters (query string, payload, path parameters)
3. A [yup](https://github.com/jquense/yup)-based endpoint parameters validation file
4. A handler file linked to the interface and validations file
5. A unit test boilerplate based on [jest](https://github.com/facebook/jest)

## How

Restlessness is a multi-package framework. The main one is the
[CLI](https://github.com/getapper/restlessness/tree/master/packages/restlessness-cli) package.

To install the CLI run:

```bash
npm i @restlessness/cli -g
```

### Create a new project 

To create a new project run:

```bash
restlessness new projectName
```

This will create a new restlessness project inside your cwd with all the boilerplate you need to develop, test and deploy your app.
It will also install all npm dependencies.

### Develop your project

To develop your project run:

```bash
npm run DEV:locale
```

This commands will run:
- your project locally with serverless-offline plugin
- a Web Interface to interact with it 

Thanks to this web interface you can:
- Create new **serverless micro-services**
- Create new **endpoints**
- Create new **models**
- Test you endpoints with an integrated **Swagger UI**

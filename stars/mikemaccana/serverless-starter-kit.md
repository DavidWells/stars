---
repo: mikemaccana/serverless-starter-kit
url: 'https://github.com/mikemaccana/serverless-starter-kit'
homepage: null
starredAt: '2021-01-15T04:58:47Z'
createdAt: '2020-12-17T16:34:12Z'
updatedAt: '2023-10-03T10:32:09Z'
language: TypeScript
license: NA
branch: main
stars: 66
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:07.183Z'
description: 'A fulllstack serverless app using TypeScript, Svelte and Architect Serverless'
tags: []
---

# Serverless Starter Kit

<img alt="logos" src="/public/images/logos.svg"/>

[![mikemaccana](https://circleci.com/gh/mikemaccana/serverless-starter-kit.svg?style=shield)](https://app.circleci.com/pipelines/github/mikemaccana/serverless-starter-kit)

 - [AWS SAM](https://aws.amazon.com/serverless/sam/)
 - [Architect Serverless](https://arc.codes)
   - A full local AWS sandbox
   - Easily shared code between routes
   - Easly create AWS infrastructure - the `arc` in [package.json](./package.json) creates the AWS SAM `sam.yaml` file for you!
   - Types are provided for the Arc `Request` and `Response` objects
   - Pure ES2017 `await` style code **with no callbacks for routes or middleware** - Arc lambdas simply return HTTP responses, and middleware can be chained together by returning a response (ending processing) or a modified request (passing to the next step in middleware) 
 - [Svelte](https://svelte.dev/) using TypeScript, for fast, simple and small code without the overhead of a virtual DOM.
 - [eslint using TypeScript](https://github.com/typescript-eslint/typescript-eslint)
 - Tests using [TS jest](https://kulshekhar.github.io/ts-jest/) (and a ready to go config for Circle CI)
 - An `.env` for secrets, which isn't committed for security reasons - keep it in your password manager.
 - Users and passwords using bcrypt
 - A neat HTML5 page layout with CSS **grid by default**.
 - Live Reloading
# How to use this repository

## Clone it

```bash
npx degit mikemaccana/serverless-starter-kit my-new-app
cd my-new-app
npm install
```

## Set up the DB

Install MongoDB, then `cp .env.example .env` to make an env file. Then start MongoDB.

## Start the app

Just run:

```
npm start
```

The [Architect sandbox](https://arc.codes/) is now running on http://localhost:3333
## Test

```bash
npm test
```

Or to run a single test suite or test:

```bash
npm test-filter "Auth"
```

## Deploy the code to AWS

Set up your `~/.aws/credentials` and run:

```bash
npm run deploy
```

## Get started with Architect Serverless and Svelte

See the docs for [Architect Serverless](https://arc.codes/) and [Svelte](https://svelte.dev/)

 - **Frontend code**, including Svelte components, is in `src/frontend`
 - **Images and global CSS** is in `public/images` and `public/css`
 - **Backend code** is in `src/http`, `src/ws`, code shared between all routes is in `src/shared` and `src/views`. If you make changes to `src/shared` and `npm run update-shared-and-views` will update the necessary symlinks for you.
 - **Infrastructure** is in [package.json](./package.json) under the `arc` key. Arc organises these by familiar concepts - so each `http` route, for example, results in an API gateway with a Lambda attached when you deploy to AWS.

## Issues are welcome, but pull requests are better!

Please don't just spam me asking for features! 

## Changelog

See [CHANGELOG.md](./CHANGELOG.md)

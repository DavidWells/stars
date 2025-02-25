---
repo: TylerShin/beyond.ts
url: 'https://github.com/TylerShin/beyond.ts'
homepage: null
starredAt: '2017-04-03T18:24:22Z'
createdAt: '2016-10-16T04:59:08Z'
updatedAt: '2024-06-18T06:12:59Z'
language: TypeScript
license: NA
branch: master
stars: 88
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:46.353Z'
description: null
tags:
  - lambda
  - react
  - serverless
  - serverside-rendering
  - typescript
---

# beyond.ts

This project is the starter kit for the who wants to use ReactJS isomorphic-rendering with Serverless framework (AWS).

<!-- The [Demo & Docs](https://d3ujodob71n39b.cloudfront.net) is now available! -->

* React16+
* React-Router v4
* Other dependencies

  **Packages**

* **TypeScript** - Basic language
* **ReactJS** - Frontend library
* **Redux** - App state manager
* **Serverless** - managing AWS Lambda, API Gateway, and the others within cloud-formation

# Todos

* **Add server side rendering dev tool like Razzle**
* **Add TEST**

# Before Start

* This isn't free to start. Because it uses AWS's several services(Lambda, API Gateway, S3, CloudFront, CloudFormation, (Route53))\*

1. Set AWS Credential
   You should set AWS IAM Role and account setting.
   visit below guide and precede AWS settings before run deploying script
   [Serverless AWS account setting guide](https://serverless.com/framework/docs/providers/aws/guide/credentials/)

2. Make S3 Bucket to upload your bundled S3

```
Make S3 Bucket
(If you can connect this with CDN like the Cloudfront, the script loading speed will be better. But in this case you should change some code in deploy logic and normal logic too.)
```

`Set S3 Bucket information in <root_directory>/scripts/builds/config.ts`

# How to install

```
git clone https://github.com/TylorShin/beyond.ts.git
cd beyond.ts
npm install
```

### How to use

**Running dev server**

```
npm run dev
```

### Build production script

_at staging server_

```
npm run deploy:stage
```

_at production server_

```
npm run deploy:prod
```

### Logs in Terminal (please read serverless official docs)

```
npm i -g serverless
serverless logs -f [function name] -s [stage name]
```

```
ex) serverless logs -f ssr -s stage
```

If you want to watch logs in watch mode(continuously),
just run with -t option

```
serverless logs -f [function name] -s [stage name] -t
```

# deploy process

1. Make and Apply new git tag for SCM and destination path.
2. Make bundled JS files for server-side and browser-side.
3. Upload bundled JS files to S3 and Remove browser side bundled JS.
4. Copy package.json that only for serverless to dist folder.
5. Install all packages in dist folder and zip them with bundled JS.
6. Deploy Lambda and relevant packages by using serverless

# Todos

* **Add server side rendering dev tool like Razzle**
* **Add TEST**
* **Minimize node_modules size**

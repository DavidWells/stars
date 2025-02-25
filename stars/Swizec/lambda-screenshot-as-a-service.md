---
repo: Swizec/lambda-screenshot-as-a-service
url: 'https://github.com/Swizec/lambda-screenshot-as-a-service'
homepage: null
starredAt: '2019-04-24T23:19:40Z'
createdAt: '2018-11-17T23:55:46Z'
updatedAt: '2025-01-16T14:09:08Z'
language: TypeScript
license: MIT
branch: master
stars: 148
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:39.718Z'
description: AWS Lambda Chrome Headless screenshots
tags: []
---

# Puppeteer Lambda Starter Kit

Starter Kit for running Headless-Chrome by [Puppeteer](https://github.com/GoogleChrome/puppeteer) on AWS Lambda.

It can use alone and also supported [Serverless Framework](https://github.com/serverless/serverless).

## Download

### Use alone

This is simple and don't need IAM role but you have to deploy package by yourself. Don't worry, even if you will become to use Serverless in the future, what you should do for migration is little.

```
$ git clone -o starter-kit https://github.com/sambaiz/puppeteer-lambda-starter-kit.git your_project_name
```

### Use with Serverless Framework

Serverless Framework can manage settings with CloudFormation and deploy.

```
$ serverless install --url https://github.com/sambaiz/puppeteer-lambda-starter-kit --name your_project_name
```

## Run on local

By executing `SLOWMO_MS=250 npm run local`, you can check the operation while actually viewing the chrome (non-headless, slowmo).

## Packaging & Deploy

Lambda's memory needs to be set to at least 384 MB, but the more memory, the better the performance of any operations.

```
512MB -> goto(youtube): 6.481s
1536MB -> goto(youtube): 2.154s
```

### chrome in package (recommended)

If you use alone, run `npm run package`, and deploy the package.zip. 

If you use with Serverless, run `serverless deploy` (this runs `npm run package` when packaging).

### chrome NOT in package

Due to the large size of Chrome, it may exceed the [Lambda package size limit](http://docs.aws.amazon.com/lambda/latest/dg/limits.html) (50MB) depending on the other module to include. 
In that case, put Chrome in S3 and download it at container startup so startup time will be longer.

Run `npm run package-nochrome`, deploy the package.zip, and set following env valiables on Lambda.

- `CHROME_BUCKET`(required): S3 bucket where Chrome is put
- `CHROME_KEY`(optional): S3 key. default: `headless_shell.tar.gz`

## Build Headless-Chrome (optional)

This kit includes Chrome built by myself because official build Chrome installed by Puppeteer has problems about running on Lambda (missing shared library etc.).

If you want to use latest chrome, run chrome/buildChrome.sh on EC2 having at least 16GB memory and 30GB volume. 
See also [serverless-chrome](https://github.com/adieuadieu/serverless-chrome/blob/master/docs/chrome.md).
Once you build it, link to `headless_shell.tar.gz` in `chrome` dir.

## Article

[Lambda上でPuppeteer/Headless Chromeを動かすStarter Kitを作った - sambaiz-net](https://www.sambaiz.net/article/132/)

---
repo: RafalWilinski/serverless-puppeteer-layers
url: 'https://github.com/RafalWilinski/serverless-puppeteer-layers'
homepage: 'https://dynobase.com'
starredAt: '2018-12-01T21:21:51Z'
createdAt: '2018-11-30T09:22:33Z'
updatedAt: '2025-02-18T03:08:34Z'
language: JavaScript
license: NA
branch: master
stars: 273
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:00.327Z'
description: Serverless Framework + AWS Lambda Layers + Puppeteer = ❤️
tags:
  - aws-lambda
  - chrome
  - headless
  - layers
  - puppeteer
  - serverless
---

# Serverless Puppeteer using AWS Lambda Layers

<p>
  <img src="https://img.shields.io/badge/version-1.1.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://twitter.com/rafalwilinski">
    <img alt="Twitter: rafalwilinski" src="https://img.shields.io/twitter/follow/rafalwilinski.svg?style=social" target="_blank" />
  </a>
</p>

> Recently AWS introduced [Layers](https://aws.amazon.com/about-aws/whats-new/2018/11/aws-lambda-now-supports-custom-runtimes-and-layers/) which enables sharing common code between functions and working with large dependencies (such as headless chrome) much easier.

This project example returns a screenshot of page requested via `?address=` query parameter.

![Demo](assets/demo.gif?raw=true 'Demo')

### Usage

It is very important to tell NPM to skip installing chromium from `puppeteer` package. To do so, installing dependencies should be done using this command:

```sh
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=1 npm install
```

or

```sh
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=1 yarn
```

Without this, your function size would be more than 200MB which is way too much.

After that, you can simply deploy your funciton.

```sh
sls deploy

curl <DEPLOYED_ENDPOINT>?address=https://google.com
```

or apply this ARN to your function directly: `arn:aws:lambda:us-east-1:085108115628:layer:chrome:6`

### Bundling latest Chromium on your own

Prerequisites:

- `brotli`

```sh
./download-latest.sh
```

Credits for this solution go to [San Kumar](https://github.com/san-kumar)

### Author

👤 **Rafal Wilinski**

- Twitter: [@rafalwilinski](https://twitter.com/rafalwilinski)
- Github: [@RafalWilinski](https://github.com/RafalWilinski)

### Show your support

Give a ⭐️ if this project helped you!

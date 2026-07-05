---
repo: bigdatr/bigdatr-startr
url: 'https://github.com/bigdatr/bigdatr-startr'
homepage: null
starredAt: '2016-12-19T03:49:39Z'
createdAt: '2015-10-30T00:37:21Z'
updatedAt: '2023-01-28T19:57:02Z'
language: JavaScript
license: NA
branch: master
stars: 4
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:50.730Z'
description: Yeoman generator for quick-start apps
tags: []
---

# bigdatr startr
[![generator-bigdatr-startr npm](https://img.shields.io/npm/v/generator-bigdatr-startr.svg?style=flat-square)](https://www.npmjs.com/package/generator-bigdatr-startr)

## Installation

```
npm install -g yo
npm install -g generator-bigdatr-startr
yo bigdatr-startr
```

---


## Generators


### Scaffold

Builds out a full app scaffold with client & server

#### Tasks

| Command                   | Description                                  |
|---------------------------|----------------------------------------------|
| `grunt default`           | Starts the app in development mode           |
| `grunt build`             | Builds out a production version of the app   |
| `grunt build:development` | Builds out static files without minification |
| `grunt test`              | Runs all tests                               |
| `grunt testing`           | Starts the testing environment               |


### Client

A generator for a simple static client that queries apis for dynamic data.


#### Features

- Integrated deployment to S3 Cloudfront with [s3_website](https://github.com/laurilehmijoki/s3_website)
- Hashing of asset filenames to allow for aggressive caching
- asset management and bundling with [file-loader](https://github.com/webpack/file-loader)
- Prerending of react jsx to HTML for super quick loading with [static-site-generator-webpack-plugin](https://github.com/markdalgleish/static-site-generator-webpack-plugin)
- Testing with [ava](https://github.com/avajs/ava)
- Test coverage with [nyc](https://github.com/istanbuljs/nyc)
- docs with [jsdonk](https://github.com/dxinteractive/jsdonk)
- Bundling with babel and webpack

#### Getting started

The generator will run `yarn install` and `yarn run build-dev` for you. `yarn run build-dev` will create the necessary html files to run the app locally.

To start developing, run the watch command:

```
yarn watch
```

This will start webpack-dev-server at the port you specified in the setup.


#### Tasks

| Command                   | Description                                                                   |
|---------------------------|-------------------------------------------------------------------------------|
| `yarn run ava`            | Run ava tests                                                                 |
| `yarn run build`          | Runs a production build of the app, including prerendering and file hashing   |
| `yarn run build-dev`      | Runs a development build of the app. Needs to be run before `yarn run watch`  |
| `yarn run check-coverage` | Checks test coverage                                                          |
| `yarn run docs`           | Builds out documentation using jsdoc/jsdonk                                   |
| `yarn run flow`           | Runs a flow check of the source code                                          |
| `yarn run lint`           | Runs eslint on source code                                                    |
| `yarn run lint-fix`       | Attempts to fix eslint errors                                                 |
| `yarn run test`           | Runs tests and coverage checks                                                |
| `yarn run test-all`       | Runs all tests, flow, and linting                                             |
| `yarn run watch`          | Boots up webpack-dev-server for devving                                       |



### Serverless [λ]

A generator for serverless services.

#### Features

- Uses [serverless](http://serverless.com/) to manage lambda functions
- Has [serverless-offline](https://github.com/dherault/serverless-offline) for local development
- Custom bundler script to ensure that only required files are deployed to lambda
- Uses local version of serverless so that it doesn't have to be installed globally and for reproduceable builds across multiple enviroments.
- Babel transpilation so you can do fun es2015 stuff.
- Testing with [ava](https://github.com/avajs/ava)
- Test coverage with [nyc](https://github.com/istanbuljs/nyc)
- docs with [jsdonk](https://github.com/dxinteractive/jsdonk)

#### Tasks

| Command                   | Description                                                                   |
|---------------------------|-------------------------------------------------------------------------------|
| `yarn run ava`            | Run ava tests                                                                 |
| `yarn run build`          | Runs a production build of the service in preparation for deployment          |
| `yarn run watch`          | Starts up serverless-offline for local development                            |
| `yarn run watch-nocache`  | Starts up serverless-offline with `--skipCacheInvalidation` flag and nodemon to avoid [this bug](https://github.com/dherault/serverless-offline/issues/165)|
| `yarn run deploy`         | Deploys to lambda dev stage                                                   |
| `yarn run docs`           | Builds out documentation using jsdoc/jsdonk                                   |
| `yarn run flow`           | Runs a flow check of the source code                                          |
| `yarn run lint`           | Runs eslint on source code                                                    |
| `yarn run lint-fix`       | Attempts to fix eslint errors                                                 |
| `yarn run test`           | Runs tests and coverage checks                                                |
| `yarn run test-all`       | Runs all tests, flow, and linting                                             |

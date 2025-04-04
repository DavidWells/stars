---
repo: dancrumb/generator-serverless-policy
url: 'https://github.com/dancrumb/generator-serverless-policy'
homepage: null
starredAt: '2017-10-19T21:34:06Z'
createdAt: '2017-03-13T00:30:42Z'
updatedAt: '2024-12-13T08:38:49Z'
language: JavaScript
license: MIT
branch: main
stars: 279
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:37.122Z'
description: Yeoman Generator to create IAM policy for deploying a Serverless service
tags: []
---

# Serverless Policy Generator

This is a yeoman generator for creating the AWS Policy document that
allows a user to deploy a Serverless service.

Simply run it and provide it with the name of the service and, optionally,
the name of the stage and region for deployment (in case you want to limit the user
in question).

A `${project}-${stage}-${region}-policy.json` file will be created (using `_star_` instead of `*`
in the filename). If an Account ID is provided, the file will be named as `${account}-${project}-${stage}-${region}-policy.json`.
The contents of this can then be used to create a policy in your IAM dashboard.

## Usage

This project requires [Yeoman](https://yeoman.io). Install it globally with:

```bash
npm install -g yo
```

_NB_: as of 2020-03-05 this requires node >= v10

Then install the generator:

```bash
npm install -y generator-serverless-policy
```

Now run in the directory in which you wish to output the policy JSON file:

```bash
yo serverless-policy
```

The generator will ask questions about region, stage, DynamoDB and S3 before outputting a policy. If this is the first time you have used Yeoman then Yeoman will prompt you about sharing analytics with them; _the answer to this does not affect the generation of the policy_.

## Acknowledgements

The basic Policy Document is taken from [here](https://github.com/serverless/serverless/issues/1439#issuecomment-268434517)

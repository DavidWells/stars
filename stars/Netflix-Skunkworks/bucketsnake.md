---
repo: Netflix-Skunkworks/bucketsnake
url: 'https://github.com/Netflix-Skunkworks/bucketsnake'
homepage: null
starredAt: '2018-02-20T21:34:40Z'
createdAt: '2017-12-20T19:55:16Z'
updatedAt: '2024-01-03T14:15:24Z'
language: Python
license: Apache-2.0
branch: master
stars: 14
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:27.725Z'
description: An AWS lambda function that grantsss S3 permissionsss at ssscale.
tags:
  - aws
  - badpunsss
  - cross-account
  - iam
  - lambda
  - permissions
  - s3
  - security
  - serverless
---

Bucket Snake
=======================
[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com) [![Build Status](https://travis-ci.org/Netflix-Skunkworks/bucketsnake.svg?branch=master)](https://travis-ci.org/Netflix-Skunkworks/bucketsnake) [![Coverage Status](https://coveralls.io/repos/github/Netflix-Skunkworks/bucketsnake/badge.svg)](https://coveralls.io/github/Netflix-Skunkworks/bucketsnake)

## This project is in heavy development and not yet ready for production use

<p align="center"><img src="website/static/img/logo.png" alt="logo" width="30%" height="30%" /></p>

Bucket Snake is an AWS Lambda function that provisions S3 access for IAM roles. A primary feature
of Bucket Snake is to create IAM roles that reside in the account where the S3 buckets live to facilitate
proper cross-account S3 bucket access (via a role assumption).

Documentation
-------------
Bucket Snake's documentation [can be found here](https://Netflix-Skunkworks.github.io/bucketsnake).

---
repo: matt-land/lambda_remote_bash
url: 'https://github.com/matt-land/lambda_remote_bash'
homepage: null
starredAt: '2016-09-01T19:46:08Z'
createdAt: '2016-07-29T02:10:23Z'
updatedAt: '2021-03-17T15:53:59Z'
language: HCL
license: NA
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:19.533Z'
description: run arbitrary bash commands on aws lambda
tags: []
---

# Remote Bash 

### This is a demo of running arbitrary bash commands on AWS lambda, which is helpful in exploring the platform.


Create a python lambda called "remote_bash", and paste in the lambda_function.py code.

A sample config is provided.

Install aws cli tools if you haven't.

Run aws configure if you haven't.

## Usage:
./remote_bash.sh "df -h"

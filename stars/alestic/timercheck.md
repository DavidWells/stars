---
repo: alestic/timercheck
url: 'https://github.com/alestic/timercheck'
homepage: null
starredAt: '2016-04-17T06:19:55Z'
createdAt: '2015-07-18T22:38:16Z'
updatedAt: '2022-03-30T22:38:10Z'
language: Python
license: Apache-2.0
branch: master
stars: 67
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:28.210Z'
description: TimerCheck.io
tags: []
---

# TimerCheck.io

This repository contains an AWS Lambda function that powers the web
service API behind TimerCheck.io

For more information about what the service does and how to use it,
please read the following article:

> TimerCheck.io - Countdown Timer Microservice

> https://alestic.com/2015/07/timercheck-scheduled-events-monitoring/

The following commands work on Ubuntu 17.04 Zesty:

Install prerequisites:

    make setup

Deploy to AWS account:

    make deploy

Show AWS Lambda function logs

    make logs

---
repo: coingraham/cftpasscheck
url: 'https://github.com/coingraham/cftpasscheck'
homepage: null
starredAt: '2017-12-29T20:27:09Z'
createdAt: '2016-04-16T18:35:58Z'
updatedAt: '2021-02-01T15:59:14Z'
language: null
license: MIT
branch: master
stars: 8
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:32.668Z'
description: CloudFormation Password Checker Lambda Backed Custom Resource
tags: []
---

# CloudFormation Password Checker Lambda Backed Custom Resource
Verify your passwords *BEFORE* you deploy

## Description
Add this code to your favorite CFT to add password verification to the CFT.  This keeps you from accidentally typing the wrong password and needing to redeploy.

## How to use
Simply copy the resources of the CFT into your existing CFT.  Then you'll want to create two password parameters and reference them in the "Password" and "ConfirmPassword" LambdaCallout section.  If the passwords match, the CFT will complete as normal.  If they do not, the CFT will fail out.





---
repo: Ryanjlowe/cross-org-amazon-pinpoint
url: 'https://github.com/Ryanjlowe/cross-org-amazon-pinpoint'
homepage: null
starredAt: '2020-11-21T07:28:30Z'
createdAt: '2020-11-20T17:01:59Z'
updatedAt: '2020-11-23T15:08:59Z'
language: null
license: NA
branch: master
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:22.475Z'
description: null
tags: []
---

# Amazon Pinpoint Cross Org Project Setup

Includes the infrastructure, policies, and example code needed to implement sharding Amazon Pinpoint projects across multiple AWS Accounts inside of an AWS Organization.  Useful for scenarios where more than 100 Pinpoint Projects are needed.

## Architecture Diagram

![Arch](arch.png)

*DynamoDB and Lambda with STS logic not included

## Files
* [PrimaryAccount.yaml](PrimaryAccount.yaml) - Used to set up assets in the Primary Account
* [SubAccount.yaml](SubAccount.yaml) - Used to set up assets in each Sub Account
* [PinpointProject.yaml](PinpointProject.yaml) - Used to set up each Pinpoint Project in sub accounts

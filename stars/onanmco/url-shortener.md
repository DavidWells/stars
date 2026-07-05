---
repo: onanmco/url-shortener
url: 'https://github.com/onanmco/url-shortener'
homepage: null
starredAt: '2024-09-19T00:32:12Z'
createdAt: '2022-10-30T15:11:33Z'
updatedAt: '2024-09-19T00:32:13Z'
language: TypeScript
license: NA
branch: master
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:20.230Z'
description: A CDK application creates a URL shortener service on AWS cloud.
tags: []
---

# URL Shortener Service

This project consist of the source codes of a CDK application that builds and deploys an URL shortener service in AWS using TypeScript, Lambda, API Gateway and DynamoDB.

## Solution Diagram

![image](https://user-images.githubusercontent.com/45673838/198887159-dc680118-a6d4-408e-80bf-1431668396e7.png)

## Steps To Deploy the Application

* Copy the .env.example file and rename as .env.
* Fill in the environment variables regarding to your own AWS account information.
* Run `npm i`
* Run `cdk bootstrap`
* Run `cdk deploy`

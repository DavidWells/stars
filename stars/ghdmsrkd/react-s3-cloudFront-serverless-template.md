---
repo: ghdmsrkd/react-s3-cloudFront-serverless-template
url: 'https://github.com/ghdmsrkd/react-s3-cloudFront-serverless-template'
homepage: null
starredAt: '2022-10-22T06:21:08Z'
createdAt: '2021-08-13T08:43:45Z'
updatedAt: '2024-12-18T00:20:09Z'
language: JavaScript
license: MIT
branch: main
stars: 12
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:18.606Z'
description: >-
  This project show how fast we can deploy react app in s3 and cloudfront. Try
  it and make yours
tags: []
---

# react-s3-cloudFront-serverless-template
This project show how fast we can deploy react app in s3 and cloudfront with serverless framework. Try it and make yours
****

## following steps
* ``` npm install serverless -g ```
* Move to ~/.aws/credentials
* Append your AWS PROFILE like this
    ```
    [my-profile] 
    aws_access_key_id=INSERT YOUR ACCESS KEY
    aws_secret_access_key=INSERT YOUR SECRET KEY
    ```
* Export your profile
    ```
    export AWS_PROFILE="my-profile"
    ```
* Move to react-s3-cloudFront-serverless-template/my-app DIR
  ```
  yarn build
  ```
* Move to react-s3-cloudFront-serverless-template DIR
* Edit serverless.yml The name of the bucket must be unique.
  ```
  custom:
    bucketName: Your bucket name
* Now Let's deploy!!
    ```
    sls deploy
    ```
* Wait a minute then you will Success deploy
    [Click Me!](https://serverless-react-app-test-1234.s3.ap-northeast-2.amazonaws.com/index.html)

****

***Isn't it super easy?***
Do not deploy your React app manually!
Use the Serverless Framework to deploy automatically!

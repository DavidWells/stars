---
repo: laardee/video-preview-and-analysis-service
url: 'https://github.com/laardee/video-preview-and-analysis-service'
homepage: ''
starredAt: '2018-10-22T04:36:30Z'
createdAt: '2017-04-16T21:08:45Z'
updatedAt: '2023-10-12T18:14:42Z'
language: JavaScript
license: MIT
branch: master
stars: 47
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:10.220Z'
description: >-
  A Serverless Event-Driven Service for Creating Preview Animation and Labels
  from Video File
tags:
  - aws
  - gif
  - recognition
  - serverless
  - serverless-framework
---

# Serverless Video Preview and Analysis Service

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)

This is a serverless event-driven service that generates labels and creates preview animation from a video file. The most common use case could be a stock video service for short or medium length videos that need to be labeled with previews when uploaded to service.

[FFMPEG](https://ffmpeg.org/) is used to create the preview and capturing the keyframes for [Amazon Rekognition](https://aws.amazon.com/rekognition/) analysis. 

This repository includes video service and two example use cases, upload service for uploading a video file from the browser and Facebook bot backend service.

Read a short review of the project from [A Cloud Guru blog post](https://read.acloud.guru/announcing-the-winners-of-the-inaugural-serverlessconf-architecture-competition-1dce2db6da3#1ab0).

## Architecture

This project is separated into three parts, video service that generates a GIF preview and detects objects, and two example services that use the video service.

### Video Service

![Video Service Architecture](https://raw.githubusercontent.com/laardee/video-service/master/images/video-service.png)

1. Video file is added to Source bucket which sends Session SNS message (object create /videos).
2. Create Session Lambda function catches the message and creates sessions and sends Render Start SNS message.
3. Both, Create Gif and Create Captures Lambda functions catches the message and starts processing video file.
4. Create Gif Lambda function created preview gif and adds the file to Render Bucket and adds GIF details to session table.
5. Create Captures Lambda function creates png captures from keyframes of the source video file and puts those to Source Bucket and saves capture names to Labels table.
6. Source bucket sends Capture SNS messages (object create /captures). Every png triggers own SNS message.
7. Get Labels Lambda function catches Capture SNS and gets labels from current capture file using Amazon Rekognition. Then it updates Labels table with labels.
8. Status Lambda function is scheduled to run every minute and check the status of processes. When all labels are fetched and gif preview rendered it writes metadata.json to Render bucket which triggers Render Ready SNS message that can be subscribed from other services (upload service or facebook bot in this case). Status function can be also triggered with Status SNS message from other services.

### Upload Service 

![Upload Service Architecture](https://raw.githubusercontent.com/laardee/video-service/master/images/upload-service.png)

1. User request signed URL for uploading video to S3 Bucket. Get Signed Url Lambda function generates URL and creates a session.
2. User uploads video to S3 Bucket which triggers Video Service to start processing.
3. Status function catches Render Ready SNS message when Video Service has finished processing video.
4. The Status function gets metadata from Render Bucket and updates the session.
5. User request metadata from Get Metadata Lambda function (at the time web sockets are not supported in API Gateway so polling is used). It also sends Status SNS message if video processing is not ready yet.

### Facebook Service

![Messenger Bot Service Architecture](https://raw.githubusercontent.com/laardee/video-service/master/images/facebook-service.png)

1. Messenger bot user records video and sends it to Messenger service. The video is saved to Facebook CDN and Messenger Service passes the message that contains URL to the video file to API Gateway that triggers Facebook Lambda function.
2. Facebook Lambda creates a session and sends Download SNS message. After that, it returns ok message to Messenger Service.
3. Download Lambda function download video to lambda environment and puts it to Source Bucket which triggers Video Service to start processing.
4. Facebook Lambda function is subscribing Render Ready Topic and when Video Service has finished processing video it downloads metadata and sends GIF image message and labels message to Messenger service which passes messages to Messenger client.

Messenger Service endpoint is verified using GET request to /facebook endpoint. More about that in Installation & Deployment.

## Installation & Deployment

**Installation**

Clone or download this repository and run `npm install` in following directories

* video-service
* shared
* upload-service
* facebook-service

Rename `example.secrets.yml` to `.secrets.yml` and change mock secrets to match your secrets.

**Tip:** If you have aws-cli installed `aws sts get-caller-identity --output text --query 'Account'` displays AWS account id.

**Deployment**

Upload service and facebook service depends on video service, so it needs to be deployed first.  To deploy all services run `./deploy.sh` located in project root directory. 

When deleting resources from AWS, reversed order should be used. First upload service and/or facebook service then video service.

### Upload Service

There is a very simple [React web application](https://github.com/laardee/video-service-web) that can be used to test upload service. 
1. Clone or download the service and run `npm install` or `yarn`. 
2. Change the `endpoint` in the `src/config` file to point your upload service API endpoint. 
3. Run `npm start` to start a local server.

Live example: https://laardee.github.io/video-service-web/build/

### Facebook Service

If you wish to use Facebook Service, set up the facebook app before deployment.

* Create Facebook application -> https://developers.facebook.com/quickstarts/?platform=web
* Create Facebook page -> https://www.facebook.com/pages/create

Copy the page access token and add it to .secrets.yml. as `FACEBOOK_BOT_PAGE_ACCESS_TOKEN`. Also, modify the `FACEBOOK_BOT_VERIFY_TOKEN` as you like.

After deployment set up the webhook using Facebook Service endpoint, something like `https://randomchars.execute-api.us-east-1.amazonaws.com/dev/facebook`. Serverless framework displays it after deployment or alternatively go to the `facebook-service` directory and run `sls info`.

**License**

Copyright (c) 2017 Eetu Tuomala, licensed for users and contributors under [MIT license](https://github.com/laardee/video-service/blob/master/LICENSE).

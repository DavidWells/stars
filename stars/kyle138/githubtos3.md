---
repo: kyle138/githubtos3
url: 'https://github.com/kyle138/githubtos3'
homepage: ''
starredAt: '2021-01-19T17:08:45Z'
createdAt: '2016-03-04T17:06:52Z'
updatedAt: '2022-11-02T22:25:58Z'
language: JavaScript
license: ISC
branch: master
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:05.980Z'
description: A Lambda bot that responds to GitHub pushes and deploys to S3.
tags: []
---

# githubtos3
v4.2.2  
A Lambda bot that responds to GitHub pushes and deploys to S3.  
Now supports deploying only an optional subdirectory of the repo.  

## Note:
  After cloning or pulling changes remember to run 'npm install' from the **layers/CommonModules/nodejs** directory.   
  
## Configuration:
  Please see the full How-To hosted in S3 using this Lambda bot [here](https://githubtos3.kylemunz.com/).  

## Components:
- **Layers:** ```CommonModules``` Lambda layer with the following NPM modules:
  - @octokit/rest
  - download
  - node-stream-zip
  - s3-client
- **API Endpoint:** POST - ```/ghWebhook``` URL Endpoint configured in the GitHub webhook.
- **Lambda:** ```listener.handler``` Lambda function triggered by API Endpoint.
  - Verifies event
  - Retrieves deploy.json from GitHub repo
  - Publishes to SNS
  - Sends response to API
- **SNS:** ```github-webhooks``` SNS topic that stores GitHub events to be processed.
- **Lambda:** ```deployer.handler``` Lambda function triggered by SNS. 
  - Queries GitHub API for download URL of the Zip file
  - Downloads Zip file from URL provided to /tmp
  - Unzips entire or partial zip file locally
  - Syncs local files with S3 bucket specified in deploy.json

## Credits:
  By no means did I come up with all of this by myself. I drew heavy inspiration (and code) from the links below::  

  [Dynamic GitHub Actions with AWS Lambda](https://aws.amazon.com/blogs/compute/dynamic-github-actions-with-aws-lambda/)  

  [JavaScript GitHub API for Node.JS](http://mikedeboer.github.io/node-github/)  

  [S3 Static Website Hosting](http://docs.aws.amazon.com/gettingstarted/latest/swh/website-hosting-intro.html)  
  
  The changes in V3.0.x which moved the trigger for this function from GitHub's SNS service to an API Gateway webhook drew heavy inspiration from the [Github Webhook Listener](https://serverless.com/examples/aws-node-github-webhook-listener/)

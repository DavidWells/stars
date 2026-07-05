---
repo: s0enke/serverless-boilerplate
url: 'https://github.com/s0enke/serverless-boilerplate'
homepage: null
starredAt: '2016-11-27T09:29:24Z'
createdAt: '2016-11-08T19:28:11Z'
updatedAt: '2023-01-28T10:14:59Z'
language: JavaScript
license: MIT
branch: master
stars: 8
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:14.110Z'
description: null
tags: []
---

# serverless-boilerplate

This sample project is part of my [AWS Advent 2016 article](https://www.awsadvent.com/2016/12/14/serverless-everything-one-button-serverless-deployment-pipeline-for-a-serverless-app/) about serverless pipelines for serverless apps.

The layout of the project is as follows:

 - a `frontend/` folder with a `package.json` which will produce a build into `build/` when `npm run build` is called by the pipeline. 
 - a `backend/` folder with a `serverless.yml`. The pipeline will call the `serverless deploy` (the Serverless framework). It should have at least one http event so that the Serverless framework creates a service endpoint which can then be used in the frontend to call the APIs.
 
You can try it out yourself by starting a AWS CloudFormation stack (make sure to clone or copy this project first), which will create a serverless deploy pipeline with AWS CodePipeline:
 
[![Launch Stack](https://github.com/s0enke/cloudformation-templates/blob/master/cloudformation-launch-stack.png?raw=true)](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/new?stackName=serverless-app-awsadvent-sample&templateURL=https://s3.amazonaws.com/ruempler-cloudformation-templates-prod/pipeline-serverless-backend-npm-frontend.yml)
([CloudFormation Template](https://s3.amazonaws.com/ruempler-cloudformation-templates-prod/pipeline-serverless-backend-npm-frontend.yml))

The [source repository of the CloudFormation template is here](https://github.com/s0enke/cloudformation-templates/blob/master/templates/pipeline-serverless-backend-npm-frontend.yml).



## License

MIT

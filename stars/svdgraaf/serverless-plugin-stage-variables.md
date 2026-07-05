---
repo: svdgraaf/serverless-plugin-stage-variables
url: 'https://github.com/svdgraaf/serverless-plugin-stage-variables'
homepage: null
starredAt: '2016-11-28T19:06:00Z'
createdAt: '2016-09-21T14:53:09Z'
updatedAt: '2022-08-01T13:08:25Z'
language: JavaScript
license: MIT
branch: master
stars: 40
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:49:15.081Z'
description: >-
  Add stage variables for Serverless 1.x to ApiGateway, so you can use variables
  in your Lambda's
tags: []
---

# serverless-plugin-stage-variables
Add stage variables for Serverless 1.x to ApiGateway, so you can use variables (and CloudFormation references!) in your Lambda's.


# Usage
```yaml

custom:
  stageVariables:
    bucket_name: ${env.BUCKET_NAME}
    endpoint: { "Fn::GetAtt": "CloudFrontEndpoint.DomainName" }
    foo: bar

plugins:
  - serverless-plugin-stage-variables
```

And then in your lambda's, you can use:

```javascript
module.exports.foobar = (event, context, cb) => {
  // event.stageVariables.bucket_name
  // event.stageVariables.endpoint
  // event.stageVariables.foo
}
```

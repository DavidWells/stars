---
repo: SWO-GS/serverless-redirect-example
url: 'https://github.com/SWO-GS/serverless-redirect-example'
homepage: null
starredAt: '2016-11-09T02:21:07Z'
createdAt: '2016-11-01T05:27:28Z'
updatedAt: '2025-01-15T08:28:22Z'
language: JavaScript
license: NA
branch: master
stars: 10
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:16.608Z'
description: Example of how to implement redirects in the Serverless framework
tags: []
---

# serverless-redirect-example

We just started playing with the v1 of the serverless framework after building a [serverless hipchat plugin boilerplate repository](https://github.com/GorillaStack/serverless-hipchat-connect) and an [example plugin that aggregates CloudWatch Alarms](https://github.com/GorillaStack/serverless-hipchat-sns-cloudwatch-alarms) in version 0.5.6 of the serverless framework.

This is a simple serverless project designed to demonstrate the new way of achieving redirects in v1 of the serverless framework.

### The old way:

Configure the response headers in the `s-function.json` file for your function.

Enter header configuration
```json
  {
      "path": "uninstalled",
      "method": "GET",
      "type": "AWS",
      "authorizationType": "none",
      "authorizerFunction": false,
      "apiKeyRequired": false,
      "requestParameters": {},
      "requestTemplates": {
        "application/json": "$${defaultEndpoint}"
      },
      "responses": {
        "400": {
          "statusCode": "400"
        },
        "default": {
          "statusCode": "302",
          "responseParameters": {
            "method.response.header.Location": "integration.response.body.location"
          },
          "responseTemplates": {
            "application/json;charset=UTF-8": ""
          }
        }
      }
    }
```

### The new way:

It appears that there is no longer a `s-function.json` file in v1 of the Serverless framework.  Now we configure the response from the code directly.

```javascript
'use strict';

module.exports.redirect = (event, context, callback) => {
  const response = {
    statusCode: 301,
    headers: {
      Location: 'https://www.gorillastack.com',
    },
    body: '',
  };

  callback(null, response);
};

```

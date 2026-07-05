---
repo: markusklems/serverless-node-dynamodb-example
url: 'https://github.com/markusklems/serverless-node-dynamodb-example'
homepage: null
starredAt: '2016-05-04T02:52:09Z'
createdAt: '2016-03-18T22:54:43Z'
updatedAt: '2024-06-28T22:55:53Z'
language: JavaScript
license: Apache-2.0
branch: master
stars: 76
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:26.539Z'
description: Sample application that uses serverless + nodejs + dynamodb
tags: []
---

# Tutorial

This sample application / tutorial shows how to get started quickly with the Serverless Framework, AWS Lambda, AWS Gateway API, and DynamoDB.

##### Video

Take a look at my video for further info:

<a href="http://www.youtube.com/watch?feature=player_embedded&v=1lYNuR2LwMw" target="_blank"><img src="http://img.youtube.com/vi/1lYNuR2LwMw/0.jpg" 
alt="getting started with the serverless framework" width="240" height="180" border="10" /></a>

Prerequisites:
* AWS account [http://aws.amazon.com/](http://aws.amazon.com/)
* nodejs + npm [https://nodejs.org/en/download/](https://nodejs.org/en/download/)

Optional:
* Atom editor [https://atom.io/](https://atom.io/)
* Postman [https://www.getpostman.com/](https://www.getpostman.com/)

##### Step 1: Create an IAM admin user

Create an [IAM user](https://console.aws.amazon.com/iam) and download or copy the credentials (Access Key ID and Secret Access Key). Click on the newly created IAM user, click on the "Permissions" tab and on the "Attach Policy" button. Select "Administrator Access".

##### Step 2: Install the serverless framework and create a new project

* Install the serverless framework.
* Create a new serverless project and go through the steps of the command line wizard

Open your command line (shell, terminal) and type the following commands:

```
npm i serverless -g
sls help
sls project create
```

##### Step 3: Create a component and function

After you have created the project, `cd` into the project directory (e.g., `cd serverless-v1gaqr`) and type the following commands:

```
sls component create blog
sls function create blog/post
```

This will create a nodejs component with name `blog` and a function with name `post`.

##### Step 4: Install component dependencies

In this project, we want to access dynamodb and also need a way to generate uuids. Therefore type in your commandline:

```
cd blog
npm i --save dynamodb node-uuid
```

##### Step 5: Implement the lambda function

Open [blog/post/handler.js](../master/blog/post/handler.js) and enter the following code:

```javascript
'use strict';

var doc = require('dynamodb-doc');
var dynamo = new doc.DynamoDB();

// Require Serverless ENV vars
var ServerlessHelpers = require('serverless-helpers-js').loadEnv();

// Require Logic
var lib = require('../lib');

// Lambda Handler
module.exports.handler = function(event, context) {
  console.log('Received event:',JSON.stringify(event,null,2));
  console.log('Context:',JSON.stringify(context,null,2));

  var operation = event.operation;
  if(event.tableName) {
    event.payload.TableName = event.tableName;
  }

  switch(operation) {
    case 'create':
      var uuid = require('node-uuid');
      event.payload.Item.postId = uuid.v1();
      dynamo.putItem(event.payload,context.succeed({"postId":event.payload.Item.postId}));
      break;
    case 'read':
      dynamo.getItem(event.payload,context.done);
      break;
    case 'update':
      dynamo.updateItem(event.payload, context.done);
      break;
    case 'delete':
      dynamo.deleteItem(event.payload, context.done);
      break;
    case 'list':
        dynamo.scan(event.payload, context.done);
        break;
    default:
        context.fail(new Error('Unrecognized operation "' + operation + '"'));
  }

};
```

**Deploy the Lambda function:**

```
sls function deploy blog/post
```

##### Step 6: Define AWS API Gateway endpoints

We define API endpoints by
* Creating a template file `s-templates.json` that contains request and response mapping templates
* Completing the `s-function.json` file which contains some lambda function configurations and API endpoint configurations

Create [blog/post/s-templates.json](../master/blog/post/s-templates.json). Here is an excerpt:

```json
{
  "apiRequestPostReadTemplate": {
    "application/json" : {
      "operation": "read",
      "tableName": "blog-posts",
      "payload": {
        "Key": {
          "postId": "$input.params('postId')"
        }
      }
    }
  }
}
```

Complete [blog/post/s-function.json](../master/blog/post/s-function.json). Here is an excerpt:

```json
{
  "endpoints": [
    {
      "path": "post",
      "method": "GET",
      "type": "AWS",
      "authorizationType": "none",
      "apiKeyRequired": false,
      "requestParameters": {
        "integration.request.querystring.postId": "method.request.querystring.postId"
      },
      "requestTemplates": "$${apiRequestPostReadTemplate}",
      "responses": {
        "400": {
          "statusCode": "400"
        },
        "default": {
          "statusCode": "200",
          "responseParameters": {},
          "responseModels": {},
          "responseTemplates": {
            "application/json": "$${apiResponsePostReadTemplate}"
          }
        }
      }
    }
  ]
}
```

**Deploy the 5 endpoints:**

```
sls dash deploy
```

Select the 5 endpoints and hit "deploy".

##### Step 7: Create a DynamoDB table

Do the following:
* Create a new DynamoDB table
* Give your Lambda function's IAM role (which has been automatically created by serverless) access rights to the new DynamoDB table)

Open [https://console.aws.amazon.com/dynamodb](https://console.aws.amazon.com/dynamodb) and select the geographic region where your serverless project is deployed (e.g., us-east-1).

Create a new table with name `blog-posts` and with primary partition key `postId`, as stated in the [blog/post/s-templates.json](../master/blog/post/s-templates.json) template parameter "tableName". You might want to move the table name and key name to a variable in `_meta/variables/s-variables-dev.json` so you can distinguish between different DynamoDB tables for different stages of your application (dev, test, prod, ...).

You don't need to specify anything else on your DynamoDB table (except maybe for reducing provisioned capacity down to 1 from the default 5). The DynamoDB schema is flexible, so new columns will be created on-the-fly with the appropriate data type.

Now, you need to give your Lambda function permission to access the newly created DynamoDB table. Go to your [IAM dashboard](https://console.aws.amazon.com/iam/home?region=us-east-1#roles) (in this case in the us-east-1 region) and select the IAM role of your serverless project. Click on the "Create Role Policy" button and enter the following policy:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "dynamodb:*"
            ],
            "Resource": [
                "arn:aws:dynamodb:YOUR_REGION:YOUR_AWS_ACCOUNT_ID:table/blog-posts"
            ]
        }
    ]
}
```

Replace `YOUR_REGION` e.g. with `us-east-1` or wherever you have your dynamodb table and replace `YOUR_AWS_ACCOUNT_ID` with your aws account id (which you can find here: [https://console.aws.amazon.com/billing/home?#/account](https://console.aws.amazon.com/billing/home?#/account)).

##### Done

Woohoo, you made it! Sweet!

You can now test your serverless application, e.g., using [Postman](https://www.getpostman.com/). You can import Postman extensions from your AWS API Gateway dashboard: go to [https://console.aws.amazon.com/apigateway](https://console.aws.amazon.com/apigateway), click on "Stages" and select the "Export" tab.

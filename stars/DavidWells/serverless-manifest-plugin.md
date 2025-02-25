---
repo: DavidWells/serverless-manifest-plugin
url: 'https://github.com/DavidWells/serverless-manifest-plugin'
homepage: 'https://youtu.be/sq4rMN5fwUQ'
starredAt: '2021-05-13T21:25:42Z'
createdAt: '2018-11-06T01:47:30Z'
updatedAt: '2023-08-15T16:10:46Z'
language: JavaScript
license: MIT
branch: master
stars: 25
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:42.631Z'
description: 'Output manifest of endpoints, resources, outputs, etc. of a serverless service'
tags: []
---

# Serverless Manifest Plugin

Generate a list of API endpoints, function information & stack outputs to a service manifest file.

The manifest data can be quite useful for:

- [Consuming stack values & URLs in frontend applications](https://github.com/DavidWells/serverless-manifest-plugin-example)
- Automatic doc generation
- Saving / sharing values in AWS SSM
- Service discovery

After `serverless deploy` finishes, a `.serverless/manifest.json` file, is created.

## Usage

Add to plugins array in `serverless.yml`

```yml
service: my-example-service

plugins:
 - serverless-manifest-plugin
```

Then run `serverless manifest --help` to see all options.

### Options

You can set options via CLI flags or via the `custom` field in `serverless.yml`

```yml
# Custom settings for manifest plugin
custom:
  manifest:
    # Custom manifest output path. Default ./.serverless/manifest.json
    output: ./serverless.manifest.json
    # set to true to disable manifest file from being created
    disableOutput: false
    # Path to custom file with JS function for additional post processing
    postProcess: ./my-file-to-process-manifest-data.js
    # Set plugin log output to silent. Default false
    silent: false
    # Path to the function code. Default serverless.yml location (process.cwd())
    srcPath: ./dist

plugins:
 - serverless-manifest-plugin
```

### Programatic usage

Using the `json` flag will pipe the service manifest to `stdout`. You can use this with a tool like [`jq`](https://stedolan.github.io/jq/) to do something programatic with the data.

```
serverless manifest --json
```

Example:

```
serverless manifest --json | jq '.dev.functions'
# Outputs service function info
```

### Generating a manifest file

The plugin will automatically create the manifest when you run `serverless deploy`

You can also manually generate the manifest at anytime with

```
serverless manifest
```

Additionally `sls deploy --noDeploy` will also generate a manifest file.

## Example

Outputs `urls`, `functions`, `outputs` etc.

`.serverless/manifest.json`

```json
{
  "dev": {
    "urls": {
      "apiGateway": "https://abc1234.execute-api.us-east-1.amazonaws.com/dev",
      "apiGatewayBaseURL": "https://abc1234.execute-api.us-east-1.amazonaws.com/dev",
      "httpApi": "https://qwertyxyz.execute-api.us-east-1.amazonaws.com",
      "httpApiBaseURL": "https://qwertyxyz.execute-api.us-east-1.amazonaws.com",
      "byPath": {
        "/user/profile": {
          "url": "https://qwertyxyz.execute-api.us-east-1.amazonaws.com/user/profile",
          "methods": [
            "POST",
            "GET"
          ]
        },
        "/tester": {
          "url": "https://abc1234.execute-api.us-east-1.amazonaws.com/dev/tester",
          "methods": [
            "POST"
          ]
        },
        "/wow-cool": {
          "url": "https://abc1234.execute-api.us-east-1.amazonaws.com/dev/wow-cool",
          "methods": [
            "POST"
          ]
        }
      },
      "byFunction": {
        "getProfileInfo": {
          "url": "https://qwertyxyz.execute-api.us-east-1.amazonaws.com/user/profile",
          "methods": [
            "GET"
          ]
        },
        "createProfileInfo": {
          "url": "https://qwertyxyz.execute-api.us-east-1.amazonaws.com/user/profile",
          "methods": [
            "POST"
          ]
        },
        "other": {
          "url": "https://abc1234.execute-api.us-east-1.amazonaws.com/dev/tester",
          "methods": [
            "POST"
          ]
        },
        "forth": {
          "url": "https://abc1234.execute-api.us-east-1.amazonaws.com/dev/wow-cool",
          "methods": [
            "POST"
          ]
        }
      },
      "byMethod": {
        "GET": [
          "https://qwertyxyz.execute-api.us-east-1.amazonaws.com/user/profile"
        ],
        "POST": [
          "https://qwertyxyz.execute-api.us-east-1.amazonaws.com/user/profile",
          "https://abc1234.execute-api.us-east-1.amazonaws.com/dev/tester",
          "https://abc1234.execute-api.us-east-1.amazonaws.com/dev/wow-cool"
        ]
      }
    },
    "functions": {
      "getProfileInfo": {
        "name": "http-api-node-dev-getProfileInfo",
        "arn": "arn:aws:lambda:us-east-1:xxxxxxxxxxxx:function:http-api-node-dev-getProfileInfo:4",
        "runtime": "nodejs12.x",
        "triggers": [
          "httpApi"
        ],
        "dependancies": {
          "direct": [
            "faker@^4.1.0",
            "analytics@^0.3.4"
          ],
          "nested": [
            "analytics-utils@^0.2.0",
            "dlv@^1.1.3",
            "@analytics/storage-utils@^0.2.3",
            "@analytics/cookie-utils@^0.2.3"
          ]
        }
      },
      "createProfileInfo": {
        "name": "http-api-node-dev-createProfileInfo",
        "arn": "arn:aws:lambda:us-east-1:xxxxxxxxxxxx:function:http-api-node-dev-createProfileInfo:4",
        "runtime": "nodejs12.x",
        "triggers": [
          "httpApi"
        ],
        "dependancies": {
          "direct": [
            "faker@^4.1.0",
            "analytics@^0.3.4"
          ],
          "nested": [
            "analytics-utils@^0.2.0",
            "dlv@^1.1.3",
            "@analytics/storage-utils@^0.2.3",
            "@analytics/cookie-utils@^0.2.3"
          ]
        }
      },
      "other": {
        "name": "http-api-node-dev-other",
        "arn": "arn:aws:lambda:us-east-1:xxxxxxxxxxxx:function:http-api-node-dev-other:3",
        "runtime": "nodejs12.x",
        "triggers": [
          "http"
        ],
        "dependancies": {
          "direct": [
            "faker@^4.1.0"
          ],
          "nested": []
        }
      },
      "forth": {
        "name": "http-api-node-dev-forth",
        "arn": "arn:aws:lambda:us-east-1:xxxxxxxxxxxx:function:http-api-node-dev-forth:2",
        "runtime": "nodejs12.x",
        "triggers": [
          "http"
        ],
        "dependancies": {
          "direct": [
            "lodash@4.17.15"
          ],
          "nested": []
        }
      }
    },
    "outputs": [
      {
        "OutputKey": "OtherLambdaFunctionQualifiedArn",
        "OutputValue": "arn:aws:lambda:us-east-1:xxxxxxxxxxxx:function:http-api-node-dev-other:3",
        "Description": "Current Lambda function version"
      },
      {
        "OutputKey": "GetProfileInfoLambdaFunctionQualifiedArn",
        "OutputValue": "arn:aws:lambda:us-east-1:xxxxxxxxxxxx:function:http-api-node-dev-getProfileInfo:4",
        "Description": "Current Lambda function version"
      },
      {
        "OutputKey": "ForthLambdaFunctionQualifiedArn",
        "OutputValue": "arn:aws:lambda:us-east-1:xxxxxxxxxxxx:function:http-api-node-dev-forth:2",
        "Description": "Current Lambda function version"
      },
      {
        "OutputKey": "ServiceEndpoint",
        "OutputValue": "https://abc1234.execute-api.us-east-1.amazonaws.com/dev",
        "Description": "URL of the service endpoint"
      },
      {
        "OutputKey": "ServerlessDeploymentBucketName",
        "OutputValue": "http-api-node-dev-serverlessdeploymentbucket-12eu0mj9zoo0s"
      },
      {
        "OutputKey": "CreateProfileInfoLambdaFunctionQualifiedArn",
        "OutputValue": "arn:aws:lambda:us-east-1:xxxxxxxxxxxx:function:http-api-node-dev-createProfileInfo:4",
        "Description": "Current Lambda function version"
      },
      {
        "OutputKey": "HttpApiUrl",
        "OutputValue": "https://qwertyxyz.execute-api.us-east-1.amazonaws.com",
        "Description": "URL of the HTTP API"
      }
    ]
  }
}
```

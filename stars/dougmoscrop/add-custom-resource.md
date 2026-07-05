---
repo: dougmoscrop/add-custom-resource
url: 'https://github.com/dougmoscrop/add-custom-resource'
homepage: null
starredAt: '2018-11-15T23:49:23Z'
createdAt: '2017-08-05T01:13:35Z'
updatedAt: '2022-12-14T22:43:49Z'
language: JavaScript
license: NA
branch: master
stars: 7
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:04.048Z'
description: null
tags: []
---

# add-custom-resource

This is a library meant to be used in a Serverless plugin, when you need to add a custom resource. This allows you to execute arbitrary code within CloudFormation as part of deployment, allowing you do things like call the aws-sdk in cases where CloudFormation does not support the feature you need to deploy/configure.

## 5.0.0

Major version bump due to updated runtime.

## Usage

> my-plugin.js

```js
const addCustomResource = require('add-custom-resource');

class MyPlugin {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;
    this.hooks = {
      'before:package': () => this.doStuff()
    };
  }

  doStuff() {
    const template = this.serverless.service.provider.compiledCloudFormationTemplate;

    return addCustomResource(template, {
      name: 'MyResource',
      sourceCodePath: path.join(__dirname, 'my-source-code.js')
    });
  }
}
```

This will add four resources to your CloudFormation template:

- A `Lambda::Function` (with `my-source-code.js` inlined)
- An `IAM::Role` (for the Lambda functions permissions)
- A `Logs::LogGroup` (for any logs related to the Lambda function running)
- A `Custom::` resource (which is backed by your Lambda function)

You source code can use the aws-sdk and the cf-response library, which are built in to Lambda. Other dependencies are not supported.

> my-source-code.js

```js
const aws = require('aws-sdk');
const response = require('cfn-response');

const s3 = new aws.S3();

module.exports.handler = function(event, context) {
  Promise.resolve()
   .then(() => {
     switch (event.RequestType) {
       case 'Create':
       case 'Update':
        return s3.doSomething().promise();
      case 'Delete':
        return s3.doSomethingElse().promise();
      default:
        return Promise.resolve('no action matched');
      }
   })
   .then(() => {
     response.send(event, context, response.SUCCESS, {});
   })
   .catch(() => {
     response.send(event, context, response.FAILED, {});
   });
};
```

## Function Reuse

If you configure a `resourceName` in addition to `name`, then multiple resources can be created while re-using the same function.

For example:

```js
await addCustomResource(template, {
  name: 'CustomThing',
  resourceName: 'CustomThingFoo'
  sourceCodePath: path.join(__dirname, 'my-source-code.js')
});

await addCustomResource(template, {
  name: 'CustomThing',
  resourceName: 'CustomThingBar'
  sourceCodePath: path.join(__dirname, 'my-source-code.js')
});
```

This will only add the function, log group and role for `CustomThing` _once_, while creating two separate custom resources: `CustomThingFoo` and `CustomThingBar`, each backed by the same Lambda function (`CustomThingFunction`);

## Custom Role

You can specify a `roleArn` and this library will not create a role.

## Dependencies

As of `3.0.0`, you can include dependencies in your Lambda resource and this library will use Rollup to bundle them.

## Return Value

The promise returned by `addCustomResource` will resolve to the logicalId that the resource was added under.

```js
const logicalId = await addCustomResource(...);

// you can use this elsewhere in your template, Fn::GetAtt: [logicalId, ... ]
```

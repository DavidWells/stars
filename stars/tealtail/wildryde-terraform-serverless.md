---
repo: tealtail/wildryde-terraform-serverless
url: 'https://github.com/tealtail/wildryde-terraform-serverless'
homepage: null
starredAt: '2019-03-06T06:39:29Z'
createdAt: '2018-01-16T18:42:31Z'
updatedAt: '2020-08-31T21:54:37Z'
language: HCL
license: NA
branch: master
stars: 12
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:43.727Z'
description: >-
  An experiment in using terraform and serverless in a single project. Based on
  AWS Labs Serverless Workshop
tags: []
---

# WildRydes Terraform/Serverless Framework

This project uses terraform and serverless to create AWSLabs' WildRydes tutorial project: https://github.com/awslabs/aws-serverless-workshops/tree/master/WebApplication

To follow along you will need AWS CLI, Terraform and Serverless Framework installed and configured.

```sh
npm install -g serverless
brew update && brew install awscli terraform

aws configure
```

## Deploying

### Terraform

from the `terraform` directory:

```sh
terraform init
terraform plan
# confirm all is well, correct aws account etc.
terraform apply
```

  Terraform will use Amazon as your [provider](https://www.terraform.io/docs/providers/) to setup resources on your behalf. Wild Ride will setup two [resources](https://www.terraform.io/docs/providers/aws/index.html) on our behalf, Amazon Cognito and Amazon Simple Storage Service (S3). 
  
  Terraform uses the `cognito-user-pool` module to manage our user membership and identities through [AWS Cognito](https://aws.amazon.com/cognito/).

Terraform uses the `s3-static-host` module to create an S3 bucket for static site hosting and populates it with files for the project application.

Use` terraform plan` to test and preview what kind of actions terraform will take as dry-run. If all the described changes are correct and AWS is configured correctly run `terraform apply`. The output from a successful `terraform apply` will include some important identifiers for the resources created and the URL to visit our new web application. 

You might notice a new file in the `serverless/` directory now. A part of the terraform provisioning will automate the creation and population of an `serverless/.env.json` file necessary for passing the created AWS cognito pool ARN over to `serverless/serverless.yml`, where it's used as an authorizer for our API method.

### Serverless Framework

from the `serverless` directory:

```sh
sls deploy
```

Serverless Framework will have now deployed our DynamoDB table, API, and Lambda function.

## Updating Application config.js

Create a new file anywhere (locally) called `config.js` and paste this js snippet in.

```js
window._config = {
  api: {
    invokeUrl: '' // e.g. https://rc7nyt4tql.execute-api.us-west-2.amazonaws.com/prod',
  },
  cognito: {
    userPoolId: '', // e.g. us-east-2_uXboG5pAb
    userPoolClientId: '', // e.g. 25ddkmj4v6hfsfvruhpfi7n4hv
    region: '' // e.g. us-east-2
  }
};
```

Fill in the values from output seen post-deploy. `invokeUrl` will come from `sls deploy` output as the **base url** for the "requestUnicorn" endpoint.



example:
endpoints:
`POST - https://9ndfz9bgce.execute-api.us-east-1.amazonaws.com/dev/ride` would make my invokeUrl `https://9ndfz9bgce.execute-api.us-east-1.amazonaws.com/dev`


Using the command `terraform output` in the `terraform` directory, you will be able to get the appropriate cognito credentials to fill out the `cognito` object.


## Upload config to S3

The bucket's name will have been in the terraform output

```sh
aws s3 cp config.js s3://BUCKET_NAME/js/config.js
```

## Teardown

```sh
# within serverless/ dir
sls remove

# within terraform/ dir
terraform destroy
```

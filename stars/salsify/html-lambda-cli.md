---
repo: salsify/html-lambda-cli
url: 'https://github.com/salsify/html-lambda-cli'
homepage: null
starredAt: '2016-08-22T23:24:16Z'
createdAt: '2016-06-08T12:49:40Z'
updatedAt: '2016-08-22T23:24:16Z'
language: JavaScript
license: NA
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:19.998Z'
description: Command line interface for creating HTML lambda's
tags: []
---

# html-**λ**-cli

A simple command line interface for [html-lambda-runner](https://github.com/salsify/html-lambda-runner).

While Amazon's Lambda functions aren't hard to make, making lot's of them is a time consuming task, especially if you're only making lots of single page serving functions. html-lambda-cli provides a convenient and clean interface to rapidly build and deploy new HTML generating Lambda functions using our [html-lambda-runner](https://github.com/salsify/html-lambda-runner) module. With a bit of setup and a few lines of code, you'll have a Lambda up and running in no time.

**To Install**

```npm install -g html-lambda-cli```

**Usage**

`init` - Create the files needed for a new Lambda project in the current directory.

`build` - Build the project source and bundle it into a zip file in the dist folder.

`serve` - Preview the current Lambda by running a local server on `:3000`. Changes will be automatically built and get parameters will be passed.

`deploy` - Runs `build` and then uploads the result to Amazon.

**Make a Lambda**

Most of the work you'll need to do for each function is merely setup on Amazon's end. While it looks like a lot, it's not a hard procedure. This assumes you've setup your local AWS credentials, if you haven't yet, skip to the section below.

1. Create a new folder for your project
1. Run `html-lambda init` to create the needed files.
1. Head over to the AWS console and open up Lambda.
1. Click 'Create a Lambda function'.
1. Click 'Skip' when asked to use a template.
1. Give your function a name, description and leave the 'Runtime' set as `Node.js (4.x)`.
1. In the 'Edit code inline' area, put something simple for now. Something like `console.log('hello')` will do.
1. Leave 'Handler' as is and select `lambda_basic_execution` as the Lambda role.
1. Configure anything else if needed, then click 'Next' and 'Create'.
1. Click on the 'API endpoints tab' and the 'Add API endpoint'.
1. Select 'API Gateway' as the type and configure other properties as desired, setting 'Resource name' to `/`, 'Method' to `GET` 'Security' to `Open`.
1. Head over to 'API Gateway' and pull up the API under your Lambda's name.
1. Under 'Method Request' > 'URL Query String Parameters' add `accessKey`.
1. Under 'Integration Request' add a new 'Content-Type' set to `application/json`. The template below only passes the `accessKey`. You can add other query parameters here as well. Click 'Save' when done.

  ```
  {
	    "accessKey ": "$input.params('accessKey')"
  }
  ```
1. Under 'Method Response' add a new item under 'Response Headers for 200' with a value of `Content-Type`.
1. Under 'Integration Response' > 'Header Mappings', set `Content-Type` to `'text/html'`
1. Add a new 'Content-Type' under 'Body Mapping Templates' with the value `text/html` and a template of `$input.path('$')`.
1. Finally, click the 'Actions' button in the top left and select 'Deploy API'.
1. Choose the development stage you selected earlier and click 'Deploy'.
1. On the main services tab, select IAM and then in the left sidebar, choose 'Encryption Keys'.
1. Create a new key and add yourself as a key administrator.
1. Add `lambda_basic_execution` for IAM roles that can decrypt and encrypt with the key. Complete key creation.
1. View the newly created key and copy the ARN.
1. Paste the ARN into the `lambdaKmsArn` of `aws-config.json`. Fill in the other Lambda fields as well.
1. In `config.json` set a secret key (used for simple authentication via GET over HTTPS).
1. Finally, run `html-lambda deploy`.
1. Visit your API endpoint with the proper `accessKey` attached, and your Lambda should present your page!

**AWS Credentials**

Create the file `~/.aws/credentials`. The file should look like:

```
[default]
aws_access_key_id = <your key>
aws_secret_access_key = <your access key>
```

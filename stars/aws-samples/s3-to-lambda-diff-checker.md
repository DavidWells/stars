---
repo: aws-samples/s3-to-lambda-diff-checker
url: 'https://github.com/aws-samples/s3-to-lambda-diff-checker'
homepage: 'https://serverlessland.com'
starredAt: '2021-10-25T17:20:27Z'
createdAt: '2021-07-05T13:14:31Z'
updatedAt: '2024-05-20T22:25:09Z'
language: JavaScript
license: MIT-0
branch: main
stars: 12
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:41.754Z'
description: S3 to Lambda diff checker. Questions? Contact @jbesw.
tags:
  - aws
  - lambda
  - nodejs
  - s3
  - serverless
---

# Amazon S3 diff checker

The AWS SAM template deploys an AWS Lambda function and an Amazon S3 bucket with versioning enabled. The Lambda function is invoked when new objects are put into the bucket.

When versions of an object are uploaded, it logs out the difference between the latest version and the previous version. Using a configurable setting in template.yaml, it also deletes earlier versions of the object, retaining the most recent versions.

Important: this application uses various AWS services and there are costs associated with these services after the Free Tier usage - please see the [AWS Pricing page](https://aws.amazon.com/pricing/) for details. You are responsible for any AWS costs incurred. No warranty is implied in this example.

To learn more about how this application works, see the article on the AWS Compute Blog: https://aws.amazon.com/blogs/compute/building-a-difference-checker-with-amazon-s3-and-aws-lambda/.

```bash
.
├── README.MD                   <-- This instructions file
├── src                         <-- Source code for a lambda function
│   └── app.js                  <-- Main Lambda handler
│   └── processS3.js            <-- Processes each S3 object
│   └── deleteS3.js             <-- Removes earlier versions of an object
│   └── compareS3.js            <-- Compares most recent two versions
├── template.yaml               <-- SAM template
```

## Requirements

* [Create an AWS account](https://portal.aws.amazon.com/gp/aws/developer/registration/index.html) if you do not already have one and log in. The IAM user that you use must have sufficient permissions to make necessary AWS service calls and manage AWS resources.
* [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) installed and configured
* [Git Installed](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* [AWS Serverless Application Model](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html) (AWS SAM) installed

## Deployment Instructions

1. Create a new directory, navigate to that directory in a terminal and clone the GitHub repository:
    ``` 
    git clone https://github.com/aws-samples/s3-diff-checker
    ```
1. From the command line, use AWS SAM to deploy the AWS resources for the pattern as specified in the template.yml file:
    ```
    sam build
    sam deploy --guided
    ```
1. During the prompts:
    * Enter unique S3 bucket name
    * Enter the desired AWS Region
    * Allow SAM CLI to create IAM roles with the required permissions.

    Once you have run `sam deploy -guided` mode once and saved arguments to a configuration file (samconfig.toml), you can use `sam deploy` in future to use these defaults.
  
### Testing

1. Upload a TXT file the source S3 bucket.
2. Make a change and upload again.
3. Repeat this process, and note the output for the Lambda function, which logs out the differences in the versions and also deletes earlier versions of the object.

## Cleanup
 
1. Delete the stack
    ```bash
    aws cloudformation delete-stack --stack-name STACK_NAME
    ```
1. Confirm the stack has been deleted
    ```bash
    aws cloudformation list-stacks --query "StackSummaries[?contains(StackName,'STACK_NAME')].StackStatus"
    ```

### Questions

Please contact the author or raise an issue on this GitHub repo if you have questions.

----
Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.

SPDX-License-Identifier: MIT-0

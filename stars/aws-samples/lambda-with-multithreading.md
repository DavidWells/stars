---
repo: aws-samples/lambda-with-multithreading
url: 'https://github.com/aws-samples/lambda-with-multithreading'
homepage: null
starredAt: '2024-09-09T17:35:12Z'
createdAt: '2024-06-24T23:26:26Z'
updatedAt: '2024-09-09T17:35:13Z'
language: JavaScript
license: MIT-0
branch: main
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:22.303Z'
description: null
tags: []
---

## Implementing parallel data processing within AWS Lambda execution environment

This sample project illustrates parallelization techniques described in [this blog](link). 

Programming languages offer diverse techniques and terminology for parallel processing. Java employs multi-threading and thread pools. Node.js, though single-threaded, provides event loop and promises (for async programming), as well as worker threads (for actual multi-threading). Python supports both multi-threading (subject to Global Interpreter Lock) and multi-processing. Concurrent routines are another technique gaining attention in the industry.

This sample is provided for illustration purposes only and uses a language-agnostic term “worker” to denote a unit of parallel processing. Your specific parallelization implementation depends on your choice of runtime language and frameworks. We highly recommend you use battle-tested frameworks like [Powertools for AWS Lambda](https://docs.powertools.aws.dev/lambda/python/latest/) that implement [batch processing parallelization](https://docs.powertools.aws.dev/lambda/python/latest/utilities/batch/#processing-messages-asynchronously) when possible. Regardless of the programming language, it is crucial to ensure all background threads/workers/promises/routines/tasks spawned by the function handler are completed within the same invocation before the handler returns.

### Requirements

* [Create an AWS account](https://portal.aws.amazon.com/gp/aws/developer/registration/index.html) if you do not already have one and log in. The IAM user that you use must have sufficient permissions to make necessary AWS service calls and manage AWS resources.
* [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) installed and configured
* [Git Installed](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* [AWS Cloud Development Kit](https://aws.amazon.com/cdk/) (AWS CDK) installed

## Deployment Instructions

1. Create a new directory, navigate to that directory in a terminal and clone the GitHub repository:
    ``` 
    git clone https://github.com/aws-samples/lambda-with-multithreading
    ```
1. Change directory to the pattern directory:
    ```
    cd lambda-with-multithreading
    ```
2. From the command line, use AWS CDK to deploy the AWS resources for the pattern:
    ```
    cdk deploy
    ```
3. Wait for CDK to complete the deployment.

> Resources created as part of this sample deployment can have associated costs. 

## Cleanup
 
Delete the stack

```bash
cdk destroy
```

## License

This library is licensed under the MIT-0 License. See the LICENSE file.


---
repo: rosberglinhares/CloudFormationCognitoCustomResources
url: 'https://github.com/rosberglinhares/CloudFormationCognitoCustomResources'
homepage: ''
starredAt: '2019-03-05T02:51:34Z'
createdAt: '2018-06-21T22:43:53Z'
updatedAt: '2022-10-12T13:29:53Z'
language: JavaScript
license: MIT
branch: master
stars: 108
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:44.321Z'
description: >-
  CognitoUserPoolClientSettings and CognitoUserPoolDomain custom resources for
  AWS CloudFormation.
tags: []
---

# Setting up *Cognito* *App client settings* and *Domain name* with AWS CloudFormation

## Deploy steps

1. Install the AWS Command Line Interface. More information at https://aws.amazon.com/cli/.

2. Open your command shell and navigate to the directory containing the *SampleInfrastructure.template.yaml* file.

3. If you don't have any AWS S3 bucket available, you have to create one running the following command:

    ```bash
    aws s3 mb s3://<YOUR BUCKET NAME>
    ```
    
    Observe that the bucket name must be unique across all existing bucket names in Amazon S3 and must not contain uppercase or space characters.

4. Run the following command to package the local artifacts that the AWS CloudFormation template references:

    ```bash
    aws cloudformation package --template-file SampleInfrastructure.template.yaml --s3-bucket <YOUR BUCKET NAME> --output-template-file SampleInfrastructure.package.yaml
    ```
    
5. Finally, execute the deploy of your stack:

    ```bash
    aws cloudformation deploy --template-file SampleInfrastructure.package.yaml --stack-name <YOUR STACK NAME> --capabilities CAPABILITY_NAMED_IAM
    ```
    
    Replace the `<YOUR STACK NAME>` expression with your desired stack name.

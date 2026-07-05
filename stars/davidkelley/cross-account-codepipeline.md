---
repo: davidkelley/cross-account-codepipeline
url: 'https://github.com/davidkelley/cross-account-codepipeline'
homepage: null
starredAt: '2019-02-18T18:37:24Z'
createdAt: '2019-02-18T09:31:43Z'
updatedAt: '2023-03-05T02:42:07Z'
language: null
license: Apache-2.0
branch: master
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:45.046Z'
description: A CloudFormation template enabling cross-account CodePipeline deployments
tags: []
---

# Cross Account CodePipeline

The AWS CloudFormation template in this repository can be deployed in both a _"Deployer"_ account (as depicted below) and any number of _"Target"_ accounts. It provides a number of cross-account CloudFormation, CodePipeline and CodeBuild IAM roles, which can be assumed from the deployer account; in addition to an Artifact bucket and KMS key which are ready to be configured with CodePipeline.

![Diagram](.github/images/diagram.png "Cross-Account CodePipeline Diagram")

Cross-account CodePipeline artifacts also have their ACL modified by a Lambda function to ensure the deployer account can access them in subsequent actions within the pipeline. For example, this would allow you to use the outputs of one CloudFormation deployment in one target account, as the parameters in another deployment in a separate account.

This template also creates a CloudFormation macro (as demonstrated in the example template) to enable you to alias accounts with the target IAM role arns; enabling templates to refer to target accounts by alias, as opposed to using hardcoded account IDs. Configuring aliases and the macro is documented below.

Wherever possible, roles and policies are locked down to ensure that objects are secured and encrypted providing only access to required resources. _Therefore, depending on your use case, you may discover that the deployed CloudFormation execution role has insufficient permissions, so you will need to update these as necessary._

## Getting Started

_Clone this repository._ Before doing anything else, create an `aliases.json` file, which contains a map between logical account names, such as "Dev", "Staging" and "Production", with the associated AWS Account IDs, as described in the example below.

```json
{
  "Development": "999789015432",
  "Staging": "999465729483",
  "Production": "999968243760"
}
```

> These aliases are used within a [CloudFormation Macro](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-macros.html), to help generate IAM Role Arns to the aliases mapped within the file. They also help you to easily identify which account an action is being performed on within the pipeline. Usage of this macro is demonstrated within the provided examples.

Once you've created the aliases you wish to use, the content will be used within the `AccountAliasesJSON` parameter when deploying the CloudFormation template. 

At this point, if you're happy using the provided defaults, you're ready to deploy the template. **You will need to repeat the command for every account you wish to enable cross-account deployments on**, this includes the deployer account. Try executing the following command:

```shell
aws cloudformation deploy \
  --template-file template.yml \
  --stack-name cross-account-codepipeline \
  --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_NAMED_IAM \
  --parameter-overrides \
      DeployerAccountId="675847109412" \
      TargetAccountIds="999789015432,999465729483,999968243760" \
      AccountAliasesJSON="`cat aliases.json | tr -d '\n'`"
```

| Parameter | Description |
|:-----|:-------|
| `DeployerAccountId` **(Required)**             | The AWS Account ID which will contain CodePipelines. |
| `TargetAccountIds` **(Required)**              | A comma-delimited list of AWS Account IDs which will receive deployments. |
| `AccountAliasesJSON` **(Required)**            | A valid JSON strucutre containing target account IDs and their human-readable aliases. |
| `ArtifactsBucketName` (Optional)               | The name (suffix) of the S3 bucket which will contain CodePipeline artifacts. |
| `CloudFormationExecutionRoleName` (Optional)   | The name of the IAM Role used to execute CloudFormation deployments. |
| `CodePipelineExecutionRoleName` (Optional)     | Name of the IAM Role used to execute CodePipeline deployments. |
| `LambdaACLExecutionRoleName` (Optional)        | Name of the Lambbda ACL Execution role name used to update artifact ACLs from target accounts. |

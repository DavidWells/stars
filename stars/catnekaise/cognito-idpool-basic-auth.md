---
repo: catnekaise/cognito-idpool-basic-auth
url: 'https://github.com/catnekaise/cognito-idpool-basic-auth'
homepage: 'https://catnekaise.github.io'
starredAt: '2023-10-25T14:06:38Z'
createdAt: '2023-10-24T07:04:22Z'
updatedAt: '2024-08-19T11:55:14Z'
language: null
license: MIT
branch: alpha
stars: 5
isPublic: true
isTemplate: true
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:46.090Z'
description: >-
  Authenticate with Amazon Cognito Identity from GitHub Actions using the Basic
  AuthFlow.
tags:
  - action
  - authentication
  - aws
---

# cognito-idpool-basic-auth
Use this action to perform authentication with an Amazon Cognito Identity Pool using the GitHub Actions OIDC access token.

This action is when using [Basic (Classic) AuthFlow](https://catnekaise.github.io/github-actions-abac-aws/detailed-explanation#authentication-flows). A different action for [Enhanced (Simplified) AuthFlow](https://catnekaise.github.io/github-actions-abac-aws/detailed-explanation#authentication-flows) is available [here](https://github.com/catnekaise/cognito-idpool-auth).

### Use as Template
This repository is available as a template repository.

## Alpha Status
At the time writing (October 2023) this action has not been tested or reviewed by anyone other than the author, hence the alpha status. If using this action, please provide feedback.

## Usage

```yaml
on:
  workflow_dispatch:
jobs:
  job1:
    runs-on: ubuntu-latest
    permissions:
      id-token: write
    steps:
      - name: "Authenticate using Basic AuthFlow"
        uses: catnekaise/cognito-idpool-basic-auth@alpha
        with:
          cognito-identity-pool-id: "eu-west-1:11111111-example"
          aws-account-id: "111111111111"
          aws-region: "eu-west-1"
          audience: "cognito-identity.amazonaws.com" # Same value as default
          role-arn: "arn:aws:iam::111111111111:role/cognito-gha"
          set-in-environment: true
          
      - name: "STS Get Caller Identity"
        run: |
          aws sts get-caller-identity
```

### Input Parameters

- Only `cognito-identity-pool-id` is a required input to the action. 
- `aws-account-id` and `aws-region` are required, but values can optionally be derived from environment variables, if this behaviour is wanted.
- Input to action via parameters will supersede environment variables for `aws-account-id` and `aws-region`.
  - **Env Var 1** supersedes **Env Var 2**.

| Input Parameter Name     | Default value                  | Example                             | Env Var 1                 | Env Var 2          |
|--------------------------|--------------------------------|-------------------------------------|---------------------------|--------------------|
| cognito-identity-pool-id | -                              | eu-west-1:11111111-example          | -                         | -                  |
| aws-account-id           | -                              | 1111111111111                       | CK_COGNITO_AWS_ACCOUNT_ID | AWS_ACCOUNT_ID     |
| aws-region               | -                              | eu-west-1                           | CK_COGNITO_AWS_REGION     | AWS_DEFAULT_REGION |
| audience                 | cognito-identity.amazonaws.com | cognito-identity.amazonaws.com      | -                         | -                  |
| role-arn                 | -                              | arn:aws:iam::111111111111:role/role | -                         | -                  |
| role-duration-seconds    | 3600                           | 1500                                | -                         | -                  |
| role-session-name        | GitHubActions                  | MySessionName                       | -                         | -                  |
| set-as-profile           | -                              | cache                               | -                         | -                  |
| set-in-environment       | -                              | true                                | -                         | -                  |

### Outputs

| Parameter                          |
|------------------------------------|
| aws_access_key_id                  |
| aws_secret_access_key              |
| aws_session_token                  |
| aws_region                         |
| cognito_identity_oidc_access_token |


### Env Vars Example

```yaml
on:
  workflow_dispatch:
env:
  CK_COGNITO_AWS_ACCOUNT_ID: "${{ vars.CK_COGNITO_AWS_ACCOUNT_ID }}"
  AWS_DEFAULT_REGION: "us-east-1"
jobs:
  job1:
    runs-on: ubuntu-latest
    permissions:
      id-token: write
    steps:
      - name: "Authenticate using Basic AuthFlow"
        uses: catnekaise/cognito-idpool-basic-auth@alpha
        with:
          cognito-identity-pool-id: "eu-west-1:11111111-example"
          role-arn: "arn:aws:iam::111111111111:role/cognito-gha"
          set-in-environment: true
          aws-region: "eu-west-1" # Overrides AWS_DEFAULT_REGION

      - name: "STS Get Caller Identity"
        run: |
          aws sts get-caller-identity
```

### Handling Credentials
In order for credentials to exist, `role-arn` has to be set and successful authentication must have completed. If not setting `role-arn`, `cognito_identity_oidc_access_token` is available.

- Credentials are always available as output parameters from the action, as long as `role-arn` was set.
- Set input option `set-in-environment` to `true` and standard AWS environment variables will be set.
- Provide a profile name in input option `set-as-profile` to set credentials as a profile.
- Setting `set-in-environment` to `true`, and setting a value in `set-as-profile` will both set environment variables and the profile.
- When neither `set-in-environment` nor `set-as-profile` is provided, credentials are only available as outputs.

```yaml
on:
  workflow_dispatch:
env:
  CK_COGNITO_AWS_ACCOUNT_ID: "${{ vars.CK_COGNITO_AWS_ACCOUNT_ID }}"
  AWS_DEFAULT_REGION: "eu-west-1"
jobs:
  job1:
    runs-on: ubuntu-latest
    permissions:
      id-token: write
    steps:
      - id: aws-credentials
        name: "Credentials as output only"
        uses: catnekaise/cognito-idpool-basic-auth@alpha
        with:
          cognito-identity-pool-id: "eu-west-1:11111111-example"
          role-arn: "arn:aws:iam::111111111111:role/cognito-gha"
        
      - name: "Credentials in environment"
        uses: catnekaise/cognito-idpool-basic-auth@alpha
        with:
          cognito-identity-pool-id: "eu-west-1:11111111-example"
          role-arn: "arn:aws:iam::111111111111:role/cognito-gha"
          set-in-environment: true
          
      - name: "Credentials in profile: tf-state"
        uses: catnekaise/cognito-idpool-basic-auth@alpha
        with:
          set-as-profile: "tf-state"
          role-arn: "arn:aws:iam::111111111111:role/cognito-gha"
          cognito-identity-pool-id: "${{ vars.TF_STATE_COGNITO_IDENTITY_POOL_ID }}"
          
      - name: "Credentials in profile: cache"
        uses: catnekaise/cognito-idpool-basic-auth@alpha
        with:
          set-as-profile: "cache"
          role-arn: "arn:aws:iam::111111111111:role/cognito-gha"
          cognito-identity-pool-id: "${{ vars.CACHE_COGNITO_IDENTITY_POOL_ID }}"
          
      - name: STS Get Caller Identity
        run: |
          aws sts get-caller-identity
          aws sts get-caller-identity --profile tf-state
          aws sts get-caller-identity --profile cache

      - name: "STS Get Caller Identity"
        env:
          AWS_ACCESS_KEY_ID: "${{ steps.aws-credentials.outputs.aws_access_key_id }}"
          AWS_SECRET_ACCESS_KEY: "${{ steps.aws-credentials.outputs.aws_secret_access_key }}"
          AWS_SESSION_TOKEN: "${{ steps.aws-credentials.outputs.aws_session_token }}"
        run: |
          aws sts get-caller-identity
```

### Without providing role
When `role-arn` is not set, output `cognito_identity_oidc_access_token` is available. It can then be used to assume role inside the workflow.

```yaml
on:
  workflow_dispatch:
jobs:
  job1:
    runs-on: ubuntu-latest
    permissions:
      id-token: write
    steps:
      - id: oidc_token
        name: "Get Cognito OIDC Access Token"
        uses: catnekaise/cognito-idpool-basic-auth@alpha
        with:
         cognito-identity-pool-id: "${{ vars.COGNITO_IDENTITY_POOL_ID }}"
         aws-region: "eu-west-1"
         aws-account-id: "111111111111"
         
      - name: "Assume Role"
        env:
          OIDC_TOKEN: "${{ steps.oidc_token.outputs.cognito_identity_oidc_access_token }}"
          AWS_DEFAULT_REGION: "eu-west-1"
        run: |
          awsCredentials=$(aws sts assume-role-with-web-identity \
          --role-session-name "MySessionName" \
          --role-arn "arn:aws:iam::111111111111:role/cognito-gha" \
          --duration-seconds 3600 \
          --web-identity-token "$OIDC_TOKEN")
  
          awsAccessKeyId=$(echo "$awsCredentials" | jq -r ".Credentials.AccessKeyId")
          awsSecretAccessKey=$(echo "$awsCredentials" | jq -r ".Credentials.SecretAccessKey")
          awsSessionToken=$(echo "$awsCredentials" | jq -r ".Credentials.SessionToken")
  
          echo "::add-mask::$awsAccessKeyId"
          echo "::add-mask::$awsSecretAccessKey"
          echo "::add-mask::$awsSessionToken"
```

## Action Goals
Provide the bare minimum implementation for performing `Basic (Classic) AuthFlow` with Cognito Identity, and remain simple/static enough to be used as a template for creating an internal action for the same purpose.

---
repo: bboure/aws-account-vending-machine-demo
url: 'https://github.com/bboure/aws-account-vending-machine-demo'
homepage: null
starredAt: '2025-01-16T21:33:53Z'
createdAt: '2025-01-04T19:41:59Z'
updatedAt: '2025-02-21T02:53:59Z'
language: TypeScript
license: NA
branch: main
stars: 16
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:13.860Z'
description: null
tags: []
---

This project demoes a quick proof of concept of an AWS account vending machine for sandbox accounts that I presented on my blog https://benoitboure.com/i-built-a-serverless-ephemeral-aws-account-vending-machine

# Setup

If you want to deploy this project in your account, there are a few things to setup in advance.

## Requirements

- Have an AWS organization and a management account
- Have AWS SSO configured
- An Organization account where to deploy the project
- AWS CLI
- Docker installed and running

## Configuration

1. Create an custom [IAM Identity Center Application](https://us-east-1.console.aws.amazon.com/singlesignon/applications/home?region=us-east-1#/instances/72233c91b7a38b50)

- Chose "I have an application I want to set up" and SAML 2.0 as the application type
- Copy the "IAM Identity Center SAML metadata file" url, and keep it somewhere.
- Keep the tab open, or click "cancel", we'll come here late.

2. If you don't already have one, create a permission set with the `AdministratorAccess` managed policy. Name it `AdministratorAccess`.

3. Copy the permission set ARN. e.g. `arn:aws:sso:::permissionSet/ssoins-1234567890/ps-99999999999999`
4. Copy the `Managing instance` id in IAM Identity Center. e.g. `ssoins-1234567890`
5. In `packages/backend/stack/bin/aws-account-vending-machine.ts`, enter the following values:

- `managementAccount`
  - The `accountId` and `region` of the AWS organization management account
  - `instanceArn`: `arn:aws:sso:::instance/{managementInstanceId}` where `managementInstanceId` is the instance id copied above
  - `permissionSetArn`: the `AdministratorAccess` permission set arn
- `deploymentAccount`
  - `accountId` and `region`: The account id and region where you will deploy the project
- `application`
  - `metadataUrl` The metadata url copied from the Application created earlier. e.g. `https://portal.sso.us-east-1.amazonaws.com/saml/metadata/ABCDEFGHIJKLMNOPQRSTUVWXYZ`
- `identity`:
  - `callbackUrls`: Allowed urls for the web application callback. You can leave this unchanged. Later, you can add the CloudFront distribution url in the array.
  - `domainPrefix`: a custom domain prefix for the Cognito login page. This value must be globally unique

2. `awsNuke`
   - `blockList`: a list of account ids that you DON'T want `aws-nuke` to be allowed to destroy. It's a good idea to include production accounts ids here, or any other account where don't want to lose resources.
   - `regions`: A list of regions you want `aws-nuke` to review for deleting resources. Put here any region that you use. or `all` for all regions.
     See https://ekristen.github.io/aws-nuke/config/ for more details.
3. Deploy the project with `npm run deploy -w backend`. (This will deploy the CDK Application)
4. Once you get the CloudFront distribution url, you can add it to the `identity.domainPrefix` list, and re-deploy the update.
5. Finish the IAM Identity Center setup:
   1. Go back to the App creation tab, or edit the created application.
   2. In `Application start URL`: Set the CloudFront distribution url
   3. `Application ACS URL`, put `https://{identity.domainPrefix}.auth.us-east-1.amazoncognito.com/saml2/idpresponse`. Replace `identity.domainPrefix` with the one from your config.
   4. `Application SAML audience`: put `urn:amazon:cognito:sp:{cognitoUserPoolId}`. Replace `cognitoUserPoolId` with the id of the created user pool
   5. Save The Application
   6. Under Actions -> Edit attribute mappings, use the following mapping:
      - Subject -> `${user:subject}` -> Persistent
      - `userId` -> `${user:AD_GUID}` -> basic
      - `email` -> `${user:email}` -> basic
      - `username` -> ${user:subject} -> basic
   7. Save
   8. Assign the Application to users you want to have access to the Web App.
6. In the Management account of your organization, create a new IAM role named `VendingMachine` with the following trust relationship.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::{vendingMachineAccountId}:root"
      },
      "Action": "sts:AssumeRole",
      "Condition": {
        "StringEquals": {
          "sts:ExternalId": [
            "arn:aws:states:us-east-1:{vendingMachineAccountId}:stateMachine:AssignAccountStateMachine",
            "arn:aws:states:us-east-1:{vendingMachineAccountId}:stateMachine:ReleaseAccountStateMachine"
          ]
        }
      }
    }
  ]
}
```

1. Under `Principal.AWS`, replace `vendingMachineAccountId` with the Vending Machine accoun id
2. Under `Condition`, replace the values with the ARNs of both the Step Functions workflows that were created by the CDK stack.
   and the following Policy

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "VisualEditor0",
      "Effect": "Allow",
      "Action": ["sso:CreateAccountAssignment", "sso:DeleteAccountAssignment"],
      "Resource": "*"
    }
  ]
}
```

10. Create one or more new accounts that will be used as sandboxes under your Organization. Group them under the same OU. Then, for every Account:
11. Create a role named `AWSNuke` with the following trust relationship

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::{vendingMachineAccountId}:root"
      },
      "Action": "sts:AssumeRole",
      "Condition": {}
    }
  ]
}
```

Give the Role the `AdministratorAccess` Policy. 2. Create an item in the DynamoDB table.

```json
{
  "accountId": "999999999999",
  "status": "FREE"
}
```

Use the `accountId` of the sandbox account.

When you are done, you should be able to log into the web app at the CloudFront address using your SSO credentials, and request new sandbox accounts.

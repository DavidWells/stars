---
repo: Enterprise-CMCS/macpro-quickstart-serverless
url: 'https://github.com/Enterprise-CMCS/macpro-quickstart-serverless'
homepage: null
starredAt: '2020-09-12T19:17:43Z'
createdAt: '2020-08-27T12:30:25Z'
updatedAt: '2024-07-24T19:21:02Z'
language: JavaScript
license: NOASSERTION
branch: master
stars: 18
isPublic: true
isTemplate: true
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:34.041Z'
description: null
tags: []
---

# macpro-quickstart-serverless ![Build](https://github.com/CMSgov/macpro-quickstart-serverless/workflows/Deploy/badge.svg?branch=master) [![latest release](https://img.shields.io/github/release/cmsgov/macpro-quickstart-serverless.svg)](https://github.com/cmsgov/macpro-quickstart-serverless/releases/latest) [![Maintainability](https://api.codeclimate.com/v1/badges/1449ad929006f559756b/maintainability)](https://codeclimate.com/github/CMSgov/macpro-quickstart-serverless/maintainability) [![CodeQL](https://github.com/CMSgov/macpro-quickstart-serverless/actions/workflows/codeql-analysis.yml/badge.svg?branch=master)](https://github.com/CMSgov/macpro-quickstart-serverless/actions/workflows/codeql-analysis.yml) [![Dependabot](https://badgen.net/badge/Dependabot/enabled/green?icon=dependabot)](https://dependabot.com/) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) [![Test Coverage](https://api.codeclimate.com/v1/badges/1449ad929006f559756b/test_coverage)](https://codeclimate.com/github/CMSgov/macpro-quickstart-serverless/test_coverage)

A serverless form submission application, built and deployed to AWS with the [Serverless Application Framework](https://serverless.com). This QuickStart app provides a template for deploying your own QuickStart codebase. The [Architecture Diagram](./.images/architecture.svg?raw=true) shows the resources built by the QuickStart template in this repo.

A service-specific README is located in each service folder (services/).

Note: serverless-stack.com is different from serverless.com. This app does _not_ use serverless-stack.com.

## Pre-Requisites

### AWS Account

You'll need an AWS account with appropriate IAM permissions (Admin is recommended) to deploy this app to AWS.

### AWS CLI

This is useful for getting insight into your resources. Instructions for installing and upgrading the AWS CLI are [here](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).

### NVM

Use Node Version Manager (NVM) to install and manage Node. Instructions to install NVM are [here](https://github.com/nvm-sh/nvm#installing-and-updating). Inspect the install script before invoking it with bash.

### Node

The file `.nvmrc` contains the Node version that is expected to be used with this app. This version matches the Lambda runtime. Use NVM to install this version before running the app.

```
# from the root project directory
$ nvm -v      # verify nvm is installed
$ nvm install # install Node.js version specificed in .nvmrc
$ nvm use
$ nvm list    # verify the expected Node.js version is active
```

### Yarn

This app uses Yarn as the package manager for Node. Use the Node package manager included with Node (NPM) to install Yarn. Instructions for installing Yarn are [here](https://classic.yarnpkg.com/en/docs/install/). This link includes instructions for installing on Windows.

```
# installation on MacOS and Linux
$ npm install -g yarn  # use to install or upgrade Yarn
```

### Serverless CLI

The app is built on a framework called Serverless (for AWS). Instructions for installing the Serverless CLI, using AWS as the cloud provider, are here: [Serverless Getting Started page](https://www.serverless.com/framework/docs/providers/aws/guide/installation/)

```
# installation on MacOS and Linux
$ npm install -g serverless  # use to install or upgrade serverless
$ serverless -v   # displays version
$ serverless -h   # displays help menu
```

## Local Development

In addition to the pre-requisite tools above, Java must be installed locally to support the local deployment of DynamoDB. (The downloadable version of DynamoDB is an executable .jar file. To run DynamoDB locally, you must have the Java Runtime Environment (JRE) version 8.x or newer.

Local dev is configured in typescript project in `./src`. The entry point is `./src/dev.ts`, it manages running the moving pieces locally: the API, the database, the filestore, and the frontend.

Local dev is built around the Serverless plugin [`serverless-offline`](https://github.com/dherault/serverless-offline). `serverless-offline` runs an API gateway locally, configured by `./services/app-api/serverless.yml` and hot-reloads your lambdas on every save. The plugins [`serverless-dynamodb-local`](https://github.com/99x/serverless-dynamodb-local) and [`serverless-s3-local`](https://github.com/ar90n/serverless-s3-local) stand up the local DynamoDB and local S3 in a similar fashion.

When run locally, auth bypasses Cognito. The frontend mimics login using local storage with a mock user, and sends an id in the `cognito-identity-id` header on every request. `serverless-offline` expects that and sets it as the cognitoId in the requestContext for your lambdas, just like Cognito would in AWS.

### Build and Deploy all Services Locally

#### Pre-Requisites

- valid short-term access keys for your AWS account pasted in your terminal window

Run _all_ the services locally with the command `./scripts/dev.sh local`. For example,

```
# from root directory of project
$ ./scripts/dev.sh local
```

Note: This repo does not support selecting a subset of services to run locally.

You can view the app on localhost:3000.

### Build and Deploy Only the Frontend Service Locally

#### Pre-Requisites

- valid short-term access keys for your AWS account pasted in your terminal window
- a QuickStart stage, <stage>, deployed and running in AWS

The QuickStart contains a script `services/ui-src/configure_local.sh` that configures the frontend to run locally and connect with the backend services running in AWS.
You can view the app on localhost:3000.

```
# ensure that <stage> has already been deployed  # This is necessary since only the frontend is deployed locally
$ aws cloudformation list-stacks | grep <stage>  # confirm the stage is deployed
# change to services/ui-src directory
$ cd services/ui-src
$ ./configure_local.sh  <stage> # sets environment variables
$ yarn run start                # start React frontend
# login using valid credentials
# to stop frontend, hit Control-C
```

### Run Tests Against Locally Deployed Services

`./scripts/dev.sh test` runs tests against locally deployed services. This is just a placeholder implementation and should be replaced with an actual implementation in `src/dev.ts`

```
$ ./scripts/dev.sh test
"Testing 1. 2. 3."
```

## Deploy and Destroy all Services to/from AWS

### Pre-Requisites

- valid short-term access keys for your AWS account pasted in your terminal window
- stage names must be less than 27 characters

```
# from root directory of project
$ ./scripts/deploy.sh <stage>
```

After the deployment completes, verify all resources have been deployed.
From the AWS console, navigate to CloudFormation. Filter on the stage name.
From the command line:

```
$ aws cloudformation list-stacks | grep <stage>
```

To destroy AWS resources for a stage:

```
# from root directory of project
$ ./scripts/destroy.sh <stage>
$ aws cloudformation list-stacks | grep <stage>  # This should return no matches.
```

Note: Parameters created in AWS Systems Manager (SSM) parameter store are not destroyed.

## Testing

The Quickstart contains the following types of tests:

### Unit tests

These are component-based tests defined in the service folders in `/services`. They use

- [Jest](https://jestjs.io/) as a test runner
- the [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) to facilitate querying the DOM in the same way the user would
- API mocks (see [Amendments.test.js](services/ui-src/src/tests/Amendments.test.js) for an example of how to mock an API endpoint for a component-based test)

Unit tests can be run manually with the `scripts/unit_test.sh` script, and they are run automatically as part of the `deploy` GitHub Action

### Integration and accessibility tests

These tests are defined in the `tests/cypress` folder. They use

- [Cypress](https://docs.cypress.io) as a front-end testing tool
- [Axe](https://github.com/dequelabs/axe-core) as an accessibility testing engine

For more info, including how to run these tests locally, see the [testing README](tests/cypress/README.MD).
Integration and accessibility tests are run automatically as part of the `deploy` GitHub Action.

## Release

Our product is promoted through branches. A developer branch is merged to the master branch. The master branch is merged to val to affect a val release, and the val branch is merged to production to affect a production release. Please use the buttons below to promote/release code to higher environments.<br />

| branch     | status                                                                                                             | release                                                                                                                                                                                                                                                   |
| ---------- | ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| master     | ![master](https://github.com/CMSgov/macpro-quickstart-serverless/workflows/Deploy/badge.svg?branch=master)         | [![release to master](https://img.shields.io/badge/-Create%20PR-blue.svg)](https://github.com/CMSgov/macpro-quickstart-serverless/compare?quick_pull=1)                                                                                                   |
| val        | ![val](https://github.com/CMSgov/macpro-quickstart-serverless/workflows/Deploy/badge.svg?branch=val)               | [![release to val](https://img.shields.io/badge/-Create%20PR-blue.svg)](https://github.com/CMSgov/macpro-quickstart-serverless/compare/val...master?quick_pull=1&template=PULL_REQUEST_TEMPLATE.val.md&title=Release%20to%20Val)                          |
| production | ![production](https://github.com/CMSgov/macpro-quickstart-serverless/workflows/Deploy/badge.svg?branch=production) | [![release to production](https://img.shields.io/badge/-Create%20PR-blue.svg)](https://github.com/CMSgov/macpro-quickstart-serverless/compare/production...val?quick_pull=1&template=PULL_REQUEST_TEMPLATE.production.md&title=Release%20to%20Production) |

## Setup Deployments for GitHub Actions

Deployments via GitHub Actions authenticate using [Open ID Connect (OIDC)](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect). This prevents needing to maintain a separate static user within AWS for the deployments.

- For each AWS environment, create a parameters file with the settings needed for your deployments. Example files are provided in [.github/oidc/](.github/oidc/).

  - The permissions boundary must match the one needed for your environment.
  - The list of IAM policies (custom and AWS-managed) must provide your role with sufficient permissions (Note: multiple policies can be provided within the comma-separated list).
  - SubjectClaimFilters depend on your environment setup. The provided examples assume that you wish to allow any branch to be able to deploy to the dev AWS environment, but only want the `val` and `production` branches to be able to deploy to their respective AWS environments. For more options on setting the subject claim filters, see [About security hardening with OpenID Connect: Example subject claims](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect#example-subject-claims).

- Setup the OIDC role in each AWS environment using [the provided CloudFormation template](.github/oidc/github-actions-oidc-template.yml) and the AWS CLI.

  ```
  # verify the AWS account you are authenticated to
  $ aws sts get-caller-identity
  $ aws cloudformation help  # for help with command parameters
  # view the changes to AWS resources using the flag `--no-execute-changeset`
  $ aws cloudformation deploy --template-file .github/oidc/github-actions-oidc-template.yml --stack-name github-actions-oidc-role --parameter-overrides file://PATH_TO_ENVIRONMENT.json --capabilities CAPABILITY_IAM --no-execute-changeset
  # verify changes; if OK, deploy changes
  $ aws cloudformation deploy --template-file .github/oidc/github-actions-oidc-template.yml --stack-name github-actions-oidc-role --parameter-overrides file://PATH_TO_ENVIRONMENT.json --capabilities CAPABILITY_IAM
  ```

- In GitHub Secrets => Actions, create a repository secret for each role that a job must assume. The secret allows a job to get credentials for a given AWS environment. A job accesses a secret using dot notation: `secrets.SECRET_NAME`. The workflows in .github/workflows reference the DEV secret name (secrets.AWS_OIDC_ROLE_TO_ASSUME).

| AWS Environment | Secret Name                        | Secret Value (Service Role ARN) |
| --------------- | ---------------------------------- | ------------------------------- |
| DEV             | AWS_OIDC_ROLE_TO_ASSUME            |                                 |
| VAL             | VAL_AWS_OIDC_ROLE_TO_ASSUME        |                                 |
| PROD            | PRODUCTION_AWS_OIDC_ROLE_TO_ASSUME |                                 |

## How To Contribute

See current open [issues](https://github.com/CMSgov/macpro-quickstart-serverless/issues) or check out the [project board](https://github.com/CMSgov/macpro-quickstart-serverless/projects/1).

Please feel free to open new issues for defects or enhancements.

To contribute:

- Fork this repository
- Make changes in your fork
- Open a pull request targeting this repository

Pull requests are being accepted.

## License

[![License](https://img.shields.io/badge/License-CC0--1.0--Universal-blue.svg)](https://creativecommons.org/publicdomain/zero/1.0/legalcode)

See [LICENSE](LICENSE.md) for full details.

```text
As a work of the United States Government, this project is
in the public domain within the United States.

Additionally, we waive copyright and related rights in the
work worldwide through the CC0 1.0 Universal public domain dedication.
```

## Slack channel

To enable slack integration, set a value for SLACK_WEBHOOK_URL in GitHub actions secret.

To set the SLACK_WEBHOOK_URL:

- Go to https://api.slack.com/apps
- Create a new app
  - Fill in the information
  - Select `Add features and functionality`
  - Select `Incoming Webhooks`
  - Enable `Activate Incoming Webooks`
  - Select `Add New Webhook to Workspace`
- Create a secret in GitHub Actions Secrets called SLACK_WEBHOOK_URL and set its value to the new webhook URL

SLACK_WEBHOOK CREATION (NEW Process):

1. Put in a Jira ticket
   - Go to https://jira.cms.gov/servicedesk/customer/portal/1
   - Select I need help with Jira, Confluence, Slack, or GitHub. You need the following EUA Job Code to access OC Jira: JIRA_Users
   - If you are able to login to https://jira.cms.gov/servicedesk/customer/portal/1/create/11 you are good to go.
2. One of the tools team member will create the Slack App and provide the webhook information back to ADO's.

Please join the macpro-quickstart-serverless slack channel to get all build status and also contribute to any ongoing discussions.
Join here: https://join.slack.com/t/macproquickst-ugp3045/shared_invite/zt-mdxpbtkk-SrLRi_yzJrXX3uYgvrbjlg

### Contributors

| [![Mike Dial][dial_avatar]][dial_homepage]<br/>[Mike Dial][dial_homepage] | [![Seth Sacher][sacher_avatar]][sacher_homepage]<br/>[Seth Sacher][sacher_homepage] |
| ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |

[dial_homepage]: https://github.com/mdial89f
[dial_avatar]: https://avatars.githubusercontent.com/mdial89f?size=150
[sacher_homepage]: https://github.com/sethsacher
[sacher_avatar]: https://avatars.githubusercontent.com/sethsacher?size=150

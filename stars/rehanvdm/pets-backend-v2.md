---
repo: rehanvdm/pets-backend-v2
url: 'https://github.com/rehanvdm/pets-backend-v2'
homepage: >-
  https://blog.cloudglance.dev/trpc-separate-backend-frontend-with-openapi-aws-lambda-cdk/index.html
starredAt: '2025-01-17T17:30:45Z'
createdAt: '2023-08-11T04:40:58Z'
updatedAt: '2025-01-17T17:30:45Z'
language: TypeScript
license: NA
branch: main
stars: 8
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:12.517Z'
description: ' How to create a tRPC server on AWS Lambda exporting an OpenAPI SDK to be used by the frontend'
tags:
  - aws
  - cdk
  - lambda
  - trpc
---

# Backend

> This repo is part of this blog: [https://blog.cloudglance.dev/trpc-separate-backend-frontend-with-openapi-aws-lambda-cdk/index.html](https://blog.cloudglance.dev/trpc-separate-backend-frontend-with-openapi-aws-lambda-cdk/index.html)

This project consists of a single API Lambda function deployed to AWS that can be accessed using the Function URL(FURL).
The AWS CDK has been used to define the IaC and the Lambda is written in TS.

It features the following:
- Showcases [tRPC](https://trpc.io/) + [trpc-openapi](https://github.com/jlalmes/trpc-openapi)
- Generates an OpenAPI spec file from the tRPC code and then from that a JS API SDK, TS types and sourcemaps
- The API SDK is pushed to GitHub and also published to GitHub Packages (similar to NPM)
- A build system that consists of npm scripts, [wireit](https://github.com/google/wireit) and a custom TS file used to execute commands
- Tests setup for both unit and e2e
- Local development by creating an express server from the tRPC lambda code
- Other:
  - Uses esbuild and the `esbuild-runner` package instead of `tsc` or `ts-node`
  - Vitest is being used for tests
  - Has ESLint + Prettier setup
  - It has API endpoints to get all pets, a single pet and to create a pet. It also has an endpoint to show the OpenAPI
    spec nicely formatted in HTML.

## Configuration

The configuration is done in the `config/index.ts` file. The file has been committed with actual values for the purpose
of this blog. Replace the values with your own, see description of the types in the file.

**OPTIONALLY**, if you intend to publish the package to GH Packages, you will need to:
1. Create a [Personal Access Token(PAT) on GitHub](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-token)
   so that we can write the SDK API NPM package. You need to assign the flowing permissions:
  - `write:packages` Upload packages to the GitHub Package Registry
2. Make a copy of the `.npmrc.example` file and replace:
   -`<YOUR PERSONAL ACCESS TOKEN HERE>` with your GitHub Personal Access Token (PAT) that you obtained above
   -`<YOUR GITHUB PROFILE OR ORGANIZATION NAME>` with your GutHub username of where the package is installed

## Scripts

Useful commands:

- `npm run build-src` - Builds this project source, transpiling the TS to JS for the Lambda function and storing
the JS in the `dist` folder which is then used by the Lambda.
- `npm run cdk-diff` - Runs `build-src` and then the `cdk diff` command.
- `npm run cdk-deploy` - Runs `build-src` and then the `cdk deploy` command. This deploys the Lambda + Function URL(FURL)
and will produce a URL in the CloudFormation (CFN) output section that you must copy to the frontend production
environment file.
- `npm run cdk-hotswap` - Runs `build-src` and then the `cdk deploy --hotswap` command. The hotswap command is used for
quick iteration of the deployed Lambda code.
---
- `npm run start-local-api-watch` - Starts an express server that serves the Lambda function for local development.
- `npm run build-api-package` - Generates the OpenAPI Spec and the API SDK to the `api-packages` folder.
- `npm run publish-api-package` - Runs the `build-api-package` again and publishes the API SDK to GitHub Packages.
---
- `npm run lint-fix` - Runs eslint and prettier on the project and fixes all linting and formatting issues (also runs
in the hsuky git pre commit hook).
- `npm run test-unit` - Runs the tests defined in the `/tests` folder.
- `npm run test-e2e` - Runs the tests defined in the `/tests` folder, make sure the `TEST_VARIABLES` in the `config/index.ts`
file are set correctly. The only important property for e2e tests is the `api_url` which is the Function URL of the
deployed Lambda.


## Using the API SDK NPM package

See the frontend docs here: [https://github.com/rehanvdm/pets-frontend-v2](https://github.com/rehanvdm/pets-frontend-v2)



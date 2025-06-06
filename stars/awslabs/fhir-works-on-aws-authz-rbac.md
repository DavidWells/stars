---
repo: awslabs/fhir-works-on-aws-authz-rbac
url: 'https://github.com/awslabs/fhir-works-on-aws-authz-rbac'
homepage: ''
starredAt: '2020-09-03T16:46:33Z'
createdAt: '2020-07-23T01:35:27Z'
updatedAt: '2023-12-21T13:33:10Z'
language: TypeScript
license: Apache-2.0
branch: mainline
stars: 23
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:36.204Z'
description: >-
  A role based access control implementation of the FHIR Works on AWS framework,
  utilizing Cognito and User Groups to perform authorization
tags:
  - aws
  - fhir
  - fhir-works
  - healthcare
  - hl7
  - nodejs
  - typescript
---

# fhir-works-on-aws-authz-rbac

# This GitHub repository has been migrated. You can now find FHIR Works on AWS at https://github.com/aws-solutions/fhir-works-on-aws.

## Purpose

Please visit [fhir-works-on-aws-deployment](https://github.com/awslabs/fhir-works-on-aws-deployment) for overall vision of the project and for more context.

This package is an implementation of the authorization interface from the [FHIR Works interface](https://github.com/awslabs/fhir-works-on-aws-interface). It uses role based access control (RBAC) to limit access to certain resource types and what operations one can do on those resource types. Cognito User Groups are used to determine which roles the user has. The User Group information is passed along in the OAuth access token when a user makes a request to the FHIR API. This means that the user must correctly obtained an access token from Cognito by using scopes of either:

- `openid profile` Must have both
- `aws.cognito.signin.user.admin`

To use and deploy this component (with the other 'out of the box' components) please follow the overall [README](https://github.com/awslabs/fhir-works-on-aws-deployment)

## Infrastructure

This package assumes certain infrastructure:

- Cognito - is our idP
  - Users - created and managed inside of Cognito
  - User Groups - Used to determine which role the users have
  - OAuth - Used to provide an access token to the user. To understand the flow more see this [link](https://aws.amazon.com/blogs/mobile/understanding-amazon-cognito-user-pool-oauth-2-0-grants/)

## Usage

For usage please add this package to your `package.json` file and install as a dependency. For usage examples please see the deployment component's [package.json](https://github.com/awslabs/fhir-works-on-aws-deployment/blob/mainline/package.json)

### Authorization rules

The rules are defined very simply and are in this format:

```txt
{
  <name-of-role>: {
    operations: [<array-of-operations-that-can-be-performed>],
    resources: [<array-of-resource-types>]
  }
}
```

For a working example please see [RBACRules.ts](https://github.com/awslabs/fhir-works-on-aws-deployment/blob/mainline/src/RBACRules.ts) in the deployment package

## Dependency tree

This package is dependent on:

- [interface component](https://github.com/awslabs/fhir-works-on-aws-interface)
  - This package defines the interface we are trying to use
- [deployment component](https://github.com/awslabs/fhir-works-on-aws-deployment)
  - This package deploys this and all the default components

## Known issues

For known issues please track the issues on the GitHub repository

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This project is licensed under the Apache-2.0 License.

---
repo: awslabs/fhir-works-on-aws-interface
url: 'https://github.com/awslabs/fhir-works-on-aws-interface'
homepage: ''
starredAt: '2020-09-03T16:53:56Z'
createdAt: '2020-07-22T17:15:09Z'
updatedAt: '2023-12-21T13:29:43Z'
language: TypeScript
license: Apache-2.0
branch: mainline
stars: 39
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:35.947Z'
description: >-
  The interface for the FHIR Works on AWS framework. This package is the glue
  that allows communication to flow between components 
tags:
  - aws
  - fhir
  - fhir-works
  - healthcare
  - hl7
  - nodejs
  - typescript
---

# fhir-works-on-aws-interface

# This GitHub repository has been migrated. You can now find FHIR Works on AWS at https://github.com/aws-solutions/fhir-works-on-aws.

## Purpose

Please visit [fhir-works-on-aws-deployment](https://github.com/awslabs/fhir-works-on-aws-deployment) for overall vision of the project and for more context.

This package is the connective tissue between other packages in the fhir-works-on-aws ecosystem. This package declares what is the input/output expectation for each sub-component. To create your own component for use in the fhir-works-on-aws framework please see the overall [README](https://github.com/awslabs/fhir-works-on-aws-deployment)

## Usage

For usage please add this package to your `package.json` file and install as a dependency. For usage examples please see below:

- [authorization component](https://github.com/awslabs/fhir-works-on-aws-authz-rbac)
- [search component](https://github.com/awslabs/fhir-works-on-aws-search-es)
- [persistence component](https://github.com/awslabs/fhir-works-on-aws-persistence-ddb)
- [routing component](https://github.com/awslabs/fhir-works-on-aws-routing)
- [deployment component](https://github.com/awslabs/fhir-works-on-aws-deployment)

## Dependency tree

This package is not dependent on others.

## Known issues

For known issues please track the issues on the GitHub repository

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This project is licensed under the Apache-2.0 License.

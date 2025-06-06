---
repo: tobilg/aws-iam-data
url: 'https://github.com/tobilg/aws-iam-data'
homepage: 'https://www.awsiamdata.com'
starredAt: '2024-08-12T18:19:44Z'
createdAt: '2023-05-09T14:38:24Z'
updatedAt: '2025-02-25T04:04:11Z'
language: TypeScript
license: MIT
branch: main
stars: 55
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:26.553Z'
description: >-
  This repository contains the full dataset of AWS IAM data (services, actions,
  resource types and conditions keys). It's updated on a daily basis at 4AM UTC.
tags:
  - aws
  - data
  - git-scraping
  - iam
---

# aws-iam-data
This repository provides AWS IAM data gathered from the official [AWS IAM docs](https://docs.aws.amazon.com/service-authorization/latest/reference/reference_policies_actions-resources-contextkeys.html) as a convenient npm package ([aws-iam-data](https://www.npmjs.com/package/aws-iam-data)), that can be used in other OSS projects.

The package also includes the [TypeScript interface definitions](src/awsIamData.d.ts).

## Interactively query the dataset
You can query the dataset with [sql-workbench.com](https://www.sql-workbench.com/) by clicking on the link below:

[AWS IAM Data on SQL Workbench](https://sql-workbench.com/#queries=v0,ATTACH-'https%3A%2F%2Fraw.githubusercontent.com%2Ftobilg%2Faws%20iam%20data%2Fmain%2Fdata%2Fdb%2Fiam.duckdb'-as-aws_iam-(READ_ONLY)~,SELECT-s.name%2C-count(distinct-a.action_id)%3A%3Aint-AS-action_cnt-FROM-aws_iam.services-s-INNER-JOIN-aws_iam.actions-a-ON-a.service_id-%3D-s.service_id-GROUP-BY-ALL-ORDER-BY-action_cnt-DESC~)

## Library usage
You can install [aws-iam-data](https://www.npmjs.com/package/aws-iam-data) as a dependecy to your Node/TypeScript project via 

```bash
npm i --save aws-iam-data
```

To use it in your own projects, see [examples/index.js](examples/index.js) or the code below:

```javascript
const { iamData, metadata, changelog } = require('aws-iam-data');

// Get overall service count
console.log(`Contains ${metadata.serviceCount} services!`);

// Get changelog
console.log(JSON.stringify(changelog, null, 2));

// Get EC2 data
const ec2IamData = iamData.filter(service => service.name === 'Amazon EC2')[0];

// Get actions and their access level
const ec2Actions = ec2IamData.actions.map(action => ({ name: action.name, accessLevel: action.accessLevel }));
console.log(JSON.stringify(ec2Actions, null, 2));

// Get EC2 resource types
const ec2ResourceTypes = ec2IamData.resourceTypes.map(action => ({ name: action.name, arnPattern: action.arnPattern }));
console.log(JSON.stringify(ec2ResourceTypes, null, 2));
```

## Automatic updates
The CI pipeline will check for AWS IAM docs updates everyday at 4AM UTC, and automatically publish a new patch version if updates are detected.


## Data exports
The JSON-based data gets automatically exported as CSV and Parquet files, as well as a DuckDB database. Please look in the respective directories:

* [data/csv/](data/csv/)
* [data/parquet/](data/parquet/)
* [data/db/](data/db/)
## Entity Relationship Diagram
The ERD of the exported data tables looks like this:
![ERD](docs/erd.png)

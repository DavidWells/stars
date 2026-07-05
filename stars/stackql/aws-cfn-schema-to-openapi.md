---
repo: stackql/aws-cfn-schema-to-openapi
url: 'https://github.com/stackql/aws-cfn-schema-to-openapi'
homepage: null
starredAt: '2025-01-14T22:26:42Z'
createdAt: '2023-03-25T11:40:30Z'
updatedAt: '2025-01-14T22:26:43Z'
language: JavaScript
license: NA
branch: main
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:14.491Z'
description: null
tags: []
---

# aws-cfn-schema-to-openapi
Convert AWS CloudFormation Resource Specification to OpenAPI 3.0.0

## Generating OpenAPI3 Specs
1. run `sh download-and-preprocess-defs.sh`
2. run `python3 get_cc_supported_resources.py > cc_supported_resources.js` (requires `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` env vars to be set)
3. run `npm install`
4. run `node index.js`

output openapi3 specs (`components/schemas`) are written to `src/aws/v00.00.00000/services`

## Testing locally with `stackql`
1. ensure the `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` environment variables are set
2. download the latest `stackql` binary, for example `curl -L https://bit.ly/stackql-zip -O && unzip stackql-zip` for Linux systems
3. run the following:
```
PROVIDER_REGISTRY_ROOT_DIR="$(pwd)"
REG_STR='{"url": "file://'${PROVIDER_REGISTRY_ROOT_DIR}'", "localDocRoot": "'${PROVIDER_REGISTRY_ROOT_DIR}'", "verifyConfig": {"nopVerify": true}}'
./stackql shell --registry="${REG_STR}"
```
4. run `stackql` commands, for example 
```sql
select * from aws.s3.buckets WHERE region = 'us-east-1';
select bucket_name, region, bucket_encryption_server_side_encryption_configuration from aws.s3.bucket WHERE region = 'us-east-1' and data__Identifier = 'stackql-trial-bucket-01';
```

### Run Test Suite

from the `stackql-provider-tests` directory:

```bash
cd /mnt/c/LocalGitRepos/stackql/core/stackql-provider-tests

# aws
bash test-provider.sh \
aws \
false \
/mnt/c/LocalGitRepos/stackql/openapi-conversion/aws-cfn-schema-to-openapi \
true

cd /mnt/c/LocalGitRepos/stackql/openapi-conversion/aws-cfn-schema-to-openapi
```

## Generate User Markdown Docs
Use the following script to generate user docs with Docusaurus front matter for AWS view resources:

```bash
node lib/utils/generate-docs.js
```

output markdown docs are written to `aws-docs`

### Troubleshooting AWS Cloud Control

To troubleshoot AWS Cloud Control API requests (mutation requests), use the following queries:

```sql
select * from aws.cloud_control.resource_requests
where data__ResourceRequestStatusFilter = '{"OperationStatuses": ["FAILED"], "Operations": ["CREATE"]}'
and region = 'ap-southeast-2';
--or
select * from aws.cloud_control.resource_requests
where data__ResourceRequestStatusFilter = '{"OperationStatuses": ["FAILED"], "Operations": ["DELETE"]}'
and region = 'us-east-1';
--or
select * from aws.cloud_control.resource_requests
where data__ResourceRequestStatusFilter = '{"OperationStatuses": ["SUCCESS"], "Operations": ["UPDATE"]}'
and region = 'ap-southeast-2';
```

(replace `region` accordingly)

```sql
select * from aws.cloud_control.resource_request
where data__RequestToken = '54061545-e0a0-4ef0-b213-41fda81d8c24'
and region = 'ap-southeast-2';
```

(replace `region` and `data__RequestToken` accordingly)

## check for AWS CC updates

See [here](https://docs.aws.amazon.com/cloudcontrolapi/latest/userguide/doc-history.html) for newly added or updated Cloud Control resources.

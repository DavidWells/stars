---
repo: rkstgr/papermake-aws
url: 'https://github.com/rkstgr/papermake-aws'
homepage: null
starredAt: '2025-05-04T00:27:12Z'
createdAt: '2025-04-19T12:49:33Z'
updatedAt: '2025-05-10T11:00:40Z'
language: Python
license: NA
branch: main
stars: 89
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-05-10T22:30:18.614Z'
description: PDF Rendering stack deployed on AWS Lambdas
tags: []
---

# Local

Run the lambda function locally

```sh
cd lambda_functions/request_handler
cargo lambda watch
```

and in another terminal, invoke it

```sh
cargo lambda invoke --data-example apigw2-http --output-format json
```

# Deploy

First, build and package both lambda functions

```sh
just build
```

Then, deploy the lambda function to AWS

```sh
cd terraform/environments/dev
terraform init
terraform plan
terraform apply
```

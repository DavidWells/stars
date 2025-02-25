---
repo: sbchapin/serverless-terraform-variables
url: 'https://github.com/sbchapin/serverless-terraform-variables'
homepage: null
starredAt: '2018-11-16T00:36:40Z'
createdAt: '2018-10-13T06:43:02Z'
updatedAt: '2024-06-15T00:01:21Z'
language: JavaScript
license: MIT
branch: master
stars: 9
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:05.280Z'
description: >-
  Retrieve terraform output variables for interpolation in serverless
  configuration
tags:
  - infrastructure
  - interpolation
  - serverless
  - serverless-terraform-variables
  - terraform
---

# serverless-terraform-variables
[![Build Status](https://travis-ci.org/sbchapin/serverless-terraform-variables.svg?branch=master)](https://travis-ci.org/sbchapin/serverless-terraform-variables)
[![dependencies Status](https://david-dm.org/sbchapin/serverless-terraform-variables/status.svg)](https://david-dm.org/sbchapin/serverless-terraform-variables)
[![devDependencies Status](https://david-dm.org/sbchapin/serverless-terraform-variables/dev-status.svg)](https://david-dm.org/sbchapin/serverless-terraform-variables?type=dev)
[![npm](https://img.shields.io/npm/v/serverless-terraform-variables.svg)](https://www.npmjs.com/package/serverless-terraform-variables)


Interpolation of [terraform output variables](https://www.terraform.io/intro/getting-started/outputs.html) into a [serverless configuration variable source](https://serverless.com/framework/docs/providers/aws/guide/variables#current-variable-sources).

Use terraform to manage the breadth of your networking, data, and auth layers, while using serverless to keep the quickly moving pieces moving quickly.


Simply stated, it allows this:

`main.tf`:
```hcl
resource "aws_sqs_queue" "terraform_queue" {
  name = "terraform-example-queue"
}
output "sqs_id" { // <- !!!
  value = "${aws_sqs_queue.terraform_queue.id}"
}
```

`serverless.yml`:
```yml
plugins:
  - serverless-terraform-variables
functions:
  compute:
    handler: handler.compute
    events:
      - sqs: ${terraform:sqs_id} # <- !!!
```

## Usage

#### To **install** this to your project...
```sh
npm install --save serverless-terraform-variables
```
...then add to `serverless.yml`:
```yaml
# ...
plugins:
  - serverless-terraform-variables
# ...
```

#### To **use** it in your project...
Create some terraform:
```hcl
// Optionally configure your state storage:
terraform {
  backend "consul" {}
}
// Create resources
resource "aws_s3_bucket" "serverless_deployment" {
  bucket = "yournamespace.serverless"
}
// Expose them to serverless via output variables
output "serverless_bucket" {
  value = "${aws_s3_bucket.serverless_deployment.id}"
}
```
...initialize and update state:
```sh
terraform init
terraform apply
# ...or...
terraform state pull
```
...then use the outputs in your `serverless.yml`:
```yaml
# ...
provider:
  name: aws
  runtime: nodejs8.10
  deploymentBucket: ${terraform:serverless_bucket}
# ...
```

#### To **develop** the plugin...
**Fork** it, **git** it, **commit** it, **PR** it:
```sh
# Setup:
git clone git@github.com:sbchapin/serverless-terraform-variables.git
cd ./serverless-terraform-variables/plugin/
npm install

# Test:
npm test
```

## Example

The quickest way to get the idea is to see the example.  Contained in `./example/` is a stand-alone Ping/Pong HTTP GET lambda function.  It contains the terraform necessary to create the network infrastructure and code deployment bucket, so make sure the terraform state is available before invoking serverless.  Or don't, and see the meaningful error messages.

```sh
# Setup:
git clone git@github.com:sbchapin/serverless-terraform-variables.git
cd ./serverless-terraform-variables/example/
npm install

# Deploy:
terraform init
terraform apply # !!!WARNING!!! will create a VPC, subnet, and gateway using _your_ AWS Account.
serverless deploy # !!!WARNING!!! will create lambdas, cloudwatch log groups, and API gateway endpoints using _your_ AWS Account.

# Experiment:
serverless invoke -f ping
curl -XGET https://deployment_specific_ApiGatewayRestApi_token_goes_here.execute-api.us-west-2.amazonaws.com/dev/ping

# Cleanup:
serverless remove
terraform destroy
# note that you may need to clear the objects serverless has deployed for you:
# aws s3 rm --profile ${aws_profile} --recursive s3://${namespace}.serverless/serverless/serverless-terraform-variables-simple-http-endpoint/dev/
```

## Gotchas
- [ ] **Serverless cli must be installed** (`npm install -g serverless`).
- [ ] **Terraform cli must be installed** ([`brew install terraform`, probably](https://learn.hashicorp.com/terraform/getting-started/install.html)).
- [ ] **Terraform must be initialized in the directory Serverless is executed in.** (`terraform init` should have been executed before any `serverless` command)
- [ ] **Terraform must be able to show outputs referenced by Serverless.** (`terraform show` should execute successfully)

# Currently a *high-functioning proof-of-concept*.

This code represents a rough implementation of a good idea.  Not suggested for production usage, existent only to show the potential of what _could_ be.

If it wasn't immediately obvious, **this plugin shells out to use terraform directly to parse state**.  It does not do any destructive or constructive terraform operations - that's up to you.  You can find the details of what terraform commands are used under `./plugin/src/terraform-client.js`.

If your operators can provide a consistent operations environment where `terraform` and `serverless` are both versioned and consistent...  There's a future for this project with you involved.

# Why?

**Terraform** and **Serverless** *can* serve the same purpose, but they do so with varying levels of success.

##### **Terraform** _is great at large multi-team shared infrastructure._  

Terraform's functionality of shared & saved state along with its module referencing powers allow it to be used for the majority of a company's provisioned dev ops, and its declarative and configuration-based approach allow it to be easily understood from a high level.  However, terraform is not incredibly easy to pivot and iterate with.

##### **Serverless** _is great at deploying functionality consistently and quickly._

Serverless' highly targeted platform-based approach allows it to be very efficient for any serverless platform, lessening the deploy time and upping the iteration.  In addition, serverless is not restricted to the bounds of configuration - with a rich plugin ecosystem, you can code and do a lot of things with high efficiency.  However, serverless is not terribly easy roll a full infrastructure with (especially with server-ful components).

##### **Serverless-terraform-variables** _allows you to migrate any piece of terraform state forward into serverless._


Serverless-terraform-variables is great at integrating any terraform solution with a serverless solution - you get the both of best worlds while still remaining platform agnostic.  You can take advantage of terraform to inject existing ops-managed infrastructure into a dev-owned environment of lambdas, managing just the deployment of your code with serverless while leaning on terraform to fetch and update any changes of infrastructure state that may affect your deployment.

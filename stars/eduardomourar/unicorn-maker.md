---
repo: eduardomourar/unicorn-maker
url: 'https://github.com/eduardomourar/unicorn-maker'
homepage: ''
starredAt: '2022-03-31T00:20:23Z'
createdAt: '2020-03-07T17:03:19Z'
updatedAt: '2022-03-31T00:20:23Z'
language: null
license: MIT
branch: master
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: true
hasReadMe: true
refreshedAt: '2025-02-25T20:21:52.751Z'
description: >-
  Unicorn-maker is a complete example of a Cloudformation custom provider. This
  resource is built in multiple languages, to get you up and running creating
  Cloudformation custom resources.
tags: []
---

# unicorn-maker
Unicorn-maker is a complete example of a Cloudformation provider. This resource is built in multiple languages, to get you up and running creating Cloudformation custom resources.

![Architecture](images/unicorn.png)


The [CloudFormation Command Line Interface (CLI)](https://docs.aws.amazon.com/cloudformation-cli/latest/userguide/what-is-cloudformation-cli.html) is an open-source tool that enables you to develop and test AWS and third-party resources and register them for use in AWS CloudFormation. Begin by going to the [documentation guide](https://docs.aws.amazon.com/cloudformation-cli/latest/userguide/resource-type-setup.html) and setting up your build environment.


## Examples
This example resource is built in the following languages:

- Go

- Python

- Java (Comming soon)

## Getting started
- Once you have set up your development environment, obtain a CrudCrud API key. Don't worry; the free version provides more than enough requests to play with this example.
![Architecture](images/api.png)
- Pick one of the language examples for this repo.
- Add the API key to the source file.
    - (Go) ![Architecture](images/go.png)
    - (Python) ![Architecture](images/python.png)


- Submit the resource using the Cloudformation CLI
- After the provider has been registered, deploy it using the sample Cloudformation `cloudformation.json`

## Contract test
This example was create using Cloudformation's best practices. Therefore, it will pass all of the Cloudformation CLI's Contract test.
To run the contrast test, follow the directions the
[documentation.](https://docs.aws.amazon.com/cloudformation-cli/latest/userguide/resource-type-cli-test.html)




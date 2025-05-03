---
repo: XaaXaaX/aws-lambda-extensions
url: 'https://github.com/XaaXaaX/aws-lambda-extensions'
homepage: null
starredAt: '2025-04-29T06:09:43Z'
createdAt: '2024-02-15T21:51:11Z'
updatedAt: '2025-04-29T06:09:43Z'
language: TypeScript
license: NA
branch: main
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-05-03T22:30:41.612Z'
description: null
tags: []
---

# Lambda Extensions

The project is for the purpose of centralizing the Lambda Extensions for different needs.

## Why Extensions ( External )

The Extensions have a lifecycle when using with lambda functions.
The extensions run in a separated process.
The Extensions can run after lambda invocation termination being a response to caller or an exception.
The Extensions participate in 3 phase as init, invoke and shutdown.
The External Extensions can have a different Runtime than Function runtime.

## Considerations

The Extensions package size will be calculated as part of function package.
The Extensions init must be sucessful before function init can start.
The Extensions use the same security boudaries of Function.
The Extensions share same memory and resources with function.
The Extensions share also function Timeout and execution time.

## How to use

To use the extension need to attach an extension to function as a layer.

If Extension needs specific permissions, attaching the policy to function role  is required.

> Every Extension must provide the requitred ManagedPolicy as parameter in parameter store.

## Usage

To use the extensions effectively, you must provide the extensions arn to lambda , and attach the provided managedpolicy as iam managedpolicy to lambda function.

Any extension must provide the Extension Arn and the ManagedPolicy Name and Arn using parameter store.

## Consult the following extensions dedicated usage documentation

- [Kinesis Telemetry extension](./docs/kinesis-telemetry-extension.md)

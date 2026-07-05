---
repo: aws-cli-tools/chaos-lambda-extension
url: 'https://github.com/aws-cli-tools/chaos-lambda-extension'
homepage: ''
starredAt: '2024-08-28T03:43:38Z'
createdAt: '2023-07-18T07:28:02Z'
updatedAt: '2024-08-29T13:41:06Z'
language: Rust
license: Apache-2.0
branch: main
stars: 27
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:24.919Z'
description: >-
  The lambda-chaos-extension allows you to inject faults into Lambda functions
  without modifying the function code. 
tags: []
---

[![Actions Status](https://github.com/aws-cli-tools/chaos-lambda-extension/workflows/Code%20Gating/badge.svg?branch=main)](https://github.com/aws-cli-tools/chaos-lambda-extension/workflows/Code%20Gating/badge.svg?branch=main)
[![Actions Status](https://img.shields.io/badge/built%20with%20rust-red?logo=rust)](https://img.shields.io/badge/built%20with%20rust-red?logo=rust)

# Chaos Extension - Seamless, Universal & Lightning-Fast

<p align="center">
  <img src="https://github.com/aws-cli-tools/chaos-lambda-extension/assets/110536677/0d7586d8-7f0f-489b-a959-20db77594468" alt="A futuristic neon lit chaos" width="256" height="256">
</p>

The `lambda-chaos-extension` allows you to inject faults into Lambda functions without modifying the function code. Unlike previous chaos implementations that required tight coupling with the Lambda runtime, this extension is runtime-agnostic. It can operate with any runtime that utilizes Amazon Linux 2. Currently, the supported runtimes include:

* Node.js 18
* Node.js 16
* Node.js 14
* Python 3.10
* Python 3.9
* Python 3.8
* Java 17
* Java 11
* Java 8
* .NET 6
* Ruby 3.2
* Ruby 2.7
* provided.al2

The extension can inject two types of faults based on the configuration:

1. Induce latency.
2. Modify function response.

## Main Benefits
* 🔄 Seamless Integration: Requires no code changes. Simply plug and play!
* 🌐 Universal Compatibility: Completely agnostic to the Lambda runtime. Flexibility at its finest!
* 🚀 Blazing Fast: Written in Rust for peak performance. Zero impact on your Lambda's behavior when turned off, ensuring smooth operations.

## Configuration

Control the extension via environment variables:

### Latency Fault

* `CHAOS_EXTENSION__LAMBDA__ENABLE_LATENCY` - Enables latency fault injection. Accepts `true` or `false`. Default is `false`.
* `CHAOS_EXTENSION__LAMBDA__LATENCY_VALUE` - Specifies the latency duration (in seconds) to introduce. Default is `900` seconds.
* `CHAOS_EXTENSION__LAMBDA__LATENCY_PROBABILITY` - A probability value between 0 and 1 that determines the likelihood of fault injection. Default is `0.9`.

### Response Fault

* `CHAOS_EXTENSION__RESPONSE__ENABLE_CHANGE_RESPONSE_BODY` - Enables response fault injection. Accepts `true` or `false`. Default is `false`.
* `CHAOS_EXTENSION__RESPONSE__DEFAULT_RESPONSE` - Specifies the response to return in stringified JSON format. Default is:
```json
{
    "statusCode": 500,
    "body": "hello, Chaos!!!"
}
```
* `CHAOS_EXTENSION__RESPONSE__CHANGE_RESPONSE_PROBABILITY` - A probability value between 0 and 1 that determines the likelihood of fault injection. Default is `0.9`.

## Deployment
The chaos extension is publicly available as a layer. For the latest versions of the layer, refer to [LAYERS.md](LAYERS.md). Incorporate the layer using the AWS Console, or your preferred IAC solution. 
Additionally, when incorporating the layer, remember to set an environment variable in your Lambda. This variable should be named `AWS_LAMBDA_EXEC_WRAPPER` and have `/opt/bootstrap` as its value.

See the AWS SAM usage example in the `examples` directory.

## Running Locally
### Unit testing
* Utilize `cargo` for build and test management.
* We employ [`just`](https://github.com/casey/just) as a command runner.
* Execute `just gate` to run all checks locally.
### Deployment for testing
* Use `just deploy-debug-extension` to deploy a debug version of the extension to `us-east-1` using `x86_64-unknown-linux-gnu` as target.
* Use `just deploy-release-extension` to deploy a release version of the extension to `us-east-1` using `x86_64-unknown-linux-gnu` as target.

These `just` tasks also accept arguments to change the region and the target. Use `just --list` to get more details about the various deploy options.

### Logs
* Use `RUST_LOG` environment variable to change the extension log level. Default is `error`.

## Contributing
For contribution guidelines, see our [CONTRIBUTION](CONTRIBUTION.md) page.

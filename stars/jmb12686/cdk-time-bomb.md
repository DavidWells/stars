---
repo: jmb12686/cdk-time-bomb
url: 'https://github.com/jmb12686/cdk-time-bomb'
homepage: null
starredAt: '2020-06-11T16:48:33Z'
createdAt: '2020-05-10T01:43:11Z'
updatedAt: '2025-01-21T14:27:24Z'
language: TypeScript
license: MIT
branch: master
stars: 41
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:49.339Z'
description: 'Implode your AWS CDK Stack after set amount of time, save money, be happy!'
tags:
  - aws
  - cdk
  - infrastructure-as-code
---

# cdk-time-bomb

[![npm version](https://badge.fury.io/js/cdk-time-bomb.svg)](https://badge.fury.io/js/cdk-time-bomb)
[![PyPI Version](https://badge.fury.io/py/cdk-time-bomb.svg)](https://badge.fury.io/py/cdk-time-bomb)
![Nuget](https://img.shields.io/nuget/v/cdk-time-bomb)

Implode your AWS CDK Stack after set amount of time, save money, be happy!

## Usage

### JavaScript / TypeScript

In your Typescipt / Javascript AWS CDK project, add the `cdk-time-bomb` module:

```bash
npm install cdk-time-bomb
```

Import the module and instantiate in your CDK Stack class.  Specify a TTL Duration after which time the entire CloudFormation stack will self destroy:


```javascript
import { SelfDestruct} from 'cdk-time-bomb';
const selfDestruct = new SelfDestruct(this, "selfDestructor", {
  timeToLive: Duration.minutes(60)
});
```

Be sure to add an ordering dependency on a high level base Construct in your stack.  For example anchoring `SelfDestruct` to the `Vpc` ensures all resources in the stack will be destroyed prior to destroying itself.

```javascript
const vpc = new ec2.Vpc(this, "VPC", {
});

vpc.node.addDependency(selfDestruct);
```

### Python

Install using pip

```bash
pip install cdk-time-bomb
```

### Java

Follow the [guide for configuring maven for use with Github Packages](https://docs.github.com/en/packages/using-github-packages-with-your-projects-ecosystem/configuring-apache-maven-for-use-with-github-packages).  Then add the following to your project's `pom.xml`

```xml
<dependency>
  <groupId>jmb12686.cdk</groupId>
  <artifactId>timebomb</artifactId>
  <version>1.50.0</version>
</dependency>
```

## How to build this construct

Due to the large amount of dependencies required by jsii, use the docker image `udondan/jsii-publish` to reliably and consistenly build this CDK construct.  

```bash
docker run -it \
    --workdir /workdir \
    --volume $(pwd):/workdir \
    --env VERSION=0.3.0 \
    --env BUILD_SOURCE=true \
    --env BUILD_PACKAGES=true \
    --env NPM_TOKEN \
    --env PYPI_TOKEN \
    --env NUGET_TOKEN \
    --env GITHUB_TOKEN \
    --env GITHUB_REPOSITORY="${OWNER}/${REPOSITORY}" \
    udondan/jsii-publish:0.8.3
```

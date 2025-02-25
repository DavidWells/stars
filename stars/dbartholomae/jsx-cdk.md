---
repo: dbartholomae/jsx-cdk
url: 'https://github.com/dbartholomae/jsx-cdk'
homepage: null
starredAt: '2022-02-24T21:36:40Z'
createdAt: '2022-01-30T20:56:30Z'
updatedAt: '2022-02-24T21:36:41Z'
language: TypeScript
license: NA
branch: main
stars: 4
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:08.081Z'
description: Experiments around writing CDK in JSX
tags: []
---

# jsx-cdk

[![npm version](https://badge.fury.io/js/jsx-cdk.svg)](https://npmjs.org/package/jsx-cdk)
[![downloads](https://img.shields.io/npm/dw/jsx-cdk.svg)](https://npmjs.org/package/jsx-cdk)
[![open issues](https://img.shields.io/github/issues-raw/dbartholomae/jsx-cdk.svg)](https://github.com/dbartholomae/jsx-cdk/issues)
[![build status](https://github.com/dbartholomae/jsx-cdk/workflows/Build%20and%20deploy/badge.svg?branch=main)](https://github.com/dbartholomae/jsx-cdk/actions?query=workflow%3A"Build+and+deploy")
[![codecov](https://codecov.io/gh/dbartholomae/jsx-cdk/branch/main/graph/badge.svg)](https://codecov.io/gh/dbartholomae/jsx-cdk)
[![dependency status](https://david-dm.org/dbartholomae/jsx-cdk.svg?theme=shields.io)](https://david-dm.org/dbartholomae/jsx-cdk)
[![devDependency status](https://david-dm.org/dbartholomae/jsx-cdk/dev-status.svg)](https://david-dm.org/dbartholomae/jsx-cdk?type=dev)

## This is a proof-of-concept, not a production-ready solution.

Generate AWS CDK infrastructure with a React-like syntax.

## Usage

```tsx
/* @jsx h */
import h, { attachToApp, Stack, Queue } from "jsx-cdk";
import { App, Duration, StackProps } from "aws-cdk-lib";

const CdkExampleStack = (props: StackProps) => {
  return (
    <Stack {...props}>
      <Queue key="CdkExampleQueue" visibilityTimeout={Duration.seconds(300)} />
    </Stack>
  );
};

void attachToApp(
  <CdkExampleStack
    env={{ account: "111111111", region: "eu-central-1" }}
    key="CdkExampleStack"
  />,
  new App()
);
```

## Documentation

There's a [documentation](https://dbartholomae.github.io/jsx-cdk) of all elements you can use.

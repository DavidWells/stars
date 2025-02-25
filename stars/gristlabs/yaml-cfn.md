---
repo: gristlabs/yaml-cfn
url: 'https://github.com/gristlabs/yaml-cfn'
homepage: null
starredAt: '2025-01-14T05:00:20Z'
createdAt: '2017-10-20T20:34:08Z'
updatedAt: '2025-01-14T05:00:20Z'
language: JavaScript
license: Apache-2.0
branch: master
stars: 32
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:16.587Z'
description: Parser and schema for CloudFormation YAML templates
tags: []
---

# yaml-cfn

![CI](https://github.com/gristlabs/yaml-cfn/workflows/CI/badge.svg)
[![npm version](https://badge.fury.io/js/yaml-cfn.svg)](https://badge.fury.io/js/yaml-cfn)

> Parser and schema for CloudFormation YAML template tags.

Implements support for AWS-specific CloudFormation YAML schema.

The implementation and tests are based on the official AWS Python client
[aws-cli](https://github.com/aws/aws-cli). It supports all intrinsic CloudFormation functions listed in
[AWS docs](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference.html)
as of October 2017.

## Installation

```bash
npm install --save-dev yaml-cfn
```

## Usage

```js
const { yamlParse, yamlDump } = require('yaml-cfn');

const input = `
Key:
  - !GetAtt Foo.Bar
  - !Equals [!Ref Baz, "hello"]
`;

const parsed = {
  "Key": [
    {"Fn::GetAtt": ["Foo", "Bar"]},
    {"Fn::Equals": [{"Ref": "Baz"}, "hello"]}
  ]
};

assert.deepEqual(yamlParse(input), parsed);
assert.deepEqual(yamlParse(yamlDump(parsed)), parsed);
```

The module uses [js-yaml](https://github.com/nodeca/js-yaml). The schema it uses is also exported,
and may be used e.g. like so:
```js
const { schema } = require('yaml-cfn');
const yaml = require('js-yaml');
yaml.safeLoad(input, { schema: schema })
```

---
repo: fungusakafungus/cloudformation-jsonschema
url: 'https://github.com/fungusakafungus/cloudformation-jsonschema'
homepage: ''
starredAt: '2018-01-10T07:01:28Z'
createdAt: '2013-12-31T02:05:11Z'
updatedAt: '2025-01-02T01:01:02Z'
language: Python
license: MIT
branch: master
stars: 31
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:30.986Z'
description: Json schema for AWS Cloudformation
tags: []
---

# ARCHIVED - old and useless


An attempt to write a json schema (http://json-schema.org) for AWS Cloudformation.

You might be interested in http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html, which is the official source of machine-readable CloudFormation specification. That is not a JSON Schema in the sense of http://json-schema.org/ but it is comprehensive.

For now, I'm scraping AWS documentation with PyQuery.

This is not your glossy software.

### current state
Many things are validated.
Some resource properties are not parsed properly, so their values are not validated.

Preliminary hosted version of the schema can be found at http://fungusakafungus.github.io/cloudformation-jsonschema/v0.4/schema.json

The scraping code is in a miserable state.

[![Build Status](https://travis-ci.org/fungusakafungus/cloudformation-jsonschema.svg?branch=master)](https://travis-ci.org/fungusakafungus/cloudformation-jsonschema)

### how to use
Use `./validate_template.py tests/examples-aws/Rails_Single_Instance.template` to validate cloudformation templates on the command line.

Use `schema.json` programmatically to validate complete Cloudformation templates.

Use `resource.json` to validate a single resource.

The schema consists of multiple files, `schema.json`, `resource.json` and `basic_types.json`. To resolve JSON pointers (`{"$ref": "basic_types.json#/definitions/string"}`) to files on local filesystem, you'll have to use a special resolver. See `val.py` for the example.

Use released hosted version with [python-jsonschema](http://python-jsonschema.readthedocs.io/en/latest/):
```python
import jsonschema, requests

schema = requests.get('http://fungusakafungus.github.io/cloudformation-jsonschema/v0.4/schema.json').json()
jsonschema.validate(
  {'Resources':{}, 'Outputs':{'o':{'Value':'test'}}},
  schema
)
```


### how to contribute
Submit false positive/negative issues with valid and invalid templates.

#### hack the schema:

Create a virtualenv (`virtualenv venv; pip install -r requirements.txt`)

You can then scrape AWS documentation for cloudformation resource types and save it as jsonschema:

```
./create_resource_schema.py resource.json
```

### TODO
 - [x] specialized validator (the one which will tell you that this resource type is not known)
 - [x] tests with valid and invalid fragments for every feature. See `tests/test_stage1_valid.py`
 - [x] define a type for a basic cfn value (string, number or function call(Ref, Join) object)
  - [x] Fn::Base64
  - [x] Condition Functions
  - [x] Fn::FindInMap
  - [x] Fn::GetAtt
  - [x] Fn::GetAZs
  - [x] Fn::Join
  - [x] Fn::Select
  - [x] Ref
  - [x] number
  - [x] string
 - [x] integrate/link schema.json and resource.json
 - [x] travis/circleci
 - [x] validate resource property types (listed here: http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-product-property-reference.html)
 - [x] validate attributes (`Metadata`, `UpdatePolicy` and others)
 - [ ] make json objects more stable (use more OrderedDict)
 - [x] reject unknown resource properties: https://github.com/fungusakafungus/cloudformation-jsonschema/pull/9

---
repo: cfntools/cloudformation-graph
url: 'https://github.com/cfntools/cloudformation-graph'
homepage: null
starredAt: '2019-03-05T02:52:46Z'
createdAt: '2018-05-21T19:40:59Z'
updatedAt: '2023-01-28T16:38:09Z'
language: Python
license: NA
branch: master
stars: 11
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:44.183Z'
description: Create Graphics from CloudFormation Describe calls
tags: []
---

# CloudFormation Graph

## Installation
Requires python3

- `python setup.py install`

## Usage
You probably want to install dot / graphviz to turn the output into images.

### Change Sets
```bash
# With the AWS CLI
aws cloudformation describe-change-set --change-set-name $cs_name | cfn-graph | dot -Tpng > output.png

# When copying from the console
echo $copied_from_console | cfn-graph --wrap changeset --console | dot -Tpng > output.png
```


---
repo: benbc/cloud-formation-viz
url: 'https://github.com/benbc/cloud-formation-viz'
homepage: null
starredAt: '2016-06-11T00:20:27Z'
createdAt: '2013-02-23T11:47:33Z'
updatedAt: '2024-09-30T10:12:33Z'
language: Python
license: MIT
branch: master
stars: 134
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:23.605Z'
description: null
tags: []
---

cloud-formation-viz
===================

This tool is for creating visualizations of CloudFormation templates.

Installation:
```` bash
cd cloud-formation-viz
python -m venv .venv 
source .venv/bin/activate
python setup.py install
````

It outputs Graphviz dot files. It can be used like this where 
example.template is a json cloudformation template:
```` bash
cat example.template | cfviz | dot -Tsvg -oexample.svg
````

The following can be used with yaml formatted templates:
```` bash
cfviz example.yaml | dot -Tsvg -oexample.svg
````

The only dependency of the `cfviz` script is Python (>=3.7) and the PyYaml 
package. You will also need to have [Graphviz] [graphviz] installed for the 
output to be any use.

The [samples] [samples] directory contains output of running the tool
over the [samples] [aws-samples] provided by AWS.

[aws-samples]: http://aws.amazon.com/cloudformation/aws-cloudformation-templates/
[graphviz]: http://www.graphviz.org/
[samples]: https://github.com/benbc/cloud-formation-viz/tree/master/samples

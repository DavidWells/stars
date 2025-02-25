---
repo: trek10inc/cloudformation-graph
url: 'https://github.com/trek10inc/cloudformation-graph'
homepage: null
starredAt: '2020-11-17T21:49:41Z'
createdAt: '2017-06-13T19:20:43Z'
updatedAt: '2025-01-13T03:55:55Z'
language: JavaScript
license: MIT
branch: master
stars: 57
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:23.418Z'
description: Generate dot files for GraphViz from an AWS CloudFormation template.
tags: []
---

# CloudFormation Graph

This project was adapted from [CFVIZ](https://github.com/benbc/cloud-formation-viz/blob/master/cfviz). Serverless Graph outputs your serverless architecture and resources as a [Graphviz](http://www.graphviz.org/) dot compatible output. Currently only supports the AWS provider.

### Example Output

![Example Generated Graph](https://user-images.githubusercontent.com/1689118/27105864-1caad76e-505f-11e7-9521-dcc81a2a38ec.png)

### Why?

Sometimes this is the fastest way to just visualize everything going on, it can also be extremely helpful in debugging circular dependency issues in CloudFormation templates.

### Get Started
* `npm install --save cloudformation-graph`
* Install graphviz
  * Homebrew - brew install graphviz

### Run
If you have any commandline params that don't have defaults you will have to pass in any opt variables as this plugin hooks into the package step and then reads the output.
* `cfn-graph {--opts} > graph.out`
* Output SVG
  * `cat graph.out | dot -Tsvg -oexample.svg`
* Output PNG
  * `cat graph.out | dot -Tpng -oexample.png`
* See [Graphviz](http://www.graphviz.org/pdf/dot.1.pdf) for more information.

### Options (--help)

```
CloudFormation Graph
============================================================
Usage Examples:

cfn-grah path-to-file.json [--horizontal|-h] [--edgelabels|-e]
cfn-graph 'VALID_JSON_TEMPALTE' [--horizontal|-h] [--edgelabels|-e]

# IT IS A KNOWN PROBLEM THAT !Sub or !Ref syntax is not supported
cfn-grah path-to-file.yaml     (expiremental) [--horizontal|-h] [--edgelabels|-e]
cfn-graph 'VALID_YML_TEMPLATE' (expiremental) [--horizontal|-h] [--edgelabels|-e]

cat template.json | cfg [--horizontal|-h] [--edgelabels|-e]
```

# Using the Serverless Framework?

We already bundled this as a plugin for Serverless, checkout [https://github.com/trek10inc/serverless-graph](https://github.com/trek10inc/serverless-graph).

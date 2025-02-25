---
repo: 3p3r/tree-sitter-eventrule
url: 'https://github.com/3p3r/tree-sitter-eventrule'
homepage: ''
starredAt: '2023-02-13T19:31:39Z'
createdAt: '2023-01-09T19:50:59Z'
updatedAt: '2024-04-02T02:34:49Z'
language: TypeScript
license: MIT
branch: main
stars: 9
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:56.438Z'
description: >-
  Grammar for AWS Event Rules:
  https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-event-patterns-content-based-filtering.html
tags:
  - aws-eventbridge
  - parser
  - tree-sitter
---

# tree-sitter-eventrule

Grammar for AWS Event Rules:
<https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-event-patterns-content-based-filtering.html>

Event Rules are JSON documents that are used to filter other JSON documents.  
On AWS EventBridge, they are used to filter AWS CloudWatch Events.

Comparing to other policy formats, Event Rules are limited in terms of features,
but are easy to understand for non-technical folks and are an extension to JSON.

![Syntax Highlighting](highlight.png)

## `rule2rego` utility

This utility is shipped with the npm package and is a small compiler that makes
OPA REGO policies from AWS Event Rule patterns. It requires NodeJS version which
is capable of running WASM binaries (recent version). WASM is used to parse the
JSON input and generate the REGO policy.

```bash
$ npm install -g tree-sitter-eventrule
$ rule2rego --help
Compiles AWS Event Rule pattern JSON to OPA REGO policy.
Usage: rule2rego [<rule>.json] [folder]
```

For example, for the following input Rule Event:

```json
// Effect of "source" && ("metricName" || "namespace")
{
  "source": ["aws.cloudwatch"],
  "$or": [
    { "metricName": ["CPUUtilization", "ReadLatency"] },
    { "namespace": ["AWS/EC2", "AWS/ES"] }
  ]
}
```

You will get the following REGO policy output:

```rego
package rule2rego
default allow := false
default allow_or_metricName := false
default allow_or_namespace := false
default allow_or := false
default allow_source := false
allow_or_metricName {
	({ "CPUUtilization", "ReadLatency" } & { input["metricName"] }) == { input["metricName"] }
}
allow_or_namespace {
	({ "AWS/EC2", "AWS/ES" } & { input["namespace"] }) == { input["namespace"] }
}
allow_or {
	allow_or_metricName
}
allow_or {
	allow_or_namespace
}
allow_source {
	({ "aws.cloudwatch" } & { input["source"] }) == { input["source"] }
}
allow {
	allow_or
	allow_source
}
```

> If you compile a directory you will get each policy output separated by a single blank line. The final policy is a combination policy that checks if input matches _any_ of the generated policies.

Compile the rules with OPA (example compiles to WASM)

```sh
npx rule2rego rule.json > policy.rego
opa build -t wasm -e rule2rego -o bundle.tar.gz policy.rego
tar -xvf bundle.tar.gz /policy.wasm
```

Now you can use the WASM compiled OPA in any application that supports WASM.

> You can compile the policies to any format opa supports and use it however you want. This applications main concern is to convert cloudwatch event rules to rego.

A quick way to write each rule.json rule in a folder to separate policies is:

```sh
mkdir -p out
npx rule2rego folder | awk -v RS= '{print > ("out/" NR ".rego")}'
# write each converted rule to out/#.rego
```

## `rule2rego` in javascript application

In addition to being a CLI utility you can use rule2rego directly in your JS applications.

```javascript
const fs = require("fs");
const path = require("path");
const {compile} = require("tree-sitter-eventrule/dist/main");

(async () => {
  const rules = await compile("rule.json");
  for (const rule of rules) {
    console.log(rule);
  }
})()

```

## Contributing

[See the contributing guide](CONTRIBUTING.md)

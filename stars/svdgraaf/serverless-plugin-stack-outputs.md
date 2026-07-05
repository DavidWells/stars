---
repo: svdgraaf/serverless-plugin-stack-outputs
url: 'https://github.com/svdgraaf/serverless-plugin-stack-outputs'
homepage: null
starredAt: '2016-11-27T10:36:12Z'
createdAt: '2016-09-26T13:57:38Z'
updatedAt: '2020-06-04T23:10:00Z'
language: JavaScript
license: MIT
branch: master
stars: 9
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:50:36.465Z'
description: Displays stack outputs for your serverless stacks
tags: []
---

# serverless-plugin-stack-outputs
Displays stack outputs for your serverless stacks

# Installation
Install the package:
```bash
npm install serverless-plugin-stack-outputs
```

Add it to your plugin list in `serverless.yml`:

```yaml
plugins:
  - serverless-plugin-stack-outputs
```

And it will automagically work.

# Usage
Whenever you call `info` or `deploy` with the `--verbose` option, the stack outputs will be appended:

```bash
sls info --verbose
sls deploy --verbose
```

You can also get just the stack outputs directly via:
```bash
sls info outputs
```

# Example
![Example](https://raw.githubusercontent.com/svdgraaf/serverless-plugin-stack-outputs/master/docs/example.gif)

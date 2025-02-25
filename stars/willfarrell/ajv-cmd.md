---
repo: willfarrell/ajv-cmd
url: 'https://github.com/willfarrell/ajv-cmd'
homepage: null
starredAt: '2024-04-02T23:08:06Z'
createdAt: '2022-10-03T04:28:00Z'
updatedAt: '2025-02-25T13:37:37Z'
language: JavaScript
license: MIT
branch: main
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:32.511Z'
description: Transpile JSON-Schema (.json) files to JavaScript (.js or .mjs) using ajv
tags: []
---

# ajv-cmd

Deref, Validate, Transpile, and Test JSON-Schema (.json) files using ajv.

### Setup

```bash
$ npm install -D ajv-cmd
$ ajv --help
```

Based off of [ajv-cli](https://ajv.js.org/packages/ajv-cli.html).

## Examples

### Pre-transpile all handler schemas

```bash
#!/usr/bin/env bash

function bundle {
  ajv validate ${1} --valid \
	--strict true --coerce-types array --all-errors true --use-defaults empty
  ajv transpile ${1} \
	--strict true --coerce-types array --all-errors true --use-defaults empty \
	-o ${1%.json}.js
}

for file in handlers/*/schema.*.json; do
  if [ ! -n "$(bundle $file | grep ' is valid')" ]; then
	echo "$file failed"
	exit 1
  fi
done
```

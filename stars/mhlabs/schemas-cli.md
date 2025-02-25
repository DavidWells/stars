---
repo: mhlabs/schemas-cli
url: 'https://github.com/mhlabs/schemas-cli'
homepage: ''
starredAt: '2025-01-18T00:41:54Z'
createdAt: '2021-01-15T10:04:05Z'
updatedAt: '2025-01-18T00:41:55Z'
language: JavaScript
license: NA
branch: master
stars: 8
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:12.030Z'
description: >-
  CLI tool that lets you import OpenAPI definitions into Amazon EventBridge
  Schema registry. These schemas can then be used to generate code bindings in a
  variety of languages provided by quicktype.io
tags:
  - aws-tools
  - eventbridge
  - schema-registry
---

# schemas-cli

CLI tool that lets you import OpenAPI definitions into Amazon EventBridge Schema registry. These schemas can then be used to generate code bindings in a [variety of languages](https://github.com/quicktype/quicktype#target-languages) provided by [quicktype.io](https://quicktype.io/)

## Installation
`npm install -g @mhlabs/schemas-cli`

## Features
* Imports OpenAPI 3 schemas from URL or file to EventBridge Schema Registry
* Lets you browse all schema registries and generate code bindings in a large range of languages
* Lets you browse your API Gateways and generate code bindings from any OpenAPI 3 schema you may have associated with your APIs
* Fetch schema from URL or your local file system
* Supports both YAML and JSON

## Demo
![!Demo](https://raw.githubusercontent.com/mhlabs/schemas-cli/master/images/demo.gif)

Browsing files on your local computer:
![!Demo](https://raw.githubusercontent.com/mhlabs/schemas-cli/master/images/demo-local-file.gif)

## Commands

### `$ schemas import`

```
Usage: index import|i [options]

Imports OpenAPI3 speficications from file or URL into Amazon EventBridge Schema Registry

Options:
  -f, --file [file-path]         OpenAPI Input file (optional. One of
                                 --file or --url has to be specified)
  -u, --url [url]                URL to OpenAPI definition (optional. One
                                 of --file or --url has to be specified)
  -r, --registry [registryName]  URL to OpenAPI definition (optional)
  -p, --profile [profile]        AWS profile to use
  --region [region]              The AWS region to use. Falls back on
                                 AWS_REGION environment variable if not
                                 specified
  -h, --help                     display help for command
```

### `$ schemas code-bindings`

```
Usage: schemas code-bindings|cb [options]

Starts a schema registry browser and outputs code bindings

Options:
  -f, --file [filePath]            File path to OpenAPI definition (optional)
  -u, --url [url]                  URL to OpenAPI definition (optional)
  -l, --language [language]        Output language (optional)
  -o, --output-file [output-file]  Output file (optional. Writes to std-out if omitted)
  -p, --profile [profile]          AWS profile to use (default: "default")
  --region [region]                The AWS region to use. Falls back on AWS_REGION environment variable if not specified
  -h, --help                       display help for command
  
```

### `$ schemas create`

```
Usage: schemas create|c [options]

Browses types in your project and lets you create schemas from them

Options:
  -t, --template [path]            Path to SAM template (optional)
  -e, --file-extension [extension] File extension filter (optional)
  -l, --language [language]        Output language (optional)
  -p, --profile [profile]          AWS profile to use (default: "default")
  --path [path]                    Root path
  --region [region]                The AWS region to use. Falls back on AWS_REGION environment variable if not specified
  -h, --help                       display help for command
  
```

---
repo: DiegoZoracKy/s3-csv-to-json
url: 'https://github.com/DiegoZoracKy/s3-csv-to-json'
homepage: ''
starredAt: '2018-10-08T03:06:42Z'
createdAt: '2018-10-08T02:36:34Z'
updatedAt: '2023-09-08T17:45:54Z'
language: JavaScript
license: NA
branch: master
stars: 21
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:13.014Z'
description: >-
  Converts AWS S3 files from CSV to JSON lines via stream with support to gzip
  for both input and output. Ready to be used as a Node.js module, as a Lambda
  or via CLI.
tags: []
---

# s3-csv-to-json

Converts AWS S3 files from CSV to JSON lines via stream with support to gzip for both input and output. Ready to be used as a Node.js module, as a Lambda or via CLI.

Currently it downloads the input file from S3 and upload the result back to it. A support to have one of the both ends pointing to a local file will be worked on.

## Goals

 * Work with files stored on AWS S3
 * Handle large files (stream: Input from S3 -> Convert -> Upload to S3)
 * Support to **gzip** for both input and output
 * AWS Lambda ready

## Installation

### Node.js Module
```
    npm install s3-csv-to-json
```

### Lambda

Clone the repo and install its dependencies without optionals, as `aws-sdk` is already available on Lambda functions.

```
    npm install --no-optional
```

After installing all dependencies, package it as a zip (e.g. `zip -r s3-csv-to-json.zip s3-csv-to-json/*`).

Lambda config:

 * **Code entry type:** Upload the zip package.
 * **Runtime:** Node.js 8.10+
 * **Handler:** src/aws-lambda.handler

## Usage

Using it as a module, a Lambda or via CLI, it just expects an **input** and a **output** path from AWS S3.

```json
{
    "input": "https://s3.amazonaws.com/bucket-name/path/to/input.csv.gz",
    "output": "s3://bucket-name/path/to/output.jsonl.gz"
}
```

As shown above, S3 protocol is accepted as well for both cases (e.g. **s3:**//bucket-name/path/to/input.csv).

Gzip is supported for both input and output. The **.gz** extension is all that is needed to determine when the input must be decompressed and if the output should be compressed. If there is no *.gz* extension it will be handled as a text file (*UTF-8*).

### Node.js Module

```javascript
const s3CsvToJson = require('s3-csv-to-json.js');

// Assuming that the following is within an async function
const response = await s3CsvToJson({
    input: "https://s3.amazonaws.com/bucket-name/path/to/input.csv.gz",
    output: "s3://bucket-name/path/to/output.jsonl.gz"
});
```

### Lambda

Just post a JSON as already shown above:
```json
{
    "input": "https://s3.amazonaws.com/bucket-name/path/to/input.csv.gz",
    "output": "s3://bucket-name/path/to/output.jsonl.gz"
}
```

### CLI

Clone the repo and execute it using the module [MagiCLI](https://github.com/DiegoZoracKy/magicli) via `npx`:

```bash
npx magicli ./path-to-s3-csv-to-json-module --input="s3://bucket-name/path/to/input.csv.gz" --output="s3://bucket-name/path/to/output.jsonl.gz"
```

## Example

**CSV Input:**

```
ID,NAME
1,John Doe
2,Jane Doe
```

**JSON lines output:**

```
{"ID":"1","NAME":"John Doe"}
{"ID":"2","NAME":"Jane Doe"}
```

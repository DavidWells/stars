---
repo: contrastsecurity/contrast
url: 'https://github.com/contrastsecurity/contrast'
homepage: ''
starredAt: '2022-07-26T18:01:55Z'
createdAt: '2022-04-27T15:46:08Z'
updatedAt: '2024-06-03T10:06:43Z'
language: JavaScript
license: MIT
branch: main
stars: 19
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:38.355Z'
description: >-
  CodeSec by Contrast - The fastest and most accurate SAST scanner. Scan code
  and serverless environments
tags:
  - lambda
  - sast
  - sca
---

# CodeSec by Contrast Security

CodeSec delivers:

- The fastest and most accurate SAST scanner.
- Immediate and actionable results — scan code and serverless environments.
- A frictionless and seamless sign-in process with GitHub or Google Account. From start to finish in minutes.
- By running a scan on your lambda functions, you can find: Least privilege identity and access management (IAM) vulnerabilities (over permissive policies) and remediation.

## Install

NPM:

```
npm install --location=global @contrast/contrast
```

Homebrew:

```
brew tap contrastsecurity/tap

brew install contrast
```

Binaries:

1. Go to `https://pkg.contrastsecurity.com/ui/repos/tree/General/cli`

2. Select your operating system under the cli folder and download the package.

3. You must allow execute permissions on the file depending on your OS.

## Authenticate

Authenticate by entering contrast auth in the terminal.

In the resulting browser window, log in and authenticate with your GitHub or Google credentials.

## Run a scan

### SAST scan

#### Requirements

Make sure you have the correct file types to scan.

- Upload a .jar or .war file to scan a Java project for analysis
- Upload a .js or .zip file to scan a JavaScript project for analysis
- Upload a .exe. or .zip file to scan a .NET c# web forms project

Start scanning

Use the Contrast scan command `contrast scan`

### Lambda function scan

#### Requirements

- Currently supports Java and Python functions on AWS.
  Configure AWS credentials on your local environment by running the commands with your credentials:

```shell
export AWS_DEFAULT_REGION=<YOUR_AWS_REGION>
export AWS_ACCESS_KEY_ID=<YOUR_ACCESS_KEY_ID>
export AWS_SECRET_ACCESS_KEY=<YOUR_SECRET_ACCESS_KEY>
```

- AWS credentials should be available on your local configure (usually **~/.aws/credentials**). You have an option to run a lambda scan with your aws-profile to pass --profile. You also can export different credentials.

- These permissions are required to gather all required information on an AWS Lambda to use the `contrast lambda` command:

  - Lambda: [GetFunction](https://docs.aws.amazon.com/lambda/latest/dg/API_GetFunction.html) | [GetLayerVersion](https://docs.aws.amazon.com/lambda/latest/dg/API_GetLayerVersion.html)
  - IAM: [GetRolePolicy](https://docs.aws.amazon.com/IAM/latest/APIReference/API_GetRolePolicy.html) | [GetPolicy](https://docs.aws.amazon.com/IAM/latest/APIReference/API_GetPolicy.html) | [GetPolicyVersion](https://docs.aws.amazon.com/IAM/latest/APIReference/API_GetPolicyVersion.html) | [ListRolePolicies](https://docs.aws.amazon.com/IAM/latest/APIReference/API_ListRolePolicies.html) | [ListAttachedRolePolicies](https://docs.aws.amazon.com/IAM/latest/APIReference/API_ListAttachedRolePolicies.html)

### Start scanning

Use contrast lambda to scan your AWS Lambda functions.
`contrast lambda --function-name MyFunctionName --region my-aws-region`

## Contrast commands

### auth

Authenticate Contrast using your GitHub or Google account. A new browser window will open for login.

**Usage:** `contrast auth`

### config

Displays stored credentials.

**Usage:** `contrast config`

**Options:**

- **-c, --clear** - Removes stored credentials.

### scan

Performs a security SAST scan.

**Usage:** `contrast scan [option]`

**Options:**

- **contrast scan --file**

  - Path of the file you want to scan. Contrast searches for a .jar, .war, .js. or .zip file in the working directory if a file is not specified.
  - Alias: **--f**

- **contrast scan --name**

  - Contrast project name. If not specified, Contrast uses contrast.settings to identify the project or creates a project.
  - Alias: **–n**

- **contrast scan --save**

  - Download the results to a Static Analysis Results Interchange Format (SARIF) file. The file is downloaded to the current working directory with a default name of results.sarif. You can view the file with any text editor.
  - Alias: **-s**

- **contrast scan --timeout**
  - Time in seconds to wait for the scan to complete. Default value is 300 seconds.
  - Alias: **-t**

### lambda

Name of AWS lambda function to scan.

**Usage:** `contrast lambda --function-name`

**Options:**

- **contrast lambda --function-name --endpoint-url**
  AWS Endpoint override. Similar to AWS CLI.
  Alias: **-e**

- **contrast lambda --function-name --region**
  Region override. Defaults to AWS_DEFAULT_REGION. Similar to AWS CLI.
  Alias: **-r**

- **contrast lambda --function-name --profile**
  AWS configuration profile override. Similar to AWS CLI.
  Alias: **-p**

- **contrast lambda --function-name --json**
  Return response in JSON (versus default human-readable format).
  Alias: **-j**

- **contrast lambda -–function-name -–verbose**
  Returns extended information to the terminal.
  Alias: **-v**

- **contrast lambda -–function-name --list-functions**
  Lists all available lambda functions to scan.

- **contrast lambda --function-name -–help**
  Displays usage guide.
  Alias: **-h**

### help

Displays usage guide. To list detailed help for any CLI command, add the -h or --help flag to the command.
**Usage:** `contrast scan --help`
Alias: **-h**

### version

Displays version of Contrast CLI.
**Usage:** `contrast version` Alias: **-v**, **--version**

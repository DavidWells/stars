---
repo: benjasl-stripe/function-stencil
url: 'https://github.com/benjasl-stripe/function-stencil'
homepage: null
starredAt: '2022-06-08T00:15:04Z'
createdAt: '2022-05-31T13:50:03Z'
updatedAt: '2024-08-23T07:26:44Z'
language: JavaScript
license: NA
branch: main
stars: 22
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:42.765Z'
description: >-
  A quickstart AWS Lambda function code generator. Downloads a template function
  code file, test harness file, sample SAM deffiniation and appropriate file
  structure.
tags: []
---

# Welcome to function-stencil 👋
> A quickstart AWS Lambda function code generator. Downloads a template function code file, test harness file, sample SAM definition and appropriate file structure.

## Install

```sh
npm install function-stencil -g
```

## Usage

```sh
function-stencil init
```

### 1. Choose the function runtime
```sh
? What runtime do you need? (Use arrow keys)
❯ nodejs16.x 
  nodejs14.x 
  python3.9 
  java11
  dotnet6
```

### 2. Provide a function name
```sh
Whats the function name? MyFunctionName
```

### 3. Choose a templating language snippet 
```sh
? Choose one of the following templating languages for this runtime (Use arrow keys)
❯ sam 
  terraform 
```

### 4. Function code and file system is generated

```sh
MyFunctionName
 ┗ function
 ┃ ┣ events
 ┃ ┃ ┗ event.json
 ┃ ┣ app.js
 ┃ ┣ env.json
 ┃ ┣ harness.js
 ┃ ┗ package.json
```
### 4. AWS SAM snippet is generated, drop this into the resource block of your SAM template.yaml
```yaml    
  MyFunctionName:
    Type: AWS::Serverless::Function 
    Properties:
      CodeUri: MyFunctionName/function/
      Handler: app.lambdaHandler
      Runtime: nodejs14.x
      Timeout: 3 
````


## Testing

Test your function locally by running  `harness.js` from the *function* directory:

```sh
> node harness.js
{ statusCode: 200, body: '{"message":"hello world"}' }
localTest: 7.998ms
```

## Contributing
 [Start here](https://github.com/bls20AWS/function-stencil/blob/main/CONTRIBUTING.md)



## Author

👤 **Benjamin Smith**

* Website: [https://github.com/bls20AWS/function-stencil](https://github.com/bls20AWS/function-stencil)
* Twitter: [@benjamin\_l\_S](https://twitter.com/benjamin\_l\_S)
* Github: [@bls20AWS](https://github.com/bls20AWS)

## Show your support

Give a ⭐️ if this project helped you!

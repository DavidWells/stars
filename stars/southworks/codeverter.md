---
repo: southworks/codeverter
url: 'https://github.com/southworks/codeverter'
homepage: ''
starredAt: '2022-09-16T20:46:21Z'
createdAt: '2022-08-26T14:04:35Z'
updatedAt: '2024-04-19T15:23:41Z'
language: TypeScript
license: MIT
branch: main
stars: 26
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:29.638Z'
description: Convert ts source files into multiple languages
tags:
  - ast
  - csharp
  - golang
  - transpile
  - typescript
  - vb
---

<div align="center">

# Welcome to Codeverter!

Codeverter is a tool to convert a TypeScript source file (*.ts) into different languages (**go**, **c#** or **Visual Basic** by the moment).

![](.github/sample.png?raw=true)


[![Codeverter Build](https://github.com/southworks/codeverter/actions/workflows/build.js.yml/badge.svg)](https://github.com/southworks/codeverter/actions/workflows/build.js.yml)
[![Codeverter tests](https://github.com/southworks/codeverter/actions/workflows/tests.js.yml/badge.svg)](https://github.com/southworks/codeverter/actions/workflows/tests.js.yml)
[![Codeverter Playground](https://github.com/southworks/codeverter/actions/workflows/pages.yml/badge.svg)](https://github.com/southworks/codeverter/actions/workflows/pages.yml)
[![NPM](https://img.shields.io/npm/v/@southworks/codeverter.svg?logo=npm&logoColor=fff&label=NPM+package&color=limegreen)](https://www.npmjs.com/package/@southworks/codeverter)
[![GH Package](https://github.com/southworks/codeverter/actions/workflows/publish-gh-package.yml/badge.svg)](https://github.com/southworks/codeverter/actions/workflows/publish-gh-package.yml)
</div>
<br />

# Playground

If you want to try it, [click here!](https://southworks.github.io/codeverter)

# Installing

## NPM

### Public registry

`npm install -g @southworks/codeverter`

### Locally

```
cd ./path-to-codeverter
npm run build:prod
npm install -g
```

# Building

### Prerequisites

- Install [Node.js](https://nodejs.org/) which includes [Node Package Manager](https://www.npmjs.com/get-npm)

### Dependencies

In order to build the project you must install the required dependencies by running the following command `npm install`

### Compilation

The project is written in TypeScript so you need to call the **tsc** compiler. To start the compilation process use the command `npm run build` once finished you will have all the final JavaScript files at **./out** folder.

For production use the command `npm run build:prod`

### Testing

To run the available test suites run the command `npm test`
- The test framework is [Jest](https://jestjs.io/) so you can use any flag you want. For example: `npm test -- -t "constant"`

# Usage

## Command 'cdv'

`cdv` is the command to execute the tool

For example:
`cdv --src xxx --lang zzz --dest yyy <path>`

### Args

`--src`: Path to the source file or directory.
- Default value: _._

`--lang`: Target language. 
- Values: **csharp** | **go** | **vb** 
- Default value: _go_

`--template`: Custom template to perform the transformation. The extension must be '.t' followed by the language extension, for example: csharp => .tcs.
- Values: **Path to the custom tempate** 
- Default value: _''_

`--dest`: Destination
- Values: **console** | **file**
- - file has an extra parameter \<destination path>
- Default value: _console_

# Support

Fully documented support at [Wiki](https://github.com/southworks/codeverter/wiki)

## Constants/Variables

||C#|GO|Visual Basic|
|-|-|-|-|
|Global|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|
|Function/Constructor body|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|

## Enums

||C#|GO|Visual Basic|
|-|-|-|-|
|Numeric|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|
|String|:heavy_check_mark:|:heavy_check_mark:|:x:|
|Implicit|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|

## Interfaces

||C#|GO|Visual Basic|
|-|-|-|-|
|Members|:heavy_check_mark:|:x:|:heavy_check_mark:|
|Method/Functions|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|
|Inheritance|:heavy_check_mark:|:x:|:heavy_check_mark:|
|Implementation|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|

## Classes

||C#|GO|Visual Basic|
|-|-|-|-|
|Inheritance|:heavy_check_mark:|:heavy_check_mark:*|:heavy_check_mark:|
|Interfaces|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|
|Visibility|:heavy_check_mark:|:heavy_check_mark:**|:heavy_check_mark:|
|Static|P|P||

_*In a go way, using composition_

_\*\*Using naming conventions_

### Constructors

||C#|GO|Visual Basic|
|-|-|-|-|
|Visibility|:heavy_check_mark:|:x:|:heavy_check_mark:|
|Parameters|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|
|Body|AS COMMENT|AS COMMENT|AS COMMENT|

### Properties

||C#|GO|Visual Basic|
|-|-|-|-|
|Visibility|:heavy_check_mark:|:heavy_check_mark:*|:heavy_check_mark:|

_*Naming convention for pubic or private, protected is considered private_

### Methods/Functions

||C#|GO|Visual Basic|
|-|-|-|-|
|Visibility|:heavy_check_mark:|:heavy_check_mark:*|:heavy_check_mark:|
|Parameters|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|
|Return type|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:**|
|Default return value|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:**|

_*Naming convention for pubic or private, protected is considered private_  

_\*\*As functions_

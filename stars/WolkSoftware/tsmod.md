---
repo: WolkSoftware/tsmod
url: 'https://github.com/WolkSoftware/tsmod'
homepage: null
starredAt: '2021-11-07T17:17:06Z'
createdAt: '2019-09-30T08:47:41Z'
updatedAt: '2025-02-09T14:25:00Z'
language: TypeScript
license: MIT
branch: master
stars: 96
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:40.191Z'
description: Refactor TypScript code programmatically using codemods
tags: []
---

# tsmod

Inspired by the talk from [Cristina Bernardis](https://hmh.engineering/automating-javascript-refactoring-2f0a123702e8) about [jscodeshift](https://github.com/facebook/jscodeshift) at [JSDayIE](https://www.jsday.org/) I have released **tsmod**. A library that allows us to write automated refactoring code modifications powered by [David Sherret](https://twitter.com/DavidSherret)'s [ts-morph](https://github.com/dsherret/ts-morph).

## What is this about?

If you have a very large codebase and you want to change something across many files this tool will allow you to write a script that will do the work for you. This is a good idea because it can save you time but also because it can be used by other members of the team as a valuable source of information. The transform scripts can also be shared online as open source. A common example is a migration script for a breaking change in the API of a framework. You can release the new version of the framework together with the transform scripts to help the users of the framework to upgrade their version with ease.

## Installation

You can install this module as a global dependency using npm:

```
npm install -g tsmod
```

Please note that if you have never used TypeScript or ts-node you will also need them:

```
npm install -g typescript ts-node
```

The typescript module is the TypeScript compiler and the ts-node module is a version of Node.js that can work directly with TypeScript files (`.ts`) instead of using JavaScript files (`.js`). 

## Usage

The following command applies the transform `var_to_const_transform.ts` to the files `fileA.ts` and `fileB.ts`:

```sh
tsmod -t var_to_const_transform.ts fileA.ts fileB.ts
```

> **Please Note**: A TypeScript compiler configuration file (`tsconfig.json`) file is expected in the current directory when you run the previous command.

## Transform example

The transforms are powered by the `ts-morph` API. You can learn more about the API at [https://ts-morph.com](https://ts-morph.com/manipulation/).

The following example changes all `var` variable declarations into `const` variable declarations:

```ts
import { SourceFile, SyntaxKind, VariableDeclarationKind } from "ts-morph";

export const varToConstTransform = (file: SourceFile, transformArgs: {}) => {
  // Find all variable declarations in source file
  const variableStatements = file.getDescendantsOfKind(
    SyntaxKind.VariableStatement
  );
  // Change var for const for each statement
  variableStatements.forEach(variableStatement => {
    const declarationKind = variableStatement.getDeclarationKind();
    if (declarationKind === VariableDeclarationKind.Var) {
      variableStatement.setDeclarationKind(VariableDeclarationKind.Const);
    }
  });
  // Return source code
  const updatedSourceCode = file.getText();
  return updatedSourceCode;
};
```

The code is represented using a data structure known as Abstract Syntax Tree (AST). You can navigate and modify the AST to generate updated code. You can visit [https://ts-ast-viewer.com/](https://ts-ast-viewer.com/) to visualize the AST if you need help navigating it.

![](/ast-viewer.jpg)

## Options

For additional help use the following:

```sh
tsmod -h
```

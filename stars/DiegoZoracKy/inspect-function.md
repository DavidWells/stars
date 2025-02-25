---
repo: DiegoZoracKy/inspect-function
url: 'https://github.com/DiegoZoracKy/inspect-function'
homepage: null
starredAt: '2018-10-08T03:11:06Z'
createdAt: '2017-05-07T02:42:14Z'
updatedAt: '2023-09-08T17:24:34Z'
language: JavaScript
license: MIT
branch: master
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:12.794Z'
description: >-
  Inspects a function and returns informations about it (e.g. name, parameters
  names, parameters and default values, signature)
tags: []
---

# inspect-function

[![Build Status](https://api.travis-ci.org/DiegoZoracKy/inspect-function.svg)](https://travis-ci.org/DiegoZoracKy/inspect-function) [![npm](https://img.shields.io/npm/v/inspect-function.svg)]() [![npm](https://img.shields.io/npm/l/inspect-function.svg)]()

Inspects a function and returns informations about it (e.g. name, parameters names, parameters and default values, signature).
Useful when creating automated tasks, e.g., docs generations.

## Installation

```bash
npm install inspect-function
```
**CLI**
```bash
npm install inspect-function -g
```
```bash
npx inspect-function --help
```

## Usage

`inspectFunction(fn, name);`

```javascript
// The module
const inspectFunction = require('inspect-function');

// A function
const testFunction = (a = 'z', b = [1,2,3], c, {d,e: {f}, g} = {}) => console.log('noop');

// Inspects
const result = inspectFunction(testFunction);

////////////////////////
// `result` will be:  //
////////////////////////
{
    "name": "testFunction",
    "signature": "testFunction(a = 'z', b = [1,2,3], c, {d,e: {f}, g} = {});",
    "parameters": [
        {
            "parameter": "a",
            "defaultValue": "z",
            "declaration": "a = 'z'"
        },
        {
            "parameter": "b",
            "defaultValue": "[1,2,3]",
            "declaration": "b = [1,2,3]"
        },
        {
            "parameter": "c",
            "declaration": "c"
        },
        {
            "parameter": "{d,e: {f}, g}",
            "defaultValue": "{}",
            "expectsDestructuring": true,
            "declaration": "{d,e: {f}, g} = {}",
            "destructuredParameters": [
                {
                    "parameter": "d",
                    "declaration": "d"
                },
                {
                    "parameter": "f",
                    "declaration": "f"
                },
                {
                    "parameter": "g",
                    "declaration": "g"
                }
            ]
        }
    ],
    "parametersNames": [
        "a",
        "b",
        "c",
        "d",
        "f",
        "g"
    ]
}
```

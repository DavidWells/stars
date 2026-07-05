---
repo: emilhein/optifunc
url: 'https://github.com/emilhein/optifunc'
homepage: ''
starredAt: '2025-03-04T17:34:31Z'
createdAt: '2018-04-29T16:05:30Z'
updatedAt: '2025-03-04T17:34:31Z'
language: JavaScript
license: NA
branch: master
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-03-08T22:27:22.908Z'
description: NPM module to make optimizations and tests on your functions
tags:
  - helper-functions
  - nodejs
  - npm
  - performance
  - statistics
  - testing
---

[![Coverage Status](https://coveralls.io/repos/github/emilhein/optifunc/badge.svg?branch=master)](https://coveralls.io/github/emilhein/optifunc?branch=master)
[![Build Status](https://travis-ci.org/emilhein/optifunc.svg?branch=master)](https://travis-ci.org/emilhein/optifunc)

## What do i do

For now i only have two functions

#### 1. compare(function1, function2, input1, input2, ...)

simple check if two functions return the same output

#### 2. run([function1, function2, ...], input1, input2,input3, ...)

run x amount of functions with same input and out some execution time statistics.

## basic usage

```js
let { run, compare } = require("optifunc");

let func1 = a => a;
let func2 = a => a;

compare({functions : [func1, func2], args: ["Someinput"] )
    .then(res => run({ functions: [func1, func2] }))
    .then(stats => {
        console.log(stats);
    });
// Output
// ​​​​​[ { function: 'func1', max: 0.034, min: 0.001, avg: '0.005' },​​​​​
// ​​​​​  { function: 'func2', max: 0.001, min: 0.001, avg: '0.001' } ]​​​​​

//Or only the run function
run({ functions: [func1, func2], runTimes: 20 }, "test").then(res => console.log(res));
```

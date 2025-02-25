---
repo: OrKoN/native-exec
url: 'https://github.com/OrKoN/native-exec'
homepage: null
starredAt: '2021-05-06T18:14:47Z'
createdAt: '2017-06-28T19:56:28Z'
updatedAt: '2024-09-24T03:41:07Z'
language: C++
license: MIT
branch: master
stars: 13
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:44.038Z'
description: Module that provides access to POSIX exec* functions"
tags: []
---

# native-exec

[![Build Status](https://travis-ci.org/OrKoN/native-exec.svg?branch=master)](https://travis-ci.org/OrKoN/native-exec)

Module that provides access to POSIX exec* functions.

Inspired by: https://github.com/jprichardson/node-kexec

## Installation

requires a C++ compiler installed, most probably.

```sh
npm i native-exec
```

## Usage

Replace the current process with another one:

```
var exec = require('native-exec');

exec('ls'); // => the process is replaced with ls, which runs and exits
```

Replace the current process with another one and replace process' env:

```
var exec = require('native-exec');

exec('ls', {
  newEnvKey: newEnvValue,
}); // => the process is replaced with ls -lsa, which runs and exits
```

Replace the current process with another one, replace process' env and provide arguments:

```
var exec = require('native-exec');

exec('ls', {
  newEnvKey: newEnvValue,
}, '-lsa'); // => the process is replaced with ls, which runs and exits
```

## Use case

If you want to have a bootstrap script written in NodeJS you can use this module to replace the bootstrap process with the process that you actually intend to run specifying env and arguments.

## LICENSE

MIT

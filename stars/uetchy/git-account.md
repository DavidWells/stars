---
repo: uetchy/git-account
url: 'https://github.com/uetchy/git-account'
homepage: ''
starredAt: '2021-12-16T22:07:00Z'
createdAt: '2014-11-21T08:54:23Z'
updatedAt: '2024-05-24T11:09:31Z'
language: TypeScript
license: MIT
branch: master
stars: 30
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:28.001Z'
description: git account manager.
tags:
  - credentials
  - git
---

# git-account

[![npm-version]][npm-url]
[![npm-downloads]][npm-url]
[![Build Status](https://travis-ci.com/uetchy/git-account.svg?branch=master)](https://travis-ci.org/uetchy/git-account)
[![Coverage Status](https://coveralls.io/repos/github/uetchy/git-account/badge.svg?branch=master)](https://coveralls.io/github/uetchy/git-account?branch=master)

[npm-url]: https://npmjs.org/package/git-account
[npm-version]: https://badgen.net/npm/v/git-account
[npm-downloads]: https://badgen.net/npm/dt/git-account

`git-account` adds user management feature to `git`. It makes you able to change **user.name**, **user.email** and **private key** at ease.

## Installation

```
npm i -g git-account
```

## Usage

```
$ git account <command> [<args>]
```

## Real world example

```console
$ git account add
? ID uetchy
? Name Yasuaki Uechi
? Email y@uechi.io
? Private Key /Users/uetchy/.ssh/id_rsa
User created
KEY        VALUE
id         uetchy
name       Yasuaki Uechi
email      y@uechi.io
privateKey /Users/uetchy/.ssh/id_rsa

$ git account switch
? choose one Yasuaki Uechi <y@uechi.io>
Switched

$ git account status
KEY        VALUE
name       Yasuaki Uechi
email      y@uechi.io
privateKey /Users/uetchy/.ssh/id_rsa
```

All config will be saved to `~/.git-account`

## Commands

```console
status         Show current status
list           List users
switch [name]  Switch user
exec           Run command
add            Add user
remove         Remove user
help [cmd]     display help for [cmd]
```

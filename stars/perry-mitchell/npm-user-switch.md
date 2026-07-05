---
repo: perry-mitchell/npm-user-switch
url: 'https://github.com/perry-mitchell/npm-user-switch'
homepage: null
starredAt: '2023-12-15T21:49:29Z'
createdAt: '2017-11-16T11:11:02Z'
updatedAt: '2024-12-23T15:24:09Z'
language: JavaScript
license: MIT
branch: master
stars: 9
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:41.847Z'
description: Easy user account switching for those with multiple npm environments
tags:
  - account-management
  - login
  - npm
  - npm-publish
  - user-management
---

# npm-user-switch

> Easily switch NPM user accounts

[![npm version](https://badge.fury.io/js/npm-user-switch.svg)](https://www.npmjs.com/package/npm-user-switch) [![Build Status](https://travis-ci.org/perry-mitchell/npm-user-switch.svg?branch=master)](https://travis-ci.org/perry-mitchell/npm-user-switch)

![npm-user-switch menu](https://raw.githubusercontent.com/perry-mitchell/npm-user-switch/master/screenshot.jpg)

## About
Both my work and my personal development utilise NPM accounts. Sometimes I need to easily switch between them, and entering their different passwords is tiresome. Using `npm-user-switch`, I can easily use one master password to manage logging in to any number of accounts.

The account information is encrypted using [**Buttercup**](https://buttercup.pw) and stored locally. No account passwords are stored - only the auth token provided by NPM (stored by NPM in `.npmrc` in your home directory).

## Installation
`npm-user-switch` should be installed globally:

```shell
npm install npm-user-switch -g
```

_You may need `sudo` for the above command to work on some systems._

## Usage
Simply execute `npm-user-switch` to start the program.

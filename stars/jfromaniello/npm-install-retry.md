---
repo: jfromaniello/npm-install-retry
url: 'https://github.com/jfromaniello/npm-install-retry'
homepage: null
starredAt: '2022-04-08T02:52:44Z'
createdAt: '2013-06-28T15:13:08Z'
updatedAt: '2023-04-13T09:25:52Z'
language: JavaScript
license: NA
branch: master
stars: 21
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:49.399Z'
description: >-
  Command line utility that retries  `npm install` when NPM fails with `npm ERR!
  cb() never called`
tags: []
---

[![Build Status](https://travis-ci.org/jfromaniello/npm-install-retry.svg?branch=master)](https://travis-ci.org/jfromaniello/npm-install-retry)

![Build status](https://ci.appveyor.com/api/projects/status/sc7937we6gb0mwoc?svg=true)

Command line utility that retries  `npm install` when NPM fails with flaky errors: 
* `npm ERR! cb() never called`,
* `npm ERR! errno ECONNRESET`,
* `npm ERR! shasum check failed`,
* `npm ERR! code EINTEGRITY`

This happens sporadically and has been reported many times:

-  https://github.com/meteor/meteor/issues/1190
-  https://github.com/isaacs/npm/issues/2907
-  https://github.com/isaacs/npm/issues/3269
-  https://github.com/npm/npm/issues?utf8=%E2%9C%93&q=ECONNRESET+
-  https://github.com/npm/npm/issues/2701

and still fails.


## Installation

	npm install -g  npm-install-retry

## Usage

From command-line:

	npm-install-retry --wait 500 --attempts 10 -- --production

It has two options wait (defaults to 500) and attempts (default to 10). Everything after `--` goes directly to npm.

## License

MIT 2013 - José F. Romaniello

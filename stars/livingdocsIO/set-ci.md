---
repo: livingdocsIO/set-ci
url: 'https://github.com/livingdocsIO/set-ci'
homepage: ''
starredAt: '2022-11-29T18:36:06Z'
createdAt: '2018-09-18T22:18:21Z'
updatedAt: '2022-11-29T18:42:42Z'
language: JavaScript
license: NA
branch: master
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:07.027Z'
description: Sets continuous integration variables on a key in a package.json
tags:
  - ci
  - drone-ci
  - npm
  - npm-publish
  - package-json
  - travis-ci
---

# set-ci

Sets continuous integration variables on a key in a package.json


```
$ npm init -y
$ npx set-ci
$ cat package.json
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "Marc Bachmann <marc.brookman@gmail.com>",
  "license": "MIT",
  "ci": {
    "isCi": true,
    "name": "Drone",
    "service": "drone",
    "commit": "0ffa90db60889e35cf67958eaa0aec7eb8cd12b1",
    "tag": "some-commit-tag",
    "build": "87",
    "branch": "some-commit-branch",
    "job": "2",
    "pr": "4234",
    "isPr": true,
    "slug": "livingdocsIO/set-ci"
  },
  "customKey": {
    "isCi": false
  }
}%
```

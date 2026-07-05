---
repo: livingdocsIO/ldj-cleaner
url: 'https://github.com/livingdocsIO/ldj-cleaner'
homepage: null
starredAt: '2022-11-29T18:44:27Z'
createdAt: '2019-02-12T10:38:51Z'
updatedAt: '2022-11-29T18:44:27Z'
language: JavaScript
license: MIT
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:06.906Z'
description: Line Delimited JSON Cleaner
tags: []
---

ldj-cleaner
===========

Takes possibly messed up LDJ (line delemited json with non-json lines
in between) via STDIN and writes clean LDJ to STDOUT and the mess to
STDERR. It is implemented on top of node's streaming api so it should
handle huge data sets pretty well. It is neatly packages in a docker
container.

Check the `Makefile` for example usages.

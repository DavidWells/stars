---
repo: bigeasy/udt
url: 'https://github.com/bigeasy/udt'
homepage: null
starredAt: '2019-10-29T20:08:29Z'
createdAt: '2012-08-09T02:19:01Z'
updatedAt: '2024-09-16T02:32:19Z'
language: JavaScript
license: MIT
branch: master
stars: 66
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:14.713Z'
description: >-
  An implementation of UDP-based Data Transfer Protocol in pure JavaScript for
  Node.js and Chrome sockets.
tags: []
---

# UDT [![Build Status](https://secure.travis-ci.org/bigeasy/udt.png?branch=master)](http://travis-ci.org/bigeasy/udt)

A pure JavaScript implementation of UDP-based Data Transfer Protocol for Node.js
and Google Chrome sockets.

## Change Log

Changes for each release.

### Version 0.0.1

 * Remove Node.js 0.6 from Travis build. #22.
 * Assign `connect` event callback if provided to `connect` function. #20.
 * Add `.js` extension to test file names. #19.
 * Stop accepting new connections after `close` is called. #18.
 * Implement minimal listen-only server socket. #14.
 * Implement minimal connect-only client socket. #13.
 * Create UDP proxy. #8.
 * Implement UDT handshake. #5.
 * Create project and repository. #2.

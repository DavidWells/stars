---
repo: html-to-text/node-html-to-text
url: 'https://github.com/html-to-text/node-html-to-text'
homepage: ''
starredAt: '2022-12-03T02:31:37Z'
createdAt: '2012-08-08T14:38:20Z'
updatedAt: '2025-02-25T20:16:51Z'
language: JavaScript
license: NOASSERTION
branch: master
stars: 1640
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:00:07.926Z'
description: Advanced html to text converter
tags:
  - converter
  - email
  - html
  - node
  - plain-text
  - pretty-print
  - text
---

# HTML to X converters

[![lint status](https://github.com/html-to-text/node-html-to-text/workflows/lint/badge.svg)](https://github.com/html-to-text/node-html-to-text/actions/workflows/lint.yml)
[![test status](https://github.com/html-to-text/node-html-to-text/workflows/test/badge.svg)](https://github.com/html-to-text/node-html-to-text/actions/workflows/test.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/html-to-text/node-html-to-text/blob/master/LICENSE-MIT)

This is a monorepo.

## Packages

- **html-to-text <!--(@html-to/text)-->**

    [![npm](https://img.shields.io/npm/v/html-to-text?logo=npm)](https://www.npmjs.com/package/html-to-text)

    Advanced html to plain text converter.

    Folder: [/packages/html-to-text](/packages/html-to-text)

    Docs: [README.md](/packages/html-to-text/README.md), [CHANGELOG.md](/packages/html-to-text/CHANGELOG.md)

- **@html-to/text-cli**

    [![npm](https://img.shields.io/npm/v/@html-to/text-cli?logo=npm)](https://www.npmjs.com/package/@html-to/text-cli)

    CLI for html to text converter.

    Folder: [/packages/html-to-text-cli](/packages/html-to-text-cli)

    Docs: [README.md](/packages/html-to-text-cli/README.md), [CHANGELOG.md](/packages/html-to-text-cli/CHANGELOG.md)

- **@html-to/md**

    Advanced html to markdown converter (WIP).

    Folder: [/packages/html-to-md](/packages/html-to-md)

    <!-- Docs: [README.md](/packages/html-to-md/README.md), [CHANGELOG.md](/packages/html-to-md/CHANGELOG.md) -->

- **base**

    Shared code. Only exists in the monorepo and bundled into published packages.

    Folder: [/packages/base](/packages/base)

## Development

Targeting Node.js version >=14.

Monorepo uses NPM v7 workspaces (make sure v7 is installed when used with Node.js v14.)

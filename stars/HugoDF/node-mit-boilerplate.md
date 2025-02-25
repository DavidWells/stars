---
repo: HugoDF/node-mit-boilerplate
url: 'https://github.com/HugoDF/node-mit-boilerplate'
homepage: ''
starredAt: '2024-04-16T21:25:24Z'
createdAt: '2019-07-28T19:53:18Z'
updatedAt: '2024-10-20T22:32:55Z'
language: JavaScript
license: MIT
branch: main
stars: 4
isPublic: true
isTemplate: true
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:31.550Z'
description: 'Node.js starter files with MIT license, gitignore and XO linting'
tags:
  - mit-license
  - node-starter
  - nodejs
  - nodejs-template
  - prettier
---

# [Project Name]

Boilerplate repo with:

- MIT License
- Node, npm
- tests with the `node:test` built-in
- formatting with prettier
- GitHub Actions on commit and to auto-publish on GH release
  - **note**: for publish to work, `NPM_TOKEN` has to be set in the repository GH Actions secrets

## Requirements

- Node 20
- npm v8+

## Setup

1. Clone the repository
2. Run `npm install` installs all required dependencies.

## npm scripts

- `npm test` will run tests using the [Node.js test runner](https://nodejs.org/api/test.html#running-tests-from-the-command-line) and the `node:test` module.
- `npm run format` will run prettier on all the examples files (and tests).

## LICENSE

Code is licensed under the [MIT License](./LICENSE).

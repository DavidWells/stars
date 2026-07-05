---
repo: MoLow/reporters
url: 'https://github.com/MoLow/reporters'
homepage: ''
starredAt: '2022-12-25T21:33:57Z'
createdAt: '2022-12-11T00:01:01Z'
updatedAt: '2025-02-12T20:52:17Z'
language: JavaScript
license: MIT
branch: main
stars: 50
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:00:01.714Z'
description: 'A collection of reporters for `node:test`'
tags: []
---

![tests](https://github.com/MoLow/reporters/actions/workflows/test.yaml/badge.svg?branch=main) [![codecov](https://codecov.io/gh/MoLow/reporters/branch/main/graph/badge.svg?token=0LFVC8SCQV)](https://codecov.io/gh/MoLow/reporters)

# reporters
A collection of reporters for `node:test`


## Usage

```bash
node --test \
  --test-reporter=@reporters/github --test-reporter-destination=stdout \
  --test-reporter=@reporters/junit --test-reporter-destination=junit.xml \
  --test-reporter=spec --test-reporter-destination=stdout
```

Available reporters:

- [bail](https://www.npmjs.com/package/@reporters/bail) - bail on first failure
- [github](https://www.npmjs.com/package/@reporters/github) - report to github actions
- [jUnit](https://www.npmjs.com/package/@reporters/junit) - report to jUnit 
- [mocha](https://www.npmjs.com/package/@reporters/mocha) - use any mocha reporter with `node:test`
- [silent](https://www.npmjs.com/package/@reporters/silent) - a silent reporter
- [slow](https://www.npmjs.com/package/@reporters/slow) - report slow tests
- [testwatch](https://www.npmjs.com/package/@reporters/testwatch) - An interactive REPL for `node:test` watch mode.

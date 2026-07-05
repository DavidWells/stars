---
repo: MoOx/jsx-test-helpers
url: 'https://github.com/MoOx/jsx-test-helpers'
homepage: null
starredAt: '2016-04-20T01:22:34Z'
createdAt: '2016-04-08T09:29:20Z'
updatedAt: '2023-10-12T05:43:03Z'
language: JavaScript
license: MIT
branch: master
stars: 36
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:27.753Z'
description: null
tags: []
---

# jsx-test-helpers

[![Unix Build status](https://img.shields.io/travis/MoOx/jsx-test-helpers/master.svg?branch=master&label=unix%20build)](https://travis-ci.org/MoOx/jsx-test-helpers)
[![Version](https://img.shields.io/npm/v/jsx-test-helpers.svg)](https://github.com/MoOx/jsx-test-helpers/blob/master/CHANGELOG.md)

[![Repo on GitHub](https://img.shields.io/badge/repo-GitHub-3D76C2.svg)](https://github.com/MoOx/jsx-test-helpers)
[![Repo on GitLab](https://img.shields.io/badge/repo-GitLab-6C488A.svg)](https://gitlab.com/MoOx/jsx-test-helpers)
[![Repo on BitBucket](https://img.shields.io/badge/repo-BitBucket-1F5081.svg)](https://bitbucket.org/MoOx/jsx-test-helpers)

> Helpers to easily write tests for React component/JSX code

This package [is very small](src/index.js) and provide simple helpers to easily use [React shallow rendering](http://facebook.github.io/react/docs/test-utils.html#shallow-rendering) method in conjunction with [react-element-to-jsx-string](https://github.com/algolia/react-element-to-jsx-string) to write straightforward tests for React component.

**⚠️ [Be sure to read the test file, which is annotated](src/__tests__/index.js) 😙.**

## Installation

```console
$ npm install jsx-test-helpers
```

## Usage

**⚠️ [Be sure to read the test file, which have more complete annotated examples](src/__tests__/index.js).**

Example with [Jest](http://facebook.github.io/jest/):

```js
import React from 'react';
import { noop, renderJSX, JSX } from 'jsx-test-helpers';

import FunctionalComponentToTest from '../your-component';

// fixture
function FakeComponent() {}

test('Can render & test a functional component', () => {
  expected(renderJSX(<FunctionalComponentToTest bool />)).toMatch(
    JSX(<FakeComponent fixedProp={'some-value'} bool />)
  );
});
```

---

## CONTRIBUTING

* ⇄ Pull/Merge requests and ★ Stars are always welcome.
* For bugs and feature requests, please create an issue.
* Pull/Merge requests must be accompanied by passing automated tests (`$ npm test`).

## [CHANGELOG](CHANGELOG.md)

## [LICENSE](LICENSE)

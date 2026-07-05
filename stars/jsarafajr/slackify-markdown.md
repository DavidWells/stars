---
repo: jsarafajr/slackify-markdown
url: 'https://github.com/jsarafajr/slackify-markdown'
homepage: ''
starredAt: '2021-04-04T20:01:12Z'
createdAt: '2018-03-29T08:54:59Z'
updatedAt: '2025-02-24T23:22:05Z'
language: JavaScript
license: MIT
branch: master
stars: 138
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:53.620Z'
description: Convert markdown into Slack-specific markdown
tags:
  - markdown
  - markdown-converter
  - remark
  - slack
  - unified
---

# Slackify-Markdown

![Build Status](https://github.com/jsarafajr/slackify-markdown/workflows/Build%20CI/badge.svg?branch=master)
[![codecov](https://codecov.io/gh/jsarafajr/slackify-markdown/branch/master/graph/badge.svg)](https://codecov.io/gh/jsarafajr/slackify-markdown) [![Known Vulnerabilities](https://snyk.io/test/github/jsarafajr/slackify-markdown/badge.svg)](https://snyk.io/test/github/jsarafajr/slackify-markdown)


Slackify-Markdown is a Markdown to [Slack-specific-markdown](https://api.slack.com/docs/message-formatting#message_formatting) converter, based on [Unified](https://github.com/unifiedjs/unified) and [Remark](https://github.com/remarkjs/remark/).

## Install

```bash
npm install slackify-markdown
```

## Usage

```js
const slackifyMarkdown = require('slackify-markdown');
const markdown = `
# List of items

* item 1
* item 2
* item 3

[here is an example](https://example.com)
`;

slackifyMarkdown(markdown);
/*
 *List of items*

 • item 1
 • item 2
 • item 3

 <https://example.com|here is an example>
/*
```

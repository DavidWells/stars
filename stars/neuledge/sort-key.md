---
repo: neuledge/sort-key
url: 'https://github.com/neuledge/sort-key'
homepage: ''
starredAt: '2024-12-29T23:53:48Z'
createdAt: '2020-09-11T14:50:30Z'
updatedAt: '2024-12-30T23:07:02Z'
language: TypeScript
license: MIT
branch: master
stars: 7
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:53:34.368Z'
description: "\U0001F511 Tiny library for generating safe sort keys for DynamoDB."
tags:
  - aws
  - dynamodb
  - sortkey
---

<h1 align="center" style="text-align:center">🔑 Sort-Key</h1>

<h4 align="center">Tiny library for generating safe sort keys for DynamoDB.</h4>

<p align="center">
  <a href="https://www.npmjs.org/package/sort-key">
    <img src="http://img.shields.io/npm/v/sort-key.svg" alt="View On NPM">
  </a>
  <a href="https://github.com/neuledge/sort-key/actions/workflows/build.yml">
    <img src="https://github.com/neuledge/sort-key/actions/workflows/build.yml/badge.svg"
      alt="Build Status">
  </a>
  <a href="https://depfu.com/github/neuledge/sort-key?project_id=15586">
    <img src="https://badges.depfu.com/badges/c8d7e8c2c15dc9427a6d96b382a83cd8/overview.svg"
       alt="Dependency Status">
  </a>
  <a href="https://codecov.io/gh/neuledge/sort-key">
    <img src="https://codecov.io/gh/neuledge/sort-key/branch/master/graph/badge.svg?token=IG7TTIBZRY"
      alt="Coverage Status" />
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/npm/l/sort-key.svg" alt="License">
  </a>
</p>
<br>

Generating DynamoDB sort keys from multiple string parts as [recommended by
AWS](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-sort-keys.html). It uses
`#` as separator and knows how to escape it when given on one of the key parts.

```
[country]#[region]#[state]#[county]#[city]#[neighborhood]
```

## Install

```bash
npm i sort-key
```

<br>

## Usage

```ts
import SortKey from 'sort-key';

const SK = SortKey.generate('1532208', '2020-09-11T15:30:06.822Z');
// 1532208#2020-09-11T15:30:06.822Z

const [order, time] = SortKey.parse(SK);
// "1532208" "2020-09-11T15:30:06.822Z"
```

#### It supports escaping as well:

```ts
const SK = SortKey.generate(
  'example.com',
  'foo',
  'https://example.com/foo/bar#top',
);
// example.com#foo#https://example.com/foo/bar\#top

const [domain, page, url] = SortKey.parse(SK);
// "example.com" "foo" "https://example.com/foo/bar#top"
```

<br>

## License

[MIT](LICENSE) license &copy; 2020 [Neuledge](https://neuledge.com)

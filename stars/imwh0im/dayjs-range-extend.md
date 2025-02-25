---
repo: imwh0im/dayjs-range-extend
url: 'https://github.com/imwh0im/dayjs-range-extend'
homepage: ''
starredAt: '2022-05-16T19:48:19Z'
createdAt: '2021-10-22T01:14:36Z'
updatedAt: '2023-11-30T20:04:49Z'
language: TypeScript
license: MIT
branch: main
stars: 13
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:46.077Z'
description: Date Range Module Based on Day.js
tags:
  - date
  - daterange
  - dayjs
  - dayjs-plugin
  - dayjs-range
---

<p align="center">Date Range Module Based on <a href="https://github.com/iamkun/dayjs" target="_blank">Day.js</a></p>

<p align="center">
    <a href="https://www.npmjs.com/package/dayjs-range-extend">
        <img src="https://img.shields.io/npm/v/dayjs-range-extend.svg?style=flat-square&colorB=51C838" alt="NPM Version" />
    </a>
    <a href="https://github.com/semantic-release/semantic-release">
        <img src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg" />
    </a>
    <a href="https://codecov.io/gh/imwh0im/dayjs-range-extend">
      <img src="https://codecov.io/gh/imwh0im/dayjs-range-extend/branch/main/graph/badge.svg?token=JZ8Z0KG42E"/>
    </a>
</p>

## Description
<p>dayjs-range-extend is an extended module based on Day.js (can use the function of Day.js) that provides a date range.</p>
<p>Built with <a href="https://github.com/microsoft/TypeScript" target="_blank">TypeScript</a> and Maintains stability based on Unit-Test (used <a href="https://github.com/facebook/jest">Jest</a>)</p>

## Installation
  ```sh
  $ npm i --save dayjs-range-extend
  ```

## How to use
  ```typescript
  import dayjsRange from 'dayjs-range-extend';

  const date_range_first = dayjsRange('2022-01-01', '2022-01-05');
  const date_range_second = dayjsRange('2022-01-04', '2022-01-10');

  console.log(
    date_range_first.isOverlap(date_range_second);
  ); // => true
  ```

## Documentaion
  - [dayjsRange](/docs/dayjs-range.md)
  - [isValidRange](/docs/is-valid-range.md)
  - [clone](/docs/clone.md)
  - [isOverlap](/docs/is-overlap.md)
  - [isEqual](/docs/is-equal.md)
  - [addStartRange](/docs/add-start-range.md)
  - [addEndRange](/docs/add-end-range.md)
  - [subtractStartRange](/docs/subtract-start-range.md)
  - [subtractEndRange](/docs/subtract-end-range.md)

### Link
  - [Day.js](https://github.com/iamkun/dayjs)
  - [TypeScript](https://github.com/microsoft/TypeScript)
  - [Jest](https://github.com/facebook/jest)

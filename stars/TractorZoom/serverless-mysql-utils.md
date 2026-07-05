---
repo: TractorZoom/serverless-mysql-utils
url: 'https://github.com/TractorZoom/serverless-mysql-utils'
homepage: ''
starredAt: '2021-12-17T06:11:08Z'
createdAt: '2020-03-26T15:32:38Z'
updatedAt: '2024-10-05T01:11:16Z'
language: JavaScript
license: NA
branch: master
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:27.964Z'
description: >-
  Automatic retries and standardized error handling for dealing with MySQL in
  the serverless ecosystem
tags: []
---

# @tractorzoom/serverless-mysql-utils

Wrapper around serverless-mysql implementing standardized error handling and automatic retries

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest) [![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

![pull_request_verify](https://github.com/TractorZoom/serverless-mysql-utils/workflows/pull_request_verify/badge.svg) ![publish](https://github.com/TractorZoom/serverless-mysql-utils/workflows/publish/badge.svg)

## Available Methods

##### Method: `executeQuery(queryString)`

| parameter | type   | description                     |
| --------- | ------ | ------------------------------- |
| query     | string | sql query string to be executed |

## How do I use? :thinking:

##### Installation:

```bash
npm i @tractorzoom/serverless-mysql-utils
```

##### Usage:

The following environment variables must be set or a config object must be passed as a second arg to `executeQuery` to make the connection with mysql:
| variable | type | description |
| --------- | ------ | ------------------------------- |
| database | string | mame of the database to use for this connection |
| host | string | the hostname of the database you are connecting to |
| user | string | the mysql user to authenticate as |
| password | string | the password of that mysql user |

```js
import dbConfig from './config';
import { executeQuery } from '@tractorzoom/serverless-mysql-utils';

export const getItems = async () => {
    const queryString = `SELECT * FROM MyTable WHERE id = "some-guid"`;

    const response = await executeQuery(queryString, dbConfig);

    if (response.error) {
        return [];
    }

    return response;
};
```

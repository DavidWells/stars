---
repo: v3xlabs/sunflake
url: 'https://github.com/v3xlabs/sunflake'
homepage: 'https://www.npmjs.com/package/sunflake'
starredAt: '2022-01-04T06:08:14Z'
createdAt: '2022-01-01T14:06:24Z'
updatedAt: '2023-08-22T06:31:25Z'
language: TypeScript
license: NOASSERTION
branch: master
stars: 22
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:23.579Z'
description: 'Zero dependency, lightweight, snowflake generator'
tags:
  - npm
  - snowflake
---

![lvksh sunflake](./assets/banner.png)

[![MINIFIED SIZE](https://img.shields.io/bundlephobia/min/sunflake.svg)]()
[![COVERAGE](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)]()
[![LANGUAGES](https://img.shields.io/github/languages/top/lvkdotsh/sunflake)]()
[![DEPENDENCIRES](https://img.shields.io/badge/dependencies-0-brightgreen.svg)]()
[![NPM](https://img.shields.io/npm/dt/sunflake)]()

Zero dependency, lightweight, snowflake generator.

This library follows the Twitter [Snowflake ID](https://en.wikipedia.org/wiki/Snowflake_ID) specification, which is currently what is utilized by platforms such as [Discord](https://discord.com/developers/docs/reference#snowflakes), [Twitter](https://blog.twitter.com/engineering/en_us/a/2010/announcing-snowflake), [Instagram](https://instagram-engineering.com/sharding-ids-at-instagram-1cf5a71e5a5c) and [Blizzard](https://techcrunch.com/2010/10/12/twitter-snowflake/) just to name a few.

## How it works

Sunflake takes a 42 bit unix timestamp, 10 bits of machine id and 12 bits of sequence number. Sunflake generates id in string format (which easily can be casted into a 64 bit bigint in databases), as javascript is limited to 53 bit integer precision.

| 111111111111111111111111111111111111111111 | 1111111111 | 111111111111 |     |
| ------------------------------------------ | ---------- | ------------ | --- |
| 64                                         | 22         | 12           | 0   |
###
| FIELD      | BITS | DESCRIPTION                                               | RETRIEVAL                    |
| ---------- | ---- | --------------------------------------------------------- | ---------------------------- |
| Timestamp  | 42   | Milliseconds since given Epoch                            | (snowflake >> 22) + epoch    |
| Machine Id | 10   |                                                           | (snowflake & 0x3FF000) >> 12 |
| Increment  | 12   | Increments for every id created<br>in the same timestamp. | snowflake & 0xFFF            |

-   (snowflake >> 22) + epoch: We right shift with 22 (64 - 42). This grabs the 42 first bits which is the time since the epoch. We then add the epoch to it and we have a unix timestamp in milliseconds.
-   (snowflake & 0x3FF000) >> 12: We start by offset `0x3FF000`, which in binary is `0b1111111111000000000000` which is 22 bits long. This extracts the 10 bits after the 12 bits from the right, and then we remove those 12 bits from the right that we don't need. This is our Machine Id.
-   snowflake & 0xFFF: Grabs everything after the offset `0xFFF` which is `111111111111` in binary which is 12 bits long. We start at the 12th bit (start of increament).

## Installation

Using `npm`:

```sh
npm install sunflake
```

or if you prefer to use the `yarn` package manager:

```sh
yarn add sunflake
```

## Usage

```ts
import { generateSunflake } from 'sunflake';

export const SnowflakeGen = generateSunflake({
    machineId: 1, // Machine id
    epoch: 1640995200000, // January 1st, 2022
});
```

Now you can use that function easily

```ts
const id1 = SnowflakeGen();
const id2 = SnowflakeGen();
```

## Contributors

[![](https://contrib.rocks/image?repo=lvkdotsh/sunflake)](https://github.com/lvkdotsh/sunflake/graphs/contributors)

## LICENSE

This package is licensed under the [GNU Lesser General Public License](https://www.gnu.org/licenses/lgpl-3.0).

---
repo: skene/ab-statistics
url: 'https://github.com/skene/ab-statistics'
homepage: ''
starredAt: '2021-11-28T00:17:09Z'
createdAt: '2019-07-15T18:16:05Z'
updatedAt: '2023-07-10T02:06:41Z'
language: TypeScript
license: NA
branch: master
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:33.934Z'
description: AB Statistics
tags: []
---

## AB Statistics

`ab-statistics` is a simple library for handling statistical significance with mulitple variations in A/B testing.

## Quick Start

```sh
yarn add ab-statistics
# or
npm install --save ab-statistics
```

```js
import { ABTest } from "ab-statistics";

interface VariationDocument {
  name: string;
  conversions: number;
  impressions: number;
}

const control: VariationDocument = {
  name: "Control Variation",
  conversions: 1600,
  impressions: 80000
};

const variations: VariationDocument[] = [
  {
    name: "Variation A",
    conversions: 1500,
    impressions: 80000
  },
  {
    name: "Variation B",
    conversions: 1700,
    impressions: 80000
  },
  {
    name: "Variation C",
    conversions: 1800,
    impressions: 80000
  }
];

const Test = new ABTest()<VariationDocument>({ control, variations });

const highestSignificance = Test.highestSignificance();
// {
//   name: "Variation C",
//   conversions: 1800,
//   impressions: 80000
// }

const significantVariations = Test.filterSignificant();
// [
//   {
//     name: "Variation B",
//     conversions: 1700,
//     impressions: 80000
//   },
//   {
//     name: "Variation C",
//     conversions: 1800,
//     impressions: 80000
//   }
// ]
```

---
repo: gajus/extract-price
url: 'https://github.com/gajus/extract-price'
homepage: null
starredAt: '2023-12-29T19:58:55Z'
createdAt: '2019-01-05T13:03:52Z'
updatedAt: '2025-01-13T05:46:48Z'
language: JavaScript
license: NOASSERTION
branch: master
stars: 16
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:39.862Z'
description: Extracts prices from an arbitrary text input.
tags:
  - currency
  - extract
  - price
---

<a name="extract-price"></a>
# extract-price 🤑

[![Travis build status](http://img.shields.io/travis/gajus/extract-price/master.svg?style=flat-square)](https://travis-ci.org/gajus/extract-price)
[![Coveralls](https://img.shields.io/coveralls/gajus/extract-price.svg?style=flat-square)](https://coveralls.io/github/gajus/extract-price)
[![NPM version](http://img.shields.io/npm/v/extract-price.svg?style=flat-square)](https://www.npmjs.org/package/extract-price)
[![Canonical Code Style](https://img.shields.io/badge/code%20style-canonical-blue.svg?style=flat-square)](https://github.com/gajus/canonical)
[![Twitter Follow](https://img.shields.io/twitter/follow/kuizinas.svg?style=social&label=Follow)](https://twitter.com/kuizinas)

Extracts price from an arbitrary text input.

* [extract-price 🤑](#extract-price)
    * [Usage](#extract-price-usage)
    * [FAQ](#extract-price-faq)
        * [What is the reason the price amount is returned in cents?](#extract-price-faq-what-is-the-reason-the-price-amount-is-returned-in-cents)
    * [Related projects](#extract-price-related-projects)


<a name="extract-price-usage"></a>
## Usage

```js
import extractPrice from 'extract-price';

extractPrice('extracts price from anywhere within the input 1.222.333,50');
// [{amount: 122233350}]

extractPrice('understands ,. notation 1,222,333.50');
// [{amount: 122233350}]

extractPrice('and ., notation 1.222.333,50');
// [{amount: 122233350}]

extractPrice('and space followed by "," notation 1 222 333,50');
// [{amount: 122233350}]

extractPrice('and space followed by "." notation 1 222 333.50');
// [{amount: 122233350}]

extractPrice('extracts multiple prices listed anywhere within the string using different formats: 1,22, 222, 3,22, 4.20, 5.666');
// [{amount: 12200}, {amount: 22200}, {amount: 322}, {amount: 422}, {amount: 566600}]

extractPrice('extracts currency codes EUR 1.00, 2.00 USD');
// [{amount: 100, currencyCode: 'EUR'}, {amount: 200, currencyCode: 'USD'}]

extractPrice('extracts currency symbols €1.00, 2.00$');
// [{amount: 100, currencySymbol: '€'}, {amount: 200, currencySymbol: '$'}]

extractPrice('does not100 100.20extract ambig0u0s numbers as price');
// []

```

<a name="extract-price-faq"></a>
## FAQ

<a name="extract-price-faq-what-is-the-reason-the-price-amount-is-returned-in-cents"></a>
### What is the reason the price amount is returned in cents?

Because:

```
> 1.03 - 0.42
< 0.6100000000000001

```

See: https://stackoverflow.com/q/3730019/368691

<a name="extract-price-related-projects"></a>
## Related projects

* [`extract-date`](https://github.com/gajus/extract-date) – Extracts date from an arbitrary text input.
* [`extract-time`](https://github.com/gajus/extract-time) – Extracts time from an arbitrary text input.

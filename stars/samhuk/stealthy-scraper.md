---
repo: samhuk/stealthy-scraper
url: 'https://github.com/samhuk/stealthy-scraper'
homepage: ''
starredAt: '2022-10-20T16:05:11Z'
createdAt: '2022-10-17T14:28:49Z'
updatedAt: '2024-07-31T16:45:02Z'
language: TypeScript
license: MIT
branch: master
stars: 25
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:19.642Z'
description: Extra stealthy web scraper in Typescript
tags:
  - puppeteer
  - scraper
  - stealth
  - typescript
---

<h1 align="center">stealthy-scraper</h1>
<p align="center">
  <em>Extra stealthy web scraper in Typescript</em>
</p>

<p align="center">
  <a href="https://img.shields.io/badge/License-MIT-green.svg" target="_blank">
    <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="license" />
  </a>
  <a href="https://badge.fury.io/js/stealthy-scraper.svg" target="_blank">
    <img src="https://badge.fury.io/js/stealthy-scraper.svg" alt="npm version" />
  </a>
</p>

## Overview

stealthy-scraper is a wrapper around [puppeteer-extra](https://github.com/berstend/puppeteer-extra) that adds additional stealth functionality and other helpful features.

## Why to use

* If puppeteer's `Page.goto` and `Browser.newPage` is being detected. stealthy-scraper has a `newBrowser` function as an alternative way to navigate to a new url which is more reliable.
* If puppeteer's default word typing is being detected. stealthy-scraper has a `safeType` function that better mimicks human typing behavior.
* When you want to more neatly centralize all of the puppeteer, puppeteer-extra, and puppeteer-extra's plugin dependencies into one package.

## Usage Overview

`npm i --save stealthy-scraper`

```typescript
import { createScraper } from 'stealthy-scraper'
const scraper = await createScraper({
  puppeteerOptions: {
    headless: true,
    ...
  },
  snapshotsDirPath: './scraper-snapshots',
})
await scraper.page.goto('difficultoscrape.com')
const searchTextInput = await scraper.page.waitForSelector('...')
await scraper.safeType(searchTextInput, 'my search term')
// ...
await scraper.newBrowser(newUrlFromSearchResults)
await scraper.close()
```

## Development

See [./contributing/development.md](./contributing/development.md)

## Disclaimer

I do not condone the usage of this package for malevolent purposes. Please be very curtious and a good citizen when using it. I do not take any responsibility for any damages you incur on yourself (e.g. IP blacklisted) or others (e.g. DoS) through any use of this package.

---

If you found this package delightful, feel free to buy me a coffee ✨

<a href="https://www.buymeacoffee.com/samhuk" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

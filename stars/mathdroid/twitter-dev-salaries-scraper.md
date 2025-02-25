---
repo: mathdroid/twitter-dev-salaries-scraper
url: 'https://github.com/mathdroid/twitter-dev-salaries-scraper'
homepage: 'https://news.ycombinator.com/item?id=22334702'
starredAt: '2020-02-22T21:16:53Z'
createdAt: '2020-02-15T06:07:22Z'
updatedAt: '2023-10-18T19:39:03Z'
language: JavaScript
license: NA
branch: master
stars: 127
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:04.683Z'
description: >-
  https://docs.google.com/spreadsheets/d/1-xIgk7Mw1S5DXTZSbKBgxlsQAn7XGIu7Mfy72lSVHKk/edit?usp=sharing
tags: []
---

# Twitter Developer Salary Scraper

A simple script to scrape [#KnowYourWorth](https://twitter.com/hashtag/KnowYourWorth)
tweets inspired by [@ZacSweers](https://twitter.com/ZacSweers)' tweet
(<https://twitter.com/ZacSweers/status/1228205724255154177>)

Public spreadsheet:
<https://docs.google.com/spreadsheets/d/1-xIgk7Mw1S5DXTZSbKBgxlsQAn7XGIu7Mfy72lSVHKk/edit?usp=sharing>

Hacker News thread:
<https://news.ycombinator.com/item?id=22334702>

## Prerequisites

Twitter developer App and its corresponding consumer key/secret and access token key/secret

## Usage

1. Clone

2. Install dependencies (`npm install`/`yarn`)

3. fill `.env.example` with the keys/secrets (change file name to `.env`)

4. `node index.js` to generate tweets json

5. `node parse.js` to generate csv

## LICENSE

MIT

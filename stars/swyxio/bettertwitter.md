---
repo: swyxio/bettertwitter
url: 'https://github.com/swyxio/bettertwitter'
homepage: 'https://bettertwitter.netlify.com'
starredAt: '2020-10-20T22:07:13Z'
createdAt: '2018-11-12T19:38:55Z'
updatedAt: '2024-03-03T15:12:06Z'
language: Svelte
license: NA
branch: master
stars: 56
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:26.265Z'
description: a better twitter UI
tags: []
---

# bettertwitter

This is a better twitter search UI for power users. This helps you build queries for [the Twitter search API](/DOCS.md) better than the Twitter "Advanced Search" can

## Opinions currently baked in

- Opens searches to mobile Twitter
- Sorts by latest results instead of "top"
- "People you follow" is checked by default
- Less-used Filters and numerical Quality is collapsed

## Roadmap

- Easy
  - decide on datepicker
  - basic design refactoring
  - persist choices to cookies
  - put state in URL to make it sharable/bookmarkable
  - recent searches
  - document what each filter does and how useful it is. Tooltip?
- Harder
  - advanced design refactoring
  - autocomplete usernames based on logged-in account's follows
  - OR logic builder on applicable fields
  - save search to db
- Hard/Maybe never
  - search logged-in user's lists
  - load in iframe on desktop?

## Non Search opportunities

- recommended unfollows
- limited, sorted daily content
- immutable draft url's https://twitter.com/rektide/status/1127360848329084928

## About this fork

(@wgao19)

Because I like the feature but I want my own styling. to swyx: I can PR if you like it

It looks like this:

![](https://i.imgur.com/RefVXlk.png)

**bucket list**

- responsive layout
- icons
- fix the validation warning

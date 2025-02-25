---
repo: deevus/analytics-plugin-profitwell
url: 'https://github.com/deevus/analytics-plugin-profitwell'
homepage: ''
starredAt: '2022-02-08T19:31:54Z'
createdAt: '2021-04-08T05:32:08Z'
updatedAt: '2022-02-08T19:31:54Z'
language: TypeScript
license: NA
branch: develop
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:15.224Z'
description: null
tags: []
---

<!--
title: Adding Profitwell to your app using open source analytics
description: Connect Profitwell to the analytics library
pageTitle: Profitwell
-->

# Profitwell

This library exports the `profitwell` plugin for the [`analytics`](https://www.npmjs.com/package/analytics) package & standalone methods for any project to use to make it easier to interact with [Profitwell](https://www.profitwell.com/).

This analytics plugin will load Profitwell into your application.

## Installation

```bash
npm install analytics
npm install analytics-plugin-profitwell
```

## How to use

```typescript
import Analytics from 'analytics'
import profitwell from 'analytics-plugin-profitwell'

const analytics = Analytics({
  app: 'awesome-app',
  plugins: [
    profitwell({
      publicToken: '1234' // required
      identifyMode: 'user_id' // optional (valid values: user_id, email, custom)
      getCustomId(traits) {
        return traits.stripeId;
      }, // required if `identifyMode` is "custom"
    })
  ]
})
```

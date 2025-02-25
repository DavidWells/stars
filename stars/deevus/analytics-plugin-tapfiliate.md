---
repo: deevus/analytics-plugin-tapfiliate
url: 'https://github.com/deevus/analytics-plugin-tapfiliate'
homepage: ''
starredAt: '2022-02-08T19:32:00Z'
createdAt: '2021-03-09T05:02:50Z'
updatedAt: '2025-01-08T06:17:15Z'
language: TypeScript
license: NA
branch: develop
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:15.164Z'
description: null
tags: []
---

<!--
title: Adding Tapfiliate to your app using open source analytics
description: Connect Tapfiliate to the analytics library
pageTitle: Tapfiliate
-->

# Tapfiliate

This library exports the `tapfiliate` plugin for the [`analytics`](https://www.npmjs.com/package/analytics) package & standalone methods for any project to use to make it easier to interact with [Tapfiliate](https://tapfiliate.com/).

This analytics plugin will load Tapfiliate into your application.

## Installation

```bash
npm install analytics
npm install analytics-plugin-tapfiliate
```

## How to use

```typescript
import Analytics from 'analytics'
import tapfiliate from 'analytics-plugin-tapfiliate'

const analytics = Analytics({
  app: 'awesome-app',
  plugins: [
    tapfiliate({
      tapfiliateId: '1234' // required
      customerType: 'customer', // optional. can be customer, trial or lead (default: customer)
      cookieDomain: 'www.example.com', //optional (default: none)
      referralCodeParam: 'ref' // optional (default: ref)
    })
  ]
})
```

For more information view the [Tapfiliate documentation](https://tapfiliate.com/docs/javascript/)

## Registering a conversion

Registering a conversion is via a custom method

```typescript
analytics.plugins.tapfiliate.conversion(externalId, amount);
```

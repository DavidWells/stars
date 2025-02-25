---
repo: deevus/analytics-plugin-activecampaign
url: 'https://github.com/deevus/analytics-plugin-activecampaign'
homepage: ''
starredAt: '2022-02-08T19:31:49Z'
createdAt: '2021-04-08T01:13:30Z'
updatedAt: '2022-02-08T19:31:50Z'
language: TypeScript
license: NA
branch: develop
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:15.267Z'
description: null
tags: []
---

<!--
title: Adding ActiveCampaign to your app using open source analytics
description: Connect ActiveCampaign to the analytics library
pageTitle: ActiveCampaign
-->

# ActiveCampaign

This library exports the `activecampaign` plugin for the [`analytics`](https://www.npmjs.com/package/analytics) package & standalone methods for any project to use to make it easier to interact with [ActiveCampaign](https://www.activecampaign.com/).

This analytics plugin will load ActiveCampaign into your application.

## Installation

```bash
npm install analytics
npm install analytics-plugin-activecampaign
```

## How to use

```typescript
import Analytics from 'analytics'
import activecampaign from 'analytics-plugin-activecampaign'

const analytics = Analytics({
  app: 'awesome-app',
  plugins: [
    activecampaign({
      accountId: '1234' // required
    })
  ]
})
```

Get your account ID from the tracking link inside your ActiveCampaign account. https://YourAccountName.activehosted.com/app/settings/tracking

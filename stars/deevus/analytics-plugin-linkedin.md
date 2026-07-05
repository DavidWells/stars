---
repo: deevus/analytics-plugin-linkedin
url: 'https://github.com/deevus/analytics-plugin-linkedin'
homepage: ''
starredAt: '2022-02-08T18:59:12Z'
createdAt: '2021-12-03T05:06:17Z'
updatedAt: '2022-02-08T18:59:12Z'
language: TypeScript
license: NA
branch: develop
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:15.292Z'
description: null
tags: []
---

<!--
title: Adding LinkedIn to your app using open source analytics
description: Connect LinkedIn to the analytics library
pageTitle: LinkedIn
-->

# LinkedIn

This library exports the `linkedin` plugin for the [`analytics`](https://www.npmjs.com/package/analytics) package & standalone methods for any project to use to make it easier to interact with [LinkedIn](https://www.linkedin.com/).

This analytics plugin will load LinkedIn into your application.

## Installation

```bash
npm install analytics
npm install analytics-plugin-linkedin
```

## How to use

```typescript
import Analytics from "analytics";
import linkedin from "analytics-plugin-linkedin";

const analytics = Analytics({
  app: "awesome-app",
  plugins: [
    linkedin({
      accountId: "1234", // required
    }),
  ],
});
```

## Registering a conversion plugin

```typescript
analytics.plugins.linkedin.conversion(conversionId);
```

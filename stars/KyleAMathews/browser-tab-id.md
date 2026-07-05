---
repo: KyleAMathews/browser-tab-id
url: 'https://github.com/KyleAMathews/browser-tab-id'
homepage: null
starredAt: '2024-01-08T19:42:03Z'
createdAt: '2024-01-08T17:31:19Z'
updatedAt: '2024-07-22T17:58:44Z'
language: TypeScript
license: MIT
branch: main
stars: 14
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:39.545Z'
description: >-
  Library to get a unique integer id. Defaults to getting lowest positive
  integer
tags: []
---

# browser-tab-id
Library to get a unique integer id for each tab running the same app. Defaults to getting lowest positive integer.

Handles multiple tabs opening concurrently.

## Usage

```ts
import { TabIdCoordinator } from "browser-tab-id"

// Access the assigned tab ID.
tabIdCoordinator.tabId
```


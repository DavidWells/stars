---
repo: jsjoeio/use-streak
url: 'https://github.com/jsjoeio/use-streak'
homepage: ''
starredAt: '2022-01-11T07:19:00Z'
createdAt: '2021-10-09T14:58:35Z'
updatedAt: '2025-01-31T11:49:09Z'
language: TypeScript
license: MIT
branch: main
stars: 39
isPublic: true
isTemplate: true
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:22.211Z'
description: a streak counter to track your streak in days (similar to Duolingo)
tags:
  - browser
  - duolingo
  - streak
  - typescript
---

# `useStreak` - a basic streak counter

![npm](https://img.shields.io/npm/v/use-streak)

This is a basic streak counter - inspired by Duolingo - written in TypeScript and meant for the browser (uses `localStorage`).

## Install

```shell
yarn add use-streak
```

```shell
npm install use-streak
```

### Usage

```typescript
import { useStreak } from "use-streak";

const today = new Date();
const streak = useStreak(localStorage, today);
// streak returns an object:
// {
//    currentCount: 1,
//    lastLoginDate: "11/11/2021",
//    startDate: "11/11/2021",
// }
```

<img src="./streak-demo.png" alt="screenshot of streak demo" width="200" />

[![Edit vigorous-wood-o8m7w](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/vigorous-wood-o8m7w?fontsize=14&hidenavigation=1&theme=dark)

## LICENSE

MIT. Just make sure you give acknowledgements to this repo.

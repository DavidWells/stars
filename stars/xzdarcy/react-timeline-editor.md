---
repo: xzdarcy/react-timeline-editor
url: 'https://github.com/xzdarcy/react-timeline-editor'
homepage: 'https://zdarcy.com/'
starredAt: '2024-10-09T18:53:05Z'
createdAt: '2022-02-19T15:54:31Z'
updatedAt: '2025-02-25T02:10:16Z'
language: TypeScript
license: MIT
branch: master
stars: 432
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:18.920Z'
description: >-
  react-timeline-editor is a react component used to quickly build a timeline
  animation editor.
tags:
  - animation
  - editor
  - react
---

# React Timeline Editor
[![npm version](https://img.shields.io/npm/v/@xzdarcy/react-timeline-editor.svg?style=flat-square)](https://www.npmjs.com/package/@xzdarcy/react-timeline-editor)
[![npm downloads](https://img.shields.io/npm/dm/@xzdarcy/react-timeline-editor.svg?style=flat-square)](https://www.npmjs.com/package/@xzdarcy/react-timeline-editor)

**[React Timeline Editor](https://zdarcy.com/)** is a react component used to quickly build a timeline animation editor.

![example](https://github.com/xzdarcy/react-timeline-editor/blob/f79d85eee8a723e5210c04232daf2c51888418c0/public/assets/timeline.gif)
## Getting Started

```bash
npm install @xzdarcy/react-timeline-editor
```

```ts
import { Timeline, TimelineEffect, TimelineRow } from '@xzdarcy/react-timeline-editor';
import React from 'react';

const mockData: TimelineRow[] = [{
    id: "0",
    actions: [
      {
        id: "action00",
        start: 0,
        end: 2,
        effectId: "effect0",
      },
    ],
  },
  {
    id: "1",
    actions: [
      {
        id: "action10",
        start: 1.5,
        end: 5,
        effectId: "effect1",
      }
    ],
}]

const mockEffect: Record<string, TimelineEffect> = {
  effect0: {
    id: "effect0",
    name: "效果0",
  },
  effect1: {
    id: "effect1",
    name: "效果1",
  },
};

const TimelineEditor = () => {
  return (
      <Timeline
        editorData={mockData}
        effects={mockEffect}
      />
  );
};
```

## Documention
Checkout the [Docs](https://zdarcy.com/) for a demonstration of some basic and advanced features.


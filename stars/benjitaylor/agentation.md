---
repo: benjitaylor/agentation
url: 'https://github.com/benjitaylor/agentation'
homepage: 'https://agentation.dev'
starredAt: '2026-01-23T17:38:58Z'
createdAt: '2026-01-18T02:01:24Z'
updatedAt: '2026-01-24T22:01:46Z'
language: TypeScript
license: NOASSERTION
branch: main
stars: 1168
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2026-01-24T22:32:30.976Z'
description: The visual feedback tool for agents.
tags: []
---

# agentation

Agentation is an agent-agnostic visual feedback tool. Click elements on your page, add notes, and copy structured output that helps AI coding agents find the exact code you're referring to.

## Install

```bash
npm install agentation -D
```

## Usage

```tsx
import { Agentation } from 'agentation';

function App() {
  return (
    <>
      <YourApp />
      <Agentation />
    </>
  );
}
```

The toolbar appears in the bottom-right corner. Click to activate, then click any element to annotate it.

## Features

- **Click to annotate** – Click any element with automatic selector identification
- **Text selection** – Select text to annotate specific content
- **Multi-select** – Drag to select multiple elements at once
- **Area selection** – Drag to annotate any region, even empty space
- **Animation pause** – Freeze CSS animations to capture specific states
- **Structured output** – Copy markdown with selectors, positions, and context
- **Dark/light mode** – Matches your preference or set manually
- **Zero dependencies** – Pure CSS animations, no runtime libraries

## How it works

Agentation captures class names, selectors, and element positions so AI agents can `grep` for the exact code you're referring to. Instead of describing "the blue button in the sidebar," you give the agent `.sidebar > button.primary` and your feedback.

## Requirements

- React 18+
- Desktop browser (mobile not supported)

## Docs

Full documentation at [agentation.dev](https://agentation.dev)

## License

© 2026 Benji Taylor
Licensed under PolyForm Shield 1.0.0
